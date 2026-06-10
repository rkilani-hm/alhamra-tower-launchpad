import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import enDict from "@/locales/en.json";
import arDict from "@/locales/ar.json";

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

const STORAGE_KEY = "alhamra-lang";

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
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

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ar") return stored;
  // Detect browser language — default AR if the browser prefers Arabic
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  return browserLang === "ar" ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  /* Apply <html lang=".."> and dir=".." on every lang change */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir  = dir;
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  const t = (key: string): string => {
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
    <I18nContext.Provider value={{ lang, dir, setLang, t, tNode }}>
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
