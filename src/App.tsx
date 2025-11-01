import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChatSystem from './components/ChatSystem';
import VoiceAssistant from './components/VoiceAssistant';
import UserProfile from './components/UserProfile';
import SOSButton from './components/SOSButton';
import ReportSystem from './components/ReportSystem';
import Library from './components/Library';
import FactCheck from './components/FactCheck';
import CreateAndEarn from './components/CreateAndEarn';
import { awardPoints, PointAction } from './utils/pointsSystem';
import PointsToast from './components/PointsToast';
import './styles/fonts.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState('general');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [hasReceivedSignupBonus, setHasReceivedSignupBonus] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);
  const [user, setUser] = useState({
    name: 'রাহুল আহমেদ',
    email: 'rahul@example.com',
    level: 5,
    points: 1250,
    badges: ['সহায়ক', 'শিক্ষার্থী', 'কমিউনিটি সদস্য'],
    impactScore: 85,
    contributionRating: 4.5,
    joinedDate: '2024-01-15'
  });

  // Function to update user points
  const updateUserPoints = (points: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  // Award signup bonus when user logs in for first time
  useEffect(() => {
    if (isLoggedIn && !hasReceivedSignupBonus) {
      setTimeout(() => {
        awardPoints(user.email, 'SIGNUP_BONUS', (points, action) => {
          setPointsToast({ points, action });
          updateUserPoints(points);
        });
        setHasReceivedSignupBonus(true);
      }, 1000); // Delay to show after login animation
    }
  }, [isLoggedIn, hasReceivedSignupBonus, user.email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setIsChatOpen={setIsChatOpen}
        setSelectedChatbot={setSelectedChatbot}
        user={user}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <main className="relative">
        {/* Before Login: Show Hero */}
        {activeSection === 'home' && !isLoggedIn && (
          <Hero 
            setIsChatOpen={setIsChatOpen} 
            setIsLoggedIn={setIsLoggedIn}
            setActiveSection={setActiveSection}
          />
        )}

        {/* After Login: Show Dashboard with Facebook-like Feed */}
        {activeSection === 'home' && isLoggedIn && (
          <Dashboard
            user={user}
            setSelectedChatbot={setSelectedChatbot}
            setIsChatOpen={setIsChatOpen}
            setActiveSection={setActiveSection}
            updateUserPoints={updateUserPoints}
          />
        )}
        
        {activeSection === 'profile' && <UserProfile user={user} setUser={setUser} />}
        {activeSection === 'library' && <Library user={user} />}
        {activeSection === 'report' && <ReportSystem user={user} updateUserPoints={updateUserPoints} />}
        {activeSection === 'factcheck' && <FactCheck />}
        {activeSection === 'createandearn' && <CreateAndEarn />}
        
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

        {/* Points Toast Notification */}
        {pointsToast && (
          <PointsToast
            points={pointsToast.points}
            action={pointsToast.action}
            onClose={() => setPointsToast(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;