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
              <p class="font-bangla text-sm mt-3 text-gray-600">বিনামূল্যে রিসোর্স এবং কোর্স উপলব্ধ!</p>
              <div class="mt-3">
                <button class="chat-option bg-yellow-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="প্রোগ্রামিং কোর্স শুরু করতে চাই">কোর্স শুরু করুন</button>
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
              <div class="mt-3">
                <button class="chat-option bg-green-600 text-white px-3 py-1 rounded text-sm font-bangla mr-2" data-message="সফট স্কিল কোর্স চাই">কোর্স দেখুন</button>
                <button class="chat-option bg-blue-600 text-white px-3 py-1 rounded text-sm font-bangla" data-message="ক্যারিয়ার পরামর্শ চাই">ক্যারিয়ার গাইড</button>
              </div>
            </div>`;
  }

  return `<p class="font-bangla">কোন দক্ষতা শিখতে চান? টেকনিক্যাল না সফট স্কিল?</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button class="chat-option bg-blue-100 p-3 rounded-lg text-sm font-bangla hover:bg-blue-200" data-message="টেকনিক্যাল দক্ষতা শিখতে চাই">💻 টেকনিক্যাল</button>
            <button class="chat-option bg-green-100 p-3 rounded-lg text-sm font-bangla hover:bg-green-200" data-message="সফট স্কিল শিখতে চাই">🎯 সফট স্কিল</button>
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
          </div>`;
};

const getGeneralResponse = (input: string, user?: any): string => {
  if (input.includes('hello') || input.includes('hi') || input.includes('হ্যালো') || input.includes('হাই')) {
    const userName = user?.name || 'বন্ধু';
    return `<p class="font-bangla">হ্যালো ${userName}! কেমন আছেন? আজ কিভাবে সাহায্য করতে পারি?</p>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <button class="chat-option bg-blue-100 p-2 rounded text-sm font-bangla" data-message="সাধারণ কথা বলতে চাই">💬 সাধারণ কথা</button>
              <button class="chat-option bg-green-100 p-2 rounded text-sm font-bangla" data-message="প্রশ্ন করতে চাই">❓ প্রশ্ন করুন</button>
            </div>`;
  }

  if (input.includes('ধন্যবাদ') || input.includes('thanks') || input.includes('thank you')) {
    return `<p class="font-bangla">আপনাকেও ধন্যবাদ! আমি সবসময় আপনার সেবায় আছি। আর কোন সাহায্য লাগলে জানাবেন।</p>
            <div class="mt-3">
              <button class="chat-option bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bangla" data-message="আরো সাহায্য চাই">আরো সাহায্য চাই</button>
            </div>`;
  }

  return `<p class="font-bangla">দুঃখিত, আপনার প্রশ্নটি স্পষ্ট বুঝতে পারিনি। অনুগ্রহ করে আরও নির্দিষ্টভাবে জিজ্ঞাসা করুন।</p>
          <div class="mt-3">
            <p class="font-bangla text-sm text-gray-600">আপনি এই বিষয়গুলো নিয়ে জিজ্ঞাসা করতে পারেন:</p>
            <div class="mt-2 grid grid-cols-2 gap-1 text-xs">
              <button class="chat-option bg-gray-100 p-2 rounded font-bangla hover:bg-gray-200" data-message="আইনি সাহায্য চাই">আইনি সাহায্য</button>
              <button class="chat-option bg-gray-100 p-2 rounded font-bangla hover:bg-gray-200" data-message="স্বাস্থ্য পরামর্শ চাই">স্বাস্থ্য পরামর্শ</button>
              <button class="chat-option bg-gray-100 p-2 rounded font-bangla hover:bg-gray-200" data-message="দক্ষতা উন্নয়ন করতে চাই">দক্ষতা উন্নয়ন</button>
              <button class="chat-option bg-gray-100 p-2 rounded font-bangla hover:bg-gray-200" data-message="পড়াশোনায় সাহায্য চাই">পড়াশোনা</button>
            </div>
          </div>`;
};