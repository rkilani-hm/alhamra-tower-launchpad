/* ── Al Hamra Pattern Band ─────────────────────────────────────────────
   Two transparent PNG versions of the official ornamental frieze:

   al-hamra-pattern-gold.png  — dark gold ornaments, transparent bg
                                 → use on WHITE / LIGHT sections
   al-hamra-pattern-white.png — white ornaments, transparent bg
                                 → use on DARK sections

   Background is fully transparent in both — no black box, no grey bar.
──────────────────────────────────────────────────────────────────────── */

interface PatternBandProps {
  /** "light" = white/cream background  → gold ornaments
      "dark"  = dark/charcoal bg        → white ornaments */
  variant?:    "light" | "dark";
  opacity?:    number;
  decorative?: boolean;
}

export function PatternBand({
  variant    = "light",
  opacity,
  decorative = true,
}: PatternBandProps) {
  const src = variant === "dark"
    ? "/assets/patterns/al-hamra-pattern-white.png"
    : "/assets/patterns/al-hamra-pattern-gold.png";

  const defaultOpacity = variant === "dark" ? 0.65 : 0.5;

  return (
    <div
      aria-hidden={decorative}
      style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}
    >
      <img
        src={src}
        alt={decorative ? "" : "Al Hamra ornamental pattern"}
        draggable={false}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          userSelect: "none",
          opacity: opacity ?? defaultOpacity,
        }}
      />
    </div>
  );
}

/* ── Backward-compatible exports ─────────────────────────────────────── */
export function MashrabiyaDivider({ light = false }: { count?: number; light?: boolean }) {
  return <PatternBand variant={light ? "light" : "dark"} />;
}

export function RosetteAccent() {
  return <PatternBand variant="light" opacity={0.35} />;
}

export function PatternBandParallax({ variant = "dark" }: { variant?: "light" | "dark" }) {
  return <PatternBand variant={variant} />;
}
