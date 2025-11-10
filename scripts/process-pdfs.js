/**
 * Process PDFs: Extract text, chunk, and create embeddings
 * Run: node scripts/process-pdfs.js
 * 
 * Requirements: npm install pdf-parse
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksDir = path.join(__dirname, '../nctb-books');
const outputDir = path.join(__dirname, '../public/book-data');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Split text into chunks for embedding
 */
function chunkText(text, maxChunkSize = 800, overlap = 100) {
  const chunks = [];
  const sentences = text.split(/(?<=[.।!?])\s+/);
  
  let currentChunk = '';
  let currentTokens = 0;
  
  for (const sentence of sentences) {
    const sentenceTokens = sentence.split(/\s+/).length;
    
    if (currentTokens + sentenceTokens > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      
      // Add overlap - take last few words
      const words = currentChunk.split(/\s+/);
      currentChunk = words.slice(-overlap).join(' ') + ' ' + sentence;
      currentTokens = overlap + sentenceTokens;
    } else {
      currentChunk += ' ' + sentence;
      currentTokens += sentenceTokens;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

/**
 * Generate embeddings using Ollama (FREE!)
 */
async function generateEmbedding(text) {
  try {
    const response = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text', // Fast, good for Bengali
        prompt: text
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error('❌ Embedding generation failed:', error.message);
    return null;
  }
}

/**
 * Process a single file (PDF or TXT)
 */
async function processFile(filePath, metadata) {
  console.log(`\n📖 Processing: ${metadata.title}`);
  
  try {
    let extractedText = '';
    let pageCount = 1;
    
    // Check file type
    const fileExt = filePath.toLowerCase().split('.').pop();
    
    if (fileExt === 'txt') {
      // Handle text files
      extractedText = fs.readFileSync(filePath, 'utf8');
      console.log(`   📄 Extracted text file, ${extractedText.length} characters`);
    } else if (fileExt === 'pdf') {
      // Use require for pdf-parse (CommonJS module)
      const { PDFParse } = require('pdf-parse');
      
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });
      const data = await parser.getText();
      extractedText = data.text;
      pageCount = data.total;
      
      console.log(`   📄 Extracted ${pageCount} pages, ${extractedText.length} characters`);
    } else {
      throw new Error(`Unsupported file type: ${fileExt}`);
    }
    
    // Clean and chunk the text
    const cleanText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/[^\u0980-\u09FF\s.,!?;:()\[\]০-৯0-9a-zA-Z-]/g, '')
      .trim();
    
    const chunks = chunkText(cleanText, 800, 100);
    console.log(`   ✂️  Created ${chunks.length} chunks`);
    
    // Generate embeddings for each chunk
    const processedChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      // Show progress every 10 chunks
      if (i % 10 === 0) {
        console.log(`   🔢 Processing chunk ${i + 1}/${chunks.length}...`);
      }
      
      const embedding = await generateEmbedding(chunk);
      
      if (embedding) {
        processedChunks.push({
          id: `${metadata.filename}_chunk_${i}`,
          bookId: metadata.filename.replace('.pdf', ''),
          chunkIndex: i,
          text: chunk,
          embedding: embedding,
          tokenCount: chunk.split(/\s+/).length,
          class: metadata.class,
          subject: metadata.subject
        });
      }
      
      // Small delay to avoid overwhelming Ollama
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Save processed data
    const outputFile = path.join(outputDir, metadata.filename.replace(/\.(pdf|txt)$/, '.json'));
    const outputData = {
      metadata: metadata,
      totalPages: pageCount,
      totalChunks: processedChunks.length,
      chunks: processedChunks,
      processedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
    console.log(`   ✅ Saved: ${outputFile}`);
    console.log(`   💾 File size: ${(fs.statSync(outputFile).size / 1024 / 1024).toFixed(2)} MB`);
    
    return processedChunks.length;
    
  } catch (error) {
    console.error(`   ❌ Failed to process file:`, error.message);
    return 0;
  }
}

/**
 * Check if Ollama is running
 */
async function checkOllama() {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    if (!response.ok) throw new Error('Ollama not responding');
    
    const data = await response.json();
    const hasEmbeddingModel = data.models?.some(m => m.name.includes('nomic-embed-text'));
    
    if (!hasEmbeddingModel) {
      console.log('\n⚠️  Embedding model not found. Installing...');
      console.log('Run: ollama pull nomic-embed-text');
      console.log('(This is a one-time setup, ~274MB download)\n');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Ollama is not running!');
    console.error('Please start Ollama first: ollama serve');
    return false;
  }
}

async function main() {
  console.log('📚 NCTB PDF Processing Pipeline\n');
  console.log('This will:');
  console.log('1. Extract text from PDFs');
  console.log('2. Split into chunks');
  console.log('3. Generate embeddings using Ollama (FREE)');
  console.log('4. Save processed data for the app\n');
  
  // Check Ollama
  const ollamaReady = await checkOllama();
  if (!ollamaReady) {
    console.log('\n❌ Cannot proceed without Ollama.');
    console.log('Setup steps:');
    console.log('1. Start Ollama: ollama serve');
    console.log('2. Install model: ollama pull nomic-embed-text');
    console.log('3. Run this script again\n');
    return;
  }
  
  console.log('✅ Ollama is ready!\n');
  
  // Find all PDFs and TXT files
  const files = fs.readdirSync(booksDir);
  const bookFiles = files.filter(f => f.endsWith('.pdf') || f.endsWith('.txt'));
  
  if (bookFiles.length === 0) {
    console.log('❌ No book files found in nctb-books folder!');
    console.log('Please add PDF or TXT files to process.');
    return;
  }
  
  console.log(`📁 Found ${bookFiles.length} book files to process\n`);
  
  let totalChunks = 0;
  
  for (const bookFile of bookFiles) {
    const bookPath = path.join(booksDir, bookFile);
    const metadataPath = bookPath.replace(/\.(pdf|txt)$/, '.json');
    
    // Load metadata
    let metadata = {};
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } else {
      metadata = {
        filename: bookFile,
        title: bookFile.replace(/\.(pdf|txt)$/, ''),
        class: 'Unknown',
        subject: 'Unknown'
      };
    }
    
    const chunks = await processFile(bookPath, metadata);
    totalChunks += chunks;
  }
  
  console.log('\n✅ Processing complete!');
  console.log(`📊 Total chunks created: ${totalChunks}`);
  console.log(`📁 Data saved to: ${outputDir}`);
  console.log('\nNext step: Deploy the app and test book chat! 🚀\n');
}

main().catch(console.error);
