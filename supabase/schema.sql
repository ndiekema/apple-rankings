-- Pip core schema. Apply this in a new Supabase project's SQL editor or migration workflow.

create extension if not exists "pgcrypto";

create type public.friendship_status as enum ('pending', 'accepted', 'declined', 'blocked');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,24}$'),
  display_name text not null check (char_length(display_name) between 1 and 50),
  bio text not null default '' check (char_length(bio) <= 160),
  avatar_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.apples (
  id text primary key,
  canonical_name text unique not null,
  aliases text[] not null default '{}',
  origin text,
  peak_season text,
  traits text[] not null default '{}',
  description text not null,
  image_url text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status public.friendship_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> addressee_id),
  unique (requester_id, addressee_id)
);

create table public.apple_rankings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  apple_id text not null references public.apples(id),
  position integer not null check (position > 0),
  derived_score numeric(3,1) not null check (derived_score >= 2 and derived_score <= 10),
  caption text not null default '' check (char_length(caption) <= 280),
  ranked_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, apple_id),
  unique (user_id, position)
);

create table public.ranking_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  apple_id text not null references public.apples(id),
  ranking_id uuid references public.apple_rankings(id) on delete set null,
  event_type text not null check (event_type in ('ranked', 'moved', 'caption_updated')),
  old_position integer,
  new_position integer,
  caption_snapshot text not null default '' check (char_length(caption_snapshot) <= 280),
  created_at timestamptz not null default now()
);

-- Make a matching Pip profile whenever an Auth account is created. The
-- sign-up screen supplies the two required profile fields as user metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    lower(new.raw_user_meta_data ->> 'username'),
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), new.raw_user_meta_data ->> 'username')
  );
  return new;
end;
$$;

-- This function is invoked only by the auth.users trigger, not through the
-- public API. SECURITY DEFINER functions should never be executable by users.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create index rankings_apple_score_idx on public.apple_rankings (apple_id, derived_score desc);
create index ranking_activities_user_created_idx on public.ranking_activities (user_id, created_at desc);
create index friendships_lookup_idx on public.friendships (requester_id, addressee_id, status);

alter table public.profiles enable row level security;
alter table public.apples enable row level security;
alter table public.friendships enable row level security;
alter table public.apple_rankings enable row level security;
alter table public.ranking_activities enable row level security;

create policy "Public profiles and approved friends can view profiles"
on public.profiles for select using (
  is_public
  or auth.uid() = id
  or exists (
    select 1 from public.friendships
    where status = 'accepted'
      and ((requester_id = auth.uid() and addressee_id = profiles.id)
        or (addressee_id = auth.uid() and requester_id = profiles.id))
  )
);

create policy "People can create their own profile"
on public.profiles for insert with check (auth.uid() = id);

create policy "Users manage their own profile"
on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Anyone can browse active apples"
on public.apples for select using (is_active = true);

create policy "People can view their own friendships"
on public.friendships for select using (auth.uid() in (requester_id, addressee_id));

create policy "People can send their own friend requests"
on public.friendships for insert with check (auth.uid() = requester_id);

create policy "People can update requests they received or sent"
on public.friendships for update using (auth.uid() in (requester_id, addressee_id));

create policy "Public profiles and friends can view rankings"
on public.apple_rankings for select using (
  auth.uid() = user_id
  or exists (select 1 from public.profiles where profiles.id = apple_rankings.user_id and profiles.is_public)
  or exists (
    select 1 from public.friendships
    where status = 'accepted'
      and ((requester_id = auth.uid() and addressee_id = apple_rankings.user_id)
        or (addressee_id = auth.uid() and requester_id = apple_rankings.user_id))
  )
);

create policy "People manage their own rankings"
on public.apple_rankings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Public profile activity is visible"
on public.ranking_activities for select using (
  exists (select 1 from public.profiles where profiles.id = ranking_activities.user_id and profiles.is_public)
  or auth.uid() = user_id
);

create policy "People create their own ranking activity"
on public.ranking_activities for insert with check (auth.uid() = user_id);
