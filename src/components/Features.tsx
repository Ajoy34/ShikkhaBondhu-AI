import React from 'react';
import { Shield, Heart, BookOpen, Brain, MessageSquare, Users, Scale, AlertTriangle } from 'lucide-react';

interface FeaturesProps {
  setSelectedChatbot: (bot: string) => void;
  setIsChatOpen: (open: boolean) => void;
}

const Features: React.FC<FeaturesProps> = ({ setSelectedChatbot, setIsChatOpen }) => {
  const features = [
    {
      id: 'law',
      icon: Scale,
      title: 'Legal Rights Assistant',
      bangla: 'আইনি অধিকার সহায়ক',
      description: 'Get instant information about Bangladeshi laws regarding cyberbullying, harassment, and student rights.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      features: ['Digital Security Act 2018', 'Student Protection Laws', 'Harassment Reporting', 'Legal Procedures']
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Wellness Counselor',
      bangla: 'স্বাস্থ্য ও মানসিক সাহায্যকারী',
      description: 'Confidential support for physical, mental, and reproductive health questions in a judgment-free space.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      features: ['Mental Health Support', 'Reproductive Health', 'Stress Management', 'Crisis Intervention']
    },
    {
      id: 'safety',
      icon: Shield,
      title: 'Safety & Reporting Hub',
      bangla: 'নিরাপত্তা ও রিপোর্টিং কেন্দ্র',
      description: 'Secure and anonymous reporting system for bullying, harassment, and other safety concerns.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      features: ['Anonymous Reporting', 'Incident Documentation', 'Safety Planning', 'Emergency Contacts']
    },
    {
      id: 'skills',
      icon: Brain,
      title: 'Skills Development Coach',
      bangla: 'দক্ষতা উন্নয়ন প্রশিক্ষক',
      description: 'Access practical courses and resources to build real-world skills for career advancement.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      features: ['Technical Skills', 'Soft Skills', 'Career Guidance', 'Certification Paths']
    },
    {
      id: 'postcare',
      icon: MessageSquare,
      title: 'Post-Care Support Bot',
      bangla: 'পরবর্তী যত্ন সহায়ক',
      description: 'Ongoing support and follow-up care after reporting incidents or seeking help.',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      features: ['Follow-up Support', 'Progress Tracking', 'Resource Connections', 'Healing Journey']
    },
    {
      id: 'community',
      icon: Users,
      title: 'Community Connector',
      bangla: 'কমিউনিটি সংযোগকারী',
      description: 'Connect with peer support groups, mentors, and community resources.',
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      features: ['Peer Support', 'Mentorship Programs', 'Support Groups', 'Community Events']
    },
    {
      id: 'crisis',
      icon: AlertTriangle,
      title: 'Crisis Intervention',
      bangla: 'জরুরি সহায়তা',
      description: '24/7 immediate support for urgent situations and mental health crises.',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      features: ['24/7 Support', 'Crisis Hotlines', 'Emergency Protocols', 'Immediate Response']
    },
    {
      id: 'academic',
      icon: BookOpen,
      title: 'Academic Support',
      bangla: 'একাডেমিক সহায়তা',
      description: 'Get help with studies, exam preparation, and educational resources.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      features: ['Study Help', 'Exam Preparation', 'Educational Resources', 'Learning Strategies']
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedChatbot(featureId);
    setIsChatOpen(true);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Specialized AI Assistants
          </h2>
          <p className="font-bangla text-xl text-indigo-600 mb-4">বিশেষজ্ঞ কৃত্রিম বুদ্ধিমত্তা সহায়ক</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each AI assistant is specifically trained to provide expert guidance in their domain, 
            ensuring you get the most accurate and helpful support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className={`${feature.bgColor} p-6 text-center`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h3>
                  <p className="font-bangla text-sm text-gray-600">{feature.bangla}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleFeatureClick(feature.id)}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our AI Assistants?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-indigo-600">98%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">&lt;5s</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-600">Available Always</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;