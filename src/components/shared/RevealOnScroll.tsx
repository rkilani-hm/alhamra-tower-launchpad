/**
 * RevealOnScroll — thin Framer Motion wrapper that fades + slides a section
 * up by 24px as it enters the viewport. One-shot (only on first reveal).
 *
 * Design intent:
 *   • Subtle, premium, fast — the motion should feel like the section
 *     "settling into place" rather than announcing itself.
 *   • Zero layout impact — this wrapper renders a block-level <div> with
 *     no padding/margin/sizing of its own, and its CSS contain hint keeps
 *     it transparent to the surrounding flow.
 *   • Honours prefers-reduced-motion by rendering children unchanged.
 *
 * Easing: [0.16, 1, 0.3, 1] — the same "expo-out" curve used elsewhere
 * on the site for a consistent premium feel.
 */

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface RevealOnScrollProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "viewport" | "transition"> {
  children: ReactNode;
  /** Delay in seconds before the reveal begins. Defaults to 0. */
  delay?: number;
  /** Slide distance in pixels. Defaults to 24. */
  distance?: number;
  /** Animation duration in seconds. Defaults to 0.8. */
  duration?: number;
  /** IntersectionObserver root margin — controls when the reveal triggers. */
  margin?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  distance = 24,
  duration = 0.8,
  margin = "0px 0px -10% 0px",
  style,
  ...rest
}: RevealOnScrollProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    // No motion wrapper — render children inside a passive div so consumers
    // that pass className/style still get them applied.
    return <div style={style} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ willChange: "opacity, transform", ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
