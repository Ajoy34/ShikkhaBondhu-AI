# 🚀 Deployment Guide - Free 24/7 Hosting Options

This guide shows you how to deploy your **Sikkhabondho** React + Vite + Supabase app for **FREE** with **full control** on multiple platforms.

---

## 📋 Prerequisites

1. **GitHub Account** (required for all options)
2. **Supabase Project** with your database already set up
3. **Git installed** on your computer

---

## 🌟 Best Free Hosting Options (Recommended Order)

### Option 1: **Vercel** ⭐ (EASIEST & FASTEST)
- ✅ Unlimited projects
- ✅ Auto-deploys on push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Zero configuration needed

### Option 2: **Netlify** 
- ✅ 100GB bandwidth/month
- ✅ Auto-deploys on push
- ✅ Free SSL certificate
- ✅ Great for static sites

### Option 3: **Render**
- ✅ Free tier for static sites
- ✅ Auto-deploys from GitHub
- ✅ Free SSL certificate

### Option 4: **GitHub Pages**
- ✅ Completely free
- ✅ Hosted directly from your repo
- ⚠️ Requires GitHub Actions setup

---

## 🔧 Step 1: Prepare Your Project

### 1.1 Get Your Supabase Credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Open your project
3. Go to **Project Settings** → **API**
4. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### 1.2 Create Local Environment File

Create a `.env` file in your project root (this file stays on your computer):

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase values!

### 1.3 Test Build Locally

```powershell
npm run build
```

This should create a `dist` folder. If it works, you're ready to deploy! ✅

---

## 🚀 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```powershell
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 2.2 Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `sikkhabondho` (or any name you want)
3. Keep it **Public** or **Private** (your choice)
4. **DO NOT** initialize with README (you already have files)
5. Click **Create repository**

### 2.3 Push Your Code

```powershell
git remote add origin https://github.com/YOUR-USERNAME/sikkhabondho.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username!

---

## 🎯 Step 3: Deploy (Choose ONE platform)

---

### 🟢 **OPTION A: Vercel** (Recommended - Takes 2 minutes!)

#### Step 1: Sign Up & Connect
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories

#### Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Find your `sikkhabondho` repository
3. Click **"Import"**

#### Step 3: Configure
1. **Framework Preset**: Vite ✅ (auto-detected)
2. **Build Command**: `npm run build` ✅ (auto-filled)
3. **Output Directory**: `dist` ✅ (auto-filled)
4. Click **"Environment Variables"** section
5. Add these two variables:
   ```
   Name: VITE_SUPABASE_URL
   Value: https://your-project-id.supabase.co
   
   Name: VITE_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```

#### Step 4: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏱️
3. Your site is LIVE! 🎉

#### Step 5: Get Your URL
- You'll get a URL like: `https://sikkhabondho.vercel.app`
- You can add a custom domain later (free!)

#### Auto-Deploy Setup ✅
Every time you push to GitHub, Vercel automatically rebuilds and deploys!

---

### 🟣 **OPTION B: Netlify**

