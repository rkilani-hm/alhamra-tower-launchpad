import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Stats — corrected from SOM CTBUH paper + Firdous PDF
   412.6m · 62 office floors · 258,000m² limestone · 289 piles */

const PEARL = "#C8B99A";

const STATS = [
  { number: "412",     unit: "m",   label: "Height to tip",                sub: "Kuwait's tallest building"         },
  { number: "62",      unit: "",    label: "Dedicated office floors",       sub: "Floors 6 – 75"                     },
  { number: "258,000", unit: "m²",  label: "Jura limestone cladding",      sub: "World record stone-clad tower"     },
  { number: "351",     unit: "m",   label: "Sky Lounge elevation",         sub: "Highest dining point in Kuwait"    },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="stats-bar grid-4col"
      style={{ borderTop: "1px solid rgba(29,29,27,0.07)", borderBottom: "1px solid rgba(29,29,27,0.07)" }}
    >
      {STATS.map(({ number, unit, label, sub }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
          style={{
            padding: "clamp(36px,5vh,52px) clamp(24px,3vw,44px)",
            borderRight: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none",
            transition: "background 0.3s",
            cursor: "default",
            display: "flex", flexDirection: "column", gap: 8,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
        >
          <div style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "clamp(36px,4.5vw,58px)",
            fontWeight: 300, lineHeight: 1, color: "#1D1D1B",
          }}>
            {number}
            {unit && (
              <span style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(14px,1.8vw,22px)",
                fontWeight: 200, color: PEARL, marginLeft: 4,
              }}>
                {unit}
              </span>
            )}
          </div>
          <div style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.9vw,11px)",
            letterSpacing: "0.28em", textTransform: "uppercase", color: "#1D1D1B",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            color: "#767676", letterSpacing: "0.05em",
          }}>
            {sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
