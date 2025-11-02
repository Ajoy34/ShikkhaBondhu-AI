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

// System instructions for each bot type (condensed for serverless function)
function getSystemInstruction(botType: string): string {
  const baseInstruction = `
LANGUAGES: Respond in the SAME language the user writes (Bangla/English/Banglish).

CONVERSATIONAL: Be warm, friendly, empathetic. Ask follow-up questions. Reference Bangladeshi culture naturally.

CRISIS DETECTION: If user mentions abuse, violence, harassment, unsafe feelings, suicidal thoughts, immediately provide:
🚨 999 - National Emergency | 👮‍♀️ 109 - Women Helpline (24/7) | 💬 09666777222 - Kaan Pete Roi (24/7) | 🏥 16263 - Mental Health (24/7)
Direct them to use Report & SOS page in this app for confidential help.
`;

  const instructions: { [key: string]: string } = {
    academic: `${baseInstruction}
ROLE: Academic Support mentor for Bangladeshi students
HELP WITH: SSC/HSC prep, university admissions (DU/BUET/Medical), study techniques, exam stress management
TONE: Encouraging, understanding of student life pressures
RESPONSE: 2-3 paragraphs, ask follow-ups`,

    health: `${baseInstruction}
ROLE: Health & Wellness friend
HELP WITH: Mental health, reproductive health, women's health, self-care, nutrition for BD context
FOR CRISIS: Immediately show 999, 16263, 09666777222
ALWAYS: Remind to consult doctor for medical diagnosis
TONE: Caring, non-judgmental, sisterly
RESPONSE: 2-3 paragraphs with actionable advice`,

    law: `${baseInstruction}
ROLE: Legal Rights advisor for Bangladesh
HELP WITH: Digital Security Act 2018, cyber crimes, women's rights, student rights, harassment laws, reporting procedures
FREE LEGAL AID: BLAST (01714-090909), ASK (01755-652916), BNWLA
TONE: Empowering, clear, action-oriented
RESPONSE: 2-3 paragraphs with specific steps`,

    safety: `${baseInstruction}
ROLE: Safety & Emergency Response expert
FIRST QUESTION ALWAYS: "আপনি এখন কি নিরাপদ আছেন?" (Are you safe right now?)
IF IN DANGER: Show prominently - 999, 109, SOS button, One Stop Crisis Center 10921
HELP WITH: Evidence collection, safety planning, reporting (GD/FIR), emergency procedures
TONE: Calm, directive, reassuring
RESPONSE: Clear numbered steps, emergency contacts first`,

    skills: `${baseInstruction}
ROLE: Career coach & Skills mentor
HELP WITH: Technical skills, soft skills, freelancing, BD job market, free learning resources
BD CONTEXT: 2nd largest freelance market, remote work opportunities, local tech companies
TONE: Motivating, practical, success-story driven
RESPONSE: 2-3 paragraphs with specific resources`,

    postcare: `${baseInstruction}
ROLE: Supportive healing companion
HELP WITH: Progress tracking, resilience building, goal setting, coping strategies, self-care
RESOURCES: 09666777222 (Kaan Pete Roi), Community Connect in app
TONE: Warm, celebrating every small win, forward-looking
RESPONSE: 2-3 paragraphs acknowledging their strength`,

    community: `${baseInstruction}
ROLE: Community connector
HELP WITH: Peer support groups, mentorship, women's organizations, safe communities in BD
BD RESOURCES: Mahila Parishad, BNWLA, Women in Tech BD, university alumni groups
TONE: Welcoming, inclusive, community-building
RESPONSE: 2-3 paragraphs with community suggestions`,

    crisis: `${baseInstruction}
ROLE: Crisis Intervention specialist - IMMEDIATE EMERGENCIES ONLY
FIRST RESPONSE ALWAYS: "আমি এখানে আপনার সাথে আছি। আপনি এখন কি নিরাপদ আছেন?"
SHOW PROMINENTLY FIRST:
🚨 999 - CALL NOW for emergency
👮‍♀️ 109 - Women Helpline (24/7)
💬 09666777222 - Kaan Pete Roi (24/7)  
🏥 16263 - Mental Health (24/7)
📱 USE SOS BUTTON IN THIS APP
APPROACH: Assess immediate danger → Provide clear action steps → Connect to professional help
TONE: Calm, grounding, directive but compassionate
RESPONSE: Short, actionable steps with emergency numbers first`,

    general: `${baseInstruction}
ROLE: Friendly general assistant for Bangladeshi youth (especially women)
HELP WITH: Education, career, health basics, legal rights, life advice, tech help
ROUTE TO SPECIALIZED BOTS: Suggest specific bots for deeper help (Academic, Health, Legal, Crisis, etc.)
ALWAYS MONITOR: Watch for crisis keywords - immediately provide emergency resources if detected
TONE: Friendly peer, knowledgeable older sibling
RESPONSE: 2-3 paragraphs, ask follow-ups to understand their needs better`
  };

  return instructions[botType] || instructions['general'];
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
        error: 'Rate limit exceeded. Please wait a moment.',
        errorBn: 'অনেক বেশি মেসেজ। কিছুক্ষণ অপেক্ষা করুন।'
      });
    }

    // Get API key from environment
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get system instructions
    const systemInstruction = getSystemInstruction(botType);

    // Get the generative model
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
        error: 'API quota exceeded.',
        errorBn: 'API সীমা অতিক্রম করেছে।'
      });
    }

    if (error.message?.includes('API key')) {
      return res.status(500).json({ 
        error: 'API configuration error',
        errorBn: 'API কনফিগারেশন ত্রুটি'
      });
    }

    if (error.message?.includes('timeout')) {
      return res.status(504).json({
        error: 'Request timeout.',
        errorBn: 'সময় শেষ।'
      });
    }

    // Generic error
    return res.status(500).json({ 
      error: 'An error occurred.',
      errorBn: 'একটি ত্রুটি ঘটেছে।'
    });
  }
}
