/* ──────────────────────────────────────────────────────────────────────────
   Admin data layer — reads & writes for the Content Studio.

   All writes go through the authenticated Supabase client, so RLS applies:
   editors can save drafts but the DB rejects any attempt to publish; managers
   can publish. The publish action sets status='published', which fires the
   record_publish trigger (version history). updated_by is stamped with the
   current user.
────────────────────────────────────────────────────────────────────────── */

import { supabase } from "@/integrations/supabase/client";

export interface FlatField {
  id: string;
  group: string;        // section_key or page_key
  field_key: string;
  value_en: string | null;
  value_ar: string | null;
  field_type: string;   // 'short' | 'long'
  sort_order: number;
  status: string;       // 'draft' | 'published'
}

/* The two flat-text tables, presented to editors as one model. */
export type FlatTable = "section_fields" | "page_prose";

const GROUP_COL: Record<FlatTable, "section_key" | "page_key"> = {
  section_fields: "section_key",
  page_prose: "page_key",
};

/* List distinct groups (sections/pages) with row + draft counts. */
export async function listFlatGroups(table: FlatTable): Promise<
  { group: string; total: number; drafts: number }[]
> {
  const rows = table === "section_fields"
    ? (await supabase.from("section_fields").select("section_key,status")).data?.map(
        (r) => ({ group: r.section_key as string, status: r.status as string }))
    : (await supabase.from("page_prose").select("page_key,status")).data?.map(
        (r) => ({ group: r.page_key as string, status: r.status as string }));
  if (!rows) return [];
  const map = new Map<string, { total: number; drafts: number }>();
  for (const r of rows) {
    const e = map.get(r.group) ?? { total: 0, drafts: 0 };
    e.total++;
    if (r.status === "draft") e.drafts++;
    map.set(r.group, e);
  }
  return [...map.entries()]
    .map(([group, v]) => ({ group, ...v }))
    .sort((a, b) => a.group.localeCompare(b.group));
}

/* Load all fields for one group, ordered. */
export async function loadFlatFields(table: FlatTable, group: string): Promise<FlatField[]> {
  const res = table === "section_fields"
    ? await supabase.from("section_fields").select("*").eq("section_key", group).order("sort_order", { ascending: true })
    : await supabase.from("page_prose").select("*").eq("page_key", group).order("sort_order", { ascending: true });
  const { data, error } = res;
  if (error || !data) return [];
  const col = GROUP_COL[table];
  return (data as any[]).map((r) => ({
    id: r.id,
    group: r[col],
    field_key: r.field_key,
    value_en: r.value_en,
    value_ar: r.value_ar,
    field_type: r.field_type,
    sort_order: r.sort_order,
    status: r.status,
  }));
}

/* Save edits to a single field (keeps current status — does NOT publish). */
export async function saveFlatField(
  table: FlatTable,
  id: string,
  values: { value_en: string; value_ar: string | null }
): Promise<{ error: string | null }> {
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase
    .from(table)
    .update({
      value_en: values.value_en,
      value_ar: values.value_ar,
      updated_by: userData.user?.id ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  return { error: error?.message ?? null };
}

/* Publish a field (managers only — RLS enforces). Fires history trigger. */
export async function publishField(
  table: FlatTable,
  id: string
): Promise<{ error: string | null }> {
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase
    .from(table)
    .update({
      status: "published",
      updated_by: userData.user?.id ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  return { error: error?.message ?? null };
}

/* Revert a field to draft (managers only). Does not delete published history. */
export async function unpublishField(
  table: FlatTable,
  id: string
): Promise<{ error: string | null }> {
  const { error } = await supabase.from(table).update({ status: "draft" }).eq("id", id);
  return { error: error?.message ?? null };
}

/* Friendly display labels for the technical group keys. */
export const GROUP_LABELS: Record<string, string> = {
  // sections
  meta: "Site Metadata", nav: "Navigation", hero: "Homepage — Hero",
  intro: "Homepage — Introduction", gulf: "Homepage — Gulf Section",
  founderQuote: "Homepage — Founder Quote", credentials: "Homepage — Credentials",
  contactStrip: "Homepage — Contact Strip", footer: "Footer", language: "Language Switcher",
  // pages
  invitation: "Homepage — Invitation", architecture: "Homepage — Architecture",
  towerOverview: "Tower — Overview", towerDesign: "Tower — Design & Engineering",
  towerSustain: "Tower — Sustainability", towerRising: "Tower — Rising",
  businessCentre: "Experience — Business Centre", alHamraHotel: "Experience — Al Hamra Hotel",
};

export const groupLabel = (g: string) => GROUP_LABELS[g] ?? g;
