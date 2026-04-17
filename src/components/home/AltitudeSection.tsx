import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ── AltitudeSection ──────────────────────────────────────────────────
   Landmark tower sites (Burj Khalifa, One World Trade, The Shard)
   always have a dedicated cinematic moment that communicates height
   as an emotional fact, not just a number.

   This section:
   - Full-width dark charcoal with the tower silhouette image
   - An animated vertical altitude rail that fills as it enters viewport
   - The 412m number counts up dramatically
   - A quote from the SOM architects
   - Key altitude markers (Ground → Sky Lobby → Sky Lounge → Tip)

   Position: between GulfSection and Stats on the homepage.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";
const CG    = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const MARKERS = [
  { m: 0,   label: "Ground Floor",   sublabel: "Grand Lobby · 24 m vault" },
  { m: 148, label: "Sky Lobby I",    sublabel: "Floor 30 · Transfer zone"  },
  { m: 237, label: "Sky Lobby II",   sublabel: "Floor 55 · Executive hub"  },
  { m: 351, label: "Sky Lounge",     sublabel: "Floor 78 · Highest dining" },
  { m: 412, label: "Pinnacle",       sublabel: "412.6 m · Kuwait's summit" },
];

function useCountUp(target: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return value;
}

export function AltitudeSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const height = useCountUp(412, 2200, inView);

  /* Altitude rail fill */
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const railFill = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      style={{
        background: "#0F0E0C",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(72px,10vh,120px) 0",
      }}
    >
      {/* Background tower silhouette — very subtle */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url('/assets/tower-foggy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        opacity: 0.07,
        filter: "grayscale(100%)",
      }} />

      {/* Atmospheric left-edge gold glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: "35%", pointerEvents: "none",
        background: `radial-gradient(ellipse at left center, rgba(200,185,154,0.07) 0%, transparent 70%)`,
      }} />

      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 clamp(28px,6vw,96px)",
        display: "grid",
        gridTemplateColumns: "1fr clamp(1px,1px,1px) 1fr",
        gap: "0 clamp(48px,7vw,96px)",
        alignItems: "center",
        position: "relative", zIndex: 2,
      }} className="altitude-grid">

        {/* ── LEFT: The Number ─────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}
          >
            <span style={{ width: 32, height: 1, background: PEARL, flexShrink: 0 }} />
            <span style={{
              fontFamily: CG, fontSize: "11px", letterSpacing: "0.4em",
              textTransform: "uppercase", color: PEARL,
            }}>
              Above Kuwait City
            </span>
          </motion.div>

          {/* Giant altitude number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-label={`${height} metres above Kuwait City`}
          >
            <div style={{
              fontFamily: CG, fontWeight: 200,
              fontSize: "clamp(96px,14vw,196px)",
              color: "#fff", lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}>
              {inView ? height : 0}
            </div>
            <div style={{
              fontFamily: CG, fontWeight: 200,
              fontSize: "clamp(28px,4vw,56px)",
              color: PEARL, letterSpacing: "0.04em",
              marginTop: 8,
            }}>
              metres
            </div>
          </motion.div>

          {/* SOM architectural quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ margin: "clamp(32px,5vh,56px) 0 0", padding: "0 0 0 20px",
              borderLeft: `1px solid rgba(200,185,154,0.35)` }}
          >
            <p style={{
              fontFamily: CG, fontWeight: 200,
              fontSize: "clamp(14px,1.3vw,17px)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8, margin: 0, fontStyle: "italic",
            }}>
              "The building geometry is generated by a spiralling slice
              subtracted from a simple prismatic volume — architectural
              expression through structural form on a grand scale."
            </p>
            <footer style={{
              fontFamily: CG, fontSize: "10px",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: PEARL, marginTop: 16,
            }}>
              Skidmore, Owings &amp; Merrill LLP
            </footer>
          </motion.blockquote>
        </div>

        {/* ── CENTRE: Altitude Rail ─────────────────────────────── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          alignSelf: "stretch", position: "relative",
        }} className="altitude-rail-col">
          {/* Rail track */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: 1,
            background: "rgba(200,185,154,0.1)",
          }} />
          {/* Animated fill */}
          <motion.div
            style={{
              position: "absolute", top: 0, width: 1,
              background: `linear-gradient(to bottom, ${PEARL}, rgba(200,185,154,0.3))`,
              height: railFill,
            }}
          />
          {/* Marker dots */}
          {MARKERS.map((m, i) => (
            <motion.div
              key={m.m}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: `${(1 - m.m / 412) * 100}%`,
                transform: "translateY(-50%)",
                width: 8, height: 8, borderRadius: "50%",
                background: m.m === 412 ? PEARL : "#0F0E0C",
                border: `1px solid ${PEARL}`,
                zIndex: 2,
              }}
            />
          ))}
        </div>

        {/* ── RIGHT: Altitude markers ───────────────────────────── */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          alignSelf: "stretch",
          paddingLeft: 32,
          gap: 0,
        }} className="altitude-markers">
          {[...MARKERS].reverse().map((marker, i) => (
            <motion.div
              key={marker.m}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ paddingBottom: i < MARKERS.length - 1 ? "clamp(20px,3.5vh,36px)" : 0 }}
            >
              <div style={{
                fontFamily: CG, fontSize: "clamp(16px,1.8vw,22px)",
                fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 4,
              }}>
                {marker.m}<span style={{ fontSize: "0.5em", color: PEARL, marginLeft: 4 }}>m</span>
              </div>
              <div style={{
                fontFamily: CG, fontSize: "11px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)", marginBottom: 2,
              }}>
                {marker.label}
              </div>
              <div style={{
                fontFamily: CG, fontSize: "10px",
                color: "rgba(200,185,154,0.6)",
              }}>
                {marker.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .altitude-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .altitude-rail-col { display: none !important; }
          .altitude-markers  { padding-left: 0 !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
