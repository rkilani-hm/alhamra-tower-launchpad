import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Mashrabiya Section Divider ───────────────────────────────────────
   A row of Islamic geometric rosettes used as a section break.
   The geometry is derived from the tower's own facade grid —
   a 6-pointed rosette based on the hexagonal Jura limestone cladding.
──────────────────────────────────────────────────────────────────────── */

function Rosette({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer hexagon */}
      <polygon
        points="14,1 24.5,7.5 24.5,20.5 14,27 3.5,20.5 3.5,7.5"
        stroke="#C8B99A" strokeWidth="0.5" fill="none" opacity="0.5"
      />
      {/* Inner hexagon */}
      <polygon
        points="14,6 20.5,9.75 20.5,18.25 14,22 7.5,18.25 7.5,9.75"
        stroke="#C8B99A" strokeWidth="0.5" fill="none" opacity="0.7"
      />
      {/* Star lines */}
      <line x1="14" y1="1"  x2="14" y2="6"  stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      <line x1="24.5" y1="7.5" x2="20.5" y2="9.75" stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      <line x1="24.5" y1="20.5" x2="20.5" y2="18.25" stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      <line x1="14" y1="27" x2="14" y2="22" stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      <line x1="3.5" y1="20.5" x2="7.5" y2="18.25" stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      <line x1="3.5" y1="7.5" x2="7.5" y2="9.75" stroke="#C8B99A" strokeWidth="0.4" opacity="0.5" />
      {/* Centre dot */}
      <circle cx="14" cy="14" r="1.2" fill="#C8B99A" opacity="0.6" />
    </motion.svg>
  );
}

export function MashrabiyaDivider({ count = 9, light = false }: { count?: number; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: "clamp(8px,2vw,24px)",
        padding: "clamp(32px,5vw,64px) 0",
        opacity: light ? 0.4 : 1,
      }}
      aria-hidden="true"
    >
      {/* Left fade line */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          flex: 1, maxWidth: 120, height: 1,
          background: "linear-gradient(to right, transparent, #C8B99A)",
          transformOrigin: "right",
        }}
      />

      {/* Rosettes */}
      {Array.from({ length: count }).map((_, i) => (
        <Rosette key={i} delay={i * 0.06} />
      ))}

      {/* Right fade line */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{
          flex: 1, maxWidth: 120, height: 1,
          background: "linear-gradient(to left, transparent, #C8B99A)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

/* Single rosette for inline use */
export function RosetteAccent() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }} aria-hidden="true">
      <Rosette delay={0} />
    </div>
  );
}
