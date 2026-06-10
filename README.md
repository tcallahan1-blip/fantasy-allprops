# Fantasy AllProps

A year-round public prediction league spanning sports, awards, politics, reality TV, culture, and more.

**Season 1:** August 2026 → July 2027 | 195 events across 12 categories

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS)
- **Supabase** (PostgreSQL, Row Level Security, Auth)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase project URL and anon key

# 3. Run database migrations
# Install Supabase CLI: https://supabase.com/docs/guides/cli
supabase db push

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
Fantasy AllProps/
├── docs/                       # League design documents
│   ├── league-rules.md         # Rules, scoring, season structure
│   ├── pick-types.md           # P / M / X pick type reference
│   ├── verification.md         # Automated vs manual verification
│   └── season-1-calendar.md   # 195 events month-by-month
├── data/
│   └── season-1-events.json   # Structured event data (seed source)
├── supabase/
│   └── migrations/
│       └── 20260610000000_initial_schema.sql
└── src/
    ├── app/
    │   ├── page.tsx             # Landing
    │   ├── (auth)/              # /login, /signup
    │   ├── (league)/            # /dashboard, /picks, /calendar, /leaderboard
    │   └── (admin)/             # /admin/events, /admin/scoring
    ├── lib/
    │   ├── supabase/            # Browser + server clients, middleware
    │   └── types/database.ts   # TypeScript types for all DB tables
    └── middleware.ts            # Auth-gating for protected routes
```

## Pick windows

| Code | Name | Points | Opens |
|------|------|--------|-------|
| P | Pre-Season | 15 pts | July 1, 2026 |
| M | Monthly | 10 pts | 1st of each month |
| X | Pop Prop | 5 pts | Per event (24–72 hrs before) |

Bonus-window events earn 1.5× when correct.

## Docs

See [docs/league-rules.md](docs/league-rules.md) for full league rules, pick types, and verification approach.
