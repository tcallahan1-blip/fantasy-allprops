#!/usr/bin/env node
/**
 * Fantasy AllProps — seed.js
 *
 * Loads data/season-1-events.json (+ the enrichment data embedded in
 * generate-enrichments.js) and upserts every event into Supabase, keyed
 * on slug. Safe to re-run — re-running just updates existing rows.
 *
 * Requires a service role key (bypasses RLS, since this runs with no
 * authenticated user). NEVER expose that key to the browser or commit it.
 *
 * Usage:
 *   npm run seed
 *
 * Env (from .env.local or the shell):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { enrichments } = require('./generate-enrichments.js');

try {
  process.loadEnvFile(path.join(__dirname, '../.env.local'));
} catch {
  // no .env.local — fall back to whatever's already in the environment
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set ' +
    '(in .env.local or the environment). Find the service role key in ' +
    'Supabase project settings → API — keep it out of NEXT_PUBLIC_ vars.'
  );
  process.exit(1);
}

const eventsJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/season-1-events.json'), 'utf8')
);

const missingSlugs = eventsJson.events
  .map(e => e.id)
  .filter(slug => !(slug in enrichments));

if (missingSlugs.length > 0) {
  console.error('ERROR: Missing enrichment entries for the following slugs:');
  missingSlugs.forEach(s => console.error('  -', s));
  process.exit(1);
}

const rows = eventsJson.events.map(e => {
  const enrichment = enrichments[e.id];
  return {
    slug: e.id,
    name: e.name,
    category: e.category,
    season: eventsJson.meta.season,
    month: e.month,
    event_date: e.date ?? null,
    date_tbc: e.date_tbc,
    pick_type: e.pick_type,
    bonus_window: e.bonus_window,
    verification: e.verification,
    notes: e.notes ?? null,
    description: enrichment.description,
    website_url: enrichment.website_url,
    options: enrichment.options,
  };
});

const BATCH_SIZE = 50;

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  let upserted = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('events').upsert(batch, { onConflict: 'slug' });
    if (error) {
      console.error(`ERROR upserting batch starting at row ${i}:`, error.message);
      process.exit(1);
    }
    upserted += batch.length;
    console.log(`  ...${upserted}/${rows.length}`);
  }

  console.log(`✓ Seeded ${upserted} events into Supabase.`);
}

main();