#### Step 1: Sign Up
1. Go to [https://app.netlify.com/signup](https://app.netlify.com/signup)
2. Click **"Sign up with GitHub"**

#### Step 2: New Site from Git
1. Click **"Add new site"** → **"Import an existing project"**
2. Click **"GitHub"** → Authorize Netlify
3. Select your `sikkhabondho` repository

#### Step 3: Configure
1. **Build command**: `npm run build` ✅ (auto-detected)
2. **Publish directory**: `dist` ✅ (auto-detected)
3. Click **"Show advanced"** → **"New variable"**
4. Add environment variables:
   ```
   VITE_SUPABASE_URL = https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```

#### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes
3. Your site is LIVE! 🎉

#### Get Your URL
- You'll get: `https://random-name.netlify.app`
- You can customize it: **Site settings** → **Change site name**

---

### 🔵 **OPTION C: Render**

#### Step 1: Sign Up
1. Go to [https://render.com/register](https://render.com/register)
2. Sign up with GitHub

#### Step 2: New Static Site
1. Click **"New"** → **"Static Site"**
2. Connect your `sikkhabondho` repository

#### Step 3: Configure
1. **Name**: `sikkhabondho`
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. Click **"Advanced"** → **"Add Environment Variable"**
5. Add both:
   ```
   VITE_SUPABASE_URL = https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```

#### Step 4: Deploy
1. Click **"Create Static Site"**
2. Wait 3-5 minutes
3. Your site is LIVE! 🎉

---

### ⚫ **OPTION D: GitHub Pages** (Most Control, More Setup)

#### Step 1: Create GitHub Actions Workflow

Create this file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 2: Add Secrets to GitHub
1. Go to your repo on GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add both:
   - Name: `VITE_SUPABASE_URL`, Value: `https://your-project-id.supabase.co`
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: `your-anon-key-here`

#### Step 3: Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` → **/ (root)** → **Save**

#### Step 4: Update vite.config.ts
Add base URL to your `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/sikkhabondho/', // Your repo name
})
```

#### Step 5: Push & Deploy
```powershell
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

Your site will be at: `https://YOUR-USERNAME.github.io/sikkhabondho/`

---

## 🎉 Success! Your Site is Live 24/7

### What happens now?

✅ **Auto-Deploy**: Every `git push` automatically updates your live site  
✅ **Free SSL**: Your site uses HTTPS automatically  
✅ **Global CDN**: Fast loading worldwide  
✅ **24/7 Uptime**: No sleep/shutdown on free tier  

---

## 🔄 Making Updates

1. Edit your code locally
2. Test with `npm run dev`
3. Commit and push:
   ```powershell
   git add .
   git commit -m "Update feature X"
   git push
   ```
4. Your site auto-deploys in 2-3 minutes! ✨

---

## 🆘 Troubleshooting

### Build fails with "Missing Supabase environment variables"
➡️ **Fix**: Make sure you added both environment variables on your hosting platform

### Site shows 404 on refresh
➡️ **Fix**: The `vercel.json` or `netlify.toml` files handle this. Make sure they're in your repo.

### Changes not showing up
➡️ **Fix**: 
1. Hard refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Check deployment logs on your platform dashboard
3. Check your latest commit went through: `git log`

### Supabase connection error
➡️ **Fix**:
1. Verify your Supabase project is active
2. Check environment variables are correct (no extra spaces!)
3. Make sure your Supabase URL starts with `https://`

---

## 💰 Cost Comparison

| Platform | Free Tier | Bandwidth | Build Minutes | Custom Domain |
|----------|-----------|-----------|---------------|---------------|
| **Vercel** | ✅ Unlimited projects | 100GB/month | Unlimited | ✅ Free |
| **Netlify** | ✅ 1 concurrent build | 100GB/month | 300 min/month | ✅ Free |
| **Render** | ✅ Static sites | 100GB/month | 500 hrs/month | ✅ Free |
| **GitHub Pages** | ✅ Unlimited | 100GB/month | 2000 min/month | ✅ Free |

All platforms are **completely free** for your use case! 🎊

---

## 🌐 Adding a Custom Domain (Optional)

All platforms support free custom domains!

### Example: `www.sikkhabondho.com`

1. Buy domain from: Namecheap, GoDaddy, or Google Domains (~$10-15/year)
2. On your hosting platform:
   - **Vercel**: Settings → Domains → Add domain
   - **Netlify**: Site settings → Domain management → Add custom domain
   - **Render**: Settings → Custom domains → Add custom domain
3. Update your domain's DNS settings (platform will show exact records)
4. Wait 10-60 minutes for DNS to propagate
5. Done! ✅

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Render Docs**: [render.com/docs](https://render.com/docs)

---

## ✅ Quick Checklist

- [ ] Supabase credentials ready
- [ ] `.env` file created locally
- [ ] Code pushed to GitHub
- [ ] Hosting platform account created
- [ ] Environment variables added on platform
- [ ] Site deployed successfully
- [ ] Tested all features work live

---

**🎯 Recommendation**: Start with **Vercel** - it's the fastest and easiest! You can always switch later.

Good luck with your deployment! 🚀
