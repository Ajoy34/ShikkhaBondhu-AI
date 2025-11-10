# 📝 Install Tesseract OCR for Windows

To process scanned NCTB PDFs, you need to install Tesseract OCR.

## Option 1: Using Chocolatey (Easiest)

If you have Chocolatey installed:

```powershell
choco install tesseract
```

## Option 2: Manual Installation (Recommended)

### Step 1: Download Tesseract

1. Go to: https://github.com/UB-Mannheim/tesseract/wiki
2. Download **tesseract-ocr-w64-setup-5.3.3.20231005.exe** (or latest version)
3. Run the installer

### Step 2: During Installation

✅ **IMPORTANT**: When asked about "Additional Language Data", make sure to select:
- ✅ **Bengali (ben)** - For Bangla text
- ✅ **English (eng)** - Already selected

### Step 3: Add to PATH

The installer should add Tesseract to your PATH automatically. If not:

1. Copy the installation path (usually `C:\Program Files\Tesseract-OCR`)
2. Open System Properties → Environment Variables
3. Add to PATH: `C:\Program Files\Tesseract-OCR`

### Step 4: Verify Installation

Open a **new** PowerShell window and run:

```powershell
tesseract --version
```

You should see something like:
```
tesseract 5.3.3
 leptonica-1.83.1
```

## After Installing Tesseract

Run the PDF processing script:

```powershell
node scripts/process-pdfs.js
```

It will now:
1. Try to extract text normally first
2. If that fails (scanned PDF), convert to images
3. Use OCR to extract text from images
4. Process Bangla + English text
5. Generate embeddings with Ollama

## Notes

- **Processing Time**: OCR takes ~30 seconds per page
- **First 10 Pages Only**: To keep processing time reasonable
- **Quality**: OCR works best with clear, high-quality scans
- **Languages**: Supports Bengali (ben) + English (eng)

## Troubleshooting

**Error: "tesseract is not recognized"**
- Restart PowerShell/VS Code after installation
- Check PATH includes `C:\Program Files\Tesseract-OCR`

**Error: "Error opening data file"**
- Re-run installer and select Bengali language data
- Or download manually from: https://github.com/tesseract-ocr/tessdata

**Very slow processing**
- This is normal - OCR is slow
- Processing 10 pages takes ~5-10 minutes
- Consider processing one book at a time
