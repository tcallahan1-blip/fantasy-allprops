-- Add enrichment columns to events table
alter table public.events
  add column if not exists description text,
  add column if not exists website_url text,
  add column if not exists options jsonb;
