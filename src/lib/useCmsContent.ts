/* ──────────────────────────────────────────────────────────────────────────
   CMS read layer — Supabase-backed content with static fallback.

   Philosophy: the database is an OVERRIDE, never a hard dependency. Every hook
   returns the static value first and swaps in published DB content once it
   arrives. If Supabase is unreachable, a row is unpublished, or the query
   fails, the site silently keeps the original locale-file content. The site
   can never be worse than it was before the CMS existed.

   Only rows with status='published' are ever read (RLS also enforces this for
   anon visitors). Draft content stays invisible until a manager publishes.
────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/lib/i18n";

/* Shape the Stats component already consumes (see components/home/Stats.tsx) */
export interface Counter {
  key: string;
  start: number;
  end: number;
  step: number;
  display: string;
  unit: string;
}

/* Fetch published stat_counters for a given group (e.g. "home") and map them
   into the Counter[] shape the component already uses. Returns `null` until
   loaded OR if anything fails — caller falls back to its static list on null. */
export function useStatCounters(groupKey: string, lang: Lang): Counter[] | null {
  const [data, setData] = useState<Counter[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data: rows, error } = await supabase
          .from("stat_counters")
          .select(
            "stat_key,start,end,step,display_en,display_ar,unit_en,unit_ar,sort_order,status,group_key"
          )
          .eq("group_key", groupKey)
          .eq("status", "published")
          .order("sort_order", { ascending: true });

        if (cancelled) return;
        if (error || !rows || rows.length === 0) {
          setData(null); // fall back to static
          return;
        }

        const mapped: Counter[] = rows.map((r) => ({
          key: r.stat_key ?? "",
          start: r.start ?? 0,
          end: r.end ?? 0,
          step: r.step ?? 1,
          display: (lang === "ar" ? r.display_ar : r.display_en) ?? "",
          unit: (lang === "ar" ? r.unit_ar : r.unit_en) ?? "",
        }));

        setData(mapped);
      } catch {
        if (!cancelled) setData(null); // network/other failure → static fallback
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [groupKey, lang]);

  return data;
}

/* Fetch published label/sub text for a stat group, keyed by stat_key, in the
   active language. Returns {} until loaded or on failure (caller falls back to
   t() for each label). */
export function useStatLabels(
  groupKey: string,
  lang: Lang
): Record<string, { label: string; sub: string }> {
  const [labels, setLabels] = useState<Record<string, { label: string; sub: string }>>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data: rows, error } = await supabase
          .from("stat_counters")
          .select("stat_key,label_en,label_ar,sub_en,sub_ar,status,group_key")
          .eq("group_key", groupKey)
          .eq("status", "published");

        if (cancelled || error || !rows) return;

        const map: Record<string, { label: string; sub: string }> = {};
        for (const r of rows) {
          if (!r.stat_key) continue;
          map[r.stat_key] = {
            label: (lang === "ar" ? r.label_ar : r.label_en) ?? "",
            sub: (lang === "ar" ? r.sub_ar : r.sub_en) ?? "",
          };
        }
        if (!cancelled) setLabels(map);
      } catch {
        /* keep {} → caller uses static t() */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [groupKey, lang]);

  return labels;
}

/* ──────────────────────────────────────────────────────────────────────────
   usePageContent — full structured-page override via OVERLAY (not rebuild).

   The 8 dict-pages each consume a deep `content.<page>` object. The database
   split that object across typed tables (page_prose, stat_counters,
   feature_cards, timeline_entries, spec_rows). Some fields (tabs, contactRows,
   crumbs) were never migrated and live ONLY in the static JSON.

   Strategy: start from the COMPLETE static JSON object (passed in by the
   component via useContent) and overlay only the fields that are published in
   the DB. Nothing can go missing — un-migrated/unpublished fields keep their
   JSON value. This is strictly safer than rebuilding the object from tables.

   Returns the merged object, or the static base unchanged until the DB loads
   / if anything fails.
────────────────────────────────────────────────────────────────────────── */

