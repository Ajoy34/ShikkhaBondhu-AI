# 📚 How to Download NCTB Books

## Method 1: Manual Download (Recommended)

Since NCTB website requires browsing their interface, follow these steps:

### Step 1: Open the NCTB Textbook Page
Visit: https://nctb.gov.bd/site/page/079828a6-18e6-44c1-9a2d-59f8d223199c

### Step 2: Download Books
1. Browse the page and find the books you want
2. Click on each book to download the PDF
3. Save all PDFs to the `nctb-books/` folder in this project

### Step 3: Rename Files (Important!)
Rename your downloaded PDFs with clear names:
- `class_9_bangla_literature.pdf`
- `class_9_bangla_grammar.pdf`
- `class_10_science.pdf`
- `class_11_physics.pdf`
- etc.

### Step 4: Process the Books
Once you have PDFs in `nctb-books/`, run:
```powershell
node scripts/process-pdfs.js
```

---

## Method 2: Using the Download Script

If you have direct PDF links from NCTB:

### Step 1: Get PDF URLs
1. Right-click on a book download link → **Copy link address**
2. You'll get something like: `https://nctb.gov.bd/downloads/class_9_bangla.pdf`

### Step 2: Add URLs to Script
Open `scripts/download-nctb-books.js` and add your URLs:

```javascript
const books = [
  {
    url: 'https://nctb.gov.bd/downloads/class_9_bangla.pdf',
    filename: 'class_9_bangla_literature.pdf',
    class: '9',
    subject: 'Bangla Literature',
    title: 'বাংলা সাহিত্য (Class 9)'
  },
  {
    url: 'https://nctb.gov.bd/downloads/class_9_grammar.pdf',
    filename: 'class_9_bangla_grammar.pdf',
    class: '9',
    subject: 'Bangla Grammar',
    title: 'বাংলা ব্যাকরণ (Class 9)'
  },
  // Add more books...
];
```

### Step 3: Run the Download Script
```powershell
node scripts/download-nctb-books.js
```

---

## 📋 Recommended Books to Download

For a complete educational platform, consider downloading:

### Class 9-10:
- [ ] বাংলা সাহিত্য (Bangla Literature)
- [ ] বাংলা ব্যাকরণ (Bangla Grammar)
- [ ] English for Today
- [ ] গণিত (Mathematics)
- [ ] বিজ্ঞান (Science)
- [ ] পদার্থবিজ্ঞান (Physics)
- [ ] রসায়ন (Chemistry)
- [ ] জীববিজ্ঞান (Biology)
- [ ] তথ্য ও যোগাযোগ প্রযুক্তি (ICT)

### Class 11-12 (Science):
- [ ] পদার্থবিজ্ঞান (Physics)
- [ ] রসায়ন (Chemistry)
- [ ] গণিত (Mathematics)
- [ ] জীববিজ্ঞান (Biology)

---

## ⚙️ Processing Pipeline

After downloading:

1. **Extract Text**: PDFs → Text chunks
2. **Generate Embeddings**: Using Ollama (FREE)
3. **Save Processed Data**: JSON files with embeddings
4. **Update Book List**: In `src/utils/bookRAG.ts`

```powershell
# Process all PDFs in nctb-books/
node scripts/process-pdfs.js

# This will create files in public/book-data/
# Example: class_9_bangla_literature.json
```

---

## 📁 Folder Structure

```
nctb-books/
  ├── class_9_bangla_literature.pdf
  ├── class_9_bangla_grammar.pdf
  ├── class_10_science.pdf
  └── ...

public/book-data/
  ├── sample_bangla_grammar.json (already there)
  ├── class_9_bangla_literature.json (after processing)
  ├── class_9_bangla_grammar.json (after processing)
  └── ...
```

---

## 🚀 Quick Start

```powershell
# 1. Download books manually to nctb-books/
# 2. Process them
node scripts/process-pdfs.js

# 3. Update book list in src/utils/bookRAG.ts
# Add your new book filenames to the bookFiles array
```

---

## ⚠️ Important Notes

1. **File Naming**: Use clear, consistent names without spaces
2. **File Size**: Some textbooks are 50-100 MB, be patient
3. **Processing Time**: Large PDFs take 5-10 minutes to process
4. **Ollama Required**: Make sure Ollama is running (`ollama serve`)
5. **Storage**: Processed JSON files are ~10-20% of original PDF size

---

## 🆘 Troubleshooting

**Q: Download script shows "No URLs configured"**  
A: Add book URLs to the `books` array in `scripts/download-nctb-books.js`

**Q: Processing fails with "Ollama not available"**  
A: Start Ollama with: `ollama serve`

**Q: PDF extraction fails**  
A: Make sure the PDF is not corrupted. Try re-downloading.

**Q: Books don't appear in app**  
A: Update the `bookFiles` array in `src/utils/bookRAG.ts`

---

## 💡 Tips

- Start with 2-3 books to test the system
- Focus on most-used subjects first (Bangla, Math, Science)
- Process books one at a time for large files
- Check `public/book-data/` to see processed files
- Test each book in the app before adding more

---

## 📞 Need Help?

Check the console output for detailed error messages. The scripts provide step-by-step progress indicators.
