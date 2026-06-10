'use client'

import { useRouter, usePathname } from 'next/navigation'
import type { EventCategory } from '@/lib/types/database'

interface Props {
  currentCat: string | undefined
  categories: Record<EventCategory, string>
}

export default function CategoryLeaderboard({ currentCat, categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function select(cat: string | null) {
    if (cat) {
      router.push(`${pathname}?cat=${encodeURIComponent(cat)}`)
    } else {
      router.push(pathname)
    }
  }

  const tabs = [
    { key: null, label: 'Overall' },
    ...Object.entries(categories).map(([key, label]) => ({ key, label })),
  ]

  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map(tab => (
        <button
          key={tab.key ?? '__all'}
          onClick={() => select(tab.key)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            (tab.key ?? undefined) === currentCat
              ? 'bg-zinc-950 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
