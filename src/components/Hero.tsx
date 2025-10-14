import React from 'react';
import { MessageCircle, Shield, Heart, Users, BookOpen, Zap } from 'lucide-react';

interface HeroProps {
  setIsChatOpen: (open: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsChatOpen }) => {
  const quickActions = [
    { 
      icon: MessageCircle, 
      label: 'Instant Chat', 
      bangla: 'তাৎক্ষণিক চ্যাট',
      color: 'bg-blue-500',
      action: () => setIsChatOpen(true)
    },
    { 
      icon: Shield, 
      label: 'Report Safely', 
      bangla: 'নিরাপদে রিপোর্ট',
      color: 'bg-red-500',
      action: () => setIsChatOpen(true)
    },
    { 
      icon: Heart, 
      label: 'Health Support', 
      bangla: 'স্বাস্থ্য সেবা',
      color: 'bg-green-500',
      action: () => setIsChatOpen(true)
    },
    { 
      icon: Users, 
      label: 'Join Community', 
      bangla: 'কমিউনিটি',
      color: 'bg-purple-500',
      action: () => setIsChatOpen(true)
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>New: AI-Powered Support System</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4 font-inter">
            Your Friend for
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Support & Growth
            </span>
          </h1>
          
          <p className="font-bangla text-2xl md:text-3xl font-bold text-indigo-600 mb-6">
            আপনার শেখা ও বেড়ে ওঠার বিশ্বস্ত সাথী
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ShikkhaBondhu is Bangladesh's most comprehensive digital platform providing confidential support, 
            practical skills training, health guidance, and safety resources for students across the country.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className={`${action.color} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm">{action.label}</span>
                <span className="font-bangla text-xs text-gray-500 mt-1">{action.bangla}</span>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start Conversation with Bondhu</span>
          </button>
          
          <p className="text-sm text-gray-500 font-bangla">
            সম্পূর্ণ বিনামূল্যে এবং গোপনীয় সেবা
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { number: '50K+', label: 'Students Helped', bangla: 'ছাত্র সাহায্য' },
            { number: '24/7', label: 'Available Support', bangla: 'সার্বক্ষণিক সেবা' },
            { number: '100%', label: 'Confidential', bangla: 'গোপনীয়তা' },
            { number: '5+', label: 'Specialized Bots', bangla: 'বিশেষজ্ঞ বট' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500 font-bangla">{stat.bangla}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;