import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import enDict from "@/locales/en.json";
import arDict from "@/locales/ar.json";
import { supabase } from "@/integrations/supabase/client";
import { detectPreview, clearPreview, applyVariant, type Variant } from "./previewVariants";

/* ── Lightweight i18n ─────────────────────────────────────────────────
   No external dependencies. Supports:
   - EN / AR (Modern Standard Arabic)
   - Dot-notation key lookup: t("hero.title") → "Iconic"
   - localStorage persistence across sessions
   - Automatic <html lang="..."> and <html dir="..."> switching
   - Fallback to EN if an AR key is missing
──────────────────────────────────────────────────────────────────────── */

export type Lang = "en" | "ar";

type Dict = typeof enDict;

const DICTIONARIES: Record<Lang, Dict> = {
  en: enDict,
  ar: arDict as unknown as Dict,
};

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  /* Preview-only Arabic variant (1=AR1 DB, 2=AR2, 3=AR3). Always 1 in public. */
  variant: Variant;
  /* True only when the secret ?preview link unlocked this browser session. */
  preview: boolean;
  /* Switch to an Arabic variant — only effective inside a preview session. */
  setVariant: (v: Variant) => void;
  /* Leave preview and return to the public English view. */
  exitPreview: () => void;
  t: (key: string) => string;
  /* Returns a non-string node (object/array) by dot-notation key, with
     EN fallback. Used for content blocks migrated out of components into
     the locale JSON — e.g. tNode("architecture.milestones"). */
  tNode: <T = unknown>(key: string) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* Dot-notation key lookup with fallback to EN if missing in current lang */
