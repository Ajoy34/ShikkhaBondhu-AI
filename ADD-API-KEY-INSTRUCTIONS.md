# 🔑 How to Add Your Google API Key (Chat Not Working Issue)

## Problem
Your chat says "একটি ত্রুটি ঘটেছে" because the API key is not configured.

## Quick Fix (5 minutes)

### Step 1: Get Your API Key from Google

1. Go to: **https://aistudio.google.com/app/apikey**
2. Click **"Create API key"** (or use existing one)
3. Select or create a project
4. Copy the API key (starts with `AIza...`)

### Step 2: Add to Your Local .env File

Open the `.env` file in your project and **replace** this line:
```
VITE_GOOGLE_API_KEY=your-api-key-here
```

**With your actual key:**
```
VITE_GOOGLE_API_KEY=AIzaSyAirBu...YOUR-ACTUAL-KEY-HERE
```

### Step 3: Restart Dev Server

```powershell
# Stop the current server (Ctrl+C if running)
# Then restart:
npm run dev
```

### Step 4: Test Chat

Open your app and try chatting - it should work now! 🎉

---

## For Vercel Deployment

If you want it to work on Vercel too:

1. Go to your **Vercel Dashboard**
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add **TWO** variables:

**Variable 1:**
- Name: `GOOGLE_API_KEY`
- Value: `AIzaSy...` (your key)

**Variable 2:**
- Name: `VITE_GOOGLE_API_KEY`  
- Value: `AIzaSy...` (same key)

5. Click **Save**
6. Go to **Deployments** tab
7. Click ⋯ on latest deployment → **Redeploy**

---

## Security Tips 🔒

### Restrict Your API Key (Important!)

1. Go to: **https://console.cloud.google.com/apis/credentials**
2. Click on your API key
3. Under **API restrictions**:
   - Select **"Restrict key"**
   - Choose **"Generative Language API"** only
4. Under **Application restrictions** (Optional):
   - Select **"HTTP referrers (websites)"**
   - Add: `http://localhost:*/*` and `https://your-domain.com/*`
5. Save

This prevents others from stealing and using your API key.

---

## Testing

After adding the key, test these:

1. **General Chat**: "Hello" → Should get friendly response
2. **Bangla**: "হ্যালো" → Should respond in Bangla
3. **Academic**: "পড়াশোনায় সাহায্য চাই" → Should ask follow-up questions
4. **Crisis**: "কেউ আমাকে হয়রানি করছে" → Should show emergency numbers

---

## Troubleshooting

### Still not working?

**Check 1: API Key Format**
- Should start with `AIza`
- Should be one long string with no spaces
- Check for accidental line breaks

**Check 2: Browser Console**
- Press `F12` → Console tab
- Look for errors
- Should see: "Vercel endpoint not found, using direct API" (normal for local)

**Check 3: API Key Active?**
- Go to: https://console.cloud.google.com/apis/credentials
- Make sure key status is **"Active"**
- Check quota not exceeded

**Check 4: Restart Required**
```powershell
# Stop server (Ctrl+C)
npm run dev
```

---

## Need Help?

If chat still doesn't work:

1. **Check browser console** (F12) for error messages
2. **Try fallback**: The app has offline fallback chatbot
3. **Verify**: Key is correctly copied without spaces/breaks

Your key should look like:
```
VITE_GOOGLE_API_KEY=AIzaSyAirBuTcUMWHzWhugD8O20SO-9Bt4TOYSo
```
(This is an example - use YOUR actual key)

---

## Why Two Variables?

- `GOOGLE_API_KEY` → Used by Vercel serverless API (more secure)
- `VITE_GOOGLE_API_KEY` → Used by direct client-side API (works without Vercel)

Having both ensures your app works everywhere! 🚀
