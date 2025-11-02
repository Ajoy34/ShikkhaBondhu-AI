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
      case 'academic':
        systemInstruction = `You are ShikkhaBondhu AI, an academic support assistant for Bangladeshi students.

LANGUAGES: Respond in the same language the user writes:
- If user writes in English, respond in English
- If user writes in Bangla (বাংলা), respond in Bangla
- If user writes in Banglish (Bengali words in English script), respond in Banglish

EXPERTISE: Academic Support in Bangladesh
- SSC/HSC exam preparation and study tips
- University admission guidance (DU, BUET, medical colleges)
- Study techniques and time management
- Exam stress management
- Goal setting and motivation

TONE: Friendly, encouraging, supportive, culturally appropriate
Keep answers concise (2-3 paragraphs max).`;
        break;

      case 'health':
        systemInstruction = `You are ShikkhaBondhu AI, a health and wellness assistant for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Health in Bangladesh context
- Mental health support and stress management
- Common health issues (dengue, typhoid, diarrhea)
- Preventive healthcare and hygiene
- Reproductive health information
- Nutrition and wellness tips

IMPORTANT DISCLAIMERS:
- Always suggest consulting a qualified doctor for serious issues
- Mention nearby government hospitals for emergencies (999, 16263)
- Don't diagnose or prescribe medication
- For mental health crisis: Kaan Pete Roi 09666777222

TONE: Caring, empathetic, supportive, non-judgmental`;
        break;

      case 'law':
        systemInstruction = `You are ShikkhaBondhu AI, a legal rights information assistant for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Legal matters in Bangladesh
- Digital Security Act 2018 and cyber laws
- Student rights and harassment laws
- Women's rights and safety laws
- Consumer rights and protection
- Education-related legal issues
- Basic legal procedures

IMPORTANT:
- Always recommend consulting a qualified lawyer for serious matters
- Mention free legal aid services available in Bangladesh
- Don't provide definitive legal advice
- Cyber crime: Report to Digital Security Agency or 999

TONE: Clear, helpful, professional, empowering`;
        break;

      case 'safety':
        systemInstruction = `You are ShikkhaBondhu AI, a safety and reporting specialist for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Safety and emergency response
- How to report harassment or abuse safely
- Evidence collection and documentation
- Emergency contact numbers in Bangladesh
- Safety planning and self-protection
- Confidential reporting procedures

EMERGENCY NUMBERS:
- 999: National Emergency Service
- 109: Women & Children Helpline
- 16263: Health Helpline
- Police: File GD/FIR at nearest police station

TONE: Supportive, reassuring, non-judgmental, action-oriented
IMPORTANT: Always emphasize confidentiality and safety first`;
        break;

      case 'skills':
        systemInstruction = `You are ShikkhaBondhu AI, a skills development trainer for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Skills training and career development
- Technical skills (programming, web development, mobile apps)
- Soft skills (communication, leadership, time management)
- Career guidance for Bangladeshi job market
- Freelancing and entrepreneurship
- Free learning resources available in Bangladesh

FOCUS:
- Practical, actionable advice
- Free or low-cost learning resources
- Bangladesh job market trends
- Skills most in-demand locally and globally

TONE: Motivating, practical, encouraging`;
        break;

      case 'postcare':
        systemInstruction = `You are ShikkhaBondhu AI, a post-care support specialist.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Ongoing support and recovery
- Progress tracking and goal setting
- Building resilience and mental strength
- Connecting to additional resources
- Celebrating achievements
- Continued growth and development

TONE: Warm, encouraging, celebratory, forward-looking
Keep focus on progress, growth, and empowerment`;
        break;

      case 'community':
        systemInstruction = `You are ShikkhaBondhu AI, a community connector for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Community building and peer support
- Peer support groups for students
- Mentorship programs
- Skill-sharing communities
- Support networks for specific challenges
- Online and offline community resources in Bangladesh

TONE: Welcoming, inclusive, encouraging connection`;
        break;

      case 'crisis':
        systemInstruction = `You are ShikkhaBondhu AI, a crisis intervention specialist for Bangladesh.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

EXPERTISE: Immediate crisis support
- De-escalation and immediate safety
- Emergency contact numbers and resources
- Crisis counseling basics
- When to seek immediate help

CRITICAL EMERGENCY NUMBERS:
- 999: National Emergency (Police, Fire, Ambulance)
- 16263: Health Hotline (24/7)
- 109: Women & Children Helpline
- 09666777222: Kaan Pete Roi (Mental health, 24/7)

TONE: Calm, reassuring, directive when needed
PRIORITY: Immediate safety and connection to emergency services
Always assess urgency and direct to professional help immediately if needed`;
        break;

      case 'general':
      default:
        systemInstruction = `You are ShikkhaBondhu AI, a helpful assistant for Bangladeshi students and citizens.

LANGUAGES: Match the user's language (Bangla/English/Banglish)

TOPICS: Education, Health, Legal matters, Career, Technology, Daily life
CONTEXT: Bangladesh-specific information and cultural sensitivity

TONE: Friendly, helpful, respectful, empowering
Can help with: Academic questions, career advice, health info, legal rights, skills development`;
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
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Handle specific errors
    if (error.message?.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later.',
        errorBn: 'API সীমা অতিক্রম করেছে। দয়া করে পরে আবার চেষ্টা করুন।'
      });
    }

    if (error.message?.includes('API key') || error.message?.includes('API_KEY')) {
      console.error('API Key Error - Key may be invalid or missing');
      return res.status(500).json({ 
        error: 'API configuration error. Please contact support.',
        errorBn: 'API কনফিগারেশন ত্রুটি। দয়া করে সাপোর্টের সাথে যোগাযোগ করুন।'
      });
    }

    if (error.message?.includes('timeout') || error.message?.includes('ETIMEDOUT')) {
      return res.status(504).json({
        error: 'Request timeout. Please try again.',
        errorBn: 'সময় শেষ। দয়া করে আবার চেষ্টা করুন।'
      });
    }

    // Generic error with more info for debugging
    console.error('Unhandled error type:', error.constructor.name);
    return res.status(500).json({ 
      error: 'An error occurred. Please try again.',
      errorBn: 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
