-- CLA Title Training: database setup
-- Run this whole file once in Supabase: SQL Editor -> New query -> paste -> Run.
-- BEFORE RUNNING: replace admin@example.com at the bottom with your own email.

-- ---------- Tables ----------
create table if not exists public.invites (
  email       text primary key check (email = lower(email)),
  full_name   text,
  role        text not null default 'learner' check (role in ('learner','admin')),
  invited_at  timestamptz not null default now(),
  invited_by  uuid
);

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  role        text not null default 'learner' check (role in ('learner','admin')),
  created_at  timestamptz not null default now(),
  last_seen   timestamptz
);

create table if not exists public.attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  course_id   text not null,
  mode        text not null check (mode in ('exam','practice')),
  score       int  not null,
  total       int  not null,
  pct         int  not null,
  passed      boolean not null default false,
  secs        int,
  sections    jsonb,
  missed      jsonb,
  timed_out   boolean default false,
  created_at  timestamptz not null default now()
);
create index if not exists attempts_user_course on public.attempts(user_id, course_id);

create table if not exists public.lesson_progress (
  user_id      uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  course_id    text not null,
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);

-- ---------- Helper functions ----------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.my_role() returns text
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Only invited emails can create an account. Their profile is created from the invite.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare inv public.invites;
begin
  select * into inv from public.invites where email = lower(new.email);
  if not found then
    raise exception 'NOT_INVITED: % has not been invited', new.email;
  end if;
  insert into public.profiles (id, email, full_name, role)
  values (new.id, lower(new.email), inv.full_name, inv.role)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep a profile's role in sync if the admin changes the invite's role later.
create or replace function public.sync_invite_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set role = new.role, full_name = coalesce(new.full_name, full_name)
  where email = new.email;
  return new;
end $$;

drop trigger if exists on_invite_update on public.invites;
create trigger on_invite_update
  after update on public.invites
  for each row execute function public.sync_invite_role();

-- ---------- Row level security ----------
alter table public.invites         enable row level security;
alter table public.profiles        enable row level security;
alter table public.attempts        enable row level security;
alter table public.lesson_progress enable row level security;

-- invites: admins only
drop policy if exists invites_admin on public.invites;
create policy invites_admin on public.invites
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- profiles: see your own, admins see all; you can edit your own name but not your role
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated using (id = auth.uid())
  with check (id = auth.uid() and role = public.my_role());
drop policy if exists profiles_admin on public.profiles;
create policy profiles_admin on public.profiles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- attempts: add and read your own; admins read and delete all
drop policy if exists attempts_insert_self on public.attempts;
create policy attempts_insert_self on public.attempts
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists attempts_read on public.attempts;
create policy attempts_read on public.attempts
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists attempts_admin_delete on public.attempts;
create policy attempts_admin_delete on public.attempts
  for delete to authenticated using (public.is_admin());

-- lesson progress: manage your own; admins read all
drop policy if exists progress_self on public.lesson_progress;
create policy progress_self on public.lesson_progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists progress_admin_read on public.lesson_progress;
create policy progress_admin_read on public.lesson_progress
  for select to authenticated using (public.is_admin());

-- ---------- First admin ----------
-- Replace with YOUR email (lowercase), then run.
insert into public.invites (email, full_name, role)
values ('admin@example.com', 'Admin', 'admin')
on conflict (email) do update set role = 'admin';
