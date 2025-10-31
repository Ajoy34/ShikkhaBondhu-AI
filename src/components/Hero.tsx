import React from 'react';
import { MessageCircle, Shield, AlertTriangle, Cpu, Bot, Sparkles } from 'lucide-react';

interface HeroProps {
  setIsChatOpen: (open: boolean) => void;
  setIsLoggedIn: (logged: boolean) => void;
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsChatOpen, setIsLoggedIn, setActiveSection }) => {
  const handleGetStarted = () => {
    setIsLoggedIn(true);
    setActiveSection('home');
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold">Powered by Advanced AI Technology</span>
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Welcome to
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ShikkhaBondhu
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Your comprehensive AI-powered platform for safety, learning, and community support in Bangladesh
          </p>

          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <span>Get Started Now</span>
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
