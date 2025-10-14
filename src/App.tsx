import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UserGuide from './components/UserGuide';
import AILab from './components/AILab';
import VolunteerSection from './components/VolunteerSection';
import ChatSystem from './components/ChatSystem';
import VoiceAssistant from './components/VoiceAssistant';
import UserProfile from './components/UserProfile';
import SocialImpactHub from './components/SocialImpactHub';
import GamificationSystem from './components/GamificationSystem';
import SOSButton from './components/SOSButton';
import ReportSystem from './components/ReportSystem';
import './styles/fonts.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState('general');
  const [user, setUser] = useState({
    name: 'রাহুল আহমেদ',
    level: 5,
    points: 1250,
    badges: ['সহায়ক', 'শিক্ষার্থী', 'কমিউনিটি সদস্য'],
    impactScore: 85,
    joinedDate: '2024-01-15'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setIsChatOpen={setIsChatOpen}
        user={user}
      />
      
      <main className="relative">
        {activeSection === 'home' && (
          <>
            <Hero setIsChatOpen={setIsChatOpen} />
            <Features 
              setSelectedChatbot={setSelectedChatbot}
              setIsChatOpen={setIsChatOpen}
            />
            <GamificationSystem user={user} />
          </>
        )}
        
        {activeSection === 'guide' && <UserGuide />}
        {activeSection === 'accessibility' && <AILab />}
        {activeSection === 'volunteer' && <VolunteerSection />}
        {activeSection === 'profile' && <UserProfile user={user} setUser={setUser} />}
        {activeSection === 'impact' && <SocialImpactHub user={user} />}
        
        {/* Combined Report & Help Section */}
        {(activeSection === 'elder-support' || activeSection === 'create') && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Report & Get Help
                  <span className="block text-2xl font-bangla text-indigo-600 mt-2">
                    রিপোর্ট করুন এবং সাহায্য পান
                  </span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
                  সমস্যা রিপোর্ট করুন, প্রচারণা শুরু করুন অথবা জরুরি সাহায্য পান
                </p>
              </div>

              {/* Quick Action Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                {/* Emergency Report Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    জরুরি রিপোর্ট
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    নির্যাতন, সাইবার বুলিং বা জরুরি সমস্যা রিপোর্ট করুন
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: document.getElementById('report-system')?.offsetTop || 0, behavior: 'smooth' })}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla font-semibold"
                  >
                    রিপোর্ট করুন
                  </button>
                </div>

                {/* Create Campaign Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    প্রচারণা তৈরি করুন
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    সামাজিক প্রচারণা শুরু করুন এবং কমিউনিটির সাথে কাজ করুন
                  </p>
                  <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bangla font-semibold">
                    প্রচারণা শুরু করুন
                  </button>
                </div>

                {/* Community Issue Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚩</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    কমিউনিটি সমস্যা
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    এলাকার সমস্যা তুলে ধরুন এবং সমাধানের জন্য কাজ করুন
                  </p>
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bangla font-semibold">
                    সমস্যা রিপোর্ট করুন
                  </button>
                </div>
              </div>

              {/* Report System */}
              <div id="report-system" className="scroll-mt-20">
                <ReportSystem />
              </div>

              {/* Additional Help Options */}
              <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 font-bangla mb-6 text-center">
                  আরও সাহায্য প্রয়োজন?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 font-bangla">জরুরি হটলাইন</h4>
                        <p className="text-sm text-gray-600">24/7 সেবা</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">জাতীয় জরুরি সেবা:</span>
                        <a href="tel:999" className="text-lg font-bold text-red-600 hover:text-red-700">999</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">নারী ও শিশু হেল্পলাইন:</span>
                        <a href="tel:109" className="text-lg font-bold text-red-600 hover:text-red-700">109</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">বয়স্ক হেল্পলাইন:</span>
                        <a href="tel:10921" className="text-lg font-bold text-red-600 hover:text-red-700">10921</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 font-bangla">অনলাইন সাহায্য</h4>
                        <p className="text-sm text-gray-600">তাৎক্ষণিক চ্যাট</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-bangla font-semibold"
                    >
                      AI সহায়কের সাথে চ্যাট করুন
                    </button>
                    <p className="text-xs text-gray-500 font-bangla mt-2 text-center">
                      সম্পূর্ণ গোপনীয় এবং নিরাপদ
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Get Started */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 font-bangla mb-6 text-center">
                  কিভাবে শুরু করবেন?
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-blue-600">১</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সমস্যা চিহ্নিত করুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">আপনার সমস্যা বা লক্ষ্য নির্ধারণ করুন</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-green-600">২</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">রিপোর্ট করুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">ফর্ম পূরণ করুন বা প্রচারণা তৈরি করুন</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-purple-600">৩</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সাহায্য পান</h4>
                    <p className="text-sm text-gray-600 font-bangla">আমরা দ্রুত সাড়া দেব এবং সাহায্য করব</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-red-600">৪</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সমাধান দেখুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">অগ্রগতি ট্র্যাক করুন এবং ফলাফল দেখুন</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <ChatSystem
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          selectedBot={selectedChatbot}
          onBotChange={setSelectedChatbot}
          user={user}
          setUser={setUser}
        />
        
        <SOSButton user={user} />
        <VoiceAssistant />
      </main>
    </div>
  );
}

export default App;