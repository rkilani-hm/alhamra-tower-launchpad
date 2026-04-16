import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useInView }                          from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, scaleIn, stagger, staggerSlow, staggerFast } from "@/lib/motion";
import type { Variants } from "framer-motion";

/* ── ScrollReveal ───────────────────────────────────────────────────────
   Wraps any content in a viewport-triggered Framer Motion reveal.
   Variants are imported from the centralized motion system so every
   animated entrance across the site shares identical timing and easing.
──────────────────────────────────────────────────────────────────────── */

type RevealVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn";
type StaggerVariant = "stagger" | "staggerSlow" | "staggerFast";

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp, fadeLeft, fadeRight, scaleIn,
};

const staggerMap: Record<StaggerVariant, Variants> = {
  stagger, staggerSlow, staggerFast,
};

interface ScrollRevealProps {
  children:  ReactNode;
  variant?:  RevealVariant;
  delay?:    number;
  className?: string;
  style?:    CSSProperties;
  /** margin before triggering — negative = triggers earlier */
  margin?:   string;
  /** Play once or every time element enters viewport */
  once?:     boolean;
}

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay   = 0,
  className,
  style,
  margin  = "-80px",
  once    = true,
}: ScrollRevealProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as Parameters<typeof useInView>[1]["margin"] });

  const baseVariant = variantMap[variant];
  // Merge delay into the visible transition
  const v: Variants = {
    ...baseVariant,
    visible: {
      ...(typeof baseVariant.visible === "object" ? baseVariant.visible : {}),
      transition: {
        ...(typeof baseVariant.visible === "object" && "transition" in baseVariant.visible
          ? (baseVariant.visible as { transition?: object }).transition
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={v}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── StaggerReveal ──────────────────────────────────────────────────────
   Container that orchestrates staggered child reveals.
   Children should each have variants matching the chosen variant name.
   Usage:
     <StaggerReveal>
       {items.map(i => <ScrollReveal key={i}>{i}</ScrollReveal>)}
     </StaggerReveal>
──────────────────────────────────────────────────────────────────────── */
interface StaggerRevealProps {
  children:  ReactNode;
  stagger?:  StaggerVariant;
  delay?:    number;
  className?: string;
  style?:    CSSProperties;
  margin?:   string;
  once?:     boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function StaggerReveal({
  children,
  stagger: staggerKey = "stagger",
  delay   = 0,
  className,
  style,
  margin  = "-60px",
  once    = true,
  as      = "div",
}: StaggerRevealProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as Parameters<typeof useInView>[1]["margin"] });

  const containerVariant = {
    ...staggerMap[staggerKey],
    visible: {
      ...(staggerMap[staggerKey].visible as object),
      transition: {
        ...(typeof staggerMap[staggerKey].visible === "object" &&
          "transition" in staggerMap[staggerKey].visible!
            ? (staggerMap[staggerKey].visible as { transition?: object }).transition
            : {}),
        delayChildren: delay,
      },
    },
  };

  const MotionTag = motion[as as "div"] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={containerVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

/* ── GoldLineDraw ───────────────────────────────────────────────────────
   A horizontal gold accent line that grows from the left on viewport entry.
   Used beneath section headings and as section punctuation.
──────────────────────────────────────────────────────────────────────── */
interface GoldLineDrawProps {
  width?:   number | string;
  delay?:   number;
  color?:   string;
  height?:  number;
  origin?:  "left" | "right" | "center";
  margin?:  string;
}

export function GoldLineDraw({
  width   = 48,
  delay   = 0.15,
  color   = "#C8B99A",
  height  = 1,
  origin  = "left",
  margin  = "-40px",
}: GoldLineDrawProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as Parameters<typeof useInView>[1]["margin"] });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        width,
        height,
        background: color,
        transformOrigin: origin,
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}

/* ── SectionLabel ───────────────────────────────────────────────────────
   Animated eyebrow label: line grows in, then text fades left.
──────────────────────────────────────────────────────────────────────── */
interface SectionLabelProps {
  children: ReactNode;
  delay?:   number;
  color?:   string;
  style?:   CSSProperties;
}

const CG = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

export function SectionLabel({ children, delay = 0, color = "#6B6B6B", style }: SectionLabelProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, ...style }}>
      {/* Gold rule */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        style={{
          display: "block", width: 28, height: 1,
          background: "#C8B99A", transformOrigin: "left", flexShrink: 0,
        }}
        aria-hidden="true"
      />
      {/* Label text */}
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay + 0.1 }}
        style={{
          fontFamily: CG,
          fontSize: "10px",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color,
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}
