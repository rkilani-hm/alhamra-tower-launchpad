ALTER TABLE public.awards ADD COLUMN IF NOT EXISTS page_key text;
CREATE INDEX IF NOT EXISTS awards_page_key_sort_order_idx ON public.awards (page_key, sort_order);