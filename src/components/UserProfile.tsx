import React, { useState } from 'react';
import { 
  User, Award, Target, TrendingUp, Calendar, 
  Edit3, Camera, Settings, Star, Trophy,
  BookOpen, Heart, Shield, Users, MessageCircle
} from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserProfile as UserProfileType } from '../lib/auth';

interface UserProfileProps {
  user: any;
  setUser: (user: any) => void;
  authUser?: SupabaseUser | null;
  userProfile?: UserProfileType | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser, authUser, userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [selectedYear, setSelectedYear] = useState(2024);

  // Generate activity heatmap data (GitHub/LeetCode style)
  const generateActivityData = () => {
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const weeks = [];
    
    for (let month = 0; month < 12; month++) {
      const monthWeeks = [];
      for (let week = 0; week < 4; week++) {
        for (let day = 0; day < 7; day++) {
          // Random activity level (0-4)
          const level = Math.floor(Math.random() * 5);
          monthWeeks.push({ level, date: `${months[month]} ${week * 7 + day + 1}` });
        }
      }
      weeks.push({ month: months[month], days: monthWeeks });
    }
    return weeks;
  };

  const activityData = generateActivityData();

  // User contributions stats - Use real data from user profile or defaults to 0 for fresh users
  const contributions = {
    coursesCreated: userProfile?.courses_created || 0,
    booksPublished: userProfile?.books_published || 0,
    socialImpact: userProfile?.impact_score || 0,
    campaignsCreated: userProfile?.total_campaigns_created || 0,
    peopleHelped: userProfile?.people_helped || 0,
    rating: userProfile?.rating || 0,
    totalProblems: userProfile?.total_problems || 0,
    lastYearProblems: userProfile?.last_year_problems || 0,
    lastMonthProblems: userProfile?.last_month_problems || 0,
    maxStreak: userProfile?.max_streak || 0,
    currentYearStreak: userProfile?.current_year_streak || 0,
    currentMonthStreak: userProfile?.current_month_streak || 0
  };

  const achievements = [
    { id: 1, name: 'প্রথম চ্যাট', icon: '💬', description: 'প্রথমবার চ্যাট করেছেন', earned: true },
    { id: 2, name: 'সাহায্যকারী', icon: '🤝', description: '১০টি প্রশ্নের উত্তর পেয়েছেন', earned: true },
    { id: 3, name: 'শিক্ষার্থী', icon: '📚', description: '৫টি দক্ষতা কোর্স সম্পন্ন', earned: true },
    { id: 4, name: 'কমিউনিটি সদস্য', icon: '👥', description: 'কমিউনিটিতে যোগ দিয়েছেন', earned: true },
    { id: 5, name: 'মেন্টর', icon: '🎓', description: 'অন্যদের সাহায্য করেছেন', earned: false },
    { id: 6, name: 'নেতা', icon: '👑', description: 'লিডারবোর্ডে টপ ১০', earned: false },
  ];

  const activityStats = [
    { label: 'মোট চ্যাট', value: String(userProfile?.total_chat_messages || 0), icon: MessageCircle, color: 'text-blue-600' },
    { label: 'সাহায্য নিয়েছেন', value: String(userProfile?.people_helped || 0), icon: Heart, color: 'text-red-600' },
    { label: 'রিপোর্ট করেছেন', value: '0', icon: Shield, color: 'text-green-600' },
    { label: 'কোর্স সম্পন্ন', value: String(userProfile?.total_courses_completed || 0), icon: BookOpen, color: 'text-purple-600' },
  ];

  // Generate monthly progress based on user's actual points
  const generateMonthlyProgress = () => {
    const currentPoints = userProfile?.points || 0;
    if (currentPoints === 0) {
      return [
        { month: 'জানুয়ারি', points: 0 },
        { month: 'ফেব্রুয়ারি', points: 0 },
        { month: 'মার্চ', points: 0 },
        { month: 'এপ্রিল', points: 0 },
        { month: 'মে', points: 0 },
        { month: 'জুন', points: 0 },
      ];
    }
    // For users with points, distribute them across months
    return [
      { month: 'জানুয়ারি', points: Math.floor(currentPoints * 0.1) },
      { month: 'ফেব্রুয়ারি', points: Math.floor(currentPoints * 0.15) },
      { month: 'মার্চ', points: Math.floor(currentPoints * 0.2) },
      { month: 'এপ্রিল', points: Math.floor(currentPoints * 0.25) },
      { month: 'মে', points: Math.floor(currentPoints * 0.3) },
      { month: 'জুন', points: currentPoints },
    ];
  };

  const impactData = generateMonthlyProgress();

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Floating Login Button - Only shows for guests who are NOT logged in */}
        {user.name === 'Guest User' && !authUser && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 animate-bounce font-bold text-lg flex items-center gap-3"
              title="Scroll to top and click Sign In button"
            >
              <span className="text-2xl">👆</span>
              <div className="text-left">
                <div>Click Sign In Button</div>
                <div className="text-xs opacity-90">At Top Right Corner ↗️</div>
              </div>
            </button>
          </div>
        )}

        {/* Debug Info Panel with Login Button - Only for ACTUALLY not logged in users */}
        {user.name === 'Guest User' && !authUser && (
          <>
            {/* BIG BANNER - IMPOSSIBLE TO MISS */}
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white p-8 rounded-2xl mb-6 shadow-2xl animate-pulse">
              <div className="text-center">
                <div className="text-6xl mb-4">🚨</div>
                <h2 className="text-4xl font-bold mb-4">YOU ARE NOT LOGGED IN!</h2>
                <p className="text-2xl mb-6">আপনি লগইন করেননি!</p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <p className="text-xl mb-4">To see your REAL profile with your NAME:</p>
                  <ol className="text-left text-lg space-y-2 max-w-2xl mx-auto">
                    <li>1️⃣ Look at the <strong>TOP RIGHT corner</strong> of this page</li>
                    <li>2️⃣ Click the button that says <strong>"🔐 Sign In / লগইন করুন"</strong></li>
                    <li>3️⃣ Enter your email and password, then click Login</li>
                    <li>4️⃣ Your name will appear automatically!</li>
                  </ol>
                </div>
                <div className="text-sm opacity-90">
                  Don't have an account? Click "Sign Up" in the modal to create one!
                </div>
              </div>
            </div>

            {/* Detailed Debug Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-4 border-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-800 mb-3 text-xl flex items-center gap-2">
                    🔍 Technical Debug Info
                  </h3>
                  <div className="text-sm text-yellow-900 space-y-1 mb-4">
                    <p><strong>User Name:</strong> {user.name}</p>
                    <p><strong>User Email:</strong> {user.email}</p>
                    <p><strong>Auth User ID:</strong> {authUser?.id || 'Not logged in'}</p>
                    <p><strong>Auth User Email:</strong> {authUser?.email || 'N/A'}</p>
                    <p><strong>Profile Loaded:</strong> {userProfile ? 'Yes' : 'No'}</p>
                    {userProfile && (
                      <>
                        <p><strong>Profile Full Name:</strong> {userProfile.full_name || 'Not set'}</p>
                        <p><strong>Profile Email:</strong> {userProfile.email}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading state during auth check */}
        {authUser && user.name === 'Guest User' && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6 text-center">
            <div className="text-blue-600 text-xl font-semibold mb-2">⏳ Loading your profile...</div>
            <div className="text-blue-500">Please wait while we fetch your information</div>
            <div className="mt-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Profile Header (only show for logged in users with loaded profile) */}
        {(user.name !== 'Guest User' || authUser) && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 px-4 py-2 rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="আপনার নাম"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      সেভ করুন
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                    <h1 className="text-3xl font-bold font-bangla">{user.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    সদস্য হয়েছেন: {new Date(user.joinedDate).toLocaleDateString('bn-BD')}
                  </p>
                </>
              )}

              {/* Stats */}
                    {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.coursesCreated}</div>
          <div className="text-blue-100 mt-1 text-sm">Courses Created</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.booksPublished}</div>
          <div className="text-green-100 mt-1 text-sm">Books Published</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white text-center">
          <Heart className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.socialImpact}</div>
          <div className="text-purple-100 mt-1 text-sm">Social Impact</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white text-center">
          <Shield className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.campaignsCreated}</div>
          <div className="text-orange-100 mt-1 text-sm">Campaigns Created</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-xl shadow-lg text-white text-center">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.peopleHelped}</div>
          <div className="text-pink-100 mt-1 text-sm">People Helped</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg text-white text-center">
          <Star className="w-8 h-8 mx-auto mb-2" />
          <div className="text-3xl font-bold">{contributions.rating.toFixed(1)}</div>
          <div className="text-yellow-100 mt-1 text-sm">Avg Rating</div>
        </div>
      </div>

      {/* Activity Heatmap - LeetCode Style */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Activity Contributions
            </h3>
            <p className="text-gray-600 text-sm mt-1">Your learning journey visualized</p>
          </div>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-gray-700 mb-3">Total Problems Solved</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">All time:</span>
                <span className="text-2xl font-bold text-green-600">{contributions.totalProblems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last year:</span>
                <span className="text-xl font-semibold text-green-500">{contributions.lastYearProblems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last month:</span>
                <span className="text-lg font-semibold text-green-400">{contributions.lastMonthProblems}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
            <h4 className="font-semibold text-gray-700 mb-3">Learning Streak 🔥</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Max streak:</span>
                <span className="text-2xl font-bold text-orange-600">{contributions.maxStreak} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This year:</span>
                <span className="text-xl font-semibold text-orange-500">{contributions.currentYearStreak} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This month:</span>
                <span className="text-lg font-semibold text-orange-400">{contributions.currentMonthStreak} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Calendar */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex gap-1">
              {/* Month labels */}
              <div className="flex flex-col justify-end mr-2">
                <div className="text-xs text-gray-500 h-4"></div>
                <div className="text-xs text-gray-500 h-3">Sun</div>
                <div className="text-xs text-gray-500 h-3"></div>
                <div className="text-xs text-gray-500 h-3">Tue</div>
                <div className="text-xs text-gray-500 h-3"></div>
                <div className="text-xs text-gray-500 h-3">Thu</div>
                <div className="text-xs text-gray-500 h-3"></div>
                <div className="text-xs text-gray-500 h-3">Sat</div>
              </div>

              {/* Activity grid */}
              {activityData.map((monthData, monthIdx) => (
                <div key={monthIdx} className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-1 h-4">{monthData.month}</div>
                  <div className="grid grid-rows-7 gap-1">
                    {monthData.days.slice(0, 28).map((day, dayIdx) => {
                      const colorMap = [
                        'bg-gray-100',
                        'bg-green-200',
                        'bg-green-300',
                        'bg-green-500',
                        'bg-green-600'
                      ];
                      return (
                        <div
                          key={dayIdx}
                          className={`w-3 h-3 rounded-sm ${colorMap[day.level]} hover:ring-2 hover:ring-blue-400 cursor-pointer transition-all`}
                          title={`${day.date}: ${day.level} contributions`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-gray-500">Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
            </div>
          </div>
        </div>
        )}

        {/* Stats and Activity Grid - Always show */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
                কার্যকলাপের পরিসংখ্যান
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activityStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                      <IconComponent className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-bangla">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-indigo-600" />
                মাসিক অগ্রগতি
              </h3>
              <div className="space-y-4">
                {impactData.map((data, index) => {
                  const maxPoints = Math.max(...impactData.map(d => d.points), 100); // Minimum 100 for scaling
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-20 text-sm font-bangla text-gray-600">{data.month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${maxPoints > 0 ? (data.points / maxPoints) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-sm font-bold text-gray-900">{data.points}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                সাম্প্রতিক কার্যকলাপ
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'স্বাস্থ্য বট এর সাথে চ্যাট করেছেন', time: '২ ঘন্টা আগে', points: '+5' },
                  { action: 'প্রোগ্রামিং কোর্স সম্পন্ন করেছেন', time: '১ দিন আগে', points: '+50' },
                  { action: 'কমিউনিটিতে প্রশ্ন করেছেন', time: '২ দিন আগে', points: '+10' },
                  { action: 'নিরাপত্তা রিপোর্ট জমা দিয়েছেন', time: '৩ দিন আগে', points: '+25' },
                  { action: 'মেন্টরশিপ প্রোগ্রামে যোগ দিয়েছেন', time: '১ সপ্তাহ আগে', points: '+30' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 font-bangla">{activity.action}</div>
                      <div className="text-sm text-gray-500 font-bangla">{activity.time}</div>
                    </div>
                    <div className="text-green-600 font-bold">{activity.points}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-indigo-600" />
                অর্জনসমূহ
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`font-bold font-bangla ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                          {achievement.name}
                        </div>
                        <div className={`text-sm font-bangla ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                <span className="font-bangla">লিডারবোর্ড</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: "Arif Rahman", points: 2850, rank: 1 },
                  { name: user.name, points: user.points, rank: 8, isYou: true },
                  { name: "Fatima Noor", points: 1180, rank: 9 },
                  { name: "Karim Ahmed", points: 980, rank: 10 }
                ].map((leader, idx) => (
                  <div key={idx} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${leader.isYou ? 'bg-indigo-50 border-2 border-indigo-300' : 'hover:bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
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
                    {leader.rank === 1 && (
                      <div className="text-2xl">🏆</div>
                    )}
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors">
                View Full Leaderboard →
              </button>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-indigo-600" />
                পরবর্তী লেভেল
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">Level {user.level}</div>
                <div className="text-sm text-gray-600 font-bangla mb-4">
                  পরবর্তী লেভেলের জন্য আরো {1500 - user.points} পয়েন্ট প্রয়োজন
                </div>
                <div className="bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(user.points % 300) / 300 * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 font-bangla">
                  {user.points % 300} / 300 পয়েন্ট
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-indigo-600" />
                দ্রুত কাজ
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-indigo-100 text-indigo-700 p-3 rounded-lg font-medium font-bangla hover:bg-indigo-200 transition-colors">
                  প্রোফাইল আপডেট করুন
                </button>
                <button className="w-full bg-green-100 text-green-700 p-3 rounded-lg font-medium font-bangla hover:bg-green-200 transition-colors">
                  নতুন কোর্স শুরু করুন
                </button>
                <button className="w-full bg-purple-100 text-purple-700 p-3 rounded-lg font-medium font-bangla hover:bg-purple-200 transition-colors">
                  কমিউনিটিতে যোগ দিন
                </button>
                <button className="w-full bg-yellow-100 text-yellow-700 p-3 rounded-lg font-medium font-bangla hover:bg-yellow-200 transition-colors">
                  মেন্টর হয়ে যান
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;