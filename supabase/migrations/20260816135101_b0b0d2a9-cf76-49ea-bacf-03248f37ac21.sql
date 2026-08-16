REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (id, email, full_name) ON public.profiles TO authenticated;
GRANT UPDATE ON public.profiles TO service_role;

CREATE OR REPLACE FUNCTION public.prevent_self_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role
     AND COALESCE((SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()), '') <> 'manager' THEN
    RAISE EXCEPTION 'Only managers can change roles';
  END IF;
  RETURN NEW;
END;
$$;

DROP POLICY IF EXISTS users_update_own_no_role ON public.profiles;
CREATE POLICY users_update_own_no_role ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid()
    AND role = COALESCE((SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()), role)
  );
