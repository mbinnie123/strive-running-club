-- Run in the Supabase SQL editor.
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  session_date date not null,
  name text not null,
  email text not null,
  phone text,
  notes text,
  unique (session_id, session_date, email)
);

-- Server uses the service role key; block all public access.
alter table contact_messages enable row level security;
alter table bookings enable row level security;

create table if not exists membership_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  name text not null,
  email text not null,
  phone text,
  notes text
);
alter table membership_signups enable row level security;
