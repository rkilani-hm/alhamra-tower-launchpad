import { useI18n } from "@/lib/i18n";

/* ── LanguageToggle ──────────────────────────────────────────────────
   Minimal pill toggle: EN · ع
   Sits in the navbar, auto-switches document direction via I18nProvider.
──────────────────────────────────────────────────────────────────────── */

const CG    = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

export function LanguageToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang, t } = useI18n();

  const isDark = variant === "dark";
  const text   = isDark ? "rgba(255,255,255,0.85)" : "#1D1D1B";
  const textOff = isDark ? "rgba(255,255,255,0.4)" : "#9a9894";
  const border = isDark ? "rgba(255,255,255,0.2)" : "rgba(29,29,27,0.15)";

  return (
    <div
      role="group"
      aria-label={t("nav.changeLanguage")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${border}`,
        borderRadius: 1,
        padding: 3,
        gap: 2,
        height: 30,
      }}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label={t("language.en")}
        style={{
          background: lang === "en" ? (isDark ? "rgba(255,255,255,0.1)" : "#1D1D1B") : "transparent",
          color: lang === "en" ? (isDark ? "#fff" : "#fff") : textOff,
          fontFamily: CG, fontSize: "10px",
          letterSpacing: "0.22em",
          padding: "5px 9px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.22s ease",
          lineHeight: 1,
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        aria-label={t("language.ar")}
        style={{
          background: lang === "ar" ? (isDark ? "rgba(255,255,255,0.1)" : "#1D1D1B") : "transparent",
          color: lang === "ar" ? (isDark ? "#fff" : "#fff") : textOff,
          fontFamily: "'Noto Sans Arabic','Tajawal',sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          padding: "5px 9px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.22s ease",
          lineHeight: 1,
        }}
      >
        ع
      </button>
    </div>
  );
}
