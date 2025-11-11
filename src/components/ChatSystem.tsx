import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Mic, Square, Volume2, Trash2, Copy, CheckCheck } from 'lucide-react';
import ChatbotSelector from './ChatbotSelector';
import { getChatbotResponse } from '../utils/chatbotLogic';
import { callGeminiAPI } from '../utils/geminiClient';
import { awardPoints, PointAction } from '../utils/pointsSystem';
import PointsToast from './PointsToast';

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBot: string;
  onBotChange: (bot: string) => void;
  user: any;
  setUser: (user: any) => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  error?: boolean;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, selectedBot, onBotChange, user, setUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize chat when bot changes
  useEffect(() => {
    if (isOpen) {
      const welcomeMessage = getChatbotResponse('', selectedBot, true, user);
      setMessages([{
        id: Date.now().toString(),
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [selectedBot, isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
    // Add click listeners to chat options
    const chatOptions = document.querySelectorAll('.chat-option');
    chatOptions.forEach(option => {
      option.addEventListener('click', handleChatOptionClick);
    });
    
    return () => {
      chatOptions.forEach(option => {
        option.removeEventListener('click', handleChatOptionClick);
      });
    };
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'bn-BD';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleChatOptionClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const message = target.getAttribute('data-message');
    if (message) {
      handleUserMessage(message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Show typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Try Vercel API first (if available)
      let apiResponse = null;
      let useDirectAPI = false;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            botType: selectedBot,
            userId: user.email || 'anonymous'
          }),
        });

        if (response.ok) {
          apiResponse = await response.json();
        } else {
          console.log('Vercel API unavailable, switching to direct API');
          useDirectAPI = true;
        }
      } catch (error) {
        console.log('Vercel endpoint not found, using direct API');
        useDirectAPI = true;
      }

      // If Vercel API failed, try direct Gemini API
      if (useDirectAPI) {
        // Handle NCTB Books bot specially
        if (selectedBot === 'nctb') {
          try {
            const { askNCTBQuestion } = await import('../utils/nctbBooks');
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            
            if (!apiKey) {
              throw new Error('API key not configured - Please add VITE_GOOGLE_API_KEY to .env file');
            }
            
            const result = await askNCTBQuestion(message, apiKey);
            
            setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
            
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: result.error 
                ? `দুঃখিত, একটি সমস্যা হয়েছে: ${result.error}` 
                : `**${result.bookUsed}**\n\n${result.answer}`,
              sender: 'bot',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);

            // Award points
            awardPoints(user.email || 'user', 'CHAT_MESSAGE', (points, action) => {
              setPointsToast({ points, action });
              setUser((prev: any) => ({
                ...prev,
                points: prev.points + points,
                impactScore: Math.min(prev.impactScore + 1, 100)
              }));
            });

            if (isSpeaking && !result.error) {
              speakText(result.answer);
            }
            return;
          } catch (error: any) {
            console.error('NCTB Books error:', error);
            console.error('Error details:', {
              message: error?.message,
              stack: error?.stack,
              error: error
            });
            
            setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
            
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: `দুঃখিত, NCTB বই থেকে উত্তর পেতে সমস্যা হয়েছে।\n\nত্রুটি: ${error?.message || 'Unknown error'}\n\nদয়া করে আবার চেষ্টা করুন।`,
              sender: 'bot',
              timestamp: new Date(),
              error: true
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
            return;
          }
        }

        const directResult = await callGeminiAPI(
          message,
          selectedBot,
          user.email || 'anonymous'
        );

        if (directResult.error) {
          // If API key missing or error, use fallback
          if (directResult.error === 'API_KEY_MISSING') {
            console.log('Google API key not configured, using fallback');
          } else {
            console.log('Direct API error:', directResult.error);
          }
          
          // Use fallback chatbot
          const fallbackResponse = getChatbotResponse(message, selectedBot, false, user);
          
          setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fallbackResponse,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);

          // Award points
          awardPoints(user.email || 'user', 'CHAT_MESSAGE', (points, action) => {
            setPointsToast({ points, action });
            setUser((prev: any) => ({
              ...prev,
              points: prev.points + points,
              impactScore: Math.min(prev.impactScore + 1, 100)
            }));
          });

          if (isSpeaking) {
            speakText(fallbackResponse);
          }
          return;
        }

        // Use direct API response
        apiResponse = { response: directResult.response };
      }

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: apiResponse.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

      // Update user points for interaction using points system
      const success = awardPoints(user.email || 'user', 'CHAT_MESSAGE', (points, action) => {
        setPointsToast({ points, action });
        setUser((prev: any) => ({
          ...prev,
          points: prev.points + points,
          impactScore: Math.min(prev.impactScore + 1, 100)
        }));
      });

      if (!success) {
        console.log('Daily chat limit reached');
      }

      // Auto-speak bot response if TTS is enabled
      if (isSpeaking && apiResponse) {
        speakText(apiResponse.response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      // Use fallback chatbot logic when API unavailable
      const fallbackResponse = getChatbotResponse(message, selectedBot, false, user);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);

      // Award points even with fallback
      const success = awardPoints(user.email || 'user', 'CHAT_MESSAGE', (points, action) => {
        setPointsToast({ points, action });
        setUser((prev: any) => ({
          ...prev,
          points: prev.points + points,
          impactScore: Math.min(prev.impactScore + 1, 100)
        }));
      });

      if (!success) {
        console.log('Daily chat limit reached');
      }

      if (isSpeaking) {
        speakText(fallbackResponse);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    handleUserMessage(inputValue.trim());
    setInputValue('');
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Clean HTML tags from text
      const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      
      // Try to find a female Bengali voice
      const voices = speechSynthesis.getVoices();
      const bengaliVoice = voices.find(voice => 
        voice.lang.includes('bn') || 
        voice.name.toLowerCase().includes('bengali') ||
        voice.name.toLowerCase().includes('female')
      );
      
      if (bengaliVoice) {
        utterance.voice = bengaliVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const toggleTTS = () => {
    setIsSpeaking(!isSpeaking);
    if (isSpeaking) {
      speechSynthesis.cancel();
    }
  };

  const copyMessage = (text: string, id: string) => {
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (confirm('আপনি কি সমস্ত চ্যাট মুছে ফেলতে চান? (Clear all chat messages?)')) {
      const welcomeMessage = getChatbotResponse('', selectedBot, true, user);
      setMessages([{
        id: Date.now().toString(),
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-8 h-8" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg">ShikkhaBondhu AI</h3>
              <p className="text-sm text-indigo-200">বিশেষায়িত সহায়ক • Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block text-right text-sm bg-white bg-opacity-10 px-3 py-1 rounded-lg">
              <div className="font-bangla font-semibold">🏆 {user.points} পয়েন্ট</div>
              <div className="text-xs text-indigo-200">স্তর {user.level}</div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTTS}
              className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
              title={isSpeaking ? 'Disable Voice' : 'Enable Voice'}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bot Selector */}
        <div className="p-4 border-b border-gray-200">
          <ChatbotSelector 
            selectedBot={selectedBot} 
            onBotChange={onBotChange}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className="flex items-end space-x-2 max-w-[85%]">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <div
                    className={`rounded-2xl p-4 shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                        : message.error
                        ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex space-x-1 py-1">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <>
                        <div 
                          className={`${message.sender === 'bot' ? 'font-bangla' : ''} leading-relaxed`}
                          dangerouslySetInnerHTML={{ __html: message.content }}
                        />
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-opacity-20 border-current">
                          <div className={`text-xs ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {message.sender === 'bot' && !message.isTyping && (
                            <button
                              onClick={() => copyMessage(message.content, message.id)}
                              className="text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded"
                              title="Copy message"
                            >
                              {copiedId === message.id ? (
                                <CheckCheck className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="আপনার প্রশ্ন টাইপ করুন... (Type your question...)"
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white scale-110 animate-pulse' 
                    : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                title={isListening ? 'Stop Recording' : 'Start Voice Input'}
                disabled={isLoading}
              >
                {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          {isListening && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-600 font-bangla font-semibold animate-pulse">
                🎤 শুনছি... কথা বলুন
              </p>
            </div>
          )}
          {isLoading && !isListening && (
            <div className="mt-2 text-center">
              <p className="text-sm text-indigo-600 font-bangla">
                উত্তর তৈরি করা হচ্ছে... ⏳
              </p>
            </div>
          )}
          <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              AI Powered
            </span>
            <span>•</span>
            <span>Gemini 2.5 Flash</span>
            <span>•</span>
            <span className="font-bangla">বাংলা + English</span>
          </div>
        </div>
      </div>

      {/* Points Toast Notification */}
      {pointsToast && (
        <PointsToast
          points={pointsToast.points}
          action={pointsToast.action}
          onClose={() => setPointsToast(null)}
        />
      )}
    </div>
  );
};

export default ChatSystem;