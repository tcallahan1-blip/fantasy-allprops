# Fantasy AllProps — Claude Code Context

## What this is

Fantasy AllProps is a public prediction league for Season 1 (August 2026 → July 2027). Players pick outcomes for 195 real-world events across 12 categories: sports, awards, politics, reality TV, culture, esports, and more.

Toby is the product and league mechanics owner. Rules are in draft — mechanics are being iterated.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Supabase** (PostgreSQL + Row Level Security + Auth via `@supabase/ssr`)
- Server components by default; only use client components when you need interactivity

## Key concepts

**Pick windows:**
- `P` = Pre-Season (15 pts): locked before season opens; long-horizon outcomes
- `M` = Monthly (10 pts): locked by 7th of each month; recent-form picks
- `X` = Pop Prop (5 pts): short-window, event-specific; announced with 24–72 hrs notice

**Bonus windows:** Dense event clusters → 1.5× point multiplier for correct picks

**Verification:**
- `A` = Automated via official API (62% of events)
- `M` = Manual commissioner entry (38% — judged, niche, or broadcast-only results)

## Where things live

| Path | Purpose |
|------|---------|
| `docs/league-rules.md` | Full rules (draft — still iterating) |
| `docs/pick-types.md` | Pick window reference |
| `docs/verification.md` | Verification approach |
| `docs/season-1-calendar.md` | 195 events month-by-month |
| `data/season-1-events.json` | Structured event data — use this to seed the DB |
| `supabase/migrations/` | DB schema |
| `src/lib/types/database.ts` | TypeScript types for all DB entities |
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/middleware.ts` | Auth-gating (protected routes redirect to /login) |

## App routes

- `/` — public landing
- `/login`, `/signup` — auth
- `/dashboard` — player home (requires auth)
- `/picks` — player's picks across all windows
- `/calendar` — event browser (all 195 events, public)
- `/leaderboard` — season standings (public)
- `/admin/events` — manage events + results (admin only)
- `/admin/scoring` — run scoring passes (admin only)

## Dev commands

```bash
npm run dev    # start dev server on :3000
npm run build  # production build
npm run lint   # ESLint
npm run seed   # load data/season-1-events.json into Supabase (needs SUPABASE_SERVICE_ROLE_KEY)
```

## Pick window automation

`src/app/api/cron/pick-windows/route.ts`, triggered every 15 min by Vercel Cron
(`vercel.json`), opens/closes event pick windows based on `pick_window_opens_at`
/ `pick_window_closes_at` and locks any `draft` picks once a window closes.
Guarded by `CRON_SECRET` (must match Vercel's `Authorization: Bearer` header).
Note: Vercel Hobby-tier projects only run crons once a day — this needs a Pro
plan (or an external scheduler hitting the same route) for near-real-time
pop-prop locking.

## What's not built yet

- Push notifications for pop prop windows opening
- Test suite
