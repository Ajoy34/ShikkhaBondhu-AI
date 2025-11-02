# Setup Guide: Running Without Vercel

This guide explains how to run ShikkhaBondhu with Google Gemini AI **without Vercel serverless functions**.

## 🎯 Overview

The app now has **3 fallback layers** for maximum reliability:

1. **Vercel API Endpoint** (`/api/chat`) - If deployed on Vercel (most secure, recommended for production)
2. **Direct Client-Side Gemini API** - Works locally and on any hosting (Netlify, GitHub Pages, etc.)
3. **Fallback Chatbot Logic** - Rule-based responses when API unavailable

## 🚀 Quick Setup

### 1. Get Google API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Get API key"**
3. Create a new project or select existing one
4. Copy your API key (starts with `AIza...`)

### 2. Configure Environment Variables

Create a `.env` file in project root:

```bash
# Required for database
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional for AI features (if not provided, uses fallback chatbot)
VITE_GOOGLE_API_KEY=AIza...your-api-key-here
```

**Important:** The `VITE_` prefix is required for Vite to expose these to the browser.

### 3. Run Locally

```bash
npm install
npm run dev
```

The app will:
- ✅ Try Vercel API first (if available)
- ✅ Fall back to direct Gemini API (if `VITE_GOOGLE_API_KEY` is set)
- ✅ Fall back to local chatbot logic (if no API key)

## 🌐 Deploy Without Vercel

### Option 1: Netlify

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_API_KEY` (optional)
7. Deploy!

**Note:** Netlify doesn't support `/api/chat` endpoint, so it will use direct Gemini API.

### Option 2: GitHub Pages

1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Add your repo name
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy dist/ folder to gh-pages branch
   ```

3. Set secrets in GitHub repo:
   - Go to Settings → Secrets → Actions
   - Add `VITE_GOOGLE_API_KEY`

**Note:** GitHub Pages is static hosting, so uses direct Gemini API.

### Option 3: Any Static Hosting (Surge, Firebase, etc.)

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to your hosting

3. Set environment variables in your hosting platform

## 🔒 Security Considerations

### Vercel (Most Secure) ✅
- API key stored server-side
- Rate limiting enforced server-side
- No key exposure in browser
- Recommended for production

### Direct Client API (Moderate Security) ⚠️
- API key in browser (VITE_ vars are exposed)
- Client-side rate limiting (can be bypassed)
- Use API key restrictions in Google Cloud Console:
  1. Go to [Google Cloud Console](https://console.cloud.google.com)
  2. APIs & Services → Credentials
  3. Edit your API key
  4. Add restrictions:
     - **Application restrictions:** HTTP referrers (websites)
     - **Add your domain:** `https://yourdomain.com/*`
     - **API restrictions:** Only allow "Generative Language API"

### Fallback Chatbot (Most Secure) ✅
- No API calls, no keys needed
- All logic runs locally
- Limited features but always available

## 📊 How It Works

### Request Flow

```
User sends message
    ↓
Try Vercel /api/chat endpoint
    ↓ (if fails)
Try Direct Gemini API (src/utils/geminiClient.ts)
    ↓ (if fails or no key)
Use Fallback Chatbot (src/utils/chatbotLogic.ts)
    ↓
Display response to user
```

### Code Changes Made

**New File:** `src/utils/geminiClient.ts`
- Direct Gemini API integration
- Client-side rate limiting (20 req/min)
- Error handling and timeouts
- All 9 bot types with Bangladesh-specific prompts

**Updated:** `src/components/ChatSystem.tsx`
- Triple fallback system
- Tries Vercel API → Direct API → Fallback
- Seamless user experience regardless of setup

## 🧪 Testing

### Test All Fallback Layers

**1. Test Vercel API (if deployed on Vercel):**
```bash
# Should use /api/chat endpoint
# Check browser Network tab for POST to /api/chat
```

**2. Test Direct API (local or other hosting):**
```bash
# Set VITE_GOOGLE_API_KEY in .env
npm run dev
# Should call Google Generative AI API directly
```

**3. Test Fallback (no API):**
```bash
# Remove VITE_GOOGLE_API_KEY from .env
npm run dev
# Should use getChatbotResponse() from chatbotLogic.ts
```

### Test Each Bot Type

Try all 9 bots with sample messages:
- ✅ Academic: "আমি এসএসসি পরীক্ষার জন্য প্রস্তুতি নিতে চাই"
- ✅ Health: "মানসিক চাপ কমানোর উপায় কি?"
- ✅ Law: "সাইবার হয়রানির বিরুদ্ধে কি করতে পারি?"
- ✅ Safety: "জরুরি নম্বর কি?"
- ✅ Skills: "প্রোগ্রামিং শিখতে চাই"
- ✅ Crisis: "এখনই সাহায্য চাই"
- ✅ Community: "সাপোর্ট গ্রুপে যুক্ত হতে চাই"
- ✅ Postcare: "আমার অগ্রগতি দেখতে চাই"
- ✅ General: "হ্যালো"

## 💰 Cost Management

### Free Tier Limits (Google Gemini)
- **1,500 requests per day** (FREE)
- **15 requests per minute** (FREE)
- **No credit card required**

### Client-Side Rate Limiting
The app enforces **20 requests per minute per user** to stay within limits.

### Monitor Usage
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Enabled APIs
3. Click "Generative Language API"
4. View usage graphs

## 🆘 Troubleshooting

### "একটি ত্রুটি ঘটেছে" Error

**Check 1:** Verify API key is set
```bash
# Check .env file
cat .env | grep VITE_GOOGLE_API_KEY
```

**Check 2:** Check browser console
```javascript
// Should show which fallback layer is being used:
// "Vercel API unavailable, switching to direct API"
// "Direct API error: ..."
// "Google API key not configured, using fallback"
```

**Check 3:** Verify API key restrictions
- Go to Google Cloud Console → Credentials
- Make sure your domain is allowed
- Make sure "Generative Language API" is enabled

### Rate Limit Exceeded

Error: "API সীমা অতিক্রম করেছে"

**Solution:** Wait 1 minute, then try again. The app enforces 20 req/min limit.

### API Key Not Found

Error: "API_KEY_MISSING"

**Solution:** 
1. Check `.env` file has `VITE_GOOGLE_API_KEY`
2. Restart dev server after adding env vars
3. For deployed sites, add env var in hosting dashboard

## 📈 Recommended Setup by Use Case

### Development (Local)
```
✅ Direct API with VITE_GOOGLE_API_KEY
✅ Fallback chatbot for offline work
```

### Production (Small Traffic)
```
✅ Vercel with API endpoint (most secure)
✅ Direct API as backup
✅ Fallback chatbot always available
```

### Production (Large Traffic)
```
✅ Vercel with Redis rate limiting
✅ Consider paid Gemini tier if > 1,500 req/day
✅ Implement caching for common queries
```

### Static Hosting (No Backend)
```
✅ Direct API with domain restrictions
✅ Fallback chatbot for all users
✅ Monitor usage closely
```

## 🎓 Learn More

- [Google Gemini Documentation](https://ai.google.dev/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [API Key Security Best Practices](https://cloud.google.com/docs/authentication/api-keys)

## 📝 Summary

You now have a **fully flexible** AI chatbot that:
- ✅ Works with or without Vercel
- ✅ Works with or without API keys
- ✅ Has 3 layers of fallback
- ✅ Supports all hosting platforms
- ✅ Maintains 9 specialized bot types
- ✅ Includes Bangladesh-specific emergency numbers
- ✅ Provides multilingual support (Bangla/English/Banglish)

**No matter what, your users will always get a response!** 🚀
