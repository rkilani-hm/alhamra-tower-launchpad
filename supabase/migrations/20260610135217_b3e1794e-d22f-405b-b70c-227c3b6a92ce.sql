
-- profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text NOT NULL DEFAULT 'editor' CHECK (role IN ('editor','manager')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- media_assets
CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text,
  public_url text,
  alt_en text,
  alt_ar text,
  width int,
  height int,
  uploaded_by uuid REFERENCES public.profiles(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- sections
CREATE TABLE public.sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- section_fields
CREATE TABLE public.section_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  field_key text NOT NULL,
  value_en text,
  value_ar text,
  field_type text NOT NULL DEFAULT 'short' CHECK (field_type IN ('short','long')),
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- stat_counters
CREATE TABLE public.stat_counters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_key text NOT NULL,
  stat_key text NOT NULL,
  start int NOT NULL DEFAULT 0,
  "end" int,
  step int NOT NULL DEFAULT 1,
  display_en text,
  display_ar text,
  unit_en text,
  unit_ar text,
  label_en text,
  label_ar text,
  sub_en text,
  sub_ar text,
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- awards
CREATE TABLE public.awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text,
  title_en text,
  title_ar text,
  sub_en text,
  sub_ar text,
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- feature_cards
CREATE TABLE public.feature_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection text NOT NULL,
  num text,
  title_en text,
  title_ar text,
  body_en text,
  body_ar text,
  image_id uuid REFERENCES public.media_assets(id),
  image_caption_en text,
  image_caption_ar text,
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- timeline_entries
CREATE TABLE public.timeline_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection text NOT NULL,
  year text,
  title_en text,
  title_ar text,
  body_en text,
  body_ar text,
  image_id uuid REFERENCES public.media_assets(id),
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- spec_rows
CREATE TABLE public.spec_rows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en text,
  category_ar text,
  label_en text,
  label_ar text,
  value_en text,
  value_ar text,
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- page_prose
CREATE TABLE public.page_prose (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  field_key text NOT NULL,
  value_en text,
  value_ar text,
  field_type text NOT NULL DEFAULT 'short' CHECK (field_type IN ('short','long')),
  sort_order int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES public.profiles(id)
);

-- content_versions
CREATE TABLE public.content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  snapshot jsonb NOT NULL,
  published_by uuid REFERENCES public.profiles(id),
  published_at timestamptz NOT NULL DEFAULT now(),
  note text
);

-- app_settings
CREATE TABLE public.app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value_en text,
  value_ar text
);
