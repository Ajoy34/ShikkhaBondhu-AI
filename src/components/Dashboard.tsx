import React, { useState } from 'react';
import { Users, Share2, MessageCircle, ThumbsUp, Trophy, Plus, MapPin, Globe, DollarSign, Clock, User } from 'lucide-react';

interface DashboardProps {
  user: any;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot: (bot: string) => void;
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setIsChatOpen, setSelectedChatbot, setActiveSection }) => {
  const [filterType, setFilterType] = useState<'all' | 'local' | 'global'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const communityPrograms = [
    {
      title: "Clean Water Initiative - Dhaka",
      titleBn: "বিশুদ্ধ পানি উদ্যোগ - ঢাকা",
      organizer: "Community Welfare Bangladesh",
      organizerImage: "👤",
      participants: 345,
      raised: 85000,
      goal: 100000,
      daysLeft: 12,
      duration: "30 days campaign",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
      type: "Environment",
      scope: "local" as const,
      location: "Dhaka, Bangladesh",
      isCrowdfunding: true,
      likes: 1234,
      comments: 89,
      shares: 156,
      postedTime: "3 hours ago"
    },
    {
      title: "Free Education for Street Children",
      titleBn: "পথশিশুদের জন্য বিনামূল্যে শিক্ষা",
      organizer: "Shikkha Foundation International",
      organizerImage: "👤",
      participants: 567,
      raised: 150000,
      goal: 200000,
      daysLeft: 8,
      duration: "45 days campaign",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      type: "Education",
      scope: "global" as const,
      location: "Bangladesh & India",
      isCrowdfunding: true,
      likes: 2456,
      comments: 234,
      shares: 567,
      postedTime: "5 hours ago"
    },
    {
      title: "Elderly Care Support Program",
      titleBn: "বয়স্ক সেবা সহায়তা কর্মসূচি",
      organizer: "Care Bangladesh",
      organizerImage: "👤",
      participants: 234,
      raised: 45000,
      goal: 75000,
      daysLeft: 15,
      duration: "60 days campaign",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      type: "Healthcare",
      scope: "local" as const,
      location: "Chittagong, Bangladesh",
      isCrowdfunding: true,
      likes: 892,
      comments: 67,
      shares: 124,
      postedTime: "1 day ago"
    },
    {
      title: "Digital Skills Training for Youth",
      titleBn: "যুবকদের জন্য ডিজিটাল দক্ষতা প্রশিক্ষণ",
      organizer: "Tech4All Global",
      organizerImage: "👤",
      participants: 890,
      raised: 0,
      goal: 0,
      daysLeft: 20,
      duration: "90 days campaign",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      type: "Education",
      scope: "global" as const,
      location: "Online - Worldwide",
      isCrowdfunding: false,
      likes: 3421,
      comments: 456,
      shares: 892,
      postedTime: "2 days ago"
    }
  ];

  const filteredPrograms = communityPrograms.filter(program => {
    if (filterType === 'all') return true;
    return program.scope === filterType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* MAIN FEED - Center Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* Running Community Programs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Active Community Programs
                  <span className="ml-2 font-bangla text-lg text-gray-600">কমিউনিটি প্রোগ্রাম</span>
                </h3>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Campaign</span>
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>All Campaigns</span>
                </button>
                <button
                  onClick={() => setFilterType('local')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'local' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Local</span>
                </button>
                <button
                  onClick={() => setFilterType('global')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'global' 
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Global</span>
                </button>
              </div>

              <div className="space-y-6">
                {filteredPrograms.map((program, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    {/* Post Header - Like Facebook */}
                    <div className="p-4 bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-md">
                            {program.organizerImage}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                              <span>{program.organizer}</span>
                              {program.scope === 'global' ? (
                                <Globe className="w-4 h-4 text-green-600" />
                              ) : (
                                <MapPin className="w-4 h-4 text-blue-600" />
                              )}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{program.postedTime}</span>
                              <span>•</span>
                              <MapPin className="w-3 h-3" />
                              <span>{program.location}</span>
                              <span>•</span>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{program.type}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          program.isCrowdfunding 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {program.isCrowdfunding ? '💰 Crowdfunding' : '🤝 Volunteer'}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-3">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{program.title}</h4>
                      <p className="text-sm text-gray-600 font-bangla mb-2">{program.titleBn}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{program.participants} participants</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="w-full bg-gray-100">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f3f4f6" width="800" height="400"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECampaign Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    {/* Crowdfunding Progress (if applicable) */}
                    {program.isCrowdfunding && (
                      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-bold text-gray-900">৳{program.raised.toLocaleString()}</span>
                            <span className="text-gray-600">raised of ৳{program.goal.toLocaleString()}</span>
                          </div>
                          <span className="font-bold text-green-600">{Math.round((program.raised / program.goal) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((program.raised / program.goal) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{program.daysLeft} days left</span>
                          </span>
                          <span className="text-gray-600">{program.participants} backers</span>
                        </div>
                      </div>
                    )}

                    {/* Post Stats - Like Facebook */}
                    <div className="px-4 py-2 border-t border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <ThumbsUp className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                              ❤️
                            </div>
                          </div>
                          <span className="ml-1">{program.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span>{program.comments} comments</span>
                          <span>{program.shares} shares</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Like Facebook */}
                    <div className="px-4 py-2 bg-white flex items-center justify-around">
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
                        <ThumbsUp className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
                        <Share2 className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Share</span>
                      </button>
                      {program.isCrowdfunding && (
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg ml-2">
                          <DollarSign className="w-5 h-5" />
                          <span>Donate</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Post Example */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Shikkha Bondhu Official</h4>
                  <p className="text-xs text-gray-500">2 hours ago • Public</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                🎉 Great news! We've just launched 50+ new courses in AI, Machine Learning, and Data Science. 
                <span className="font-bangla block mt-2">আমরা নতুন ৫০+ কোর্স চালু করেছি AI, মেশিন লার্নিং এবং ডেটা সায়েন্সে!</span>
              </p>

              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 mb-4">
                <h5 className="text-xl font-bold text-indigo-900 mb-2">🚀 Limited Time Offer!</h5>
                <p className="text-indigo-700">Get 30% off on all premium courses. Use code: <span className="font-mono bg-white px-2 py-1 rounded">LEARN30</span></p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-6 text-gray-600">
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-semibold">234</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">45</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Share</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR - Suggestions & Trending */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="font-bangla">লিডারবোর্ড</span>
                </h4>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Arif Rahman", points: 2850, rank: 1 },
                  { name: user.name, points: user.points, rank: 8, isYou: true },
                  { name: "Fatima Noor", points: 1180, rank: 9 },
                  { name: "Karim Ahmed", points: 980, rank: 10 }
                ].map((leader, idx) => (
                  <div key={idx} className={`flex items-center space-x-3 p-2 rounded-lg ${leader.isYou ? 'bg-indigo-50 border-2 border-indigo-300' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      leader.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      leader.rank <= 3 ? 'bg-gray-300 text-gray-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      #{leader.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 font-bangla">
                        {leader.name} {leader.isYou && '(You)'}
                      </p>
                      <p className="text-xs text-gray-600">{leader.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Forums */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 font-bangla">কমিউনিটি ফোরাম</h4>
              <div className="space-y-3">
                {[
                  { 
                    name: "Bangladesh Police Forum", 
                    nameBn: "বাংলাদেশ পুলিশ ফোরাম",
                    members: "12.5K members",
                    posts: "245 posts today",
                    icon: "🚓",
                    color: "from-red-400 to-red-600"
                  },
                  { 
                    name: "UNDP Student Forum", 
                    nameBn: "ইউএনডিপি শিক্ষার্থী ফোরাম",
                    members: "8.3K members",
                    posts: "189 posts today",
                    icon: "🎓",
                    color: "from-blue-400 to-blue-600"
                  },
                  { 
                    name: "UNESCO Community Forum", 
                    nameBn: "ইউনেস্কো কমিউনিটি ফোরাম",
                    members: "15.7K members",
                    posts: "312 posts today",
                    icon: "🌍",
                    color: "from-green-400 to-green-600"
                  }
                ].map((forum, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 bg-gradient-to-br ${forum.color} rounded-full flex items-center justify-center text-2xl shadow-md`}>
                      {forum.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{forum.name}</p>
                      <p className="text-xs font-bangla text-gray-600">{forum.nameBn}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">👥 {forum.members}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-xs text-green-600">� {forum.posts}</p>
                      </div>
                    </div>
                    <button className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 font-bangla">আসন্ন ইভেন্ট</h4>
              <div className="space-y-3">
                {[
                  { title: "AI Workshop", date: "Nov 5", time: "10:00 AM" },
                  { title: "Community Meetup", date: "Nov 8", time: "2:00 PM" },
                  { title: "Coding Contest", date: "Nov 12", time: "9:00 AM" }
                ].map((event, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-500 pl-3 py-2 bg-indigo-50 rounded-r-lg">
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.date} • {event.time}</p>
                    <button className="text-xs text-indigo-600 font-semibold mt-1">Interested →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Your Experience */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-4 border-2 border-pink-200">
              <h4 className="font-bold text-gray-900 mb-2 font-bangla">আপনার অভিজ্ঞতা শেয়ার করুন</h4>
              <p className="text-xs text-gray-600 mb-3 font-bangla">সোশ্যাল মিডিয়ায় শেয়ার করুন এবং পয়েন্ট অর্জন করুন</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700">
                  📘 Facebook
                </button>
                <button className="flex-1 bg-sky-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-sky-600">
                  🐦 Twitter
                </button>
              </div>
              <button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-pink-600 hover:to-purple-600">
                📷 Instagram
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Create New Campaign</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-green-100 mt-2 font-bangla">নতুন ক্যাম্পেইন তৈরি করুন</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Campaign Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Campaign Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 border-2 border-yellow-300 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-all">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Crowdfunding</div>
                      <div className="text-xs text-gray-600">Raise money</div>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 border-2 border-blue-300 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Volunteer</div>
                      <div className="text-xs text-gray-600">Get helpers</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campaign Scope */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Campaign Scope *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 border-2 border-blue-300 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Local</div>
                      <div className="text-xs text-gray-600">Your area only</div>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 border-2 border-green-300 bg-green-50 rounded-xl hover:bg-green-100 transition-all">
                    <Globe className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Global</div>
                      <div className="text-xs text-gray-600">Worldwide reach</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campaign Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Clean Water Initiative"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                />
              </div>

              {/* Bengali Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bengali Title (বাংলা শিরোনাম) *</label>
                <input
                  type="text"
                  placeholder="বাংলায় শিরোনাম"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all font-bangla"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all">
                  <option value="">Select category</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="environment">Environment</option>
                  <option value="technology">Technology</option>
                  <option value="community">Community Development</option>
                  <option value="disaster">Disaster Relief</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Duration *</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Number of days"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  />
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all">
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </select>
                </div>
              </div>

              {/* Funding Goal */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Funding Goal (৳) *</label>
                <input
                  type="number"
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                />
              </div>

              {/* Campaign Image */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer bg-gray-50">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600 font-semibold">Click to upload image</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={6}
                  placeholder="Describe your campaign in detail..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
