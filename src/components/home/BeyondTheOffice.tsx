import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/* ── Beyond the Office ─────────────────────────────────────────────────
   Full-width editorial band pairing a luxury shopping-centre image with
   a short pitch and one OUTBOUND link to the Al Hamra centre website.
   Image on one side, text on the other; stacks under 900px.
──────────────────────────────────────────────────────────────────────── */

const FONT =
  "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const PEARL = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK = "#1D1D1B";
const MUTED = "#6B6B6B";

const CONTENT = {
  en: {
    eyebrow: "Beyond the Office",
    heading: "A destination, not just an address.",
    body: "Al Hamra's luxury shopping centre, dining and hospitality sit directly beneath the tower, connected under one roof. Your working day never has to leave the building.",
    cta: "Explore Al Hamra",
  },
  ar: {
    eyebrow: "ما وراء المكتب",
    heading: "وجهة، لا مجرد عنوان.",
    body: "يقع مركز الحمرا للتسوق الفاخر والمطاعم والضيافة أسفل البرج مباشرة، متصلاً تحت سقف واحد. لا يحتاج يوم عملك أن يغادر المبنى.",
    cta: "اكتشف الحمرا",
  },
} as const;

export function BeyondTheOffice() {
  const { lang } = useI18n();
  const c = CONTENT[lang];
  const isAr = lang === "ar";
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        padding: 0,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        className="bto-grid"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          alignItems: "stretch",
        }}
      >
        {/* ── Image side ─────────────────────────────────────────── */}
        <motion.div
          className="bto-image"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            src="/assets/mall-atrium-luxury-centre.jpg"
            alt="The luxury shopping centre beneath Al Hamra Business Tower"
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          {/* Aspect-ratio spacer keeps a graceful 4/3 when stacked */}
          <div style={{ width: "100%", aspectRatio: "4 / 3" }} />
        </motion.div>

        {/* ── Text side ──────────────────────────────────────────── */}
        <motion.div
          className="bto-text"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(40px,6vw,80px)",
            textAlign: isAr ? "right" : "left",
          }}
        >
          {/* Eyebrow: hairline bar + uppercase gold label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: isAr ? "row-reverse" : "row",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 32,
                height: 1,
                background: PEARL,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontSize: "10.5px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: PEARL_TEXT,
              }}
            >
              {c.eyebrow}
            </span>
          </div>

          <h2
            style={{
              fontFamily: FONT,
              fontWeight: 200,
              fontSize: "clamp(24px,3vw,44px)",
              lineHeight: 1.16,
              letterSpacing: "-0.018em",
              color: DARK,
              margin: 0,
              marginBottom: 20,
              textWrap: "balance",
            }}
          >
            {c.heading}
          </h2>

          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(14px,1.1vw,16px)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: MUTED,
              maxWidth: 460,
              margin: 0,
              marginBottom: 32,
              marginInlineStart: isAr ? "auto" : 0,
              textWrap: "pretty",
            }}
          >
            {c.body}
          </p>

          {/* Outbound CTA — bordered pill */}
          <a
            href="https://www.alhamra.com.kw"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              alignSelf: isAr ? "flex-end" : "flex-start",
              display: "inline-flex",
              alignItems: "center",
              flexDirection: isAr ? "row-reverse" : "row",
              gap: 12,
              padding: "16px 34px",
              border: `1px solid ${hover ? PEARL_TEXT : PEARL}`,
              background: hover ? "rgba(200,185,154,0.16)" : "transparent",
              color: hover ? DARK : PEARL_TEXT,
              fontFamily: FONT,
              fontSize: "10.5px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.35s ease, color 0.35s ease, border-color 0.35s ease",
            }}
          >
            <span>{c.cta}</span>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              aria-hidden="true"
              style={{
                transform: isAr ? "scaleX(-1)" : "none",
                flexShrink: 0,
              }}
            >
              <path
                d="M0 5h14M10 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bto-grid {
            grid-template-columns: 1fr;
          }
          .bto-image {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
