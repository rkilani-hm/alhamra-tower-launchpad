/* ── Al Hamra Pattern Band ─────────────────────────────────────────────
   Official ornamental frieze — al-hamra-pattern-01.png (1568×168px).
   Static display only — no animations, no transitions.
   Used as a section separator and footer crown.
──────────────────────────────────────────────────────────────────────── */

const PATTERN_SRC = "/assets/patterns/al-hamra-pattern-01.png";

interface PatternBandProps {
  mode?:      "divider" | "full" | "subtle";
  variant?:   "dark" | "light" | "gold";
  height?:    number | string;
  padding?:   string;
  opacity?:   number;
  decorative?: boolean;
}

const variantStyle: Record<string, React.CSSProperties> = {
  dark:  { filter: "none" },
  light: { filter: "invert(1) sepia(0.2) brightness(0.85)", opacity: 0.22 },
  gold:  { filter: "sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.9)", opacity: 0.55 },
};

export function PatternBand({
  mode      = "divider",
  variant   = "dark",
  height    = "auto",
  padding   = "clamp(40px, 6vw, 80px) 0",
  opacity,
  decorative = true,
}: PatternBandProps) {
  const vs = { ...variantStyle[variant] };
  if (opacity !== undefined) vs.opacity = opacity;

  const img = (
    <img
      src={PATTERN_SRC}
      alt={decorative ? "" : "Al Hamra ornamental pattern"}
      draggable={false}
      style={{
        display: "block",
        width: "100%",
        height: height === "auto" ? undefined : height,
        objectFit: "cover",
        objectPosition: "center",
        userSelect: "none",
        ...vs,
      }}
      loading="lazy"
    />
  );

  if (mode === "divider") {
    return (
      <div aria-hidden={decorative} style={{ padding, overflow: "hidden" }}>
        <div style={{ width: "100%", height: 1, background: "linear-gradient(to right, transparent, rgba(200,185,154,0.4), transparent)", marginBottom: 10 }} />
        {img}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(to right, transparent, rgba(200,185,154,0.4), transparent)", marginTop: 10 }} />
      </div>
    );
  }

  if (mode === "subtle") {
    return (
      <div aria-hidden={decorative} style={{ lineHeight: 0, overflow: "hidden" }}>
        {img}
      </div>
    );
  }

  // full
  return (
    <div aria-hidden={decorative} style={{ lineHeight: 0, overflow: "hidden" }}>
      {img}
    </div>
  );
}

/* ── Backward-compatible exports ─────────────────────────────────────── */
export function MashrabiyaDivider({ light = false }: { count?: number; light?: boolean }) {
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
  return <PatternBand mode="subtle" variant="gold" opacity={0.25} />;
}

/* PatternBandParallax — no-op static fallback (parallax removed) */
export function PatternBandParallax({ variant = "dark" }: { variant?: "dark" | "light" | "gold" }) {
  return <PatternBand mode="full" variant={variant} />;
}
