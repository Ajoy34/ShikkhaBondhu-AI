# Preview & Feedback Workflow

This project supports a simple, no-backend review flow so you can preview changes before publishing and collect feedback.

## 1) Local Preview (fastest)

- Start the dev server:
  - `npm run dev`
- Open the app with review mode on:
  - http://localhost:5173/?review=1 (or whatever port Vite shows)
- A yellow "Preview Mode" banner appears at the top.
- Click "Give Feedback" to write notes. Feedback is saved to your browser only.
- Click "Export" to download all feedback as `feedback.json` and share with the team.

Tip: You can also enable review mode with an env var:

- Create a `.env.local` file and add `VITE_REVIEW_MODE=1`
- Restart the dev server

## 2) Production-like Local Preview

This builds the app and serves the production build locally:

- `npm run build`
- `npm run preview`
- Open http://localhost:4173/?review=1 — review banner will show

## 3) Vercel Preview Deployments (recommended for sharing)

Use branches and pull requests so every change gets a unique Preview URL:

1. Create a branch
   - `git checkout -b feature/your-change`
2. Push and open a Pull Request to `main`
3. Vercel creates a Preview deployment URL (e.g., `https://your-branch-your-app.vercel.app`)
4. Visit the URL with `?review=1` to enable the review banner

Optional: Set Vercel Preview Environment Variable so banner is always on:

- In Vercel Project → Settings → Environment Variables
  - Name: `VITE_REVIEW_MODE`
  - Value: `1`
  - Environment: `Preview`

## 4) Collecting & Sharing Feedback

- Feedback lives in your browser (localStorage), so it’s private by default.
- Use the Export button in the banner to download a JSON file
- Share that file in your PR or with the team

## 5) Turning the Banner Off

- Remove `?review=1` from the URL
- Or set `VITE_REVIEW_MODE` to `0`

## Notes

- No backend is required for this workflow.
- If you prefer storing feedback in Supabase, we can wire it later (requires a `feedback` table and service role).
