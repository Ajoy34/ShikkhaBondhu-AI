import React, { useState } from 'react';
import {
  AlertCircle, Phone, Heart, MapPin, FileText,
  Clock, User, Home, Stethoscope,
  Shield, CheckCircle, Send
} from 'lucide-react';

interface EmergencyReport {
  reporter_name: string;
  reporter_contact: string;
  elder_name: string;
  elder_age: string;
  emergency_type: string;
  description: string;
  location: string;
  district: string;
  urgency: string;
}

const ElderEmergencyReport: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');
  
  const [form, setForm] = useState<EmergencyReport>({
    reporter_name: '',
    reporter_contact: '',
    elder_name: '',
    elder_age: '',
    emergency_type: '',
    description: '',
    location: '',
    district: '',
    urgency: 'medium'
  });

  const emergencyTypes = [
    { value: 'medical', label: 'চিকিৎসা জরুরি অবস্থা', icon: Stethoscope, color: 'text-red-600' },
    { value: 'safety', label: 'নিরাপত্তা সমস্যা', icon: Shield, color: 'text-orange-600' },
    { value: 'neglect', label: 'অবহেলা ও অযত্ন', icon: Heart, color: 'text-purple-600' },
    { value: 'financial', label: 'আর্থিক শোষণ', icon: AlertCircle, color: 'text-yellow-600' },
    { value: 'physical', label: 'শারীরিক নির্যাতন', icon: AlertCircle, color: 'text-red-600' },
    { value: 'mental', label: 'মানসিক নির্যাতন', icon: Heart, color: 'text-blue-600' },
    { value: 'home_care', label: 'ঘরোয়া সেবা প্রয়োজন', icon: Home, color: 'text-green-600' },
    { value: 'other', label: 'অন্যান্য', icon: FileText, color: 'text-gray-600' }
  ];

  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল',
    'রংপুর', 'ময়মনসিংহ', 'কুমিল্লা', 'নারায়ণগঞ্জ', 'গাজীপুর', 'যশোর'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate report number
    const reportNum = `ELDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setReportNumber(reportNum);
    setSubmitted(true);

    // In production, this would save to Supabase
    console.log('Elder Emergency Report:', { ...form, reportNumber: reportNum });

    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        reporter_name: '',
        reporter_contact: '',
        elder_name: '',
        elder_age: '',
        emergency_type: '',
        description: '',
        location: '',
        district: '',
        urgency: 'medium'
      });
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-3 font-bangla">
          রিপোর্ট সফলভাবে জমা হয়েছে
        </h3>
        <p className="text-green-700 mb-4 font-bangla">
          আপনার জরুরি রিপোর্টটি আমরা পেয়েছি। শীঘ্রই সংশ্লিষ্ট কর্তৃপক্ষ যোগাযোগ করবে।
        </p>
        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 font-bangla mb-1">রিপোর্ট নম্বর</p>
          <p className="text-2xl font-bold text-gray-900">{reportNumber}</p>
          <p className="text-xs text-gray-500 font-bangla mt-2">
            এই নম্বরটি সংরক্ষণ করুন ভবিষ্যতে খোঁজার জন্য
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800 font-bangla">
            <strong>জরুরি অবস্থায়:</strong> বয়স্ক সেবা হটলাইন <strong>১০৯</strong> অথবা জাতীয় জরুরি সেবা <strong>৯৯৯</strong> এ কল করুন
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-orange-500 rounded-full p-3">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-orange-900 mb-2 font-bangla">
              বয়স্ক নাগরিক জরুরি রিপোর্ট সিস্টেম
            </h3>
            <p className="text-orange-700 text-sm font-bangla">
              বয়স্ক নাগরিকদের জরুরি সমস্যা, নির্যাতন, অবহেলা বা যেকোনো সহায়তার প্রয়োজন রিপোর্ট করুন। 
              সকল তথ্য গোপনীয় রাখা হবে এবং দ্রুত ব্যবস্থা নেওয়া হবে।
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Hotlines */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h4 className="font-bold text-red-900 mb-3 font-bangla flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          জরুরি অবস্থায় সরাসরি কল করুন
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-600">১০৯</p>
            <p className="text-xs text-gray-600 font-bangla">বয়স্ক সেবা হটলাইন</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-600">৯৯৯</p>
            <p className="text-xs text-gray-600 font-bangla">জাতীয় জরুরি সেবা</p>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reporter Information */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            রিপোর্টকারীর তথ্য
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="reporter_name"
                value={form.reporter_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                যোগাযোগ নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="reporter_contact"
                value={form.reporter_contact}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="০১XXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Elder Information */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <Heart className="w-5 h-5 mr-2 text-purple-600" />
            বয়স্ক ব্যক্তির তথ্য
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                বয়স্ক ব্যক্তির নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="elder_name"
                value={form.elder_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                বয়স <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="elder_age"
                value={form.elder_age}
                onChange={handleInputChange}
                required
                min="60"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="বয়স লিখুন"
              />
            </div>
          </div>
        </div>

        {/* Emergency Type */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            জরুরি সমস্যার ধরন
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setForm({ ...form, emergency_type: type.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    form.emergency_type === type.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 bg-white'
                  }`}
                >
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${type.color}`} />
                  <p className={`text-xs font-bangla ${
                    form.emergency_type === type.value ? 'font-bold' : ''
                  }`}>
                    {type.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Urgency Level */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <Clock className="w-5 h-5 mr-2 text-red-600" />
            জরুরি মাত্রা
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low', label: 'সাধারণ', color: 'green' },
              { value: 'medium', label: 'মাঝারি', color: 'yellow' },
              { value: 'high', label: 'অতি জরুরি', color: 'red' }
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setForm({ ...form, urgency: level.value })}
                className={`p-3 rounded-lg border-2 font-bangla transition-all ${
                  form.urgency === level.value
                    ? `border-${level.color}-500 bg-${level.color}-50`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            বিস্তারিত বিবরণ
          </h4>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-bangla"
            placeholder="কী ঘটেছে তা বিস্তারিত লিখুন..."
          />
        </div>

        {/* Location */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 font-bangla flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            অবস্থান
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                জেলা <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={form.district}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-bangla"
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
                ঠিকানা <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="বিস্তারিত ঠিকানা"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold font-bangla hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>রিপোর্ট জমা দিন</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800 font-bangla">
            <Shield className="w-4 h-4 inline mr-1" />
            আপনার সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে এবং শুধুমাত্র প্রয়োজনীয় কর্তৃপক্ষের সাথে শেয়ার করা হবে।
          </p>
        </div>
      </form>
    </div>
  );
};

export default ElderEmergencyReport;
