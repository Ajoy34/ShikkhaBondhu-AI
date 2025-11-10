/**
 * Script to download NCTB textbooks from URLs
 * 
 * USAGE:
 * 1. Visit: https://nctb.gov.bd/site/page/079828a6-18e6-44c1-9a2d-59f8d223199c
 * 2. Right-click on a book PDF link → Copy link address
 * 3. Add the URL to the 'books' array below
 * 4. Run: node scripts/download-nctb-books.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add your NCTB book URLs here (right-click book link → Copy link address)
const books = [
  // Example format:
  // {
  //   url: 'https://nctb.gov.bd/downloads/class_9_bangla.pdf',
  //   filename: 'class_9_bangla.pdf',
  //   class: '9',
  //   subject: 'Bangla',
  //   title: 'বাংলা (Class 9)'
  // },
];

const downloadDir = path.join(__dirname, '../nctb-books');

// Create directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filePath);
        return downloadFile(response.headers.location, filePath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filePath);
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;
      
      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
          process.stdout.write(`\r   Progress: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(2)} MB / ${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
        }
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(''); // New line after progress
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      fs.unlinkSync(filePath);
      reject(err);
    });
  });
}

async function downloadBook(book) {
  const filePath = path.join(downloadDir, book.filename);
  
  // Skip if already downloaded
  if (fs.existsSync(filePath)) {
    console.log(`✅ Already exists: ${book.filename}`);
    return true;
  }

  console.log(`\n📥 Downloading: ${book.title || book.filename}...`);
  
  try {
    await downloadFile(book.url, filePath);
    
    const stats = fs.statSync(filePath);
    console.log(`✅ Downloaded: ${book.filename} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Save metadata
    const metadataPath = path.join(downloadDir, book.filename.replace('.pdf', '.json'));
    fs.writeFileSync(metadataPath, JSON.stringify({
      class: book.class,
      subject: book.subject,
      title: book.title || book.filename,
      filename: book.filename,
      downloadedAt: new Date().toISOString(),
      fileSize: stats.size
    }, null, 2));
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${book.filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('📚 NCTB Book Downloader\n');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (books.length === 0) {
    console.log('\n⚠️  No book URLs configured!');
    console.log('\nTo download books:');
    console.log('1. Visit: https://nctb.gov.bd/site/page/079828a6-18e6-44c1-9a2d-59f8d223199c');
    console.log('2. Right-click on a book PDF link → Copy link address');
    console.log('3. Add the URL to the books array in this file');
    console.log('4. Run: node scripts/download-nctb-books.js');
    console.log('\nExample format:');
    console.log(`
const books = [
  {
    url: 'https://nctb.gov.bd/downloads/class_9_bangla.pdf',
    filename: 'class_9_bangla.pdf',
    class: '9',
    subject: 'Bangla',
    title: 'বাংলা (Class 9)'
  }
];
    `);
    return;
  }
  
  console.log(`\n📦 Books to download: ${books.length}`);
  console.log(`📁 Download folder: ${downloadDir}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const book of books) {
    const success = await downloadBook(book);
    if (success) successCount++;
    else failCount++;
    
    // Wait 2 seconds between downloads
    if (books.indexOf(book) < books.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`\n✅ Downloads complete!`);
  console.log(`   Success: ${successCount} | Failed: ${failCount}`);
  console.log(`   📁 Saved to: ${downloadDir}`);
  console.log('\n📝 Next step: Run "node scripts/process-pdfs.js" to process the books\n');
}

main().catch(console.error);
