/* ── Preview-only Arabic variants ────────────────────────────────────────
   The public site is English only. A secret link (`?preview`) unlocks three
   Arabic draft variants for the browser session — AR1, AR2, AR3 — so content
   can be reviewed without ever publishing Arabic to the live frontend.

     AR1  = the Arabic already in the database (value_ar + ar.json). No overlay.
     AR2  = overlay map in ar2.json, keyed by the review sheet's Ref.
     AR3  = overlay map in ar3.json, same keying.

   A "Ref" is the identifier from the Arabic review Excel: `tbl|k1|k2|k3`
   (e.g. "page_prose|towerAwards|engBody|value_ar"). Any key a variant does not
   define falls back to AR1, then English — so AR2/AR3 are safe while empty.
──────────────────────────────────────────────────────────────────────────── */
import ar2 from "@/locales/ar2.json";
import ar3 from "@/locales/ar3.json";

export type Variant = 1 | 2 | 3;

const MAPS: Record<number, Record<string, string>> = {
  2: ar2 as Record<string, string>,
  3: ar3 as Record<string, string>,
};

/* Labels shown on the preview switcher. */
export const VARIANT_LABELS: Record<Variant, string> = { 1: "AR1", 2: "AR2-WS", 3: "AR3" };

const PREVIEW_SS_KEY = "ah-preview";

/* A ?preview query param anywhere unlocks the preview switcher for the whole
   browser session (persisted in sessionStorage so client-side navigation that
   drops the query keeps preview active). Never reads/writes anything the public
   build exposes. */
export function detectPreview(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("preview")) sessionStorage.setItem(PREVIEW_SS_KEY, "1");
    return sessionStorage.getItem(PREVIEW_SS_KEY) === "1";
  } catch {
    return false;
  }
}

/* Leave preview: clears the session flag so the next load is the public view. */
export function clearPreview(): void {
  try { sessionStorage.removeItem(PREVIEW_SS_KEY); } catch { /* ignore */ }
}

/* Resolve the Arabic string for the active variant. For AR1 (or a missing
   Ref / undefined overlay entry) this returns the base Arabic unchanged. */
export function applyVariant(
  variant: Variant,
  ref: string | null | undefined,
  baseAr: string | null | undefined,
): string | null | undefined {
  if (variant === 1 || !ref) return baseAr;
  const map = MAPS[variant];
  const v = map ? map[ref] : undefined;
  return v != null && v !== "" ? v : baseAr;
}
