'use client'

import { useState } from 'react'

export default function InviteLink({ url, isOwner }: { url: string; isOwner: boolean }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-zinc-500 mb-1">Invite link</div>
        <div className="text-sm font-mono text-zinc-700 truncate">{url}</div>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
