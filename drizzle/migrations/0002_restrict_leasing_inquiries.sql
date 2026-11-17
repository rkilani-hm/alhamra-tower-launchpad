DROP POLICY IF EXISTS "authenticated can read inquiries" ON public.leasing_inquiries;
CREATE POLICY "managers can read inquiries" ON public.leasing_inquiries FOR SELECT TO authenticated USING (public."current_role"() = 'manager');
DROP POLICY IF EXISTS "public can submit inquiries" ON public.leasing_inquiries;
CREATE POLICY "public can submit valid inquiries" ON public.leasing_inquiries FOR INSERT TO anon, authenticated WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (subject IS NULL OR length(subject) <= 300)
  AND status = 'new'
);