import React from 'react';
import { Users, Share2, MessageCircle, ThumbsUp, Trophy } from 'lucide-react';

interface DashboardProps {
  user: any;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot: (bot: string) => void;
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setIsChatOpen, setSelectedChatbot, setActiveSection }) => {
  const communityPrograms = [
    {
      title: "Clean Water Initiative - Dhaka",
      titleBn: "বিশুদ্ধ পানি উদ্যোগ - ঢাকা",
      organizer: "Community Welfare",
      participants: 345,
      raised: 85000,
      goal: 100000,
      daysLeft: 12,
      image: "💧",
      type: "Environment"
    },
    {
      title: "Free Education for Street Children",
      titleBn: "পথশিশুদের জন্য বিনামূল্যে শিক্ষা",
      organizer: "Shikkha Foundation",
      participants: 567,
      raised: 150000,
      goal: 200000,
      daysLeft: 8,
      image: "📚",
      type: "Education"
    },
    {
      title: "Elderly Care Support Program",
      titleBn: "বয়স্ক সেবা সহায়তা কর্মসূচি",
      organizer: "Care Bangladesh",
      participants: 234,
      raised: 45000,
      goal: 75000,
      daysLeft: 15,
      image: "❤️",
      type: "Healthcare"
    }
  ];

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
                <button className="text-green-600 hover:text-green-700 text-sm font-semibold">See More →</button>
              </div>

              <div className="space-y-4">
                {communityPrograms.map((program, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-3xl">
                        {program.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">{program.title}</h4>
                            <p className="text-sm text-gray-600 font-bangla">{program.titleBn}</p>
                            <p className="text-xs text-gray-500 mt-1">by {program.organizer}</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{program.type}</span>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Raised: ৳{program.raised.toLocaleString()}</span>
                            <span className="font-bold text-green-600">{Math.round((program.raised / program.goal) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{ width: `${(program.raised / program.goal) * 100}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-gray-500">Goal: ৳{program.goal.toLocaleString()}</span>
                            <span className="text-orange-600 font-semibold">{program.daysLeft} days left</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{program.participants} participants</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                              Contribute
                            </button>
                            <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                              <Share2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
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
    </div>
  );
};

export default Dashboard;
