-- Web Push subscriptions, for pop prop window-open alerts
create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);

alter table public.push_subscriptions enable row level security;

create policy "Users manage their own push subscriptions" on public.push_subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index push_subscriptions_user_id_idx on public.push_subscriptions(user_id);
