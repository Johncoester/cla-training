-- Private underwriter reference for the Title Review AI (Nov 23 2026).
-- Holds guidance taken from Fidelity's confidential underwriting material.
-- The text is loaded by hand on the server and is NEVER committed to this public repo,
-- never returned by the "rules" action, and only read by the title-review function.
create table if not exists title_review.reference (
  version    int primary key,
  text       text not null,
  note       text,
  created_at timestamptz not null default now()
);
alter table title_review.reference enable row level security;
revoke all on title_review.reference from public, anon, authenticated;
