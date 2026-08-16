import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { Editable, useSlotVideoSrc } from "@/lib/EditMode";
import { HeroMediaShowcase } from "@/components/home/HeroMediaShowcase";

const SAND = "#C5A882";
const DARK = "#1D1D1B";
const PEARL = "#C8B99A";

/* Honour data-saver / reduced-motion: skip the autoplay hero video (a heavy
   .mp4 download + continuous motion) and show the high-quality poster still
   instead. Pure performance + a11y win; the default experience is unchanged. */
function useLightHero() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const dataQ   = window.matchMedia("(prefers-reduced-data: reduce)");
    const motionQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as any)?.connection?.saveData === true;
    const update = () => setLight(saveData || dataQ.matches || motionQ.matches);
    update();
    dataQ.addEventListener?.("change", update);
    motionQ.addEventListener?.("change", update);
    return () => {
      dataQ.removeEventListener?.("change", update);
      motionQ.removeEventListener?.("change", update);
    };
  }, []);
  return light;
}

export function Hero() {
  const t = useT();
  // Legacy single hero video (set via the old CMS slot) — used as the fallback
  // when the multi-media gallery is empty, so nothing is lost.
  const heroVideoSrc = useSlotVideoSrc("home.heroVideo", "/assets/tower-drone.mp4");
  const lightHero = useLightHero();
  const ref      = useRef<HTMLElement>(null);
  const [ready, setReady]   = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mediaY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} style={{
      position: "relative", width: "100%", height: "100vh",
      minHeight: 600, overflow: "hidden", background: "#0c0b09",
    }}>
      {/* Full-bleed media — a rotating showcase of admin-managed videos &
          images (falls back to the original single hero video when empty). */}
      <HeroMediaShowcase
        fallbackVideo={heroVideoSrc}
        fallbackPoster="/assets/tower-sunset.jpg"
        lightHero={lightHero}
        mediaY={mediaY}
        pauseLabel={t("hero.pauseVideoAria")}
        playLabel={t("hero.playVideoAria")}
      />

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
          justifyContent: "flex-end",
          padding: "0 clamp(28px,6vw,96px) clamp(120px,17vh,168px)",
        }}
      >
        {/* Headline text intentionally removed — the hero is now a clean
            media showcase. CTAs are kept, anchored above the stats strip. */}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 28px" }}
        >
          <Link to="/tower"
            style={{ display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: DARK,
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 32px", textDecoration: "none",
              transition: "background 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = SAND;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = DARK;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Editable id="section_fields:hero:ctaPrimary">{t("hero.ctaPrimary")}</Editable>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link to="/leasing/inquiry#inquiry-form"
            style={{ display: "inline-flex", alignItems: "center", gap: 14,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              border: "1px solid rgba(255,255,255,0.35)", padding: "14px 24px",
              background: "rgba(255,255,255,0)" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.background = "rgba(255,255,255,0)";
            }}
          >
            <Editable id="section_fields:hero:ctaSecondary">{t("hero.ctaSecondary")}</Editable>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom stats strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.7 }}
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
          { vk: "hero.stats.heightValue",    u: "m", k: "hero.stats.height"    },
          { vk: "hero.stats.floorsValue",    u: "",  k: "hero.stats.floors"    },
          { vk: "hero.stats.rankValue",      u: "",  k: "hero.stats.rank"      },
          { vk: "hero.stats.elevatorsValue", u: "",  k: "hero.stats.elevators" },
        ].map(({ vk, u, k }, i) => (
          <motion.div
            key={k}
            role="listitem"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.9 + i * 0.08 }}
            style={{
              flex: 1, padding: "clamp(16px,2vh,22px) clamp(16px,2.5vw,36px)",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              display: "flex", flexDirection: "column", gap: 5,
            }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.5vw,30px)",
              fontWeight: 300, color: "#fff", lineHeight: 1 }}>
              <Editable id={`section_fields:hero:${vk.slice(5)}`}>{t(vk)}</Editable>
              {u && <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,1.2vw,14px)",
                fontWeight: 200, color: SAND, marginLeft: 3 }}>{u}</span>}
            </div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.75vw,11px)",
              letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              <Editable id={`section_fields:hero:${k.slice(5)}`}>{t(k)}</Editable>
            </div>
          </motion.div>
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
