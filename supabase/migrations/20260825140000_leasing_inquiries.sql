-- Leasing inquiry submissions captured from the public website form.
-- Idempotent so it is safe to re-run on any Lovable/Supabase re-sync.

create table if not exists public.leasing_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  lang text,
  source text not null default 'website',
  status text not null default 'new'
);

alter table public.leasing_inquiries enable row level security;

-- The public website (anon) may submit; only signed-in staff may read leads.
drop policy if exists "public can submit inquiries" on public.leasing_inquiries;
create policy "public can submit inquiries"
  on public.leasing_inquiries for insert to anon, authenticated with check (true);

drop policy if exists "authenticated can read inquiries" on public.leasing_inquiries;
create policy "authenticated can read inquiries"
  on public.leasing_inquiries for select to authenticated using (true);

grant insert on table public.leasing_inquiries to anon;
grant select, insert on table public.leasing_inquiries to authenticated;
