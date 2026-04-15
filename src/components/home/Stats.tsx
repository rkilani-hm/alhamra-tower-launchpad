import { useRef, useEffect, useState } from "react";
import { motion, useInView }           from "framer-motion";
import { stagger, fadeUp, hoverCard }  from "@/lib/motion";

/* ── Stats — animated count-up on viewport entry ───────────────────────
   Numbers count from 0 → target with expo ease-out.
   Each stat card stagger-reveals 90ms after the previous.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";
const MUTED = "#767676";
const CG    = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const STATS = [
  { raw: 412,    display: "412",     unit: "m",   label: "Height to tip",           sub: "Kuwait's tallest building"         },
  { raw: 62,     display: "62",      unit: "",    label: "Dedicated office floors",  sub: "Floors 6 – 75"                     },
  { raw: 258000, display: "258,000", unit: "m²",  label: "Jura limestone cladding", sub: "World record stone-clad tower"     },
  { raw: 351,    display: "351",     unit: "m",   label: "Sky Lounge elevation",     sub: "Highest dining point in Kuwait"    },
];

/* Expo-out count-up hook */
function useCountUp(end: number, duration = 1400, delay = 0, active = false) {
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
        // Expo ease-out: 1 - (1-t)^4
        const eased = 1 - Math.pow(1 - t, 4);
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

function formatWithCommas(n: number, hasComma: boolean): string {
  if (!hasComma) return String(n);
  return n.toLocaleString("en-US");
}

function StatCard({
  raw, display, unit, label, sub, index, active,
}: typeof STATS[number] & { index: number; active: boolean }) {
  const hasComma = display.includes(",");
  const counted  = useCountUp(raw, 1600, index * 120, active);
  const shown    = active ? formatWithCommas(counted, hasComma) : "0";

  return (
    <motion.div
      variants={fadeUp}
      {...hoverCard}
      style={{
        padding: "clamp(36px,5vh,52px) clamp(24px,3vw,44px)",
        borderRight: index < 3 ? "1px solid rgba(29,29,27,0.07)" : "none",
        cursor: "default",
        display: "flex", flexDirection: "column", gap: 8,
        background: "#fff", transition: "background 0.3s",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = "#FAFAFA";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = "#fff";
      }}
    >
      {/* Animated gold accent — left edge, grows down on hover */}
      <motion.div
        style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2,
          background: PEARL, transformOrigin: "top", scaleY: 0, opacity: 0,
        }}
        whileHover={{ scaleY: 1, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
        aria-hidden="true"
      />

      {/* Number + unit */}
      <div style={{ fontFamily: CG, fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, lineHeight: 1, color: DARK }}>
        {shown}
        {unit && (
          <span style={{ fontFamily: CG, fontSize: "clamp(14px,1.8vw,22px)", fontWeight: 200, color: PEARL, marginLeft: 4 }}>
            {unit}
          </span>
        )}
      </div>

      {/* Label */}
      <div style={{ fontFamily: CG, fontSize: "clamp(10px,0.9vw,11px)", letterSpacing: "0.28em", textTransform: "uppercase", color: DARK }}>
        {label}
      </div>

      {/* Sub */}
      <div style={{ fontFamily: CG, fontSize: "clamp(10px,0.85vw,11px)", color: MUTED, letterSpacing: "0.05em" }}>
        {sub}
      </div>
    </motion.div>
  );
}

export function Stats() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="stats-bar grid-4col"
      style={{ borderTop: "1px solid rgba(29,29,27,0.07)", borderBottom: "1px solid rgba(29,29,27,0.07)" }}
    >
      {STATS.map((s, i) => (
        <StatCard key={s.label} {...s} index={i} active={inView} />
      ))}
    </motion.div>
  );
}
