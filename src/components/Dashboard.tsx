import React, { useState } from 'react';
import { TrendingUp, Users, Share2, MessageCircle, ThumbsUp, Trophy, Star, Menu, X } from 'lucide-react';

interface DashboardProps {
  user: any;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot: (bot: string) => void;
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setIsChatOpen, setSelectedChatbot, setActiveSection }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const topCourses = [
    {
      title: "Advanced Python Programming",
      titleBn: "উন্নত পাইথন প্রোগ্রামিং",
      instructor: "Dr. Ahmed Khan",
      students: 2345,
      rating: 4.8,
      image: "🐍",
      progress: 65,
      category: "Programming"
    },
    {
      title: "Digital Marketing Mastery",
      titleBn: "ডিজিটাল মার্কেটিং দক্ষতা",
      instructor: "Sarah Rahman",
      students: 1890,
      rating: 4.9,
      image: "📱",
      progress: 0,
      category: "Marketing"
    },
    {
      title: "Web Development Bootcamp",
      titleBn: "ওয়েব ডেভেলপমেন্ট বুটক্যাম্প",
      instructor: "Karim Hossain",
      students: 3120,
      rating: 4.7,
      image: "💻",
      progress: 30,
      category: "Development"
    }
  ];

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

  const recentActivities = [
    { action: "স্বাস্থ্য বট এর সাথে চ্যাট করেছেন", time: "২ ঘন্টা আগে", points: 5, icon: "💬" },
    { action: "প্রোগ্রামিং কোর্স সম্পন্ন করেছেন", time: "১ দিন আগে", points: 50, icon: "🎓" },
    { action: "কমিউনিটিতে প্রশ্ন করেছেন", time: "২ দিন আগে", points: 10, icon: "❓" },
    { action: "নিরাপত্তা রিপোর্ট জমা দিয়েছেন", time: "৩ দিন আগে", points: 25, icon: "🚨" },
    { action: "মেন্টরশিপ প্রোগ্রামে যোগ দিয়েছেন", time: "১ সপ্তাহ আগে", points: 30, icon: "🤝" }
  ];

  const achievements = [
    { icon: "💬", title: "প্রথম চ্যাট", desc: "প্রথমবার চ্যাট করেছেন" },
    { icon: "🤝", title: "সাহায্যকারী", desc: "১০টি প্রশ্নের উত্তর পেয়েছেন" },
    { icon: "📚", title: "শিক্ষার্থী", desc: "৫টি দক্ষতা কোর্স সম্পন্ন" },
    { icon: "👥", title: "কমিউনিটি সদস্য", desc: "কমিউনিটিতে যোগ দিয়েছেন" },
    { icon: "🎓", title: "মেন্টর", desc: "অন্যদের সাহায্য করেছেন" },
    { icon: "👑", title: "নেতা", desc: "লিডারবোর্ডে টপ ১০" }
  ];

  const monthlyProgress = [
    { month: "জানুয়ারি", points: 200 },
    { month: "ফেব্রুয়ারি", points: 350 },
    { month: "মার্চ", points: 480 },
    { month: "এপ্রিল", points: 620 },
    { month: "মে", points: 750 },
    { month: "জুন", points: 1250 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 lg:hidden"
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR - User Profile */}
          <div className={`lg:col-span-3 space-y-4 fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-auto bg-gray-100 lg:bg-transparent z-40 overflow-y-auto lg:overflow-visible transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h3 className="text-xl font-bold font-bangla">{user.name}</h3>
                <div className="flex items-center justify-center mt-2 space-x-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span className="font-bold">{user.contributionRating}/5</span>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-600 font-bangla mb-4">
                  সদস্য হয়েছেন: {user.joinedDate}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-indigo-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{user.level}</div>
                    <div className="text-xs text-gray-600 font-bangla">লেভেল</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{user.points}</div>
                    <div className="text-xs text-gray-600 font-bangla">পয়েন্ট</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-3 text-center mb-4">
                  <div className="text-2xl font-bold text-purple-600">{user.impactScore}%</div>
                  <div className="text-xs text-gray-600 font-bangla">প্রভাব স্কোর</div>
                </div>

                {/* Activity Stats */}
                <div className="border-t pt-4 space-y-2">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">কার্যকলাপের পরিসংখ্যান</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-bangla">মোট চ্যাট</span>
                    <span className="font-bold text-blue-600">47</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-bangla">সাহায্য নিয়েছেন</span>
                    <span className="font-bold text-green-600">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-bangla">রিপোর্ট করেছেন</span>
                    <span className="font-bold text-red-600">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-bangla">কোর্স সম্পন্ন</span>
                    <span className="font-bold text-purple-600">8</span>
                  </div>
                </div>

                {/* Monthly Progress Chart */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">মাসিক অগ্রগতি</h4>
                  <div className="space-y-2">
                    {monthlyProgress.map((month, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bangla">{month.month}</span>
                          <span className="font-bold">{month.points}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${(month.points / 1250) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">সাম্প্রতিক কার্যকলাপ</h4>
                  <div className="space-y-3">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-xs font-bangla text-gray-700">{activity.action}</p>
                          <p className="text-xs text-gray-500 font-bangla">{activity.time}</p>
                        </div>
                        <span className="text-xs font-bold text-green-600">+{activity.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">অর্জনসমূহ</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {achievements.map((ach, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-2 text-center group hover:scale-105 transition-transform cursor-pointer">
                        <div className="text-2xl mb-1">{ach.icon}</div>
                        <div className="text-xs font-bold text-gray-700 font-bangla">{ach.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Level Progress */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">পরবর্তী লেভেল</h4>
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-600 font-bangla">Level {user.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-center text-gray-600 font-bangla">
                    পরবর্তী লেভেলের জন্য আরো 250 পয়েন্ট প্রয়োজন
                  </p>
                  <p className="text-xs text-center text-gray-500 font-bangla">50 / 300 পয়েন্ট</p>
                </div>

                {/* Quick Actions */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-bold text-gray-800 font-bangla mb-3">দ্রুত কাজ</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveSection('profile')}
                      className="w-full bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bangla hover:bg-indigo-100 transition-colors"
                    >
                      প্রোফাইল আপডেট করুন
                    </button>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bangla hover:bg-green-100 transition-colors"
                    >
                      নতুন কোর্স শুরু করুন
                    </button>
                    <button className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-bangla hover:bg-purple-100 transition-colors">
                      কমিউনিটিতে যোগ দিন
                    </button>
                    <button className="w-full bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-sm font-bangla hover:bg-orange-100 transition-colors">
                      মেন্টর হয়ে যান
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN FEED - Center Content */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Welcome Banner with Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Ready to Make a Difference?</h2>
              <p className="text-indigo-100 mb-4 font-bangla">আজ কি করতে চান?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎓 Start Learning
                </button>
                <button 
                  onClick={() => setActiveSection('report')}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all transform hover:scale-105"
                >
                  📢 Create Campaign
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all transform hover:scale-105">
                  🔍 Verify News
                </button>
              </div>
            </div>

            {/* Top Trending Courses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
                  Top Trending Courses
                  <span className="ml-2 font-bangla text-lg text-gray-600">জনপ্রিয় কোর্স</span>
                </h3>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View All →</button>
              </div>
              
              <div className="space-y-4">
                {topCourses.map((course, idx) => (
                  <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        {course.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                            <p className="text-sm text-gray-600 font-bangla">{course.titleBn}</p>
                            <p className="text-xs text-gray-500 mt-1">by {course.instructor}</p>
                          </div>
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{course.category}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                        </div>

                        {course.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Your Progress</span>
                              <span className="font-bold text-indigo-600">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2 mt-3">
                          <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                            {course.progress > 0 ? 'Continue' : 'Enroll Now'}
                          </button>
                          <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
          <div className="lg:col-span-3 space-y-4">
            
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

            {/* Suggested Connections */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 font-bangla">সংযুক্ত হন</h4>
              <div className="space-y-3">
                {[
                  { name: "Dr. Nazrul Islam", role: "AI Mentor", mutual: 12 },
                  { name: "Sara Begum", role: "Community Leader", mutual: 8 },
                  { name: "Rahim Khan", role: "Web Developer", mutual: 15 }
                ].map((person, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.role}</p>
                      <p className="text-xs text-indigo-600">{person.mutual} mutual connections</p>
                    </div>
                    <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-indigo-200 transition-colors">
                      Connect
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
