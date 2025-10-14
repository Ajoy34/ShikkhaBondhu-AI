import React, { useState } from 'react';
import { 
  Trophy, Star, Target, TrendingUp, Award, 
  Zap, Crown, Gift, TreePine, Users, Heart
} from 'lucide-react';

interface GamificationSystemProps {
  user: any;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const badges = [
    { id: 1, name: 'সহায়ক', icon: '🤝', color: 'bg-blue-500', earned: true, description: 'প্রথম সাহায্য নিয়েছেন' },
    { id: 2, name: 'শিক্ষার্থী', icon: '📚', color: 'bg-green-500', earned: true, description: '৫টি কোর্স সম্পন্ন' },
    { id: 3, name: 'কমিউনিটি সদস্য', icon: '👥', color: 'bg-purple-500', earned: true, description: 'কমিউনিটিতে সক্রিয়' },
    { id: 4, name: 'মেন্টর', icon: '🎓', color: 'bg-yellow-500', earned: false, description: 'অন্যদের সাহায্য করুন' },
    { id: 5, name: 'নেতা', icon: '👑', color: 'bg-red-500', earned: false, description: 'লিডারবোর্ডে টপ ১০' },
    { id: 6, name: 'চ্যাম্পিয়ন', icon: '🏆', color: 'bg-indigo-500', earned: false, description: 'সর্বোচ্চ পয়েন্ট অর্জন' },
  ];

  const impactTree = {
    level: 5,
    branches: [
      { name: 'শিক্ষা শাখা', progress: 80, color: 'text-green-600', icon: '🌿' },
      { name: 'স্বাস্থ্য শাখা', progress: 65, color: 'text-blue-600', icon: '🌱' },
      { name: 'নিরাপত্তা শাখা', progress: 45, color: 'text-red-600', icon: '🍃' },
      { name: 'কমিউনিটি শাখা', progress: 90, color: 'text-purple-600', icon: '🌳' },
    ]
  };

  const leaderboard = [
    { rank: 1, name: 'সারা খান', points: 2450, avatar: '👩', badge: '🏆' },
    { rank: 2, name: 'রাহুল আহমেদ', points: 1250, avatar: '👨', badge: '🥈', isCurrentUser: true },
    { rank: 3, name: 'ফাতিমা বেগম', points: 1180, avatar: '👩', badge: '🥉' },
    { rank: 4, name: 'করিম উদ্দিন', points: 980, avatar: '👨', badge: '⭐' },
    { rank: 5, name: 'নাদিয়া রহমান', points: 875, avatar: '👩', badge: '⭐' },
  ];

  const challenges = [
    {
      id: 1,
      title: 'সাপ্তাহিক চ্যালেঞ্জ',
      description: 'এই সপ্তাহে ৫টি নতুন দক্ষতা শিখুন',
      progress: 60,
      reward: '100 পয়েন্ট + বিশেষ ব্যাজ',
      timeLeft: '৩ দিন বাকি',
      difficulty: 'মধ্যম'
    },
    {
      id: 2,
      title: 'কমিউনিটি হিরো',
      description: '১০ জন নতুন সদস্যকে সাহায্য করুন',
      progress: 30,
      reward: '200 পয়েন্ট + মেন্টর ব্যাজ',
      timeLeft: '১০ দিন বাকি',
      difficulty: 'কঠিন'
    },
    {
      id: 3,
      title: 'স্বাস্থ্য সচেতনতা',
      description: 'স্বাস্থ্য বিষয়ক ৩টি কোর্স সম্পন্ন করুন',
      progress: 100,
      reward: '৫০ পয়েন্ট',
      timeLeft: 'সম্পন্ন!',
      difficulty: 'সহজ',
      completed: true
    }
  ];

