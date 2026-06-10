
-- Trigger-only functions: revoke from everyone (triggers run regardless)
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_self_role_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.record_publish() FROM PUBLIC, anon, authenticated;

-- current_role is referenced by RLS policies; needs authenticated EXECUTE, not anon
REVOKE ALL ON FUNCTION public.current_role() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_role() TO authenticated;
