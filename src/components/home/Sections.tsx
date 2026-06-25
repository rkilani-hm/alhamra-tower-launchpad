import { ScrollReveal } from "../shared/ScrollReveal";
import { Link } from "react-router-dom";
import { PatternBackground } from "../shared/PatternBand";
import { useI18n, useT } from "@/lib/i18n";
import { Editable } from "@/lib/EditMode";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ──────────────────────────────────────────────────────────────────
   Three homepage sections exported from this file:
     • Perspectives  — The Light / The Silence / The Vantage
     • FloorConfigs  — three lease configurations
     • LeasingBand   — dark CTA band (not currently mounted in Index)
     • ContactStrip  — bottom contact rail (phone / email / hours / address)
   All bilingual EN/AR with MSA luxury register.
────────────────────────────────────────────────────────────────── */

// ── PERSPECTIVES ──────────────────────────────────────────
/* Content lives in locale perspectives.{light,silence,vantage}.{kicker,body},
   overlaid by published section_fields rows via t(). The "01/02/03" index is
   decorative; the locale `title` line is intentionally not surfaced here. */
const PERSP_KEYS = ["light", "silence", "vantage"] as const;

export function Perspectives() {
  const t = useT();
  return (
    <PatternBackground opacity={0.25} style={{ background: "#fff", borderTop: "1px solid rgba(29,29,27,0.07)" }}>
      <div className="grid-3col">
        {PERSP_KEYS.map((pk, i) => (
          <ScrollReveal key={pk} delay={i * 0.1}>
            <div
              style={{ padding: "52px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", transition: "background 0.18s ease", height: "100%" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
            >
              <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 300, color: "#EDEDED", lineHeight: 1, marginBottom: 16 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#1D1D1B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                <Editable id={`section_fields:perspectives:${pk}.kicker`}>{t(`perspectives.${pk}.kicker`)}</Editable>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "12.5px", color: "#6B6B6B", lineHeight: 1.8 }}>
                <Editable id={`section_fields:perspectives:${pk}.body`}>{t(`perspectives.${pk}.body`)}</Editable>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </PatternBackground>
  );
}

// ── FLOOR CONFIGURATIONS ──────────────────────────────────
/* Content lives in locale floorConfigs.items.{c1,c2,c3}.{label,title,size,body},
   overlaid by published section_fields rows via t(). */
const FLOOR_KEYS = ["c1", "c2", "c3"] as const;

export function FloorConfigs() {
  const t = useT();
  return (
    <PatternBackground opacity={0.28} style={{ background: "#FAFAFA" }}>
      <div className="grid-3col">
      {FLOOR_KEYS.map((fk, i) => (
        <ScrollReveal key={fk} delay={i * 0.1}>
          <div
            style={{ padding: "56px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", borderTop: "1px solid rgba(29,29,27,0.09)", position: "relative", overflow: "hidden", transition: "background 0.18s ease", height: "100%" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#fff";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.transform = "scaleY(1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#FAFAFA";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.transform = "scaleY(0)";
            }}
          >
            <div className="left-bar" style={{ position: "absolute", top: 0, left: 0, width: 2, height: "100%", background: "#1D1D1B", transform: "scaleY(0)", transformOrigin: "top", transition: "transform 0.3s ease" }} />
            <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>
              <Editable id={`section_fields:floorConfigs:items.${fk}.label`}>{t(`floorConfigs.items.${fk}.label`)}</Editable>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 500, color: "#1D1D1B", marginBottom: 12, letterSpacing: "0.04em" }}>
              <Editable id={`section_fields:floorConfigs:items.${fk}.title`}>{t(`floorConfigs.items.${fk}.title`)}</Editable>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 300, color: "#6B6B6B", lineHeight: 1, marginBottom: 16 }}>
              <Editable id={`section_fields:floorConfigs:items.${fk}.size`}>{t(`floorConfigs.items.${fk}.size`)}</Editable>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: "#6B6B6B", lineHeight: 1.8 }}>
              <Editable id={`section_fields:floorConfigs:items.${fk}.body`}>{t(`floorConfigs.items.${fk}.body`)}</Editable>
            </div>
          </div>
        </ScrollReveal>
      ))}
      </div>
    </PatternBackground>
  );
}

