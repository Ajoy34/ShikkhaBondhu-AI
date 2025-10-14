import React, { useState, useEffect } from 'react';
import { MessageCircle, Shield, Heart, Users, BookOpen, Zap, Sparkles, GraduationCap, Coins, ShieldCheck, TrendingUp, Award, Lock, MapPin, Navigation, Phone, Ambulance, Home } from 'lucide-react';

interface HeroProps {
  setIsChatOpen: (open: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsChatOpen }) => {
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate counters
    const targets = [50000, 24, 100, 5];
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats(targets.map(target => 
        Math.floor(target * Math.min(progress, 1))
      ));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

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
        <div className={`max-w-4xl mx-auto mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <Zap className="w-4 h-4 animate-pulse" />
            <span>New: AI-Powered Support System</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4 font-inter">
            Your Friend for
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
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
                style={{ animationDelay: `${index * 100}ms` }}
                className={`group flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              >
                <div className={`${action.color} p-3 rounded-xl mb-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{action.label}</span>
                <span className="font-bangla text-xs text-gray-500 mt-1">{action.bangla}</span>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-2 mx-auto group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <MessageCircle className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Start Conversation with Bondhu</span>
            <Sparkles className="w-4 h-4 relative z-10 animate-pulse" />
          </button>
          
          <p className="text-sm text-gray-500 font-bangla">
            সম্পূর্ণ বিনামূল্যে এবং গোপনীয় সেবা
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { number: `${(animatedStats[0] / 1000).toFixed(0)}K+`, label: 'Students Helped', bangla: 'ছাত্র সাহায্য', color: 'text-blue-600' },
            { number: `${animatedStats[1]}/${animatedStats[1] > 7 ? '7' : animatedStats[1]}`, label: 'Available Support', bangla: 'সার্বক্ষণিক সেবা', color: 'text-green-600' },
            { number: `${animatedStats[2]}%`, label: 'Confidential', bangla: 'গোপনীয়তা', color: 'text-purple-600' },
            { number: `${animatedStats[3]}+`, label: 'Specialized Bots', bangla: 'বিশেষজ্ঞ বট', color: 'text-pink-600' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`text-3xl font-bold ${stat.color} group-hover:scale-125 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">{stat.label}</div>
              <div className="text-xs text-gray-500 font-bangla">{stat.bangla}</div>
            </div>
          ))}
        </div>

        {/* Learn, Earn, Safety Section for Students */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              For All People of Bangladesh
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> - Especially Students</span>
            </h2>
            <p className="font-bangla text-xl text-indigo-600 font-semibold">
              বাংলাদেশের সকল মানুষের জন্য - বিশেষ করে শিক্ষার্থীদের জন্য
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Learn Section */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-blue-200 hover:border-blue-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Learn & Grow
                </h3>
                <p className="font-bangla text-lg font-semibold text-blue-600 mb-4">
                  শিখুন এবং বেড়ে উঠুন
                </p>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <BookOpen className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Free Education:</strong> Access quality learning materials for all subjects</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Skill Development:</strong> Learn programming, design, and digital skills</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>AI Tutoring:</strong> Get personalized study help 24/7</span>
                  </li>
                </ul>

                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  Start Learning Now
                </button>
              </div>
            </div>

            {/* Earn Section */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-green-200 hover:border-green-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Contribute & Prosper
                </h3>
                <p className="font-bangla text-lg font-semibold text-green-600 mb-4">
                  দেশ ও পরিবারের জন্য অবদান রাখুন
                </p>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Economic Growth:</strong> Build skills that strengthen our national economy</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Family Welfare:</strong> Learn sustainable ways to support your loved ones</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Career Development:</strong> Connect with opportunities that serve society</span>
                  </li>
                </ul>

                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  Build Your Future
                </button>
              </div>
            </div>

            {/* Safety Section */}
            <div className="group relative bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-red-200 hover:border-red-400">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  Stay Safe & Secure
                </h3>
                <p className="font-bangla text-lg font-semibold text-red-600 mb-4">
                  নিরাপদ এবং সুরক্ষিত থাকুন
                </p>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Lock className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Confidential Support:</strong> Report issues anonymously and safely</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Emergency Help:</strong> Quick access to police, NGOs, hospitals</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Mental Health:</strong> Counseling and emotional support available</span>
                  </li>
                </ul>

                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="mt-6 w-full bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  Get Help Now
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Help Locations Map Section */}
          <div className="mt-16 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200 transform hover:scale-[1.02] transition-all duration-500">
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 p-6 text-white">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <MapPin className="w-8 h-8 animate-bounce" />
                <h2 className="text-3xl font-bold">Emergency Help Near You</h2>
                <MapPin className="w-8 h-8 animate-bounce" />
              </div>
              <p className="text-center text-white/90 font-bangla text-lg">
                জরুরী সহায়তা কেন্দ্র - আপনার আশেপাশে
              </p>
              <p className="text-center text-sm text-white/80 mt-2">
                Find police stations, hospitals, NGOs, and support centers across Dhaka
              </p>
            </div>

            <div className="p-6">
              {/* Map */}
              <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.25487837759632!3d23.78097572377912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1640000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                
                {/* Map Legend */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl z-10 border-2 border-gray-200">
                  <h4 className="font-bold text-sm mb-3 text-gray-800">Help Location Types</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-600 mr-2" />
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="font-medium">Police Stations (9)</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-green-600 mr-2" />
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">NGO Support (3)</span>
                    </div>
                    <div className="flex items-center">
                      <Ambulance className="w-4 h-4 text-red-600 mr-2" />
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="font-medium">Hospitals (2)</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-4 h-4 text-purple-600 mr-2" />
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="font-medium">Support Centers (1)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl z-10 border-2 border-green-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-green-700 text-sm">15 Active Locations</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">89 Volunteers Available</p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900">Police Support</h4>
                  </div>
                  <p className="text-sm text-blue-700">9 police stations ready to help 24/7</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <Phone className="w-3 h-3 mr-1" />
                    <span className="font-semibold">Call 999 for emergency</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-red-500 p-2 rounded-lg">
                      <Ambulance className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-red-900">Medical Help</h4>
                  </div>
                  <p className="text-sm text-red-700">2 major hospitals with emergency care</p>
                  <div className="mt-3 flex items-center text-xs text-red-600">
                    <Phone className="w-3 h-3 mr-1" />
                    <span className="font-semibold">Available 24/7</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-green-900">NGO Support</h4>
                  </div>
                  <p className="text-sm text-green-700">3 NGOs providing elder & social care</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <Phone className="w-3 h-3 mr-1" />
                    <span className="font-semibold">Free counseling available</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6 text-center">
                <button
                  className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-600 hover:via-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <MapPin className="w-5 h-5" />
                  <span>View All 15 Help Locations</span>
                  <Navigation className="w-5 h-5" />
                </button>
                <p className="text-xs text-gray-500 mt-3 font-bangla">
                  সম্পূর্ণ তালিকা দেখতে SOS বাটনে ক্লিক করুন
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              🇧🇩 Built for Bangladesh, By Bangladeshis
            </h3>
            <p className="font-bangla text-lg mb-4">
              বাংলাদেশীদের জন্য, বাংলাদেশীদের দ্বারা তৈরি
            </p>
            <p className="text-white/90 max-w-3xl mx-auto">
              Whether you're a student seeking knowledge, looking for income opportunities, 
              or need safety support - ShikkhaBondhu is here for every Bangladeshi citizen, 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;