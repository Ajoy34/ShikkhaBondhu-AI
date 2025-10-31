import React, { useState } from 'react';
import { MessageCircle, Shield, Bot, Sparkles, Code, TrendingUp, Zap, Lock, Video, Search, BookOpen, GraduationCap } from 'lucide-react';

interface HeroProps {
  setIsChatOpen: (open: boolean) => void;
  setIsLoggedIn: (logged: boolean) => void;
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setIsChatOpen, setIsLoggedIn, setActiveSection }) => {
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [targetSection, setTargetSection] = useState('home');

  const handleFeatureClick = (featureName: string, section: string = 'home') => {
    setSelectedFeature(featureName);
    setTargetSection(section);
    setShowSignupPrompt(true);
  };

  const handleSignupNow = () => {
    setShowSignupPrompt(false);
    setIsLoggedIn(true);
    // Redirect to specific section based on feature clicked
    if (targetSection === 'chat') {
      setActiveSection('home');
      setTimeout(() => setIsChatOpen(true), 500);
    } else {
      setActiveSection(targetSection);
    }
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Chat Assistant & Learn",
      titleBn: "এআই চ্যাট সহায়ক এবং শিখুন",
      description: "Get instant answers, guidance & quality education 24/7",
      descriptionBn: "২৪/৭ তাৎক্ষণিক উত্তর, পরামর্শ এবং শিক্ষা পান",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      action: () => handleFeatureClick("AI Chat Assistant & Learn", "chat")
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Report, SOS & Emergency Help",
      titleBn: "রিপোর্ট, এসওএস এবং জরুরি সাহায্য",
      description: "Report issues, get emergency support & instant help",
      descriptionBn: "সমস্যা জানান, জরুরি সহায়তা এবং তাৎক্ষণিক সাহায্য পান",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-50 to-orange-50",
      action: () => handleFeatureClick("Report, SOS & Emergency Help", "report")
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Fact Check & Gossip Detector",
      titleBn: "তথ্য যাচাই এবং গুজব শনাক্তকরণ",
      description: "Verify news, detect fake information with AI",
      descriptionBn: "AI দিয়ে খবর যাচাই করুন, ভুয়া তথ্য শনাক্ত করুন",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      action: () => handleFeatureClick("Fact Check & Gossip Detector", "home")
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI Lab (Coming Soon)",
      titleBn: "এআই ল্যাব (শীঘ্রই আসছে)",
      description: "Build games, tools & code - Be independent, not dependent",
      descriptionBn: "গেম, টুলস তৈরি করুন - নিজে শিখুন, অন্যের উপর নির্ভর করবেন না",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      badge: "🚀 Upcoming",
      action: () => handleFeatureClick("AI Lab", "home")
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Create & Earn",
      titleBn: "তৈরি করুন এবং আয় করুন",
      description: "Create courses, books & videos - Earn like Udemy & Kindle",
      descriptionBn: "কোর্স, বই এবং ভিডিও তৈরি করুন এবং আয় করুন",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      action: () => handleFeatureClick("Create & Earn", "home")
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
                
                {/* Badge for upcoming features */}
                {feature.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    {feature.badge}
                  </div>
                )}
                
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

        {/* Bangladeshi E-Course & Book Library Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md mb-4">
                <BookOpen className="w-6 h-6 text-amber-600 animate-pulse" />
                <span className="text-amber-900 font-bold text-lg">বাংলাদেশি শিক্ষা সম্পদ</span>
                <GraduationCap className="w-6 h-6 text-amber-600" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Bangladeshi E-Course & Book Library
                <span className="block text-2xl font-bangla text-amber-700 mt-2">
                  বাংলাদেশি ই-কোর্স এবং বই লাইব্রেরি
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
                Access thousands of quality courses and books created by Bangladeshi experts
              </p>
              <p className="text-base text-gray-600 font-bangla max-w-3xl mx-auto">
                বাংলাদেশী বিশেষজ্ঞদের তৈরি হাজারো মানসম্পন্ন কোর্স এবং বই অ্যাক্সেস করুন
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Courses */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-300">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Video Courses</h3>
                <p className="text-sm font-bangla text-indigo-600 font-semibold mb-3">ভিডিও কোর্স</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Programming, Web Dev, AI/ML</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Digital Marketing & Business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Life Skills & Personal Growth</span>
                  </li>
                  <li className="flex items-start font-bangla text-indigo-600">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>বাংলায় ও ইংরেজিতে উপলব্ধ</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-xs text-gray-500 bg-indigo-50 rounded-lg p-3">
                  <span className="font-semibold">5,000+ Courses</span>
                  <span className="font-bangla">৫,০০০+ কোর্স</span>
                </div>
              </div>

              {/* Books */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Books</h3>
                <p className="text-sm font-bangla text-green-600 font-semibold mb-3">ডিজিটাল বই</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Academic & Educational Books</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Self-Help & Motivation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Technology & Innovation</span>
                  </li>
                  <li className="flex items-start font-bangla text-green-600">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>বাংলাদেশী লেখকদের বই</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-xs text-gray-500 bg-green-50 rounded-lg p-3">
                  <span className="font-semibold">10,000+ Books</span>
                  <span className="font-bangla">১০,০০০+ বই</span>
                </div>
              </div>

              {/* AI Books */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                  <Bot className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Generated Books</h3>
                <p className="text-sm font-bangla text-purple-600 font-semibold mb-3">এআই দ্বারা তৈরি বই</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Custom AI-generated content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized study materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Quick summaries & guides</span>
                  </li>
                  <li className="flex items-start font-bangla text-purple-600">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>এআই সহায়তায় শিখুন দ্রুত</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-xs text-gray-500 bg-purple-50 rounded-lg p-3">
                  <span className="font-semibold">Unlimited Access</span>
                  <span className="font-bangla">সীমাহীন সুবিধা</span>
                </div>
              </div>
            </div>

            {/* Library Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-indigo-600">5K+</div>
                <div className="text-xs text-gray-600 font-bangla">ভিডিও কোর্স</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-green-600">10K+</div>
                <div className="text-xs text-gray-600 font-bangla">ডিজিটাল বই</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-xs text-gray-600 font-bangla">বাংলায়</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-orange-600">Free</div>
                <div className="text-xs text-gray-600 font-bangla">বিনামূল্যে</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleSignupNow}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <BookOpen className="w-6 h-6" />
                <span>Browse Library</span>
                <span className="font-bangla">লাইব্রেরি দেখুন</span>
              </button>
              <p className="mt-3 text-sm text-gray-600 font-bangla">
                ✨ সম্পূর্ণ বিনামূল্যে • কোন সাবস্ক্রিপশন ফি নেই
              </p>
            </div>
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
              
              {selectedFeature === "AI Lab" ? (
                <div className="text-left bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">🚀 AI Lab Features:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ Build games & tools without dependency</li>
                    <li>✓ Step-by-step coding guidance</li>
                    <li>✓ Interactive learning chat system</li>
                    <li>✓ Video tutorials & implementation guides</li>
                    <li className="font-bangla text-indigo-600">নিজে তৈরি করুন, অন্যের উপর নির্ভর করবেন না!</li>
                  </ul>
                </div>
              ) : selectedFeature === "Create & Earn" ? (
                <div className="text-left bg-pink-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">💰 Create & Earn Features:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ Create video courses (like Udemy)</li>
                    <li>✓ Publish digital books (like Kindle)</li>
                    <li>✓ Build your own course library</li>
                    <li>✓ Earn from your content</li>
                    <li className="font-bangla text-pink-600">কোর্স ও বই তৈরি করে আয় করুন!</li>
                  </ul>
                </div>
              ) : selectedFeature === "Fact Check & Gossip Detector" ? (
                <div className="text-left bg-green-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">🔍 Fact Check Features:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ AI-powered news verification</li>
                    <li>✓ Detect fake news & misinformation</li>
                    <li>✓ Gossip detector with source checking</li>
                    <li>✓ Real-time fact checking</li>
                    <li className="font-bangla text-green-600">গুজব ও ভুয়া খবর থেকে সুরক্ষিত থাকুন!</li>
                  </ul>
                </div>
              ) : selectedFeature === "AI Chat Assistant & Learn" ? (
                <div className="text-left bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">💬 AI Chat & Learning:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ 24/7 instant answers & guidance</li>
                    <li>✓ Quality education resources</li>
                    <li>✓ Personalized learning paths</li>
                    <li>✓ Interactive study assistance</li>
                    <li className="font-bangla text-blue-600">শিখুন এবং এগিয়ে যান আত্মবিশ্বাসের সাথে!</li>
                  </ul>
                </div>
              ) : selectedFeature === "Report, SOS & Emergency Help" ? (
                <div className="text-left bg-red-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">🚨 Report & Emergency:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ Instant emergency SOS alerts</li>
                    <li>✓ Report issues & get support</li>
                    <li>✓ Connect with help services</li>
                    <li>✓ Location-based emergency response</li>
                    <li className="font-bangla text-red-600">জরুরি মুহূর্তে তাৎক্ষণিক সাহায্য পান!</li>
                  </ul>
                </div>
              ) : (
                <p className="text-gray-600 mb-6">
                  Sign up now to access all features including AI chat, emergency support, reporting, and community help!
                </p>
              )}
              
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
