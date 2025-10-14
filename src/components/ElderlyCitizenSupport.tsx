import React, { useState } from 'react';
import {
  Heart, Phone, Users, BookOpen, Shield,
  Calendar, MapPin, Clock, Star, Award,
  Headphones, Video, MessageCircle, UserCheck,
  Stethoscope, Home, Briefcase, Coffee, AlertTriangle
} from 'lucide-react';
import ReportSystem from './ReportSystem';

const ElderlyCitizenSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    {
      id: 1,
      title: 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ',
      description: 'বয়স্ক নাগরিকদের জন্য সহজ ভাষায় মোবাইল ও কম্পিউটার ব্যবহার শেখানো',
      icon: BookOpen,
      color: 'bg-blue-500',
      participants: 245,
      rating: 4.8,
      duration: '২ সপ্তাহ',
      schedule: 'সপ্তাহে ৩ দিন'
    },
    {
      id: 2,
      title: 'স্বাস্থ্য পরামর্শ সেবা',
      description: 'অভিজ্ঞ ডাক্তারদের সাথে ভিডিও কল বা ফোনে স্বাস্থ্য পরামর্শ',
      icon: Stethoscope,
      color: 'bg-green-500',
      participants: 189,
      rating: 4.9,
      duration: '৩০ মিনিট',
      schedule: 'যেকোনো সময়'
    },
    {
      id: 3,
      title: 'সামাজিক যোগাযোগ গ্রুপ',
      description: 'একাকীত্ব দূর করতে সমমনা বয়স্ক ব্যক্তিদের সাথে যুক্ত হওয়ার সুযোগ',
      icon: Users,
      color: 'bg-purple-500',
      participants: 156,
      rating: 4.7,
      duration: 'চলমান',
      schedule: 'দৈনিক'
    },
    {
      id: 4,
      title: 'আইনি সহায়তা',
      description: 'সম্পত্তি, পেনশন ও অন্যান্য আইনি বিষয়ে বিনামূল্যে পরামর্শ',
      icon: Shield,
      color: 'bg-red-500',
      participants: 98,
      rating: 4.6,
      duration: '১ ঘন্টা',
      schedule: 'সপ্তাহে ২ দিন'
    },
    {
      id: 5,
      title: 'ঘরোয়া সেবা সহায়তা',
      description: 'দৈনন্দিন কাজকর্মে সহায়তা ও পরিচর্যা সেবা',
      icon: Home,
      color: 'bg-orange-500',
      participants: 67,
      rating: 4.5,
      duration: 'প্রয়োজন অনুযায়ী',
      schedule: '২৪/৭'
    },
    {
      id: 6,
      title: 'বিনোদন ও সংস্কৃতি',
      description: 'গান, কবিতা, গল্প ও ঐতিহ্যবাহী বিনোদনের আয়োজন',
      icon: Coffee,
      color: 'bg-yellow-500',
      participants: 134,
      rating: 4.8,
      duration: '২ ঘন্টা',
      schedule: 'সপ্তাহে ১ দিন'
    }
  ];

  const volunteers = [
    {
      id: 1,
      name: 'ডা. রাশেদা খান',
      specialty: 'চিকিৎসক',
      experience: '১৫ বছর',
      rating: 4.9,
      sessions: 156,
      avatar: '👩‍⚕️',
      available: true
    },
    {
      id: 2,
      name: 'আব্দুল করিম',
      specialty: 'ডিজিটাল প্রশিক্ষক',
      experience: '৮ বছর',
      rating: 4.8,
      sessions: 89,
      avatar: '👨‍💻',
      available: true
    },
    {
      id: 3,
      name: 'ফাতিমা বেগম',
      specialty: 'সামাজিক কর্মী',
      experience: '১২ বছর',
      rating: 4.7,
      sessions: 234,
      avatar: '👩‍💼',
      available: false
    },
    {
      id: 4,
      name: 'মোহাম্মদ হাসান',
      specialty: 'আইনজীবী',
      experience: '২০ বছর',
      rating: 4.9,
      sessions: 67,
      avatar: '👨‍💼',
      available: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'আব্দুল মান্নান',
      age: 68,
      location: 'ঢাকা',
      message: 'এই প্ল্যাটফর্মের মাধ্যমে আমি মোবাইল ব্যবহার শিখেছি। এখন নাতি-নাতনিদের সাথে ভিডিও কল করতে পারি।',
      rating: 5,
      service: 'ডিজিটাল সাক্ষরতা'
    },
    {
      id: 2,
      name: 'রোকেয়া খাতুন',
      age: 72,
      location: 'চট্টগ্রাম',
      message: 'ডাক্তারের সাথে ঘরে বসে কথা বলতে পারি। খুবই সুবিধাজনক এবং ডাক্তাররা খুব ভালো।',
      rating: 5,
      service: 'স্বাস্থ্য পরামর্শ'
    },
    {
      id: 3,
      name: 'নুরুল ইসলাম',
      age: 75,
      location: 'সিলেট',
      message: 'একাকীত্ব অনুভব করতাম। এখন অনেক বন্ধু পেয়েছি। প্রতিদিন গল্প করি।',
      rating: 5,
      service: 'সামাজিক যোগাযোগ'
    }
  ];

  const emergencyContacts = [
    { name: 'জাতীয় জরুরি সেবা', number: '৯৯৯', type: 'জরুরি' },
    { name: 'স্বাস্থ্য বাতায়ন', number: '১৬২৬৩', type: 'স্বাস্থ্য' },
    { name: 'বয়স্ক সেবা হটলাইন', number: '১০৯', type: 'সেবা' },
    { name: 'পুলিশ হেল্পলাইন', number: '১০০', type: 'নিরাপত্তা' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'স্বাস্থ্য সচেতনতা সেমিনার',
      date: '২০২৪-০৬-১৫',
      time: '১০:০০ AM',
      location: 'অনলাইন',
      participants: 45,
      type: 'সেমিনার'
    },
    {
      id: 2,
      title: 'ডিজিটাল ব্যাংকিং প্রশিক্ষণ',
      date: '২০২৪-০৬-১৮',
      time: '২:০০ PM',
      location: 'কমিউনিটি সেন্টার',
      participants: 32,
      type: 'প্রশিক্ষণ'
    },
    {
      id: 3,
      title: 'সাংস্কৃতিক অনুষ্ঠান',
      date: '২০২৪-০৬-২০',
      time: '৪:০০ PM',
      location: 'পার্ক',
      participants: 78,
      type: 'বিনোদন'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Heart className="w-10 h-10 text-red-500 mr-3" />
            বয়স্ক নাগরিক সহায়তা
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
            আমাদের সম্মানিত বয়স্ক নাগরিকদের জন্য বিশেষ সেবা ও সহায়তা। ডিজিটাল যুগে তাদের সাথে থাকার প্রতিশ্রুতি।
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center font-bangla">
            <Phone className="w-6 h-6 mr-2" />
            জরুরি যোগাযোগ
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-red-600 mb-1">{contact.number}</div>
                <div className="text-sm font-bangla text-gray-700">{contact.name}</div>
                <div className="text-xs text-gray-500">{contact.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {[
            { id: 'services', label: 'সেবাসমূহ', icon: Heart },
            { id: 'volunteers', label: 'স্বেচ্ছাসেবক', icon: UserCheck },
            { id: 'events', label: 'আসন্ন অনুষ্ঠান', icon: Calendar },
            { id: 'testimonials', label: 'মতামত', icon: Star },
            { id: 'report', label: 'রিপোর্ট করুন', icon: AlertTriangle }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-bangla">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'services' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 font-bangla">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-bangla">অংশগ্রহণকারী:</span>
                        <span className="font-bold">{service.participants} জন</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-bangla">রেটিং:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold ml-1">{service.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-bangla">সময়কাল:</span>
                        <span className="font-bold">{service.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-bangla">সময়সূচি:</span>
                        <span className="font-bold">{service.schedule}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all font-bangla">
                      সেবা নিন
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {volunteers.map((volunteer) => (
                <div key={volunteer.id} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-6xl mb-4">{volunteer.avatar}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 font-bangla">{volunteer.name}</h3>
                  <p className="text-indigo-600 text-sm mb-2 font-bangla">{volunteer.specialty}</p>
                  <p className="text-gray-500 text-sm mb-3 font-bangla">অভিজ্ঞতা: {volunteer.experience}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold ml-1">{volunteer.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500 font-bangla">
                      {volunteer.sessions} সেশন
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mb-4 ${
                    volunteer.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      volunteer.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-bangla">
                      {volunteer.available ? 'উপলব্ধ' : 'ব্যস্ত'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-bangla transition-colors ${
                        volunteer.available 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!volunteer.available}
                    >
                      যোগাযোগ করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-bangla">{event.title}</h3>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString('bn-BD')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          event.type === 'সেমিনার' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'প্রশিক্ষণ' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-sm text-gray-500 font-bangla">
                          {event.participants} জন অংশগ্রহণকারী
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla">
                        অংশগ্রহণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-bangla">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.age} বছর, {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm mb-3 font-bangla italic">
                    "{testimonial.message}"
                  </p>

                  <div className="bg-gray-50 px-3 py-1 rounded-full inline-block">
                    <span className="text-xs text-gray-600 font-bangla">{testimonial.service}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'report' && <ReportSystem />}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4 font-bangla">আমাদের সাথে যুক্ত হন</h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto font-bangla">
            আপনিও আমাদের বয়স্ক নাগরিকদের সেবায় অংশ নিতে পারেন। স্বেচ্ছাসেবক হিসেবে যোগ দিন বা সেবা নিন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors font-bangla">
              স্বেচ্ছাসেবক হন
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors font-bangla">
              সেবা নিন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElderlyCitizenSupport;