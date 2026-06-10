-- Fantasy AllProps — Initial Schema
-- Season 1: August 2026 → July 2027

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- ============================================================
-- EVENTS
-- ============================================================
create type pick_type_enum as enum ('P', 'M', 'X');
create type verification_enum as enum ('A', 'M');
create type event_status_enum as enum ('upcoming', 'window_open', 'window_closed', 'result_pending', 'scored', 'cancelled');
create type event_category_enum as enum (
  'Sports-Major', 'Sports-Niche', 'Sports-Olympic',
  'Politics', 'RealityTV', 'Awards', 'Influencer',
  'Culture', 'NicheChamp', 'Tech', 'Weather', 'Esports'
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category event_category_enum not null,
  season integer not null default 1,
  month text not null,
  event_date date,
  date_tbc boolean default false,
  pick_type pick_type_enum not null,
  bonus_window boolean default false,
  verification verification_enum not null,
  status event_status_enum default 'upcoming',
  pick_window_opens_at timestamptz,
  pick_window_closes_at timestamptz,
  official_result text,
  result_confirmed_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.events enable row level security;

create policy "Events are viewable by everyone" on public.events
  for select using (true);

create policy "Only admins can modify events" on public.events
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create index events_season_idx on public.events(season);
create index events_status_idx on public.events(status);
create index events_pick_type_idx on public.events(pick_type);
create index events_category_idx on public.events(category);

-- ============================================================
-- PICKS
-- ============================================================
create type pick_status_enum as enum ('draft', 'locked', 'correct', 'incorrect', 'void');

create table public.picks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete cascade not null,
  pick_value text not null,
  status pick_status_enum default 'draft',
  locked_at timestamptz,
  points_earned integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, event_id)
);

alter table public.picks enable row level security;

create policy "Users can view their own picks" on public.picks
  for select using (auth.uid() = user_id);

create policy "Admins can view all picks" on public.picks
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Users can create their own picks" on public.picks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own draft picks" on public.picks
  for update using (
    auth.uid() = user_id and status = 'draft'
  );

create policy "Admins can update any pick (for scoring)" on public.picks
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create index picks_user_id_idx on public.picks(user_id);
create index picks_event_id_idx on public.picks(event_id);
create index picks_status_idx on public.picks(status);

-- ============================================================
-- LEADERBOARD VIEW
-- ============================================================
create view public.leaderboard as
  select
    p.user_id,
    pr.username,
    pr.display_name,
    pr.avatar_url,
    coalesce(sum(p.points_earned) filter (where p.status in ('correct', 'incorrect')), 0) as total_points,
    count(p.id) filter (where p.status = 'locked' or p.status in ('correct', 'incorrect')) as total_picks,
    count(p.id) filter (where p.status = 'correct') as correct_picks,
    count(p.id) filter (where p.status = 'incorrect') as incorrect_picks,
    round(
      count(p.id) filter (where p.status = 'correct')::numeric /
      nullif(count(p.id) filter (where p.status in ('correct', 'incorrect')), 0) * 100,
      1
    ) as accuracy_pct
  from public.picks p
  join public.profiles pr on p.user_id = pr.id
  group by p.user_id, pr.username, pr.display_name, pr.avatar_url
  order by total_points desc;

-- ============================================================
-- SCORING RULES
-- ============================================================
create table public.scoring_rules (
  id uuid primary key default gen_random_uuid(),
  pick_type pick_type_enum not null unique,
  base_points integer not null,
  bonus_multiplier numeric(3,2) default 1.0,
  created_at timestamptz default now()
);

-- Default scoring
insert into public.scoring_rules (pick_type, base_points, bonus_multiplier) values
  ('P', 15, 1.5),
  ('M', 10, 1.5),
  ('X', 5,  1.5);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger events_updated_at before update on public.events
  for each row execute procedure public.handle_updated_at();

create trigger picks_updated_at before update on public.picks
  for each row execute procedure public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
