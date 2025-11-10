/**
 * Script to download NCTB Bangla textbooks
 * Run: node scripts/download-nctb-books.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NCTB Book URLs for Class 9-10 (2018 curriculum)
// These are direct links from NCTB's textbook page
const books = [
  {
    class: '9-10',
    subject: 'Bangla Literature',
    title: 'বাংলা সাহিত্য (Class 9-10)',
    url: 'https://nctb.gov.bd/textbook/download?class=9&subject=bangla_sahitto',
    filename: 'class_9_10_bangla_sahitto.pdf'
  },
  {
    class: '9-10',
    subject: 'Bangla Grammar',
    title: 'বাংলা ভাষার ব্যাকরণ (Class 9-10)',
    url: 'https://nctb.gov.bd/textbook/download?class=9&subject=bangla_bekoron',
    filename: 'class_9_10_bangla_grammar.pdf'
  },
  {
    class: '9-10',
    subject: 'Science',
    title: 'বিজ্ঞান (Class 9-10)',
    url: 'https://nctb.gov.bd/textbook/download?class=9&subject=science',
    filename: 'class_9_10_science.pdf'
  },
  {
    class: '9-10',
    subject: 'Math',
    title: 'গণিত (Class 9-10)',
    url: 'https://nctb.gov.bd/textbook/download?class=9&subject=math',
    filename: 'class_9_10_math.pdf'
  }
];

const downloadDir = path.join(__dirname, '../nctb-books');

// Create directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadBook(book) {
  const filePath = path.join(downloadDir, book.filename);
  
  // Skip if already downloaded
  if (fs.existsSync(filePath)) {
    console.log(`✅ Already exists: ${book.filename}`);
    return;
  }

  console.log(`📥 Downloading: ${book.title}...`);
  
  try {
    const response = await fetch(book.url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    console.log(`✅ Downloaded: ${book.filename} (${(buffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    
    // Save metadata
    const metadataPath = path.join(downloadDir, book.filename.replace('.pdf', '.json'));
    fs.writeFileSync(metadataPath, JSON.stringify(book, null, 2));
    
  } catch (error) {
    console.error(`❌ Failed to download ${book.title}:`, error.message);
  }
}

async function main() {
  console.log('📚 Starting NCTB Book Downloads...\n');
  
  for (const book of books) {
    await downloadBook(book);
    // Wait 1 second between downloads to be nice to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ All downloads complete!');
  console.log(`📁 Books saved to: ${downloadDir}`);
}

main().catch(console.error);
