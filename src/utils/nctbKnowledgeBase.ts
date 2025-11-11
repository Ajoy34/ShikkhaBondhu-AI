/**
 * NCTB Books Knowledge Base
 * Pre-defined chapter structures to help the AI find content faster
 */

export const BOOK_STRUCTURES = {
  'higher-math-9-10': {
    title: 'উচ্চতর গণিত (নবম-দশম শ্রেণি)',
    chapters: [
      { number: 1, title: 'ম্যাট্রিক্স ও নির্ণায়ক', topics: ['ম্যাট্রিক্স', 'নির্ণায়ক', 'সহগুণক'], pages: '1-20' },
      { number: 2, title: 'সেট ও ফাংশন', topics: ['সেট', 'ফাংশন', 'সেট অপারেশন'], pages: '21-45' },
      { number: 3, title: 'বীজগাণিতিক রাশি', topics: ['বহুপদী', 'উৎপাদক', 'ভাগশেষ'], pages: '46-70' },
      { number: 4, title: 'সূচক ও লগারিদম', topics: ['সূচক', 'লগারিদম', 'সূচকীয় সমীকরণ'], pages: '71-95' },
      { number: 5, title: 'সমান্তর ও গুণোত্তর অনুক্রম', topics: ['সমান্তর', 'গুণোত্তর', 'ধারা'], pages: '96-120' },
      { number: 6, title: 'সমীকরণ', topics: ['দ্বিঘাত সমীকরণ', 'সরল সমীকরণ', 'সমসাময়িক সমীকরণ'], pages: '121-150' },
      { number: 7, title: 'ত্রিভুজ', topics: ['সদৃশতা', 'পিথাগোরাস', 'ক্ষেত্রফল'], pages: '151-180' },
      { number: 8, title: 'দূরত্ব', topics: ['বিন্দুর দূরত্ব', 'সরলরেখার দূরত্ব'], pages: '181-200' },
      { number: 9, title: 'বৃত্ত', topics: ['বৃত্তের সমীকরণ', 'স্পর্শক', 'ছেদবিন্দু'], pages: '201-225' },
      { number: 10, title: 'কোণ', topics: ['কোণ পরিমাপ', 'রেডিয়ান', 'ডিগ্রি'], pages: '226-245' },
      { number: 11, title: 'ত্রিকোণমিতিক অনুপাত', topics: ['sin', 'cos', 'tan', 'ত্রিকোণমিতিক সমীকরণ', 'অনুপাত'], pages: '246-280' },
      { number: 12, title: 'ত্রিকোণমিতিক সূত্র', topics: ['যোগফল সূত্র', 'গুণফল সূত্র'], pages: '281-310' },
      { number: 13, title: 'সমতল জ্যামিতি', topics: ['সমতল', 'স্থানাঙ্ক জ্যামিতি'], pages: '311-340' }
    ]
  },
  
  'physics-9-10': {
    title: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি)',
    chapters: [
      { number: 1, title: 'ভৌত রাশি এবং পরিমাপ', topics: ['ভৌত রাশি', 'পরিমাপ', 'একক', 'মাত্রা'], pages: '1-25' },
      { number: 2, title: 'গতি', topics: ['সরণ', 'বেগ', 'ত্বরণ', 'সমত্বরণ'], pages: '26-55' },
      { number: 3, title: 'বল', topics: ['বল', 'নিউটনের সূত্র', 'ঘর্ষণ'], pages: '56-85' },
      { number: 4, title: 'কাজ শক্তি ও ক্ষমতা', topics: ['কাজ', 'শক্তি', 'ক্ষমতা', 'শক্তির রূপান্তর'], pages: '86-115' },
      { number: 5, title: 'পদার্থের অবস্থা ও চাপ', topics: ['কঠিন', 'তরল', 'গ্যাস', 'চাপ'], pages: '116-145' },
      { number: 6, title: 'বস্তুর উপর তাপের প্রভাব', topics: ['তাপ', 'উষ্ণতা', 'প্রসারণ'], pages: '146-175' },
      { number: 7, title: 'তরঙ্গ', topics: ['তরঙ্গ', 'কম্পন', 'শব্দ'], pages: '176-205' },
      { number: 8, title: 'আলো', topics: ['প্রতিফলন', 'প্রতিসরণ', 'লেন্স'], pages: '206-245' },
      { number: 9, title: 'স্থির বিদ্যুৎ', topics: ['চার্জ', 'বিভব', 'ধারকত্ব'], pages: '246-275' },
      { number: 10, title: 'চল বিদ্যুৎ', topics: ['তড়িৎ প্রবাহ', 'রোধ', 'ওহমের সূত্র'], pages: '276-310' },
      { number: 11, title: 'চুম্বকত্ব', topics: ['চুম্বক', 'চৌম্বক ক্ষেত্র'], pages: '311-340' },
      { number: 12, title: 'আধুনিক পদার্থবিদ্যা', topics: ['পরমাণু', 'তেজস্ক্রিয়তা'], pages: '341-370' },
      { number: 13, title: 'বিশ্ব ও মহাবিশ্ব', topics: ['সৌরজগৎ', 'গ্রহ', 'নক্ষত্র'], pages: '371-410' }
    ]
  },
  
  'bangla-class-9': {
    title: 'বাংলা সহপাঠ (নবম শ্রেণি)',
    chapters: [
      { number: 1, title: 'গদ্য: জীবন ও বৃক্ষ', topics: ['গদ্য', 'জীবন', 'বৃক্ষ'], pages: '1-10' },
      { number: 2, title: 'কবিতা: কপোতাক্ষ নদ', topics: ['কবিতা', 'নদ', 'মাইকেল মধুসূদন'], pages: '11-15' },
      { number: 3, title: 'গল্প: সাহিত্যের রূপ ও রীতি', topics: ['সাহিত্য', 'রূপ', 'রীতি'], pages: '16-25' },
      { number: 4, title: 'প্রবন্ধ: মানব কল্যাণ', topics: ['প্রবন্ধ', 'মানব কল্যাণ'], pages: '26-35' },
      { number: 5, title: 'নাটক: বহিপীর', topics: ['নাটক', 'বহিপীর'], pages: '36-50' },
      { number: 6, title: 'ব্যাকরণ: সমাস', topics: ['সমাস', 'দ্বন্দ্ব', 'তৎপুরুষ', 'কর্মধারয়'], pages: '51-60' },
      { number: 7, title: 'ব্যাকরণ: সন্ধি', topics: ['সন্ধি', 'স্বরসন্ধি', 'ব্যঞ্জনসন্ধি'], pages: '61-70' }
    ]
  }
};

