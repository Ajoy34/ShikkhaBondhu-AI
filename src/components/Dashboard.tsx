import React, { useState } from 'react';
import { Users, Share2, MessageCircle, ThumbsUp, Trophy, Plus, MapPin, Globe, DollarSign, Clock, User } from 'lucide-react';
import { awardPoints, PointAction } from '../utils/pointsSystem';
import PointsToast from './PointsToast';

interface DashboardProps {
  user: any;
  setIsChatOpen: (open: boolean) => void;
  setSelectedChatbot: (bot: string) => void;
  setActiveSection: (section: string) => void;
  updateUserPoints?: (points: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setIsChatOpen, setSelectedChatbot, setActiveSection, updateUserPoints }) => {
  const [filterType, setFilterType] = useState<'all' | 'local' | 'global'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pointsToast, setPointsToast] = useState<{ points: number; action: PointAction } | null>(null);
  const [newCampaigns, setNewCampaigns] = useState<any[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCampaignIndex, setSelectedCampaignIndex] = useState<number | null>(null);
  const [likedCampaigns, setLikedCampaigns] = useState<Set<number>>(new Set());
  const [campaignLikes, setCampaignLikes] = useState<{[key: number]: number}>({});
  const [campaignComments, setCampaignComments] = useState<{[key: number]: number}>({});
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState<number>(500);

  // Helper function to award points and show toast
  const handlePointsAward = (action: PointAction) => {
    const success = awardPoints(user.email || 'user', action, (points, awardedAction) => {
      setPointsToast({ points, action: awardedAction });
      if (updateUserPoints) {
        updateUserPoints(points);
      }
    });
    return success;
  };

  // Handle campaign creation
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCampaign = {
      title: formData.get('title') as string,
      titleBn: formData.get('titleBn') as string,
      organizer: user.name || 'Anonymous',
      organizerImage: '👤',
      participants: 1,
      raised: 0,
      goal: parseInt(formData.get('goal') as string) || 50000,
      daysLeft: parseInt(formData.get('duration') as string) || 30,
      duration: `${formData.get('duration')} days campaign`,
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
      type: formData.get('category') as string || 'Community',
      scope: formData.get('scope') as 'local' | 'global' || 'local',
      location: formData.get('location') as string || 'Bangladesh',
      isCrowdfunding: formData.get('type') === 'crowdfunding',
      likes: 0,
      comments: 0,
      shares: 0,
      postedTime: 'Just now'
    };
    
    // Add to new campaigns
    setNewCampaigns([newCampaign, ...newCampaigns]);
    
    // Award points for creating campaign
    handlePointsAward('CREATE_CAMPAIGN');
    setShowCreateModal(false);
    
    // Show success message
    alert('Campaign created successfully! 🎉');
  };

  // Handle like action
  const handleLike = (campaignIndex: number) => {
    // Check if already liked
    if (likedCampaigns.has(campaignIndex)) {
      // Unlike
      setLikedCampaigns(prev => {
        const newSet = new Set(prev);
        newSet.delete(campaignIndex);
        return newSet;
      });
      setCampaignLikes(prev => {
        const newLikes = { ...prev };
        newLikes[campaignIndex] = (prev[campaignIndex] || 0) - 1;
        return newLikes;
      });
    } else {
      // Like
      const success = handlePointsAward('LIKE_CAMPAIGN');
      if (!success) {
        alert('You\'ve reached your daily limit for likes!');
        return;
      }
      setLikedCampaigns(prev => {
        const newSet = new Set(prev);
        newSet.add(campaignIndex);
        return newSet;
      });
      setCampaignLikes(prev => {
        const newLikes = { ...prev };
        newLikes[campaignIndex] = (prev[campaignIndex] || 0) + 1;
        return newLikes;
      });
    }
  };

  // Handle comment action
  const handleComment = (campaignIndex: number) => {
    const success = handlePointsAward('COMMENT_ON_CAMPAIGN');
    if (!success) {
      alert('You\'ve reached your daily limit for comments!');
      return;
    }
    setSelectedCampaignIndex(campaignIndex);
    setShowCommentModal(true);
  };

  // Submit comment
  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const commentText = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
    
    if (commentText.trim() && selectedCampaignIndex !== null) {
      // Update comment count
      setCampaignComments(prev => {
        const newComments = { ...prev };
        newComments[selectedCampaignIndex] = (prev[selectedCampaignIndex] || 0) + 1;
        return newComments;
      });
      
      // Show success message
      alert('Comment posted successfully! 💬');
      setShowCommentModal(false);
      form.reset();
    }
  };

  // Handle share action
  const handleShare = (campaign: any) => {
    const success = handlePointsAward('SHARE_CAMPAIGN');
    if (!success) {
      alert('You\'ve reached your daily limit for shares!');
      return;
    }
    
    // Create shareable URL
    const campaignUrl = `${window.location.origin}/campaign/${encodeURIComponent(campaign.title)}`;
    setShareUrl(campaignUrl);
    setShowShareModal(true);
  };

  // Copy share link
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard! You can now share it anywhere.');
  };

  // Share to social media
  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(`Check out this campaign: ${shareUrl}`);
    let url = '';
    
    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${text}`;
        break;
      case 'messenger':
        url = `https://www.facebook.com/dialog/send?link=${shareUrl}&app_id=YOUR_APP_ID`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // Handle donate action
  const handleDonate = (campaign: any, campaignIndex: number) => {
    setSelectedCampaign(campaign);
    setSelectedCampaignIndex(campaignIndex);
    setShowDonateModal(true);
  };

  // Submit donation
  const submitDonation = (paymentMethod: string) => {
    if (selectedCampaignIndex !== null) {
      // Award points for donation
      handlePointsAward('DONATE_TO_CAMPAIGN');
      
      // Show success message
      alert(`🎉 Donation successful via ${paymentMethod}!\n\nAmount: ৳${donationAmount.toLocaleString()}\nThank you for your contribution!`);
      
      setShowDonateModal(false);
      setDonationAmount(500);
    }
  };

  const communityPrograms = [
    {
      title: "Clean Water Initiative - Dhaka",
      titleBn: "বিশুদ্ধ পানি উদ্যোগ - ঢাকা",
      organizer: "Community Welfare Bangladesh",
      organizerImage: "👤",
      participants: 345,
      raised: 85000,
      goal: 100000,
      daysLeft: 12,
      duration: "30 days campaign",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
      type: "Environment",
      scope: "local" as const,
      location: "Dhaka, Bangladesh",
      isCrowdfunding: true,
      likes: 1234,
      comments: 89,
      shares: 156,
      postedTime: "3 hours ago"
    },
    {
      title: "Free Education for Street Children",
      titleBn: "পথশিশুদের জন্য বিনামূল্যে শিক্ষা",
      organizer: "Shikkha Foundation International",
      organizerImage: "👤",
      participants: 567,
      raised: 150000,
      goal: 200000,
      daysLeft: 8,
      duration: "45 days campaign",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      type: "Education",
      scope: "global" as const,
      location: "Bangladesh & India",
      isCrowdfunding: true,
      likes: 2456,
      comments: 234,
      shares: 567,
      postedTime: "5 hours ago"
    },
    {
      title: "Elderly Care Support Program",
      titleBn: "বয়স্ক সেবা সহায়তা কর্মসূচি",
      organizer: "Care Bangladesh",
      organizerImage: "👤",
      participants: 234,
      raised: 45000,
      goal: 75000,
      daysLeft: 15,
      duration: "60 days campaign",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80",
      type: "Healthcare",
      scope: "local" as const,
      location: "Chittagong, Bangladesh",
      isCrowdfunding: true,
      likes: 892,
      comments: 67,
      shares: 124,
      postedTime: "1 day ago"
    },
    {
      title: "Digital Skills Training for Youth",
      titleBn: "যুবকদের জন্য ডিজিটাল দক্ষতা প্রশিক্ষণ",
      organizer: "Tech4All Global",
      organizerImage: "👤",
      participants: 890,
      raised: 0,
      goal: 0,
      daysLeft: 20,
      duration: "90 days campaign",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      type: "Education",
      scope: "global" as const,
      location: "Online - Worldwide",
      isCrowdfunding: false,
      likes: 3421,
      comments: 456,
      shares: 892,
      postedTime: "2 days ago"
    }
  ];

  // Combine new campaigns with existing ones
  const allPrograms = [...newCampaigns, ...communityPrograms];
  
  const filteredPrograms = allPrograms.filter(program => {
    if (filterType === 'all') return true;
    return program.scope === filterType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* MAIN FEED - Center Content */}
          <div className="lg:col-span-8 space-y-6">

            {/* Running Community Programs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Active Community Programs
                  <span className="ml-2 font-bangla text-lg text-gray-600">কমিউনিটি প্রোগ্রাম</span>
                </h3>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Campaign</span>
                </button>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'all' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>All Campaigns</span>
                </button>
                <button
                  onClick={() => setFilterType('local')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'local' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Local</span>
                </button>
                <button
                  onClick={() => setFilterType('global')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    filterType === 'global' 
                      ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Global</span>
                </button>
              </div>

              <div className="space-y-6">
                {filteredPrograms.map((program, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    {/* Post Header - Like Facebook */}
                    <div className="p-4 bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-md">
                            {program.organizerImage}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                              <span>{program.organizer}</span>
                              {program.scope === 'global' ? (
                                <Globe className="w-4 h-4 text-green-600" />
                              ) : (
                                <MapPin className="w-4 h-4 text-blue-600" />
                              )}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{program.postedTime}</span>
                              <span>•</span>
                              <MapPin className="w-3 h-3" />
                              <span>{program.location}</span>
                              <span>•</span>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{program.type}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          program.isCrowdfunding 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {program.isCrowdfunding ? '💰 Crowdfunding' : '🤝 Volunteer'}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-3">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{program.title}</h4>
                      <p className="text-sm text-gray-600 font-bangla mb-2">{program.titleBn}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{program.participants} participants</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="w-full bg-gray-100">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f3f4f6" width="800" height="400"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECampaign Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    {/* Crowdfunding Progress (if applicable) */}
                    {program.isCrowdfunding && (
                      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-bold text-gray-900">৳{program.raised.toLocaleString()}</span>
                            <span className="text-gray-600">raised of ৳{program.goal.toLocaleString()}</span>
                          </div>
                          <span className="font-bold text-green-600">{Math.round((program.raised / program.goal) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((program.raised / program.goal) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{program.daysLeft} days left</span>
                          </span>
                          <span className="text-gray-600">{program.participants} backers</span>
                        </div>
                      </div>
                    )}

                    {/* Post Stats - Like Facebook */}
                    <div className="px-4 py-2 border-t border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <ThumbsUp className="w-3 h-3 text-white" />
                            </div>
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                              ❤️
                            </div>
                          </div>
                          <span className="ml-1">{(program.likes + (campaignLikes[idx] || 0)).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span>{program.comments + (campaignComments[idx] || 0)} comments</span>
                          <span>{program.shares} shares</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Like Facebook */}
                    <div className="px-4 py-2 bg-white flex items-center justify-around">
                      <button 
                        onClick={() => handleLike(idx)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center ${
                          likedCampaigns.has(idx) 
                            ? 'bg-blue-50 text-blue-600 font-bold' 
                            : 'hover:bg-gray-100 text-gray-700 font-semibold'
                        }`}
                      >
                        <ThumbsUp className={`w-5 h-5 ${likedCampaigns.has(idx) ? 'text-blue-600 fill-blue-600' : 'text-gray-600'}`} />
                        <span>{likedCampaigns.has(idx) ? 'Liked' : 'Like'}</span>
                      </button>
                      <button 
                        onClick={() => handleComment(idx)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
                      >
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Comment</span>
                      </button>
                      <button 
                        onClick={() => handleShare(program)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700 font-semibold">Share</span>
                      </button>
                      {program.isCrowdfunding && (
                        <button 
                          onClick={() => handleDonate(program, idx)}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg ml-2"
                        >
                          <DollarSign className="w-5 h-5" />
                          <span>Donate</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Post Example */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Shikkha Bondhu Official</h4>
                  <p className="text-xs text-gray-500">2 hours ago • Public</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                🎉 Great news! We've just launched 50+ new courses in AI, Machine Learning, and Data Science. 
                <span className="font-bangla block mt-2">আমরা নতুন ৫০+ কোর্স চালু করেছি AI, মেশিন লার্নিং এবং ডেটা সায়েন্সে!</span>
              </p>

              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 mb-4">
                <h5 className="text-xl font-bold text-indigo-900 mb-2">🚀 Limited Time Offer!</h5>
                <p className="text-indigo-700">Get 30% off on all premium courses. Use code: <span className="font-mono bg-white px-2 py-1 rounded">LEARN30</span></p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-6 text-gray-600">
                  <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-semibold">234</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">45</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Share</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR - Suggestions & Trending */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="font-bangla">লিডারবোর্ড</span>
                </h4>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Arif Rahman", points: 2850, rank: 1 },
                  { name: user.name, points: user.points, rank: 8, isYou: true },
                  { name: "Fatima Noor", points: 1180, rank: 9 },
                  { name: "Karim Ahmed", points: 980, rank: 10 }
                ].map((leader, idx) => {
                  // Determine achievement title based on points
                  const getAchievementTitle = (points: number) => {
                    if (points >= 2500) return { title: "Legend", titleBn: "কিংবদন্তি", color: "from-purple-500 to-pink-500", textColor: "text-purple-700", icon: "👑" };
                    if (points >= 2000) return { title: "Impact Leader", titleBn: "প্রভাব নেতা", color: "from-red-500 to-orange-500", textColor: "text-red-700", icon: "🌟" };
                    if (points >= 1500) return { title: "Community Hero", titleBn: "কমিউনিটি হিরো", color: "from-orange-500 to-yellow-500", textColor: "text-orange-700", icon: "🦸" };
                    if (points >= 1000) return { title: "Change Maker", titleBn: "পরিবর্তনকারী", color: "from-green-500 to-emerald-500", textColor: "text-green-700", icon: "💪" };
                    if (points >= 500) return { title: "Helper", titleBn: "সহায়ক", color: "from-blue-500 to-indigo-500", textColor: "text-blue-700", icon: "🤝" };
                    return { title: "Beginner", titleBn: "শিক্ষানবিস", color: "from-gray-400 to-gray-500", textColor: "text-gray-700", icon: "🌱" };
                  };

                  const achievement = getAchievementTitle(leader.points);

                  return (
                    <div key={idx} className={`relative overflow-hidden rounded-xl ${leader.isYou ? 'ring-2 ring-indigo-400 shadow-lg' : 'border border-gray-200'}`}>
                      {/* Achievement Badge Background */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full`}></div>
                      
                      <div className="relative p-3">
                        <div className="flex items-center space-x-3">
                          {/* Rank Badge */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                            leader.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                            leader.rank <= 3 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                            leader.isYou ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            #{leader.rank}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            {/* Name */}
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-bold text-gray-900 font-bangla truncate">
                                {leader.name}
                              </p>
                              {leader.isYou && (
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">You</span>
                              )}
                            </div>
                            
                            {/* Achievement Title */}
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-base">{achievement.icon}</span>
                              <div className="flex flex-col">
                                <span className={`text-xs font-bold ${achievement.textColor}`}>
                                  {achievement.title}
                                </span>
                                <span className="text-xs text-gray-500 font-bangla">
                                  {achievement.titleBn}
                                </span>
                              </div>
                            </div>
                            
                            {/* Points Progress */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-gray-900">{leader.points} points</span>
                              {leader.points < 2500 && (
                                <>
                                  <span className="text-xs text-gray-400">→</span>
                                  <span className="text-xs text-gray-500">
                                    {leader.points >= 2000 ? '2500' :
                                     leader.points >= 1500 ? '2000' :
                                     leader.points >= 1000 ? '1500' :
                                     leader.points >= 500 ? '1000' : '500'} for next title
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Progress Bar for You */}
                            {leader.isYou && leader.points < 2500 && (
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className={`bg-gradient-to-r ${achievement.color} h-1.5 rounded-full transition-all duration-500`}
                                    style={{ 
                                      width: `${
                                        leader.points >= 2000 ? ((leader.points - 2000) / 500) * 100 :
                                        leader.points >= 1500 ? ((leader.points - 1500) / 500) * 100 :
                                        leader.points >= 1000 ? ((leader.points - 1000) / 500) * 100 :
                                        leader.points >= 500 ? ((leader.points - 500) / 500) * 100 :
                                        (leader.points / 500) * 100
                                      }%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Motivational Message for User */}
              {user.points < 2500 && (
                <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <p className="text-xs font-bold text-indigo-900 mb-1">💡 Keep Going!</p>
                  <p className="text-xs text-gray-700 font-bangla">
                    {user.points >= 2000 ? `আরও ${2500 - user.points} পয়েন্ট পেয়ে Legend হয়ে যান!` :
                     user.points >= 1500 ? `আরও ${2000 - user.points} পয়েন্ট পেয়ে Impact Leader হয়ে যান!` :
                     user.points >= 1000 ? `আরও ${1500 - user.points} পয়েন্ট পেয়ে Community Hero হয়ে যান!` :
                     user.points >= 500 ? `আরও ${1000 - user.points} পয়েন্ট পেয়ে Change Maker হয়ে যান!` :
                     `আরও ${500 - user.points} পয়েন্ট পেয়ে Helper হয়ে যান!`}
                  </p>
                </div>
              )}
            </div>

            {/* Community Forums */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 font-bangla">কমিউনিটি ফোরাম</h4>
              <div className="space-y-3">
                {[
                  { 
                    name: "Bangladesh Police Forum", 
                    nameBn: "বাংলাদেশ পুলিশ ফোরাম",
                    members: "12.5K members",
                    posts: "245 posts today",
                    icon: "🚓",
                    color: "from-red-400 to-red-600",
                    link: "https://www.facebook.com/BangladeshPoliceOfficialPage"
                  },
                  { 
                    name: "UNDP Bangladesh", 
                    nameBn: "ইউএনডিপি বাংলাদেশ",
                    members: "8.3K members",
                    posts: "189 posts today",
                    icon: "🎓",
                    color: "from-blue-400 to-blue-600",
                    link: "https://www.facebook.com/UNDPBD"
                  },
                  { 
                    name: "CPCCIDB Police", 
                    nameBn: "সিপিসিসিআইডিবি পুলিশ",
                    members: "15.7K members",
                    posts: "312 posts today",
                    icon: "🌍",
                    color: "from-green-400 to-green-600",
                    link: "https://www.facebook.com/cpccidbdpolice"
                  }
                ].map((forum, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 bg-gradient-to-br ${forum.color} rounded-full flex items-center justify-center text-2xl shadow-md`}>
                      {forum.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{forum.name}</p>
                      <p className="text-xs font-bangla text-gray-600">{forum.nameBn}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">👥 {forum.members}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-xs text-green-600">📱 {forum.posts}</p>
                      </div>
                    </div>
                    <a 
                      href={forum.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-600 transition-colors"
                    >
                      Join
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 font-bangla">আসন্ন ইভেন্ট</h4>
              <div className="space-y-3">
                {[
                  { title: "AI Workshop", date: "Nov 5", time: "10:00 AM" },
                  { title: "Community Meetup", date: "Nov 8", time: "2:00 PM" },
                  { title: "Coding Contest", date: "Nov 12", time: "9:00 AM" }
                ].map((event, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-500 pl-3 py-2 bg-indigo-50 rounded-r-lg">
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.date} • {event.time}</p>
                    <button className="text-xs text-indigo-600 font-semibold mt-1">Interested →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Your Experience */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-4 border-2 border-pink-200">
              <h4 className="font-bold text-gray-900 mb-2 font-bangla">আপনার অভিজ্ঞতা শেয়ার করুন</h4>
              <p className="text-xs text-gray-600 mb-3 font-bangla">সোশ্যাল মিডিয়ায় শেয়ার করুন এবং পয়েন্ট অর্জন করুন</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700">
                  📘 Facebook
                </button>
                <button className="flex-1 bg-sky-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-sky-600">
                  🐦 Twitter
                </button>
              </div>
              <button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-pink-600 hover:to-purple-600">
                📷 Instagram
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Create New Campaign</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-green-100 mt-2 font-bangla">নতুন ক্যাম্পেইন তৈরি করুন</p>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-6 space-y-6">
              {/* Campaign Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Campaign Type *</label>
                <input type="hidden" name="type" value="crowdfunding" />
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center space-x-3 p-4 border-2 border-yellow-300 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-all">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Crowdfunding</div>
                      <div className="text-xs text-gray-600">Raise money</div>
                    </div>
                  </button>
                  <button type="button" className="flex items-center space-x-3 p-4 border-2 border-blue-300 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Volunteer</div>
                      <div className="text-xs text-gray-600">Get helpers</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campaign Scope */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Campaign Scope *</label>
                <input type="hidden" name="scope" value="local" />
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center space-x-3 p-4 border-2 border-blue-300 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Local</div>
                      <div className="text-xs text-gray-600">Your area only</div>
                    </div>
                  </button>
                  <button type="button" className="flex items-center space-x-3 p-4 border-2 border-green-300 bg-green-50 rounded-xl hover:bg-green-100 transition-all">
                    <Globe className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Global</div>
                      <div className="text-xs text-gray-600">Worldwide reach</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campaign Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Clean Water Initiative"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  required
                />
              </div>

              {/* Bengali Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bengali Title (বাংলা শিরোনাম) *</label>
                <input
                  type="text"
                  name="titleBn"
                  placeholder="বাংলায় শিরোনাম"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all font-bangla"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <select name="category" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all" required>
                  <option value="">Select category</option>
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="environment">Environment</option>
                  <option value="technology">Technology</option>
                  <option value="community">Community Development</option>
                  <option value="disaster">Disaster Relief</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Duration *</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="duration"
                    placeholder="Number of days"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                  <select name="durationUnit" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all">
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </select>
                </div>
              </div>

              {/* Funding Goal */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Funding Goal (৳) *</label>
                <input
                  type="number"
                  name="goal"
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  required
                />
              </div>

              {/* Campaign Image */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Image *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer bg-gray-50">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600 font-semibold">Click to upload image</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  rows={6}
                  placeholder="Describe your campaign in detail..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {showDonateModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Support This Campaign</h2>
                <button
                  onClick={() => setShowDonateModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-green-100 mt-2 font-bangla">এই ক্যাম্পেইনকে সমর্থন করুন</p>
            </div>

            <div className="p-6">
              {/* Campaign Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-2">{selectedCampaign.title}</h3>
                <p className="text-sm text-gray-600 font-bangla mb-3">{selectedCampaign.titleBn}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    <span className="font-bold text-green-600">৳{selectedCampaign.raised.toLocaleString()}</span> raised of ৳{selectedCampaign.goal.toLocaleString()}
                  </span>
                  <span className="text-gray-600">{selectedCampaign.daysLeft} days left</span>
                </div>
              </div>

              {/* Donation Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Donation Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[500, 1000, 2000, 5000, 10000, 20000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        donationAmount === amount
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ৳{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Or enter custom amount:</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                    placeholder="Custom amount"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                    min="1"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Choose Payment Method</label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => submitDonation('bKash')}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-bold hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">📱</span>
                      <span>bKash</span>
                    </span>
                    <span>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => submitDonation('Nagad')}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">💳</span>
                      <span>Nagad</span>
                    </span>
                    <span>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => submitDonation('Rocket')}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-bold hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span>Rocket</span>
                    </span>
                    <span>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => submitDonation('Credit/Debit Card')}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-2xl">💳</span>
                      <span>Credit/Debit Card</span>
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Info Note */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-800">
                  <span className="font-bold">Note:</span> This is a demo donation flow. In production, actual payment gateways (bKash API, Nagad API, Stripe, etc.) will be integrated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Write a Comment</h2>
              <button
                onClick={() => setShowCommentModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitComment}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Comment</label>
                <textarea
                  name="comment"
                  rows={5}
                  placeholder="Share your thoughts about this campaign..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all resize-none"
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">Share Campaign</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Share URL */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Link</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-700 font-mono text-sm"
                />
                <button
                  onClick={copyShareLink}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Social Media Share Buttons */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Share on Social Media</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  <span>📘</span>
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors"
                >
                  <span>🐦</span>
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => shareToSocial('whatsapp')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => shareToSocial('messenger')}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-colors"
                >
                  <span>💬</span>
                  <span>Messenger</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Toast Notification */}
      {pointsToast && (
        <PointsToast
          points={pointsToast.points}
          action={pointsToast.action}
          onClose={() => setPointsToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
