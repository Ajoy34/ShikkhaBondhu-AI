import React, { useState } from 'react';
import { 
  User, Award, Target, TrendingUp, Calendar, 
  Edit3, Camera, Settings, Star, Trophy,
  BookOpen, Heart, Shield, Users, MessageCircle
} from 'lucide-react';

interface UserProfileProps {
  user: any;
  setUser: (user: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const achievements = [
    { id: 1, name: 'প্রথম চ্যাট', icon: '💬', description: 'প্রথমবার চ্যাট করেছেন', earned: true },
    { id: 2, name: 'সাহায্যকারী', icon: '🤝', description: '১০টি প্রশ্নের উত্তর পেয়েছেন', earned: true },
    { id: 3, name: 'শিক্ষার্থী', icon: '📚', description: '৫টি দক্ষতা কোর্স সম্পন্ন', earned: true },
    { id: 4, name: 'কমিউনিটি সদস্য', icon: '👥', description: 'কমিউনিটিতে যোগ দিয়েছেন', earned: true },
    { id: 5, name: 'মেন্টর', icon: '🎓', description: 'অন্যদের সাহায্য করেছেন', earned: false },
    { id: 6, name: 'নেতা', icon: '👑', description: 'লিডারবোর্ডে টপ ১০', earned: false },
  ];

  const activityStats = [
    { label: 'মোট চ্যাট', value: '47', icon: MessageCircle, color: 'text-blue-600' },
    { label: 'সাহায্য নিয়েছেন', value: '23', icon: Heart, color: 'text-red-600' },
    { label: 'রিপোর্ট করেছেন', value: '2', icon: Shield, color: 'text-green-600' },
    { label: 'কোর্স সম্পন্ন', value: '8', icon: BookOpen, color: 'text-purple-600' },
  ];

  const impactData = [
    { month: 'জানুয়ারি', points: 200 },
    { month: 'ফেব্রুয়ারি', points: 350 },
    { month: 'মার্চ', points: 480 },
    { month: 'এপ্রিল', points: 620 },
    { month: 'মে', points: 750 },
    { month: 'জুন', points: 1250 },
  ];

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
        {/* Profile Header */}
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
              <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.level}</div>
                  <div className="text-sm text-indigo-200 font-bangla">লেভেল</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.points}</div>
                  <div className="text-sm text-indigo-200 font-bangla">পয়েন্ট</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.impactScore}%</div>
                  <div className="text-sm text-indigo-200 font-bangla">প্রভাব স্কোর</div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                {impactData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-bangla text-gray-600">{data.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.points / 1250) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-sm font-bold text-gray-900">{data.points}</div>
                  </div>
                ))}
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