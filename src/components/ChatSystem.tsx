import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Mic, Square, Volume2 } from 'lucide-react';
import ChatbotSelector from './ChatbotSelector';
import { getChatbotResponse } from '../utils/chatbotLogic';
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
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, selectedBot, onBotChange, user, setUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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
      // Call secure server endpoint instead of Google directly
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

      const data = await response.json();

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      if (!response.ok) {
        // Handle errors
        const errorMessage = data.errorBn || data.error || 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।';
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: errorMessage,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
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
      if (isSpeaking) {
        speakText(data.response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'দুঃখিত, একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">ShikkhaBondhu AI</h3>
              <p className="text-sm text-indigo-200">Your specialized assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right text-sm">
              <div className="font-bangla">পয়েন্ট: {user.points}</div>
              <div className="text-xs text-indigo-200">Level {user.level}</div>
            </div>
            <button
              onClick={toggleTTS}
              className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
              title="Toggle Text-to-Speech"
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
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <div 
                    className={`${message.sender === 'bot' ? 'font-bangla' : ''}`}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                )}
                <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="আপনার প্রশ্ন টাইপ করুন..."
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-indigo-600'
                }`}
                title={isListening ? 'Stop Recording' : 'Start Voice Input'}
              >
                {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-300 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          {isListening && (
            <p className="text-sm text-gray-500 mt-2 text-center font-bangla">
              শুনছি... কথা বলুন
            </p>
          )}
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