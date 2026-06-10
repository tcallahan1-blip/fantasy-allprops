-- Fix bonus multiplier: scoring_rules should store base_points only.
-- The 1.5× bonus is applied conditionally at score-time when event.bonus_window = true.
update public.scoring_rules set bonus_multiplier = 1.0;
