import webpush from 'web-push'
import { createAdminClient } from '@/lib/supabase/admin'

let configured = false

function ensureConfigured() {
  if (configured) return
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  const subject = process.env.VAPID_SUBJECT
  if (!publicKey || !privateKey || !subject) {
    throw new Error('NEXT_PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, and VAPID_SUBJECT must be set')
  }
  webpush.setVapidDetails(subject, publicKey, privateKey)
  configured = true
}

export interface PushPayload {
  title: string
  body: string
  url: string
}

/** Sends a push to every subscribed user. Prunes subscriptions the push service reports as gone. */
export async function sendPushToAllUsers(payload: PushPayload): Promise<{ sent: number; pruned: number }> {
  ensureConfigured()
  const supabase = createAdminClient()

  const { data: subs, error } = await supabase.from('push_subscriptions').select('*')
  if (error) throw new Error(error.message)
  if (!subs || subs.length === 0) return { sent: 0, pruned: 0 }

  let sent = 0
  const deadIds: string[] = []

  await Promise.all(
    subs.map(async sub => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          JSON.stringify(payload)
        )
        sent++
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number })?.statusCode
        if (statusCode === 404 || statusCode === 410) {
          deadIds.push(sub.id)
        }
      }
    })
  )

  if (deadIds.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', deadIds)
  }

  return { sent, pruned: deadIds.length }
}
