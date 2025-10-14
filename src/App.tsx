import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UserGuide from './components/UserGuide';
import AILab from './components/AILab';
import VolunteerSection from './components/VolunteerSection';
import ChatSystem from './components/ChatSystem';
import VoiceAssistant from './components/VoiceAssistant';
import UserProfile from './components/UserProfile';
import SocialImpactHub from './components/SocialImpactHub';
import GamificationSystem from './components/GamificationSystem';
import SOSButton from './components/SOSButton';
import ReportSystem from './components/ReportSystem';
import './styles/fonts.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState('general');
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [user, setUser] = useState({
    name: 'রাহুল আহমেদ',
    level: 5,
    points: 1250,
    badges: ['সহায়ক', 'শিক্ষার্থী', 'কমিউনিটি সদস্য'],
    impactScore: 85,
    joinedDate: '2024-01-15'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        setIsChatOpen={setIsChatOpen}
        user={user}
      />
      
      <main className="relative">
        {activeSection === 'home' && (
          <>
            <Hero setIsChatOpen={setIsChatOpen} />
            <Features 
              setSelectedChatbot={setSelectedChatbot}
              setIsChatOpen={setIsChatOpen}
            />
            <GamificationSystem user={user} />
          </>
        )}
        
        {activeSection === 'guide' && <UserGuide />}
        {activeSection === 'accessibility' && <AILab />}
        {activeSection === 'volunteer' && <VolunteerSection />}
        {activeSection === 'profile' && <UserProfile user={user} setUser={setUser} />}
        {activeSection === 'impact' && <SocialImpactHub user={user} />}
        
        {/* Combined Report & Help Section */}
        {(activeSection === 'elder-support' || activeSection === 'create') && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Report & Get Help
                  <span className="block text-2xl font-bangla text-indigo-600 mt-2">
                    রিপোর্ট করুন এবং সাহায্য পান
                  </span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto font-bangla">
                  সমস্যা রিপোর্ট করুন, প্রচারণা শুরু করুন অথবা জরুরি সাহায্য পান
                </p>
              </div>

              {/* Quick Action Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                {/* Emergency Report Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    জরুরি রিপোর্ট
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    নির্যাতন, সাইবার বুলিং বা জরুরি সমস্যা রিপোর্ট করুন
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: document.getElementById('report-system')?.offsetTop || 0, behavior: 'smooth' })}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bangla font-semibold"
                  >
                    রিপোর্ট করুন
                  </button>
                </div>

                {/* Create Campaign Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    প্রচারণা তৈরি করুন
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    সামাজিক প্রচারণা শুরু করুন এবং কমিউনিটির সাথে কাজ করুন
                  </p>
                  <button 
                    onClick={() => setShowCampaignForm(true)}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bangla font-semibold"
                  >
                    প্রচারণা শুরু করুন
                  </button>
                </div>

                {/* Community Issue Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚩</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-bangla mb-2 text-center">
                    কমিউনিটি সমস্যা
                  </h3>
                  <p className="text-gray-700 font-bangla mb-4 text-sm text-center">
                    এলাকার সমস্যা তুলে ধরুন এবং সমাধানের জন্য কাজ করুন
                  </p>
                  <button 
                    onClick={() => setShowCommunityForm(true)}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bangla font-semibold"
                  >
                    সমস্যা রিপোর্ট করুন
                  </button>
                </div>
              </div>

              {/* Campaign Creation Modal */}
              {showCampaignForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold font-bangla">নতুন প্রচারণা তৈরি করুন</h3>
                          <p className="text-green-100 font-bangla mt-1">সামাজিক পরিবর্তনের জন্য একটি প্রচারণা শুরু করুন</p>
                        </div>
                        <button 
                          onClick={() => setShowCampaignForm(false)}
                          className="text-white hover:text-green-100 text-3xl font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <form className="space-y-6">
                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">প্রচারণার শিরোনাম *</label>
                          <input 
                            type="text" 
                            placeholder="যেমন: স্কুলে বিনামূল্যে বই বিতরণ" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">প্রচারণার ধরন *</label>
                          <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla">
                            <option value="">একটি ধরন নির্বাচন করুন</option>
                            <option value="education">শিক্ষা সংক্রান্ত</option>
                            <option value="health">স্বাস্থ্য সেবা</option>
                            <option value="environment">পরিবেশ রক্ষা</option>
                            <option value="poverty">দারিদ্র্য বিমোচন</option>
                            <option value="women">নারী ক্ষমতায়ন</option>
                            <option value="children">শিশু সুরক্ষা</option>
                            <option value="elderly">বয়স্ক সেবা</option>
                            <option value="disability">প্রতিবন্ধী সহায়তা</option>
                            <option value="other">অন্যান্য</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">লক্ষ্য ও উদ্দেশ্য *</label>
                          <textarea 
                            rows={4}
                            placeholder="আপনার প্রচারণার লক্ষ্য এবং কি অর্জন করতে চান তা বিস্তারিত লিখুন"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                          ></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-bangla font-semibold mb-2">লক্ষ্য অর্থ (টাকা)</label>
                            <input 
                              type="number" 
                              placeholder="যেমন: ৫০০০০" 
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-bangla font-semibold mb-2">সময়সীমা</label>
                            <input 
                              type="date" 
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">প্রচারণার বিবরণ *</label>
                          <textarea 
                            rows={6}
                            placeholder="প্রচারণা সম্পর্কে বিস্তারিত তথ্য দিন - কেন এটি গুরুত্বপূর্ণ, কিভাবে মানুষ সাহায্য করতে পারে, এবং প্রত্যাশিত ফলাফল"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">এলাকা/জেলা *</label>
                          <input 
                            type="text" 
                            placeholder="যেমন: ঢাকা, মিরপুর" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">যোগাযোগের মাধ্যম *</label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <input 
                              type="email" 
                              placeholder="ইমেইল" 
                              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                            <input 
                              type="tel" 
                              placeholder="মোবাইল নম্বর" 
                              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-bangla"
                            />
                          </div>
                        </div>

                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                          <h4 className="font-bold text-green-800 font-bangla mb-2">📋 প্রচারণা নির্দেশিকা</h4>
                          <ul className="text-sm text-green-700 font-bangla space-y-1">
                            <li>• স্পষ্ট এবং বাস্তবসম্মত লক্ষ্য নির্ধারণ করুন</li>
                            <li>• সৎ এবং স্বচ্ছ তথ্য প্রদান করুন</li>
                            <li>• নিয়মিত অগ্রগতি আপডেট করুন</li>
                            <li>• প্রাপ্ত সাহায্যের সঠিক হিসাব রাখুন</li>
                          </ul>
                        </div>

                        <div className="flex gap-4">
                          <button 
                            type="button"
                            onClick={() => setShowCampaignForm(false)}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-bangla font-semibold"
                          >
                            বাতিল করুন
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors font-bangla font-semibold shadow-lg"
                          >
                            প্রচারণা তৈরি করুন
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Community Issue Modal */}
              {showCommunityForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold font-bangla">কমিউনিটি সমস্যা রিপোর্ট করুন</h3>
                          <p className="text-blue-100 font-bangla mt-1">আপনার এলাকার সমস্যা জানান এবং সমাধান পান</p>
                        </div>
                        <button 
                          onClick={() => setShowCommunityForm(false)}
                          className="text-white hover:text-blue-100 text-3xl font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <form className="space-y-6">
                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">সমস্যার শিরোনাম *</label>
                          <input 
                            type="text" 
                            placeholder="যেমন: রাস্তায় বড় গর্ত, জল জমার সমস্যা" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">সমস্যার ধরন *</label>
                          <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla">
                            <option value="">একটি ধরন নির্বাচন করুন</option>
                            <option value="infrastructure">অবকাঠামো (রাস্তা, পানি, বিদ্যুৎ)</option>
                            <option value="sanitation">পরিচ্ছন্নতা (আবর্জনা, নর্দমা)</option>
                            <option value="safety">নিরাপত্তা (চুরি, ছিনতাই)</option>
                            <option value="noise">শব্দ দূষণ</option>
                            <option value="traffic">যানজট</option>
                            <option value="street-light">রাস্তার বাতি</option>
                            <option value="water">পানি সরবরাহ</option>
                            <option value="electricity">বিদ্যুৎ সমস্যা</option>
                            <option value="health">স্বাস্থ্য ঝুঁকি</option>
                            <option value="education">শিক্ষা প্রতিষ্ঠান সংক্রান্ত</option>
                            <option value="other">অন্যান্য</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">বিস্তারিত বিবরণ *</label>
                          <textarea 
                            rows={5}
                            placeholder="সমস্যা সম্পর্কে বিস্তারিত লিখুন - কখন থেকে, কত মানুষ ক্ষতিগ্রস্ত, সমস্যার তীব্রতা"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                          ></textarea>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">অবস্থান *</label>
                          <input 
                            type="text" 
                            placeholder="সম্পূর্ণ ঠিকানা - এলাকা, রাস্তা, ওয়ার্ড নম্বর" 
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-bangla font-semibold mb-2">এলাকা/জেলা *</label>
                            <input 
                              type="text" 
                              placeholder="যেমন: ঢাকা, মিরপুর-১০" 
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-bangla font-semibold mb-2">পোস্টকোড</label>
                            <input 
                              type="text" 
                              placeholder="যেমন: ১২১৬" 
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">প্রভাবিত মানুষের সংখ্যা (আনুমানিক)</label>
                          <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla">
                            <option value="">নির্বাচন করুন</option>
                            <option value="10-50">১০-৫০ জন</option>
                            <option value="50-100">৫০-১০০ জন</option>
                            <option value="100-500">১০০-৫০০ জন</option>
                            <option value="500+">৫০০+ জন</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">জরুরিত্বের মাত্রা *</label>
                          <div className="grid grid-cols-3 gap-3">
                            <button type="button" className="px-4 py-3 border-2 border-yellow-300 bg-yellow-50 rounded-lg hover:bg-yellow-100 font-bangla font-semibold text-yellow-700">
                              🟡 সাধারণ
                            </button>
                            <button type="button" className="px-4 py-3 border-2 border-orange-300 bg-orange-50 rounded-lg hover:bg-orange-100 font-bangla font-semibold text-orange-700">
                              🟠 জরুরি
                            </button>
                            <button type="button" className="px-4 py-3 border-2 border-red-300 bg-red-50 rounded-lg hover:bg-red-100 font-bangla font-semibold text-red-700">
                              🔴 অতি জরুরি
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-bangla font-semibold mb-2">আপনার যোগাযোগ তথ্য *</label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              placeholder="আপনার নাম" 
                              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                            />
                            <input 
                              type="tel" 
                              placeholder="মোবাইল নম্বর" 
                              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bangla"
                            />
                          </div>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <h4 className="font-bold text-blue-800 font-bangla mb-2">ℹ️ কিভাবে সমাধান হবে?</h4>
                          <ul className="text-sm text-blue-700 font-bangla space-y-1">
                            <li>• আপনার রিপোর্ট সংশ্লিষ্ট কর্তৃপক্ষের কাছে পাঠানো হবে</li>
                            <li>• ২৪ ঘণ্টার মধ্যে প্রাথমিক সাড়া দেওয়া হবে</li>
                            <li>• অগ্রগতি সম্পর্কে নিয়মিত আপডেট পাবেন</li>
                            <li>• কমিউনিটি সদস্যরাও সাহায্য করতে পারবেন</li>
                          </ul>
                        </div>

                        <div className="flex gap-4">
                          <button 
                            type="button"
                            onClick={() => setShowCommunityForm(false)}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-bangla font-semibold"
                          >
                            বাতিল করুন
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors font-bangla font-semibold shadow-lg"
                          >
                            রিপোর্ট জমা দিন
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Report System */}
              <div id="report-system" className="scroll-mt-20">
                <ReportSystem />
              </div>

              {/* Additional Help Options */}
              <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 font-bangla mb-6 text-center">
                  আরও সাহায্য প্রয়োজন?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 font-bangla">জরুরি হটলাইন</h4>
                        <p className="text-sm text-gray-600">24/7 সেবা</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">জাতীয় জরুরি সেবা:</span>
                        <a href="tel:999" className="text-lg font-bold text-red-600 hover:text-red-700">999</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">নারী ও শিশু হেল্পলাইন:</span>
                        <a href="tel:109" className="text-lg font-bold text-red-600 hover:text-red-700">109</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bangla">বয়স্ক হেল্পলাইন:</span>
                        <a href="tel:10921" className="text-lg font-bold text-red-600 hover:text-red-700">10921</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 font-bangla">অনলাইন সাহায্য</h4>
                        <p className="text-sm text-gray-600">তাৎক্ষণিক চ্যাট</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-bangla font-semibold"
                    >
                      AI সহায়কের সাথে চ্যাট করুন
                    </button>
                    <p className="text-xs text-gray-500 font-bangla mt-2 text-center">
                      সম্পূর্ণ গোপনীয় এবং নিরাপদ
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Get Started */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 font-bangla mb-6 text-center">
                  কিভাবে শুরু করবেন?
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-blue-600">১</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সমস্যা চিহ্নিত করুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">আপনার সমস্যা বা লক্ষ্য নির্ধারণ করুন</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-green-600">২</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">রিপোর্ট করুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">ফর্ম পূরণ করুন বা প্রচারণা তৈরি করুন</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-purple-600">৩</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সাহায্য পান</h4>
                    <p className="text-sm text-gray-600 font-bangla">আমরা দ্রুত সাড়া দেব এবং সাহায্য করব</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-red-600">৪</span>
                    </div>
                    <h4 className="font-bold text-gray-900 font-bangla mb-2">সমাধান দেখুন</h4>
                    <p className="text-sm text-gray-600 font-bangla">অগ্রগতি ট্র্যাক করুন এবং ফলাফল দেখুন</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <ChatSystem
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          selectedBot={selectedChatbot}
          onBotChange={setSelectedChatbot}
          user={user}
          setUser={setUser}
        />
        
        <SOSButton user={user} />
        <VoiceAssistant />
      </main>
    </div>
  );
}

export default App;