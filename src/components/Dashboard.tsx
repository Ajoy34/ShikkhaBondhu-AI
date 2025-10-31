import React, { useState } from 'react';
import { TrendingUp, Users, Share2, MessageCircle, ThumbsUp, Trophy, Star, Shield, Search, Code, Video, Sparkles, Menu, X, Award, Calendar, BookOpen, Heart, Target } from 'lucide-react';

interface DashboardProps {
  user: any;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot: (bot: string) => void;
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setIsChatOpen, setSelectedChatbot, setActiveSection }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const topCourses = [
    {
      title: "Advanced Python Programming",
      titleBn: "উন্নত পাইথন প্রোগ্রামিং",
      instructor: "Dr. Ahmed Khan",
      students: "1,234 students",
      rating: 4.8,
      progress: 65
    },
    {
      title: "Digital Marketing Mastery",
      titleBn: "ডিজিটাল মার্কেটিং মাস্টারি",
      instructor: "Sarah Rahman",
      students: "2,345 students",
      rating: 4.9,
      progress: 40
    },
    {
      title: "Web Development Bootcamp",
      titleBn: "ওয়েব ডেভেলপমেন্ট বুটক্যাম্প",
      instructor: "John Doe",
      students: "3,456 students",
      rating: 4.7,
      progress: 25
    }
  ];

  const communityPrograms = [
    {
      icon: "💧",
      title: "Clean Water Initiative",
      titleBn: "বিশুদ্ধ পানি উদ্যোগ",
      description: "Providing clean water to rural communities",
      goal: "50,000",
      raised: "35,000",
      percentage: 70,
      supporters: 234
    },
    {
      icon: "📚",
      title: "Education for All",
      titleBn: "সকলের জন্য শিক্ষা",
      description: "Books and supplies for underprivileged students",
      goal: "30,000",
      raised: "24,000",
      percentage: 80,
      supporters: 189
    },
    {
      icon: "👵",
      title: "Elder Care Support",
      titleBn: "বয়স্ক সেবা সহায়তা",
      description: "Medical care for senior citizens",
      goal: "40,000",
      raised: "18,000",
      percentage: 45,
      supporters: 156
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hamburger Menu Button - Fixed Top Left */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Slide from Left */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg">
              👤
            </div>
            <h3 className="text-lg font-bold font-bangla mb-1">{user.name}</h3>
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-semibold">{user.contributionRating}/5</span>
            </div>
            <p className="text-xs text-white/80 font-bangla">
              সদস্য হয়েছেন: {user.joinedDate}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-indigo-600">{user.level}</div>
              <div className="text-xs text-gray-600 font-bangla mt-1">লেভেল</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{user.points}</div>
              <div className="text-xs text-gray-600 font-bangla mt-1">পয়েন্ট</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{user.impactScore}%</div>
              <div className="text-xs text-gray-600 font-bangla mt-1">প্রভাব স্কোর</div>
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3 font-bangla flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              কার্যকলাপের পরিসংখ্যান
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-bangla">মোট চ্যাট</span>
                <span className="font-bold text-blue-600">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-bangla">সাহায্য নিয়েছেন</span>
                <span className="font-bold text-green-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-bangla">রিপোর্ট করেছেন</span>
                <span className="font-bold text-red-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-bangla">কোর্স সম্পন্ন</span>
                <span className="font-bold text-purple-600">8</span>
              </div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3 font-bangla flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              মাসিক অগ্রগতি
            </h4>
            <div className="space-y-2">
              {monthlyProgress.map((month, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bangla text-gray-600">{month.month}</span>
                    <span className="font-semibold text-gray-700">{month.points}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(month.points / 1250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3 font-bangla flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              সাম্প্রতিক কার্যকলাপ
            </h4>
            <div className="space-y-3">
              {[
                { icon: '💬', text: 'স্বাস্থ্য বট এর সাথে চ্যাট করেছেন', time: '২ ঘন্টা আগে', points: '+5', color: 'blue' },
                { icon: '🎓', text: 'প্রোগ্রামিং কোর্স সম্পন্ন করেছেন', time: '১ দিন আগে', points: '+50', color: 'green' },
                { icon: '❓', text: 'কমিউনিটিতে প্রশ্ন করেছেন', time: '২ দিন আগে', points: '+10', color: 'purple' },
                { icon: '🚨', text: 'নিরাপত্তা রিপোর্ট জমা দিয়েছেন', time: '৩ দিন আগে', points: '+25', color: 'red' },
                { icon: '🤝', text: 'মেন্টরশিপ প্রোগ্রামে যোগ দিয়েছেন', time: '১ সপ্তাহ আগে', points: '+30', color: 'orange' }
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bangla text-gray-700 leading-tight">{activity.text}</p>
                    <p className="text-xs text-gray-500 font-bangla mt-0.5">{activity.time}</p>
                  </div>
                  <span className={`text-xs font-bold text-${activity.color}-600 bg-${activity.color}-50 px-2 py-1 rounded-full`}>
                    {activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3 font-bangla flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              অর্জনসমূহ
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '💬', label: 'প্রথম চ্যাট', color: 'from-blue-400 to-blue-600' },
                { icon: '🤝', label: 'সাহায্যকারী', color: 'from-green-400 to-green-600' },
                { icon: '📚', label: 'শিক্ষার্থী', color: 'from-purple-400 to-purple-600' },
                { icon: '👥', label: 'কমিউনিটি সদস্য', color: 'from-pink-400 to-pink-600' },
                { icon: '🎓', label: 'মেন্টর', color: 'from-orange-400 to-orange-600' },
                { icon: '👑', label: 'নেতা', color: 'from-yellow-400 to-yellow-600' }
              ].map((achievement, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${achievement.color} rounded-xl p-3 text-center text-white shadow-md`}>
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-bangla leading-tight">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Level Progress */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-2 font-bangla">পরবর্তী লেভেল</h4>
            <p className="text-xs text-gray-600 font-bangla mb-3">
              Level {user.level}
            </p>
            <p className="text-xs text-gray-600 font-bangla mb-2">
              পরবর্তী লেভেলের জন্য আরো 250 পয়েন্ট প্রয়োজন
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" style={{ width: '16.67%' }} />
            </div>
            <p className="text-xs text-gray-600 font-bangla text-center">50 / 300 পয়েন্ট</p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 mb-3 font-bangla">দ্রুত কাজ</h4>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl text-sm font-bangla hover:shadow-lg transition-all duration-300 hover:scale-105">
              প্রোফাইল আপডেট করুন
            </button>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl text-sm font-bangla hover:shadow-lg transition-all duration-300 hover:scale-105">
              নতুন কোর্স শুরু করুন
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-bangla hover:shadow-lg transition-all duration-300 hover:scale-105">
              কমিউনিটিতে যোগ দিন
            </button>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl text-sm font-bangla hover:shadow-lg transition-all duration-300 hover:scale-105">
              মেন্টর হয়ে যান
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Clean and Scrollable */}
      <div className="container mx-auto px-4 py-6 lg:pl-24">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-2">স্বাগতম, {user.name}! 👋</h2>
            <p className="text-white/90 font-bangla mb-4">আপনার শেখার যাত্রা অব্যাহত রাখুন</p>
          </div>

          {/* Feature Cards - Clean Grid */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-7 h-7 text-purple-600" />
                  Explore Features
                </h3>
                <p className="text-gray-600 font-bangla mt-1">ফিচার সমূহ</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* AI Chat & Learn */}
              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">AI Chat Assistant & Learn</h4>
                    <p className="text-sm font-bangla text-blue-800 mb-2">এআই চ্যাট সহায়ক এবং শিখুন</p>
                    <p className="text-gray-600 text-sm mb-3">Get instant answers, guidance & quality education 24/7</p>
                    <p className="text-gray-500 text-xs font-bangla mb-4">২৪/৭ তাৎক্ষণিক উত্তর, পরামর্শ এবং শিক্ষা পান</p>
                    <button 
                      onClick={() => {
                        setSelectedChatbot('general');
                        setTimeout(() => setIsChatOpen(true), 300);
                      }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Try Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Report & SOS */}
              <div className="group bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 hover:border-red-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Report, SOS & Emergency Help</h4>
                    <p className="text-sm font-bangla text-red-800 mb-2">রিপোর্ট, এসওএস এবং জরুরি সাহায্য</p>
                    <p className="text-gray-600 text-sm mb-3">Report issues, get emergency support & instant help</p>
                    <p className="text-gray-500 text-xs font-bangla mb-4">সমস্যা জানান, জরুরি সহায়তা এবং তাৎক্ষণিক সাহায্য পান</p>
                    <button 
                      onClick={() => setActiveSection('report')}
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Try Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Fact Check */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Fact Check & Gossip Detector</h4>
                    <p className="text-sm font-bangla text-green-800 mb-2">তথ্য যাচাই এবং গুজব শনাক্তকরণ</p>
                    <p className="text-gray-600 text-sm mb-3">Verify news, detect fake information with AI</p>
                    <p className="text-gray-500 text-xs font-bangla mb-4">AI দিয়ে খবর যাচাই করুন, ভুয়া তথ্য শনাক্ত করুন</p>
                    <button 
                      onClick={() => setActiveSection('home')}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Try Now
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Lab */}
              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  🚀 Upcoming
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">AI Lab (Coming Soon)</h4>
                    <p className="text-sm font-bangla text-purple-800 mb-2">এআই ল্যাব (শীঘ্রই আসছে)</p>
                    <p className="text-gray-600 text-sm mb-3">Build games, tools & code - Be independent, not dependent</p>
                    <p className="text-gray-500 text-xs font-bangla mb-4">গেম, টুলস তৈরি করুন - নিজে শিখুন, অন্যের উপর নির্ভর করবেন না</p>
                    <button 
                      disabled
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold opacity-60 cursor-not-allowed"
                    >
                      Try Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Create & Earn - Full Width */}
              <div className="md:col-span-2 group bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 border-2 border-pink-200 rounded-2xl p-6 hover:border-pink-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">Create & Earn</h4>
                    <p className="text-sm font-bangla text-pink-800 mb-2">তৈরি করুন এবং আয় করুন</p>
                    <p className="text-gray-600 text-sm mb-3">Create courses, books & videos - Earn like Udemy & Kindle</p>
                    <p className="text-gray-500 text-xs font-bangla mb-4">কোর্স, বই এবং ভিডিও তৈরি করুন এবং আয় করুন</p>
                    <button 
                      onClick={() => setActiveSection('home')}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
                🚀 Get Started Free
              </button>
              <p className="text-gray-600 text-sm mt-3 font-bangla">
                ✨ সম্পূর্ণ বিনামূল্যে শুরু করুন • কোন ক্রেডিট কার্ড প্রয়োজন নেই
              </p>
            </div>
          </div>

          {/* Top Courses Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Trophy className="w-7 h-7 text-yellow-500" />
              Top Courses
            </h3>
            <div className="grid gap-6">
              {topCourses.map((course, idx) => (
                <div key={idx} className="group border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                      <p className="text-sm font-bangla text-gray-600 mt-1">{course.titleBn}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-bold text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Community Programs */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Heart className="w-7 h-7 text-red-500" />
              Community Programs
            </h3>
            <div className="grid gap-6">
              {communityPrograms.map((program, idx) => (
                <div key={idx} className="group border-2 border-gray-100 rounded-2xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4 mb-4">
                    <div className="text-4xl">{program.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">{program.title}</h4>
                      <p className="text-sm font-bangla text-gray-600 mt-1">{program.titleBn}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-bangla">লক্ষ্য: ৳{program.goal}</span>
                      <span className="font-bold text-green-600">৳{program.raised}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${program.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{program.supporters} supporters</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Support Campaign
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
