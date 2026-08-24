import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SlotImage, Editable } from "@/lib/EditMode";
import { useT } from "@/lib/i18n";

/* ── The Gulf Section ─────────────────────────────────────────────────
   Full-viewport emotional beat: nothing but the city, the water,
   and the coordinates. No copy. No CTA. Pure presence.
   Beat 2 of the homepage journey.
──────────────────────────────────────────────────────────────────────── */

const PEARL  = "#B9B9B7";

export function GulfSection() {
  const t = useT();
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
        <SlotImage
              loading="lazy"
          slot="home.gulf"
          fallback="/assets/skyline-gulf-night.jpg"
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
          pointerEvents: "none",
        }}
      >
        {/* Top — Gulf label */}
        <motion.div
          style={{ x: coordLeftX, opacity: coordOp, pointerEvents: "auto" }}
          className="gulf-top-label"
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>
            <span style={{
              width: 36, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`,
              flexShrink: 0,
            }} />
            <Editable id="section_fields:gulf:topLabel">{t("gulf.topLabel")}</Editable>
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
              marginTop: 24, pointerEvents: "auto",
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
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(32px,5vw,72px)",
                fontWeight: 300, color: "#fff",
                letterSpacing: "-0.02em", lineHeight: 0.95,
              }}>
                <Editable id="section_fields:gulf:coordLat">{t("gulf.coordLat")}</Editable>
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(32px,5vw,72px)",
                fontWeight: 300, color: "#fff",
                letterSpacing: "-0.02em", lineHeight: 0.95,
              }}>
                <Editable id="section_fields:gulf:coordLng">{t("gulf.coordLng")}</Editable>
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(10px,0.9vw,12px)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#CD1719",
                marginTop: 8,
              }}>
                <Editable id="section_fields:gulf:coordLabel">{t("gulf.coordLabel")}</Editable>
              </div>
            </div>

            {/* Gulf fact */}
            <div
              style={{
                textAlign: "right", maxWidth: 280,
                borderLeft: `1px solid rgba(174,174,172,0.25)`,
                paddingLeft: 24,
              }}
              className="gulf-fact-right"
            >
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(10px,0.8vw,11px)",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", marginBottom: 12,
              }}>
                <Editable id="section_fields:gulf:factLabel">{t("gulf.factLabel")}</Editable>
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(14px,1.8vw,22px)",
                fontWeight: 300, color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6, fontStyle: "italic",
              }}>
                <Editable id="section_fields:gulf:factQuote">{t("gulf.factQuote")}</Editable>
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
