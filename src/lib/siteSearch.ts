import snapshot from "./search-content.json";
import { supabase } from "@/integrations/supabase/client";

export interface SearchPage { path: string; title: string; text: string }
export interface SearchResult extends SearchPage { snippet: string; score: number }
type ContentRow = Record<string, string | number | null>;
export type ContentTables = Record<string, ContentRow[]>;

const ROUTES: Record<string, string> = {
  towerOverview: "/tower", towerRising: "/tower/rising", towerDesign: "/tower/engineering",
  towerAwards: "/tower/awards", towerSustain: "/tower/sustainability",
  services: "/experience/services", businessCentre: "/experience/business-support",
  location: "/experience/location", leasing: "/leasing", leasingStory: "/leasing",
  floorplan: "/leasing", floorConfigs: "/leasing", inquiry: "/leasing/inquiry",
  contact: "/leasing/inquiry", downloads: "/leasing", home: "/",
  hero: "/", stats: "/", experience: "/", gulf: "/", credentials: "/",
  founderQuote: "/", closingBand: "/", contactStrip: "/leasing/inquiry",
};

function destination(table: string, row: ContentRow): string | undefined {
  if (table === "spec_rows") return "/tower/engineering";
  const group = String(row.page_key ?? row.section_key ?? row.collection ?? row.group_key ?? "").split(".")[0];
  return group.startsWith("home2") ? "/" : ROUTES[group];
}

function textValues(row: ContentRow): string[] {
  return Object.entries(row)
    .filter(([key, value]) => (key.endsWith("_en") || key === "year") && typeof value === "string" && value.trim())
    .map(([, value]) => String(value));
}

function rowKey(table: string, row: ContentRow): string {
  return String(row.id ?? `${table}:${row.page_key ?? row.section_key ?? row.collection ?? row.group_key ?? ""}:${row.field_key ?? row.stat_key ?? row.title_en ?? row.label_en ?? ""}`);
}

// Reconcile captured text with current published values, rather than retaining
// searchable old wording after an inline edit or unpublish.
export function buildSearchPages(pages: SearchPage[], previous: ContentTables, current: ContentTables): SearchPage[] {
  const result = pages.map(page => ({ ...page }));
  for (const [table, oldRows] of Object.entries(previous)) {
    const newRows = current[table];
    if (!newRows) continue; // A failed request preserves the last public fallback.
    const byKey = new Map(newRows.map(row => [rowKey(table, row), row]));
    for (const oldRow of oldRows) {
      const path = destination(table, oldRow);
      if (!path) continue;
      const replacement = byKey.get(rowKey(table, oldRow));
      for (const [key, oldValue] of Object.entries(oldRow)) {
        if (!key.endsWith("_en") || typeof oldValue !== "string" || oldValue.length < 3) continue;
        const next = replacement?.[key];
        if (next === oldValue) continue;
        for (const page of result) {
          if (page.path === path) page.text = page.text.split(oldValue).join(typeof next === "string" ? next : "");
        }
      }
    }
  }
  for (const [table, rows] of Object.entries(current)) {
    for (const row of rows) {
      const page = result.find(page => page.path === destination(table, row));
      if (page) page.text += ` ${textValues(row).join(" ")}`;
    }
  }
  return result;
}

export function searchPages(pages: SearchPage[], query: string): SearchResult[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return pages.flatMap(page => {
    const text = `${page.title} ${page.text}`.toLocaleLowerCase();
    if (!terms.every(term => text.includes(term))) return [];
    const index = Math.max(0, page.text.toLocaleLowerCase().indexOf(terms[0]));
    const start = Math.max(0, index - 55);
    const snippet = `${start ? "…" : ""}${page.text.slice(start, start + 210).trim()}${start + 210 < page.text.length ? "…" : ""}`;
    const score = terms.reduce((total, term) => total + (page.title.toLocaleLowerCase().includes(term) ? 10 : 1), 0);
    return [{ ...page, snippet, score }];
  }).sort((a, b) => b.score - a.score);
}

const baseline = snapshot.cms as ContentTables;
export const initialSearchPages = buildSearchPages(snapshot.pages, baseline, baseline);

export async function loadSearchPages(): Promise<{ pages: SearchPage[]; partial: boolean }> {
  const columns: Record<string, string> = {
    page_prose: "id,page_key,field_key,value_en",
    section_fields: "id,section_key,field_key,value_en",
    awards: "id,page_key,year,ribbon_en,title_en,organization_en,body_en,sub_en",
    feature_cards: "id,collection,title_en,body_en,image_caption_en",
    stat_counters: "id,group_key,stat_key,display_en,label_en,sub_en,unit_en",
    timeline_entries: "id,collection,year,title_en,body_en",
    spec_rows: "id,category_en,label_en,value_en",
  };
  let partial = false;
  const current: ContentTables = {};
  await Promise.all(Object.entries(columns).map(async ([table, projection]) => {
    try {
      const rows: ContentRow[] = [];
      for (let offset = 0; ; offset += 1000) {
        const { data, error } = await supabase.from(table as "page_prose")
          .select(projection).eq("status", "published").order("id").range(offset, offset + 999)
          .abortSignal(AbortSignal.timeout(12000));
        if (error) throw error;
        const batch = (data ?? []) as unknown as ContentRow[];
        rows.push(...batch);
        if (batch.length < 1000) break;
      }
      // Match the initial capture (which intentionally stores no database IDs).
      current[table] = rows.map(({ id: _id, ...row }) => row);
    } catch { partial = true; current[table] = baseline[table] ?? []; }
  }));
  return { pages: buildSearchPages(snapshot.pages, baseline, current), partial };
}