// Points System - Award points for various user actions

export const POINT_VALUES = {
  SIGNUP_BONUS: 100,
  CREATE_CAMPAIGN: 50,
  CHAT_MESSAGE: 5,
  SHARE_CAMPAIGN: 10,
  SUBMIT_REPORT: 25,
  COMMENT_ON_CAMPAIGN: 3,
  LIKE_CAMPAIGN: 2,
  DONATE_TO_CAMPAIGN: 15,
  COMPLETE_PROFILE: 30,
  DAILY_LOGIN: 5,
  FACT_CHECK: 10,
  CREATE_COURSE: 40,
  PUBLISH_BOOK: 50,
} as const;

export const POINT_DESCRIPTIONS = {
  SIGNUP_BONUS: { en: "Welcome Bonus!", bn: "স্বাগত বোনাস!" },
  CREATE_CAMPAIGN: { en: "Campaign Created", bn: "ক্যাম্পেইন তৈরি হয়েছে" },
  CHAT_MESSAGE: { en: "Chat Interaction", bn: "চ্যাট করার জন্য" },
  SHARE_CAMPAIGN: { en: "Campaign Shared", bn: "শেয়ার করার জন্য" },
  SUBMIT_REPORT: { en: "Report Submitted", bn: "রিপোর্ট জমা দেওয়া" },
  COMMENT_ON_CAMPAIGN: { en: "Comment Added", bn: "মন্তব্য যোগ করা" },
  LIKE_CAMPAIGN: { en: "Campaign Liked", bn: "লাইক করার জন্য" },
  DONATE_TO_CAMPAIGN: { en: "Donation Made", bn: "দান করার জন্য" },
  COMPLETE_PROFILE: { en: "Profile Completed", bn: "প্রোফাইল সম্পূর্ণ" },
  DAILY_LOGIN: { en: "Daily Login", bn: "দৈনিক লগইন" },
  FACT_CHECK: { en: "Fact Check Done", bn: "ফ্যাক্ট চেক করা" },
  CREATE_COURSE: { en: "Course Created", bn: "কোর্স তৈরি" },
  PUBLISH_BOOK: { en: "Book Published", bn: "বই প্রকাশিত" },
} as const;

export type PointAction = keyof typeof POINT_VALUES;

export interface PointAward {
  action: PointAction;
  points: number;
  timestamp: Date;
}

// Daily limits to prevent abuse
const DAILY_LIMITS = {
  CHAT_MESSAGE: 50, // Max 50 chat messages per day (250 points)
  LIKE_CAMPAIGN: 100, // Max 100 likes per day (200 points)
  COMMENT_ON_CAMPAIGN: 30, // Max 30 comments per day (90 points)
  SHARE_CAMPAIGN: 20, // Max 20 shares per day (200 points)
};

// Track daily actions (in real app, this would be in backend/localStorage)
let dailyActionCounts: Record<string, Record<string, number>> = {};

// Reset daily counts (in real app, this would be a cron job)
export const resetDailyCounts = () => {
  dailyActionCounts = {};
};

// Check if action is within daily limit
const isWithinDailyLimit = (userId: string, action: PointAction): boolean => {
  if (!(action in DAILY_LIMITS)) return true;
  
  const today = new Date().toDateString();
  const userKey = `${userId}_${today}`;
  
  if (!dailyActionCounts[userKey]) {
    dailyActionCounts[userKey] = {};
  }
  
  const currentCount = dailyActionCounts[userKey][action] || 0;
  const limit = DAILY_LIMITS[action as keyof typeof DAILY_LIMITS];
  
  return currentCount < limit;
};

// Increment action count
const incrementActionCount = (userId: string, action: PointAction) => {
  const today = new Date().toDateString();
  const userKey = `${userId}_${today}`;
  
  if (!dailyActionCounts[userKey]) {
    dailyActionCounts[userKey] = {};
  }
  
  dailyActionCounts[userKey][action] = (dailyActionCounts[userKey][action] || 0) + 1;
};

// Award points for an action
export const awardPoints = (
  userId: string,
  action: PointAction,
  onPointsAwarded?: (points: number, action: PointAction) => void
): boolean => {
  // Check daily limit
  if (!isWithinDailyLimit(userId, action)) {
    console.log(`Daily limit reached for ${action}`);
    return false;
  }
  
  const points = POINT_VALUES[action];
  
  // Increment count for limited actions
  if (action in DAILY_LIMITS) {
    incrementActionCount(userId, action);
  }
  
  // Call callback to update UI
  if (onPointsAwarded) {
    onPointsAwarded(points, action);
  }
  
  // In real app, this would make an API call to backend
  console.log(`✓ Awarded ${points} points for ${action}`);
  
  return true;
};

// Get remaining daily actions
export const getRemainingDailyActions = (userId: string, action: PointAction): number => {
  if (!(action in DAILY_LIMITS)) return Infinity;
  
  const today = new Date().toDateString();
  const userKey = `${userId}_${today}`;
  const currentCount = dailyActionCounts[userKey]?.[action] || 0;
  const limit = DAILY_LIMITS[action as keyof typeof DAILY_LIMITS];
  
  return Math.max(0, limit - currentCount);
};

// Calculate achievement level based on points
export const getAchievementLevel = (points: number) => {
  if (points >= 2500) return { title: "Legend", titleBn: "কিংবদন্তি", color: "from-purple-500 to-pink-500", textColor: "text-purple-700", icon: "👑" };
  if (points >= 2000) return { title: "Impact Leader", titleBn: "প্রভাব নেতা", color: "from-red-500 to-orange-500", textColor: "text-red-700", icon: "🌟" };
  if (points >= 1500) return { title: "Community Hero", titleBn: "কমিউনিটি হিরো", color: "from-orange-500 to-yellow-500", textColor: "text-orange-700", icon: "🦸" };
  if (points >= 1000) return { title: "Change Maker", titleBn: "পরিবর্তনকারী", color: "from-green-500 to-emerald-500", textColor: "text-green-700", icon: "💪" };
  if (points >= 500) return { title: "Helper", titleBn: "সহায়ক", color: "from-blue-500 to-indigo-500", textColor: "text-blue-700", icon: "🤝" };
  return { title: "Beginner", titleBn: "শিক্ষানবিস", color: "from-gray-400 to-gray-500", textColor: "text-gray-700", icon: "🌱" };
};
