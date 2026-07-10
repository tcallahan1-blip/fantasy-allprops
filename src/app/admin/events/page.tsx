import { createClient } from '@/lib/supabase/server'
import EventsTable from './EventsTable'
import type { Event } from '@/lib/types/database'

export default async function AdminEventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('month')
    .order('name')

  return <EventsTable events={(events ?? []) as Event[]} />
}
