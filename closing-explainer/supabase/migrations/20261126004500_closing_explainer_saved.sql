-- Closing Package Explainer: save packages so they can be reopened (John, Nov 25 2026, 7:41 PM ET).
-- Only redacted page images are saved (Social Security numbers painted black in the browser before upload);
-- the original PDF is never stored. Reachable only through the closing-explainer edge function.
-- Applied on CLA Training (upkrpewcsvfltqwmxmjs) Nov 26 2026.
-- Rollback: drop schema closing_explainer cascade; delete from storage.objects where bucket_id = 'closing-explainer'; delete from storage.buckets where id = 'closing-explainer';
create schema if not exists closing_explainer;
revoke all on schema closing_explainer from public, anon, authenticated;

create table if not exists closing_explainer.packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null default '',
  page_count int not null default 0,
  docs jsonb not null default '[]'::jsonb,
  pages jsonb not null default '[]'::jsonb,   -- per page: n, w, h, scan, image path, lines (redacted text + positions)
  redactions int not null default 0,          -- how many SSNs were blacked out
  cost_usd numeric(10,4) not null default 0,  -- estimated Claude cost for this package (John: 'how much it cost me for each review')
  calls int not null default 0,
  status text not null default 'uploading' check (status in ('uploading','ready'))
);
create table if not exists closing_explainer.explanations (
  package_id uuid not null references closing_explainer.packages(id) on delete cascade,
  side text not null check (side in ('buyer','seller','both')),
  page int not null,
  result jsonb not null,
  created_at timestamptz not null default now(),
  primary key (package_id, side, page)
);
alter table closing_explainer.packages enable row level security;
alter table closing_explainer.explanations enable row level security;
revoke all on all tables in schema closing_explainer from public, anon, authenticated;

insert into storage.buckets (id, name, public) values ('closing-explainer', 'closing-explainer', false)
on conflict (id) do nothing;
