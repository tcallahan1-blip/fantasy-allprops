import Link from 'next/link'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/picks', label: 'My Picks' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/leaderboard', label: 'Leaderboard' },
]

export default function LeagueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-base tracking-tight text-zinc-950">
            Fantasy AllProps
          </Link>
          <nav className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-zinc-500 rounded-lg hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-xs font-medium text-amber-700">Season 1</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-600">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  )
}
