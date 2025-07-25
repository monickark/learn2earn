create table search_history (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  count int default 1,
  inserted_at timestamp default now(),
  updated_at timestamp default now()
);

-- Add uniqueness to prevent duplicates
create unique index idx_topic_unique on search_history(topic);

===============================.  RPC.  =======================================

create or replace function increment_search_count(search_topic text)
returns void as $$
begin
  update search_history
  set count = count + 1,
      updated_at = now()
  where topic = search_topic;
end;
$$ language plpgsql;
