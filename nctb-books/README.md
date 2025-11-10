# Manual Download Instructions for NCTB Books

Since NCTB's website requires clicking through their interface, please manually download these books:

## 📚 Books to Download (Priority Order)

### Visit: https://nctb.gov.bd/site/page/079828a6-18e6-44c1-9a2d-59f8d223199c

### Download These First:

1. **বাংলা সাহিত্য (Class 9-10)**
   - Click on "বাংলা সাহিত্য" → "বাংলা ভার্সন" → Download PDF
   - Save as: `nctb-books/class_9_10_bangla_sahitto.pdf`
   - Also create: `nctb-books/class_9_10_bangla_sahitto.json` with this content:
   ```json
   {
     "class": "9-10",
     "subject": "Bangla Literature",
     "title": "বাংলা সাহিত্য কণিকা",
     "filename": "class_9_10_bangla_sahitto.pdf"
   }
   ```

2. **বাংলা ভাষার ব্যাকরণ (Class 9-10)**
   - Click on "বাংলা ভাষার ব্যাকরণ" → "বাংলা ভার্সন" → Download PDF
   - Save as: `nctb-books/class_9_10_bangla_grammar.pdf`
   - Also create: `nctb-books/class_9_10_bangla_grammar.json` with:
   ```json
   {
     "class": "9-10",
     "subject": "Bangla Grammar",
     "title": "বাংলা ভাষার ব্যাকরণ ও নির্মিতি",
     "filename": "class_9_10_bangla_grammar.pdf"
   }
   ```

3. **বিজ্ঞান (Class 9-10)**
   - Save as: `nctb-books/class_9_10_science.pdf`
   - Metadata: `nctb-books/class_9_10_science.json`

## ⚡ Quick Test - Create Sample Book

To test the system immediately, I'll create a small sample text file that mimics a book chapter:

File: `nctb-books/sample_bangla_grammar.txt`

This will let us test the processing pipeline before working with large PDFs.

## 🚀 After Downloading

Once you have at least 1 PDF:
```powershell
node scripts/process-pdfs.js
```

This will process all PDFs in the `nctb-books/` folder.
