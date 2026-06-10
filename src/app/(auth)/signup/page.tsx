import Link from 'next/link'

const PREVIEW_PICKS = [
  { event: 'Super Bowl LXI winner', type: 'Pre-Season', pts: 15 },
  { event: '99th Academy Awards — Best Picture', type: 'Pop Prop', pts: 5 },
  { event: 'Australian Open 2027 champion', type: 'Monthly', pts: 10 },
  { event: 'Eurovision Song Contest 2027', type: 'Pre-Season', pts: 15 },
  { event: 'Grammy AOTY 2027', type: 'Pop Prop', pts: 5 },
]

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12">
        <Link href="/" className="font-bold text-lg text-white tracking-tight">
          Fantasy AllProps
        </Link>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Season 1 · Aug 2026 → Jul 2027
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
              195 events.<br />One season.<br />Every call.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
              Sports, awards, politics, reality TV, esports, and the obscure proper props that make the league fair.
            </p>
          </div>

          <div className="space-y-2">
            {PREVIEW_PICKS.map((pick, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/8 px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-white">{pick.event}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{pick.type}</div>
                </div>
                <div className="text-xs font-semibold text-amber-400 shrink-0 ml-4">+{pick.pts} pts</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-600">Free to play. Season 1 pre-season picks open July 2026.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="max-w-sm w-full mx-auto space-y-8">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-zinc-950">Join Season 1</h1>
            <p className="text-sm text-zinc-500">Create your account and start picking.</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-zinc-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                placeholder="yourhandle"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                placeholder="8+ characters"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-zinc-950 underline underline-offset-2 hover:text-zinc-700">
              Sign in
            </Link>
          </p>

          <p className="text-xs text-zinc-400 text-center leading-relaxed">
            Free to play. No payment required.
          </p>
        </div>
      </div>
    </div>
  )
}
