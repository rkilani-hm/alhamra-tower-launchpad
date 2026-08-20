import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

/* ── The Invitation Section ───────────────────────────────────────────
   "By appointment" signals exclusivity — the building is choosing
   its tenants, not the other way around. Bilingual EN/AR with luxury
   MSA marketing register.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";
const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";


export function LeasingDownloads() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.invitation");
  const c = usePageContent<any>("invitation", cStatic, lang);
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isAr = lang === "ar";

  return (
    <section
      ref={ref}
      className="pattern-band"
      style={{
        background: DARK,
        padding: "clamp(80px,12vh,140px) clamp(28px,6vw,96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background — tower-aerial-night.jpg at 8% opacity */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
      }}>
        <img
              loading="lazy" src="/assets/tower-aerial-night.jpg" alt="" aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, filter: "grayscale(30%)" }} />
      </div>

      {/* Gulf blue glow — top right corner atmosphere */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40%", height: "60%", pointerEvents: "none",
        background: `radial-gradient(ellipse at top right, rgba(197,168,130,0.12) 0%, transparent 70%)`,
      }} />

      <div style={{
        maxWidth: 1360, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(48px,8vw,120px)",
        alignItems: "start",
      }}
        className="invitation-grid"
      >
        {/* Left — The Headline */}
        <div>
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 32,
              fontFamily: FONT,
              fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase",
              color: "#CD1719",
            }}
          >
            <span style={{
              width: 32, height: 1, flexShrink: 0,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`,
            }} />
            <Editable id="page_prose:invitation:kicker">{c.kicker}</Editable>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <div style={{
              fontFamily: FONT,
              fontWeight: 200,
              fontSize: "clamp(13px,1.2vw,15px)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 12,
            }}>
              <Editable id="page_prose:invitation:eyebrow">{c.eyebrow}</Editable>
            </div>
            <div style={{
              fontFamily: FONT,
              fontWeight: 300,
              fontSize: "clamp(36px,5.5vw,76px)",
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: 16,
              whiteSpace: "pre-line",
            }}>
              <Editable id="page_prose:invitation:headlineA">{c.headlineA}</Editable>
            </div>
          </motion.div>

          {/* Pearl divider — flips direction in AR */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.16,1,0.3,1] }}
            style={{
              height: 1, width: 120, marginBottom: 28,
              background: isAr
                ? `linear-gradient(to left, ${PEARL}, transparent)`
                : `linear-gradient(to right, ${PEARL}, transparent)`,
              transformOrigin: isAr ? "right" : "left",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(13px,1.1vw,15px)",
              fontWeight: 300, lineHeight: 1.9,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 360, marginBottom: 48,
            }}
          >
            <Editable id="page_prose:invitation:body">{c.body}</Editable>
          </motion.p>

          {/* By appointment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          >
            <Link
              to="/leasing/inquiry#inquiry-form"
              style={{
                display: "inline-flex", alignItems: "center", gap: 16,
                border: `1px solid rgba(200,185,154,0.35)`,
                padding: "18px 36px",
                fontFamily: FONT,
                fontSize: "10.5px", fontWeight: 400,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#CD1719", textDecoration: "none",
                transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = PEARL;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(200,185,154,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(200,185,154,0.35)";
                e.currentTarget.style.color = "#CD1719";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Editable id="page_prose:invitation:cta">{c.cta}</Editable>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"
                   style={{ transform: isAr ? "scaleX(-1)" : "none" }}>
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <div style={{
              marginTop: 16,
              fontFamily: FONT,
              fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}>
              <Editable id="page_prose:invitation:responseTime">{c.responseTime}</Editable>
            </div>
          </motion.div>
        </div>

        {/* Right — Downloads (brochure + floor plans). A tenant's last step
            before shortlisting is grabbing the material; keep it one click away
            here rather than buried in the footer. */}
        <div style={{ paddingTop: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 12,
            }}
          >
            {isAr ? "التنزيلات" : "Downloads"}
          </motion.div>

          {[
            { title: isAr ? "الكتيّب" : "Leasing Brochure", meta: isAr ? "PDF · نظرة عامة على البرج والمساحات" : "PDF · Tower & availability overview" },
            { title: isAr ? "المخططات" : "Floor Plans", meta: isAr ? "PDF · مخططات الطوابق النموذجية" : "PDF · Typical floor plates" },
          ].map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: isAr ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: [0.16,1,0.3,1] }}
            >
              <Link
                to="/leasing/downloads"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  padding: "clamp(22px,3vh,30px) 0",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 20, textDecoration: "none",
                  transition: "padding-inline-start 0.25s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget.querySelector(".dl-title") as HTMLElement).style.color = "#CD1719"; }}
                onMouseLeave={(e) => { (e.currentTarget.querySelector(".dl-title") as HTMLElement).style.color = "#fff"; }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="dl-title" style={{
                    fontFamily: FONT, fontSize: "clamp(15px,1.4vw,20px)",
                    fontWeight: 300, letterSpacing: "0.02em", color: "#fff",
                    transition: "color 0.25s ease",
                  }}>
                    {d.title}
                  </div>
                  <div style={{
                    fontFamily: FONT, fontSize: "11px", fontWeight: 300,
                    letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)",
                  }}>
                    {d.meta}
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
                     style={{ flexShrink: 0 }}>
                  <path d="M10 3v11m0 0l-4-4m4 4l4-4M4 17h12" stroke={PEARL} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .invitation-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
