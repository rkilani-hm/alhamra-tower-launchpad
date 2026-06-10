
-- ============ 1. PROFILE AUTO-CREATION ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'editor')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ 2. HELPER FUNCTION ============
CREATE OR REPLACE FUNCTION public.current_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- ============ 3. ENABLE RLS ON ALL 12 TABLES ============
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_fields    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stat_counters     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_cards     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_entries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spec_rows         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_prose        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings      ENABLE ROW LEVEL SECURITY;

-- ============ 4. POLICIES FOR 8 CONTENT TABLES ============
DO $$
DECLARE
  t text;
  tables text[] := ARRAY['sections','section_fields','stat_counters','awards','feature_cards','timeline_entries','spec_rows','page_prose'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS "public_read_published" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "staff_read_all" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "staff_insert" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "editor_update" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "manager_update" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "manager_delete" ON public.%I', t);

    EXECUTE format($f$
      CREATE POLICY "public_read_published" ON public.%I
        FOR SELECT TO anon, authenticated
        USING (status = 'published')
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "staff_read_all" ON public.%I
        FOR SELECT TO authenticated
        USING (public.current_role() IN ('editor','manager'))
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "staff_insert" ON public.%I
        FOR INSERT TO authenticated
        WITH CHECK (
          (public.current_role() = 'manager')
          OR (public.current_role() = 'editor' AND status = 'draft')
        )
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "editor_update" ON public.%I
        FOR UPDATE TO authenticated
        USING (public.current_role() = 'editor')
        WITH CHECK (public.current_role() = 'editor' AND status = 'draft')
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "manager_update" ON public.%I
        FOR UPDATE TO authenticated
        USING (public.current_role() = 'manager')
        WITH CHECK (public.current_role() = 'manager')
    $f$, t);

    EXECUTE format($f$
      CREATE POLICY "manager_delete" ON public.%I
        FOR DELETE TO authenticated
        USING (public.current_role() = 'manager')
    $f$, t);
  END LOOP;
END $$;

-- Grant anon SELECT on content tables (needed for public_read_published)
GRANT SELECT ON public.sections, public.section_fields, public.stat_counters,
  public.awards, public.feature_cards, public.timeline_entries,
  public.spec_rows, public.page_prose TO anon;

-- ============ 5. PROFILES POLICIES ============
DROP POLICY IF EXISTS "users_select_own" ON public.profiles;
DROP POLICY IF EXISTS "managers_select_all" ON public.profiles;
DROP POLICY IF EXISTS "managers_update_any" ON public.profiles;
DROP POLICY IF EXISTS "users_update_own_no_role" ON public.profiles;

CREATE POLICY "users_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "managers_select_all" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.current_role() = 'manager');

CREATE POLICY "managers_update_any" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.current_role() = 'manager')
  WITH CHECK (public.current_role() = 'manager');

-- Editors can update their own profile but NOT their role; enforce via trigger
CREATE POLICY "users_update_own_no_role" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() AND public.current_role() <> 'manager')
  WITH CHECK (id = auth.uid() AND public.current_role() <> 'manager');

CREATE OR REPLACE FUNCTION public.prevent_self_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role
     AND auth.uid() = NEW.id
     AND COALESCE((SELECT role FROM public.profiles WHERE id = auth.uid()), '') <> 'manager' THEN
    RAISE EXCEPTION 'Users cannot change their own role';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_self_role_change ON public.profiles;
CREATE TRIGGER profiles_prevent_self_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_change();

-- ============ 6. MEDIA_ASSETS POLICIES ============
DROP POLICY IF EXISTS "public_read_media" ON public.media_assets;
DROP POLICY IF EXISTS "staff_insert_media" ON public.media_assets;
DROP POLICY IF EXISTS "staff_update_media" ON public.media_assets;
DROP POLICY IF EXISTS "manager_delete_media" ON public.media_assets;

CREATE POLICY "public_read_media" ON public.media_assets
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "staff_insert_media" ON public.media_assets
  FOR INSERT TO authenticated
  WITH CHECK (public.current_role() IN ('editor','manager'));

CREATE POLICY "staff_update_media" ON public.media_assets
  FOR UPDATE TO authenticated
  USING (public.current_role() IN ('editor','manager'))
  WITH CHECK (public.current_role() IN ('editor','manager'));

CREATE POLICY "manager_delete_media" ON public.media_assets
  FOR DELETE TO authenticated
  USING (public.current_role() = 'manager');

GRANT SELECT ON public.media_assets TO anon;

-- ============ 7. CONTENT_VERSIONS POLICIES ============
DROP POLICY IF EXISTS "staff_read_versions" ON public.content_versions;
CREATE POLICY "staff_read_versions" ON public.content_versions
  FOR SELECT TO authenticated
  USING (public.current_role() IN ('editor','manager'));
-- No insert/update/delete policies => blocked for users; trigger uses SECURITY DEFINER

-- ============ 8. APP_SETTINGS POLICIES ============
DROP POLICY IF EXISTS "public_read_settings" ON public.app_settings;
DROP POLICY IF EXISTS "manager_write_settings" ON public.app_settings;
DROP POLICY IF EXISTS "manager_update_settings" ON public.app_settings;
DROP POLICY IF EXISTS "manager_delete_settings" ON public.app_settings;

CREATE POLICY "public_read_settings" ON public.app_settings
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "manager_write_settings" ON public.app_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.current_role() = 'manager');

CREATE POLICY "manager_update_settings" ON public.app_settings
  FOR UPDATE TO authenticated
  USING (public.current_role() = 'manager')
  WITH CHECK (public.current_role() = 'manager');

CREATE POLICY "manager_delete_settings" ON public.app_settings
  FOR DELETE TO authenticated
  USING (public.current_role() = 'manager');

GRANT SELECT ON public.app_settings TO anon;

-- ============ 9. PUBLISH-HISTORY TRIGGER ============
CREATE OR REPLACE FUNCTION public.record_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status IS DISTINCT FROM 'published' THEN
    INSERT INTO public.content_versions (table_name, record_id, snapshot, published_by, published_at)
    VALUES (TG_TABLE_NAME, NEW.id, to_jsonb(NEW), auth.uid(), now());
  END IF;
  RETURN NEW;
END;
$$;

DO $$
DECLARE
  t text;
  tables text[] := ARRAY['sections','section_fields','stat_counters','awards','feature_cards','timeline_entries','spec_rows','page_prose'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS record_publish_trg ON public.%I', t);
    EXECUTE format('CREATE TRIGGER record_publish_trg AFTER UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.record_publish()', t);
  END LOOP;
END $$;
