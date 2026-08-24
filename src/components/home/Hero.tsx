import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useSlotVideoSrc } from "@/lib/EditMode";
import { HeroMediaShowcase } from "@/components/home/HeroMediaShowcase";

const SAND = "#AEAEAC";
const PEARL = "#B9B9B7";

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
        background: `linear-gradient(to top right, rgba(174,174,172,0.1) 0%, transparent 60%)`,
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

      {/* Pure media hero — no text, no data, no CTAs. Just the media,
          the gradient/accent overlays, and the pause control. */}

      <style>{`
        .hero-pause-btn { display: flex; }
      `}</style>
    </section>
  );
}
