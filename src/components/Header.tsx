import React from 'react';
import { Shield, MessageCircle, BookOpen, Users, Heart, Mic, User, TreePine, Trophy } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setIsChatOpen: (open: boolean) => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, setIsChatOpen, user }) => {
  const navItems = [
    { id: 'home', label: 'Home', bangla: 'হোম', icon: Shield },
    { id: 'guide', label: 'User Guide', bangla: 'গাইড', icon: BookOpen },
    { id: 'gamification', label: 'Gamification', bangla: 'গেমিফিকেশন', icon: Trophy },
    { id: 'accessibility', label: 'AI Lab', bangla: 'এআই ল্যাব', icon: Heart },
    { id: 'volunteer', label: 'Volunteer', bangla: 'স্বেচ্ছাসেবক', icon: Users },
    { id: 'impact', label: 'Social Impact', bangla: 'সামাজিক প্রভাব', icon: TreePine },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-indigo-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-inter">ShikkhaBondhu</h1>
              <p className="text-xs text-indigo-600 font-bangla">শিক্ষা বন্ধু</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                  <span className="text-xs font-bangla text-gray-500">({item.bangla})</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* User Profile Button */}
            <button
              onClick={() => setActiveSection('profile')}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              <User className="w-4 h-4" />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-medium">{user.name}</div>
                <div className="text-xs opacity-80">Level {user.level}</div>
              </div>
            </button>
            
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:block text-sm font-medium">Chat</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md">
              <Mic className="w-4 h-4" />
              <span className="hidden sm:block text-sm font-medium">Voice</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-xs font-bangla">{item.bangla}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;