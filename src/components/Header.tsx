import React, { useState } from 'react';
import { Shield, User, MessageCircle, Search, Code, Video, BookOpen, LogOut, Brain } from 'lucide-react';
import { signOut } from '../lib/auth';
import AuthModal from './AuthModal';
import MindMapGenerator from './MindMapGenerator';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot?: (bot: string) => void;
  user: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  onAuthChange?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  setIsChatOpen,
  setSelectedChatbot, 
  user, 
  isLoggedIn, 
  setIsLoggedIn,
  onAuthChange
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMindMapGenerator, setShowMindMapGenerator] = useState(false);

  // Debug: Log user name changes
  React.useEffect(() => {
    console.log('📋 Header received user name:', user.name, 'isLoggedIn:', isLoggedIn);
  }, [user.name, isLoggedIn]);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setActiveSection('home');
      if (onAuthChange) onAuthChange();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (onAuthChange) onAuthChange();
  };

  const handleLoginSuccess = () => {
    console.log('Header: Login success - going to dashboard');
    setShowAuthModal(false);
    setIsLoggedIn(true);
    setActiveSection('dashboard');
    // Trigger auth state refresh to load user name
    // Use longer delay to ensure Supabase session is fully persisted
    if (onAuthChange) {
      console.log('🔄 Scheduling auth state refresh after login');
      setTimeout(() => {
        console.log('🔄 Now triggering auth state refresh');
        onAuthChange();
      }, 1000); // 1 second delay to ensure session is fully set
    }
  };

  return (
    <header className="bg-white/98 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-2">
          {/* Logo */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 sm:p-2.5 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-inter">ShikkhaBondhu</h1>
              <p className="text-xs text-indigo-600 font-bangla -mt-0.5">শিক্ষা বন্ধু</p>
            </div>
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {isLoggedIn ? (
              <>
                {/* Profile Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                      activeSection === 'profile'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-medium leading-tight">
                        {user.name}
                        {user.name === 'Guest User' && (
                          <span className="ml-1 text-red-500" title="Not logged in or profile not loaded">⚠️</span>
                        )}
                      </div>
                      <div className="text-xs opacity-90">⭐ {user.contributionRating}/5</div>
                    </div>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          setActiveSection('profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        <span className="font-bangla">প্রোফাইল (Profile)</span>
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-bangla">লগ আউট (Logout)</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Prominent Sign In Button */}
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl animate-pulse"
                  title="Click here to login and see your profile"
                >
                  <span className="hidden sm:inline">🔐 Sign In / লগইন করুন</span>
                  <span className="sm:hidden">🔐 লগইন</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar - Horizontal Scroll on Mobile */}
      {isLoggedIn && (
        <div className="border-t border-gray-200 bg-white/95">
          <div className="container mx-auto">
            {/* Scrollable container for mobile */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 px-2 sm:px-4 lg:px-8 py-2 min-w-max lg:justify-center">
                {/* AI Chat */}
                <button
                  onClick={() => {
                    if (setSelectedChatbot) setSelectedChatbot('general');
                    setTimeout(() => setIsChatOpen(true), 100);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">AI Chat</span>
                </button>

                {/* Fact Check */}
                <button
                  onClick={() => setActiveSection('factcheck')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <Search className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Fact Check</span>
                </button>

                {/* Mind Map Generator */}
                <button
                  onClick={() => setShowMindMapGenerator(true)}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    NEW
                  </div>
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">Mind Map</span>
                </button>

                {/* AI Lab */}
                <button
                  disabled
                  className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200 opacity-60 cursor-not-allowed whitespace-nowrap flex-shrink-0"
                >
                  <div className="absolute -top-1 -right-1 bg-orange-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    🚀
                  </div>
                  <Code className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">AI Lab</span>
                </button>

                {/* Create & Earn */}
                <button
                  onClick={() => setActiveSection('createandearn')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <Video className="w-4 h-4 text-pink-600" />
                  <span className="text-xs font-semibold text-pink-700">Create</span>
                </button>

                {/* Library */}
                <button
                  onClick={() => setActiveSection('library')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700">Library</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mind Map Generator */}
      <MindMapGenerator
        isOpen={showMindMapGenerator}
        onClose={() => setShowMindMapGenerator(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Header;