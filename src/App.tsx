import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatSystem from './components/ChatSystem';
import VoiceAssistant from './components/VoiceAssistant';
import UserProfile from './components/UserProfile';
import SOSButton from './components/SOSButton';
import ReportSystem from './components/ReportSystem';
import './styles/fonts.css';
import ReviewBar from './components/ReviewBar';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState('general');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState({
    name: 'রাহুল আহমেদ',
    level: 5,
    points: 1250,
    badges: ['সহায়ক', 'শিক্ষার্থী', 'কমিউনিটি সদস্য'],
    impactScore: 85,
    contributionRating: 4.5,
    joinedDate: '2024-01-15'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setIsChatOpen={setIsChatOpen}
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <main className="relative">
        {/* Preview/Review banner (enable with VITE_REVIEW_MODE=1 or add ?review=1 to URL) */}
        <ReviewBar />
        {/* Before Login: Show Hero */}
        {activeSection === 'home' && !isLoggedIn && (
          <Hero 
            setIsChatOpen={setIsChatOpen} 
            setIsLoggedIn={setIsLoggedIn}
            setActiveSection={setActiveSection}
          />
        )}

        {/* After Login: Show Dashboard with Trending Content */}
        {activeSection === 'home' && isLoggedIn && (
          <Features 
            setSelectedChatbot={setSelectedChatbot}
            setIsChatOpen={setIsChatOpen}
            user={user}
          />
        )}
        
        {activeSection === 'profile' && <UserProfile user={user} setUser={setUser} />}
        {activeSection === 'report' && <ReportSystem />}
        
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