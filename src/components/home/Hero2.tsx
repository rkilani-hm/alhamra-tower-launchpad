import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useT, useI18n } from "@/lib/i18n";
import { useSlotVideoSrc } from "@/lib/EditMode";
import { HeroMediaShowcase } from "@/components/home/HeroMediaShowcase";

const SAND = "#C5A882";
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

const HERO_OVERLAY = {
  en: { line1: "Al Hamra", line2: "Tower", subtitle: "The Highest Business Address in Kuwait" },
  ar: { line1: "الحمرا", line2: "برج", subtitle: "أرفع عنوان أعمال في الكويت" },
} as const;

export function Hero2() {
  const t = useT();
  const { lang } = useI18n();
  const ov = (HERO_OVERLAY as any)[lang] ?? HERO_OVERLAY.en;
  const isAr = lang === "ar";
  // Three hero lines forced to the same width via SVG textLength. EN is
  // uppercased and letter-spacing auto-stretches each line to match; AR keeps
  // natural (connected) glyphs centred, since Arabic must not be letter-spread.
  const heroLines = isAr
    ? [
        { t: ov.line1, size: 150, weight: 300, y: 130, op: 1 },
        { t: ov.line2, size: 104, weight: 700, y: 254, op: 1 },
        { t: ov.subtitle, size: 46, weight: 300, y: 340, op: 0.9 },
      ]
    : [
        { t: ov.line1.toUpperCase(), size: 150, weight: 300, y: 125, op: 1 },
        { t: ov.line2.toUpperCase(), size: 92, weight: 700, y: 250, op: 1 },
        { t: ov.subtitle.toUpperCase(), size: 44, weight: 300, y: 338, op: 0.9 },
      ];
  // Legacy single hero video (set via the old CMS slot) — used as the fallback
  // when the multi-media gallery is empty, so nothing is lost.
  const heroVideoSrc = useSlotVideoSrc("home.heroVideo", "/assets/tower-drone.mp4");
  const lightHero = useLightHero();
  const ref      = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const mediaY = useSpring(rawY, { stiffness: 60, damping: 18 });

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

      {/* Gradient overlays — lightened so the media reads brighter; just enough
          bottom scrim for the CTAs and the stats strip, minimal top/left. */}
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(12,11,9,0.12) 0%, transparent 32%, transparent 62%, rgba(12,11,9,0.7) 100%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(12,11,9,0.38) 0%, rgba(12,11,9,0.1) 35%, transparent 60%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(to top right, rgba(197,168,130,0.1) 0%, transparent 60%)`,
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

      {/* Headline overlay — centred over the media. The nav carries the
          ENQUIRE CTA, so the hero stays a single quiet statement. */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 8,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "0 clamp(28px,6vw,96px)", pointerEvents: "none",
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ margin: 0 }}
          aria-label={`${ov.line1} ${ov.line2}. ${ov.subtitle}`}
        >
          <svg
            viewBox="0 0 1000 370"
            role="img"
            aria-hidden="true"
            style={{
              width: "clamp(340px,60vw,780px)", height: "auto", display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 2px 30px rgba(0,0,0,0.42))",
            }}
          >
            {heroLines.map((l, i) => (
              <text
                key={i}
                x={isAr ? 500 : 30}
                y={l.y}
                textAnchor={isAr ? "middle" : "start"}
                {...(isAr ? {} : { textLength: 940, lengthAdjust: "spacing" as const })}
                style={{
                  fontFamily: "var(--font-brand)",
                  fontSize: l.size,
                  fontWeight: l.weight as any,
                  fill: "#fff",
                  fillOpacity: l.op,
                }}
              >
                {l.t}
              </text>
            ))}
          </svg>
        </motion.h1>
      </div>

      <style>{`
        .hero-pause-btn { display: flex; }
      `}</style>
    </section>
  );
}
