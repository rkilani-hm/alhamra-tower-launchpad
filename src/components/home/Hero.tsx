import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";

const SAND = "#C5A882";
const DARK = "#1D1D1B";
const RED  = "#CD1719";
const PEARL = "#C8B99A";
const GULF  = "#2A5F7A";

export function Hero() {
  const t = useT();
  const ref      = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady]   = useState(false);
  const [playing, setPlaying] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mediaY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* W4: Video pause/play toggle */
  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(p => !p);
  };

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 600, overflow: "hidden", background: "#0c0b09",
    }}>
      {/* Full-bleed media */}
      <motion.div style={{ position: "absolute", inset: 0, y: mediaY }}>
        <img
              loading="lazy"
          src="/assets/tower-sunset.jpg"
          alt={t("hero.alt")}
          style={{ position: "absolute", inset: 0, width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center 15%", display: "block" }}
        />
        <motion.video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.92 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center 15%", display: "block" }}
          aria-hidden="true"
        >
          <source src="/assets/tower-drone.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(12,11,9,0.45) 0%, transparent 35%, rgba(12,11,9,0.25) 65%, rgba(12,11,9,0.82) 100%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(12,11,9,0.72) 0%, rgba(12,11,9,0.35) 40%, transparent 65%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(to top right, rgba(197,168,130,0.12) 0%, transparent 60%)`,
        pointerEvents: "none" }} />

      {/* Scan line */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "120vw", opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.2, delay: 1.6, ease: "easeInOut" }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 1,
          background: `linear-gradient(to bottom, transparent, ${SAND}88, transparent)`,
          pointerEvents: "none", zIndex: 5 }}
      />

      {/* Red rule */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(to bottom, ${PEARL}, #D4CFC9 50%, ${PEARL})`, transformOrigin: "top", zIndex: 10 }}
      />

      {/* W4: Video pause button — WCAG 2.1.2 */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        onClick={toggleVideo}
        aria-label={playing ? t("hero.pauseVideoAria") : t("hero.playVideoAria")}
        title={playing ? t("hero.pauseVideo") : t("hero.playVideo")}
        className="hero-pause-btn"
        style={{
          position: "absolute", bottom: 88, right: 20, zIndex: 20,
          background: "rgba(12,11,9,0.5)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", width: 36, height: 36, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)", transition: "all 0.2s",
          padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(29,29,27,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(12,11,9,0.5)")}
      >
        {playing ? (
          /* Pause icon */
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <rect x="0" y="0" width="4" height="14" rx="1"/>
            <rect x="8" y="0" width="4" height="14" rx="1"/>
          </svg>
        ) : (
          /* Play icon */
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <path d="M1 1l10 6-10 6V1z"/>
          </svg>
        )}
      </motion.button>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="hero-side-label"
        aria-hidden="true"
        style={{
          position: "absolute", right: 28, top: "50%", transformOrigin: "center",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
          whiteSpace: "nowrap", zIndex: 8, pointerEvents: "none",
        }}
      >
        {t("hero.sideLabel")}
      </motion.div>

      {/* Main content — TOP-aligned */}
      <motion.div
        style={{ y: textY, opacity: fade,
          position: "absolute", inset: 0, zIndex: 6,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-start",
          padding: "clamp(100px,10vh,130px) clamp(28px,6vw,96px) 0",
        }}
      >
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32,
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}
          aria-hidden="true"
        >
          <span style={{ width: 36, height: 1, background: SAND, flexShrink: 0 }} />
          {t("hero.tag")}
        </motion.div>

        {/* Heading */}
        <h1 style={{ margin: 0, padding: 0 }}>
          <motion.span
            initial={{ opacity: 0, x: -32 }} animate={{ opacity: ready ? 1 : 0, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            style={{ display: "block", fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,13px)",
              letterSpacing: "0.5em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)", marginBottom: 4 }}
          >
            {t("hero.eyebrow")}
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: ready ? 1 : 0, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            style={{ display: "block", lineHeight: 0.9, marginBottom: 4 }}
          >
            <span style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
              fontSize: "clamp(72px,11vw,172px)", color: "#fff", letterSpacing: "-0.03em",
            }}>
              {t("hero.title")}
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: ready ? 1 : 0, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            style={{ display: "block", fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 200,
              fontSize: "clamp(24px,4.5vw,72px)", color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 36 }}
          >
            {t("hero.subtitle")}
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: ready ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(13px,1.1vw,15px)",
            fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.65,
            maxWidth: 420, marginBottom: 48 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.6 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 28px" }}
        >
          <Link to="/tower"
            style={{ display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: DARK,
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 32px", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = SAND; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = DARK; }}
          >
            {t("hero.ctaPrimary")}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link to="/leasing/inquiry#inquiry-form"
            style={{ display: "inline-flex", alignItems: "center", gap: 14,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none", transition: "color 0.3s, border-color 0.3s",
              border: "1px solid rgba(255,255,255,0.35)", padding: "14px 24px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
          >
            {t("hero.ctaSecondary")}
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.9 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 7,
          display: "flex", alignItems: "stretch",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(12,11,9,0.55)",
          backdropFilter: "blur(12px)",
        }}
        className="hero-stat-strip"
        role="list"
        aria-label={t("hero.statsLabel")}
      >
        {[
          { n: "413", u: "m",  k: "hero.stats.height"    },
          { n: "80",  u: "",   k: "hero.stats.floors"    },
          { n: "#1",  u: "",   k: "hero.stats.rank"      },
          { n: "52",  u: "",   k: "hero.stats.elevators" },
        ].map(({ n, u, k }, i) => (
          <div key={k} role="listitem" style={{
            flex: 1, padding: "clamp(16px,2vh,22px) clamp(16px,2.5vw,36px)",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.5vw,30px)",
              fontWeight: 300, color: "#fff", lineHeight: 1 }}>
              {n}
              {u && <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,1.2vw,14px)",
                fontWeight: 200, color: SAND, marginLeft: 3 }}>{u}</span>}
            </div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.75vw,11px)",
              letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              {t(k)}
            </div>
          </div>
        ))}
        <div style={{
          padding: "clamp(16px,2vh,22px) clamp(16px,2.5vw,36px)",
          display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
        }} className="hero-scroll-hint" aria-hidden="true">
          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
            style={{ width: 36, height: 1, background: SAND, transformOrigin: "left" }}
          />
          <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
            letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            whiteSpace: "nowrap" }}>
            {t("hero.scroll")}
          </span>
        </div>
      </motion.div>

      {/* Photo credit */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
        aria-hidden="true"
        style={{ position: "absolute", bottom: 80, right: 20, zIndex: 8,
          fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
        className="hero-credit"
      >
        {t("hero.credit")}
      </motion.div>

      <style>{`
        .hero-side-label  { display: block; }
        .hero-scroll-hint { display: flex; }
        .hero-credit      { display: block; }
        .hero-pause-btn   { display: flex; }
        @media (max-width: 1024px) {
          .hero-side-label  { display: none; }
        }
        @media (max-width: 768px) {
          .hero-stat-strip  { display: none; }
          .hero-scroll-hint { display: none; }
          .hero-credit      { display: none; }
        }
      `}</style>
    </section>
  );
}
