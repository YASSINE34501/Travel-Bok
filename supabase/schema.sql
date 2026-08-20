-- TRAVLBOK — Supabase schema
-- Run in the Supabase SQL editor, or `supabase db push` with the CLI.
--
-- Design notes:
--   * Reference tables (countries, costs, jobs, guides) are world-readable and
--     writable only by the service role, because they are editorial content.
--   * User tables are locked to the owning auth.uid() via RLS.
--   * Bilingual columns are stored as *_en / *_ar rather than a jsonb blob so
--     Postgres full-text search can index each language separately later.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Reference data
-- ---------------------------------------------------------------------------

create table if not exists public.countries (
  code            text primary key check (code = lower(code) and length(code) = 2),
  name_en         text not null,
  name_ar         text not null,
  flag            text not null,
  currency        text not null,
  region_en       text not null,
  region_ar       text not null,
  is_destination  boolean not null default false,
  created_at      timestamptz not null default now()
);

create table if not exists public.cost_of_living (
  country_code    text primary key references public.countries(code) on delete cascade,
  city_en         text not null,
  city_ar         text not null,
  -- All amounts are monthly USD so countries stay directly comparable.
  rent_center     numeric(10,2) not null check (rent_center >= 0),
  rent_outside    numeric(10,2) not null check (rent_outside >= 0),
  groceries       numeric(10,2) not null check (groceries >= 0),
  utilities       numeric(10,2) not null check (utilities >= 0),
  transport       numeric(10,2) not null check (transport >= 0),
  internet        numeric(10,2) not null check (internet >= 0),
  meal_out        numeric(10,2) not null check (meal_out >= 0),
  health_insurance numeric(10,2) not null default 0 check (health_insurance >= 0),
  avg_net_salary  numeric(10,2) not null check (avg_net_salary >= 0),
  updated_at      timestamptz not null default now()
);

create table if not exists public.education_levels (
  slug     text primary key,
  name_en  text not null,
  name_ar  text not null,
  -- Higher rank satisfies every lower requirement; drives the matcher filter.
  rank     smallint not null unique check (rank between 1 and 9)
);

create table if not exists public.job_fields (
  slug     text primary key,
  name_en  text not null,
  name_ar  text not null,
  icon     text not null default ''
);

create type public.demand_level as enum ('low', 'medium', 'high');

create table if not exists public.job_opportunities (
  id                uuid primary key default uuid_generate_v4(),
  country_code      text not null references public.countries(code) on delete cascade,
  field_slug        text not null references public.job_fields(slug),
  min_education     text not null references public.education_levels(slug),
  title_en          text not null,
  title_ar          text not null,
  demand            public.demand_level not null default 'medium',
  salary_from       integer not null check (salary_from >= 0),
  salary_to         integer not null check (salary_to >= salary_from),
  salary_currency   text not null,
  visa_sponsorship  boolean not null default false,
  licence_required  boolean not null default false,
  note_en           text not null default '',
  note_ar           text not null default '',
  updated_at        timestamptz not null default now()
);

-- The matcher always filters on these three columns together.
create index if not exists job_opportunities_filter_idx
  on public.job_opportunities (country_code, field_slug, min_education);
create index if not exists job_opportunities_demand_idx
  on public.job_opportunities (demand);

create table if not exists public.visa_guides (
  country_code  text primary key references public.countries(code) on delete cascade,
  title_en      text not null,
  title_ar      text not null,
  summary_en    text not null,
  summary_ar    text not null,
  intro_en      text not null,
  intro_ar      text not null,
  -- [{ name:{en,ar}, who:{en,ar}, processing:{en,ar}, cost:{en,ar} }]
  routes        jsonb not null default '[]'::jsonb,
  -- [{ en, ar }]
  requirements  jsonb not null default '[]'::jsonb,
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- User data
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  display_name      text,
  home_country      text references public.countries(code),
  education_level   text references public.education_levels(slug),
  field_slug        text references public.job_fields(slug),
  preferred_locale  text not null default 'en' check (preferred_locale in ('en','ar')),
  created_at        timestamptz not null default now()
);

create table if not exists public.saved_comparisons (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  from_country  text not null references public.countries(code),
  to_country    text not null references public.countries(code),
  monthly_income numeric(10,2),
  created_at    timestamptz not null default now()
);

create index if not exists saved_comparisons_user_idx
  on public.saved_comparisons (user_id, created_at desc);

-- Create a profile row automatically on sign-up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text check (char_length(name) <= 120),
  email       text not null check (char_length(email) <= 254 and position('@' in email) > 1),
  subject     text check (char_length(subject) <= 160),
  message     text not null check (char_length(message) between 10 and 4000),
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.countries          enable row level security;
alter table public.cost_of_living     enable row level security;
alter table public.education_levels   enable row level security;
alter table public.job_fields         enable row level security;
alter table public.job_opportunities  enable row level security;
alter table public.visa_guides        enable row level security;
alter table public.profiles           enable row level security;
alter table public.saved_comparisons  enable row level security;

-- Editorial content: readable by anyone (including the anon key used by SSR),
-- writable only by the service role, which bypasses RLS entirely.
do $$
declare tbl text;
begin
  foreach tbl in array array[
    'countries','cost_of_living','education_levels',
    'job_fields','job_opportunities','visa_guides'
  ] loop
    execute format(
      'drop policy if exists "public read %1$s" on public.%1$I', tbl
    );
    execute format(
      'create policy "public read %1$s" on public.%1$I for select using (true)', tbl
    );
  end loop;
end $$;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "own comparisons" on public.saved_comparisons;
create policy "own comparisons" on public.saved_comparisons
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Write-only mailbox: anyone may submit a message, nobody may read one back.
-- Staff read it through the Supabase dashboard, which uses the service role.
alter table public.contact_messages enable row level security;

drop policy if exists "anyone can send" on public.contact_messages;
create policy "anyone can send" on public.contact_messages
  for insert with check (true);
