# 🚀 Deploy ShikkhaBondhu to Vercel - Complete Guide

## ✅ Prerequisites Done:
- ✅ Build successful (`npm run build`)
- ✅ Vercel config exists (`vercel.json`)
- ✅ Supabase backend working
- ✅ Real-time signup & login implemented

---

## 📋 Step-by-Step Deployment

### **Step 1: Install Vercel CLI (if not installed)**

Open PowerShell and run:
```powershell
npm install -g vercel
```

### **Step 2: Login to Vercel**

```powershell
vercel login
```

This will open your browser. Choose login method:
- GitHub (recommended)
- GitLab
- Bitbucket
- Email

### **Step 3: Deploy to Vercel**

Navigate to your project folder:
```powershell
cd C:\Users\ajoys\Downloads\Sikkhabondho\project
```

Then deploy:
```powershell
vercel
```

**Answer the prompts:**
```
? Set up and deploy "~/Downloads/Sikkhabondho/project"? [Y/n] Y
? Which scope? Your username/organization
? Link to existing project? [y/N] N
? What's your project's name? shikkhabondhu
? In which directory is your code located? ./
```

Vercel will automatically detect:
- ✅ Framework: Vite
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`

### **Step 4: Add Environment Variables**

**CRITICAL:** Add your Supabase credentials to Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project: **shikkhabondhu**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://pakkuvcnhleqpcaxtruw.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha2t1dmNuaGxlcXBjYXh0cnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODA2OTksImV4cCI6MjA3Mjc1NjY5OX0.5MQrH7miN_tWIkOOUrb8mU7MZIYI4NP2SdALcqcZHdk
```

**Variable 3:**
```
Name: VITE_GOOGLE_API_KEY
Value: AIzaSyAuL94ws2_XOwutCg6F0AawkZCsOS3JWNU
```

5. Click **Save** for each variable

### **Step 5: Redeploy with Environment Variables**

After adding environment variables, redeploy:

```powershell
vercel --prod
```

This deploys to production with your environment variables.

### **Step 6: Get Your Live URL**

Vercel will give you a URL like:
```
https://shikkhabondhu.vercel.app
```

or
```
https://shikkhabondhu-ajoy34.vercel.app
```

---

## 🎯 Quick Commands Reference

### Deploy to Preview (staging):
```powershell
vercel
```

### Deploy to Production:
```powershell
vercel --prod
```

### Check deployment status:
```powershell
vercel ls
```

### Open project in browser:
```powershell
vercel open
```

---

## 🔧 Alternative: Deploy via GitHub

### **Option A: Deploy from GitHub (Easier)**

1. **Push to GitHub:**
```powershell
git add -A
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Go to: https://vercel.com/new
   - Click **"Import Git Repository"**
   - Select your GitHub repo: **ShikkhaBondhu-AI**
   - Click **"Import"**

3. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add the 3 variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_GOOGLE_API_KEY)

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Done! ✅

---

## 🌐 After Deployment

### Your website will be live at:
```
https://your-project-name.vercel.app
```

### Features Working:
- ✅ Real-time signup (instant account creation)
- ✅ Real-time login (automatic login after signup)
- ✅ Bengali + English interface
- ✅ All AI features
- ✅ Dashboard
- ✅ Points system

### Test Your Live Site:
1. Open: `https://your-project.vercel.app`
2. Click **"নিবন্ধন করুন"** (Sign Up)
3. Create account
4. **Automatically logged in!** ✅

---

## 🔄 Future Updates

Every time you push to GitHub, Vercel will automatically redeploy:

```powershell
git add -A
git commit -m "Update features"
git push origin main
```

Vercel detects the push and deploys automatically! 🚀

---

## ⚠️ Important Security Notes

### After Deployment, Update Supabase URL Settings:

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **pakkuvcnhleqpcaxtruw**
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel URL to **Redirect URLs**:
   ```
   https://your-project.vercel.app
   https://your-project.vercel.app/**
   ```

5. Update **Site URL**:
   ```
   https://your-project.vercel.app
   ```

This ensures authentication works on your live site.

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Website loads at Vercel URL
- [ ] No "Invalid API key" error
- [ ] Signup form works
- [ ] Login form works
- [ ] Real-time auto-login after signup works
- [ ] Dashboard shows after login
- [ ] All features accessible

---

## 🆘 Troubleshooting

### If you see "Invalid API key" on live site:

1. **Check Environment Variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify all 3 variables are set correctly
   - Redeploy: `vercel --prod`

2. **Check Supabase URL Configuration:**
   - Add your Vercel URL to Supabase redirect URLs
   - Save and try again

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl + Shift + R`
   - Or use incognito mode

### If build fails:

1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to test
3. Fix any TypeScript errors
4. Redeploy

---

## 📱 Custom Domain (Optional)

Want your own domain like `shikkhabondhu.com`?

1. Buy domain from Namecheap, GoDaddy, etc.
2. Go to Vercel → Project → Settings → Domains
3. Click **"Add Domain"**
4. Follow DNS configuration steps
5. Done! Your site will be at your custom domain ✅

---

## 🎯 Next Steps

1. **Deploy now:** `vercel --prod`
2. **Get your live URL**
3. **Test signup/login on live site**
4. **Share with users!** 🚀

**Your app is production-ready!** 🎉
