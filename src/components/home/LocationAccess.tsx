import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ScrollPanRows, type PanRow } from "@/components/shared/ScrollPanRows";

/* ──────────────────────────────────────────────────────────────────────────
   LocationAccess — "Location, Access and Experience".
   A title above a full-width, low-height banner with the slogan on the image,
   a facts row, then two sub-sections of image + text rows presented as pinned
   horizontal pans: "Location & Access" and "Experience". Images and the row
   copy are PLACEHOLDERS; swap them for the final content later.
────────────────────────────────────────────────────────────────────────────── */

const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const DARK  = "#1D1D1B";
const MUTED = "#6B6B6B";
const PEARL_TEXT = "#8B6E3E";

type Fact = { n: string; l: string };

const CONTENT: Record<string, {
  eyebrow: string; heading: string; intro: string; topImg: string;
  facts: Fact[];
  accessTitle: string; accessRows: PanRow[];
  experienceTitle: string; experienceRows: PanRow[];
}> = {
  en: {
    eyebrow: "Location, Access and Experience",
    heading: "Minutes from everything that matters.",
    intro: "Sharq District, at the centre of Kuwait City's government, financial and diplomatic quarter.",
    topImg: "/assets/kuwait-waterfront.jpg",
    facts: [
      { n: "5 min", l: "To the government & ministries district" },
      { n: "2,000+", l: "Structured parking spaces" },
      { n: "Valet", l: "Arrival at the main entrance" },
      { n: "Floor 55", l: "Sky-lobby event hall" },
      { n: "Floor 36", l: "Al Hamra Business Centre" },
    ],
    accessTitle: "Location & Access",
    accessRows: [
      { img: "/assets/entrance-night-wide.jpg", heading: "Arrival, considered.", body: "Placeholder copy for an access row. Replace later. Valet service, structured parking and a direct route from the main entrance." },
      { img: "/assets/lobby-elevator-hall.jpg", heading: "Moving through the tower.", body: "Placeholder copy. Replace later. High-speed elevator banks and two sky lobbies keep every floor within easy reach." },
    ],
    experienceTitle: "Experience",
    experienceRows: [
      { img: "/assets/high-floor-view-lounge.jpg", heading: "The view from above.", body: "Placeholder copy for an experience row. Replace later. Lounges and vantage points across the upper floors." },
      { img: "/assets/mall-atrium-luxury-centre.jpg", heading: "Retail and dining, below.", body: "Placeholder copy. Replace later. The Al Hamra shopping centre and its dining sit directly beneath the tower." },
      { img: "/assets/lobby-executive-lounge.jpg", heading: "Hospitality within reach.", body: "Placeholder copy. Replace later. Executive lounges, concierge and hotel service across the destination." },
    ],
  },
  ar: {
    eyebrow: "الموقع والوصول والتجربة",
    heading: "على بُعد دقائق من كل ما يهم.",
    intro: "في قلب منطقة شرق، مركز الحكومة والمال والدبلوماسية في مدينة الكويت.",
    topImg: "/assets/kuwait-waterfront.jpg",
    facts: [
      { n: "5 دقائق", l: "إلى منطقة الحكومة والوزارات" },
      { n: "+2,000", l: "موقف سيارات منظّم" },
      { n: "خدمة صف", l: "استقبال عند المدخل الرئيسي" },
      { n: "الطابق 55", l: "قاعة فعاليات في البهو السماوي" },
      { n: "الطابق 36", l: "مركز الحمرا للأعمال" },
    ],
    accessTitle: "الموقع والوصول",
    accessRows: [
      { img: "/assets/entrance-night-wide.jpg", heading: "وصولٌ مدروس.", body: "نصٌّ مؤقت لصف الوصول. استبدله لاحقاً. خدمة صف السيارات، ومواقف منظّمة، ومسارٌ مباشر من المدخل الرئيسي." },
      { img: "/assets/lobby-elevator-hall.jpg", heading: "التنقّل داخل البرج.", body: "نصٌّ مؤقت. استبدله لاحقاً. مصاعد عالية السرعة وبهوان سماويان يبقيان كل طابقٍ في متناول اليد." },
    ],
    experienceTitle: "التجربة",
    experienceRows: [
      { img: "/assets/high-floor-view-lounge.jpg", heading: "الإطلالة من الأعلى.", body: "نصٌّ مؤقت لصف التجربة. استبدله لاحقاً. صالات ونقاط إطلالة عبر الطوابق العليا." },
      { img: "/assets/mall-atrium-luxury-centre.jpg", heading: "التسوّق والمطاعم في الأسفل.", body: "نصٌّ مؤقت. استبدله لاحقاً. مركز الحمرا للتسوق ومطاعمه أسفل البرج مباشرة." },
      { img: "/assets/lobby-executive-lounge.jpg", heading: "ضيافةٌ في المتناول.", body: "نصٌّ مؤقت. استبدله لاحقاً. صالات تنفيذية وخدمة كونسيرج وضيافة الفندق عبر الوجهة." },
    ],
  },
};

