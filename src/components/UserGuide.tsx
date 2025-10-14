import React, { useState } from 'react';
import { Book, Video, FileText, Users, MessageCircle, Star } from 'lucide-react';

const UserGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const guideSection = {
    'getting-started': {
      title: 'Getting Started',
      bangla: 'শুরু করা',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Welcome to ShikkhaBondhu</h3>
            <p className="font-bangla text-lg text-indigo-700 mb-4">শিক্ষা বন্ধুতে স্বাগতম</p>
            <div className="prose">
              <p className="text-gray-700 leading-relaxed">
                ShikkhaBondhu is your comprehensive digital companion designed specifically for Bangladeshi students. 
                Our platform provides confidential support, practical guidance, and essential resources to help you 
                navigate academic, personal, and social challenges.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-lg">Start Chatting</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-bangla">
                আমাদের AI সহায়কদের সাথে কথা বলুন। প্রতিটি বট আলাদা বিষয়ে বিশেষজ্ঞ - 
                আইন, স্বাস্থ্য, নিরাপত্তা, এবং দক্ষতা উন্নয়নে।
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-lg">Join Community</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-bangla">
                অন্য ছাত্রছাত্রীদের সাথে যুক্ত হন, অভিজ্ঞতা শেয়ার করুন এবং 
                সাপোর্ট গ্রুপে অংশগ্রহণ করুন।
              </p>
            </div>
          </div>
        </div>
      )
    },
    'features': {
      title: 'Platform Features',
      bangla: 'প্ল্যাটফর্মের সুবিধা',
      content: (
        <div className="space-y-6">
          <div className="grid gap-6">
            {[
              {
                icon: '⚖️',
                title: 'Legal Rights Assistant',
                bangla: 'আইনি অধিকার সহায়ক',
                description: 'Get information about cyberbullying laws, student rights, and legal procedures in Bangladesh.',
                features: ['Digital Security Act 2018', 'Student Protection Laws', 'Legal Consultation', 'Reporting Guidance']
              },
              {
                icon: '❤️',
                title: 'Health & Wellness Support',
                bangla: 'স্বাস্থ্য ও মানসিক সাহায্য',
                description: 'Confidential health guidance covering mental health, reproductive health, and crisis support.',
                features: ['Mental Health Counseling', 'Reproductive Health Info', 'Crisis Intervention', 'Healthcare Resources']
              },
              {
                icon: '🛡️',
                title: 'Safety & Reporting Hub',
                bangla: 'নিরাপত্তা ও রিপোর্টিং',
                description: 'Secure reporting system for harassment, bullying, and safety concerns with complete anonymity.',
                features: ['Anonymous Reporting', 'Evidence Collection', 'Safety Planning', 'Emergency Contacts']
              },
              {
                icon: '🧠',
                title: 'Skills Development',
                bangla: 'দক্ষতা উন্নয়ন',
                description: 'Learn practical skills for career advancement with free courses and resources.',
                features: ['Technical Skills', 'Soft Skills Training', 'Career Guidance', 'Certification Programs']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900">{feature.title}</h4>
                    <p className="font-bangla text-indigo-600 text-sm mb-2">{feature.bangla}</p>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'tutorials': {
      title: 'Video Tutorials',
      bangla: 'ভিডিও টিউটোরিয়াল',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'How to Use Chat System',
                bangla: 'চ্যাট সিস্টেম ব্যবহার করুন',
                duration: '3 min',
                thumbnail: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Reporting Safety Issues',
                bangla: 'নিরাপত্তা সমস্যা রিপোর্ট করুন',
                duration: '5 min',
                thumbnail: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Using Voice Assistant',
                bangla: 'ভয়েস সহায়ক ব্যবহার',
                duration: '4 min',
                thumbnail: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=400'
              },
              {
                title: 'Finding Support Resources',
                bangla: 'সাহায্যের রিসোর্স খুঁজুন',
                duration: '6 min',
                thumbnail: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-opacity-100 transition-all">
                      <Video className="w-8 h-8 text-indigo-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">{video.title}</h4>
                  <p className="font-bangla text-sm text-gray-600">{video.bangla}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'faq': {
      title: 'Frequently Asked Questions',
      bangla: 'সাধারণ প্রশ্নাবলী',
      content: (
        <div className="space-y-4">
          {[
            {
              question: 'Is my information kept confidential?',
              questionBangla: 'আমার তথ্য কি গোপন রাখা হয়?',
              answer: 'Yes, absolutely. All conversations and reports are encrypted and kept strictly confidential. We never share personal information without your explicit consent.',
              answerBangla: 'হ্যাঁ, সম্পূর্ণভাবে। সব কথোপকথন এবং রিপোর্ট এনক্রিপ্ট করা এবং কঠোরভাবে গোপনীয় রাখা হয়।'
            },
            {
              question: 'How do I report harassment or bullying?',
              questionBangla: 'হয়রানি বা বুলিং কিভাবে রিপোর্ট করবো?',
              answer: 'Use our Safety & Reporting Bot to file a confidential report. The process is guided and secure, and you can choose to remain anonymous.',
              answerBangla: 'আমাদের নিরাপত্তা ও রিপোর্টিং বট ব্যবহার করে গোপনীয় রিপোর্ট করুন। প্রক্রিয়াটি নির্দেশিত এবং নিরাপদ।'
            },
            {
              question: 'Are the AI assistants available 24/7?',
              questionBangla: 'AI সহায়করা কি ২৪/৭ উপলব্ধ?',
              answer: 'Yes, our AI assistants are available round the clock. For human support, we have scheduled hours, but emergency contacts are always available.',
              answerBangla: 'হ্যাঁ, আমাদের AI সহায়করা ২৪ঘন্টা উপলব্ধ। জরুরি যোগাযোগ সবসময় উপলব্ধ।'
            },
            {
              question: 'Can I use voice commands?',
              questionBangla: 'আমি কি ভয়েস কমান্ড ব্যবহার করতে পারি?',
              answer: 'Yes, our platform supports voice input in Bengali and English. You can speak to the AI assistants instead of typing.',
              answerBangla: 'হ্যাঁ, আমাদের প্ল্যাটফর্ম বাংলা এবং ইংরেজিতে ভয়েস ইনপুট সাপোর্ট করে।'
            },
            {
              question: 'How can I become a volunteer?',
              questionBangla: 'আমি কিভাবে স্বেচ্ছাসেবক হতে পারি?',
              answer: 'Visit our Volunteer Section to learn about opportunities. We have roles for peer mentors, content creators, and community moderators.',
              answerBangla: 'আমাদের স্বেচ্ছাসেবক বিভাগে যান। আমাদের পিয়ার মেন্টর, কন্টেন্ট তৈরিকারী, এবং কমিউনিটি মডারেটরের ভূমিকা আছে।'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-1">{faq.question}</h4>
              <p className="font-bangla text-indigo-600 text-sm mb-3">{faq.questionBangla}</p>
              <p className="text-gray-700 mb-2">{faq.answer}</p>
              <p className="font-bangla text-gray-600 text-sm">{faq.answerBangla}</p>
            </div>
          ))}
        </div>
      )
    }
  };

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', bangla: 'শুরু করুন', icon: Star },
    { id: 'features', label: 'Features', bangla: 'সুবিধা', icon: Book },
    { id: 'tutorials', label: 'Tutorials', bangla: 'টিউটোরিয়াল', icon: Video },
    { id: 'faq', label: 'FAQ', bangla: 'প্রশ্ন', icon: FileText }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">User Guide</h2>
          <p className="font-bangla text-xl text-indigo-600 mb-4">ব্যবহারকারীর গাইড</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete guide to help you make the most of ShikkhaBondhu's features and services.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="hidden sm:block">{tab.label}</span>
                <span className="sm:hidden font-bangla">{tab.bangla}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {guideSection[activeTab as keyof typeof guideSection].content}
        </div>
      </div>
    </section>
  );
};

export default UserGuide;