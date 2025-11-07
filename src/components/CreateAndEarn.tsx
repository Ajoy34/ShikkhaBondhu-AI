import { useState } from 'react';
import { Video, BookOpen, Upload, DollarSign, TrendingUp, Users, Star, Plus, Edit, Save, Eye, Play, FileText, ImageIcon, Settings, BarChart3, ArrowLeft, CheckCircle } from 'lucide-react';

type ContentType = 'course' | 'book' | null;
type Step = 'select' | 'create' | 'preview' | 'publish';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  videos: CourseVideo[];
  thumbnail?: string;
}

interface CourseVideo {
  id: string;
  title: string;
  duration: string;
  videoFile?: File;
}

interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  chapters: BookChapter[];
  coverImage?: string;
}

interface BookChapter {
  id: string;
  title: string;
  content: string;
}

interface CreateAndEarnProps {
  onBackToDashboard?: () => void;
}

export default function CreateAndEarn({ onBackToDashboard }: CreateAndEarnProps) {
  const [contentType, setContentType] = useState<ContentType>(null);
  const [step, setStep] = useState<Step>('select');

  // Course states
  const [course, setCourse] = useState<Course>({
    id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    videos: []
  });

  // Book states
  const [book, setBook] = useState<Book>({
    id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    chapters: []
  });

  const categories = [
    'Programming & Technology',
    'Business & Marketing',
    'Design & Creativity',
    'Personal Development',
    'Language Learning',
    'Academic & Education',
    'Health & Fitness',
    'Others'
  ];

  const handleSelectType = (type: ContentType) => {
    setContentType(type);
    setStep('create');
  };

  const handleAddVideo = () => {
    const newVideo: CourseVideo = {
      id: Date.now().toString(),
      title: '',
      duration: '',
    };
    setCourse({ ...course, videos: [...course.videos, newVideo] });
  };

  const handleUpdateVideo = (id: string, field: keyof CourseVideo, value: string | File) => {
    setCourse({
      ...course,
      videos: course.videos.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    });
  };

  const handleRemoveVideo = (id: string) => {
    setCourse({
      ...course,
      videos: course.videos.filter(v => v.id !== id)
    });
  };

  const handleAddChapter = () => {
    const newChapter: BookChapter = {
      id: Date.now().toString(),
      title: '',
      content: ''
    };
    setBook({ ...book, chapters: [...book.chapters, newChapter] });
  };

  const handleUpdateChapter = (id: string, field: keyof BookChapter, value: string) => {
    setBook({
      ...book,
      chapters: book.chapters.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    });
  };

  const handleRemoveChapter = (id: string) => {
    setBook({
      ...book,
      chapters: book.chapters.filter(c => c.id !== id)
    });
  };

  const handlePreview = () => {
    setStep('preview');
  };

  const handlePublish = () => {
    setStep('publish');
    // Here you would save to database/backend
    console.log('Publishing:', contentType === 'course' ? course : book);
  };

  const resetForm = () => {
    setContentType(null);
    setStep('select');
    setCourse({
      id: '',
      title: '',
      description: '',
      price: 0,
      category: '',
      videos: []
    });
    setBook({
      id: '',
      title: '',
      description: '',
      price: 0,
      category: '',
      chapters: []
    });
  };

  // Published Success Screen
  if (step === 'publish') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4">
            🎉 Successfully Published!
          </h1>
          <p className="text-xl font-bangla text-green-600 mb-6">
            সফলভাবে প্রকাশিত হয়েছে!
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {contentType === 'course' ? course.title : book.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {contentType === 'course' ? course.description : book.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-900">
                  ${contentType === 'course' ? course.price : book.price}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {contentType === 'course' ? (
                  <>
                    <Video className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-gray-700">
                      {course.videos.length} Videos
                    </span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-700">
                      {book.chapters.length} Chapters
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-600">Potential Reach</div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-600">Est. Monthly</div>
              <div className="text-2xl font-bold text-gray-900">$500+</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-600">Visibility</div>
              <div className="text-2xl font-bold text-gray-900">High</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Another {contentType === 'course' ? 'Course' : 'Book'}
            </button>
            <button
              onClick={onBackToDashboard}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
            >
              View My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Preview Screen
  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setStep('create')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Edit</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-8 h-8" />
                <h1 className="text-3xl font-black">Preview Mode</h1>
              </div>
              <p className="text-indigo-100">This is how your content will appear to students</p>
            </div>

            {/* Content Preview */}
            <div className="p-8">
              {contentType === 'course' ? (
                <>
                  <div className="mb-8">
                    <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center">
                      <Play className="w-20 h-20 text-white opacity-50" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-3">{course.title}</h2>
                    <p className="text-gray-600 text-lg mb-4">{course.description}</p>
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="w-6 h-6 text-indigo-600" />
                        <span className="text-lg font-semibold text-gray-700">{course.videos.length} Videos</span>
                      </div>
                      <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                        {course.category}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h3>
                  <div className="space-y-3">
                    {course.videos.map((video, index) => (
                      <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{video.title}</h4>
                            <p className="text-sm text-gray-500">{video.duration}</p>
                          </div>
                        </div>
                        <Play className="w-6 h-6 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="aspect-[3/4] max-w-md mx-auto bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl mb-6 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white opacity-50" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">{book.title}</h2>
                    <p className="text-gray-600 text-lg mb-4 text-center max-w-2xl mx-auto">{book.description}</p>
                    <div className="flex items-center justify-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">${book.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-6 h-6 text-purple-600" />
                        <span className="text-lg font-semibold text-gray-700">{book.chapters.length} Chapters</span>
                      </div>
                      <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                        {book.category}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <div className="space-y-3">
                    {book.chapters.map((chapter, index) => (
                      <div key={chapter.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <h4 className="font-semibold text-gray-900 text-lg">{chapter.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-14 line-clamp-2">{chapter.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Preview Actions */}
            <div className="p-8 bg-gray-50 border-t flex items-center justify-between">
              <button
                onClick={() => setStep('create')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-semibold"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Content</span>
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Upload className="w-6 h-6" />
                <span>Publish Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create/Edit Screen
  if (step === 'create' && contentType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Selection</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  Create {contentType === 'course' ? 'Video Course' : 'E-Book'}
                </h1>
                <p className="text-lg font-bangla text-indigo-600">
                  {contentType === 'course' ? 'ভিডিও কোর্স তৈরি করুন' : 'ই-বুক তৈরি করুন'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePreview}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  <Eye className="w-5 h-5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {contentType === 'course' ? (
              <div className="space-y-8">
                {/* Course Basic Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Settings className="w-6 h-6 text-indigo-600 mr-3" />
                    Basic Information
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title *</label>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => setCourse({ ...course, title: e.target.value })}
                      placeholder="e.g., Complete Web Development Bootcamp"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={course.description}
                      onChange={(e) => setCourse({ ...course, description: e.target.value })}
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                      <select
                        value={course.category}
                        onChange={(e) => setCourse({ ...course, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD) *</label>
                      <input
                        type="number"
                        value={course.price}
                        onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
                        placeholder="49.99"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-semibold">Click to upload thumbnail</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Course Videos */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Video className="w-6 h-6 text-indigo-600 mr-3" />
                      Course Videos
                    </h2>
                    <button
                      onClick={handleAddVideo}
                      className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Video</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {course.videos.map((video, index) => (
                      <div key={video.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Video {index + 1}</h3>
                          <button
                            onClick={() => handleRemoveVideo(video.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title</label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => handleUpdateVideo(video.id, 'title', e.target.value)}
                              placeholder="e.g., Introduction to HTML"
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              value={video.duration}
                              onChange={(e) => handleUpdateVideo(video.id, 'duration', e.target.value)}
                              placeholder="e.g., 15:30"
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 font-semibold">Click to upload video</p>
                          <p className="text-sm text-gray-500 mt-1">MP4, MOV up to 500MB</p>
                        </div>
                      </div>
                    ))}

                    {course.videos.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold mb-2">No videos added yet</p>
                        <p className="text-sm text-gray-500">Click "Add Video" to start building your course</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Book Basic Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Settings className="w-6 h-6 text-purple-600 mr-3" />
                    Basic Information
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title *</label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => setBook({ ...book, title: e.target.value })}
                      placeholder="e.g., The Ultimate Guide to Python Programming"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={book.description}
                      onChange={(e) => setBook({ ...book, description: e.target.value })}
                      placeholder="Describe what readers will learn from this book..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                      <select
                        value={book.category}
                        onChange={(e) => setBook({ ...book, category: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD) *</label>
                      <input
                        type="number"
                        value={book.price}
                        onChange={(e) => setBook({ ...book, price: parseFloat(e.target.value) })}
                        placeholder="19.99"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-semibold">Click to upload cover image</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Book Chapters */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
                      Book Chapters
                    </h2>
                    <button
                      onClick={handleAddChapter}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Chapter</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {book.chapters.map((chapter, index) => (
                      <div key={chapter.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Chapter {index + 1}</h3>
                          <button
                            onClick={() => handleRemoveChapter(chapter.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter Title</label>
                            <input
                              type="text"
                              value={chapter.title}
                              onChange={(e) => handleUpdateChapter(chapter.id, 'title', e.target.value)}
                              placeholder="e.g., Getting Started with Python"
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter Content</label>
                            <textarea
                              value={chapter.content}
                              onChange={(e) => handleUpdateChapter(chapter.id, 'content', e.target.value)}
                              placeholder="Write your chapter content here..."
                              rows={8}
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {book.chapters.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold mb-2">No chapters added yet</p>
                        <p className="text-sm text-gray-500">Click "Add Chapter" to start writing your book</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Save and Preview Buttons */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <button
                onClick={resetForm}
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                Cancel
              </button>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handlePreview}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Eye className="w-5 h-5" />
                  <span>Preview & Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back to Dashboard Button */}
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
            <span className="font-bangla">ড্যাশবোর্ডে ফিরুন</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 px-6 py-3 rounded-full mb-6 shadow-lg">
            <DollarSign className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-indigo-700 font-semibold">Start Earning Today</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Create & Earn
            <span className="block text-3xl font-bangla text-indigo-600 mt-2">
              তৈরি করুন এবং আয় করুন
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-3">
            Share your knowledge, build courses and books, earn money
          </p>
          <p className="text-lg text-gray-500 font-bangla max-w-3xl mx-auto">
            আপনার জ্ঞান শেয়ার করুন, কোর্স এবং বই তৈরি করুন, অর্থ উপার্জন করুন
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Video Course */}
          <div
            onClick={() => handleSelectType('course')}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl group"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white">
              <Video className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black mb-2">Create Video Course</h2>
              <p className="text-lg font-bangla opacity-90">ভিডিও কোর্স তৈরি করুন</p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 text-lg mb-6">
                Upload video lectures, create comprehensive courses, and teach thousands of students worldwide
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Upload unlimited videos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Set your own pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Track student progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Earn 70% revenue share</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">$50-500</div>
                  <div className="text-xs text-gray-600">Avg. Earnings/Month</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-xs text-gray-600">Potential Students</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">24/7</div>
                  <div className="text-xs text-gray-600">Passive Income</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                Start Creating Course →
              </button>
            </div>
          </div>

          {/* E-Book */}
          <div
            onClick={() => handleSelectType('book')}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl group"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white">
              <BookOpen className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black mb-2">Publish E-Book</h2>
              <p className="text-lg font-bangla opacity-90">ই-বুক প্রকাশ করুন</p>
            </div>

            <div className="p-8">
              <p className="text-gray-600 text-lg mb-6">
                Write and publish your own e-books, share your expertise, and earn from every sale
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Write in built-in editor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Professional formatting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Digital distribution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Earn 80% revenue share</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">$20-200</div>
                  <div className="text-xs text-gray-600">Avg. Earnings/Month</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">5K+</div>
                  <div className="text-xs text-gray-600">Potential Readers</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">∞</div>
                  <div className="text-xs text-gray-600">Lifetime Royalty</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                Start Writing Book →
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-indigo-600 mr-3" />
            Creator Success Stories
            <span className="ml-3 text-xl font-bangla text-gray-600">সফলতার গল্প</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2">2,500+</div>
              <div className="text-gray-600 font-semibold">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">$2.5M</div>
              <div className="text-gray-600 font-semibold">Paid to Creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-600 mb-2">50K+</div>
              <div className="text-gray-600 font-semibold">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">4.8⭐</div>
              <div className="text-gray-600 font-semibold">Avg. Rating</div>
            </div>
          </div>
        </div>

        {/* Top Earners */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-7 h-7 text-green-600 mr-3" />
            Top Earners This Month
          </h2>

          <div className="space-y-4">
            {[
              { name: 'Dr. Kamal Hassan', type: 'Course', earnings: '$2,450', sales: 245 },
              { name: 'Fatima Rahman', type: 'Book', earnings: '$1,890', sales: 189 },
              { name: 'Ahmed Ali', type: 'Course', earnings: '$1,650', sales: 165 }
            ].map((creator, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{creator.name}</h4>
                    <p className="text-sm text-gray-500">{creator.type} Creator • {creator.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{creator.earnings}</div>
                  <div className="text-xs text-gray-500">This Month</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
