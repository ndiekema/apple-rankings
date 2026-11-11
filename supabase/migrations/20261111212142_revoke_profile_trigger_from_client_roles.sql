-- Supabase gives API roles explicit function grants. This trigger function is
-- internal only and must not be callable through the public RPC API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
