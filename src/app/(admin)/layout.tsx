import Link from 'next/link'

const adminLinks = [
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/scoring', label: 'Scoring' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-lg tracking-tight">
              Fantasy AllProps
            </Link>
            <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="ml-2 px-3 py-1.5 text-sm text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
            >
              ← League
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  )
}
