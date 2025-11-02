# Quick Setup: Add Your Google API Key

## For Local Development & Testing

1. **Get your API key from the Vercel dashboard** (if you haven't rotated it yet):
   - Or create a NEW restricted key from: https://aistudio.google.com/app/apikey

2. **Add it to your local `.env` file**:
   ```bash
   # Open .env file and replace:
   VITE_GOOGLE_API_KEY=your-api-key-here
   # with your actual key:
   VITE_GOOGLE_API_KEY=AIzaSy...your-actual-key
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

4. **Test the chat** - Now it will work locally! 🚀

## For Vercel Deployment

Add **both** environment variables in Vercel dashboard:

1. **GOOGLE_API_KEY** (for /api/chat serverless endpoint)
   - Name: `GOOGLE_API_KEY`
   - Value: `AIzaSy...`

2. **VITE_GOOGLE_API_KEY** (for direct client-side API calls)
   - Name: `VITE_GOOGLE_API_KEY`
   - Value: `AIzaSy...` (same key)

This gives you redundancy - if Vercel API fails, the direct API will work!

## How It Works Now

Your app has **3 layers of fallback**:

```
User sends message
    ↓
1️⃣ Try Vercel /api/chat (if on Vercel)
    ↓ (if fails)
2️⃣ Try Direct Gemini API (if VITE_GOOGLE_API_KEY set)
    ↓ (if fails)
3️⃣ Use Fallback Chatbot (always works)
    ↓
Show response to user
```

**No matter what, users always get a response!** ✅

## Test Locally

```bash
# 1. Add your API key to .env
# 2. Run dev server
npm run dev

# 3. Open browser and test all 9 bots:
# - General
# - Legal Rights
# - Health
# - Safety
# - Skills
# - Post-Care
# - Community
# - Crisis
# - Academic
```

Check browser console - you should see:
- "Vercel endpoint not found, using direct API" (normal for local dev)
- Or API responses working successfully!

## Deploy Anywhere

Now your app works on:
- ✅ Vercel (with serverless API)
- ✅ Netlify (direct API)
- ✅ GitHub Pages (direct API)
- ✅ Any static hosting (direct API)
- ✅ Even without API key (fallback chatbot)

See `SETUP-WITHOUT-VERCEL.md` for detailed deployment guides.

---

**Need help?** Check the full guide in `SETUP-WITHOUT-VERCEL.md`
