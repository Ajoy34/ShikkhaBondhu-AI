import React from 'react';
import { TrendingUp, AlertTriangle, Target, BookOpen, Award, Star, Clock, Heart, Share2, Users } from 'lucide-react';

interface FeaturesProps {
  setSelectedChatbot: (bot: string) => void;
  setIsChatOpen: (open: boolean) => void;
  user: any;
}

const Features: React.FC<FeaturesProps> = ({ setSelectedChatbot, setIsChatOpen, user }) => {
  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Welcome Back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user.name}</span>!
          </h1>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-indigo-200">
              <span className="text-sm text-gray-600">Contribution Rating:</span>
              <span className="ml-2 text-xl font-bold text-indigo-600">{user.contributionRating}/5</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-green-200">
              <span className="text-sm text-gray-600">Impact Score:</span>
              <span className="ml-2 text-xl font-bold text-green-600">{user.impactScore}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-3">Ready to Make a Difference?</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Start Learning
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors transform hover:scale-105">
              Create Campaign
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors transform hover:scale-105">
              Verify News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
