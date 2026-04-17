import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";

/* ── ExperienceCards ──────────────────────────────────────────────────
   Burj Khalifa's homepage uses a 4-column grid of dark image cards
   (Fine Dining · Luxury Stays · Observation Decks · Wellness), each
   with a label + short description + "Explore More →" link.
   
   Here we adapt to our 4 genuine discovery paths:
   The Tower · The Architecture · The Business · The Address
   
   Each card: full-bleed image, subtle dark overlay, label on hover.
──────────────────────────────────────────────────────────────────────── */

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";
const CG    = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const CARDS = [
  {
    keyPrefix: "experience.cards.tower",
    image:  "/assets/tower-exterior-blue-sky.jpg",
    href:   "/tower",
  },
  {
    keyPrefix: "experience.cards.architecture",
    image:  "/assets/facade-dual-glass-stone.jpg",
    href:   "/tower/design",
  },
  {
    keyPrefix: "experience.cards.business",
    image:  "/assets/sky-lobby-travertine-corridor.jpg",
    href:   "/business",
  },
  {
    keyPrefix: "experience.cards.leasing",
    image:  "/assets/boardroom-wide.jpg",
    href:   "/leasing/inquiry#inquiry-form",
  },
];

function Card({ card, index, t }: { card: typeof CARDS[number]; index: number; t: (k: string) => string }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative" }}
    >
      <Link
        to={card.href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={`${t(card.keyPrefix + ".kicker")}: ${t(card.keyPrefix + ".cta")}`}
        style={{
          display: "block",
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#0c0b09",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* Image */}
        <motion.img
          loading="lazy"
          src={card.image}
          alt=""
          animate={{ scale: hover ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
            filter: hover ? "brightness(0.7)" : "brightness(0.55)",
            transition: "filter 0.5s ease",
          }}
        />

        {/* Gradient overlay — always present, darker from bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(12,11,9,0.85) 0%, rgba(12,11,9,0.3) 55%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Pearl accent line — top-left, grows on hover */}
        <motion.div
          animate={{ scaleX: hover ? 1 : 0.4, opacity: hover ? 1 : 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: 28, left: 28,
            width: 48, height: 1,
            background: PEARL,
            transformOrigin: "left",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "clamp(22px,3vw,32px)",
          color: "#fff",
        }}>
          <div style={{
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.38em", textTransform: "uppercase",
            color: PEARL, marginBottom: 14,
          }}>
            {t(card.keyPrefix + ".kicker")}
          </div>

          <div style={{
            fontFamily: CG, fontSize: "clamp(16px,1.5vw,22px)",
            fontWeight: 300, lineHeight: 1.25,
            color: "#fff", marginBottom: 12,
            letterSpacing: "-0.005em",
          }}>
            {t(card.keyPrefix + ".title")}
          </div>

          {/* Description — reveals on hover */}
          <motion.div
            animate={{ opacity: hover ? 1 : 0, height: hover ? "auto" : 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: CG, fontSize: "12px",
                fontWeight: 300, color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6, margin: "0 0 16px",
                maxWidth: 320,
              }}
              dangerouslySetInnerHTML={{ __html: t(card.keyPrefix + ".desc") }}
            />
          </motion.div>

          {/* CTA — arrow always visible */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#fff",
            paddingTop: 4,
            borderTop: `1px solid rgba(200,185,154,${hover ? 0.6 : 0.2})`,
            transition: "border-color 0.3s ease",
          }}>
            <span>{t(card.keyPrefix + ".cta")}</span>
            <motion.svg
              width="18" height="8" viewBox="0 0 18 8" fill="none"
              animate={{ x: hover ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              <path d="M1 4H17M13 1L17 4L13 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ExperienceCards() {
  const t = useT();
  return (
    <section style={{
      background: DARK,
      padding: "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
      position: "relative",
    }}>
      {/* Section intro */}
      <div style={{
        maxWidth: 1280, margin: "0 auto clamp(48px,6vh,72px)",
        padding: "0 clamp(4px,1vw,16px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ width: 32, height: 1, background: PEARL, flexShrink: 0 }} />
          <span style={{
            fontFamily: CG, fontSize: "11px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL,
          }}>
            {t("experience.kicker")}
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 24,
          alignItems: "end",
        }} className="exp-header">
          <h2 style={{
            fontFamily: CG, fontWeight: 200,
            fontSize: "clamp(28px,4vw,52px)",
            color: "#fff", margin: 0,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            maxWidth: 720,
          }}>
            {t("experience.title")}
          </h2>

          <p style={{
            fontFamily: CG, fontSize: "13px", fontWeight: 300,
            color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
            margin: 0, maxWidth: 320,
          }}>
            {t("experience.subtitle")}
          </p>
        </div>
      </div>

      {/* The 4-card grid */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "clamp(12px,1.5vw,20px)",
      }} className="exp-grid">
        {CARDS.map((card, i) => (
          <Card key={card.keyPrefix} card={card} index={i} t={t} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .exp-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .exp-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
