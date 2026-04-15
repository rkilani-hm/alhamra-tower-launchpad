/* ── Al Hamra Pattern System ───────────────────────────────────────────
   Two pattern assets from Al Hamra brand guidelines:

   al-hamra-pattern-band.jpg   2667×246px
   Light grey geometric triangles on white — horizontal section separator.
   Already correctly coloured for light backgrounds — use as-is.

   al-hamra-pattern-bg.jpg     1440×810px
   Same geometric motif as a full background tile — very light grey.
   Use as background-image on sections that need depth and texture.
──────────────────────────────────────────────────────────────────────── */

interface PatternBandProps {
  opacity?: number;
  decorative?: boolean;
  /** Height of the band — default auto (natural 246px at full width) */
  height?: number | string;
}

/** Horizontal band separator — sits between sections on white backgrounds */
export function PatternBand({
  opacity    = 1,
  decorative = true,
  height     = "auto",
}: PatternBandProps) {
  return (
    <div
      aria-hidden={decorative}
      style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}
    >
      <img
        src="/assets/patterns/al-hamra-pattern-band.jpg"
        alt={decorative ? "" : "Al Hamra geometric pattern divider"}
        draggable={false}
        loading="lazy"
        width={2667}
        height={246}
        style={{
          display: "block",
          width: "100%",
          height,
          objectFit: "cover",
          objectPosition: "center",
          userSelect: "none",
          opacity,
        }}
      />
    </div>
  );
}

/** Full background texture — apply to sections needing visual depth */
export function PatternBackground({
  opacity    = 0.55,
  decorative = true,
  children,
  style,
  className,
}: {
  opacity?:    number;
  decorative?: boolean;
  children?:   React.ReactNode;
  style?:      React.CSSProperties;
  className?:  string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...style,
      }}
    >
      {/* Pattern layer */}
      <div
        aria-hidden={decorative}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/assets/patterns/al-hamra-pattern-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Content above pattern */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ── Backward-compatible exports ─────────────────────────────────────── */
export function MashrabiyaDivider({ light: _light = false }: { count?: number; light?: boolean }) {
  return <PatternBand />;
}

export function RosetteAccent() {
  return <PatternBand opacity={0.6} />;
}

export function PatternBandParallax({ variant: _variant = "dark" }: { variant?: string }) {
  return <PatternBand />;
}
