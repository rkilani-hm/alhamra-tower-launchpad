import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/* ──────────────────────────────────────────────────────────────────────────
   HeroStatsBar — tenant-facing metrics under the hero, in the three-tier
   "By the Numbers" layout (label above, big number, descriptor below) on a
   grey ground, using the site's gold label / dark number / muted-grey subtitle
   treatment.

   Content is a self-contained bilingual object for now; it can be lifted into
   the CMS (section_fields) after the new homepage direction is approved.
────────────────────────────────────────────────────────────────────────────── */

const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const GOLD  = "#CD1719"; // accessible Al Hamra gold (reads as gold on light grey)
const BLACK = "#1D1D1B"; // Al Hamra CI black
const MUTED = "#6B6B6B";
const GREY_BG = "#EAEAEA";
const DIVIDER = "rgba(29,29,27,0.14)";

type Stat = { label: string; n: string; u?: string; sub: string };

const CONTENT: Record<string, { eyebrow: string; stats: Stat[] }> = {
  en: {
    eyebrow: "By the Numbers",
    stats: [
      { label: "Height", n: "413", u: "m", sub: "Kuwait's tallest tower" },
      { label: "Floors", n: "80", sub: "Office, executive and sky levels" },
      { label: "Leading Companies", n: "50", u: "+", sub: "Institutions in residence" },
      { label: "Occupancy", n: "95", u: "%", sub: "Currently leased" },
      { label: "Operations", n: "24/7", sub: "Concierge and security" },
    ],
  },
  ar: {
    eyebrow: "بالأرقام",
    stats: [
      { label: "الارتفاع", n: "413", u: "م", sub: "أطول برج في الكويت" },
      { label: "الطوابق", n: "80", sub: "مكاتب وتنفيذي وطوابق سماوية" },
      { label: "الشركات الرائدة", n: "50", u: "+", sub: "مؤسسات في البرج" },
      { label: "الإشغال", n: "95", u: "٪", sub: "مؤجَّر حالياً" },
      { label: "التشغيل", n: "24/7", sub: "خدمة وأمن على مدار الساعة" },
    ],
  },
};

export function HeroStatsBar() {
  const { lang } = useI18n();
  const c = CONTENT[lang] ?? CONTENT.en;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section style={{ background: GREY_BG }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1360, margin: "0 auto",
          padding: "clamp(44px,6vh,72px) clamp(20px,4vw,64px) clamp(40px,5vh,64px)",
        }}
      >
        {/* Centred eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: "clamp(30px,4vh,44px)",
          }}
        >
          <span style={{ width: 34, height: 1, background: "rgba(139,110,62,0.45)" }} />
          <span style={{
            fontFamily: FONT, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD,
          }}>
            {c.eyebrow}
          </span>
          <span style={{ width: 34, height: 1, background: "rgba(139,110,62,0.45)" }} />
        </motion.div>

        {/* Three-tier stat row */}
        <div
          className="hs-row"
          style={{
            display: "flex", alignItems: "stretch",
            borderTop: `1px solid ${DIVIDER}`,
            borderBottom: `1px solid ${DIVIDER}`,
          }}
        >
          {c.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1, textAlign: "center",
                padding: "clamp(26px,3.4vh,40px) clamp(12px,1.8vw,28px)",
                borderInlineStart: i === 0 ? "none" : `1px solid ${DIVIDER}`,
              }}
            >
              {/* Label — gold */}
              <div style={{
                fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD,
                marginBottom: 16, textWrap: "balance",
              }}>
                {s.label}
              </div>

              {/* Number — black */}
              <div style={{
                fontFamily: FONT, fontWeight: 300,
                fontSize: "clamp(30px,3.6vw,54px)", color: BLACK,
                lineHeight: 1, letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
              }}>
                {s.n}
                {s.u && (
                  <span style={{
                    fontFamily: FONT, fontSize: "0.42em", fontWeight: 300,
                    color: BLACK, marginInlineStart: 3, letterSpacing: "0",
                  }}>{s.u}</span>
                )}
              </div>

              {/* Subtitle — muted grey */}
              <div style={{
                fontFamily: FONT, fontSize: "12px", fontWeight: 300,
                color: MUTED, lineHeight: 1.6, marginTop: 14,
                letterSpacing: "0.01em", textWrap: "pretty",
              }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hs-row { flex-wrap: wrap; border-bottom: none; }
          .hs-row > * { flex: 1 1 33.33%; min-width: 33.33%; border-bottom: 1px solid ${DIVIDER}; }
          .hs-row > *:nth-child(3n+1) { border-inline-start: none !important; }
        }
        @media (max-width: 560px) {
          .hs-row > * { flex: 1 1 50%; min-width: 50%; }
          .hs-row > *:nth-child(odd) { border-inline-start: none !important; }
          .hs-row > *:nth-child(even) { border-inline-start: 1px solid ${DIVIDER} !important; }
        }
      `}</style>
    </section>
  );
}
