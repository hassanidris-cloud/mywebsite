-- Client & Project Intake System
-- Run in Supabase SQL Editor after leads table exists.

-- Sequence for human-readable client IDs (CL001, CL002, ...)
create sequence if not exists public.client_id_seq start 1;

-- Clients: one row per unique email (created on first project request)
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  client_id text not null unique,  -- e.g. CL001
  name text not null,
  email text not null unique,
  company text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_clients_email on public.clients(email);
create index if not exists idx_clients_client_id on public.clients(client_id);

-- Projects: linked to client via client_id (uuid)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  project_name text not null default 'New project',
  project_type text,  -- website-design, redesign, template, etc.
  description text,
  status text not null default 'inquiry' check (status in ('inquiry', 'planning', 'in progress', 'revision', 'completed')),
  price numeric(12,2),  -- total project price (eur)
  deadline date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_projects_client_id on public.projects(client_id);
create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_deadline on public.projects(deadline);

-- Files: optional uploads / assets per project
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_name text not null,
  file_url text,  -- Supabase Storage URL or external link
  file_type text,  -- image, document, etc.
  uploaded_at timestamptz not null default now()
);

create index if not exists idx_files_project_id on public.files(project_id);

-- Payments: track payments per project (e.g. deposit, final)
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete restrict,
  amount numeric(12,2) not null,
  currency text not null default 'eur',
  status text not null default 'pending' check (status in ('pending', 'paid', 'refunded', 'failed')),
  stripe_payment_id text,
  notes text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_payments_project_id on public.payments(project_id);

-- Client notes (free-form notes about the client)
create table if not exists public.client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_client_notes_client_id on public.client_notes(client_id);

-- Function to generate next client_id (CL001, CL002, ...)
create or replace function public.next_client_id()
returns text language plpgsql as $$
declare
  n bigint;
begin
  select nextval('public.client_id_seq') into n;
  return 'CL' || lpad(n::text, 3, '0');
end;
$$;

-- RLS
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.files enable row level security;
alter table public.payments enable row level security;
alter table public.client_notes enable row level security;

create policy "Service role full access clients" on public.clients for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access projects" on public.projects for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access files" on public.files for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access payments" on public.payments for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "Service role full access client_notes" on public.client_notes for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
