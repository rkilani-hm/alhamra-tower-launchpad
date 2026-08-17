import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PatternBackground } from "@/components/shared/PatternBand";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

/* ── Architecture Section — Homepage ──────────────────────────────────
   The architectural story of the form: how the geometry responds to
   Kuwait's sun, the desert, the Gulf, and the city. Bilingual EN/AR
   with luxury MSA register (not literal translation).
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const GULF  = "#2A5F7A";
const DARK  = "#1D1D1B";
const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";


export function Architecture() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.architecture");
  const c = usePageContent<any>("architecture", cStatic, lang);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  // RTL-aware: quote bar flips to right edge in Arabic;
  // milestone year column separator also flips to the opposite side.
  const isAr = lang === "ar";

  return (
    <PatternBackground opacity={0.3} style={{ background: "#fff", overflow: "hidden" }}>
      <div ref={ref} style={{ maxWidth: 1360, margin: "0 auto" }}>

      {/* ── Row 1: Full story + render ─────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "clamp(340px,46vh,500px)",
      }} className="arch-grid-1">

        {/* Left — SOM render. The container STRETCHES to fill the full column
            (matches the text height on desktop); the image absolutely fills it
            (cover). minHeight covers the stacked/mobile case. */}
        <motion.div
          style={{ position: "relative", overflow: "hidden", background: "#0c0b09",
            width: "100%", minHeight: "clamp(300px,44vh,460px)" }}
        >
          <SlotImage
            motion
            slot="home.architectureForm"
            fallback="/lovable-uploads/46052915-521a-44ca-bbd4-d770e159f7fa.png"
            alt={c.renderAlt}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        </motion.div>

        {/* Right — The Form Story */}
        <div style={{
          padding: "clamp(48px,8vh,100px) clamp(32px,5vw,80px)",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            {/* Kicker */}
            <div style={{
              display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
              fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL,
            }}>
              <span style={{ width: 32, height: 1,
                background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`, flexShrink: 0 }} />
              <Editable id="page_prose:architecture:kicker">{c.kicker}</Editable>
            </div>

            <h2 style={{
              fontFamily: FONT,
              fontWeight: 300, fontSize: "clamp(28px,3.8vw,52px)",
              color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 24,
              whiteSpace: "pre-line",
            }}>
              <Editable id="page_prose:architecture:headlineA">{c.headlineA}</Editable>
            </h2>

            <p style={{
              fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 20,
            }}>
              <Editable id="page_prose:architecture:body1">{c.body1}</Editable>
            </p>
            <p style={{
              fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 36,
            }}>
              <Editable id="page_prose:architecture:body2Pre">{c.body2Pre}</Editable><em><Editable id="page_prose:architecture:body2Em">{c.body2Em}</Editable></em><Editable id="page_prose:architecture:body2Post">{c.body2Post}</Editable>
            </p>

            {/* Quote from SOM paper — bar flips to right edge in AR */}
            <div style={{
              borderLeft: isAr ? "none" : `2px solid ${PEARL}`,
              borderRight: isAr ? `2px solid ${PEARL}` : "none",
              paddingLeft: isAr ? 0 : 20,
              paddingRight: isAr ? 20 : 0,
              marginBottom: 36,
            }}>
              <p style={{
                fontFamily: FONT, fontStyle: "italic",
                fontSize: "clamp(15px,1.4vw,18px)", color: DARK,
                lineHeight: 1.7, margin: 0,
              }}>
                <Editable id="page_prose:architecture:quote">{c.quote}</Editable>
              </p>
              <div style={{
                fontFamily: FONT, fontSize: "10px",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: PEARL, marginTop: 12,
              }}>
                <Editable id="page_prose:architecture:credit">{c.credit}</Editable>
              </div>
            </div>

            {/* Construction Timeline */}
            <div>
              <div style={{
                fontFamily: FONT,
                fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
                color: GULF, marginBottom: 14,
              }}>
                <Editable id="page_prose:architecture:milestonesKicker">{c.milestonesKicker}</Editable>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                rowGap: 10, columnGap: 18,
              }}>
                {c.milestones.map(({ y, e }) => (
                  <div key={y} style={{ display: "contents" }}>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "11px", letterSpacing: "0.18em",
                      color: GULF, fontWeight: 500,
                      // In LTR, year sits left of event with right separator.
                      // In RTL, the visual order reverses naturally;
                      // the separator must move to the opposite edge.
                      borderRight: isAr ? "none" : `1px solid rgba(42,95,122,0.18)`,
                      borderLeft: isAr ? `1px solid rgba(42,95,122,0.18)` : "none",
                      paddingRight: isAr ? 0 : 18,
                      paddingLeft: isAr ? 18 : 0,
                    }}>
                      {y}
                    </span>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: "12px", color: DARK,
                      letterSpacing: "0.04em", lineHeight: 1.5,
                    }}>
                      {e}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Row 2: Material specs strip ────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(29,29,27,0.07)",
        borderBottom: "1px solid rgba(29,29,27,0.07)",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        background: "#FAFAFA",
      }} className="arch-specs-grid">
        {c.specs.map(({ n, u, l }, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
            style={{
              padding: "clamp(24px,4vh,40px) clamp(20px,3vw,40px)",
              borderRight: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none",
              display: "flex", flexDirection: "column", gap: 6,
            }}
          >
            <div style={{
              fontFamily: FONT,
              fontSize: "clamp(24px,3vw,40px)", fontWeight: 300,
              color: DARK, lineHeight: 1,
            }}>
              <Editable id={`page_prose:architecture:specs.${i}.n`}>{n}</Editable>
              {u && <span style={{
                fontFamily: FONT,
                fontSize: "clamp(12px,1.2vw,16px)", fontWeight: 200,
                color: PEARL, marginLeft: 4,
              }}>{u}</span>}
            </div>
            <div style={{
              fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.15em", color: "#6B6B6B", lineHeight: 1.5,
            }}>
              <Editable id={`page_prose:architecture:specs.${i}.l`}>{l}</Editable>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Row 3: Facade + night image ────────────────────────────── */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "50vh",
      }} className="arch-grid-2">

        {/* Left — descriptive text */}
        <div style={{
          padding: "clamp(40px,7vh,80px) clamp(32px,5vw,80px)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          background: "#fff",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div style={{
              fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: PEARL, marginBottom: 20,
            }}>
              <Editable id="page_prose:architecture:facadeKicker">{c.facadeKicker}</Editable>
            </div>
            <h3 style={{
              fontFamily: FONT,
              fontWeight: 300,
              fontSize: "clamp(22px,2.8vw,38px)", color: DARK,
              lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.01em",
              whiteSpace: "pre-line",
            }}>
              <Editable id="page_prose:architecture:facadeHeadingA">{c.facadeHeadingA}</Editable>
            </h3>
            <p style={{
              fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,14px)", color: "#6B6B6B",
              lineHeight: 1.9, marginBottom: 16,
            }}>
              <Editable id="page_prose:architecture:facadeBody1">{c.facadeBody1}</Editable>
            </p>
            <p style={{
              fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,14px)", color: "#6B6B6B",
              lineHeight: 1.9,
            }}>
              <Editable id="page_prose:architecture:facadeBody2">{c.facadeBody2}</Editable>
            </p>
          </motion.div>
        </div>

        {/* Right — night tower image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 320 }}>
          <SlotImage
            motion
            slot="home.architectureNight"
            fallback="/assets/tower-aerial-night.jpg"
            alt={c.nightAlt}
            style={{
              y: imgY,
              width: "100%", height: "115%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .arch-grid-1  { grid-template-columns: 1fr !important; }
          .arch-grid-2  { grid-template-columns: 1fr !important; }
          .arch-specs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .arch-specs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>
    </PatternBackground>
  );
}
