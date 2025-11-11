import { GoogleGenerativeAI } from '@google/generative-ai';
import { findChapterInfo } from './nctbKnowledgeBase';

export interface MindMapResult {
  mindMap: string;
  bookUsed: string;
  chapterInfo?: {
    title: string;
    number: number;
    topics: string[];
  };
  error?: string;
}

/**
 * Generate a mind map for an NCTB book chapter
 */
export const generateNCTBMindMap = async (
  query: string,
  apiKey: string
): Promise<MindMapResult> => {
  try {
    // Detect which book and chapter
    const queryLower = query.toLowerCase();
    let bookId = '';
    let bookName = '';

    if (queryLower.includes('math') || queryLower.includes('গণিত') || 
        queryLower.includes('mathematics') || queryLower.includes('ম্যাথ')) {
      bookId = 'higher-math-9-10';
      bookName = 'উচ্চতর গণিত (নবম-দশম)';
    } else if (queryLower.includes('physics') || queryLower.includes('পদার্থ') || 
               queryLower.includes('পদার্থবিজ্ঞান')) {
      bookId = 'physics-9-10';
      bookName = 'পদার্থবিজ্ঞান (নবম-দশম)';
    } else if (queryLower.includes('bangla') || queryLower.includes('বাংলা')) {
      bookId = 'bangla-class-9';
      bookName = 'বাংলা সহপাঠ (নবম শ্রেণি)';
    } else {
      // Default to math
      bookId = 'higher-math-9-10';
      bookName = 'উচ্চতর গণিত (নবম-দশম)';
    }

    // Find chapter info from knowledge base
    const chapterResult = findChapterInfo(bookId, query);
    const chapter = chapterResult.chapter;
    
    if (!chapter) {
      return {
        mindMap: '',
        bookUsed: bookName,
        error: 'দুঃখিত, এই অধ্যায়টি খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অধ্যায় নম্বর বা নাম সঠিকভাবে উল্লেখ করুন।'
      };
    }

    // Generate mind map using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `তুমি একজন বিশেষজ্ঞ শিক্ষক এবং মাইন্ড ম্যাপ তৈরিতে দক্ষ।

📚 বই: ${bookName}
📖 অধ্যায় ${chapter.number}: ${chapter.title}
📄 পৃষ্ঠা: ${chapter.pages}

বিষয়সমূহ:
${chapter.topics.map((topic: string, i: number) => `${i + 1}. ${topic}`).join('\n')}

নিচের Mermaid ফরম্যাটে একটি বিস্তারিত মাইন্ড ম্যাপ তৈরি করো:

\`\`\`mermaid
mindmap
  root((${chapter.title}))
    ... (প্রধান টপিক)
      ... (সাব-টপিক)
        ... (বিস্তারিত পয়েন্ট)
\`\`\`

নির্দেশনা:
1. অধ্যায়ের সব গুরুত্বপূর্ণ টপিক অন্তর্ভুক্ত করো
2. প্রতিটি টপিকের অধীনে সাব-টপিক যোগ করো
3. সূত্র, সংজ্ঞা, এবং মূল ধারণা হাইলাইট করো
4. বাংলা ভাষা ব্যবহার করো
5. শুধুমাত্র Mermaid কোড প্রদান করো (কোনো ব্যাখ্যা নয়)

উদাহরণ structure:
\`\`\`mermaid
mindmap
  root((${chapter.title}))
    মূল ধারণা ১
      সংজ্ঞা
      বৈশিষ্ট্য
      উদাহরণ
    মূল ধারণা ২
      সূত্র
      প্রয়োগ
      সমস্যা সমাধান
    মূল ধারণা ৩
      থিওরেম
      প্রমাণ
      অনুশীলন
\`\`\``;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let mindMapText = response.text();

    // Extract just the mermaid code
    const mermaidMatch = mindMapText.match(/```mermaid\n([\s\S]*?)\n```/);
    if (mermaidMatch) {
      mindMapText = mermaidMatch[1];
    }

    return {
      mindMap: mindMapText,
      bookUsed: bookName,
      chapterInfo: {
        title: chapter.title,
        number: chapter.number,
        topics: chapter.topics
      }
    };

  } catch (error: any) {
    console.error('Mind map generation error:', error);
    return {
      mindMap: '',
      bookUsed: '',
      error: error.message || 'মাইন্ড ম্যাপ তৈরিতে সমস্যা হয়েছে'
    };
  }
};

/**
 * Check if a query is requesting a mind map
 */
export const isMindMapQuery = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return (
    lowerQuery.includes('mind map') ||
    lowerQuery.includes('mindmap') ||
    lowerQuery.includes('মাইন্ড ম্যাপ') ||
    lowerQuery.includes('মাইন্ডম্যাপ') ||
    (lowerQuery.includes('map') && lowerQuery.includes('বানাও')) ||
    (lowerQuery.includes('mind') && lowerQuery.includes('create'))
  );
};
