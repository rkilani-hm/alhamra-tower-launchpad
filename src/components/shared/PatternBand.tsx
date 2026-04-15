/* ── Al Hamra Pattern Band ─────────────────────────────────────────────
   The pattern PNG is black-background with ornaments in white/grey.

   Problem: on a white page it renders as an ugly black bar.

   Solution: CSS mix-blend-mode
   - "multiply"  → black pixels vanish, ornaments show dark on light bg
   - "screen"    → white pixels vanish, ornaments show light on dark bg

   This is how luxury watermark/ornamental elements are handled —
   the image blends into whatever background it sits on.
──────────────────────────────────────────────────────────────────────── */

const PATTERN_SRC = "/assets/patterns/al-hamra-pattern-01.png";

interface PatternBandProps {
  /** "light" = sits on white/cream bg → multiply blend (ornaments go dark)
      "dark"  = sits on dark bg        → screen blend  (ornaments go light)
      "gold"  = sepia tint + screen    → ornaments show as warm gold on dark */
  variant?:    "light" | "dark" | "gold";
  mode?:       "divider" | "full" | "subtle";
  opacity?:    number;
  decorative?: boolean;
}

export function PatternBand({
  variant    = "light",
  mode       = "divider",
  opacity,
  decorative = true,
}: PatternBandProps) {

  /* Each variant maps to the correct blend mode + colour treatment */
  const styleMap: Record<string, React.CSSProperties> = {
    /** Light background — multiply makes black disappear, ornaments show dark */
    light: {
      mixBlendMode: "multiply",
      opacity: opacity ?? 0.55,
      filter: "none",
    },
    /** Dark background — screen makes black disappear, ornaments show light */
    dark: {
      mixBlendMode: "screen",
      opacity: opacity ?? 0.6,
      filter: "none",
    },
    /** Gold tint on dark — screen blend + warm sepia shift */
    gold: {
      mixBlendMode: "screen",
      opacity: opacity ?? 0.45,
      filter: "sepia(0.6) saturate(1.8) hue-rotate(5deg) brightness(1.1)",
    },
  };

  return (
    <div
      aria-hidden={decorative}
      style={{
        width: "100%",
        lineHeight: 0,
        overflow: "hidden",
        /* Isolate blend scope so it only blends with its immediate parent */
        isolation: "isolate",
      }}
    >
      <img
        src={PATTERN_SRC}
        alt={decorative ? "" : "Al Hamra ornamental pattern"}
        draggable={false}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          userSelect: "none",
          ...styleMap[variant],
        }}
      />
    </div>
  );
}

/* ── Backward-compatible exports ─────────────────────────────────────── */
export function MashrabiyaDivider({ light = false }: { count?: number; light?: boolean }) {
  return <PatternBand variant={light ? "gold" : "dark"} opacity={light ? 0.35 : 0.55} />;
}

export function RosetteAccent() {
  return <PatternBand variant="gold" opacity={0.3} />;
}

export function PatternBandParallax({ variant = "dark" }: { variant?: "light" | "dark" | "gold" }) {
  return <PatternBand variant={variant} />;
}
