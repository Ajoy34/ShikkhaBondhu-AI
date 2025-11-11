/**
 * NCTB Book Helper - Uses Gemini to directly read and answer from PDFs
 * With Knowledge Base for better chapter/topic detection
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { findChapterInfo, getBookChapters } from './nctbKnowledgeBase';

// NCTB Books available in the system
export const NCTB_BOOKS = [
  {
    id: 'bangla-sahopat-9',
    title: 'বাংলা সহপাঠ (Class 9)',
    filename: 'Secondary - 2018 - Class - 9&10 - Bangla sohopat class-9  PDF Web .pdf',
    class: '9-10',
    subject: 'Bangla'
  },
  {
    id: 'higher-math-9-10',
    title: 'উচ্চতর গণিত (Higher Math - Class 9-10)',
    filename: 'Secondary - 2018 - Class - 9&10 - Higher Math 9 BV  PDF Web .pdf',
    class: '9-10',
    subject: 'Mathematics'
  },
  {
    id: 'physics-9-10',
    title: 'পদার্থবিজ্ঞান (Physics - Class 9-10)',
    filename: 'Secondary - 2018 - Class - 9&10 - Physics Class 9-10 BV  PDF Web .pdf',
    class: '9-10',
    subject: 'Physics'
  }
];

/**
 * Ask a question about NCTB books using Gemini
 */
export async function askNCTBQuestion(question: string, apiKey: string): Promise<{
  answer: string;
  bookUsed?: string;
  error?: string;
}> {
  try {
    if (!apiKey || apiKey === 'your-api-key-here') {
      return {
        answer: '',
        error: 'API_KEY_MISSING'
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash' 
    });

    // Check which book might be relevant based on keywords
    const bookToUse = detectRelevantBook(question);
    
    if (!bookToUse) {
      return {
        answer: '',
        error: 'দয়া করে আরো নির্দিষ্টভাবে বলুন কোন বই থেকে প্রশ্ন করছেন। (Please specify which book - Bangla, Math, or Physics)'
      };
    }

    // Try to find specific chapter info from knowledge base
    const chapterInfo = findChapterInfo(bookToUse.id, question);
    console.log('Chapter detection:', chapterInfo);

    // Fetch PDF from public folder
    const bookUrl = `/nctb-books/${bookToUse.filename}`;
    
    let pdfBase64: string;
    try {
      const response = await fetch(bookUrl);
      if (!response.ok) {
        return {
          answer: '',
          error: `বইটি লোড করতে সমস্যা হয়েছে: ${bookToUse.title}`
        };
      }
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      // Convert to base64
      pdfBase64 = btoa(String.fromCharCode(...bytes));
    } catch (fetchError) {
      return {
        answer: '',
        error: `নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।`
      };
    }

    // Create enhanced prompt with chapter context
    let prompt = `আপনি একজন বাংলাদেশি শিক্ষক। এই NCTB পাঠ্যবই থেকে নিচের প্রশ্নের উত্তর দিন:

বই: ${bookToUse.title}
শ্রেণী: ${bookToUse.class}
বিষয়: ${bookToUse.subject}`;

    // Add chapter context if found
    if (chapterInfo.chapter) {
      prompt += `\n\n📌 সম্ভাব্য অধ্যায়:
অধ্যায় ${chapterInfo.chapter.number}: ${chapterInfo.chapter.title}
পৃষ্ঠা: ${chapterInfo.chapter.pages}
বিষয়সমূহ: ${chapterInfo.chapter.topics.join(', ')}

দয়া করে এই অধ্যায়ের পৃষ্ঠাগুলো বিশেষভাবে দেখুন এবং উত্তর খুঁজুন।`;
    }

    prompt += `\n\nপ্রশ্ন: ${question}

নির্দেশনা:
1. এই PDF বইটি একটি স্ক্যান করা বই (scanned images)। দয়া করে প্রতিটি পৃষ্ঠা সাবধানে OCR করে পড়ুন।
2. শুধুমাত্র এই বই থেকে তথ্য ব্যবহার করুন - বাইরের জ্ঞান নয়
3. উত্তর বাংলায় দিন (প্রশ্ন যে ভাষায়ই হোক)
4. যদি সমাধান/ব্যাখ্যা চাওয়া হয়, ধাপে ধাপে দেখান এবং সূত্র/নিয়ম ব্যাখ্যা করুন
5. **অবশ্যই** বইয়ের কোন পৃষ্ঠা/অধ্যায় থেকে পেয়েছেন তা উল্লেখ করুন
6. যদি বইয়ে খুঁজে না পান, স্পষ্টভাবে বলুন "এই বইয়ে এই তথ্য পাওয়া যায়নি"

উত্তর:`;

    // Send to Gemini with PDF
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64
        }
      },
      { text: prompt }
    ]);

    const response = result.response;
    const answer = response.text();

    return {
      answer,
      bookUsed: bookToUse.title
    };

  } catch (error: any) {
    console.error('NCTB Question Error:', error);
    return {
      answer: '',
      error: error.message || 'একটি ত্রুটি ঘটেছে। (An error occurred)'
    };
  }
}

/**
 * Detect which book is relevant based on the question
 */
function detectRelevantBook(question: string): typeof NCTB_BOOKS[0] | null {
  const lowerQ = question.toLowerCase();
  
  // Math keywords
  if (lowerQ.includes('math') || lowerQ.includes('গণিত') || 
      lowerQ.includes('equation') || lowerQ.includes('সমীকরণ') ||
      lowerQ.includes('algebra') || lowerQ.includes('geometry') ||
      lowerQ.includes('chapter 11') || lowerQ.includes('অধ্যায়')) {
    return NCTB_BOOKS[1]; // Higher Math
  }
  
  // Physics keywords
  if (lowerQ.includes('physics') || lowerQ.includes('পদার্থ') ||
      lowerQ.includes('force') || lowerQ.includes('বল') ||
      lowerQ.includes('motion') || lowerQ.includes('গতি') ||
      lowerQ.includes('energy') || lowerQ.includes('শক্তি')) {
    return NCTB_BOOKS[2]; // Physics
  }
  
  // Bangla keywords
  if (lowerQ.includes('bangla') || lowerQ.includes('বাংলা') ||
      lowerQ.includes('সাহিত্য') || lowerQ.includes('কবিতা') ||
      lowerQ.includes('গল্প') || lowerQ.includes('রচনা')) {
    return NCTB_BOOKS[0]; // Bangla
  }
  
  // Default to Math if asking for "solutions" or "solve"
  if (lowerQ.includes('solution') || lowerQ.includes('solve') || 
      lowerQ.includes('সমাধান') || lowerQ.includes('সমাধান করুন')) {
    return NCTB_BOOKS[1]; // Higher Math
  }
  
  return null;
}

/**
 * Get list of available books
 */
export function getAvailableBooks(): string {
  return NCTB_BOOKS.map((book, index) => 
    `${index + 1}. ${book.title} (${book.subject})`
  ).join('\n');
}
