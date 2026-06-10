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
