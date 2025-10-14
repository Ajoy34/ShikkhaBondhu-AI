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
        {activeSection === 'gamification' && <GamificationSystem user={user} />}
        {activeSection === 'accessibility' && <AILab />}
        {activeSection === 'volunteer' && <VolunteerSection />}
        {activeSection === 'profile' && <UserProfile user={user} setUser={setUser} />}
        {activeSection === 'impact' && <SocialImpactHub user={user} />}
        
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