import React, { useState } from 'react';
import {
  AlertTriangle, Phone, Heart, Shield, X, MapPin, 
  MessageCircle, Ambulance,
  Home, Stethoscope, UserCheck
} from 'lucide-react';
import ReportSystem from './ReportSystem';

interface SOSButtonProps {
  user?: any;
}

const SOSButton: React.FC<SOSButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  const emergencyContacts = [
    { name: 'জাতীয় জরুরি সেবা', number: '৯৯৯', type: 'জরুরি', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'স্বাস্থ্য বাতায়ন', number: '১৬২৬৩', type: 'স্বাস্থ্য', icon: Stethoscope, color: 'bg-green-500' },
    { name: 'বয়স্ক সেবা হটলাইন', number: '১০৯', type: 'সেবা', icon: Heart, color: 'bg-purple-500' },
    { name: 'পুলিশ হেল্পলাইন', number: '১০০', type: 'নিরাপত্তা', icon: Shield, color: 'bg-blue-500' },
    { name: 'ফায়ার সার্ভিস', number: '১০১', type: 'দুর্যোগ', icon: Ambulance, color: 'bg-orange-500' },
    { name: 'অ্যাম্বুলেন্স সেবা', number: '১০২', type: 'চিকিৎসা', icon: Ambulance, color: 'bg-pink-500' }
  ];

  const elderServices = [
    {
      id: 1,
      title: 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ',
      description: 'বয়স্ক নাগরিকদের জন্য সহজ ভাষায় মোবাইল ও কম্পিউটার ব্যবহার',
      icon: UserCheck,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'স্বাস্থ্য পরামর্শ সেবা',
      description: 'অভিজ্ঞ ডাক্তারদের সাথে ভিডিও কল বা ফোনে পরামর্শ',
      icon: Stethoscope,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'ঘরোয়া সেবা সহায়তা',
      description: 'দৈনন্দিন কাজকর্মে সহায়তা ও পরিচর্যা সেবা',
      icon: Home,
      color: 'bg-orange-500'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 animate-pulse"
        title="SOS Emergency - বয়স্ক সহায়তা"
      >
        <AlertTriangle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">SOS Emergency</h2>
                <p className="text-red-100 font-bangla">জরুরি সহায়তা ও বয়স্ক সেবা</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: 'emergency', label: 'জরুরি যোগাযোগ', icon: Phone },
            { id: 'services', label: 'বয়স্ক সেবা', icon: Heart },
            { id: 'report', label: 'রিপোর্ট করুন', icon: AlertTriangle }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600 bg-white'
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
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Emergency Contacts Tab */}
          {activeTab === 'emergency' && (
            <div>
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 text-red-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold font-bangla">জরুরি অবস্থায় দ্রুত কল করুন</span>
                </div>
                <p className="text-sm text-red-600 font-bangla">
                  নিচের যেকোনো নম্বরে ক্লিক করে সরাসরি কল করতে পারবেন
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleEmergencyCall(contact.number)}
                      className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${contact.color} p-3 rounded-full text-white group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 font-bangla">{contact.name}</h3>
                          <div className="text-3xl font-bold text-red-600 mb-1">{contact.number}</div>
                          <div className="text-sm text-gray-500 font-bangla">{contact.type}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-blue-900 font-bangla mb-1">আপনার অবস্থান শেয়ার করুন</h4>
                    <p className="text-sm text-blue-700 font-bangla">
                      জরুরি সেবা দ্রুত পৌঁছাতে আপনার বর্তমান অবস্থান শেয়ার করা গুরুত্বপূর্ণ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Elder Services Tab */}
          {activeTab === 'services' && (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bangla">বয়স্ক নাগরিক সেবা</h3>
                <p className="text-gray-600 font-bangla">
                  আমাদের সম্মানিত বয়স্ক নাগরিকদের জন্য বিশেষ সেবা ও সহায়তা
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {elderServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${service.color} p-3 rounded-full text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 font-bangla">{service.title}</h4>
                          <p className="text-gray-600 text-sm font-bangla">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-purple-900 font-bangla mb-2">সেবা নিতে যোগাযোগ করুন</h4>
                    <p className="text-sm text-purple-700 font-bangla mb-3">
                      বয়স্ক সেবা হটলাইন: <span className="font-bold text-lg">১০৯</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-bangla">কল করুন</span>
                      </button>
                      <button className="bg-white text-purple-600 border-2 border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-bangla">চ্যাট করুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-bangla">সমস্যা রিপোর্ট করুন</h3>
                <p className="text-gray-600 font-bangla">
                  বয়স্ক নাগরিকদের সমস্যা বা জরুরি অবস্থা রিপোর্ট করুন
                </p>
              </div>
              <ReportSystem />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSButton;
