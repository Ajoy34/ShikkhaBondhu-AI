import React, { useState } from 'react';
import { MessageCircle, Shield, AlertTriangle, Bot, Sparkles, BookOpen, Users, Heart, TrendingUp, Zap, Lock } from 'lucide-react';

interface HeroProps {
  setIsChatOpen: (open: boolean) => void;
  setIsLoggedIn: (logged: boolean) => void;
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsChatOpen, setIsLoggedIn, setActiveSection }) => {
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName);
    setShowSignupPrompt(true);
  };

  const handleSignupNow = () => {
    setShowSignupPrompt(false);
    setIsLoggedIn(true);
    setActiveSection('home');
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Chat Assistant",
      titleBn: "এআই চ্যাট সহায়ক",
      description: "Get instant answers and guidance 24/7",
      descriptionBn: "২৪/৭ তাৎক্ষণিক উত্তর এবং পরামর্শ পান",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      action: () => handleFeatureClick("AI Chat Assistant")
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Emergency SOS",
      titleBn: "জরুরি এসওএস",
      description: "Instant help when you need it most",
      descriptionBn: "প্রয়োজনে তাৎক্ষণিক সাহায্য",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      action: () => handleFeatureClick("Emergency SOS")
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Report & Get Help",
      titleBn: "রিপোর্ট ও সাহায্য",
      description: "Report issues and find support",
      descriptionBn: "সমস্যা জানান এবং সহায়তা পান",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      action: () => handleFeatureClick("Report & Get Help")
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn & Grow",
      titleBn: "শিখুন ও বেড়ে উঠুন",
      description: "Access quality education resources",
      descriptionBn: "মানসম্মত শিক্ষা সামগ্রী পান",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      action: () => handleFeatureClick("Learn & Grow")
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      titleBn: "কমিউনিটি সহায়তা",
      description: "Connect with volunteers and helpers",
      descriptionBn: "স্বেচ্ছাসেবক এবং সাহায্যকারীদের সাথে যুক্ত হন",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      action: () => handleFeatureClick("Community Support")
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Elder Care",
      titleBn: "বয়স্ক সেবা",
      description: "Special support for elderly citizens",
      descriptionBn: "বয়স্ক নাগরিকদের জন্য বিশেষ সহায়তা",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      action: () => handleFeatureClick("Elder Care")
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 px-6 py-3 rounded-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold">🚀 Powered by Advanced AI Technology</span>
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 leading-tight">
            Welcome to
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              ShikkhaBondhu
            </span>
            <span className="block text-3xl md:text-4xl font-bangla text-indigo-600 mt-2">
              শিক্ষা বন্ধু
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-3 font-semibold">
            🎓 Learn • 🛡️ Stay Safe • 🤝 Get Support • 🌟 Make an Impact
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 font-bangla">
            বাংলাদেশের জন্য AI-চালিত নিরাপত্তা, শিক্ষা এবং কমিউনিটি সহায়তা প্ল্যাটফর্ম
          </p>

          {/* Stats/Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-900">50K+</span>
                <span className="text-gray-600">Active Users</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-gray-900">24/7</span>
                <span className="text-gray-600">AI Support</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-md">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900">100%</span>
                <span className="text-gray-600">Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Explore Our Features
            <span className="block text-xl font-bangla text-indigo-600 mt-2">আমাদের সেবা সমূহ দেখুন</span>
          </h2>
          <p className="text-center text-gray-600 mb-10 font-bangla">
            যেকোনো একটি ফিচার ক্লিক করুন এবং শুরু করুন
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className={`group relative bg-gradient-to-br ${feature.bgGradient} border-2 border-gray-200 rounded-2xl p-6 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 hover:border-transparent`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-bangla text-indigo-600 font-semibold mb-2">
                    {feature.titleBn}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    {feature.description}
                  </p>
                  <p className="text-gray-500 text-xs font-bangla">
                    {feature.descriptionBn}
                  </p>
                  
                  <div className="mt-4 flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                    <span className="text-sm">Try Now</span>
                    <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleSignupNow}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <span>🚀 Get Started Free</span>
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
          <p className="mt-4 text-gray-600 font-bangla">
            ✨ সম্পূর্ণ বিনামূল্যে শুরু করুন • কোন ক্রেডিট কার্ড প্রয়োজন নেই
          </p>
        </div>
      </div>

      {/* Signup Prompt Modal */}
      {showSignupPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-bounceIn">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock "{selectedFeature}"
              </h3>
              <p className="text-lg font-bangla text-indigo-600 mb-4">
                এই ফিচার ব্যবহার করতে সাইন আপ করুন
              </p>
              
              <p className="text-gray-600 mb-6">
                Sign up now to access all features including AI chat, emergency support, reporting, and community help!
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleSignupNow}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up Free 🚀
                </button>
                
                <button
                  onClick={() => setShowSignupPrompt(false)}
                  className="w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
              
              <p className="mt-4 text-xs text-gray-500">
                ✓ Free forever • ✓ No credit card • ✓ 2-minute setup
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
