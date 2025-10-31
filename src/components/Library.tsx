import React, { useState } from 'react';
import { TrendingUp, Users, Star, Share2, BookOpen, Video, Play, ChevronLeft, ChevronRight, Bot, GraduationCap } from 'lucide-react';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
    },
    {
      title: "AI & Machine Learning Fundamentals",
      titleBn: "এআই এবং মেশিন লার্নিং মূলনীতি",
      instructor: "Dr. Fatima Noor",
      students: 2567,
      rating: 4.9,
      image: "🤖",
      progress: 0,
      category: "AI/ML"
    }
  ];

  const topBooks = [
    {
      title: "Atomic Habits",
      titleBn: "পরমাণু অভ্যাস",
      author: "James Clear",
      readers: 1234,
      rating: 4.9,
      image: "📘",
      progress: 45,
      category: "Self-Help",
      pages: 320
    },
    {
      title: "Deep Work",
      titleBn: "গভীর কাজ",
      author: "Cal Newport",
      readers: 987,
      rating: 4.8,
      image: "📗",
      progress: 0,
      category: "Productivity",
      pages: 296
    },
    {
      title: "Think Like a Monk",
      titleBn: "সন্ন্যাসীর মতো চিন্তা করুন",
      author: "Jay Shetty",
      readers: 1456,
      rating: 4.7,
      image: "📙",
      progress: 78,
      category: "Mindfulness",
      pages: 352
    },
    {
      title: "The Psychology of Money",
      titleBn: "অর্থের মনোবিজ্ঞান",
      author: "Morgan Housel",
      readers: 1678,
      rating: 4.9,
      image: "📕",
      progress: 0,
      category: "Finance",
      pages: 256
    }
  ];

  const topVideos = [
    {
      title: "Introduction to Python Programming",
      titleBn: "পাইথন প্রোগ্রামিং পরিচিতি",
      instructor: "Dr. Ahmed Khan",
      views: 45600,
      rating: 4.8,
      thumbnail: "🎬",
      duration: "2:45:30",
      category: "Programming",
      isWatched: true
    },
    {
      title: "Digital Marketing Strategies 2024",
      titleBn: "ডিজিটাল মার্কেটিং কৌশল ২০২৪",
      instructor: "Sarah Rahman",
      views: 32400,
      rating: 4.9,
      thumbnail: "📹",
      duration: "1:30:20",
      category: "Marketing",
      isWatched: false
    },
    {
      title: "React.js Complete Tutorial",
      titleBn: "রিঅ্যাক্ট.জেএস সম্পূর্ণ টিউটোরিয়াল",
      instructor: "Karim Hossain",
      views: 56700,
      rating: 4.7,
      thumbnail: "🎥",
      duration: "3:15:45",
      category: "Web Dev",
      isWatched: false
    },
    {
      title: "AI Fundamentals for Beginners",
      titleBn: "শিক্ষানবিসদের জন্য এআই মূলনীতি",
      instructor: "Dr. Fatima Noor",
      views: 38900,
      rating: 4.9,
      thumbnail: "🎞️",
      duration: "2:00:15",
      category: "AI/ML",
      isWatched: true
    }
  ];

  return (
    <section className="py-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Library</h1>
          <p className="text-gray-600 font-bangla text-lg">কোর্স, বই এবং ভিডিও লাইব্রেরি</p>
        </div>

        {/* Top Trending Courses */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
              Top Trending Courses
              <span className="ml-2 font-bangla text-lg text-gray-600">জনপ্রিয় কোর্স</span>
            </h3>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View All →</button>
          </div>
          
          {/* Course Carousel */}
          <div className="relative">
            <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform">
                  {topCourses[currentCourseIndex].image}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">{topCourses[currentCourseIndex].title}</h4>
                      <p className="text-sm text-gray-600 font-bangla">{topCourses[currentCourseIndex].titleBn}</p>
                      <p className="text-xs text-gray-500 mt-1">by {topCourses[currentCourseIndex].instructor}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{topCourses[currentCourseIndex].category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{topCourses[currentCourseIndex].rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{topCourses[currentCourseIndex].students.toLocaleString()} students</span>
                    </div>
                  </div>

                  {topCourses[currentCourseIndex].progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Your Progress</span>
                        <span className="font-bold text-indigo-600">{topCourses[currentCourseIndex].progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${topCourses[currentCourseIndex].progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-3">
                    <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                      {topCourses[currentCourseIndex].progress > 0 ? 'Continue' : 'Enroll Now'}
                    </button>
                    <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentCourseIndex((prev) => (prev === 0 ? topCourses.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-600" />
            </button>
            <button
              onClick={() => setCurrentCourseIndex((prev) => (prev === topCourses.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-5 h-5 text-indigo-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {topCourses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCourseIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentCourseIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Books Read by Students */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-green-600" />
              Top Books Read by Students
              <span className="ml-2 font-bangla text-lg text-gray-600">জনপ্রিয় বই</span>
            </h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-semibold">View All →</button>
          </div>
          
          {/* Book Carousel */}
          <div className="relative">
            <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform">
                  {topBooks[currentBookIndex].image}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 hover:text-green-600 transition-colors">{topBooks[currentBookIndex].title}</h4>
                      <p className="text-sm text-gray-600 font-bangla">{topBooks[currentBookIndex].titleBn}</p>
                      <p className="text-xs text-gray-500 mt-1">by {topBooks[currentBookIndex].author}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">{topBooks[currentBookIndex].category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{topBooks[currentBookIndex].rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{topBooks[currentBookIndex].readers.toLocaleString()} readers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{topBooks[currentBookIndex].pages} pages</span>
                    </div>
                  </div>

                  {topBooks[currentBookIndex].progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Reading Progress</span>
                        <span className="font-bold text-green-600">{topBooks[currentBookIndex].progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${topBooks[currentBookIndex].progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-3">
                    <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                      {topBooks[currentBookIndex].progress > 0 ? 'Continue Reading' : 'Start Reading'}
                    </button>
                    <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentBookIndex((prev) => (prev === 0 ? topBooks.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => setCurrentBookIndex((prev) => (prev === topBooks.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {topBooks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBookIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentBookIndex ? 'w-8 bg-green-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Videos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Video className="w-6 h-6 mr-2 text-red-600" />
              Top Videos
              <span className="ml-2 font-bangla text-lg text-gray-600">জনপ্রিয় ভিডিও</span>
            </h3>
            <button className="text-red-600 hover:text-red-700 text-sm font-semibold">View All →</button>
          </div>
          
          {/* Video Carousel */}
          <div className="relative">
            <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all">
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform">
                  {topVideos[currentVideoIndex].thumbnail}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 hover:text-red-600 transition-colors">{topVideos[currentVideoIndex].title}</h4>
                      <p className="text-sm text-gray-600 font-bangla">{topVideos[currentVideoIndex].titleBn}</p>
                      <p className="text-xs text-gray-500 mt-1">by {topVideos[currentVideoIndex].instructor}</p>
                    </div>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">{topVideos[currentVideoIndex].category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{topVideos[currentVideoIndex].rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{topVideos[currentVideoIndex].views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-3 h-3" />
                      <span>{topVideos[currentVideoIndex].duration}</span>
                    </div>
                  </div>

                  {topVideos[currentVideoIndex].isWatched && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                        ✓ Watched
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-3">
                    <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      {topVideos[currentVideoIndex].isWatched ? 'Watch Again' : 'Watch Now'}
                    </button>
                    <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentVideoIndex((prev) => (prev === 0 ? topVideos.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-red-600" />
            </button>
            <button
              onClick={() => setCurrentVideoIndex((prev) => (prev === topVideos.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-5 h-5 text-red-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {topVideos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentVideoIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentVideoIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bangladeshi E-Course & Book Library Section */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md mb-4">
              <BookOpen className="w-6 h-6 text-amber-600 animate-pulse" />
              <span className="text-amber-900 font-bold text-lg">বাংলাদেশি শিক্ষা সম্পদ</span>
              <GraduationCap className="w-6 h-6 text-amber-600" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Bangladeshi E-Course & Book Library
              <span className="block text-2xl font-bangla text-amber-700 mt-2">
                বাংলাদেশি ই-কোর্স এবং বই লাইব্রেরি
              </span>
            </h2>
            
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
              Access thousands of quality courses and books created by Bangladeshi experts
            </p>
            <p className="text-base text-gray-600 font-bangla max-w-3xl mx-auto">
              বাংলাদেশী বিশেষজ্ঞদের তৈরি হাজারো মানসম্পন্ন কোর্স এবং বই অ্যাক্সেস করুন
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Courses */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-indigo-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Video Courses</h3>
              <p className="text-sm font-bangla text-indigo-600 font-semibold mb-3">ভিডিও কোর্স</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Programming, Web Dev, AI/ML</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Digital Marketing & Business</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Life Skills & Personal Growth</span>
                </li>
                <li className="flex items-start font-bangla text-indigo-600">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>বাংলায় ও ইংরেজিতে উপলব্ধ</span>
                </li>
              </ul>
              <div className="flex items-center justify-between text-xs text-gray-500 bg-indigo-50 rounded-lg p-3">
                <span className="font-semibold">5,000+ Courses</span>
                <span className="font-bangla">৫,০০০+ কোর্স</span>
              </div>
            </div>

            {/* Books */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Books</h3>
              <p className="text-sm font-bangla text-green-600 font-semibold mb-3">ডিজিটাল বই</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Academic & Educational Books</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Self-Help & Motivation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Technology & Innovation</span>
                </li>
                <li className="flex items-start font-bangla text-green-600">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>বাংলাদেশী লেখকদের বই</span>
                </li>
              </ul>
              <div className="flex items-center justify-between text-xs text-gray-500 bg-green-50 rounded-lg p-3">
                <span className="font-semibold">10,000+ Books</span>
                <span className="font-bangla">১০,০০০+ বই</span>
              </div>
            </div>

            {/* AI Books */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Generated Books</h3>
              <p className="text-sm font-bangla text-purple-600 font-semibold mb-3">এআই দ্বারা তৈরি বই</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom AI-generated content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Personalized study materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Quick summaries & guides</span>
                </li>
                <li className="flex items-start font-bangla text-purple-600">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>এআই সহায়তায় শিখুন দ্রুত</span>
                </li>
              </ul>
              <div className="flex items-center justify-between text-xs text-gray-500 bg-purple-50 rounded-lg p-3">
                <span className="font-semibold">Unlimited Access</span>
                <span className="font-bangla">সীমাহীন সুবিধা</span>
              </div>
            </div>
          </div>

          {/* Library Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-indigo-600">5K+</div>
              <div className="text-xs text-gray-600 font-bangla">ভিডিও কোর্স</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-green-600">10K+</div>
              <div className="text-xs text-gray-600 font-bangla">ডিজিটাল বই</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-xs text-gray-600 font-bangla">বাংলায়</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-md">
              <div className="text-2xl font-bold text-orange-600">Free</div>
              <div className="text-xs text-gray-600 font-bangla">বিনামূল্যে</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <BookOpen className="w-6 h-6" />
              <span>Browse Library</span>
              <span className="font-bangla">লাইব্রেরি দেখুন</span>
            </button>
            <p className="mt-3 text-sm text-gray-600 font-bangla">
              ✨ সম্পূর্ণ বিনামূল্যে • কোন সাবস্ক্রিপশন ফি নেই
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Library;
