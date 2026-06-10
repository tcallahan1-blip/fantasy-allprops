-- Add confidence multiplier to picks (1=default, 2=double, 3=triple)
alter table public.picks
  add column confidence smallint not null default 1
    check (confidence between 1 and 3);
