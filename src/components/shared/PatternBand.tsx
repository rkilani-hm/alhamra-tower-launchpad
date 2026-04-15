import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ── Al Hamra Pattern Band ─────────────────────────────────────────────
   Uses the official Al Hamra ornamental frieze (Picture1Pattern01.png).
   1568×168px horizontal Islamic/Arabic botanical motif band.

   Design intent:
   - Acts as an architectural cornice — the carved stone ornamental
     band found on classical Islamic buildings.
   - Placed rhythmically between major sections, at the footer crown,
     and as a subtle texture in key dark sections.
   - Reveals center-out with a scaleX spring animation on scroll entry.
   - Three visual modes: divider | full | subtle
   - Two background contexts: dark | light
   ─────────────────────────────────────────────────────────────────── */

const PATTERN_SRC = "/assets/patterns/al-hamra-pattern-01.png";

/* ────────────────────────────────────────────────────────────────────
   Shared shimmer keyframe injected once into <head>
   A horizontal light sweep that crosses the pattern on first reveal —
   mimics light catching carved stone as the eye arrives.
──────────────────────────────────────────────────────────────────── */
let _shimmerInjected = false;
function injectShimmer() {
  if (_shimmerInjected || typeof document === "undefined") return;
  _shimmerInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ah-pattern-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes ah-pattern-glow {
      0%, 100% { opacity: 0; }
      50%       { opacity: 1; }
    }
    .ah-pattern-shimmer-overlay {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(201,169,110,0.18) 50%,
        transparent 70%
      );
      background-size: 200% 100%;
      animation: ah-pattern-shimmer 1.8s ease-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .ah-pattern-shimmer-overlay { display: none; }
    }
  `;
  document.head.appendChild(style);
}

/* ────────────────────────────────────────────────────────────────────
   TYPE DEFINITIONS
──────────────────────────────────────────────────────────────────── */
interface PatternBandProps {
  /** Visual weight of the band */
  mode?: "divider" | "full" | "subtle";
  /** Background context — controls tinting and opacity */
  variant?: "dark" | "light" | "gold";
  /** Override the natural 168px band height */
  height?: number | string;
  /** Vertical padding wrapping the band (divider mode only) */
  padding?: string;
  /** Custom opacity override */
  opacity?: number;
  /** aria-hidden (decorative by default) */
  decorative?: boolean;
}

/* ────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────────────── */
export function PatternBand({
  mode = "divider",
  variant = "dark",
  height = "auto",
  padding = "clamp(40px, 6vw, 80px) 0",
  opacity,
  decorative = true,
}: PatternBandProps) {
  injectShimmer();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /* Variant → filter & opacity rules
     dark:  pattern as-is (black band, lighter ornaments within)
     light: invert so ornaments show as dark on light bg; multiply blend
     gold:  warm sepia tint to match --color-sand palette */
  const variantStyle: Record<string, React.CSSProperties> = {
    dark:  { filter: "none",                                              opacity: opacity ?? 1     },
    light: { filter: "invert(1) sepia(0.2) brightness(0.85)",             opacity: opacity ?? 0.22  },
    gold:  { filter: "sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.9)", opacity: opacity ?? 0.55 },
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    height: height === "auto" ? undefined : height,
    objectFit: "cover",
    objectPosition: "center",
    userSelect: "none",
    ...variantStyle[variant],
  };

  /* ── DIVIDER MODE: band flanked by gold accent lines ─────────────── */
  if (mode === "divider") {
    return (
      <div
        ref={ref}
        aria-hidden={decorative}
        style={{ padding, overflow: "hidden" }}
      >
        {/* Left accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, #C8B99A 60%, transparent)",
            transformOrigin: "left",
            marginBottom: 12,
          }}
        />

        {/* Pattern image — reveals scaleX from center */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            initial={{ scaleX: 0.05, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{
              scaleX: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
              opacity: { duration: 0.6, ease: "easeOut", delay: 0.08 },
            }}
            style={{ transformOrigin: "center", width: "100%" }}
          >
            <img
              src={PATTERN_SRC}
              alt={decorative ? "" : "Al Hamra ornamental pattern"}
              draggable={false}
              style={imgStyle}
              loading="lazy"
            />
          </motion.div>

          {/* Shimmer overlay — fires once on reveal */}
          {isInView && (
            <div className="ah-pattern-shimmer-overlay" aria-hidden="true" />
          )}
        </div>

        {/* Right accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          style={{
            height: 1,
            background: "linear-gradient(to left, transparent, #C8B99A 60%, transparent)",
            transformOrigin: "right",
            marginTop: 12,
          }}
        />
      </div>
    );
  }

  /* ── SUBTLE MODE: low-opacity background texture ─────────────────── */
  if (mode === "subtle") {
    return (
      <motion.div
        ref={ref}
        aria-hidden={decorative}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
        }}
      >
        <img
          src={PATTERN_SRC}
          alt={decorative ? "" : "Al Hamra ornamental pattern"}
          draggable={false}
          style={{
            ...imgStyle,
            opacity: opacity ?? 0.18,
          }}
          loading="lazy"
        />
      </motion.div>
    );
  }

  /* ── FULL MODE: edge-to-edge, no lines, bold statement ──────────── */
  return (
    <div
      ref={ref}
      aria-hidden={decorative}
      style={{ position: "relative", overflow: "hidden", lineHeight: 0 }}
    >
      <motion.img
        src={PATTERN_SRC}
        alt={decorative ? "" : "Al Hamra ornamental pattern"}
        draggable={false}
        style={{ display: "block", width: "100%", ...variantStyle[variant] }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        loading="lazy"
      />
      {isInView && (
        <div className="ah-pattern-shimmer-overlay" aria-hidden="true" />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   BACKWARD-COMPATIBLE EXPORTS
   All existing <MashrabiyaDivider> and <RosetteAccent> usages in the
   codebase now render the new PatternBand instead.
   Props are mapped gracefully so no call-sites need to change.
──────────────────────────────────────────────────────────────────── */
interface LegacyDividerProps {
  count?: number;
  light?: boolean;
}

export function MashrabiyaDivider({ light = false }: LegacyDividerProps) {
  return (
    <PatternBand
      mode="divider"
      variant={light ? "gold" : "dark"}
      opacity={light ? 0.35 : undefined}
      padding="clamp(24px,4vw,56px) 0"
    />
  );
}

export function RosetteAccent() {
  return (
    <PatternBand
      mode="subtle"
      variant="gold"
      opacity={0.25}
      padding="0"
    />
  );
}

/* ────────────────────────────────────────────────────────────────────
   PARALLAX VARIANT — for use inside hero/full-bleed sections
   The band drifts at 0.3× scroll speed for depth illusion.
──────────────────────────────────────────────────────────────────── */
export function PatternBandParallax({
  variant = "dark",
}: {
  variant?: "dark" | "light" | "gold";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const variantFilter: Record<string, string> = {
    dark:  "none",
    light: "invert(1) sepia(0.2) brightness(0.85)",
    gold:  "sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.9)",
  };
  const variantOpacity: Record<string, number> = {
    dark: 1, light: 0.22, gold: 0.55,
  };

  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden", lineHeight: 0, opacity }}
      aria-hidden="true"
    >
      <motion.img
        src={PATTERN_SRC}
        alt=""
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          filter: variantFilter[variant],
          opacity: variantOpacity[variant],
          y,
        }}
        loading="lazy"
      />
    </motion.div>
  );
}
