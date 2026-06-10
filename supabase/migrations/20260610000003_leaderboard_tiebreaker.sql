-- Rebuild leaderboard view with tiebreaker ordering:
-- 1. total_points DESC  2. accuracy_pct DESC  3. total_picks DESC  4. earliest signup ASC
drop view if exists public.leaderboard;
create view public.leaderboard as
  select
    p.user_id,
    pr.username,
    pr.display_name,
    pr.avatar_url,
    pr.created_at as joined_at,
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
  group by p.user_id, pr.username, pr.display_name, pr.avatar_url, pr.created_at
  order by
    total_points desc,
    accuracy_pct desc nulls last,
    total_picks desc,
    pr.created_at asc;
