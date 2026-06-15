import { useRef, useEffect, useState } from "react";
import { motion, useInView }           from "framer-motion";
import { useT, useContent, useI18n }   from "@/lib/i18n";
import { Editable, EditableRow } from "@/lib/EditMode";
import { useStatCounters, useStatLabels } from "@/lib/useCmsContent";

/* Counter config now lives in the locale JSON under stats.counters, so a CMS
   editor can change every number — start, end, step, the displayed value, and
   the unit — without touching code. The count-up animates start→end stepping
   by `step`; `display` is the final formatted string shown when the animation
   completes (lets "412.6" / Eastern-Arabic numerals render exactly as typed). */
interface Counter {
  key: string;
  start: number;
  end: number;
  step: number;
  display: string;
  unit: string;
}

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

/* Expo-out count-up hook — animates `start`→`end` quantised to `step`,
   1.6s duration with staggered delay per stat. */
function useCountUp(start: number, end: number, step = 1, duration = 1600, delay = 0, active = false) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!active) return;
    const safeStep = step > 0 ? step : 1;
    let startTime: number | null = null;
    let raf: number;

    const delayTimer = setTimeout(() => {
      const stepFrame = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); /* expo ease-out */
        const rawVal = start + eased * (end - start);
        /* Quantise to the nearest step so the rolling numbers honour `step` */
        const quantised = Math.round(rawVal / safeStep) * safeStep;
        setValue(quantised);
        if (t < 1) raf = requestAnimationFrame(stepFrame);
        else setValue(end);
      };
      raf = requestAnimationFrame(stepFrame);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, [start, end, step, duration, delay, active]);

  return value;
}

function StatColumn({
  counter, index, active, total, dbLabel,
}: { counter: Counter; index: number; active: boolean; total: number; dbLabel?: { label: string; sub: string } }) {
  const t        = useT();
  const { key: statKey, start, end, step, display, unit } = counter;
  const hasComma = display.includes(",");
  const counted  = useCountUp(start, end, step, 1600, index * 120, active);
  const done     = counted >= end;
  /* While animating, show the rolling integer; once complete, show the
     editor's exact `display` string (preserves "412.6", Eastern digits, etc.) */
  const shown    = !active
    ? String(start)
    : done
      ? display
      : (hasComma ? counted.toLocaleString("en-US") : String(counted));
  /* DB label/sub take precedence when published; else fall back to t() */
  const label    = dbLabel?.label || t(`stats.items.${statKey}.label`);
  const sub      = dbLabel?.sub   || t(`stats.items.${statKey}.sub`);

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
        <EditableRow id={`stat_counters:home:${statKey}`}>
        {shown}
        {unit && (
          <span style={{
            fontFamily: CG,
            fontSize: "clamp(14px,1.8vw,28px)",
            fontWeight: 200, color: PEARL,
            letterSpacing: "-0.01em",
          }}>{unit}</span>
        )}
        </EditableRow>
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
  const t        = useT();
  const { lang } = useI18n();
  const staticCounters = useContent<Counter[]>("stats.counters");
  /* DB override: published "home" counters take precedence; null → static */
  const dbCounters = useStatCounters("home", lang);
  const dbLabels   = useStatLabels("home", lang);
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const staticList = Array.isArray(staticCounters) ? staticCounters : [];
  const list     = dbCounters ?? staticList;

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
          {list.map((c, i) => (
            <StatColumn
              key={c.key}
              counter={c}
              index={i}
              total={list.length}
              active={inView}
              dbLabel={dbLabels[c.key]}
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
