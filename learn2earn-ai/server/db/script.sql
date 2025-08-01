create table search_logs (
  id uuid default uuid_generate_v4() primary key,
  topic text,
  count int default 1,
  inserted_at timestamp with time zone default timezone('utc'::text, now())
);
