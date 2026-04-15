/* ── Al Hamra Motion System ────────────────────────────────────────────
   Single source of truth for all animation variants, easings, and timing.
   Every animated component in the site imports from here — never hardcodes.

   Design philosophy:
   - Architectural restraint: animations reveal, they don't perform.
   - Every entrance is a stone being unveiled, not a card flipping in.
   - Spring physics for scale/position, linear for opacity fades.
   - Stagger is the language of luxury: things arrive in deliberate sequence.
──────────────────────────────────────────────────────────────────────── */

import type { Variants, Transition } from "framer-motion";

/* ── Easing curves ──────────────────────────────────────────────────── */
export const ease = {
  /** Expo out — fast entry, graceful settle. Used for large reveals. */
  expo:     [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Standard easeOut — clean, neutral. Used for text and subtle fades. */
  out:      [0.0, 0.0, 0.2, 1] as [number, number, number, number],
  /** Smooth in-out — balanced. Used for parallax and continuous motion. */
  inOut:    [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Spring — elastic settle. Used for hover scale and interactive elements. */
  spring:   { type: "spring" as const, stiffness: 140, damping: 20, mass: 0.8 },
  /** Heavy spring — dramatic architectural snap. Used for page transitions. */
  heavySpring: { type: "spring" as const, stiffness: 80, damping: 16, mass: 1.2 },
} as const;

/* ── Duration scale ─────────────────────────────────────────────────── */
export const dur = {
  xs:  0.3,
  sm:  0.5,
  md:  0.75,
  lg:  1.0,
  xl:  1.4,
  xxl: 1.8,
} as const;

/* ── Base transitions ───────────────────────────────────────────────── */
export const trans = {
  fadeUp:    { duration: dur.md, ease: ease.expo } satisfies Transition,
  fadeLeft:  { duration: dur.md, ease: ease.expo } satisfies Transition,
  scale:     { duration: dur.sm, ease: ease.expo } satisfies Transition,
  lineDraw:  { duration: dur.lg, ease: ease.expo } satisfies Transition,
  pageIn:    { duration: dur.md, ease: ease.expo } satisfies Transition,
  pageOut:   { duration: dur.sm, ease: ease.out  } satisfies Transition,
  parallax:  { stiffness: 60, damping: 18, type: "spring" as const } satisfies Transition,
} as const;

/* ── Reusable Variants ─────────────────────────────────────────────────
   Each variant has: hidden (initial), visible (animate), exit (optional).
   Used with motion.div variants prop + orchestration via staggerChildren.
──────────────────────────────────────────────────────────────────────── */

/** Standard upward reveal — primary entrance for text blocks and cards */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: trans.fadeUp },
  exit:    { opacity: 0, y: -14, transition: { duration: dur.sm, ease: ease.out } },
};

/** Slide from left — for eyebrow labels and statistics */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: trans.fadeLeft },
};

/** Slide from right — for secondary content panels */
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: trans.fadeLeft },
};

/** Pure opacity — for overlays and subtle ambient elements */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.lg, ease: ease.out } },
  exit:    { opacity: 0, transition: { duration: dur.sm, ease: ease.out } },
};

/** Scale in from slightly smaller — for cards and image reveals */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: dur.lg, ease: ease.expo } },
};

/** Gold line draw — horizontal accent line growing from left */
export const lineDraw: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: trans.lineDraw },
};

/** Gold line draw from right — mirror version */
export const lineDrawRight: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: dur.lg, ease: ease.expo, delay: 0.12 } },
};

/* ── Container variants — for staggered children ─────────────────────── */

/** Staggers children by 0.09s — used for card grids and stat rows */
export const stagger: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Slower stagger 0.14s — for large hero text sequences */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

/** Fast stagger 0.06s — for dense lists and small icon grids */
export const staggerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

/* ── Page transition variants ──────────────────────────────────────────
   Used in App.tsx AnimatePresence wrapper.
   Slide up on enter, fade out on exit — dignified, architectural.
──────────────────────────────────────────────────────────────────────── */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: dur.md, ease: ease.expo } },
  exit:    { opacity: 0, y: -8, transition: { duration: dur.xs, ease: ease.out  } },
};

/* ── Hover motion values ─────────────────────────────────────────────── */
export const hoverCard = {
  whileHover: { y: -4, transition: ease.spring },
  whileTap:   { y: -2, scale: 0.99 },
};

export const hoverLift = {
  whileHover: { y: -6, boxShadow: "0 12px 40px rgba(29,29,27,0.12)", transition: ease.spring },
  whileTap:   { y: -3 },
};

export const hoverGold = {
  whileHover: { color: "#C8B99A", transition: { duration: 0.2 } },
};

/* ── Count-up utility ────────────────────────────────────────────────── */
/**
 * Animates a number from 0 to `end` with an expo ease.
 * Returns the current display value — hook into useMotionValue + useEffect.
 * @param end     Final number
 * @param duration Animation duration in ms
 * @param delay   Delay before start in ms
 */
export function buildCountSequence(
  end: number,
  duration = 1400,
  delay = 0,
): Array<{ time: number; value: number }> {
  const frames: Array<{ time: number; value: number }> = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Expo ease-out: 1 - (1-t)^4
    const eased = 1 - Math.pow(1 - t, 4);
    frames.push({
      time: delay + t * duration,
      value: Math.round(eased * end),
    });
  }
  return frames;
}
