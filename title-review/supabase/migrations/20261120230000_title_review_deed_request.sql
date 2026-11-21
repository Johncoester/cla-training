-- Deed only (no contract), John Nov 20 2026: the deed request intake form (who gets title, how, why, consideration).
-- Applied on CLA Training (upkrpewcsvfltqwmxmjs) Nov 20 2026. Rollback: alter table title_review.deeds drop column if exists request;
alter table title_review.deeds add column if not exists request jsonb;
comment on column title_review.deeds.request is 'Deed-only intake form (no sales contract): deed type, new owners, tenancy, relationship, consideration, trust/LLC, mortgage, notes.';
