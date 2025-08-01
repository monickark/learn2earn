create table search_logs (
  id uuid default uuid_generate_v4() primary key,
  topic text,
  count int default 1,
  inserted_at timestamp with time zone default timezone('utc'::text, now())
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  profile_image text,
  created_at timestamp with time zone default now()
);

alter table public.users enable row level security;

create policy "Allow individual read access"
  on public.users
  for select
  using (auth.uid() = id);

create policy "Allow individual insert access"
  on public.users
  for insert
  with check (auth.uid() = id);

create policy "Allow individual update access"
  on public.users
  for update
  using (auth.uid() = id);
