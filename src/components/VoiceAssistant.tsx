import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'bn-BD';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (isEnabled) {
          // Restart recognition if still enabled
          setTimeout(() => {
            if (isEnabled && recognitionRef.current) {
              recognitionRef.current.start();
            }
          }, 1000);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isEnabled]);

  const toggleVoiceAssistant = () => {
    if (!isEnabled) {
      setIsEnabled(true);
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      speakMessage('ভয়েস সহায়ক চালু করা হয়েছে। আমি আপনার কমান্ড শুনছি।');
    } else {
      setIsEnabled(false);
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      speakMessage('ভয়েস সহায়ক বন্ধ করা হয়েছে।');
    }
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.pitch = 1.3; // Higher pitch for female voice
      
      // Try to find a female Bengali voice
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        (voice.lang.includes('bn') || voice.name.toLowerCase().includes('bengali')) &&
        (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))
      ) || voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('hazel')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();

    // Command processing logic
    if (lowerCommand.includes('চ্যাট খুলো') || lowerCommand.includes('chat open')) {
      speakMessage('চ্যাট উইন্ডো খোলা হচ্ছে');
      // Trigger chat opening
      const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
      if (chatButton) chatButton.click();
    }
    else if (lowerCommand.includes('সাহায্য') || lowerCommand.includes('help')) {
      speakMessage('আমি আপনাকে সাহায্য করতে পারি। আপনি বলতে পারেন - চ্যাট খুলো, রিপোর্ট করো, আইনি সাহায্য, স্বাস্থ্য সেবা, বা জরুরি সাহায্য।');
    }
    else if (lowerCommand.includes('রিপোর্ট') || lowerCommand.includes('report')) {
      speakMessage('রিপোর্টিং সিস্টেম খোলা হচ্ছে। আপনার সমস্যাটি বিস্তারিত বলুন।');
      // Open safety chatbot
      const event = new CustomEvent('openChatbot', { detail: 'safety' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('আইনি সাহায্য') || lowerCommand.includes('legal help')) {
      speakMessage('আইনি সহায়তা বট খোলা হচ্ছে। আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন।');
      const event = new CustomEvent('openChatbot', { detail: 'law' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('স্বাস্থ্য') || lowerCommand.includes('health')) {
      speakMessage('স্বাস্থ্য সহায়তা বট খোলা হচ্ছে। আপনার স্বাস্থ্য সংক্রান্ত প্রশ্ন করুন।');
      const event = new CustomEvent('openChatbot', { detail: 'health' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('জরুরি') || lowerCommand.includes('emergency')) {
      speakMessage('জরুরি সেবার জন্য ৯৯৯ নম্বরে কল করুন। অথবা স্বাস্থ্য বাতায়ন ১৬২৬৩ এ কল করুন।');
      const event = new CustomEvent('openChatbot', { detail: 'crisis' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('দক্ষতা') || lowerCommand.includes('skills')) {
      speakMessage('দক্ষতা উন্নয়ন বট খোলা হচ্ছে। কোন দক্ষতা শিখতে চান?');
      const event = new CustomEvent('openChatbot', { detail: 'skills' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('পড়াশোনা') || lowerCommand.includes('study')) {
      speakMessage('একাডেমিক সহায়তা বট খোলা হচ্ছে। পড়াশোনায় কিভাবে সাহায্য করতে পারি?');
      const event = new CustomEvent('openChatbot', { detail: 'academic' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('কমিউনিটি') || lowerCommand.includes('community')) {
      speakMessage('কমিউনিটি সংযোগ বট খোলা হচ্ছে। অন্যদের সাথে যুক্ত হন।');
      const event = new CustomEvent('openChatbot', { detail: 'community' });
      window.dispatchEvent(event);
    }
    else if (lowerCommand.includes('বন্ধ করো') || lowerCommand.includes('stop')) {
      speakMessage('ভয়েস সহায়ক বন্ধ করা হচ্ছে।');
      setIsEnabled(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
    else {
      speakMessage('দুঃখিত, আমি বুঝতে পারিনি। আপনি সাহায্য বলে সমস্ত কমান্ডের তালিকা জানতে পারেন।');
    }

    setIsProcessing(false);
    setTranscript('');
  };

  // Listen for chatbot opening events
  useEffect(() => {
    const handleOpenChatbot = (event: any) => {
      const chatButton = document.querySelector(`[data-chatbot="${event.detail}"]`) as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      }
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null; // Don't render if speech recognition is not supported
  }

  return (
    <div className="fixed bottom-24 left-5 z-40">
      {/* Voice Assistant Status */}
      {isEnabled && (
        <div className="mb-4 bg-white rounded-2xl shadow-lg p-4 max-w-xs border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isListening ? 'শুনছি...' : 'ভয়েস সহায়ক সক্রিয়'}
            </span>
          </div>
          
          {transcript && (
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg font-bangla">
              "{transcript}"
            </div>
          )}

          {isProcessing && (
            <div className="text-xs text-indigo-600 mt-2">
              কমান্ড প্রক্রিয়া করছি...
            </div>
          )}

          {/* Voice Commands Help */}
          <div className="mt-3 text-xs text-gray-500">
            <div className="font-medium font-bangla mb-1">কমান্ডসমূহ:</div>
            <div className="space-y-1 font-bangla">
              <div>"চ্যাট খুলো" - চ্যাট খোলার জন্য</div>
              <div>"সাহায্য" - সহায়তার জন্য</div>
              <div>"রিপোর্ট" - রিপোর্ট করার জন্য</div>
              <div>"জরুরি" - জরুরি সেবার জন্য</div>
              <div>"আইনি সাহায্য" - আইনি পরামর্শ</div>
              <div>"স্বাস্থ্য" - স্বাস্থ্য সেবা</div>
              <div>"দক্ষতা" - দক্ষতা উন্নয়ন</div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Toggle Button */}
      <button
        onClick={toggleVoiceAssistant}
        className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isEnabled 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
            : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
        }`}
        title={isEnabled ? 'ভয়েস সহায়ক বন্ধ করুন' : 'ভয়েস সহায়ক চালু করুন'}
      >
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 pulse-ring"></div>
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 pulse-ring" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
        
        {/* Icon */}
        <div className="flex items-center justify-center w-full h-full text-white">
          {isListening ? (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
              <div className="w-1 h-6 bg-white rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : isEnabled ? (
            <Mic className="w-8 h-8" />
          ) : (
            <MicOff className="w-8 h-8" />
          )}
        </div>

        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
          isEnabled ? 'bg-green-500' : 'bg-gray-400'
        }`}></div>
      </button>

      {/* Quick tip on first use */}
      {!isEnabled && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-bangla">
          ভয়েস সহায়ক চালু করুন
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;