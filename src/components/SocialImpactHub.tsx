import React, { useState } from 'react';
import {
  TreePine, Users, Target, TrendingUp, MapPin,
  Calendar, MessageSquare, Heart, Award, Plus,
  Eye, ThumbsUp, Share2, Flag, CheckCircle, Shield
} from 'lucide-react';
import ReportSystem from './ReportSystem';

interface SocialImpactHubProps {
  user: any;
}

const SocialImpactHub: React.FC<SocialImpactHubProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const campaigns = [
    {
      id: 1,
      title: 'স্কুলে সাইবার বুলিং প্রতিরোধ',
      description: 'আমাদের স্থানীয় স্কুলগুলিতে সাইবার বুলিং সচেতনতা বৃদ্ধির জন্য একটি প্রচারণা।',
      creator: 'সারা খান',
      location: 'ঢাকা, বাংলাদেশ',
      supporters: 156,
      target: 500,
      progress: 31,
      category: 'নিরাপত্তা',
      status: 'সক্রিয়',
      daysLeft: 15,
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'গ্রামীণ এলাকায় মানসিক স্বাস্থ্য সেবা',
      description: 'গ্রামীণ এলাকার তরুণদের জন্য মানসিক স্বাস্থ্য সেবা পৌঁছে দেওয়ার উদ্যোগ।',
      creator: 'রাহুল আহমেদ',
      location: 'সিলেট, বাংলাদেশ',
      supporters: 89,
      target: 200,
      progress: 45,
      category: 'স্বাস্থ্য',
      status: 'সক্রিয়',
      daysLeft: 22,
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ',
      description: 'বয়স্ক নাগরিকদের জন্য ডিজিটাল সাক্ষরতা প্রশিক্ষণ কর্মসূচি।',
      creator: 'ফাতিমা বেগম',
      location: 'চট্টগ্রাম, বাংলাদেশ',
      supporters: 234,
      target: 300,
      progress: 78,
      category: 'শিক্ষা',
      status: 'সম্পন্ন',
      daysLeft: 0,
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const communityIssues = [
    {
      id: 1,
      title: 'স্থানীয় স্কুলে ইন্টারনেট সংযোগ সমস্যা',
      description: 'আমাদের এলাকার স্কুলে ইন্টারনেট সংযোগ খুবই দুর্বল। অনলাইন ক্লাসে সমস্যা হচ্ছে।',
      reporter: 'আনিস রহমান',
      location: 'কুমিল্লা',
      votes: 45,
      status: 'তদন্তাধীন',
      priority: 'উচ্চ',
      reportedDate: '2024-06-01'
    },
    {
      id: 2,
      title: 'যুব কেন্দ্রে কম্পিউটার প্রশিক্ষণের অভাব',
      description: 'আমাদের এলাকার যুব কেন্দ্রে কম্পিউটার প্রশিক্ষণের ব্যবস্থা নেই।',
      reporter: 'নাদিয়া খান',
      location: 'রাজশাহী',
      votes: 32,
      status: 'পর্যালোচনা',
      priority: 'মধ্যম',
      reportedDate: '2024-05-28'
    },
    {
      id: 3,
      title: 'মহিলাদের জন্য নিরাপদ পরিবহন',
      description: 'রাতের বেলা মহিলাদের জন্য নিরাপদ পরিবহনের ব্যবস্থা প্রয়োজন।',
      reporter: 'রুমানা আক্তার',
      location: 'ঢাকা',
      votes: 78,
      status: 'সমাধানাধীন',
      priority: 'উচ্চ',
      reportedDate: '2024-05-25'
    }
  ];

  const collaborations = [
    {
      id: 1,
      title: 'ঢাকা সিটি কর্পোরেশন',
      type: 'সরকারি',
      description: 'যুব উন্নয়ন ও ডিজিটাল সাক্ষরতা প্রকল্পে সহযোগিতা',
      projects: 5,
      impact: 'উচ্চ',
      status: 'সক্রিয়'
    },
    {
      id: 2,
      title: 'বাংলাদেশ যুব উন্নয়ন অধিদপ্তর',
      type: 'সরকারি',
      description: 'দক্ষতা উন্নয়ন ও কর্মসংস্থান সৃষ্টিতে অংশীদারিত্ব',
      projects: 8,
      impact: 'উচ্চ',
      status: 'সক্রিয়'
    },
    {
      id: 3,
      title: 'স্থানীয় এনজিও নেটওয়ার্ক',
      type: 'বেসরকারি',
      description: 'কমিউনিটি সেবা ও সচেতনতা বৃদ্ধিতে সহযোগিতা',
      projects: 12,
      impact: 'মধ্যম',
      status: 'সক্রিয়'
    }
  ];

  const impactMetrics = {
    totalCampaigns: 45,
    activeCampaigns: 23,
    completedCampaigns: 22,
    totalParticipants: 2340,
    issuesResolved: 18,
    governmentCollaborations: 8
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <TreePine className="w-10 h-10 text-green-600 mr-3" />
            সামাজিক প্রভাব হাব
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
            কমিউনিটির সাথে মিলে প্রচারণা চালান, স্থানীয় সমস্যার সমাধান করুন এবং সরকারের সাথে সহযোগিতা করুন
          </p>
        </div>

        {/* Impact Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{impactMetrics.totalCampaigns}</div>
            <div className="text-sm text-gray-600 font-bangla">মোট প্রচারণা</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{impactMetrics.activeCampaigns}</div>
            <div className="text-sm text-gray-600 font-bangla">সক্রিয় প্রচারণা</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{impactMetrics.totalParticipants}</div>
            <div className="text-sm text-gray-600 font-bangla">অংশগ্রহণকারী</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{impactMetrics.issuesResolved}</div>
            <div className="text-sm text-gray-600 font-bangla">সমাধান হয়েছে</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{impactMetrics.governmentCollaborations}</div>
            <div className="text-sm text-gray-600 font-bangla">সরকারি সহযোগিতা</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{user.impactScore}%</div>
            <div className="text-sm text-gray-600 font-bangla">আপনার প্রভাব</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          {[
            { id: 'campaigns', label: 'প্রচারণা', icon: Target },
            { id: 'issues', label: 'কমিউনিটি সমস্যা', icon: Flag },
            { id: 'collaborations', label: 'সহযোগিতা', icon: Users },
            { id: 'elder-support', label: 'বয়স্ক সহায়তা', icon: Heart },
            { id: 'create', label: 'নতুন তৈরি করুন', icon: Plus }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
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
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2">{campaign.title}</h3>
                          <p className="text-gray-600 font-bangla mb-2">{campaign.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {campaign.creator}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {campaign.location}
                            </span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bangla ${
                          campaign.status === 'সক্রিয়' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bangla">অগ্রগতি: {campaign.supporters}/{campaign.target} সমর্থক</span>
                          <span className="font-bangla">{campaign.progress}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            campaign.category === 'নিরাপত্তা' ? 'bg-red-100 text-red-800' :
                            campaign.category === 'স্বাস্থ্য' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {campaign.category}
                          </span>
                          {campaign.daysLeft > 0 && (
                            <span className="text-sm text-gray-500 font-bangla">
                              {campaign.daysLeft} দিন বাকি
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="font-bangla">সমর্থন করুন</span>
                          </button>
                          <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="font-bangla">শেয়ার</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="space-y-6">
              {communityIssues.map((issue) => (
                <div key={issue.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2">{issue.title}</h3>
                      <p className="text-gray-600 font-bangla mb-3">{issue.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {issue.reporter}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {issue.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(issue.reportedDate).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-bangla ${
                        issue.status === 'তদন্তাধীন' ? 'bg-yellow-100 text-yellow-800' :
                        issue.status === 'পর্যালোচনা' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.status}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        issue.priority === 'উচ্চ' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'মধ্যম' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.priority} অগ্রাধিকার
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="font-bangla">{issue.votes} ভোট</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-bangla">মন্তব্য</span>
                      </button>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-bangla">
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'collaborations' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborations.map((collab) => (
                <div key={collab.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      collab.type === 'সরকারি' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <Users className={`w-6 h-6 ${
                        collab.type === 'সরকারি' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 font-bangla">{collab.title}</h3>
                      <span className={`text-sm px-2 py-1 rounded ${
                        collab.type === 'সরকারি' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {collab.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm font-bangla mb-4">{collab.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-bangla">প্রকল্প:</span>
                      <span className="font-bold">{collab.projects}টি</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-bangla">প্রভাব:</span>
                      <span className={`font-bold ${
                        collab.impact === 'উচ্চ' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {collab.impact}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-bangla">অবস্থা:</span>
                      <span className="font-bold text-green-600">{collab.status}</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-bangla">
                    বিস্তারিত দেখুন
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'elder-support' && <ReportSystem />}

          {activeTab === 'create' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-bangla">
                নতুন প্রচারণা বা সমস্যা রিপোর্ট করুন
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 transition-colors cursor-pointer">
                  <Target className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 font-bangla mb-2">নতুন প্রচারণা</h4>
                  <p className="text-gray-600 font-bangla mb-4">
                    একটি সামাজিক প্রচারণা শুরু করুন এবং কমিউনিটির সাথে মিলে পরিবর্তন আনুন
                  </p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bangla">
                    প্রচারণা তৈরি করুন
                  </button>
                </div>

                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 transition-colors cursor-pointer">
                  <Flag className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 font-bangla mb-2">সমস্যা রিপোর্ট</h4>
                  <p className="text-gray-600 font-bangla mb-4">
                    আপনার এলাকার কোন সমস্যা রিপোর্ট করুন এবং সমাধানের জন্য কাজ করুন
                  </p>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla">
                    সমস্যা রিপোর্ট করুন
                  </button>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 font-bangla mb-4">কিভাবে শুরু করবেন?</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-blue-600">১</span>
                    </div>
                    <p className="text-sm font-bangla">আপনার লক্ষ্য নির্ধারণ করুন</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-green-600">২</span>
                    </div>
                    <p className="text-sm font-bangla">কমিউনিটির সাথে যুক্ত হন</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-blue-600">৩</span>
                    </div>
                    <p className="text-sm font-bangla">পরিবর্তন আনুন</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialImpactHub;