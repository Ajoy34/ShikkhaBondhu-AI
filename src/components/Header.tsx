import React from 'react';
import { Shield, User, MessageCircle, Search, Code, Video, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot?: (bot: string) => void;
  user: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  setIsChatOpen,
  setSelectedChatbot, 
  user, 
  isLoggedIn, 
  setIsLoggedIn 
}) => {
  return (
    <header className="bg-white/98 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-inter">ShikkhaBondhu</h1>
              <p className="text-xs text-indigo-600 font-bangla -mt-0.5">শিক্ষা বন্ধু</p>
            </div>
          </button>

          {/* Center Navigation - Feature Items */}
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
                onClick={() => setActiveSection('home')}
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
                onClick={() => setActiveSection('home')}
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
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Profile Button */}
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                    activeSection === 'profile'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-medium leading-tight">{user.name}</div>
                    <div className="text-xs opacity-90">⭐ {user.contributionRating}/5</div>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* Sign In / Sign Up Buttons */}
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-5 py-2.5 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-xl transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;