# Devlog

## 2026-02-24

### Siteline AI analytics

Added [Siteline AI](https://siteline.ai) HTTP API integration to track AI agent traffic.

- Created `src/middleware.ts` — fires async pageview events to `api.siteline.ai` on every request to `/`, `/notes/*`, `/docs/*`, `/updates`
- `SITELINE_WEBSITE_KEY` added to Vercel env vars and `.env.local`
- Added `.env*.local` to `.gitignore` (was missing)
