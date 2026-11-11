-- Creates a public Pip profile whenever someone signs up through Supabase Auth.

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

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Pip may already have test accounts from before this trigger was installed.
-- Backfill valid sign-up metadata without modifying existing profiles.
insert into public.profiles (id, username, display_name)
select
  id,
  lower(raw_user_meta_data ->> 'username'),
  coalesce(nullif(raw_user_meta_data ->> 'display_name', ''), raw_user_meta_data ->> 'username')
from auth.users
where raw_user_meta_data ->> 'username' ~ '^[a-z0-9_]{3,24}$'
  and char_length(coalesce(nullif(raw_user_meta_data ->> 'display_name', ''), raw_user_meta_data ->> 'username')) between 1 and 50
on conflict do nothing;
