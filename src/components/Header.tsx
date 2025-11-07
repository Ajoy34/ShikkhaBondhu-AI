import React, { useState } from 'react';
import { Shield, User, MessageCircle, Search, Code, Video, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { signOut } from '../lib/auth';
import AuthModal from './AuthModal';

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-inter">ShikkhaBondhu</h1>
              <p className="text-xs text-indigo-600 font-bangla -mt-0.5">শিক্ষা বন্ধু</p>
            </div>
          </button>

          {/* Center Navigation - Desktop Only */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center mx-8">
              {/* AI Chat */}
              <button
                onClick={() => {
                  if (setSelectedChatbot) setSelectedChatbot('general');
                  setTimeout(() => setIsChatOpen(true), 100);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">AI Chat & Learn</span>
              </button>

              {/* Report & SOS */}
              <button
                onClick={() => setActiveSection('report')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-red-700">Report & SOS</span>
              </button>

              {/* Fact Check */}
              <button
                onClick={() => setActiveSection('factcheck')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
              >
                <Search className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Fact Check</span>
              </button>

              {/* AI Lab */}
              <button
                disabled
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200 opacity-60 cursor-not-allowed"
              >
                <div className="absolute -top-2 -right-2 bg-orange-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  🚀
                </div>
                <Code className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700">AI Lab</span>
              </button>

              {/* Create & Earn */}
              <button
                onClick={() => setActiveSection('createandearn')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
              >
                <Video className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-semibold text-pink-700">Create & Earn</span>
              </button>

              {/* Library */}
              <button
                onClick={() => setActiveSection('library')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">Library</span>
              </button>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Mobile Menu Button - Show when logged in */}
            {isLoggedIn && (
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6 text-indigo-600" />
                ) : (
                  <Menu className="w-6 h-6 text-indigo-600" />
                )}
              </button>
            )}

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
                        {/* Debug indicator */}
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
                {/* Prominent Sign In Button with Animation */}
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

      {/* Mobile Navigation Menu - Full Screen Overlay */}
      {isLoggedIn && showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowMobileMenu(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-bangla">মেনু (Menu)</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* User Info in Mobile Menu */}
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm opacity-90">⭐ {user.contributionRating}/5 • {user.points} points</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-4 space-y-2">
              {/* AI Chat */}
              <button
                onClick={() => {
                  if (setSelectedChatbot) setSelectedChatbot('general');
                  setTimeout(() => setIsChatOpen(true), 100);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-blue-700">AI Chat & Learn</div>
                  <div className="text-xs text-blue-600 font-bangla">এআই চ্যাট ও শিখুন</div>
                </div>
              </button>

              {/* Report & SOS */}
              <button
                onClick={() => {
                  setActiveSection('report');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <Shield className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-red-700">Report & SOS</div>
                  <div className="text-xs text-red-600 font-bangla">রিপোর্ট ও জরুরি সাহায্য</div>
                </div>
              </button>

              {/* Fact Check */}
              <button
                onClick={() => {
                  setActiveSection('factcheck');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
              >
                <Search className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold text-green-700">Fact Check</div>
                  <div className="text-xs text-green-600 font-bangla">তথ্য যাচাই</div>
                </div>
              </button>

              {/* AI Lab - Coming Soon */}
              <button
                disabled
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 opacity-60 cursor-not-allowed relative"
              >
                <Code className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-semibold text-purple-700">AI Lab 🚀</div>
                  <div className="text-xs text-purple-600 font-bangla">শীঘ্রই আসছে (Coming Soon)</div>
                </div>
              </button>

              {/* Create & Earn */}
              <button
                onClick={() => {
                  setActiveSection('createandearn');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
              >
                <Video className="w-5 h-5 text-pink-600" />
                <div className="text-left">
                  <div className="font-semibold text-pink-700">Create & Earn</div>
                  <div className="text-xs text-pink-600 font-bangla">তৈরি করুন ও আয় করুন</div>
                </div>
              </button>

              {/* Library */}
              <button
                onClick={() => {
                  setActiveSection('library');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-amber-600" />
                <div className="text-left">
                  <div className="font-semibold text-amber-700">Library</div>
                  <div className="text-xs text-amber-600 font-bangla">লাইব্রেরি</div>
                </div>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Profile */}
              <button
                onClick={() => {
                  setActiveSection('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-700">Profile</div>
                  <div className="text-xs text-gray-600 font-bangla">প্রোফাইল</div>
                </div>
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="font-semibold text-red-700">Logout</div>
                  <div className="text-xs text-red-600 font-bangla">লগ আউট</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

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