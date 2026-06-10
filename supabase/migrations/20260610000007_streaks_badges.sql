-- Add streak tracking and badges to profiles
alter table public.profiles
  add column if not exists current_streak int not null default 0,
  add column if not exists longest_streak int not null default 0,
  add column if not exists badges jsonb not null default '[]'::jsonb;

-- Category leaderboard function: same as global leaderboard but filtered by event category
-- Usage: select * from category_leaderboard('Sports-Major')
create or replace function public.category_leaderboard(cat text)
returns table (
  user_id uuid,
  username text,
  display_name text,
  avatar_url text,
  total_points bigint,
  total_picks bigint,
  correct_picks bigint,
  accuracy_pct numeric
) language sql stable as $$
  select
    p.user_id,
    pr.username,
    pr.display_name,
    pr.avatar_url,
    coalesce(sum(p.points_earned) filter (where p.status in ('correct', 'incorrect')), 0) as total_points,
    count(p.id) filter (where p.status in ('locked', 'correct', 'incorrect')) as total_picks,
    count(p.id) filter (where p.status = 'correct') as correct_picks,
    round(
      count(p.id) filter (where p.status = 'correct')::numeric /
      nullif(count(p.id) filter (where p.status in ('correct', 'incorrect')), 0) * 100,
      1
    ) as accuracy_pct
  from public.picks p
  join public.profiles pr on p.user_id = pr.id
  join public.events e on p.event_id = e.id
  where e.category = cat::event_category_enum
  group by p.user_id, pr.username, pr.display_name, pr.avatar_url, pr.created_at
  order by
    total_points desc,
    accuracy_pct desc nulls last,
    total_picks desc,
    pr.created_at asc;
$$;

-- Update leaderboard view to include streak
drop view if exists public.leaderboard;
create view public.leaderboard as
  select
    p.user_id,
    pr.username,
    pr.display_name,
    pr.avatar_url,
    pr.created_at as joined_at,
    pr.current_streak,
    pr.badges,
    coalesce(sum(p.points_earned) filter (where p.status in ('correct', 'incorrect')), 0) as total_points,
    count(p.id) filter (where p.status in ('locked', 'correct', 'incorrect')) as total_picks,
    count(p.id) filter (where p.status = 'correct') as correct_picks,
    count(p.id) filter (where p.status = 'incorrect') as incorrect_picks,
    round(
      count(p.id) filter (where p.status = 'correct')::numeric /
      nullif(count(p.id) filter (where p.status in ('correct', 'incorrect')), 0) * 100,
      1
    ) as accuracy_pct
  from public.picks p
  join public.profiles pr on p.user_id = pr.id
  group by p.user_id, pr.username, pr.display_name, pr.avatar_url, pr.created_at, pr.current_streak, pr.badges
  order by
    total_points desc,
    accuracy_pct desc nulls last,
    total_picks desc,
    pr.created_at asc;
