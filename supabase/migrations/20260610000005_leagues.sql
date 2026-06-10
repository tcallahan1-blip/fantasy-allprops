-- Private leagues with invite tokens

create table public.leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  invite_token text unique not null default encode(gen_random_bytes(12), 'hex'),
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table public.league_memberships (
  league_id uuid references public.leagues(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (league_id, user_id)
);

alter table public.leagues enable row level security;
alter table public.league_memberships enable row level security;

-- Leagues: viewable by members
create policy "League members can view their leagues" on public.leagues
  for select using (
    exists (
      select 1 from public.league_memberships
      where league_id = leagues.id and user_id = auth.uid()
    )
  );

-- Leagues: anyone authenticated can create
create policy "Authenticated users can create leagues" on public.leagues
  for insert with check (auth.uid() = owner_id);

-- Leagues: owner can update
create policy "Owner can update league" on public.leagues
  for update using (auth.uid() = owner_id);

-- Memberships: users can see memberships for leagues they belong to
create policy "Members can view memberships in their leagues" on public.league_memberships
  for select using (
    user_id = auth.uid() or
    exists (
      select 1 from public.league_memberships lm2
      where lm2.league_id = league_memberships.league_id and lm2.user_id = auth.uid()
    )
  );

-- Memberships: users can join (insert their own)
create policy "Users can join leagues" on public.league_memberships
  for insert with check (auth.uid() = user_id);

-- Memberships: users can leave (delete their own)
create policy "Users can leave leagues" on public.league_memberships
  for delete using (auth.uid() = user_id);

create index leagues_owner_idx on public.leagues(owner_id);
create index league_memberships_user_idx on public.league_memberships(user_id);
create index league_memberships_league_idx on public.league_memberships(league_id);
