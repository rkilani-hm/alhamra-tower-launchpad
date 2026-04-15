import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/* ── The View Section ─────────────────────────────────────────────────
   Full-bleed city view from high floor. No headline. No CTA.
   Just the view that makes a minister feel aspiration,
   a luxury director feel the price, a Kuwaiti feel pride.
   Beat 4 of the homepage journey.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const GULF  = "#2A5F7A";

export function ViewSection() {
  const ref    = useRef<HTMLElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const inView = useInView(capRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY  = useSpring(rawY, { stiffness: 50, damping: 20 });
  const fade  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1.08, 1]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative", width: "100%",
        height: "100vh", minHeight: 560,
        overflow: "hidden", background: "#0a0908",
      }}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <motion.div style={{ position: "absolute", inset: 0, y: imgY, scale }}>
        <img
          src="/assets/sky-lobby-logo-wall.jpg"
          alt="Al Hamra Tower Sky Lobby — logo sculpture, Gulf views, amber pendant lamps"
          style={{
            width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center 40%",
            display: "block",
          }}
        />
      </motion.div>

      {/* ── Gradients ─────────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(10,9,8,0.3) 0%, transparent 30%, rgba(10,9,8,0.1) 60%, rgba(10,9,8,0.9) 100%)",
      }} />
      {/* Subtle gulf blue tint at top */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(42,95,122,0.15) 0%, transparent 40%)",
      }} />

      {/* ── Content ─────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: fade,
          position: "absolute", inset: 0, zIndex: 5,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(28px,6vw,96px) clamp(40px,6vh,72px)",
        }}
      >
        <div ref={capRef}>
          {/* Pearl divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1, marginBottom: 28,
              background: `linear-gradient(to right, transparent, ${PEARL} 20%, #D4CFC9 50%, ${PEARL} 80%, transparent)`,
              transformOrigin: "left",
            }}
          />

          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 24,
          }}>
            {/* Floor caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16,1,0.3,1] }}
            >
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.45em", textTransform: "uppercase",
                color: PEARL, marginBottom: 12,
              }}>
                The view from Floor 55
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
, fontWeight: 300,
                fontSize: "clamp(22px,3.5vw,48px)",
                color: "#fff", lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>
                Kuwait City.<br />
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  The Arabian Gulf.
                </span><br />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7em" }}>
                  And beyond.
                </span>
              </div>
            </motion.div>

            {/* Coordinate + elevation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16,1,0.3,1] }}
              className="view-elevation"
              style={{ textAlign: "right" }}
            >
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(36px,6vw,84px)",
                fontWeight: 300, color: "#fff",
                lineHeight: 1, letterSpacing: "-0.03em",
              }}>
                237<span style={{
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                  fontSize: "0.35em", fontWeight: 200,
                  color: PEARL, marginLeft: 4, letterSpacing: "0.1em",
                }}>m</span>
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(10px,0.8vw,11px)",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", marginTop: 6,
              }}>
                Above Kuwait City
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .view-elevation { display: none; }
        }
      `}</style>
    </section>
  );
}
