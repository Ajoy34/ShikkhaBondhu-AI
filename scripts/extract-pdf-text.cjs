/**
 * Extract text from NCTB PDFs (CommonJS version)
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const BOOKS_DIR = path.join(__dirname, '..', 'nctb-books');
const OUTPUT_DIR = path.join(__dirname, '..', 'nctb-books', 'extracted');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function extractPDFText(pdfPath, outputName) {
  console.log(`\n📖 Processing: ${path.basename(pdfPath)}`);
  console.log('─'.repeat(60));
  
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    console.log(`✅ Pages: ${data.numpages}`);
    console.log(`✅ Text length: ${data.text.length} characters`);
    
    // Check first 500 characters
    const preview = data.text.substring(0, 500);
    console.log(`\n📄 Preview:\n${preview}\n`);
    
    // Save full text
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.txt`);
    fs.writeFileSync(outputPath, data.text, 'utf8');
    console.log(`✅ Saved to: ${outputPath}`);
    
    // Check if it's mostly empty (scanned PDF)
    const words = data.text.trim().split(/\s+/).filter(w => w.length > 2);
    if (words.length < 100) {
      console.log(`⚠️  WARNING: Very little text extracted (${words.length} words)`);
      console.log('⚠️  This appears to be a SCANNED PDF with images, not text!');
      return { success: false, pages: data.numpages, words: words.length };
    }
    
    return { success: true, pages: data.numpages, words: words.length, text: data.text };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting PDF Text Extraction');
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
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    console.log(`\n${result.outputName}:`);
    if (result.success) {
      console.log(`  ✅ ${result.pages} pages, ${result.words} words extracted`);
    } else {
      console.log(`  ❌ Failed: ${result.error || 'Scanned PDF - no text'}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Extraction complete!');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

main().catch(console.error);
