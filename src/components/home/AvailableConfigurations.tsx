import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

/* ──────────────────────────────────────────────────────────────────────────
   AvailableConfigurations — "Premium Office Spaces", moved high on the homepage
   so the first blocking tenant question ("is there space my size?") is answered
   before any architecture story. A wide sunset banner with a headline, then the
   three lease tiers with their defining features and a floor-plan link.

   Self-contained bilingual content for now; can be lifted into the CMS after the
   new homepage direction is approved. The banner image lives at
   /assets/config-horizon.jpg — drop the intended sunset shot there to replace it.
────────────────────────────────────────────────────────────────────────────── */

const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const DARK  = "#1D1D1B";
const MUTED = "#6B6B6B";
const PEARL = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";

const PLANS_HREF = "/business/office-spaces";

type Config = { tier: string; title: string; size: string; points: string[] };

const CONTENT: Record<string, {
  eyebrow: string; heading: string; bannerLines: string[]; plan: string; configs: Config[];
}> = {
  en: {
    eyebrow: "Available Configurations",
    heading: "Premium Office Spaces",
    bannerLines: ["Every office.", "Every corner.", "An unbroken horizon."],
    plan: "Floor plan",
    configs: [
      { tier: "Configuration 01", title: "Executive Suites", size: "250 – 500 m²",
        points: ["Corner office configuration", "Panoramic city views", "Private meeting room"] },
      { tier: "Configuration 02", title: "Full Floor", size: "1,200 – 1,800 m²",
        points: ["Exclusive whole-floor lease", "Dedicated elevator access", "Bespoke reception"] },
      { tier: "Configuration 03", title: "Corporate Headquarters", size: "3,000+ m²",
        points: ["Multi-floor lease opportunity", "Building signage rights", "Dedicated parking levels"] },
    ],
  },
  ar: {
    eyebrow: "المساحات المتاحة",
    heading: "مساحات مكتبية فاخرة",
    bannerLines: ["كل مكتب.", "كل زاوية.", "أفقٌ بلا انقطاع."],
    plan: "المخطط",
    configs: [
      { tier: "الخيار 01", title: "أجنحة تنفيذية", size: "250 – 500 م²",
        points: ["تصميم مكتب زاوية", "إطلالات بانوراميّة على المدينة", "غرفة اجتماعات خاصة"] },
      { tier: "الخيار 02", title: "طابق كامل", size: "1,200 – 1,800 م²",
        points: ["تأجير طابق كامل حصري", "مصعد مخصّص", "مكتب استقبال مصمّم"] },
      { tier: "الخيار 03", title: "مقر مؤسسي", size: "3,000+ م²",
        points: ["فرصة تأجير متعدّد الطوابق", "حقوق لافتات على المبنى", "مستويات مواقف مخصّصة"] },
    ],
  },
};

export function AvailableConfigurations() {
  const { lang } = useI18n();
  const c = CONTENT[lang] ?? CONTENT.en;
  const isAr = lang === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{
      background: "#fff",
      padding: "clamp(80px,12vh,140px) clamp(28px,6vw,96px)",
      borderTop: "1px solid rgba(29,29,27,0.07)",
    }}>
      <div ref={ref} style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ width: 32, height: 1, background: PEARL, flexShrink: 0 }} />
          <span style={{ fontFamily: FONT, fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL_TEXT }}>
            {c.eyebrow}
          </span>
        </div>
        <h2 style={{
          fontFamily: FONT, fontWeight: 200, fontSize: "clamp(24px,3vw,48px)",
          color: DARK, lineHeight: 1.16, letterSpacing: "-0.018em", margin: 0,
          textWrap: "balance", maxWidth: 780,
        }}>
          {c.heading}
        </h2>

        {/* Sunset banner with headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="config-banner"
          style={{
            position: "relative", marginTop: "clamp(36px,5vh,56px)",
            aspectRatio: "16 / 5", overflow: "hidden", background: "#0c0b09",
          }}
        >
          <img
            src="/assets/config-horizon.jpg"
            alt=""
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(12,11,9,0.15) 0%, transparent 40%), linear-gradient(to top, rgba(12,11,9,0.35) 0%, transparent 55%)",
          }} />
          <div style={{
            position: "absolute", bottom: "clamp(20px,4vh,44px)", insetInlineEnd: "clamp(24px,4vw,56px)",
            textAlign: isAr ? "left" : "right",
            fontFamily: FONT, fontWeight: 300, color: "#fff",
            fontSize: "clamp(18px,2.2vw,34px)", lineHeight: 1.28,
            letterSpacing: "0.01em", textShadow: "0 2px 30px rgba(0,0,0,0.45)",
          }}>
            {c.bannerLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </motion.div>

        {/* The three tiers */}
        <div className="config-grid" style={{
          marginTop: "clamp(44px,6vh,72px)",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        }}>
          {c.configs.map((cfg, i) => (
            <motion.div
              key={cfg.title}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", flexDirection: "column", height: "100%",
                padding: "0 clamp(24px,3vw,48px)",
                borderInlineStart: i === 0 ? "none" : "1px solid rgba(29,29,27,0.10)",
              }}
            >
              <div style={{
                fontFamily: FONT, fontSize: "11px", fontWeight: 400,
                letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED,
              }}>
                {cfg.tier}
              </div>
              <div style={{
                fontFamily: FONT, fontSize: "clamp(16px,1.4vw,19px)", fontWeight: 400,
                color: DARK, marginTop: 14, letterSpacing: "0.01em",
              }}>
                {cfg.title}
              </div>
              <div style={{
                fontFamily: FONT, fontSize: "clamp(28px,3vw,44px)", fontWeight: 200,
                color: DARK, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 12,
                fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
              }}>
                {cfg.size}
              </div>

              <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {cfg.points.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                    <span aria-hidden="true" style={{ width: 18, height: 1, flexShrink: 0, background: PEARL, transform: "translateY(-4px)" }} />
                    <span style={{
                      fontFamily: FONT, fontSize: "13.5px", fontWeight: 300, color: MUTED,
                      lineHeight: 1.6, textWrap: "pretty",
                    }}>{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={PLANS_HREF}
                className="config-plan"
                style={{
                  marginTop: "auto", paddingTop: 30,
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontFamily: FONT, fontSize: "10px", letterSpacing: "0.25em",
                  textTransform: "uppercase", color: DARK, textDecoration: "none",
                }}
              >
                <span>{c.plan}</span>
                <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true"
                     style={{ transform: isAr ? "scaleX(-1)" : "none" }}>
                  <path d="M1 4H17M13 1L17 4L13 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .config-plan .config-arrow { transition: transform 0.25s ease; }
        .config-plan:hover { color: ${PEARL_TEXT}; }
        @media (max-width: 820px) {
          .config-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .config-grid > * { border-inline-start: none !important; padding-inline: 0 !important; }
          .config-banner { aspect-ratio: 3 / 2 !important; }
        }
      `}</style>
    </section>
  );
}
