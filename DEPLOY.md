# Deploy to Vercel

## One-time setup

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Vercel auto-detects Vite. Click **Deploy** — no build settings needed (`vercel.json` handles it).

## Environment variables

In Vercel dashboard → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | From [resend.com](https://resend.com) → API Keys → Create Key |
| `CONTACT_EMAIL` | Email address to receive contact form submissions |
| `MONTHLY_EMAIL_LIMIT` | `80` (Resend free tier = 3,000 emails/month) |
| `VITE_CONTACT_EMAIL` | Same as `CONTACT_EMAIL` (exposed to frontend as fallback) |

## Local development

Copy `.env.local.example` to `.env.local` and fill in real values, then:

```bash
npm run dev
```

## Redeploy after env var changes

Vercel dashboard → **Deployments** → **Redeploy** (or push a new commit).