function resolve(dict: Dict, key: string): string | undefined {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

/* Like resolve(), but returns ANY node (object, array, string) — used for
   structured content blocks (arrays of objects, nested tables) that were
   migrated out of component-level CONTENT dicts into the locale JSON. */
function resolveNode(dict: Dict, key: string): unknown {
  const parts = key.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

/* Arabic is never shown on the public frontend. It is available only inside a
   preview session unlocked by the secret `?preview` link (see previewVariants).
   Public visitors always get English — there is no browser/stored auto-detect.
   The selected preview language/variant persist in sessionStorage so a reload
   within the same session keeps the chosen view. */
const PREVIEW_LANG_KEY = "ah-preview-lang";     // "en" | "ar" (session only)
const PREVIEW_VAR_KEY  = "ah-preview-variant";  // "1" | "2" | "3" (session only)

function readSession(key: string): string | null {
  try { return typeof window !== "undefined" ? sessionStorage.getItem(key) : null; } catch { return null; }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [preview] = useState<boolean>(detectPreview);
  const [lang, setLangState] = useState<Lang>(() =>
    preview && readSession(PREVIEW_LANG_KEY) === "ar" ? "ar" : "en");
  const [variant, setVariantState] = useState<Variant>(() => {
    const v = preview ? Number(readSession(PREVIEW_VAR_KEY)) : 1;
    return (v === 2 || v === 3 ? v : 1) as Variant;
  });
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  /* ── CMS override map ──────────────────────────────────────────────────
     Published section_fields + page_prose, keyed by the same dot-notation
     the components already request (e.g. "hero.title", "towerDesign.lamellaP1").
     DB content takes precedence over static JSON; if the fetch fails or a key
     isn't published, t() falls through to the locale files. Both languages are
     stored so switching language never needs a refetch. Empty until loaded —
     the site renders static content first, then swaps in published overrides. */
  const [overrides, setOverrides] = useState<Record<string, { en: string; ar: string | null; ref: string }>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sf, pp] = await Promise.all([
          supabase
            .from("section_fields")
            .select("section_key,field_key,value_en,value_ar,status")
            .eq("status", "published"),
          supabase
            .from("page_prose")
            .select("page_key,field_key,value_en,value_ar,status")
            .eq("status", "published"),
        ]);
        if (cancelled) return;
        const map: Record<string, { en: string; ar: string | null; ref: string }> = {};
        for (const r of sf.data ?? []) {
          if (r.section_key && r.field_key && r.value_en != null) {
            map[`${r.section_key}.${r.field_key}`] = {
              en: r.value_en, ar: r.value_ar,
              ref: `section_fields|${r.section_key}|${r.field_key}|value_ar`,
            };
          }
        }
        for (const r of pp.data ?? []) {
          if (r.page_key && r.field_key && r.value_en != null) {
            map[`${r.page_key}.${r.field_key}`] = {
              en: r.value_en, ar: r.value_ar,
              ref: `page_prose|${r.page_key}|${r.field_key}|value_ar`,
            };
          }
        }
        if (!cancelled) setOverrides(map);
      } catch {
        /* network/other failure → overrides stay {} → pure static fallback */
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* Apply <html lang=".."> and dir=".." on every lang change */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir  = dir;
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang, dir]);

  /* English is always allowed. Arabic only inside a preview session. */
  const setLang = (next: Lang) => {
    const effective: Lang = next === "ar" && preview ? "ar" : "en";
    setLangState(effective);
    try { sessionStorage.setItem(PREVIEW_LANG_KEY, effective); } catch {}
  };

  /* Pick an Arabic variant (AR1/AR2/AR3). No-op for the public (non-preview). */
  const setVariant = (v: Variant) => {
    if (!preview) return;
    setVariantState(v);
    setLangState("ar");
    try {
      sessionStorage.setItem(PREVIEW_VAR_KEY, String(v));
      sessionStorage.setItem(PREVIEW_LANG_KEY, "ar");
    } catch {}
  };

  /* Leave preview: clear session flags, reset to English, and reload to the
     public URL (without ?preview) so the preview switcher does not re-arm. */
  const exitPreview = () => {
    try {
      clearPreview();
      sessionStorage.removeItem(PREVIEW_LANG_KEY);
      sessionStorage.removeItem(PREVIEW_VAR_KEY);
    } catch {}
    setLangState("en");
    setVariantState(1);
    if (typeof window !== "undefined") {
      window.location.assign(window.location.pathname + window.location.hash);
    }
  };

  const t = (key: string): string => {
    /* CMS override first: published DB content wins over static JSON. */
    const ov = overrides[key];
    if (ov) {
      const ar = lang === "ar" ? applyVariant(variant, ov.ref, ov.ar) : null;
      const v = lang === "ar" ? (ar ?? ov.ar ?? ov.en) : ov.en;
      if (v !== undefined && v !== null) return v;
    }
    const val = resolve(DICTIONARIES[lang], key);
    if (val !== undefined) return val;
    // Fall back to English if Arabic is missing
    const fallback = resolve(DICTIONARIES.en, key);
    if (fallback !== undefined) return fallback;
    // Final fallback: return the key itself so missing strings are visible in dev
    if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${key}`);
    return key;
  };

  /* Structured-node lookup for migrated content blocks. Falls back to EN
     when the current language is missing the node, mirroring t(). */
  const tNode = <T = unknown>(key: string): T => {
    const val = resolveNode(DICTIONARIES[lang], key);
    if (val !== undefined) return val as T;
    const fallback = resolveNode(DICTIONARIES.en, key);
    if (fallback !== undefined) return fallback as T;
    if (import.meta.env.DEV) console.warn(`[i18n] missing node: ${key}`);
    return undefined as T;
  };

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, variant, preview, setVariant, exitPreview, t, tNode }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

/* Convenience hook for components that only need t() */
export function useT() {
  return useI18n().t;
}

/* Returns an entire migrated content namespace in the active language,
   e.g. useContent("invitation") replaces the old `const c = CONTENT[lang]`.
   The shape is identical to the former component-level dict, so all
   downstream `c.foo` / `c.items.map(...)` usage is unchanged. */
export function useContent<T = Record<string, unknown>>(namespace: string): T {
  return useI18n().tNode<T>(namespace);
}
