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

/* ── Publish history (content_versions) ──────────────────────────────────
   Read-only audit of publishes; restore writes a snapshot's values back to
   the live row (managers only — RLS on the target table enforces this). */

export interface VersionRow {
  id: string;
  table_name: string;
  record_id: string;
  snapshot: Record<string, any>;
  published_at: string;
  note: string | null;
}

export async function listVersions(limit = 50): Promise<VersionRow[]> {
  const { data, error } = await supabase
    .from("content_versions")
    .select("id,table_name,record_id,snapshot,published_at,note")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as VersionRow[];
}

/* Restore a snapshot: write its editable values back onto the live row.
   We only restore content columns (not id/updated_at/status bookkeeping),
   then leave status as-is (restoring republishes by writing values; the row
   stays published). Managers only — RLS enforces. */
export async function restoreVersion(v: VersionRow): Promise<{ error: string | null }> {
  const snap = v.snapshot || {};
  // Strip columns we must not overwrite.
  const SKIP = new Set(["id", "created_at"]);
  const payload: Record<string, any> = {};
  for (const [k, val] of Object.entries(snap)) {
    if (SKIP.has(k)) continue;
    payload[k] = val;
  }
  const { data: u } = await supabase.auth.getUser();
  payload.updated_by = u.user?.id ?? null;
  payload.updated_at = new Date().toISOString();
  const { error } = await (supabase.from(v.table_name as any) as any)
    .update(payload)
    .eq("id", v.record_id);
  return { error: error?.message ?? null };
}

/* A readable one-line summary of what a snapshot contains. */
export function versionSummary(v: VersionRow): string {
  const s = v.snapshot || {};
  const key = s.field_key || s.stat_key || s.collection || s.category_en || "record";
  const text = s.value_en || s.title_en || s.label_en || s.display_en || "";
  return text ? `${key}: ${String(text).slice(0, 60)}` : String(key);
}

/* ── Media library (media_assets + site-media storage bucket) ────────────── */

export interface MediaAsset {
  id: string;
  public_url: string | null;
  storage_path: string | null;
  alt_en: string | null;
}

export async function listMedia(): Promise<MediaAsset[]> {
  const { data, error } = await supabase
    .from("media_assets")
    .select("id,public_url,storage_path,alt_en")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as MediaAsset[];
}

/* Upload a file to the site-media bucket and create a media_assets row.
   Returns the new asset id on success. */
export async function uploadMedia(file: File): Promise<{ id: string | null; error: string | null }> {
  try {
    const ext = file.name.split(".").pop() || "bin";
    const path = `${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "3600", upsert: false,
    });
    if (up.error) return { id: null, error: up.error.message };

    const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
    const { data: u } = await supabase.auth.getUser();
    const ins = await supabase.from("media_assets").insert({
      storage_path: path,
      public_url: pub.publicUrl,
      alt_en: file.name,
      uploaded_by: u.user?.id ?? null,
    }).select("id").single();
    if (ins.error) return { id: null, error: ins.error.message };
    return { id: ins.data.id, error: null };
  } catch (e: any) {
    return { id: null, error: e?.message ?? "Upload failed" };
  }
}

/* Set the image_id on a feature_cards or timeline_entries row. */
export async function setRowImage(
  table: "feature_cards" | "timeline_entries", id: string, imageId: string | null
): Promise<{ error: string | null }> {
  const { data: u } = await supabase.auth.getUser();
  const { error } = await (supabase.from(table) as any)
    .update({ image_id: imageId, updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message ?? null };
}
