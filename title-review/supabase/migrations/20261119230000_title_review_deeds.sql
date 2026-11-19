-- Deed preparation (John, Nov 19 2026). One row per deed draft. The AI fills facts; the page builds the deed from CLA's wording.
create table if not exists title_review.deeds (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  review_id uuid references title_review.reviews(id) on delete set null,
  file_no text, reviewer_name text,
  files jsonb not null default '[]'::jsonb,
  status text not null default 'queued' check (status in ('uploading','queued','running','done','error')),
  progress text, facts jsonb, edits jsonb, model text, usage jsonb, error text, raw_output text,
  approved_by text, approved_at timestamptz, started_at timestamptz, completed_at timestamptz
);
create index if not exists deeds_review_idx on title_review.deeds(review_id);
alter table title_review.deeds enable row level security;
alter table title_review.feedback add column if not exists deed_id uuid references title_review.deeds(id) on delete cascade;
alter table title_review.feedback alter column review_id drop not null;
