/**
 * Extract text from NCTB PDFs using pdfjs-dist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_DIR = path.join(__dirname, '..', 'nctb-books');
const OUTPUT_DIR = path.join(__dirname, '..', 'nctb-books', 'extracted');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function extractTextFromPage(page) {
  const textContent = await page.getTextContent();
  const strings = textContent.items.map(item => item.str);
  return strings.join(' ');
}

async function extractPDFText(pdfPath, outputName) {
  console.log(`\n📖 Processing: ${path.basename(pdfPath)}`);
  console.log('─'.repeat(60));
  
  try {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDocument = await loadingTask.promise;
    
    const numPages = pdfDocument.numPages;
    console.log(`✅ Pages: ${numPages}`);
    
    let fullText = '';
    let processedPages = 0;
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const pageText = await extractTextFromPage(page);
      fullText += `\n\n=== Page ${pageNum} ===\n\n${pageText}`;
      
      processedPages++;
      if (processedPages % 10 === 0) {
        console.log(`  Progress: ${processedPages}/${numPages} pages...`);
      }
    }
    
    console.log(`✅ Extracted text from ${processedPages} pages`);
    console.log(`✅ Total characters: ${fullText.length}`);
    
    // Check first 1000 characters
    const preview = fullText.substring(0, 1000);
    console.log(`\n📄 Preview:\n${preview}...\n`);
    
    // Save full text
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.txt`);
    fs.writeFileSync(outputPath, fullText, 'utf8');
    console.log(`✅ Saved to: ${outputPath}`);
    
    // Check quality
    const words = fullText.trim().split(/\s+/).filter(w => w.length > 2);
    console.log(`✅ Word count: ${words.length} words`);
    
    if (words.length < 100) {
      console.log(`⚠️  WARNING: Very little text (${words.length} words)`);
      console.log('⚠️  This PDF might be scanned images!');
      return { success: false, pages: numPages, words: words.length };
    }
    
    return { 
      success: true, 
      pages: numPages, 
      words: words.length, 
      chars: fullText.length,
      outputPath 
    };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting PDF Text Extraction with pdfjs-dist');
  console.log('='.repeat(60));
  
  const books = [
    {
      filename: 'Secondary - 2018 - Class - 9&10 - Bangla sohopat class-9  PDF Web .pdf',
      outputName: 'bangla-class-9'
    },
    {
      filename: 'Secondary - 2018 - Class - 9&10 - Higher Math 9 BV  PDF Web .pdf',
      outputName: 'higher-math-9-10'
    },
    {
      filename: 'Secondary - 2018 - Class - 9&10 - Physics Class 9-10 BV  PDF Web .pdf',
      outputName: 'physics-9-10'
    }
  ];
  
  const results = [];
  
  for (const book of books) {
    const pdfPath = path.join(BOOKS_DIR, book.filename);
    if (fs.existsSync(pdfPath)) {
      const result = await extractPDFText(pdfPath, book.outputName);
      results.push({ ...book, ...result });
    } else {
      console.log(`❌ File not found: ${book.filename}`);
      results.push({ ...book, success: false, error: 'File not found' });
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));
  
  let totalSuccess = 0;
  let totalFailed = 0;
  
  results.forEach(result => {
    console.log(`\n📚 ${result.outputName}:`);
    if (result.success) {
      console.log(`  ✅ SUCCESS`);
      console.log(`     Pages: ${result.pages}`);
      console.log(`     Words: ${result.words.toLocaleString()}`);
      console.log(`     Characters: ${result.chars.toLocaleString()}`);
      console.log(`     File: ${result.outputPath}`);
      totalSuccess++;
    } else {
      console.log(`  ❌ FAILED: ${result.error || 'Scanned PDF - no text'}`);
      totalFailed++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successful: ${totalSuccess}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
