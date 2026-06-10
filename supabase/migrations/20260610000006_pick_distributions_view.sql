-- Pick distribution per event (visible after window closes)
create view public.pick_distributions as
  select
    e.id as event_id,
    p.pick_value,
    count(*) as pick_count,
    round(
      count(*)::numeric /
      nullif(sum(count(*)) over (partition by e.id), 0) * 100,
      1
    ) as pct
  from public.picks p
  join public.events e on p.event_id = e.id
  where p.status in ('locked', 'correct', 'incorrect')
  group by e.id, p.pick_value;
