import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChatSystem from './components/ChatSystem';
import PointsToast from './components/PointsToast';
import UserProfile from './components/UserProfile';
import VoiceAssistant from './components/VoiceAssistant';
import VolunteerSection from './components/VolunteerSection';
import SOSButton from './components/SOSButton';
import ReportSystem from './components/ReportSystem';
import Library from './components/Library';
import FactCheck from './components/FactCheck';
import CreateAndEarn from './components/CreateAndEarn';
import SignupDiagnostics from './components/SignupDiagnostics';
import SimpleSignupTest from './components/SimpleSignupTest';
import { QuickTest } from './components/QuickTest';
import ReviewBar from './components/ReviewBar';
import { awardPoints, PointAction } from './utils/pointsSystem';
import './styles/fonts.css';
import { getCurrentUser, getUserProfile, onAuthStateChange } from './lib/auth';
import type { User } from '@supabase/supabase-js';
import type { UserProfile as UserProfileType } from './lib/auth';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState('general');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasReceivedSignupBonus, setHasReceivedSignupBonus] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  
  // Fallback user state for display
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    level: 1,
    points: 0,
    badges: [] as string[],
    impactScore: 0,
    contributionRating: 0,
    joinedDate: new Date().toISOString()
  });

  // Check authentication on mount
  useEffect(() => {
    // IMMEDIATELY show content - don't wait for auth
    setIsLoading(false);
    setIsLoggedIn(false);
    
    // Check if we should redirect to dashboard after login
    const shouldRedirectToDashboard = sessionStorage.getItem('redirectToDashboard');
    if (shouldRedirectToDashboard === 'true') {
      sessionStorage.removeItem('redirectToDashboard');
      setActiveSection('dashboard');
    }
    
    // Check if diagnostics should be shown via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('diagnostics') === 'true') {
      setShowDiagnostics(true);
    }
    if (urlParams.get('test') === 'signup') {
      // Show simple signup test
      window.location.href = '/?test=signup';
    }
    
    // Keyboard shortcut: Ctrl+Shift+D to open diagnostics
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDiagnostics(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    // Check auth in background - don't block UI
    checkAuth();

    // Subscribe to auth changes
    const unsubscribe = onAuthStateChange(async (user) => {
      console.log('🔐 Auth state changed! User:', user?.email || 'null');
      if (user) {
        console.log('🔐 User logged in, setting states...');
        setAuthUser(user);
        setIsLoggedIn(true);
        await loadUserProfile(user.id);
        // If user just logged in, navigate to dashboard
        if (activeSection === 'home') {
          console.log('🔐 Navigating to dashboard from home');
          setActiveSection('dashboard');
        } else {
          console.log('🔐 Current section:', activeSection, '- not navigating');
        }
      } else {
        console.log('🔐 User logged out');
        setAuthUser(null);
        setIsLoggedIn(false);
        setUserProfile(null);
        setActiveSection('home');
      }
    });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      unsubscribe();
    };
  }, []);

  // Check current authentication status
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Auth check timed out, proceeding without authentication');
        setIsLoggedIn(false);
        setIsLoading(false);
      }, 10000); // 10 second timeout
      
      const user = await getCurrentUser();
      clearTimeout(timeoutId);
      
      if (user) {
        setAuthUser(user);
        setIsLoggedIn(true);
        await loadUserProfile(user.id);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile from Supabase
  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
        // Update display user state
        setUser({
          name: profile.full_name || 'User',
          email: profile.email,
          level: profile.level,
          points: profile.points,
          badges: profile.badges || [],
          impactScore: profile.impact_score,
          contributionRating: 0, // Can be calculated from activity
          joinedDate: profile.created_at
        });
      }
    } catch (error) {
      console.error('Load profile error:', error);
    }
  };

  // Function to update user points
  const updateUserPoints = (points: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points
    }));
    
    // Also update profile state
    if (userProfile) {
      setUserProfile(prev => prev ? { ...prev, points: prev.points + points } : null);
    }
  };

  // Award signup bonus when user logs in for first time
  useEffect(() => {
    if (isLoggedIn && !hasReceivedSignupBonus && userProfile) {
      setTimeout(() => {
        awardPoints(user.email, 'SIGNUP_BONUS', (points, action) => {
          setPointsToast({ points, action });
          updateUserPoints(points);
        });
        setHasReceivedSignupBonus(true);
      }, 1000);
    }
  }, [isLoggedIn, hasReceivedSignupBonus, userProfile, user.email]);

  // Protected route check
  const renderProtectedSection = (section: string) => {
    if (!isLoggedIn) {
      return (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-2 font-bangla">
              এই বিভাগে প্রবেশের জন্য লগইন করুন
            </p>
            <p className="text-gray-600 mb-6">
              Please log in to access this section
            </p>
            <button
              onClick={() => setActiveSection('home')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    // Render the actual section
    switch (section) {
      case 'profile':
        return <UserProfile user={user} setUser={setUser} authUser={authUser} userProfile={userProfile} />;
      case 'library':
        return <Library user={user} />;
      case 'report':
        return <ReportSystem user={user} updateUserPoints={updateUserPoints} />;
      case 'factcheck':
        return <FactCheck />;
      case 'createandearn':
        return <CreateAndEarn />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-bangla">লোড হচ্ছে...</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Home Section */}
        {activeSection === 'home' && !isLoggedIn && (
          <Hero 
            setIsChatOpen={setIsChatOpen} 
            setIsLoggedIn={setIsLoggedIn}
            setActiveSection={setActiveSection}
            onAuthSuccess={checkAuth}
          />
        )}

        {/* Dashboard - show for 'home' when logged in OR 'dashboard' section */}
        {((activeSection === 'home' || activeSection === 'dashboard') && isLoggedIn) && (
          <Dashboard
            user={user}
            setSelectedChatbot={setSelectedChatbot}
            setIsChatOpen={setIsChatOpen}
            setActiveSection={setActiveSection}
            updateUserPoints={updateUserPoints}
          />
        )}
        
        {/* Protected Sections */}
        {activeSection !== 'home' && activeSection !== 'dashboard' && renderProtectedSection(activeSection)}
        
        {/* Chat System - Require Login */}
        {isLoggedIn ? (
          <ChatSystem
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            selectedBot={selectedChatbot}
            onBotChange={setSelectedChatbot}
            user={user}
            setUser={setUser}
          />
        ) : null}
        
        <SOSButton user={user} />
        <VoiceAssistant />

        {/* Quick Test Button - Always visible in bottom right */}
        <QuickTest />

        {/* Diagnostics Modal - Auto-shows on mount for debugging */}
        {showDiagnostics && <SignupDiagnostics />}
        
        {/* Simple Signup Test - Show with ?test=signup */}
        {new URLSearchParams(window.location.search).get('test') === 'signup' && <SimpleSignupTest />}

        {/* Points Toast Notification */}
        {pointsToast && (
          <PointsToast
            points={pointsToast.points}
            action={pointsToast.action}
            onClose={() => setPointsToast(null)}
          />
        )}
      </>
    );
  };

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
        onAuthChange={checkAuth}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      <ReviewBar />
    </div>
  );
}

export default App;