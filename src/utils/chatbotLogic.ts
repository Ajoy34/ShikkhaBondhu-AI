export const getChatbotResponse = (input: string, botType: string, isWelcome: boolean = false, user?: any): string => {
  if (isWelcome) {
    return getWelcomeMessage(botType, user);
  }

  const lowerInput = input.toLowerCase();

  switch (botType) {
    case 'law':
      return getLegalResponse(lowerInput, user);
    case 'health':
      return getHealthResponse(lowerInput, user);
    case 'safety':
      return getSafetyResponse(lowerInput, user);
    case 'skills':
      return getSkillsResponse(lowerInput, user);
    case 'postcare':
      return getPostCareResponse(lowerInput, user);
    case 'community':
      return getCommunityResponse(lowerInput, user);
    case 'crisis':
      return getCrisisResponse(lowerInput, user);
    case 'academic':
      return getAcademicResponse(lowerInput, user);
    default:
      return getGeneralResponse(lowerInput, user);
  }
};

const getWelcomeMessage = (botType: string, user?: any): string => {
  const userName = user?.name || 'বন্ধু';
  
  const welcomeMessages = {
    general: `<p class="font-bangla">হ্যালো ${userName}! আমি আপনার সাধারণ সহায়ক। আমি বিভিন্ন বিষয়ে সাহায্য করতে পারি।</p>
              <div class="mt-3 space-y-2">
                <button class="chat-option w-full text-left p-2 bg-blue-100 rounded-lg text-sm hover:bg-blue-200" data-message="আমার পড়াশোনায় সাহায্য চাই">📚 একাডেমিক সাহায্য</button>
                <button class="chat-option w-full text-left p-2 bg-green-100 rounded-lg text-sm hover:bg-green-200" data-message="দৈনন্দিন সমস্যার সমাধান চাই">💡 দৈনন্দিন সমস্যা</button>
                <button class="chat-option w-full text-left p-2 bg-purple-100 rounded-lg text-sm hover:bg-purple-200" data-message="সাধারণ পরামর্শ চাই">🤝 সাধারণ পরামর্শ</button>
              </div>`,
    
    law: `<p class="font-bangla">স্বাগতম ${userName}! আমি আইনি অধিকার বিষয়ক সহায়ক। বাংলাদেশের আইন সম্পর্কে জানতে চান?</p>
          <div class="mt-3 space-y-2">
            <button class="chat-option w-full text-left p-2 bg-red-100 rounded-lg text-sm hover:bg-red-200" data-message="সাইবার আইন সম্পর্কে জানতে চাই">⚖️ সাইবার আইন</button>
            <button class="chat-option w-full text-left p-2 bg-red-100 rounded-lg text-sm hover:bg-red-200" data-message="ছাত্র অধিকার সম্পর্কে জানতে চাই">👩‍⚖️ ছাত্র অধিকার</button>
            <button class="chat-option w-full text-left p-2 bg-red-100 rounded-lg text-sm hover:bg-red-200" data-message="হয়রানির বিরুদ্ধে আইন জানতে চাই">📋 হয়রানির বিরুদ্ধে আইন</button>
          </div>`,
    
    health: `<p class="font-bangla">হ্যালো ${userName}! আমি স্বাস্থ্য ও মানসিক সহায়ক। এটি একটি নিরাপদ এবং গোপনীয় স্থান।</p>
             <div class="mt-3 space-y-2">
               <button class="chat-option w-full text-left p-2 bg-green-100 rounded-lg text-sm hover:bg-green-200" data-message="মানসিক স্বাস্থ্য নিয়ে কথা বলতে চাই">🧠 মানসিক স্বাস্থ্য</button>
               <button class="chat-option w-full text-left p-2 bg-green-100 rounded-lg text-sm hover:bg-green-200" data-message="প্রজনন স্বাস্থ্য সম্পর্কে জানতে চাই">❤️ প্রজনন স্বাস্থ্য</button>
               <button class="chat-option w-full text-left p-2 bg-green-100 rounded-lg text-sm hover:bg-green-200" data-message="স্ট্রেস কমানোর উপায় জানতে চাই">😌 স্ট্রেস ম্যানেজমেন্ট</button>
             </div>`,
    
    safety: `<p class="font-bangla">হ্যালো ${userName}! আমি নিরাপত্তা ও রিপোর্টিং সহায়ক। আপনার সমস্যা গোপনীয়ভাবে শুনতে এখানে আছি।</p>
             <div class="mt-3 space-y-2">
               <button class="chat-option w-full text-left p-2 bg-blue-100 rounded-lg text-sm hover:bg-blue-200" data-message="হয়রানির রিপোর্ট করতে চাই">🛡️ হয়রানি রিপোর্ট</button>
               <button class="chat-option w-full text-left p-2 bg-blue-100 rounded-lg text-sm hover:bg-blue-200" data-message="জরুরি নম্বর জানতে চাই">📞 জরুরি নম্বর</button>
               <button class="chat-option w-full text-left p-2 bg-blue-100 rounded-lg text-sm hover:bg-blue-200" data-message="নিরাপত্তা পরিকল্পনা তৈরি করতে চাই">🔒 নিরাপত্তা পরিকল্পনা</button>
             </div>`,
    
    skills: `<p class="font-bangla">হ্যালো ${userName}! আমি দক্ষতা উন্নয়ন প্রশিক্ষক। ক্যারিয়ার গড়তে কোন দক্ষতা শিখতে চান?</p>
             <div class="mt-3 space-y-2">
               <button class="chat-option w-full text-left p-2 bg-yellow-100 rounded-lg text-sm hover:bg-yellow-200" data-message="টেকনিক্যাল দক্ষতা শিখতে চাই">💻 টেকনিক্যাল দক্ষতা</button>
               <button class="chat-option w-full text-left p-2 bg-yellow-100 rounded-lg text-sm hover:bg-yellow-200" data-message="সফট স্কিল উন্নয়ন করতে চাই">🎯 সফট স্কিল</button>
               <button class="chat-option w-full text-left p-2 bg-yellow-100 rounded-lg text-sm hover:bg-yellow-200" data-message="ক্যারিয়ার গাইডেন্স চাই">🚀 ক্যারিয়ার গাইডেন্স</button>
             </div>`,
    
    postcare: `<p class="font-bangla">হ্যালো ${userName}! আমি পরবর্তী যত্ন সহায়ক। আপনার সুস্থতার যাত্রায় সাথে থাকতে এসেছি।</p>
               <div class="mt-3 space-y-2">
                 <button class="chat-option w-full text-left p-2 bg-purple-100 rounded-lg text-sm hover:bg-purple-200" data-message="আমার অগ্রগতি দেখতে চাই">🌱 অগ্রগতি ট্র্যাকিং</button>
                 <button class="chat-option w-full text-left p-2 bg-purple-100 rounded-lg text-sm hover:bg-purple-200" data-message="মানসিক শক্তি বাড়াতে চাই">💪 মানসিক শক্তি</button>
                 <button class="chat-option w-full text-left p-2 bg-purple-100 rounded-lg text-sm hover:bg-purple-200" data-message="আরো রিসোর্স চাই">🔗 রিসোর্স সংযোগ</button>
               </div>`,
    
    community: `<p class="font-bangla">হ্যালো ${userName}! আমি কমিউনিটি সংযোগকারী। সহযোগী মানুষদের সাথে যুক্ত হতে সাহায্য করি।</p>
                <div class="mt-3 space-y-2">
                  <button class="chat-option w-full text-left p-2 bg-teal-100 rounded-lg text-sm hover:bg-teal-200" data-message="পিয়ার সাপোর্ট গ্রুপে যোগ দিতে চাই">👥 পিয়ার সাপোর্ট</button>
                  <button class="chat-option w-full text-left p-2 bg-teal-100 rounded-lg text-sm hover:bg-teal-200" data-message="মেন্টর খুঁজে পেতে চাই">🎓 মেন্টরশিপ</button>
                  <button class="chat-option w-full text-left p-2 bg-teal-100 rounded-lg text-sm hover:bg-teal-200" data-message="সাপোর্ট গ্রুপে যোগ দিতে চাই">🤝 সাপোর্ট গ্রুপ</button>
                </div>`,
    
    crisis: `<p class="font-bangla text-red-600">হ্যালো ${userName}! আমি জরুরি সহায়তা বিশেষজ্ঞ। যেকোনো মুহূর্তে এখানে আছি।</p>
             <div class="mt-3 space-y-2 bg-red-50 p-3 rounded-lg">
               <p class="font-bangla text-sm text-red-800">জরুরি নম্বরসমূহ:</p>
               <div class="text-sm font-bold text-red-700">
                 <div class="chat-option cursor-pointer hover:bg-red-100 p-1 rounded" data-message="৯৯৯ নম্বরে কল করতে চাই">🚨 জাতীয় জরুরি সেবা: ৯৯৯</div>
                 <div class="chat-option cursor-pointer hover:bg-red-100 p-1 rounded" data-message="স্বাস্থ্য বাতায়নে কল করতে চাই">🏥 স্বাস্থ্য বাতায়ন: ১৬২৬৩</div>
                 <div class="chat-option cursor-pointer hover:bg-red-100 p-1 rounded" data-message="নারী ও শিশু হেল্পলাইনে কল করতে চাই">👮‍♀️ নারী ও শিশু হেল্পলাইন: ১০৯</div>
               </div>
             </div>`,
    
    academic: `<p class="font-bangla">হ্যালো ${userName}! আমি একাডেমিক সাপোর্ট সহায়ক। পড়াশোনায় কোন সাহায্য লাগবে?</p>
               <div class="mt-3 space-y-2">
                 <button class="chat-option w-full text-left p-2 bg-indigo-100 rounded-lg text-sm hover:bg-indigo-200" data-message="পড়ার কৌশল জানতে চাই">📖 পড়ার কৌশল</button>
                 <button class="chat-option w-full text-left p-2 bg-indigo-100 rounded-lg text-sm hover:bg-indigo-200" data-message="পরীক্ষার প্রস্তুতি নিতে চাই">📝 পরীক্ষার প্রস্তুতি</button>
                 <button class="chat-option w-full text-left p-2 bg-indigo-100 rounded-lg text-sm hover:bg-indigo-200" data-message="লক্ষ্য নির্ধারণে সাহায্য চাই">🎯 লক্ষ্য নির্ধারণ</button>
               </div>`,
    
    nctb: `<p class="font-bangla">হ্যালো ${userName}! আমি NCTB বই সহায়ক। 📚</p>
           <p class="font-bangla text-sm mt-2 text-gray-600">আমি আপনার NCTB পাঠ্যবই থেকে সরাসরি উত্তর দিতে পারি। বইয়ের পৃষ্ঠা ও অধ্যায়ের রেফারেন্স সহ!</p>
           <div class="mt-3 space-y-2">
             <div class="bg-orange-50 p-2 rounded text-xs font-bangla">
               <p class="font-bold text-orange-700">📖 উপলব্ধ বই:</p>
               <ul class="list-disc ml-4 mt-1 text-gray-700">
                 <li>বাংলা সহপাঠ (নবম শ্রেণি) ✅</li>
                 <li>উচ্চতর গণিত (নবম-দশম শ্রেণি) ✅</li>
                 <li>পদার্থবিজ্ঞান (শীঘ্রই আসছে...) ⏳</li>
               </ul>
               <p class="text-xs text-gray-500 mt-1">* পদার্থবিজ্ঞান বইটি বড় হওয়ায় প্রসেসিং চলছে</p>
             </div>
             <button class="chat-option w-full text-left p-2 bg-orange-100 rounded-lg text-sm hover:bg-orange-200" data-message="নবম শ্রেণির উচ্চতর গণিত একাদশ অধ্যায়ের সমাধান দাও">📐 গণিত অধ্যায় ১১ সমাধান</button>
             <button class="chat-option w-full text-left p-2 bg-orange-100 rounded-lg text-sm hover:bg-orange-200" data-message="সমাস কাকে বলে">� বাংলা ব্যাকরণ</button>
             <button class="chat-option w-full text-left p-2 bg-orange-100 rounded-lg text-sm hover:bg-orange-200" data-message="ত্রিকোণমিতিক অনুপাত কি">� গণিত ত্রিকোণমিতি</button>
           </div>`
  };

  return welcomeMessages[botType as keyof typeof welcomeMessages] || welcomeMessages.general;
};

