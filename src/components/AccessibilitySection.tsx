import React, { useState } from 'react';
import { 
  Eye, EyeOff, Volume2, VolumeX, Type, Contrast, 
  Users, MessageCircle, Headphones, Keyboard, 
  Accessibility, Heart, HandHeart 
} from 'lucide-react';

const AccessibilitySection: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  const applyHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  const applyLargeText = () => {
    setLargeText(!largeText);
    document.body.classList.toggle('large-text');
  };

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: 'Visual Accessibility',
      bangla: 'দৃশ্যমান সহায়তা',
      description: 'High contrast themes, large text options, and clear visual hierarchy for better readability.',
      features: ['High Contrast Mode', 'Large Text Option', 'Clear Navigation', 'Color-blind Friendly']
    },
    {
      icon: Volume2,
      title: 'Audio Accessibility',
      bangla: 'অডিও সহায়তা',
      description: 'Text-to-speech, voice commands, and audio feedback for comprehensive audio support.',
      features: ['Text-to-Speech', 'Voice Commands', 'Audio Feedback', 'Sound Notifications']
    },
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      bangla: 'কিবোর্ড নেভিগেশন',
      description: 'Full keyboard accessibility with tab navigation and keyboard shortcuts.',
      features: ['Tab Navigation', 'Keyboard Shortcuts', 'Focus Indicators', 'Skip Links']
    },
    {
      icon: HandHeart,
      title: 'Motor Accessibility',
      bangla: 'মোটর সহায়তা',
      description: 'Large clickable areas, reduced motion options, and alternative input methods.',
      features: ['Large Click Areas', 'Reduced Motion', 'Alternative Inputs', 'Gesture Support']
    }
  ];

  const assistiveTechnologies = [
    {
      title: 'Screen Reader Support',
      bangla: 'স্ক্রিন রিডার সাপোর্ট',
      description: 'Full compatibility with NVDA, JAWS, and VoiceOver screen readers.',
      icon: '🔊'
    },
    {
      title: 'Voice Recognition',
      bangla: 'ভয়েস রিকগনিশন',
      description: 'Supports Dragon NaturallySpeaking and built-in voice commands.',
      icon: '🎤'
    },
    {
      title: 'Switch Navigation',
      bangla: 'সুইচ নেভিগেশন',
      description: 'Compatible with external switches and alternative input devices.',
      icon: '🔲'
    },
    {
      title: 'Eye Tracking',
      bangla: 'আই ট্র্যাকিং',
      description: 'Integration with eye-tracking devices for hands-free navigation.',
      icon: '👁️'
    }
  ];

  const contributionOpportunities = [
    {
      title: 'Audio Content Creation',
      bangla: 'অডিও কন্টেন্ট তৈরি',
      description: 'Record educational content, guide narrations, and audio descriptions.',
      skills: ['Clear voice', 'Bengali fluency', 'Reading skills'],
      commitment: '2-3 hours/week',
      icon: '🎧'
    },
    {
      title: 'Braille Translation',
      bangla: 'ব্রেইল অনুবাদ',
      description: 'Convert important documents and educational materials to Braille format.',
      skills: ['Braille knowledge', 'Translation skills', 'Attention to detail'],
      commitment: '3-4 hours/week',
      icon: '⠃'
    },
    {
      title: 'Sign Language Interpretation',
      bangla: 'ইশারা ভাষা ব্যাখ্যা',
      description: 'Provide sign language interpretation for video content and live sessions.',
      skills: ['Sign language fluency', 'Video editing', 'Communication skills'],
      commitment: '4-5 hours/week',
      icon: '🤲'
    },
    {
      title: 'Accessibility Testing',
      bangla: 'অ্যাক্সেসিবিলিটি টেস্টিং',
      description: 'Test platform features with assistive technologies and provide feedback.',
      skills: ['Assistive technology use', 'Problem identification', 'Detail reporting'],
      commitment: '2-3 hours/week',
      icon: '🔍'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Accessibility className="w-10 h-10 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Accessibility & Inclusion</h2>
          </div>
          <p className="font-bangla text-xl text-indigo-600 mb-4">সবার জন্য প্রবেশগম্যতা</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ShikkhaBondhu is designed to be accessible to everyone, including students with disabilities. 
            Our platform supports various assistive technologies and provides multiple ways to interact and contribute.
          </p>
        </div>

        {/* Quick Accessibility Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Contrast className="w-6 h-6 mr-2 text-indigo-600" />
            Quick Accessibility Controls
            <span className="font-bangla text-sm text-gray-500 ml-2">(দ্রুত সহায়তা নিয়ন্ত্রণ)</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={applyHighContrast}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                highContrast 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Contrast className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">High Contrast</div>
                <div className="font-bangla text-sm text-gray-500">উচ্চ বৈপরীত্য</div>
              </div>
            </button>

            <button
              onClick={applyLargeText}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                largeText 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Type className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Large Text</div>
                <div className="font-bangla text-sm text-gray-500">বড় লেখা</div>
              </div>
            </button>

            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                voiceEnabled 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              <div className="text-left">
                <div className="font-medium">Voice Assistant</div>
                <div className="font-bangla text-sm text-gray-500">ভয়েস সহায়ক</div>
              </div>
            </button>

            <button
              onClick={() => setScreenReader(!screenReader)}
              className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                screenReader 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {screenReader ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
              <div className="text-left">
                <div className="font-medium">Screen Reader</div>
                <div className="font-bangla text-sm text-gray-500">স্ক্রিন রিডার</div>
              </div>
            </button>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Accessibility Features
            <span className="font-bangla text-lg text-gray-500 block">প্রবেশগম্যতার সুবিধা</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {accessibilityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <IconComponent className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h4>
                      <p className="font-bangla text-indigo-600 text-sm mb-3">{feature.bangla}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assistive Technology Support */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Assistive Technology Support
            <span className="font-bangla text-lg text-gray-500 block">সহায়ক প্রযুক্তি সাপোর্ট</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assistiveTechnologies.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{tech.title}</h4>
                <p className="font-bangla text-indigo-600 text-sm mb-3">{tech.bangla}</p>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Opportunities for Disabled Community */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-purple-600 mr-3" />
              Contribution Opportunities
            </h3>
            <p className="font-bangla text-xl text-purple-600 mb-4">অবদান রাখার সুযোগ</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe everyone has unique skills and perspectives to offer. Join our inclusive volunteer program 
              and help make ShikkhaBondhu more accessible for all students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contributionOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{opportunity.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{opportunity.title}</h4>
                    <p className="font-bangla text-purple-600 text-sm mb-3">{opportunity.bangla}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{opportunity.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Required Skills:</h5>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.skills.map((skill, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Time: {opportunity.commitment}</span>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Join Our Inclusive Community
            </button>
            <p className="font-bangla text-sm text-gray-600 mt-2">আমাদের অন্তর্ভুক্তিমূলক কমিউনিটিতে যোগ দিন</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessibilitySection;