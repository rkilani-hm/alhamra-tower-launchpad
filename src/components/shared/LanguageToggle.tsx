import { useI18n } from "@/lib/i18n";
import { VARIANT_LABELS, type Variant } from "@/lib/previewVariants";

/* ── LanguageToggle (preview only) ───────────────────────────────────────
   The public site is English only, so this renders NOTHING for normal
   visitors. When a session is unlocked with the secret `?preview` link, it
   shows a review switcher — EN · AR1 · AR2 · AR3 — where:
     AR1 = Arabic saved in the database
     AR2 / AR3 = draft Arabic variants fed from Excel
   Arabic is never published to the public frontend.
──────────────────────────────────────────────────────────────────────────── */

const CG = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const AR_FONT = "'Noto Sans Arabic','Tajawal',sans-serif";

export function LanguageToggle({ variant: theme = "light" }: { variant?: "light" | "dark" }) {
  const { lang, variant, preview, setLang, setVariant, exitPreview } = useI18n();

  /* Public: no language UI at all. */
  if (!preview) return null;

  const isDark = theme === "dark";
  const textOff = isDark ? "rgba(255,255,255,0.55)" : "#6B6B6B";
  const border = isDark ? "rgba(255,255,255,0.2)" : "rgba(29,29,27,0.15)";
  const onBg = isDark ? "rgba(255,255,255,0.1)" : "#1D1D1B";

  const btn = (active: boolean, label: string, arabic: boolean, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      className="ah-hit"
      onClick={onClick}
      aria-pressed={active}
      style={{
        background: active ? onBg : "transparent",
        color: active ? "#fff" : textOff,
        fontFamily: arabic ? AR_FONT : CG,
        fontSize: arabic ? "10px" : "9px",
        fontWeight: arabic ? 500 : 400,
        letterSpacing: arabic ? "0.02em" : "0.15em",
        padding: "0 8px",
        minWidth: 32, minHeight: 26,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        border: "none",
        cursor: "pointer",
        transition: "background 0.22s ease, color 0.22s ease",
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        aria-hidden
        style={{
          fontFamily: CG, fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase",
          color: isDark ? "rgba(255,255,255,0.45)" : "#9A9A97",
        }}
      >
        Preview
      </span>
      <div
        role="group"
        aria-label="Preview language variant"
        style={{
          display: "inline-flex", alignItems: "center",
          border: `1px solid ${border}`, borderRadius: 1, padding: 2, gap: 1,
        }}
      >
        {btn(lang === "en", "EN", false, () => setLang("en"), "en")}
        {([1, 2, 3] as Variant[]).map((v) =>
          btn(lang === "ar" && variant === v, VARIANT_LABELS[v], false, () => setVariant(v), `ar${v}`),
        )}
      </div>
      <button
        type="button"
        className="ah-hit"
        onClick={exitPreview}
        aria-label="Exit preview"
        title="Return to the public (English) site"
        style={{
          fontFamily: CG, fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: isDark ? "rgba(255,255,255,0.55)" : "#6B6B6B",
          background: "transparent", border: `1px solid ${border}`, borderRadius: 1,
          padding: "5px 8px", minHeight: 26, cursor: "pointer", lineHeight: 1,
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
      >
        Exit
      </button>
    </div>
  );
}
