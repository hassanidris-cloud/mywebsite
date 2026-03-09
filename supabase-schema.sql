-- Run this in Supabase SQL Editor to create the leads table.
-- Also create a "subscribers" table for the newsletter signup if desired.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  website text,
  budget text,
  timeline text,
  project_type text,
  description text not null,
  source text,
  is_high_value boolean not null default false,
  created_at timestamptz not null default now()
);

-- Optional: allow service role to insert (handled by your env key).
-- RLS: enable RLS and add policy so only service role can insert/select.
alter table public.leads enable row level security;

create policy "Service role can do anything on leads"
  on public.leads for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Newsletter subscribers (for "Stay updated" form)
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

create policy "Service role can do anything on subscribers"
  on public.subscribers for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
