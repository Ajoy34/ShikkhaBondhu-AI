/**
 * Book RAG (Retrieval Augmented Generation) Utilities
 * Handles semantic search and question answering for NCTB textbooks
 */

import { callGeminiAPI } from './geminiClient';

export interface BookChunk {
  id: string;
  bookId: string;
  chunkIndex: number;
  text: string;
  embedding: number[];
  tokenCount: number;
  class?: string;
  subject?: string;
}

export interface BookData {
  metadata: {
    class: string;
    subject: string;
    title: string;
    filename: string;
  };
  totalPages: number;
  totalChunks: number;
  chunks: BookChunk[];
  processedAt: string;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have same length');
  }
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Simple keyword-based similarity (fallback when Ollama is not available)
 */
function keywordSimilarity(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  const textWords = text.toLowerCase().split(/\s+/);
  
  let matches = 0;
  for (const word of queryWords) {
    if (textWords.some(tw => tw.includes(word) || word.includes(tw))) {
      matches++;
    }
  }
  
  return matches / queryWords.length;
}

/**
 * Generate embedding for query using Ollama (with fallback)
 */
async function generateQueryEmbedding(query: string): Promise<number[] | null> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: query
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn('Ollama embedding failed, will use keyword search:', response.status);
      return null;
    }
    
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.warn('Ollama not available, using keyword-based search:', error);
    return null;
  }
}

/**
 * Load all processed book data from public folder
 */
export async function loadAllBooks(): Promise<BookData[]> {
  try {
    // In production, these files are in /book-data/
    // List of available books (update this when adding new books)
    const bookFiles = [
      'sample_bangla_grammar.json',
      'Secondary - 2018 - Class - 9&10 - Bangla sohopat class-9  PDF Web .json',
      'Secondary - 2018 - Class - 9&10 - Higher Math 9 BV  PDF Web .json',
      'Secondary - 2018 - Class - 9&10 - Physics Class 9-10 BV  PDF Web .json'
    ];
    
    const books: BookData[] = [];
    
    for (const filename of bookFiles) {
      try {
        const response = await fetch(`/book-data/${filename}`);
        if (response.ok) {
          const bookData = await response.json();
          books.push(bookData);
        }
      } catch (error) {
        console.error(`Failed to load ${filename}:`, error);
      }
    }
    
    return books;
  } catch (error) {
    console.error('Failed to load books:', error);
    return [];
  }
}

/**
 * Search for relevant chunks across all books
 */
export async function searchBooks(
  query: string,
  books: BookData[],
  topK: number = 5
): Promise<{ chunk: BookChunk; similarity: number; bookTitle: string }[]> {
  
  // Try to generate embedding for the query
  const queryEmbedding = await generateQueryEmbedding(query);
  
  // Calculate similarity for all chunks
  const results: { chunk: BookChunk; similarity: number; bookTitle: string }[] = [];
  
  for (const book of books) {
    for (const chunk of book.chunks) {
      let similarity: number;
      
      if (queryEmbedding && chunk.embedding) {
        // Use embedding-based similarity (more accurate)
        similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
      } else {
        // Fallback to keyword-based similarity
        similarity = keywordSimilarity(query, chunk.text);
      }
      
      results.push({
        chunk,
        similarity,
        bookTitle: book.metadata.title
      });
    }
  }
  
  // Sort by similarity and take top K
  results.sort((a, b) => b.similarity - a.similarity);
  
  return results.slice(0, topK);
}

/**
 * Answer question using RAG
 */
export async function answerQuestion(
  question: string,
  books: BookData[],
  userId: string
): Promise<{ answer: string; sources: { bookTitle: string; text: string; similarity: number }[]; error?: string }> {
  
  try {
    // Step 1: Search for relevant chunks
    console.log('🔍 Searching for relevant content...');
    const relevantChunks = await searchBooks(question, books, 5);
    
    if (relevantChunks.length === 0) {
      return {
        answer: '',
        sources: [],
        error: 'দুঃখিত, এই প্রশ্নের উত্তর বইয়ে পাওয়া যায়নি। (No relevant content found in books.)'
      };
    }
    
    console.log(`✅ Found ${relevantChunks.length} relevant chunks`);
    
    // Step 2: Build context from relevant chunks
    const context = relevantChunks
      .map((result, index) => `[তথ্য ${index + 1} - ${result.bookTitle}]:\n${result.chunk.text}`)
      .join('\n\n');
    
    // Step 3: Build prompt for Gemini
    const prompt = `তুমি একজন বাংলা ভাষার শিক্ষক। নিচের পাঠ্যবই থেকে তথ্য ব্যবহার করে প্রশ্নের উত্তর দাও।

**পাঠ্যবই থেকে তথ্য:**

${context}

**ছাত্রের প্রশ্ন:** ${question}

**নির্দেশনা:**
1. শুধুমাত্র উপরের পাঠ্যবইয়ের তথ্য ব্যবহার করে উত্তর দাও
2. উত্তর বাংলায় দাও (প্রশ্ন যে ভাষায়ই হোক)
3. স্পষ্ট এবং সহজ ভাষায় ব্যাখ্যা করো
4. উদাহরণ দিয়ে বুঝিয়ে দাও (যদি বইয়ে থাকে)
5. যদি তথ্য পাঠ্যবইয়ে না থাকে, তাহলে "এই প্রশ্নের উত্তর পাঠ্যবইয়ে নেই" বলো

**উত্তর:**`;

    // Step 4: Get answer from Gemini Flash (cheap!)
    console.log('💬 Generating answer with Gemini...');
    const result = await callGeminiAPI(prompt, 'academic', userId, { skipLengthCheck: true });
    
    if (result.error) {
      return {
        answer: '',
        sources: [],
        error: result.error
      };
    }
    
    // Step 5: Return answer with sources
    const sources = relevantChunks.map(result => ({
      bookTitle: result.bookTitle,
      text: result.chunk.text.substring(0, 200) + '...', // First 200 chars
      similarity: Math.round(result.similarity * 100)
    }));
    
    return {
      answer: result.response,
      sources
    };
    
  } catch (error: any) {
    console.error('Error in answerQuestion:', error);
    return {
      answer: '',
      sources: [],
      error: 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন। (An error occurred.)'
    };
  }
}

/**
 * Get book statistics
 */
export function getBookStats(books: BookData[]) {
  const totalBooks = books.length;
  const totalChunks = books.reduce((sum, book) => sum + book.totalChunks, 0);
  const subjects = [...new Set(books.map(b => b.metadata.subject))];
  const classes = [...new Set(books.map(b => b.metadata.class))];
  
  return {
    totalBooks,
    totalChunks,
    subjects,
    classes
  };
}
