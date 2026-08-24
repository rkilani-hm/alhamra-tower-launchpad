import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { useI18n } from "@/lib/i18n";

/* ── 404 — Not Found ──────────────────────────────────────────────────
   On-brand Al Hamra error page: dark cinematic tower backdrop, CI red
   accent (#CD1719), Century Gothic, grey hairlines. Bilingual EN/AR with
   the site navigation and footer (via PageLayout) so visitors can recover.
──────────────────────────────────────────────────────────────────────── */

const RED   = "#CD1719";
const DARK  = "#0c0b09";
const GREY  = "#B9B9B7";
const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

type Link = { label: string; href: string };
type Content = {
  eyebrow: string; code: string; heading: string; body: string;
  primary: string; more: string; links: Link[];
};

const CONTENT: Record<string, Content> = {
  en: {
    eyebrow: "Error · 404",
    code: "404",
    heading: "This page could not be found.",
    body: "The page you are looking for may have been moved, renamed, or may no longer exist. Let us guide you back.",
    primary: "Return home",
    more: "Or explore",
    links: [
      { label: "The Tower", href: "/tower" },
      { label: "Office Spaces", href: "/business/office-spaces" },
      { label: "Leasing", href: "/leasing" },
    ],
  },
  ar: {
    eyebrow: "خطأ · ٤٠٤",
    code: "٤٠٤",
    heading: "تعذّر العثور على هذه الصفحة.",
    body: "قد تكون الصفحة التي تبحث عنها قد نُقلت أو أُعيدت تسميتها أو لم تعد موجودة. دعنا نعيدك إلى المسار الصحيح.",
    primary: "العودة إلى الرئيسية",
    more: "أو تصفّح",
    links: [
      { label: "البرج", href: "/tower" },
      { label: "المساحات المكتبية", href: "/business/office-spaces" },
      { label: "التأجير", href: "/leasing" },
    ],
  },
};

export default function NotFound() {
  const location = useLocation();
  const { lang } = useI18n();
  const c = CONTENT[lang] ?? CONTENT.en;
  const isAr = lang === "ar";

  useEffect(() => {
    if (import.meta.env.DEV) console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <section style={{
        position: "relative", minHeight: "88vh", overflow: "hidden",
        background: DARK, display: "flex", alignItems: "center",
      }}>
        {/* Tower backdrop */}
        <img
          src="/assets/tower-render-dusk.jpg" alt="" aria-hidden="true" loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center", opacity: 0.42 }}
        />
        {/* Scrims for legibility */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(12,11,9,0.55) 0%, rgba(12,11,9,0.35) 45%, rgba(12,11,9,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: isAr
            ? "linear-gradient(to left, rgba(12,11,9,0.75) 0%, transparent 62%)"
            : "linear-gradient(to right, rgba(12,11,9,0.75) 0%, transparent 62%)" }} />
        {/* CI red rule */}
        <div style={{ position: "absolute", top: 0, bottom: 0,
          insetInlineStart: 0, width: 3,
          background: `linear-gradient(to bottom, ${RED}, rgba(205,23,25,0.15))` }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%",
          maxWidth: 1360, margin: "0 auto",
          padding: "clamp(64px,12vh,140px) clamp(28px,6vw,96px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 640 }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <span style={{ width: 32, height: 1, background: GREY, flexShrink: 0 }} />
              <span style={{ fontFamily: FONT, fontSize: "11px", fontWeight: 500,
                letterSpacing: "0.4em", textTransform: "uppercase", color: RED }}>
                {c.eyebrow}
              </span>
            </div>

            {/* Big code */}
            <div style={{ fontFamily: FONT, fontWeight: 200,
              fontSize: "clamp(96px,18vw,240px)", color: "#fff", lineHeight: 0.9,
              letterSpacing: "-0.03em", marginBottom: "clamp(16px,3vh,28px)" }}>
              {c.code}
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(22px,3vw,40px)", color: "#fff", lineHeight: 1.15,
              letterSpacing: "-0.01em", margin: "0 0 16px", textWrap: "balance" }}>
              {c.heading}
            </h1>

            {/* Body */}
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(14px,1.2vw,16px)", color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8, maxWidth: 460, margin: "0 0 clamp(36px,5vh,48px)" }}>
              {c.body}
            </p>

            {/* Primary CTA */}
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              border: "1px solid rgba(185,185,183,0.4)", padding: "16px 34px",
              fontFamily: FONT, fontSize: "10.5px", fontWeight: 400,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: RED, textDecoration: "none",
              transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GREY; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(185,185,183,0.4)"; e.currentTarget.style.color = RED; e.currentTarget.style.background = "transparent"; }}
            >
              {c.primary}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"
                style={{ transform: isAr ? "scaleX(-1)" : "none" }}>
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Quick links */}
            <div style={{ marginTop: "clamp(32px,5vh,44px)" }}>
              <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
                {c.more}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
                {c.links.map(l => (
                  <Link key={l.href} to={l.href} style={{
                    fontFamily: FONT, fontSize: "12px", fontWeight: 300,
                    letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)",
                    textDecoration: "none", borderBottom: "1px solid rgba(185,185,183,0.3)",
                    paddingBottom: 3, transition: "color 0.2s, border-color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = RED; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.borderColor = "rgba(185,185,183,0.3)"; }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
