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
        {activeSection === 'elder-support' && <ReportSystem />}
        {activeSection === 'create' && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-bangla">
                  নতুন প্রচারণা বা সমস্যা রিপোর্ট করুন
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 font-bangla mb-2">নতুন প্রচারণা</h4>
                    <p className="text-gray-600 font-bangla mb-4">
                      একটি সামাজিক প্রচারণা শুরু করুন এবং কমিউনিটির সাথে মিলে পরিবর্তন আনুন
                    </p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bangla">
                      প্রচারণা তৈরি করুন
                    </button>
                  </div>
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🚩</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 font-bangla mb-2">সমস্যা রিপোর্ট</h4>
                    <p className="text-gray-600 font-bangla mb-4">
                      আপনার এলাকার কোন সমস্যা রিপোর্ট করুন এবং সমাধানের জন্য কাজ করুন
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla">
                      সমস্যা রিপোর্ট করুন
                    </button>
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