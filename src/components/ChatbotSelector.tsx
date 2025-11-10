import React from 'react';
import { Scale, Heart, Shield, Brain, MessageSquare, Users, AlertTriangle, BookOpen } from 'lucide-react';

interface ChatbotSelectorProps {
  selectedBot: string;
  onBotChange: (bot: string) => void;
}

const ChatbotSelector: React.FC<ChatbotSelectorProps> = ({ selectedBot, onBotChange }) => {
  const bots = [
    { 
      id: 'general', 
      name: 'General Assistant', 
      bangla: 'সাধারণ সহায়ক',
      icon: MessageSquare, 
      color: 'bg-gray-500' 
    },
    { 
      id: 'law', 
      name: 'Legal Rights', 
      bangla: 'আইনি অধিকার',
      icon: Scale, 
      color: 'bg-red-500' 
    },
    { 
      id: 'health', 
      name: 'Health & Wellness', 
      bangla: 'স্বাস্থ্য সেবা',
      icon: Heart, 
      color: 'bg-green-500' 
    },
    { 
      id: 'safety', 
      name: 'Safety & Reporting', 
      bangla: 'নিরাপত্তা',
      icon: Shield, 
      color: 'bg-blue-500' 
    },
    { 
      id: 'skills', 
      name: 'Skills Development', 
      bangla: 'দক্ষতা উন্নয়ন',
      icon: Brain, 
      color: 'bg-yellow-500' 
    },
    { 
      id: 'postcare', 
      name: 'Post-Care Support', 
      bangla: 'পরবর্তী যত্ন',
      icon: MessageSquare, 
      color: 'bg-purple-500' 
    },
    { 
      id: 'community', 
      name: 'Community Connect', 
      bangla: 'কমিউনিটি',
      icon: Users, 
      color: 'bg-teal-500' 
    },
    { 
      id: 'crisis', 
      name: 'Crisis Intervention', 
      bangla: 'জরুরি সহায়তা',
      icon: AlertTriangle, 
      color: 'bg-red-600' 
    },
    { 
      id: 'academic', 
      name: 'Academic Support', 
      bangla: 'একাডেমিক সহায়তা',
      icon: BookOpen, 
      color: 'bg-indigo-500' 
    },
    { 
      id: 'nctb', 
      name: 'Talk to NCTB Books', 
      bangla: 'NCTB বই',
      icon: BookOpen, 
      color: 'bg-orange-500' 
    }
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-700">Select Your Assistant:</h4>
      <div className="flex flex-wrap gap-2">
        {bots.map((bot) => {
          const IconComponent = bot.icon;
          return (
            <button
              key={bot.id}
              onClick={() => onBotChange(bot.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedBot === bot.id
                  ? `${bot.color} text-white shadow-md scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="hidden sm:block">{bot.name}</span>
              <span className="sm:hidden font-bangla text-xs">{bot.bangla}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatbotSelector;