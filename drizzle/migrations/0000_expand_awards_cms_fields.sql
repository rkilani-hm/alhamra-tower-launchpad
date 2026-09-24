ALTER TABLE public.awards
  ADD COLUMN IF NOT EXISTS ribbon_en text,
  ADD COLUMN IF NOT EXISTS ribbon_ar text,
  ADD COLUMN IF NOT EXISTS organization_en text,
  ADD COLUMN IF NOT EXISTS organization_ar text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS body_en text,
  ADD COLUMN IF NOT EXISTS body_ar text,
  ADD COLUMN IF NOT EXISTS image_id uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.awards.sub_en IS 'Legacy subtitle field; retained for compatibility.';
COMMENT ON COLUMN public.awards.sub_ar IS 'Legacy subtitle field; retained for compatibility.';