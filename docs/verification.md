# Fantasy AllProps — Verification Approach
Season 1: August 2026 – July 2027

---

## Overview

195 events require result verification. 62% can be automated via official APIs or public data sources; 38% require manual commissioner entry.

| Type | Count | Share |
|------|-------|-------|
| Automated (A) | 121 | 62% |
| Manual (M) | 74 | 38% |

---

## Automated Verification (A)

Results are fetched from official public sources or league APIs. Points are credited within 24 hours of result confirmation.

**Data sources by category:**

| Category | Source |
|----------|--------|
| NFL, NBA, MLB, NHL | Official league APIs / ESPN API |
| F1 | Ergast API / Formula1.com |
| Tennis Grand Slams | ATP/WTA API |
| Golf Majors | OWGR / PGA Tour API |
| Elections | Associated Press / Reuters feeds |
| Spotify Wrapped | Spotify Web API |
| LoL Worlds / Valorant Champions | Riot Games API |
| Dota 2 The International | Valve / Liquipedia API |
| World Marathon Majors | Official race results |
| Horse racing | Racing API / Betfair |
| Sumo | Japan Sumo Association |
| Premier League | Premier League API |
| UEFA competitions | UEFA.com / FBref |

**Automated scoring flow:**
1. Event marked "live" when window closes
2. Cron job polls API at defined intervals post-event
3. On result confirmation, picks are evaluated and points credited
4. Player notification sent with result + points earned

---

## Manual Verification (M)

Manual verification is required for outcomes that involve judgement calls, subjective selection, or governing bodies without public APIs.

**Manual verification categories:**
- Reality TV finales (most UK/AU shows lack structured APIs)
- Subjective awards (Met Gala best-dressed, Time Person of the Year, BBC Sports Personality)
- Literary prizes (Booker, Pulitzer, Nobel Literature)
- Sumo basho yusho (cross-checked with JSA)
- Niche championships (Cheese Rolling, Dog Shows, Spelling Bee, Marble Championships)
- UK / AU broadcast-dependent results

**Manual scoring flow:**
1. Commissioner monitors event via broadcast / official announcement
2. Result entered in admin panel within 24 hours of announcement
3. System evaluates picks against entered result
4. Points credited and notifications sent within 48 hours of event

---

## TBC Events (88 of 195)

88 events are marked `[TBC]` — mostly 2027 events where the governing body hasn't yet confirmed the date. These follow a noted "typical pattern" for scheduling.

**Handling:**
- Typical-pattern date is used for pick window scheduling
- Events are monitored for official date confirmation (target: 3 months out)
- If an event date shifts significantly, pick windows are updated and players notified
- If an event is cancelled, picks are voided and no points awarded

---

## Appeals Process

1. Player submits an appeal via the in-app appeal form within **48 hours** of result posting
2. Commissioner reviews the source material (broadcast, official announcement, API data)
3. Decision communicated within **48 hours** of appeal submission
4. If result is corrected, scoring is recalculated and standings updated
5. Commissioner decision is final

---

## Verification Confidence Matrix

Events in the catalogue are tagged with a confidence level that informs how aggressively we schedule automation:

| Confidence | Criteria | Action |
|------------|----------|--------|
| High | Official API exists, confirmed date, clear single winner | Full automation |
| Medium | Public data available but parsing required, or date [TBC] | Semi-automated with manual confirm |
| Low | Judged outcome, no API, niche governing body | Manual entry required |
