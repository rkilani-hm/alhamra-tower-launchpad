import { useRef, useEffect, useState } from "react";
import { motion, useInView }           from "framer-motion";
import { useT }                        from "@/lib/i18n";

/* ═════════════════════════════════════════════════════════════════════════
   STATS — MONUMENTAL
   ────────────────────────────────────────────────────────────────────────
   Single consolidated monumental-stats section. Replaces the previous
   two-component setup where AwardsStrip and Stats both rendered count-up
   numbers on the home page (3 of 4 stats were duplicated, plus AwardsStrip
   carried a recognition row that duplicated the Marquee).

   This component now owns the entire "by the numbers" beat:
     • Dark cinematic plate (#0F0E0C with ambient gold glow)
     • Five monumental numbers, count-up animated on viewport entry
     • Centred eyebrow pattern (hairline · text · hairline)
     • No recognition row — awards are owned exclusively by the Marquee

   Five numbers, each telling a distinct story:
     412.6 m     vertical authority
     258,000 m²  material rarity (largest stone-clad façade ever)
     62          tenant logic (no south-facing offices)
     351 m       premium altitude (Sky Lounge)
     2011        provenance (engineering by SOM San Francisco)
═════════════════════════════════════════════════════════════════════════ */

const PEARL = "#C8B99A";
const CG    = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* Structural data — numbers stay as data; label/sub come from i18n at render */
const STATS = [
  { raw: 412,    display: "412.6",   unit: " m",   key: "height"    },
  { raw: 258000, display: "258,000", unit: " m²",  key: "limestone" },
  { raw: 62,     display: "62",      unit: "",     key: "floors"    },
  { raw: 351,    display: "351",     unit: " m",   key: "skyLounge" },
  { raw: 2011,   display: "2011",    unit: "",     key: "year"      },
];

/* Expo-out count-up hook — 1.6s duration with staggered delay per stat */
function useCountUp(end: number, duration = 1600, delay = 0, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let raf: number;

    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); /* expo ease-out */
        setValue(Math.round(eased * end));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [end, duration, delay, active]);

  return value;
}

function StatColumn({
  raw, display, unit, statKey, index, active, total,
}: typeof STATS[number] & { statKey: string; index: number; active: boolean; total: number }) {
  const t        = useT();
  const hasComma = display.includes(",");
  const counted  = useCountUp(raw, 1600, index * 120, active);
  const shown    = active
    ? (hasComma ? counted.toLocaleString("en-US") : String(counted))
    : "0";
  const label    = t(`stats.items.${statKey}.label`);
  const sub      = t(`stats.items.${statKey}.sub`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1,
        padding: "clamp(28px,4vh,48px) clamp(16px,2vw,32px)",
        borderRight: index < total - 1 ? "1px solid rgba(200,185,154,0.15)" : "none",
        display: "flex", flexDirection: "column", gap: 6,
        textAlign: "center",
      }}
    >
      {/* Label */}
      <div style={{
        fontFamily: CG, fontSize: "10px",
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: PEARL, marginBottom: 6,
      }}>
        {label}
      </div>

      {/* Monumental number — sized to fit 5 stats per row at 1280px max */}
      <div style={{
        fontFamily: CG, fontWeight: 200,
        fontSize: "clamp(40px,5.5vw,84px)",
        color: "#fff",
        lineHeight: 1,
        letterSpacing: "-0.03em",
      }}>
        {shown}
        {unit && (
          <span style={{
            fontFamily: CG,
            fontSize: "clamp(14px,1.8vw,28px)",
            fontWeight: 200, color: PEARL,
            letterSpacing: "-0.01em",
          }}>{unit}</span>
        )}
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: CG, fontSize: "11px",
        color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.08em",
        marginTop: 6,
      }}>
        {sub}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const t      = useT();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{
      background: "#0F0E0C",
      padding: "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient gold glow — centre */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(200,185,154,0.06) 0%, transparent 60%)",
      }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

        {/* Centred kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14, marginBottom: "clamp(36px,5vh,56px)",
          }}
        >
          <span style={{ width: 32, height: 1, background: PEARL }} />
          <span style={{
            fontFamily: CG, fontSize: "11px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL,
          }}>
            {t("stats.kicker")}
          </span>
          <span style={{ width: 32, height: 1, background: PEARL }} />
        </motion.div>

        {/* Five monumental numbers in a single row */}
        <div className="stats-monuments-row" style={{
          display: "flex",
          alignItems: "stretch",
          borderTop: "1px solid rgba(200,185,154,0.15)",
          borderBottom: "1px solid rgba(200,185,154,0.15)",
        }}>
          {STATS.map((s, i) => (
            <StatColumn
              key={s.key}
              {...s}
              statKey={s.key}
              index={i}
              total={STATS.length}
              active={inView}
            />
          ))}
        </div>
      </div>

      {/* Responsive — collapse to 3-col on tablet, 2-col on phones, 1-col on small phones */}
      <style>{`
        @media (max-width: 900px) {
          .stats-monuments-row {
            flex-wrap: wrap;
            border-top: none;
            border-bottom: none;
          }
          .stats-monuments-row > * {
            flex: 1 1 33%;
            min-width: 33%;
            border-right: 1px solid rgba(200,185,154,0.15) !important;
            border-bottom: 1px solid rgba(200,185,154,0.15);
          }
          .stats-monuments-row > *:nth-child(3n) {
            border-right: none !important;
          }
          .stats-monuments-row > *:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }
        @media (max-width: 640px) {
          .stats-monuments-row > * {
            flex: 1 1 50%;
            min-width: 50%;
          }
          .stats-monuments-row > *:nth-child(3n) {
            border-right: 1px solid rgba(200,185,154,0.15) !important;
          }
          .stats-monuments-row > *:nth-child(2n) {
            border-right: none !important;
          }
        }
        @media (max-width: 460px) {
          .stats-monuments-row > * {
            flex: 1 1 100%;
            min-width: 100%;
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
