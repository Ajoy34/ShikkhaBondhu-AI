import React from 'react';
import { Shield, MessageCircle, User, AlertCircle } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setIsChatOpen: (open: boolean) => void;
  user: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  setIsChatOpen, 
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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {/* Chat Button */}
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">Chat</span>
                </button>

                {/* Report Button */}
                <button
                  onClick={() => setActiveSection('report')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg ${
                    activeSection === 'report'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium font-bangla">রিপোর্ট</span>
                </button>

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