type AnyObj = Record<string, any>;

/* Which page maps to which feature_cards collections / timeline collections,
   and the field name each array occupies in the page object. */
const PAGE_CARD_FIELDS: Record<string, { collection: string; field: string }[]> = {
  invitation:     [{ collection: "invitation.tenants", field: "tenants" }],
  towerSustain:   [{ collection: "towerSustain.pillars", field: "pillars" }],
  businessCentre: [
    { collection: "businessCentre.advantages", field: "advantages" },
    { collection: "businessCentre.facilities", field: "facilities" },
  ],
  alHamraHotel:   [
    { collection: "alHamraHotel.advantages", field: "advantages" },
    { collection: "alHamraHotel.services",   field: "services" },
  ],
};
const PAGE_TIMELINE_FIELDS: Record<string, { collection: string; field: string }[]> = {
  architecture: [{ collection: "architecture.milestones", field: "milestones" }],
  towerRising:  [{ collection: "towerRising.eras",        field: "eras" }],
};

export function usePageContent<T extends AnyObj = AnyObj>(pageKey: string, base: T, lang: Lang): T {
  const [merged, setMerged] = useState<T>(base);

  useEffect(() => {
    let cancelled = false;
    // Re-seed from base whenever base/lang changes, so language switches show
    // the right static content immediately while the DB overlay reloads.
    setMerged(base);

    (async () => {
      try {
        const pick = (en: any, ar: any) => (lang === "ar" ? (ar ?? en) : en);

        const [prose, stats, cards, timeline, specs] = await Promise.all([
          supabase.from("page_prose")
            .select("field_key,value_en,value_ar,sort_order,status,page_key")
            .eq("page_key", pageKey).eq("status", "published")
            .order("sort_order", { ascending: true }),
          supabase.from("stat_counters")
            .select("stat_key,display_en,display_ar,unit_en,unit_ar,label_en,label_ar,sub_en,sub_ar,sort_order,status,group_key")
            .eq("group_key", pageKey).eq("status", "published")
            .order("sort_order", { ascending: true }),
          supabase.from("feature_cards")
            .select("collection,num,title_en,title_ar,body_en,body_ar,image_id,image_caption_en,image_caption_ar,sort_order,status")
            .eq("status", "published")
            .order("sort_order", { ascending: true }),
          supabase.from("timeline_entries")
            .select("collection,year,title_en,title_ar,body_en,body_ar,image_id,sort_order,status")
            .eq("status", "published")
            .order("sort_order", { ascending: true }),
          supabase.from("spec_rows")
            .select("category_en,category_ar,label_en,label_ar,value_en,value_ar,sort_order,status")
            .eq("status", "published")
            .order("sort_order", { ascending: true }),
        ]);

        if (cancelled) return;

        // Deep clone the static base so we never mutate the JSON import.
        const out: AnyObj = JSON.parse(JSON.stringify(base ?? {}));
        let changed = false;

        // 1. Prose fields — support dot-notation field_key (e.g. "hero.title",
        //    "heroSub.0") by walking/creating the path.
        for (const r of prose.data ?? []) {
          if (!r.field_key || r.value_en == null) continue;
          const val = pick(r.value_en, r.value_ar);
          const parts = r.field_key.split(".");
          let node = out;
          for (let i = 0; i < parts.length - 1; i++) {
            const p = parts[i];
            // numeric segment → ensure array
            if (/^\d+$/.test(parts[i + 1])) { if (!Array.isArray(node[p])) node[p] = node[p] ?? []; }
            else if (typeof node[p] !== "object" || node[p] == null) node[p] = {};
            node = node[p];
          }
          const last = parts[parts.length - 1];
          node[last] = val;
          changed = true;
        }

        // 2. Stat counters → page's `stats` array (shape {n,u,l,sub} or {number,label}).
        //    We overlay onto existing array entries by index to preserve any
        //    extra keys, and match the existing shape (n/number, l/label).
        const statRows = stats.data ?? [];
        if (statRows.length && Array.isArray(out.stats)) {
          out.stats = out.stats.map((orig: AnyObj, i: number) => {
            const r = statRows[i];
            if (!r) return orig;
            const next = { ...orig };
            const n = pick(r.display_en, r.display_ar);
            const u = pick(r.unit_en, r.unit_ar);
            const l = pick(r.label_en, r.label_ar);
            const sub = pick(r.sub_en, r.sub_ar);
            if ("n" in orig) next.n = n; else if ("number" in orig) next.number = n;
            if ("u" in orig && u != null) next.u = u;
            if ("l" in orig) next.l = l; else if ("label" in orig) next.label = l;
            if ("sub" in orig && sub != null) next.sub = sub;
            return next;
          });
          changed = true;
        }

        // 3. feature_cards → page's array fields (tenants/advantages/facilities/
        //    services/pillars). Overlay onto existing entries by index.
        for (const map of PAGE_CARD_FIELDS[pageKey] ?? []) {
          const rows = (cards.data ?? []).filter((c) => c.collection === map.collection);
          if (rows.length && Array.isArray(out[map.field])) {
            out[map.field] = out[map.field].map((orig: AnyObj, i: number) => {
              const r = rows[i];
              if (!r) return orig;
              const next = { ...orig };
              const title = pick(r.title_en, r.title_ar);
              const body  = pick(r.body_en, r.body_ar);
              const cap   = pick(r.image_caption_en, r.image_caption_ar);
              if (r.num != null && "num" in orig) next.num = r.num;
              if (title != null) { if ("title" in orig) next.title = title; else if ("label" in orig) next.label = title; }
              if (body != null)  { if ("body" in orig) next.body = body; else if ("text" in orig) next.text = body; else if ("desc" in orig) next.desc = body; }
              if (cap != null && "imageCaption" in orig) next.imageCaption = cap;
              return next;
            });
            changed = true;
          }
        }

        // 4. timeline_entries → milestones / eras. Overlay by index.
        for (const map of PAGE_TIMELINE_FIELDS[pageKey] ?? []) {
          const rows = (timeline.data ?? []).filter((c) => c.collection === map.collection);
          if (rows.length && Array.isArray(out[map.field])) {
            out[map.field] = out[map.field].map((orig: AnyObj, i: number) => {
              const r = rows[i];
              if (!r) return orig;
              const next = { ...orig };
              const title = pick(r.title_en, r.title_ar);
              const body  = pick(r.body_en, r.body_ar);
              const year  = r.year;
              // milestones use {y,e}; eras use {year,title,body,img}
              if ("e" in orig && title != null) next.e = title;
              if ("y" in orig && year != null) next.y = year;
              if ("title" in orig && title != null) next.title = title;
              if ("year" in orig && year != null) next.year = year;
              if ("body" in orig && body != null) next.body = body;
              return next;
            });
            changed = true;
          }
        }

        // 5. spec_rows → towerDesign.specs (grouped by category → {cat,rows:[[label,value]]})
        if (pageKey === "towerDesign" && (specs.data ?? []).length && Array.isArray(out.specs)) {
          // Rebuild grouped specs from flat rows, preserving category order.
          const groups: AnyObj[] = [];
          const byCat = new Map<string, AnyObj>();
          for (const r of specs.data!) {
            const cat = pick(r.category_en, r.category_ar) ?? "";
            if (!byCat.has(cat)) { const g = { cat, rows: [] as any[] }; byCat.set(cat, g); groups.push(g); }
            byCat.get(cat)!.rows.push([pick(r.label_en, r.label_ar), pick(r.value_en, r.value_ar)]);
          }
          if (groups.length) { out.specs = groups; changed = true; }
        }

        if (!cancelled && changed) setMerged(out as T);
      } catch {
        /* any failure → keep static base (already set) */
      }
    })();

    return () => { cancelled = true; };
  }, [pageKey, lang, base]);

  return merged;
}
