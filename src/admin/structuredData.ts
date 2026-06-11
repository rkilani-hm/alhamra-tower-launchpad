/* ──────────────────────────────────────────────────────────────────────────
   Structured content — config-driven editor for the list tables
   (stat_counters, awards, feature_cards, timeline_entries, spec_rows).

   Each table is described once (its grouping column, its editable fields, and
   how to label a row). One generic editor renders and saves them all. Writes
   go through the authed client so RLS applies (editors draft, managers publish).
────────────────────────────────────────────────────────────────────────── */

import { supabase } from "@/integrations/supabase/client";

export type StructuredTable =
  | "stat_counters" | "awards" | "feature_cards" | "timeline_entries" | "spec_rows";

export interface FieldDef {
  col: string;                 // column name
  label: string;               // human label
  kind: "text" | "longtext" | "number" | "bilingual" | "bilingual-long";
  // for bilingual, `col` is the base (e.g. "title") → title_en / title_ar
}

export interface TableDef {
  table: StructuredTable;
  title: string;
  groupCol: string | null;     // column that groups rows into collections (or null)
  fields: FieldDef[];
  rowLabel: (r: any, lang: "en" | "ar") => string; // short label for a row in the list
}

export const TABLE_DEFS: Record<StructuredTable, TableDef> = {
  stat_counters: {
    table: "stat_counters",
    title: "Statistics & Counters",
    groupCol: "group_key",
    fields: [
      { col: "display", label: "Display value", kind: "bilingual" },
      { col: "unit", label: "Unit", kind: "bilingual" },
      { col: "label", label: "Label", kind: "bilingual" },
      { col: "sub", label: "Sub-label", kind: "bilingual" },
      { col: "start", label: "Count from", kind: "number" },
      { col: "end", label: "Count to", kind: "number" },
      { col: "step", label: "Step", kind: "number" },
    ],
    rowLabel: (r, l) => (l === "ar" ? r.label_ar : r.label_en) || r.stat_key || "—",
  },
  awards: {
    table: "awards",
    title: "Awards & Recognition",
    groupCol: null,
    fields: [
      { col: "year", label: "Year", kind: "text" },
      { col: "title", label: "Title", kind: "bilingual" },
      { col: "sub", label: "Subtitle", kind: "bilingual" },
    ],
    rowLabel: (r, l) => `${r.year ?? ""} — ${(l === "ar" ? r.title_ar : r.title_en) || ""}`,
  },
  feature_cards: {
    table: "feature_cards",
    title: "Feature Cards",
    groupCol: "collection",
    fields: [
      { col: "num", label: "Number/Marker", kind: "text" },
      { col: "title", label: "Title", kind: "bilingual" },
      { col: "body", label: "Body", kind: "bilingual-long" },
      { col: "image_caption", label: "Image caption", kind: "bilingual" },
    ],
    rowLabel: (r, l) => (l === "ar" ? r.title_ar : r.title_en) || r.num || "—",
  },
  timeline_entries: {
    table: "timeline_entries",
    title: "Timeline Entries",
    groupCol: "collection",
    fields: [
      { col: "year", label: "Year", kind: "text" },
      { col: "title", label: "Title", kind: "bilingual" },
      { col: "body", label: "Body", kind: "bilingual-long" },
    ],
    rowLabel: (r, l) => `${r.year ?? ""} — ${(l === "ar" ? r.title_ar : r.title_en) || ""}`,
  },
  spec_rows: {
    table: "spec_rows",
    title: "Specifications",
    groupCol: "category_en",
    fields: [
      { col: "category", label: "Category", kind: "bilingual" },
      { col: "label", label: "Label", kind: "bilingual" },
      { col: "value", label: "Value", kind: "bilingual" },
    ],
    rowLabel: (r, l) => (l === "ar" ? r.label_ar : r.label_en) || "—",
  },
};

/* List collections (groups) within a structured table, with counts. */
export async function listStructuredGroups(
  def: TableDef
): Promise<{ group: string; total: number; drafts: number }[]> {
  const { data } = await (supabase.from(def.table) as any).select("*");
  if (!data) return [];
  if (!def.groupCol) {
    const drafts = data.filter((r: any) => r.status === "draft").length;
    return [{ group: def.title, total: data.length, drafts }];
  }
  const map = new Map<string, { total: number; drafts: number }>();
  for (const r of data) {
    const g = r[def.groupCol!] ?? "—";
    const e = map.get(g) ?? { total: 0, drafts: 0 };
    e.total++; if (r.status === "draft") e.drafts++;
    map.set(g, e);
  }
  return [...map.entries()].map(([group, v]) => ({ group, ...v })).sort((a, b) => a.group.localeCompare(b.group));
}

/* Load rows for a collection (or all rows if table isn't grouped). */
export async function loadStructuredRows(def: TableDef, group: string | null): Promise<any[]> {
  let q = (supabase.from(def.table) as any).select("*").order("sort_order", { ascending: true });
  if (def.groupCol && group) q = q.eq(def.groupCol, group);
  const { data } = await q;
  return data ?? [];
}

/* Save a row's edited values (does not change status). */
export async function saveStructuredRow(
  def: TableDef, id: string, values: Record<string, any>
): Promise<{ error: string | null }> {
  const { data: u } = await supabase.auth.getUser();
  const { error } = await (supabase.from(def.table) as any)
    .update({ ...values, updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message ?? null };
}

export async function setStructuredStatus(
  def: TableDef, id: string, status: "draft" | "published"
): Promise<{ error: string | null }> {
  const { data: u } = await supabase.auth.getUser();
  const { error } = await (supabase.from(def.table) as any)
    .update({ status, updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() })
    .eq("id", id);
  return { error: error?.message ?? null };
}
