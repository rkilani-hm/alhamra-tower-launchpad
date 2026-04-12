import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ── The Gulf Section ─────────────────────────────────────────────────
   Full-viewport emotional beat: nothing but the city, the water,
   and the coordinates. No copy. No CTA. Pure presence.
   Beat 2 of the homepage journey.
──────────────────────────────────────────────────────────────────────── */

const GULF   = "#2A5F7A";
const PEARL  = "#C8B99A";

export function GulfSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgY   = useSpring(rawY, { stiffness: 50, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.15], [1.06, 1]);

  /* Coordinate elements enter from opposing edges */
  const coordLeftX  = useTransform(scrollYProgress, [0.1, 0.35], ["-40px", "0px"]);
  const coordRightX = useTransform(scrollYProgress, [0.1, 0.35], ["40px", "0px"]);
  const coordOp     = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
        background: "#0c0b09",
      }}
    >
      {/* ── Parallax image ──────────────────────────────────────── */}
      <motion.div
        style={{ position: "absolute", inset: 0, y: imgY, scale }}
      >
        <img
          src="/assets/tower-sunset.jpg"
          alt="Al Hamra Tower above Kuwait City at dusk, Arabian Gulf on the horizon"
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center 55%",
            display: "block",
          }}
        />
      </motion.div>

      {/* ── Gradient overlays ───────────────────────────────────── */}
      {/* Top dark fade */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(12,11,9,0.65) 0%, rgba(12,11,9,0.1) 30%, rgba(12,11,9,0.1) 70%, rgba(12,11,9,0.85) 100%)",
      }} />
      {/* Gulf blue atmospheric tint — sky area */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(to bottom, rgba(42,95,122,0.25) 0%, transparent 45%)`,
      }} />

      {/* ── Section fade in/out ─────────────────────────────────── */}
      <motion.div
        style={{
          opacity,
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(48px,7vh,88px) clamp(28px,6vw,96px)",
          zIndex: 5,
        }}
      >
        {/* Top — Gulf label */}
        <motion.div
          style={{ x: coordLeftX, opacity: coordOp }}
          className="gulf-top-label"
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            fontFamily: "Jost,sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>
            <span style={{
              width: 36, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`,
              flexShrink: 0,
            }} />
            Arabian Gulf · Sharq District · Kuwait City
          </div>
        </motion.div>

        {/* Centre — nothing. Let the image breathe. */}
        <div />

        {/* Bottom — coordinates + pearl divider */}
        <div>
          {/* Pearl divider line */}
          <motion.div
            style={{ opacity: coordOp }}
            className="pearl-divider"
          />

          <motion.div
            style={{
              x: coordRightX, opacity: coordOp,
              marginTop: 24,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {/* Coordinates */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "clamp(32px,5vw,72px)",
                fontWeight: 300, color: "#fff",
                letterSpacing: "-0.02em", lineHeight: 0.95,
              }}>
                29°22'N
              </div>
              <div style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "clamp(32px,5vw,72px)",
                fontWeight: 300, color: "#fff",
                letterSpacing: "-0.02em", lineHeight: 0.95,
              }}>
                47°58'E
              </div>
              <div style={{
                fontFamily: "Jost,sans-serif",
                fontSize: "clamp(10px,0.9vw,12px)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: PEARL,
                marginTop: 8,
              }}>
                The exact location of ambition
              </div>
            </div>

            {/* Gulf fact */}
            <div
              style={{
                textAlign: "right", maxWidth: 280,
                borderLeft: `1px solid rgba(197,168,130,0.25)`,
                paddingLeft: 24,
              }}
              className="gulf-fact-right"
            >
              <div style={{
                fontFamily: "Jost,sans-serif",
                fontSize: "clamp(10px,0.8vw,11px)",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", marginBottom: 12,
              }}>
                Gulf to tower
              </div>
              <div style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "clamp(14px,1.8vw,22px)",
                fontWeight: 300, color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6, fontStyle: "italic",
              }}>
                "Visible from every shore of the city. The landmark that orients you."
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .gulf-fact-right { display: none; }
          .gulf-top-label  { display: none; }
        }
      `}</style>
    </section>
  );
}