const getLegalResponse = (input: string, user?: any): string => {
  if (input.includes('law') || input.includes('ain') || input.includes('আইন') || input.includes('cyber') || input.includes('সাইবার')) {
    return `<p class="font-bangla">বাংলাদেশের সাইবার আইন সম্পর্কে জানতে চান? এখানে গুরুত্বপূর্ণ তথ্যাবলি:</p>
            <div class="mt-3 bg-red-50 p-4 rounded-lg">
              <h4 class="font-bangla font-bold text-red-800 mb-2">ডিজিটাল নিরাপত্তা আইন, ২০১৮:</h4>
              <ul class="list-disc list-inside font-bangla text-sm space-y-1">
                <li>অনলাইন হয়রানি শাস্তিযোগ্য অপরাধ</li>
                <li>সর্বোচ্চ ১০ বছর কারাদণ্ড বা ১০ লক্ষ টাকা জরিমানা</li>
                <li>ভুয়া তথ্য ছড়ানো নিষিদ্ধ</li>
                <li>সাইবার বুলিং এর জন্য ৫ বছর পর্যন্ত কারাদণ্ড</li>
              </ul>
              <div class="mt-3">
                <button class="chat-option bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bangla" data-message="আইনি সাহায্য চাই">📞 আইনি সাহায্য চান?</button>
              </div>
            </div>`;
  }

  if (input.includes('harassment') || input.includes('bullying') || input.includes('হয়রানি') || input.includes('ছাত্র অধিকার')) {
    return `<p class="font-bangla">হয়রানির বিরুদ্ধে আপনার অধিকার রয়েছে:</p>
            <div class="mt-3 space-y-3">
              <div class="bg-blue-50 p-3 rounded-lg">
                <h5 class="font-bangla font-bold">যা করতে পারেন:</h5>
                <ul class="font-bangla text-sm list-disc list-inside mt-1 space-y-1">
                  <li>প্রমাণ সংগ্রহ করুন (স্ক্রিনশট, বার্তা)</li>
                  <li>৯৯৯ নম্বরে কল করুন</li>
                  <li>নিকটস্থ থানায় জিডি করুন</li>
                  <li>ডিজিটাল সিকিউরিটি এজেন্সিতে অভিযোগ</li>
                  <li>শিক্ষা প্রতিষ্ঠানের কর্তৃপক্ষকে জানান</li>
                  <li>আইনি সহায়তা নিন</li>
                </ul>
              </div>
              <div class="mt-3">
                <button class="chat-option bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bangla mr-2" data-message="রিপোর্ট করতে চাই">রিপোর্ট করুন</button>
                <button class="chat-option bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bangla" data-message="আরো সাহায্য চাই">আরো সাহায্য</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">আইনি বিষয়ে আরো নির্দিষ্ট প্রশ্ন করুন। যেমন: 'সাইবার আইন', 'হয়রানি', 'ছাত্র অধিকার' ইত্যাদি।</p>`;
};

const getHealthResponse = (input: string, user?: any): string => {
  if (input.includes('stress') || input.includes('tension') || input.includes('চাপ') || input.includes('টেনশন') || input.includes('স্ট্রেস')) {
    return `<p class="font-bangla">মানসিক চাপ একটি স্বাভাবিক বিষয়। এটি কমানোর উপায়:</p>
            <div class="mt-3 bg-green-50 p-4 rounded-lg">
              <ul class="font-bangla text-sm space-y-2">
                <li>🧘‍♀️ <strong>শ্বাসের ব্যায়াম:</strong> গভীর শ্বাস নিন, ৫ সেকেন্ড ধরে রাখুন</li>
                <li>🚶‍♂️ <strong>হাঁটাচলা:</strong> দিনে ৩০ মিনিট হাঁটুন</li>
                <li>💤 <strong>পর্যাপ্ত ঘুম:</strong> রাতে ৭-৮ ঘণ্টা ঘুমান</li>
                <li>🗣️ <strong>কথা বলুন:</strong> বিশ্বস্ত কারো সাথে মন খুলে কথা বলুন</li>
                <li>🎵 <strong>সঙ্গীত শুনুন:</strong> প্রিয় গান শুনে মন ভালো করুন</li>
                <li>📚 <strong>বই পড়ুন:</strong> ভালো বই পড়ে মন শান্ত রাখুন</li>
              </ul>
              <div class="mt-3 p-3 bg-yellow-100 rounded">
                <p class="font-bangla text-sm">📞 <strong>জরুরি প্রয়োজনে:</strong> স্বাস্থ্য বাতায়ন ১৬২৬৩</p>
                <button class="chat-option mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="আরো মানসিক স্বাস্থ্যের টিপস চাই">আরো টিপস</button>
              </div>
            </div>`;
  }

  if (input.includes('mental') || input.includes('depression') || input.includes('মানসিক') || input.includes('প্রজনন')) {
    return `<p class="font-bangla">মানসিক স্বাস্থ্য অত্যন্ত গুরুত্বপূর্ণ। আপনি একা নন।</p>
            <div class="mt-3 bg-green-50 p-4 rounded-lg">
              <h5 class="font-bangla font-bold text-green-800">সাহায্যের উৎস:</h5>
              <div class="mt-2 space-y-2">
                <div class="bg-white p-2 rounded border-l-4 border-green-500">
                  <strong class="font-bangla">কান পেতে রই:</strong> ০৯৬৬৬৭৭৭২২২ (২৪/৭)
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-blue-500">
                  <strong class="font-bangla">সুখী মন:</strong> মানসিক স্বাস্থ্য হেল্পলাইন
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-purple-500">
                  <strong class="font-bangla">ডাক্তারের সাথে কথা:</strong> ১৬২৬৩
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-pink-500">
                  <strong class="font-bangla">মা ও শিশু হেল্পলাইন:</strong> ১০৯
                </div>
              </div>
              <div class="mt-3">
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="কাউন্সেলিং চাই">কাউন্সেলিং</button>
                <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="সাপোর্ট গ্রুপে যোগ দিতে চাই">সাপোর্ট গ্রুপ</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">স্বাস্থ্য সম্পর্কে কোন নির্দিষ্ট প্রশ্ন আছে? মানসিক স্বাস্থ্য, শারীরিক সমস্যা, বা অন্য কিছু?</p>`;
};

const getSafetyResponse = (input: string, user?: any): string => {
  if (input.includes('report') || input.includes('complain') || input.includes('রিপোর্ট') || input.includes('হয়রানি')) {
    return `<p class="font-bangla">রিপোর্ট করার জন্য ধন্যবাদ। এটি একটি সাহসী পদক্ষেপ।</p>
            <div class="mt-3 bg-blue-50 p-4 rounded-lg">
              <h5 class="font-bangla font-bold text-blue-800">রিপোর্ট প্রক্রিয়া:</h5>
              <div class="mt-2 space-y-2">
                <div class="flex items-start space-x-2">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">১</span>
                  <p class="font-bangla text-sm">ঘটনার বিস্তারিত লিখুন</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">২</span>
                  <p class="font-bangla text-sm">প্রমাণ সংগ্রহ করুন (যদি থাকে)</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">৩</span>
                  <p class="font-bangla text-sm">জমা দিন - সব তথ্য গোপন থাকবে</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">৪</span>
                  <p class="font-bangla text-sm">আমরা ২৪ ঘন্টার মধ্যে যোগাযোগ করব</p>
                </div>
              </div>
              <button class="chat-option mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bangla" data-message="রিপোর্ট ফর্ম খুলুন">রিপোর্ট শুরু করুন</button>
            </div>`;
  }

  if (input.includes('জরুরি') || input.includes('emergency')) {
    return `<div class="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p class="font-bangla text-red-800 font-bold mb-3">জরুরি সাহায্যের জন্য এখনই কল করুন:</p>
              <div class="space-y-2">
                <div class="bg-red-600 text-white p-3 rounded-lg text-center">
                  <div class="font-bold text-lg">৯৯৯</div>
                  <div class="font-bangla text-sm">জাতীয় জরুরি সেবা</div>
                </div>
                <div class="bg-green-600 text-white p-3 rounded-lg text-center">
                  <div class="font-bold text-lg">১৬২৬৩</div>
                  <div class="font-bangla text-sm">স্বাস্থ্য বাতায়ন</div>
                </div>
                <div class="bg-purple-600 text-white p-3 rounded-lg text-center">
                  <div class="font-bold text-lg">১০৯</div>
                  <div class="font-bangla text-sm">নারী ও শিশু হেল্পলাইন</div>
                </div>
              </div>
              <p class="font-bangla text-sm text-red-700 mt-3">আপনি একা নন। সাহায্য এখানেই আছে।</p>
            </div>`;
  }

  return `<p class="font-bangla">নিরাপত্তা আমাদের অগ্রাধিকার। কোন সমস্যায় পড়েছেন? নির্দ্বিধায় বলুন।</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button class="chat-option bg-red-100 p-3 rounded-lg text-sm font-bangla hover:bg-red-200" data-message="জরুরি সাহায্য চাই">🚨 জরুরি সাহায্য</button>
            <button class="chat-option bg-blue-100 p-3 rounded-lg text-sm font-bangla hover:bg-blue-200" data-message="রিপোর্ট করতে চাই">📋 রিপোর্ট করুন</button>
          </div>`;
};

const getSkillsResponse = (input: string, user?: any): string => {
  // Check if talking about economic crisis or earning
  if (input.includes('economic') || input.includes('crisis') || input.includes('earn') || input.includes('income') || 
      input.includes('আয়') || input.includes('অর্থনৈতিক') || input.includes('সংকট') || input.includes('টাকা')) {
    return `<p class="font-bangla">অর্থনৈতিক সংকট? আপনি নিজেই সমাধান হতে পারেন! 💪</p>
            <div class="mt-3 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-300">
              <h5 class="font-bangla font-bold text-green-800 mb-2">💰 আয়ের নতুন সুযোগ তৈরি করুন:</h5>
              
              <div class="bg-white p-3 rounded-lg border-l-4 border-yellow-500 mb-3">
                <h6 class="font-bangla font-bold text-yellow-800">📹 ভিডিও কোর্স তৈরি করুন</h6>
                <p class="font-bangla text-sm mt-1">আপনার দক্ষতা শেয়ার করুন এবং আয় করুন! শত শত মানুষ আপনার শেখানো দক্ষতা শিখতে চায়।</p>
                <ul class="font-bangla text-xs mt-2 space-y-1 text-gray-700">
                  <li>• প্রোগ্রামিং, ডিজাইন, ভাষা শেখান</li>
                  <li>• Udemy, Skillshare, বা নিজের প্ল্যাটফর্মে বিক্রি করুন</li>
                  <li>• একবার তৈরি করুন, বারবার আয় করুন 💵</li>
                </ul>
              </div>

              <div class="bg-white p-3 rounded-lg border-l-4 border-purple-500 mb-3">
                <h6 class="font-bangla font-bold text-purple-800">📚 ই-বুক লিখুন</h6>
                <p class="font-bangla text-sm mt-1">আপনার জ্ঞান একটি বইয়ে রূপান্তরিত করুন!</p>
                <ul class="font-bangla text-xs mt-2 space-y-1 text-gray-700">
                  <li>• পরামর্শ বই, গাইডবুক, স্টোরি লিখুন</li>
                  <li>• Amazon Kindle, Gumroad-এ প্রকাশ করুন</li>
                  <li>• প্যাসিভ ইনকাম তৈরি করুন 📖</li>
                </ul>
              </div>

              <div class="bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-lg mb-2">
                <p class="font-bangla text-sm font-bold text-pink-900">🚀 আমাদের "Create & Earn" সেকশন ব্যবহার করুন!</p>
                <p class="font-bangla text-xs text-pink-800 mt-1">ভিডিও কোর্স ও বই তৈরির সম্পূর্ণ গাইড পাবেন</p>
              </div>

              <div class="mt-3 grid grid-cols-2 gap-2">
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="ভিডিও কোর্স তৈরির গাইড চাই">📹 কোর্স তৈরি</button>
                <button class="chat-option bg-purple-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="ই-বুক লেখার গাইড চাই">📚 বই লিখুন</button>
              </div>
            </div>`;
  }

  if (input.includes('programming') || input.includes('coding') || input.includes('প্রোগ্রামিং') || input.includes('টেকনিক্যাল')) {
    return `<p class="font-bangla">প্রোগ্রামিং শিখতে চান? চমৎকার সিদ্ধান্ত!</p>
            <div class="mt-3 bg-yellow-50 p-4 rounded-lg">
              <h5 class="font-bangla font-bold text-yellow-800">প্রাথমিক কোর্স:</h5>
              <div class="mt-2 space-y-2">
                <div class="bg-white p-2 rounded border-l-4 border-yellow-500">
                  <strong>Python</strong> - শুরুর জন্য সেরা
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-blue-500">
                  <strong>JavaScript</strong> - ওয়েব ডেভেলপমেন্ট
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-green-500">
                  <strong>HTML/CSS</strong> - ওয়েবসাইট তৈরি
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-purple-500">
                  <strong>Mobile App</strong> - অ্যাপ ডেভেলপমেন্ট
                </div>
              </div>

              <!-- YouTube Video Suggestions -->
              <div class="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
                <h6 class="font-bangla font-bold text-red-700 mb-2">📺 প্রস্তাবিত YouTube ভিডিও:</h6>
                <div class="space-y-2 text-sm">
                  <a href="https://www.youtube.com/results?search_query=python+bangla+tutorial+for+beginners" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-red-500">
                    <span class="font-bangla">🐍 Python Bangla Tutorial (Beginners)</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=web+development+bangla+tutorial" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-blue-500">
                    <span class="font-bangla">🌐 Web Development Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=javascript+bangla+tutorial" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-yellow-500">
                    <span class="font-bangla">⚡ JavaScript Bangla Tutorial</span>
                  </a>
                </div>
                <p class="font-bangla text-xs mt-2 text-gray-600">💡 আমাদের কাছে এখনো কোর্স নেই, তাই YouTube থেকে শিখুন!</p>
              </div>

              <div class="mt-4 bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border-2 border-green-400">
                <p class="font-bangla text-sm font-bold text-green-900">💡 প্রোগ্রামিং শিখে কোর্স তৈরি করুন!</p>
                <p class="font-bangla text-xs mt-1 text-green-800">আপনার শেখা দক্ষতা দিয়ে ভিডিও কোর্স ও বই তৈরি করে আয় করুন 💰</p>
                <button class="chat-option mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="কোর্স তৈরি করে আয় করতে চাই">📹 কোর্স তৈরি শুরু করুন</button>
              </div>

              <div class="mt-3">
                <button class="chat-option bg-yellow-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="প্রোগ্রামিং রোডম্যাপ চাই">রোডম্যাপ</button>
                <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="ফ্রি রিসোর্স চাই">ফ্রি রিসোর্স</button>
              </div>
            </div>`;
  }

  if (input.includes('সফট স্কিল') || input.includes('soft skill') || input.includes('ক্যারিয়ার')) {
    return `<p class="font-bangla">সফট স্কিল ক্যারিয়ারের জন্য অত্যন্ত গুরুত্বপূর্ণ!</p>
            <div class="mt-3 bg-green-50 p-4 rounded-lg">
              <h5 class="font-bangla font-bold text-green-800">গুরুত্বপূর্ণ সফট স্কিল:</h5>
              <div class="mt-2 space-y-2">
                <div class="bg-white p-2 rounded border-l-4 border-green-500">
                  <strong class="font-bangla">যোগাযোগ দক্ষতা</strong> - কার্যকর কথা বলা ও লেখা
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-blue-500">
                  <strong class="font-bangla">নেতৃত্ব</strong> - টিম পরিচালনা ও সিদ্ধান্ত নেওয়া
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-purple-500">
                  <strong class="font-bangla">সময় ব্যবস্থাপনা</strong> - কাজের অগ্রাধিকার নির্ধারণ
                </div>
                <div class="bg-white p-2 rounded border-l-4 border-orange-500">
                  <strong class="font-bangla">সমস্যা সমাধান</strong> - সৃজনশীল চিন্তাভাবনা
                </div>
              </div>

              <!-- YouTube Video Suggestions -->
              <div class="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
                <h6 class="font-bangla font-bold text-red-700 mb-2">📺 শিখুন YouTube থেকে:</h6>
                <div class="space-y-2 text-sm">
                  <a href="https://www.youtube.com/results?search_query=soft+skills+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-green-500">
                    <span class="font-bangla">💬 Soft Skills Bangla Tutorial</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=communication+skills+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-blue-500">
                    <span class="font-bangla">🗣️ Communication Skills Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=leadership+skills+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-purple-500">
                    <span class="font-bangla">👔 Leadership Skills Bangla</span>
                  </a>
                </div>
              </div>

              <div class="mt-4 bg-gradient-to-r from-pink-100 to-orange-100 p-3 rounded-lg border-2 border-pink-400">
                <p class="font-bangla text-sm font-bold text-pink-900">🎯 সফট স্কিল নিয়ে কোর্স বানান!</p>
                <p class="font-bangla text-xs mt-1 text-pink-800">যোগাযোগ দক্ষতা, নেতৃত্ব নিয়ে কোর্স/বই তৈরি করে আয় করুন!</p>
                <button class="chat-option mt-2 bg-pink-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="সফট স্কিল কোর্স তৈরি করতে চাই">🚀 Create & Earn</button>
              </div>

              <div class="mt-3">
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="যোগাযোগ দক্ষতা উন্নত করতে চাই">যোগাযোগ দক্ষতা</button>
                <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="ক্যারিয়ার পরামর্শ চাই">ক্যারিয়ার গাইড</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">কোন দক্ষতা শিখতে চান? টেকনিক্যাল না সফট স্কিল?</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button class="chat-option bg-blue-100 p-3 rounded-lg text-sm font-bangla hover:bg-blue-200" data-message="টেকনিক্যাল দক্ষতা শিখতে চাই">💻 টেকনিক্যাল</button>
            <button class="chat-option bg-green-100 p-3 rounded-lg text-sm font-bangla hover:bg-green-200" data-message="সফট স্কিল শিখতে চাই">🎯 সফট স্কিল</button>
          </div>
          
          <div class="mt-3 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
            <p class="font-bangla text-sm font-bold text-green-900">💡 শিখে আয় করুন!</p>
            <p class="font-bangla text-xs mt-1 text-gray-700">দক্ষতা শিখে ভিডিও কোর্স বা বই তৈরি করে আয় করতে পারেন</p>
            <button class="chat-option mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="কোর্স তৈরি করে আয় করতে চাই">🎥 Create & Earn দেখুন</button>
          </div>`;
};

const getPostCareResponse = (input: string, user?: any): string => {
  if (input.includes('অগ্রগতি') || input.includes('progress')) {
    return `<p class="font-bangla">আপনার অগ্রগতি দেখে আমি খুশি! চলুন দেখি কতটা এগিয়েছেন:</p>
            <div class="mt-3 bg-purple-50 p-4 rounded-lg">
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg border-l-4 border-green-500">
                  <h6 class="font-bangla font-bold">✅ সম্পন্ন কাজ</h6>
                  <p class="font-bangla text-sm">৮টি সেশন সম্পন্ন, ৫টি দক্ষতা অর্জন</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                  <h6 class="font-bangla font-bold">📈 উন্নতি</h6>
                  <p class="font-bangla text-sm">মানসিক স্বাস্থ্য ৭৫% উন্নত</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-yellow-500">
                  <h6 class="font-bangla font-bold">🎯 পরবর্তী লক্ষ্য</h6>
                  <p class="font-bangla text-sm">নতুন দক্ষতা শেখা ও কমিউনিটিতে অংশগ্রহণ</p>
                </div>
              </div>
              <div class="mt-3">
                <button class="chat-option bg-purple-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="বিস্তারিত রিপোর্ট চাই">বিস্তারিত রিপোর্ট</button>
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="নতুন লক্ষ্য নির্ধারণ করতে চাই">নতুন লক্ষ্য</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">আপনার অগ্রগতি কেমন চলছে? পরবর্তী পদক্ষেপের জন্য প্রস্তুত?</p>
          <div class="mt-3 bg-purple-50 p-4 rounded-lg">
            <h5 class="font-bangla font-bold text-purple-800">আজকের চেক-ইন:</h5>
            <div class="mt-2 space-y-2">
              <button class="chat-option w-full bg-white p-2 rounded border-l-4 border-green-500 text-left font-bangla text-sm" data-message="আজ ভালো অনুভব করছি">😊 ভালো অনুভব করছি</button>
              <button class="chat-option w-full bg-white p-2 rounded border-l-4 border-yellow-500 text-left font-bangla text-sm" data-message="আজ ঠিক আছি">😐 ঠিক আছে</button>
              <button class="chat-option w-full bg-white p-2 rounded border-l-4 border-red-500 text-left font-bangla text-sm" data-message="আজ কিছুটা কষ্ট লাগছে">😔 কিছুটা কষ্ট লাগছে</button>
            </div>
          </div>`;
};

const getCommunityResponse = (input: string, user?: any): string => {
  return `<p class="font-bangla">কমিউনিটিতে স্বাগতম! এখানে আপনি সমমনা মানুষদের সাথে যুক্ত হতে পারেন।</p>
          <div class="mt-3 bg-teal-50 p-4 rounded-lg">
            <div class="space-y-2">
              <div class="bg-white p-3 rounded-lg border-l-4 border-teal-500">
                <h6 class="font-bangla font-bold">স্টুডেন্ট সাপোর্ট গ্রুপ</h6>
                <p class="font-bangla text-sm text-gray-600">১২৫+ সদস্য • সক্রিয়</p>
              </div>
              <div class="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                <h6 class="font-bangla font-bold">মেন্টরশিপ প্রোগ্রাম</h6>
                <p class="font-bangla text-sm text-gray-600">অভিজ্ঞদের সাথে যুক্ত হন</p>
              </div>
              <div class="bg-white p-3 rounded-lg border-l-4 border-green-500">
                <h6 class="font-bangla font-bold">স্কিল শেয়ারিং গ্রুপ</h6>
                <p class="font-bangla text-sm text-gray-600">দক্ষতা শেখান ও শিখুন</p>
              </div>
            </div>
            <button class="chat-option mt-3 w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bangla" data-message="কমিউনিটিতে যোগ দিতে চাই">যোগ দিন</button>
          </div>`;
};

const getCrisisResponse = (input: string, user?: any): string => {
  return `<div class="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p class="font-bangla text-red-800 font-bold mb-3">জরুরি সাহায্যের জন্য এখনই কল করুন:</p>
            <div class="space-y-2">
              <div class="bg-red-600 text-white p-3 rounded-lg text-center">
                <div class="font-bold text-lg">৯৯৯</div>
                <div class="font-bangla text-sm">জাতীয় জরুরি সেবা</div>
              </div>
              <div class="bg-green-600 text-white p-3 rounded-lg text-center">
                <div class="font-bold text-lg">১৬২৬৩</div>
                <div class="font-bangla text-sm">স্বাস্থ্য বাতায়ন</div>
              </div>
              <div class="bg-purple-600 text-white p-3 rounded-lg text-center">
                <div class="font-bold text-lg">১০৯</div>
                <div class="font-bangla text-sm">নারী ও শিশু হেল্পলাইন</div>
              </div>
              <div class="bg-blue-600 text-white p-3 rounded-lg text-center">
                <div class="font-bold text-lg">০৯৬৬৬৭৭৭২২২</div>
                <div class="font-bangla text-sm">কান পেতে রই (২৪/৭)</div>
              </div>
            </div>
            <p class="font-bangla text-sm text-red-700 mt-3">আপনি একা নন। সাহায্য এখানেই আছে।</p>
            <div class="mt-3">
              <button class="chat-option bg-red-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="এখনই কাউন্সেলর চাই">এখনই কাউন্সেলর</button>
              <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="আরো সাহায্য চাই">আরো সাহায্য</button>
            </div>
          </div>`;
};

const getAcademicResponse = (input: string, user?: any): string => {
  if (input.includes('exam') || input.includes('test') || input.includes('পরীক্ষা') || input.includes('প্রস্তুতি')) {
    return `<p class="font-bangla">পরীক্ষার প্রস্তুতি নিচ্ছেন? এই টিপসগুলো সাহায্য করবে:</p>
            <div class="mt-3 bg-indigo-50 p-4 rounded-lg">
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg border-l-4 border-indigo-500">
                  <h6 class="font-bangla font-bold">📅 সময় ব্যবস্থাপনা</h6>
                  <p class="font-bangla text-sm">পড়ার রুটিন তৈরি করুন</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-green-500">
                  <h6 class="font-bangla font-bold">🎯 কৌশলগত পড়া</h6>
                  <p class="font-bangla text-sm">গুরুত্বপূর্ণ টপিক আগে শেষ করুন</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                  <h6 class="font-bangla font-bold">🧠 মুখস্ত কৌশল</h6>
                  <p class="font-bangla text-sm">পুনরাবৃত্তি এবং নোট নেওয়া</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-yellow-500">
                  <h6 class="font-bangla font-bold">😌 স্ট্রেস কমানো</h6>
                  <p class="font-bangla text-sm">নিয়মিত বিরতি ও ব্যায়াম</p>
                </div>
              </div>

              <!-- YouTube Video Suggestions -->
              <div class="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
                <h6 class="font-bangla font-bold text-red-700 mb-2">📺 YouTube থেকে শিখুন:</h6>
                <div class="space-y-2 text-sm">
                  <a href="https://www.youtube.com/results?search_query=study+tips+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-indigo-500">
                    <span class="font-bangla">📚 Study Tips Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=exam+preparation+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-green-500">
                    <span class="font-bangla">📝 Exam Preparation Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=memory+techniques+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-purple-500">
                    <span class="font-bangla">🧠 Memory Techniques Bangla</span>
                  </a>
                </div>
                <p class="font-bangla text-xs mt-2 text-gray-600">💡 আমাদের কোর্স এখনো তৈরি হয়নি, YouTube এ ভালো রিসোর্স আছে!</p>
              </div>

              <div class="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg border-2 border-purple-400">
                <p class="font-bangla text-sm font-bold text-purple-900">🎓 আপনি পরীক্ষা বিশেষজ্ঞ?</p>
                <p class="font-bangla text-xs mt-1 text-purple-800">পরীক্ষার কৌশল নিয়ে ভিডিও কোর্স বা বই লিখে আয় করুন!</p>
                <button class="chat-option mt-2 bg-purple-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="পরীক্ষার টিপস নিয়ে কোর্স বানাতে চাই">🚀 Create & Earn</button>
              </div>

              <div class="mt-3">
                <button class="chat-option bg-indigo-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="পড়ার রুটিন তৈরি করতে চাই">রুটিন তৈরি</button>
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="আরো পড়ার টিপস চাই">আরো টিপস</button>
              </div>
            </div>`;
  }

  if (input.includes('পড়ার কৌশল') || input.includes('study') || input.includes('লক্ষ্য')) {
    return `<p class="font-bangla">কার্যকর পড়ার কৌশল শিখুন:</p>
            <div class="mt-3 bg-blue-50 p-4 rounded-lg">
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg border-l-4 border-blue-500">
                  <h6 class="font-bangla font-bold">🔍 সক্রিয় পড়া</h6>
                  <p class="font-bangla text-sm">প্রশ্ন করুন, নোট নিন, সারসংক্ষেপ করুন</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-green-500">
                  <h6 class="font-bangla font-bold">🍅 পোমোডোরো টেকনিক</h6>
                  <p class="font-bangla text-sm">২৫ মিনিট পড়া, ৫ মিনিট বিরতি</p>
                </div>
                <div class="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                  <h6 class="font-bangla font-bold">🗂️ সংগঠিত নোট</h6>
                  <p class="font-bangla text-sm">রঙিন কলম ও মাইন্ড ম্যাপ ব্যবহার করুন</p>
                </div>
              </div>

              <!-- YouTube Video Suggestions -->
              <div class="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
                <h6 class="font-bangla font-bold text-red-700 mb-2">📺 প্রস্তাবিত ভিডিও:</h6>
                <div class="space-y-2 text-sm">
                  <a href="https://www.youtube.com/results?search_query=pomodoro+technique+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-green-500">
                    <span class="font-bangla">🍅 Pomodoro Technique Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=note+taking+methods+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-purple-500">
                    <span class="font-bangla">📓 Note Taking Bangla</span>
                  </a>
                  <a href="https://www.youtube.com/results?search_query=study+motivation+bangla" target="_blank" class="block bg-white p-2 rounded hover:bg-red-100 border-l-4 border-yellow-500">
                    <span class="font-bangla">💪 Study Motivation Bangla</span>
                  </a>
                </div>
              </div>

              <div class="mt-4 bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border-2 border-green-400">
                <p class="font-bangla text-sm font-bold text-green-900">💡 শিক্ষক হতে চান?</p>
                <p class="font-bangla text-xs mt-1 text-green-800">আপনার পড়াশোনার কৌশল শেয়ার করে কোর্স/বই বানিয়ে আয় করুন!</p>
                <button class="chat-option mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="পড়ার কৌশল নিয়ে কোর্স বানাতে চাই">📚 কন্টেন্ট তৈরি করুন</button>
              </div>

              <div class="mt-3">
                <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="পোমোডোরো টেকনিক শিখতে চাই">পোমোডোরো শিখুন</button>
                <button class="chat-option bg-purple-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="নোট নেওয়ার কৌশল জানতে চাই">নোট কৌশল</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">পড়াশোনায় কোন সাহায্য চান? নির্দিষ্ট বিষয় বা সাধারণ টিপস?</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button class="chat-option bg-indigo-100 p-3 rounded-lg text-sm font-bangla hover:bg-indigo-200" data-message="পড়ার কৌশল জানতে চাই">📚 পড়ার কৌশল</button>
            <button class="chat-option bg-blue-100 p-3 rounded-lg text-sm font-bangla hover:bg-blue-200" data-message="পরীক্ষার প্রস্তুতি নিতে চাই">📝 পরীক্ষার টিপস</button>
          </div>
          
          <div class="mt-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
            <p class="font-bangla text-sm font-bold text-indigo-900">🎓 জ্ঞান শেয়ার করুন!</p>
            <p class="font-bangla text-xs mt-1 text-gray-700">আপনার একাডেমিক দক্ষতা দিয়ে কোর্স বানিয়ে আয় করতে পারেন</p>
            <button class="chat-option mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="একাডেমিক কোর্স বানিয়ে আয় করতে চাই">🎥 Create & Earn</button>
          </div>`;
};

const getGeneralResponse = (input: string, user?: any): string => {
  const userName = user?.name || 'বন্ধু';
  
  // Greetings
  if (input.includes('hello') || input.includes('hi') || input.includes('hey') || 
      input.includes('হ্যালো') || input.includes('হাই') || input.includes('হে')) {
    return `<p class="font-bangla">হ্যালো ${userName}! কেমন আছেন? আজ কিভাবে সাহায্য করতে পারি?</p>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <button class="chat-option bg-blue-100 p-2 rounded text-sm font-bangla" data-message="সাধারণ কথা বলতে চাই">💬 সাধারণ কথা</button>
              <button class="chat-option bg-green-100 p-2 rounded text-sm font-bangla" data-message="প্রশ্ন করতে চাই">❓ প্রশ্ন করুন</button>
            </div>`;
  }

  // Thanks
  if (input.includes('ধন্যবাদ') || input.includes('thanks') || input.includes('thank you')) {
    return `<p class="font-bangla">আপনাকেও ধন্যবাদ! আমি সবসময় আপনার সেবায় আছি। আর কোন সাহায্য লাগলে জানাবেন।</p>
            <div class="mt-3">
              <button class="chat-option bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bangla" data-message="আরো সাহায্য চাই">আরো সাহায্য চাই</button>
            </div>`;
  }

  // Want to talk / conversation starters
  if (input.includes('talk') || input.includes('chat') || input.includes('কথা') || 
      input.includes('বলতে') || input.includes('hmm') || input.includes('well')) {
    return `<p class="font-bangla">অবশ্যই! আমি এখানে আপনার কথা শুনতে আছি। কোন বিষয়ে কথা বলতে চান?</p>
            <div class="mt-3 space-y-2">
              <button class="chat-option w-full text-left p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg hover:from-blue-200 hover:to-blue-100" data-message="আমার পড়াশোনায় সাহায্য চাই">
                <div class="font-bangla font-bold">📚 একাডেমিক সাহায্য</div>
                <div class="font-bangla text-xs text-gray-600">পড়াশোনা, পরীক্ষা, লক্ষ্য নির্ধারণ</div>
              </button>
              <button class="chat-option w-full text-left p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-lg hover:from-green-200 hover:to-green-100" data-message="দৈনন্দিন সমস্যার সমাধান চাই">
                <div class="font-bangla font-bold">💡 দৈনন্দিন সমস্যা</div>
                <div class="font-bangla text-xs text-gray-600">জীবনের বিভিন্ন চ্যালেঞ্জের সমাধান</div>
              </button>
              <button class="chat-option w-full text-left p-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg hover:from-purple-200 hover:to-purple-100" data-message="ক্যারিয়ার পরামর্শ চাই">
                <div class="font-bangla font-bold">🚀 ক্যারিয়ার গাইডেন্স</div>
                <div class="font-bangla text-xs text-gray-600">ভবিষ্যৎ পরিকল্পনা ও দক্ষতা</div>
              </button>
            </div>`;
  }

  // Study/academic help
  if (input.includes('study') || input.includes('পড়া') || input.includes('reading') || 
      input.includes('একাডেমিক') || input.includes('academic')) {
    return `<p class="font-bangla">পড়াশোনায় সাহায্য চান? দারুণ! আমি আপনাকে সাহায্য করতে পারি।</p>
            <div class="mt-3 space-y-2">
              <button class="chat-option w-full text-left p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200" data-message="পরীক্ষার প্রস্তুতি নিতে চাই">
                <span class="font-bangla">📝 পরীক্ষার প্রস্তুতি</span>
              </button>
              <button class="chat-option w-full text-left p-2 bg-blue-100 rounded-lg hover:bg-blue-200" data-message="পড়ার কৌশল জানতে চাই">
                <span class="font-bangla">🎯 কার্যকর পড়ার কৌশল</span>
              </button>
              <button class="chat-option w-full text-left p-2 bg-green-100 rounded-lg hover:bg-green-200" data-message="সময় ব্যবস্থাপনা শিখতে চাই">
                <span class="font-bangla">⏰ সময় ব্যবস্থাপনা</span>
              </button>
              <button class="chat-option w-full text-left p-2 bg-purple-100 rounded-lg hover:bg-purple-200" data-message="লক্ষ্য নির্ধারণে সাহায্য চাই">
                <span class="font-bangla">🎓 লক্ষ্য নির্ধারণ</span>
              </button>
            </div>`;
  }

  // Legal help
  if (input.includes('legal') || input.includes('law') || input.includes('আইন') || 
      input.includes('rights') || input.includes('অধিকার')) {
    return `<p class="font-bangla">আইনি সাহায্য চান? আমি বাংলাদেশের আইন সম্পর্কে তথ্য দিতে পারি।</p>
            <div class="mt-3 bg-red-50 p-3 rounded-lg">
              <p class="font-bangla text-sm mb-2">বিশেষ বট ব্যবহার করুন:</p>
              <button class="chat-option w-full bg-red-500 text-white p-3 rounded-lg font-bangla hover:bg-red-600" data-message="আইনি অধিকার বট খুলতে চাই">
                ⚖️ আইনি অধিকার বট ব্যবহার করুন
              </button>
              <p class="font-bangla text-xs mt-2 text-gray-600">সাইবার আইন, ছাত্র অধিকার, হয়রানির বিরুদ্ধে আইন</p>
            </div>`;
  }

  // Health/wellness
  if (input.includes('health') || input.includes('stress') || input.includes('স্বাস্থ্য') || 
      input.includes('মানসিক') || input.includes('mental')) {
    return `<p class="font-bangla">স্বাস্থ্য ও মানসিক স্বাস্থ্য খুবই গুরুত্বপূর্ণ। আমি সাহায্য করতে পারি।</p>
            <div class="mt-3 bg-green-50 p-3 rounded-lg">
              <p class="font-bangla text-sm mb-2">বিশেষ বট ব্যবহার করুন:</p>
              <button class="chat-option w-full bg-green-500 text-white p-3 rounded-lg font-bangla hover:bg-green-600" data-message="স্বাস্থ্য বট খুলতে চাই">
                ❤️ স্বাস্থ্য ও মানসিক সহায়ক বট
              </button>
              <p class="font-bangla text-xs mt-2 text-gray-600">মানসিক স্বাস্থ্য, স্ট্রেস ম্যানেজমেন্ট, প্রজনন স্বাস্থ্য</p>
              <div class="mt-2 p-2 bg-white rounded text-sm">
                <p class="font-bangla font-bold">জরুরি হেল্পলাইন:</p>
                <p class="font-bangla">☎️ ১৬২৬৩ - স্বাস্থ্য বাতায়ন (24/7)</p>
              </div>
            </div>`;
  }

  // Skills/career
  if (input.includes('skill') || input.includes('career') || input.includes('job') || 
      input.includes('দক্ষতা') || input.includes('ক্যারিয়ার') || input.includes('চাকরি')) {
    return `<p class="font-bangla">দক্ষতা উন্নয়ন ও ক্যারিয়ার নিয়ে ভাবছেন? চমৎকার!</p>
            <div class="mt-3 bg-yellow-50 p-3 rounded-lg">
              <p class="font-bangla text-sm mb-2">বিশেষ বট ব্যবহার করুন:</p>
              <button class="chat-option w-full bg-yellow-500 text-white p-3 rounded-lg font-bangla hover:bg-yellow-600" data-message="দক্ষতা উন্নয়ন বট খুলতে চাই">
                💻 দক্ষতা উন্নয়ন বট
              </button>
              <p class="font-bangla text-xs mt-2 text-gray-600">টেকনিক্যাল দক্ষতা, সফট স্কিল, ক্যারিয়ার গাইডেন্স, ফ্রিল্যান্সিং</p>
            </div>`;
  }

  // Default response - more helpful and conversational
  return `<p class="font-bangla">আমি আপনার সাধারণ সহায়ক। আমি বিভিন্ন বিষয়ে সাহায্য করতে পারি! 😊</p>
          <div class="mt-3">
            <p class="font-bangla text-sm font-bold mb-2">জনপ্রিয় বিষয়সমূহ:</p>
            <div class="grid grid-cols-2 gap-2">
              <button class="chat-option bg-indigo-100 p-3 rounded-lg hover:bg-indigo-200" data-message="পড়াশোনায় সাহায্য চাই">
                <div class="text-2xl mb-1">📚</div>
                <div class="font-bangla text-xs">পড়াশোনা</div>
              </button>
              <button class="chat-option bg-red-100 p-3 rounded-lg hover:bg-red-200" data-message="আইনি সাহায্য চাই">
                <div class="text-2xl mb-1">⚖️</div>
                <div class="font-bangla text-xs">আইনি সাহায্য</div>
              </button>
              <button class="chat-option bg-green-100 p-3 rounded-lg hover:bg-green-200" data-message="স্বাস্থ্য পরামর্শ চাই">
                <div class="text-2xl mb-1">❤️</div>
                <div class="font-bangla text-xs">স্বাস্থ্য</div>
              </button>
              <button class="chat-option bg-yellow-100 p-3 rounded-lg hover:bg-yellow-200" data-message="দক্ষতা উন্নয়ন করতে চাই">
                <div class="text-2xl mb-1">💻</div>
                <div class="font-bangla text-xs">দক্ষতা উন্নয়ন</div>
              </button>
              <button class="chat-option bg-blue-100 p-3 rounded-lg hover:bg-blue-200" data-message="ক্যারিয়ার পরামর্শ চাই">
                <div class="text-2xl mb-1">🚀</div>
                <div class="font-bangla text-xs">ক্যারিয়ার</div>
              </button>
              <button class="chat-option bg-purple-100 p-3 rounded-lg hover:bg-purple-200" data-message="সাধারণ কথা বলতে চাই">
                <div class="text-2xl mb-1">💬</div>
                <div class="font-bangla text-xs">সাধারণ কথা</div>
              </button>
            </div>
            <div class="mt-3 p-2 bg-gray-50 rounded-lg">
              <p class="font-bangla text-xs text-gray-600">
                💡 <strong>টিপস:</strong> আপনি যেকোনো প্রশ্ন করতে পারেন বাংলা বা ইংরেজিতে। আমি সাহায্য করার চেষ্টা করব!
              </p>
            </div>
          </div>`;
};