-- SECURITY DEFINER functions are executable by PUBLIC by default. This one is
-- only meant to be called by the auth.users trigger, so remove public access.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