export function LocationAccess() {
  const { lang } = useI18n();
  const c = CONTENT[lang] ?? CONTENT.en;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* Intro: title above a full-width low banner with the slogan overlaid */}
      <section style={{ background: "#fff", padding: "clamp(80px,12vh,140px) clamp(28px,6vw,96px) clamp(56px,8vh,96px)" }}>
        <div ref={ref} style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: "clamp(22px,3.2vh,38px)" }}>
            <span style={{ width: 34, height: 1, background: "rgba(139,110,62,0.45)" }} />
            <span style={{ fontFamily: FONT, fontSize: "11px", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL_TEXT }}>
              {c.eyebrow}
            </span>
            <span style={{ width: 34, height: 1, background: "rgba(139,110,62,0.45)" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="la-banner"
            style={{ position: "relative", aspectRatio: "24 / 7", overflow: "hidden", background: "#0c0b09" }}
          >
            <img src={c.topImg} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,11,9,0.30) 0%, rgba(12,11,9,0.10) 42%, rgba(12,11,9,0.44) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(24px,5vw,80px)" }}>
              <h2 style={{
                fontFamily: FONT, fontWeight: 300, fontSize: "clamp(28px,4vw,60px)",
                color: "#fff", lineHeight: 1.12, letterSpacing: "-0.015em", margin: 0,
                textAlign: "center", textWrap: "balance", textShadow: "0 2px 34px rgba(0,0,0,0.4)",
              }}>{c.heading}</h2>
            </div>
          </motion.div>

          <p style={{
            fontFamily: FONT, fontSize: "clamp(14px,1.1vw,16px)", fontWeight: 300,
            color: MUTED, lineHeight: 1.8, maxWidth: 560, margin: "clamp(28px,4vh,44px) auto 0",
            textAlign: "center", textWrap: "pretty",
          }}>{c.intro}</p>

          <div className="la-facts" style={{
            marginTop: "clamp(44px,6vh,72px)",
            display: "flex", alignItems: "stretch",
            borderTop: "1px solid rgba(29,29,27,0.10)",
          }}>
            {c.facts.map((f, i) => (
              <motion.div
                key={f.l}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: 1, padding: "clamp(24px,3vh,34px) clamp(14px,1.8vw,28px)",
                  borderInlineStart: i === 0 ? "none" : "1px solid rgba(29,29,27,0.09)",
                }}
              >
                <div style={{
                  fontFamily: FONT, fontWeight: 300, fontSize: "clamp(22px,2.4vw,34px)",
                  color: DARK, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums",
                }}>{f.n}</div>
                <div style={{
                  fontFamily: FONT, fontSize: "11px", fontWeight: 300, color: MUTED,
                  lineHeight: 1.6, marginTop: 8, textWrap: "pretty",
                }}>{f.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two sub-sections of rows as pinned horizontal pans */}
      <ScrollPanRows rows={c.accessRows} title={c.accessTitle} />
      <ScrollPanRows rows={c.experienceRows} title={c.experienceTitle} />

      <style>{`
        @media (max-width: 860px) {
          .la-banner { aspect-ratio: 16 / 9 !important; }
          .la-facts { flex-wrap: wrap; border-top: none; }
          .la-facts > * { flex: 1 1 50%; min-width: 50%; border-top: 1px solid rgba(29,29,27,0.10); }
          .la-facts > *:nth-child(odd) { border-inline-start: none !important; }
        }
      `}</style>
    </>
  );
}

export default LocationAccess;
