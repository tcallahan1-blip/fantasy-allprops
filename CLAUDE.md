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
npm test       # run the Vitest suite once
npm run test:watch     # Vitest in watch mode
npm run test:coverage  # Vitest with a coverage report
```

## Pick window automation

`src/app/api/cron/pick-windows/route.ts`, triggered daily at noon UTC by Vercel
Cron (`vercel.json`), opens/closes event pick windows based on
`pick_window_opens_at` / `pick_window_closes_at` and locks any `draft` picks
once a window closes. Guarded by `CRON_SECRET` (must match Vercel's
`Authorization: Bearer` header).

The schedule is once-daily because this project is on Vercel's Hobby plan,
which rejects more frequent cron expressions outright (confirmed — a `*/15
* * * *` schedule failed deployment). This means Pop Prop windows (24–72 hr
notice) can lock up to ~24 hours later than their actual close time. Upgrade
to Vercel Pro to tighten this to every 15 minutes, or point an external
scheduler (e.g. GitHub Actions, cron-job.org) at the same route with the same
`CRON_SECRET`.

Whenever that cron opens a Pop Prop (`X`) window, it also sends a Web Push
notification to every subscribed user (`src/lib/push.ts`) — see below.

## Push notifications

Standard Web Push (VAPID), not a third-party service. `NotificationToggle`
(in the league header) registers `public/sw.js` and subscribes the browser;
subscriptions are stored in `push_subscriptions`, keyed by push endpoint.
`sendPushToAllUsers()` in `src/lib/push.ts` sends to all of them and prunes
subscriptions the push service reports as gone (404/410). Needs
`NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` —
generate a pair with `npx web-push generate-vapid-keys`. If those env vars
aren't set, the cron just skips sending rather than failing the whole run.

## Tests

Vitest (`vitest.config.ts` + `vitest.setup.ts`, which stubs `next/cache` and
`next/navigation` since those touch request-scoped internals that don't exist
outside a running Next.js server). `src/lib/testing/mockSupabase.ts` is a
shared chainable/thenable stand-in for the supabase-js query builder — mock
`createClient`/`createAdminClient` per test file, then queue return values
with `supabase.from.mockReturnValueOnce(mockBuilder({ data, error }))` in call
order.

Covered so far: `calcPoints`, `scoreEvent` (admin gate, result validation,
point math, streak updates), `upsertPick` / `updateConfidence` (window-status
and confidence-budget validation), and the pick-windows cron (auth guard,
window transitions, pick locking, Pop Prop push triggering). Not yet covered:
`admin/events` CRUD, `leagues` actions, any UI/component-level tests.

## What's not built yet

- Deeper test coverage (see above)
