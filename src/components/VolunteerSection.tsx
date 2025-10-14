import React, { useState } from 'react';
import { 
  Users, Heart, BookOpen, MessageCircle, Shield, 
  Brain, Star, Calendar, MapPin, Clock, Award,
  CheckCircle, UserCheck, Target, Zap 
} from 'lucide-react';

const VolunteerSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const volunteerRoles = [
    {
      id: 'peer-mentor',
      title: 'Peer Mentor',
      bangla: 'পিয়ার মেন্টর',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'Guide and support fellow students through their academic and personal challenges.',
      responsibilities: [
        'Provide one-on-one mentoring sessions',
        'Share academic and life experiences',
        'Offer emotional support and guidance',
        'Help with goal setting and planning'
      ],
      requirements: [
        'Currently enrolled student or recent graduate',
        'Strong communication skills',
        'Empathetic and patient personality',
        'Available 3-4 hours per week'
      ],
      impact: '50+ students mentored monthly'
    },
    {
      id: 'content-creator',
      title: 'Content Creator',
      bangla: 'কন্টেন্ট তৈরিকারী',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      description: 'Create educational content, guides, and resources for the community.',
      responsibilities: [
        'Write educational articles and guides',
        'Create video tutorials and explanations',
        'Develop infographics and visual content',
        'Translate content between Bengali and English'
      ],
      requirements: [
        'Strong writing or video creation skills',
        'Knowledge in specific subject areas',
        'Creative and detail-oriented',
        'Available 4-5 hours per week'
      ],
      impact: '100+ pieces of content created'
    },
    {
      id: 'community-moderator',
      title: 'Community Moderator',
      bangla: 'কমিউনিটি মডারেটর',
      icon: Shield,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      description: 'Maintain a safe, supportive, and inclusive community environment.',
      responsibilities: [
        'Monitor community discussions and interactions',
        'Enforce community guidelines and policies',
        'Facilitate healthy discussions and debates',
        'Support conflict resolution when needed'
      ],
      requirements: [
        'Strong sense of fairness and judgment',
        'Excellent communication skills',
        'Patient and diplomatic approach',
        'Available 5-6 hours per week'
      ],
      impact: '5000+ community members supported'
    },
    {
      id: 'crisis-support',
      title: 'Crisis Support Volunteer',
      bangla: 'সংকট সহায়তা স্বেচ্ছাসেবক',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      description: 'Provide immediate support to students in crisis situations.',
      responsibilities: [
        'Respond to crisis situations with empathy',
        'Provide emotional support and active listening',
        'Connect students with professional resources',
        'Follow up on crisis interventions'
      ],
      requirements: [
        'Mental health training or certification',
        'Strong emotional resilience',
        'Ability to remain calm under pressure',
        'Available for emergency response'
      ],
      impact: '200+ crisis interventions handled'
    },
    {
      id: 'skills-trainer',
      title: 'Skills Development Trainer',
      bangla: 'দক্ষতা উন্নয়ন প্রশিক্ষক',
      icon: Brain,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      description: 'Teach practical skills and conduct workshops for students.',
      responsibilities: [
        'Conduct online and offline workshops',
        'Develop curriculum for skill-based courses',
        'Provide individual coaching sessions',
        'Create assessment and certification materials'
      ],
      requirements: [
        'Expertise in specific technical or soft skills',
        'Teaching or training experience',
        'Ability to create engaging content',
        'Available for scheduled sessions'
      ],
      impact: '1000+ students trained'
    },
    {
      id: 'tech-support',
      title: 'Technical Support Volunteer',
      bangla: 'কারিগরি সহায়তা স্বেচ্ছাসেবক',
      icon: Zap,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      description: 'Help maintain and improve the platform\'s technical infrastructure.',
      responsibilities: [
        'Assist with platform development and testing',
        'Help troubleshoot technical issues',
        'Contribute to accessibility improvements',
        'Support digital literacy initiatives'
      ],
      requirements: [
        'Technical background in web development',
        'Experience with accessibility standards',
        'Problem-solving skills',
        'Available for flexible hours'
      ],
      impact: '99.9% platform uptime maintained'
    }
  ];

  const volunteerBenefits = [
    {
      icon: Award,
      title: 'Recognition & Certificates',
      bangla: 'স্বীকৃতি ও সার্টিফিকেট',
      description: 'Receive certificates and letters of recommendation for your service.'
    },
    {
      icon: BookOpen,
      title: 'Skill Development',
      bangla: 'দক্ষতা উন্নয়ন',
      description: 'Gain valuable experience and develop leadership skills.'
    },
    {
      icon: Users,
      title: 'Community Network',
      bangla: 'কমিউনিটি নেটওয়ার্ক',
      description: 'Connect with like-minded individuals and build lasting relationships.'
    },
    {
      icon: Target,
      title: 'Career Advancement',
      bangla: 'ক্যারিয়ার উন্নতি',
      description: 'Enhance your resume and gain experience relevant to your career goals.'
    }
  ];

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
    setShowApplicationForm(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-10 h-10 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Become a Volunteer</h2>
          </div>
          <p className="font-bangla text-xl text-red-500 mb-4">স্বেচ্ছাসেবক হয়ে যোগ দিন</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our mission to support Bangladeshi students. Your time, skills, and compassion can make a 
            real difference in someone's life. Together, we're building a stronger, more supportive community.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '500+', label: 'Active Volunteers', bangla: 'সক্রিয় স্বেচ্ছাসেবক' },
            { number: '10K+', label: 'Students Helped', bangla: 'ছাত্র সাহায্য' },
            { number: '2000+', label: 'Hours Contributed', bangla: 'ঘন্টা অবদান' },
            { number: '95%', label: 'Satisfaction Rate', bangla: 'সন্তুষ্টির হার' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-md">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500 font-bangla">{stat.bangla}</div>
            </div>
          ))}
        </div>

        {/* Volunteer Roles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Volunteer Opportunities
            <span className="font-bangla text-lg text-gray-500 block">স্বেচ্ছাসেবার সুযোগ</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerRoles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div key={role.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  {/* Header */}
                  <div className={`${role.bgColor} p-6 text-center`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${role.color} shadow-lg mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{role.title}</h4>
                    <p className="font-bangla text-sm text-gray-600">{role.bangla}</p>
                    <div className="mt-3 text-sm text-gray-500">{role.impact}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{role.description}</p>
                    
                    {/* Key Responsibilities */}
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-800 mb-2">Key Responsibilities:</h5>
                      <ul className="space-y-1">
                        {role.responsibilities.slice(0, 2).map((responsibility, index) => (
                          <li key={index} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-800 mb-2">Requirements:</h5>
                      <div className="flex flex-wrap gap-1">
                        {role.requirements.slice(0, 2).map((req, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      onClick={() => handleRoleSelection(role.id)}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${role.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Volunteer Benefits
            <span className="font-bangla text-lg text-gray-500 block">স্বেচ্ছাসেবার সুবিধা</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center border border-gray-100">
                  <div className="bg-indigo-100 p-3 rounded-xl inline-flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="font-bangla text-indigo-600 text-sm mb-3">{benefit.bangla}</p>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="font-bangla text-xl mb-6">পরিবর্তন আনতে প্রস্তুত?</p>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Your contribution, no matter how small, can create a ripple effect of positive change. 
            Join thousands of volunteers who are already making a difference in students' lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Application
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Volunteer Application</h3>
                  <button 
                    onClick={() => setShowApplicationForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="font-bangla text-indigo-600 text-sm">স্বেচ্ছাসেবক আবেদন</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select a role...</option>
                    {volunteerRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Hours per Week</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select hours...</option>
                    <option value="1-2">1-2 hours</option>
                    <option value="3-5">3-5 hours</option>
                    <option value="6-10">6-10 hours</option>
                    <option value="10+">More than 10 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to volunteer?</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us about your motivation..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skills or Experience</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your relevant skills..."></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and conditions and commit to the volunteer responsibilities
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VolunteerSection;