  const certificates = [
    { name: 'ডিজিটাল নিরাপত্তা বিশেষজ্ঞ', date: '২০২৪-০৫-১৫', issuer: 'ShikkhaBondhu' },
    { name: 'মানসিক স্বাস্থ্য সহায়ক', date: '২০২৪-০৪-২২', issuer: 'ShikkhaBondhu' },
    { name: 'কমিউনিটি লিডার', date: '২০২৪-০৩-১০', issuer: 'ShikkhaBondhu' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-500 mr-3" />
            গেমিফিকেশন সিস্টেম
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আপনার অগ্রগতি ট্র্যাক করুন, ব্যাজ অর্জন করুন এবং কমিউনিটিতে আপনার প্রভাব দেখুন
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'ওভারভিউ', icon: Star },
            { id: 'badges', label: 'ব্যাজ', icon: Award },
            { id: 'impact', label: 'প্রভাব ট্রি', icon: TreePine },
            { id: 'leaderboard', label: 'লিডারবোর্ড', icon: Crown },
            { id: 'challenges', label: 'চ্যালেঞ্জ', icon: Target },
            { id: 'certificates', label: 'সার্টিফিকেট', icon: Gift }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-bangla">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {selectedTab === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Current Level */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Level {user.level}</h3>
                <p className="text-gray-600 font-bangla mb-4">বর্তমান লেভেল</p>
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${(user.points % 300) / 300 * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 font-bangla">
                  পরবর্তী লেভেলের জন্য {300 - (user.points % 300)} পয়েন্ট বাকি
                </p>
              </div>

              {/* Total Points */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.points}</h3>
                <p className="text-gray-600 font-bangla mb-4">মোট পয়েন্ট</p>
                <p className="text-sm text-green-600 font-bangla">
                  +25 পয়েন্ট আজ অর্জিত
                </p>
              </div>

              {/* Impact Score */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.impactScore}%</h3>
                <p className="text-gray-600 font-bangla mb-4">প্রভাব স্কোর</p>
                <p className="text-sm text-blue-600 font-bangla">
                  গত সপ্তাহের চেয়ে +5% বেশি
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'badges' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 text-center transition-all ${
                    badge.earned ? 'ring-2 ring-green-200' : 'opacity-60'
                  }`}
                >
                  <div className={`w-20 h-20 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}>
                    {badge.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">{badge.name}</h3>
                  <p className="text-gray-600 text-sm font-bangla mb-4">{badge.description}</p>
                  {badge.earned ? (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bangla">
                      অর্জিত ✓
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bangla">
                      অর্জন করুন
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'impact' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-bangla">আপনার প্রভাব ট্রি</h3>
                <p className="text-gray-600 font-bangla">
                  আপনার অবদান কমিউনিটিতে একটি গাছের মতো বেড়ে উঠছে
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Tree Trunk */}
                  <div className="w-16 h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg mx-auto"></div>
                  
                  {/* Tree Crown */}
                  <div className="relative -mt-16">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center">
                      <TreePine className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Level indicator */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      <span className="font-bold text-green-600">{impactTree.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {impactTree.branches.map((branch, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{branch.icon}</span>
                      <h4 className="font-bold text-gray-900 font-bangla">{branch.name}</h4>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600`}
                        style={{ width: `${branch.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 font-bangla">{branch.progress}% সম্পন্ন</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'leaderboard' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-bangla">
                সাপ্তাহিক লিডারবোর্ড
              </h3>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                      user.isCurrentUser 
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 ring-2 ring-indigo-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-600 w-8">#{user.rank}</div>
                    <div className="text-3xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className={`font-bold font-bangla ${user.isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                        {user.name} {user.isCurrentUser && '(আপনি)'}
                      </div>
                      <div className="text-sm text-gray-600">{user.points} পয়েন্ট</div>
                    </div>
                    <div className="text-2xl">{user.badge}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-bangla">{challenge.title}</h3>
                      <p className="text-gray-600 font-bangla">{challenge.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bangla ${
                      challenge.difficulty === 'সহজ' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'মধ্যম' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bangla">অগ্রগতি</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          challenge.completed 
                            ? 'bg-gradient-to-r from-green-400 to-green-600' 
                            : 'bg-gradient-to-r from-indigo-400 to-purple-600'
                        }`}
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600 font-bangla">পুরস্কার: {challenge.reward}</div>
                      <div className="text-sm text-gray-500 font-bangla">{challenge.timeLeft}</div>
                    </div>
                    {challenge.completed ? (
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bangla">
                        সম্পন্ন ✓
                      </div>
                    ) : (
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-bangla">
                        চালিয়ে যান
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'certificates' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <Gift className="w-8 h-8 text-indigo-600" />
                    <div>
                      <h3 className="font-bold text-gray-900 font-bangla">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-bangla mb-4">
                    অর্জনের তারিখ: {new Date(cert.date).toLocaleDateString('bn-BD')}
                  </p>
                  <button className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors font-bangla">
                    সার্টিফিকেট ডাউনলোড
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GamificationSystem;