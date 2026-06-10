import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12">
        <Link href="/" className="font-bold text-lg text-white tracking-tight">
          Fantasy AllProps
        </Link>

        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Welcome back.
          </h2>
          <p className="text-zinc-400 text-base max-w-xs leading-relaxed">
            Your picks are waiting. Sign in to see what's resolved, what's open, and where you stand.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { n: '195', label: 'Events' },
              { n: '12', label: 'Categories' },
              { n: '15', label: 'Pts per pre-season pick' },
              { n: '1.5×', label: 'Bonus window multiplier' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/8 p-4">
                <div className="text-2xl font-bold text-white">{stat.n}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-600">Season 1 · August 2026 → July 2027</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        <div className="max-w-sm w-full mx-auto space-y-8">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-zinc-950">Sign in</h1>
            <p className="text-sm text-zinc-500">Good to have you back.</p>
          </div>

          <form className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
                <button type="button" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500">
            No account?{' '}
            <Link href="/signup" className="font-medium text-zinc-950 underline underline-offset-2 hover:text-zinc-700">
              Join Season 1
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