// ── LEASING BAND ──────────────────────────────────────────
const LEASING_BAND_CONTENT = {
  en: {
    kicker: "Leasing Opportunities",
    h1: "Secure your position",
    h2: "at Kuwait's",
    h3: "premier address",
    body: "Whether you require a full-floor headquarters, a customised configuration, or a long-term corporate base — our leasing team will guide you through available opportunities.",
    primary: "Request Availability",
    secondary: "Download Brochure",
  },
  ar: {
    kicker: "فرص التأجير",
    h1: "احجز موقعك",
    h2: "في أرقى",
    h3: "عناوين الكويت",
    body: "سواء أرغبت في مقرٍّ رئيسيٍّ يشغل طابقاً كاملاً، أو تصميمٍ مخصَّصٍ يلائم احتياجاتك، أو قاعدةٍ مؤسسيّة طويلة الأمد — فإنّ فريق التأجير لدينا يرافقك في استكشاف الخيارات المتاحة.",
    primary: "اطلب الاطلاع على المتاح",
    secondary: "تحميل الكتيّب",
  },
} as const;

export function LeasingBand() {
  const { lang } = useI18n();
  const c = LEASING_BAND_CONTENT[lang];
  return (
    <section
      id="leasing"
      className="leasing-band" style={{ background:"#1D1D1B" }}
    >
      <ScrollReveal>
        <div style={{ maxWidth: 500 }}>
          <p style={{ fontFamily: FONT, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>
            {c.kicker}
          </p>
          <h3 style={{ fontFamily: FONT, fontSize: "clamp(24px, 2.5vw, 42px)", fontWeight: 200, color: "#fff", lineHeight: 1.25, marginBottom: 0 }}>
            {c.h1}<br />{c.h2}<br />
            <strong style={{ fontWeight: 500 }}>{c.h3}</strong>
          </h3>
          <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 16 }}>
            {c.body}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          <Link
            to="/leasing"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: "#1D1D1B",
              fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "16px 36px", textDecoration: "none", whiteSpace: "nowrap",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {c.primary}
          </Link>
          <Link
            to="/leasing/downloads"
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              color: "rgba(255,255,255,0.45)",
              fontFamily: FONT, fontSize: "10.5px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              const line = e.currentTarget.querySelector(".dl-line") as HTMLElement;
              if (line) line.style.transform = "scaleX(1.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              const line = e.currentTarget.querySelector(".dl-line") as HTMLElement;
              if (line) line.style.transform = "scaleX(1)";
            }}
          >
            <span className="dl-line" style={{ width: 36, height: 1, background: "currentColor", transformOrigin: "left", transform: "scaleX(1)", transition: "transform 0.22s ease" }} />
            {c.secondary}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ── CONTACT STRIP ──────────────────────────────────────────
/* Content lives in the locale files (contactStrip.*) — the canonical CMS
   fallback layer — and is overlaid by published `section_fields` rows via t().
   Each label and value is individually editable in place. The kicker/title
   locale keys exist but are intentionally NOT surfaced in this rail. */
const CONTACT_ROWS = [
  { labelKey: "phone",   valueKey: "phoneValue" },
  { labelKey: "email",   valueKey: "emailValue" },
  { labelKey: "hours",   valueKey: "hoursValue" },
  { labelKey: "address", valueKey: "addressValue" },
] as const;

export function ContactStrip() {
  const t = useT();
  return (
    <PatternBackground opacity={0.3} style={{ borderTop: "1px solid rgba(29,29,27,0.09)", background: "#fff" }}>
      <div className="grid-4col">
        {CONTACT_ROWS.map(({ labelKey, valueKey }, i) => (
          <ScrollReveal key={labelKey} delay={i * 0.1}>
            <div style={{ padding: "44px 48px", borderRight: "1px solid rgba(29,29,27,0.09)", height: "100%" }}>
              <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 12 }}>
                <Editable id={`section_fields:contactStrip:${labelKey}`}>{t(`contactStrip.${labelKey}`)}</Editable>
              </div>
              <div
                {...(valueKey === "emailValue" ? { dir: "ltr" as const } : {})}
                style={{ fontFamily: FONT, fontSize: "14.5px", fontWeight: 300, color: "#1D1D1B" }}
              >
                <Editable id={`section_fields:contactStrip:${valueKey}`}>{t(`contactStrip.${valueKey}`)}</Editable>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </PatternBackground>
  );
}