/**
 * Find chapter info based on query
 */
export function findChapterInfo(bookId: string, query: string): {
  chapter: any | null;
  confidence: string;
} {
  const book = BOOK_STRUCTURES[bookId as keyof typeof BOOK_STRUCTURES];
  if (!book) return { chapter: null, confidence: 'none' };
  
  const lowerQ = query.toLowerCase();
  
  // Try to find chapter by number
  const chapterMatch = lowerQ.match(/(?:chapter|অধ্যায়|ch)\s*(\d+)/i);
  if (chapterMatch) {
    const chNum = parseInt(chapterMatch[1]);
    const chapter = book.chapters.find(ch => ch.number === chNum);
    if (chapter) {
      return { chapter, confidence: 'high' };
    }
  }
  
  // Try to match by title or topics
  let bestMatch: any = null;
  let maxScore = 0;
  
  book.chapters.forEach(chapter => {
    let score = 0;
    
    // Check chapter title
    if (lowerQ.includes(chapter.title.toLowerCase())) {
      score += 10;
    }
    
    // Check topics
    chapter.topics.forEach((topic: string) => {
      if (lowerQ.includes(topic.toLowerCase())) {
        score += 5;
      }
    });
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = chapter;
    }
  });
  
  if (maxScore > 0) {
    const confidence = maxScore >= 10 ? 'high' : maxScore >= 5 ? 'medium' : 'low';
    return { chapter: bestMatch, confidence };
  }
  
  return { chapter: null, confidence: 'none' };
}

/**
 * Get all chapter info for a book
 */
export function getBookChapters(bookId: string) {
  return BOOK_STRUCTURES[bookId as keyof typeof BOOK_STRUCTURES];
}
