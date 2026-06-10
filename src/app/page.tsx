import Link from 'next/link'

const CATEGORIES = [
  { label: 'Major Sports', color: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
  { label: 'Niche Sports', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20' },
  { label: 'Awards', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20' },
  { label: 'Reality TV', color: 'bg-pink-500/15 text-pink-300 border-pink-500/20' },
  { label: 'Politics', color: 'bg-red-500/15 text-red-300 border-red-500/20' },
  { label: 'Esports', color: 'bg-violet-500/15 text-violet-300 border-violet-500/20' },
  { label: 'Culture', color: 'bg-purple-500/15 text-purple-300 border-purple-500/20' },
  { label: 'Influencer', color: 'bg-orange-500/15 text-orange-300 border-orange-500/20' },
  { label: 'Niche Champs', color: 'bg-lime-500/15 text-lime-300 border-lime-500/20' },
  { label: 'Tech', color: 'bg-zinc-400/15 text-zinc-300 border-zinc-500/20' },
  { label: 'Weather', color: 'bg-sky-500/15 text-sky-300 border-sky-500/20' },
  { label: 'Olympic Sports', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20' },
]

const FEATURED_EVENTS = [
  'Super Bowl LXI',
  '99th Academy Awards',
  'Wimbledon 2027',
  'F1 World Championship',
  'Grammy Awards',
  'The Traitors UK',
  'Champions League Final',
  'Eurovision 2027',
  'US Midterms',
  'NBA Finals',
  'Love Island UK',
  'Nobel Peace Prize',
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Make your pre-season picks',
    body: 'Before August 2026, lock in your big calls — Super Bowl winner, Ballon d\'Or, Nobel Peace Prize, Eurovision. 15 points each.',
  },
  {
    step: '02',
    title: 'Pick every month',
    body: 'Each month a new window opens — Australian Open, Masters, Cheltenham, Oscars. Submit by the 7th. 10 points each.',
  },
  {
    step: '03',
    title: 'Jump on pop props',
    body: 'Short-window props open 24–72 hours before big moments. Grammy AOTY, NFL Draft pick #1, Met Gala best-dressed. 5 points each.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/8 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-bold text-lg tracking-tight">Fantasy AllProps</span>
          <div className="flex items-center gap-3">
            <Link href="/leaderboard" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/calendar" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Calendar
            </Link>
            <Link
              href="/login"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Join Season 1
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Season 1 opens August 2026
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Pick everything.<br />
            <span className="text-zinc-400">Win everything.</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A year-long prediction league spanning 195 events — sports, awards, politics,
            reality TV, culture, esports, and more. One season. Every call.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/signup"
              className="rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              Join Season 1 — it's free
            </Link>
            <Link
              href="/calendar"
              className="rounded-xl border border-white/15 px-7 py-3.5 text-base font-medium text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Browse 195 events →
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling event ticker */}
      <section className="overflow-hidden border-y border-white/8 py-4 bg-white/3">
        <div className="flex gap-8 whitespace-nowrap animate-none">
          <div className="flex gap-8">
            {[...FEATURED_EVENTS, ...FEATURED_EVENTS].map((event, i) => (
              <span key={i} className="text-sm text-zinc-500 font-medium shrink-0">
                <span className="text-zinc-600 mr-3">·</span>{event}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-extrabold tracking-tight">195</div>
            <div className="text-zinc-500 mt-2 text-sm">Pickable events</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold tracking-tight">12</div>
            <div className="text-zinc-500 mt-2 text-sm">Categories</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold tracking-tight">12</div>
            <div className="text-zinc-500 mt-2 text-sm">Months of picks</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Something for everyone</h2>
            <p className="text-zinc-400">12 categories. No niche too obscure.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat.label}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${cat.color}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-b border-white/8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Three ways to pick</h2>
            <p className="text-zinc-400">Long-range strategy meets real-time moments.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/4 p-6 space-y-3">
                <div className="text-3xl font-black text-zinc-700">{item.step}</div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">Ready to play?</h2>
          <p className="text-zinc-400 text-lg">Pre-season picks open July 2026. Sign up now to get notified.</p>
          <Link
            href="/signup"
            className="inline-block rounded-xl bg-white px-8 py-4 text-base font-semibold text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            Join Season 1 — it's free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-600">
          <span className="font-medium">Fantasy AllProps</span>
          <span>Season 1 · Aug 2026 → Jul 2027</span>
        </div>
      </footer>
    </div>
  )
}
