import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Editable } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

/* ──────────────────────────────────────────────────────────────────────────
   HeroStatsBar — tenant-facing metrics under the hero on a light grey plate:
   red labels + units, dark count-up numbers, and muted-grey descriptors.
   Numeric values count up on entry; non-numeric ("24/7") hold.

   Content is a self-contained bilingual object for now; it can be lifted into
   the CMS (section_fields) after the new homepage direction is approved.
────────────────────────────────────────────────────────────────────────────── */

const FONT   = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const RED    = "#CD1719"; // Al Hamra CI red
const DARK   = "#1D1D1B"; // numbers
const SUB    = "#6B6B6B";  // muted descriptors
const DIVIDER = "rgba(29,29,27,0.10)";
const HAIR   = "#C8B99A";

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

/* Expo-out count-up for pure-integer values; non-numeric strings hold as-is. */
function useCountUp(nStr: string, active: boolean, delay: number) {
  const target = /^\d+$/.test(nStr) ? parseInt(nStr, 10) : null;
  const [val, setVal] = useState<string>(target === null ? nStr : "0");
  useEffect(() => {
    if (target === null) { setVal(nStr); return; }
    if (!active) { setVal("0"); return; }
    let raf = 0; let start: number | null = null;
    const timer = setTimeout(() => {
      const dur = 1600;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(String(Math.round(eased * target)));
        if (p < 1) raf = requestAnimationFrame(step); else setVal(String(target));
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [active, nStr, delay, target]);
  return val;
}

function StatColumn({ s, index, active }: { s: Stat; index: number; active: boolean }) {
  const shown = useCountUp(s.n, active, index * 120);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1, textAlign: "center",
        padding: "clamp(26px,3.4vh,40px) clamp(12px,1.8vw,28px)",
        borderInlineStart: index === 0 ? "none" : `1px solid ${DIVIDER}`,
      }}
    >
      <div style={{
        fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: RED,
        marginBottom: 16, textWrap: "balance",
      }}><Editable id={`page_prose:home2stats:stats.${index}.label`}>{s.label}</Editable></div>

      <div style={{
        fontFamily: FONT, fontWeight: 200,
        fontSize: "clamp(30px,3.6vw,54px)", color: DARK,
        lineHeight: 1, letterSpacing: "-0.03em",
        fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
      }}>
        {shown}
        {s.u && (
          <span style={{
            fontFamily: FONT, fontSize: "0.42em", fontWeight: 200,
            color: RED, marginInlineStart: 3, letterSpacing: "0",
          }}>{s.u}</span>
        )}
      </div>

      <div style={{
        fontFamily: FONT, fontSize: "12px", fontWeight: 300,
        color: SUB, lineHeight: 1.6, marginTop: 14,
        letterSpacing: "0.01em", textWrap: "pretty",
      }}><Editable id={`page_prose:home2stats:stats.${index}.sub`}>{s.sub}</Editable></div>
    </motion.div>
  );
}

export function HeroStatsBar() {
  const { lang } = useI18n();
  const c = usePageContent<any>("home2stats", CONTENT[lang] ?? CONTENT.en, lang);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#F4F3F0", position: "relative", overflow: "hidden" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1360, margin: "0 auto", position: "relative",
          padding: "clamp(56px,8vh,96px) clamp(20px,4vw,64px) clamp(52px,7vh,84px)",
        }}
      >
        {/* Centred eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: "clamp(36px,5vh,56px)",
          }}
        >
          <span style={{ width: 32, height: 1, background: HAIR }} />
          <span style={{
            fontFamily: FONT, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.4em", textTransform: "uppercase", color: RED,
          }}><Editable id="page_prose:home2stats:eyebrow">{c.eyebrow}</Editable></span>
          <span style={{ width: 32, height: 1, background: HAIR }} />
        </motion.div>

        {/* Row */}
        <div className="hs-row" style={{
          display: "flex", alignItems: "stretch",
          borderTop: `1px solid ${DIVIDER}`, borderBottom: `1px solid ${DIVIDER}`,
        }}>
          {c.stats.map((s, i) => <StatColumn key={s.label} s={s} index={i} active={inView} />)}
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
