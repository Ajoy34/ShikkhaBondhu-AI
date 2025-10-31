# Sikkhabondho - Educational Platform 🎓

A modern educational platform built with React, TypeScript, Vite, and Supabase.

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- Supabase account and project

### Setup

1. **Clone and Install**
   ```powershell
   cd path/to/project
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Run Development Server**
   ```powershell
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```powershell
npm run build
```

Output will be in the `dist` folder.

## 🌐 Deploy (FREE 24/7 Hosting)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete step-by-step guides for:

- ⭐ **Vercel** (Recommended - Easiest, 2 minutes)
- 🟣 **Netlify** (Great alternative)
- 🔵 **Render** (Another solid option)
- ⚫ **GitHub Pages** (Most control)

All options are **100% FREE** with unlimited uptime!

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Hosting**: Vercel / Netlify / Render / GitHub Pages

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── ChatSystem.tsx
│   ├── ReportSystem.tsx
│   └── ...
├── lib/
│   └── supabase.ts    # Supabase client
├── utils/
│   └── chatbotLogic.ts
├── styles/
│   └── fonts.css
├── App.tsx
└── main.tsx

supabase/
└── migrations/        # Database migrations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌟 Features

- 📚 Educational Content Management
- 💬 Interactive Chat System
- 🤖 AI Lab Integration
- 📊 Report System
- 👥 Social Impact Hub
- 🎮 Gamification System
- ♿ Accessibility Features
- 🗣️ Voice Assistant
- 👴 Elderly Citizen Support
- 🙋 Volunteer Management

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbG...` |

Get these from: Supabase Dashboard → Project Settings → API

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

Need help? Check out the [DEPLOYMENT.md](./DEPLOYMENT.md) guide or open an issue.

---

**Ready to deploy?** 👉 See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete hosting instructions!
