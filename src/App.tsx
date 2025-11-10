import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChatSystem from './components/ChatSystem';
import PointsToast from './components/PointsToast';
import UserProfile from './components/UserProfile';
import VoiceAssistant from './components/VoiceAssistant';
import SOSButton from './components/SOSButton';
import Library from './components/Library';
import FactCheck from './components/FactCheck';
import CreateAndEarn from './components/CreateAndEarn';
import BookChat from './components/BookChat';
import SignupDiagnostics from './components/SignupDiagnostics';
import SimpleSignupTest from './components/SimpleSignupTest';
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
    console.log('🔵 App mounted - checking authentication...');
    setIsLoading(true);
    
    // Check diagnostics
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('diagnostics') === 'true') {
      setShowDiagnostics(true);
    }
    
    // Keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowDiagnostics(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    // Check auth immediately
    checkAuth().catch(err => {
      console.error('❌ checkAuth failed:', err);
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        console.log('🔔 Auth state changed - User logged in:', user.email);
        setAuthUser(user);
        setIsLoggedIn(true);
        // Update user display name immediately from email
        const userName = user.email?.split('@')[0] || 'User';
        console.log('👤 Setting user name to:', userName);
        setUser(prev => ({
          ...prev,
          name: userName,
          email: user.email || prev.email
        }));
        // Load full profile with email as fallback
        await loadUserProfile(user.id, user.email || undefined);
        setIsLoading(false);
        
        // IMPORTANT: Don't change activeSection here!
        // Let the Header component handle navigation after login
        console.log('✅ Auth state updated, staying on current page');
      } else {
        console.log('🔔 Auth state changed - User logged out');
        setAuthUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
        setUserProfile(null);
        // Reset to guest user
        setUser({
          name: 'Guest User',
          email: 'guest@example.com',
          level: 1,
          points: 0,
          badges: [],
          impactScore: 0,
          contributionRating: 0,
          joinedDate: new Date().toISOString()
        });
        // Only go to home on logout
        setActiveSection('home');
      }
    });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      unsubscribe();
    };
  }, []);

  // Check current authentication status
  const checkAuth = async (showLoadingSpinner = true) => {
    try {
      if (showLoadingSpinner) {
        setIsLoading(true);
      }
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Auth check timed out, proceeding without authentication');
        setIsLoggedIn(false);
        if (showLoadingSpinner) {
          setIsLoading(false);
        }
      }, 10000); // 10 second timeout
      
      const user = await getCurrentUser();
      clearTimeout(timeoutId);
      
      if (user) {
        console.log('✅ User session found:', user.email);
        setAuthUser(user);
        setIsLoggedIn(true);
        // Update user display name immediately from email
        const userName = user.email?.split('@')[0] || 'User';
        console.log('👤 Setting user name to:', userName);
        setUser(prev => ({
          ...prev,
          name: userName,
          email: user.email || prev.email
        }));
        // Load full profile with email as fallback
        await loadUserProfile(user.id, user.email || undefined);
      } else {
        console.log('❌ No user session found');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
    } finally {
      if (showLoadingSpinner) {
        setIsLoading(false);
      }
    }
  };

  // Load user profile from Supabase
  const loadUserProfile = async (userId: string, userEmail?: string) => {
    try {
      console.log('🔍 Loading profile for user:', userId, userEmail);
      const profile = await getUserProfile(userId);
      
      if (profile) {
        console.log('✅ Profile found:', profile);
        console.log('📋 Profile full_name:', profile.full_name);
        setUserProfile(profile);
        // Update display user state with full_name from profile
        const displayName = profile.full_name || userEmail?.split('@')[0] || 'User';
        console.log('👤 Setting display name to:', displayName);
        setUser({
          name: displayName,
          email: profile.email,
          level: profile.level,
          points: profile.points,
          badges: profile.badges || [],
          impactScore: profile.impact_score,
          contributionRating: 0, // Can be calculated from activity
          joinedDate: profile.created_at
        });
      } else {
        // Profile doesn't exist, use email data
        console.log('⚠️ Profile not found in database');
        console.log('⚠️ This means the user_profiles table might not exist or trigger not set up');
        const userName = userEmail ? userEmail.split('@')[0] : 'User';
        console.log('👤 Using fallback name from email:', userName);
        setUser(prev => ({
          ...prev,
          name: userName,
          email: userEmail || prev.email
        }));
      }
    } catch (error) {
      console.error('❌ Load profile error:', error);
      // Fallback to email-based name
      const userName = userEmail ? userEmail.split('@')[0] : 'User';
      console.log('👤 Using error fallback name from email:', userName);
      setUser(prev => ({
        ...prev,
        name: userName,
        email: userEmail || prev.email
      }));
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
        return <Library user={user} onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'factcheck':
        return <FactCheck onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'createandearn':
        return <CreateAndEarn onBackToDashboard={() => setActiveSection('dashboard')} />;
      case 'bookchat':
        try {
          return <BookChat onBackToDashboard={() => setActiveSection('dashboard')} />;
        } catch (error) {
          console.error('BookChat render error:', error);
          return (
            <div className="container mx-auto px-4 py-20 text-center">
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Component Error</h2>
                <p className="text-gray-600 mb-6 font-bangla">
                  বুক চ্যাট লোড হতে ব্যর্থ
                </p>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          );
        }
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
            onAuthSuccess={() => checkAuth(true)}
          />
        )}

        {/* Dashboard - show when logged in and on home or dashboard section */}
        {isLoggedIn && (activeSection === 'home' || activeSection === 'dashboard') && (
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
        
        <SOSButton />
        <VoiceAssistant />

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
        onAuthChange={() => checkAuth(false)}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      <ReviewBar />
    </div>
  );
}

export default App;