import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

/* ── The Invitation Section ───────────────────────────────────────────
   Replaces the flat dark leasing band.
   "By appointment" signals exclusivity — the building is choosing
   its tenants, not the other way around.
   Mashrabiya texture on dark background. Pearl accents throughout.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const GULF  = "#2A5F7A";
const DARK  = "#1D1D1B";

const TENANTS = [
  { label: "Government & Sovereign",  desc: "Kuwait's leading ministries, sovereign wealth funds and GCC institutions"  },
  { label: "Luxury Retail",           desc: "Hermès · Gucci · Bottega Veneta · YSL · Ferragamo · Mont Blanc · Panerai"},
  { label: "Financial & Professional", desc: "Regional and international financial institutions and professional services firms"},
];

export function InvitationSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
        <img src="/assets/tower-aerial-night.jpg" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, filter: "grayscale(30%)" }} />
      </div>

      {/* Gulf blue glow — top right corner atmosphere */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40%", height: "60%", pointerEvents: "none",
        background: `radial-gradient(ellipse at top right, rgba(42,95,122,0.12) 0%, transparent 70%)`,
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto",
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
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 32,
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase",
              color: PEARL,
            }}
          >
            <span style={{
              width: 32, height: 1, flexShrink: 0,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`,
            }} />
            Leasing Opportunities
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16,1,0.3,1] }}
          >
            <div style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontWeight: 200,
              fontSize: "clamp(13px,1.2vw,15px)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 12,
            }}>
              The address that
            </div>
            <div style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
fontWeight: 300,
              fontSize: "clamp(36px,5.5vw,76px)",
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}>
              needs no<br />introduction.
            </div>
          </motion.div>

          {/* Pearl divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.16,1,0.3,1] }}
            style={{
              height: 1, width: 120, marginBottom: 28,
              background: `linear-gradient(to right, ${PEARL}, transparent)`,
              transformOrigin: "left",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "clamp(13px,1.1vw,15px)",
              fontWeight: 300, lineHeight: 1.9,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 360, marginBottom: 48,
            }}
          >
            Home to Kuwait's leading ministries, Hermès, Gucci, Bottega Veneta
            and the world's most recognised luxury houses.
            Now welcoming a select group of new tenants.
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
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "10.5px", fontWeight: 400,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: PEARL, textDecoration: "none",
                transition: "all 0.4s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = PEARL;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(200,185,154,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(200,185,154,0.35)";
                e.currentTarget.style.color = PEARL;
                e.currentTarget.style.background = "transparent";
              }}
            >
              Enquire by appointment
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <div style={{
              marginTop: 16,
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}>
              Responses within 24 hours
            </div>
          </motion.div>
        </div>

        {/* Right — Tenant categories */}
        <div style={{ paddingTop: 8 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              marginBottom: 32,
            }}
          >
            Distinguished tenants
          </motion.div>

          {TENANTS.map(({ label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: [0.16,1,0.3,1] }}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "clamp(20px,3vh,28px) 0",
                display: "flex", flexDirection: "column", gap: 6,
              }}
            >
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(13px,1.1vw,15px)",
                fontWeight: 400, letterSpacing: "0.04em",
                color: "#fff",
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(11px,0.9vw,12px)",
                fontWeight: 300, color: "rgba(255,255,255,0.38)",
                lineHeight: 1.7,
              }}>
                {desc}
              </div>
            </motion.div>
          ))}

          {/* Last border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* Gulf blue accent stat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            style={{ marginTop: 40, display: "flex", gap: 32, flexWrap: "wrap" }}
          >
            {[
              { n: "80",   u: "+",    l: "Floors occupied"      },
              { n: "2011", u: "",     l: "Year completed"        },
              { n: "52",   u: "",     l: "High-speed elevators"  },
            ].map(({ n, u, l }) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                  fontSize: "clamp(24px,3vw,38px)",
                  fontWeight: 300, color: "#fff", lineHeight: 1,
                }}>
                  {n}
                  {u && <span style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "0.45em", color: PEARL,
                    marginLeft: 2, fontWeight: 200,
                  }}>{u}</span>}
                </div>
                <div style={{
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                  fontSize: "10px", letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
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
