import React, { useState } from 'react';
import { TrendingUp, Users, Star, BookOpen, Video, Play, Filter, Clock, Award, Search } from 'lucide-react';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<'courses' | 'books'>('courses');

  const categories = ['All', 'Programming', 'Marketing', 'Design', 'Business', 'AI/ML', 'Self-Help'];

  const courses = [
    {
      id: 1,
      title: "Advanced Python Programming",
      titleBn: "উন্নত পাইথন প্রোগ্রামিং",
      instructor: "Dr. Ahmed Khan",
      students: 2345,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80",
      duration: "12 hours",
      lessons: 45,
      category: "Programming",
      level: "Advanced",
      price: "Free"
    },
    {
      id: 2,
      title: "Digital Marketing Mastery",
      titleBn: "ডিজিটাল মার্কেটিং দক্ষতা",
      instructor: "Sarah Rahman",
      students: 1890,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      duration: "8 hours",
      lessons: 32,
      category: "Marketing",
      level: "Beginner",
      price: "Free"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      titleBn: "ওয়েব ডেভেলপমেন্ট বুটক্যাম্প",
      instructor: "Karim Hossain",
      students: 3120,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
      duration: "20 hours",
      lessons: 78,
      category: "Programming",
      level: "Intermediate",
      price: "Free"
    },
    {
      id: 4,
      title: "AI & Machine Learning",
      titleBn: "এআই এবং মেশিন লার্নিং",
      instructor: "Dr. Fatima Noor",
      students: 2567,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      duration: "15 hours",
      lessons: 56,
      category: "AI/ML",
      level: "Advanced",
      price: "Free"
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      titleBn: "UI/UX ডিজাইন মূলনীতি",
      instructor: "Nadia Islam",
      students: 1456,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      duration: "10 hours",
      lessons: 38,
      category: "Design",
      level: "Beginner",
      price: "Free"
    },
    {
      id: 6,
      title: "Business Strategy & Growth",
      titleBn: "ব্যবসায়িক কৌশল এবং বৃদ্ধি",
      instructor: "Rahim Uddin",
      students: 1234,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      duration: "9 hours",
      lessons: 35,
      category: "Business",
      level: "Intermediate",
      price: "Free"
    }
  ];

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      titleBn: "পরমাণু অভ্যাস",
      author: "James Clear",
      readers: 1234,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      pages: 320,
      category: "Self-Help",
      language: "English"
    },
    {
      id: 2,
      title: "The Psychology of Money",
      titleBn: "অর্থের মনোবিজ্ঞান",
      author: "Morgan Housel",
      readers: 1678,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80",
      pages: 256,
      category: "Business",
      language: "English"
    },
    {
      id: 3,
      title: "Clean Code",
      titleBn: "ক্লিন কোড",
      author: "Robert Martin",
      readers: 987,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",
      pages: 464,
      category: "Programming",
      language: "English"
    },
    {
      id: 4,
      title: "Deep Work",
      titleBn: "গভীর কাজ",
      author: "Cal Newport",
      readers: 1456,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80",
      pages: 296,
      category: "Self-Help",
      language: "English"
    },
    {
      id: 5,
      title: "Marketing 4.0",
      titleBn: "মার্কেটিং ৪.০",
      author: "Philip Kotler",
      readers: 890,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
      pages: 208,
      category: "Marketing",
      language: "English"
    },
    {
      id: 6,
      title: "The Design of Everyday Things",
      titleBn: "দৈনন্দিন জিনিসের ডিজাইন",
      author: "Don Norman",
      readers: 756,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80",
      pages: 368,
      category: "Design",
      language: "English"
    }
  ];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  const displayItems = selectedType === 'courses' ? filteredCourses : filteredBooks;

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            শিক্ষা Library
          </h1>
          <p className="text-gray-600 text-lg">Discover thousands of courses and books to advance your skills</p>
          <p className="text-gray-500 font-bangla">হাজারো কোর্স এবং বই দিয়ে আপনার দক্ষতা বৃদ্ধি করুন</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, books, instructors..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-700 font-medium"
            />
          </div>
        </div>

        {/* Type Selector */}
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setSelectedType('courses')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
              selectedType === 'courses'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Courses</span>
            <span className="font-bangla">কোর্স</span>
          </button>
          <button
            onClick={() => setSelectedType('books')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${
              selectedType === 'books'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Books</span>
            <span className="font-bangla">বই</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Filter by Category</h3>
            <span className="text-gray-500 font-bangla">ক্যাটাগরি অনুযায়ী</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Badge */}
        <div className="mb-6 flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl px-4 py-3">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <span className="font-bold text-gray-900">Trending {selectedType === 'courses' ? 'Courses' : 'Books'}</span>
          <span className="font-bangla text-gray-600">• জনপ্রিয় {selectedType === 'courses' ? 'কোর্স' : 'বই'}</span>
          <span className="ml-auto text-sm text-gray-600">{displayItems.length} items</span>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-200"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + (selectedType === 'courses' ? 'Course' : 'Book') + '%3C/text%3E%3C/svg%3E';
                  }}
                />
                {selectedType === 'courses' && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-indigo-600" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-bold text-gray-900 shadow-lg">
                  {selectedType === 'courses' ? (item as any).level : (item as any).language}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    selectedType === 'courses'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 font-bangla mb-3">{item.titleBn}</p>

                {/* Instructor/Author */}
                <p className="text-sm text-gray-600 mb-3">
                  by <span className="font-semibold">{selectedType === 'courses' ? (item as any).instructor : (item as any).author}</span>
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{selectedType === 'courses' ? (item as any).students : (item as any).readers}</span>
                  </div>
                  {selectedType === 'courses' ? (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{(item as any).duration}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">{(item as any).pages}p</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
                  selectedType === 'courses'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                }`}>
                  {selectedType === 'courses' ? (
                    <>
                      <span>Enroll Now • </span>
                      <span className="font-bangla">এনরোল করুন</span>
                    </>
                  ) : (
                    <>
                      <span>Read Now • </span>
                      <span className="font-bangla">পড়ুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Load More */}
        {displayItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Load More • <span className="font-bangla">আরও দেখুন</span>
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
            <Award className="w-10 h-10 mb-3 opacity-80" />
            <div className="text-3xl font-black mb-1">5,000+</div>
            <div className="text-sm opacity-90 font-bangla">ভিডিও কোর্স</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
            <BookOpen className="w-10 h-10 mb-3 opacity-80" />
            <div className="text-3xl font-black mb-1">10,000+</div>
            <div className="text-sm opacity-90 font-bangla">ডিজিটাল বই</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <Users className="w-10 h-10 mb-3 opacity-80" />
            <div className="text-3xl font-black mb-1">50,000+</div>
            <div className="text-sm opacity-90 font-bangla">শিক্ষার্থী</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
            <TrendingUp className="w-10 h-10 mb-3 opacity-80" />
            <div className="text-3xl font-black mb-1">100%</div>
            <div className="text-sm opacity-90">Free Access</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Library;
