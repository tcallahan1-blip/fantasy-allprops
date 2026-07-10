'use client'

import { useEffect, useState, useTransition } from 'react'
import { subscribeToPush, unsubscribeFromPush } from './actions'

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const output = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i)
  return output
}

type Status = 'checking' | 'off' | 'on'

export default function NotificationToggle() {
  const [status, setStatus] = useState<Status>('checking')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    // Unsupported browsers stay in 'checking', which renders nothing — same as 'unsupported' would.
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    navigator.serviceWorker.register('/sw.js').then(async (reg) => {
      const existing = await reg.pushManager.getSubscription()
      setStatus(existing ? 'on' : 'off')
    })
  }, [])

  function handleEnable() {
    setError(null)
    startTransition(async () => {
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!publicKey) {
        setError('Push notifications are not configured for this deployment.')
        return
      }
      try {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          setError('Notification permission was not granted.')
          return
        }
        const reg = await navigator.serviceWorker.ready
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        })
        const res = await subscribeToPush(subscription.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } })
        if (res.error) {
          setError(res.error)
          return
        }
        setStatus('on')
      } catch {
        setError('Could not enable notifications in this browser.')
      }
    })
  }

  function handleDisable() {
    setError(null)
    startTransition(async () => {
      const reg = await navigator.serviceWorker.ready
      const subscription = await reg.pushManager.getSubscription()
      if (subscription) {
        await unsubscribeFromPush(subscription.endpoint)
        await subscription.unsubscribe()
      }
      setStatus('off')
    })
  }

  if (status === 'checking') return null

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={status === 'on' ? handleDisable : handleEnable}
        disabled={isPending}
        className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors disabled:opacity-40"
      >
        {status === 'on' ? '🔔 Pop prop alerts on' : '🔕 Enable pop prop alerts'}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
