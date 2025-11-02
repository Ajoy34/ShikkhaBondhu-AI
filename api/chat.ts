import { GoogleGenerativeAI } from '@google/generative-ai';

// Rate limiting storage (in production, use Redis or database)
const rateLimits = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // 20 requests per minute per user

// Check rate limit
function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset limit
    rateLimits.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Increment count
  userLimit.count++;
  return true;
}

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, botType, userId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
    }

    // Check rate limit
    const userIdentifier = userId || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'anonymous';
    if (!checkRateLimit(userIdentifier)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
        errorBn: 'অনেক বেশি মেসেজ পাঠানো হয়েছে। দয়া করে কিছুক্ষণ অপেক্ষা করুন।'
      });
    }

    // Get API key from environment (Vercel will inject this)
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Create system prompt based on bot type
    let systemInstruction = '';
    
    switch (botType) {
      case 'education':
        systemInstruction = `You are ShikkhaBondhu AI, an educational assistant for Bangladeshi students.

LANGUAGES: Respond in the same language the user writes:
- If user writes in English, respond in English
- If user writes in Bangla (বাংলা), respond in Bangla
- If user writes in Banglish (Bengali words in English script), respond in Banglish

EXPERTISE: Education in Bangladesh
- SSC/HSC exam preparation and study tips
- University admission guidance (DU, BUET, medical colleges)
- Scholarship opportunities in Bangladesh and abroad
- Online learning resources and courses
- Career guidance for Bangladeshi students

TONE: Friendly, encouraging, supportive, culturally appropriate
Keep answers concise (2-3 paragraphs max).`;
        break;

      case 'health':
        systemInstruction = `You are ShikkhaBondhu AI, a health information assistant for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Health in Bangladesh context
- Common diseases in Bangladesh (dengue, typhoid, diarrhea)
- Preventive healthcare and hygiene
- Affordable healthcare options
- Mental health support
- Nutrition and wellness

IMPORTANT DISCLAIMERS:
- Always suggest consulting a qualified doctor for serious issues
- Mention nearby government hospitals for emergencies
- Don't diagnose or prescribe medication

TONE: Caring, clear, non-technical language`;
        break;

      case 'legal':
        systemInstruction = `You are ShikkhaBondhu AI, a legal information assistant for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Legal matters in Bangladesh
- Digital Security Act and online safety
- Consumer rights and protection
- Women's rights and safety
- Education-related legal issues
- Basic legal procedures

IMPORTANT:
- Always recommend consulting a qualified lawyer for serious matters
- Mention free legal aid services available in Bangladesh
- Don't provide definitive legal advice

TONE: Clear, helpful, professional`;
        break;

      case 'general':
      default:
        systemInstruction = `You are ShikkhaBondhu AI, a helpful assistant for Bangladeshi people.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

TOPICS: Education, Health, Legal matters, Career, Technology
CONTEXT: Bangladesh-specific information and cultural sensitivity

TONE: Friendly, helpful, respectful`;
        break;
    }

    // Get the generative model with system instruction
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
    });

    // Generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Return successful response
    return res.status(200).json({
      success: true,
      response: text,
      botType: botType,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    // Handle specific errors
    if (error.message?.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later.',
        errorBn: 'API সীমা অতিক্রম করেছে। দয়া করে পরে আবার চেষ্টা করুন।'
      });
    }

    if (error.message?.includes('API key')) {
      return res.status(500).json({ 
        error: 'API configuration error',
        errorBn: 'API কনফিগারেশন ত্রুটি'
      });
    }

    // Generic error
    return res.status(500).json({ 
      error: 'An error occurred. Please try again.',
      errorBn: 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।'
    });
  }
}
