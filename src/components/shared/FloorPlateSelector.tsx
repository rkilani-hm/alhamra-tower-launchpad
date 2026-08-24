import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Editable } from "@/lib/EditMode";

/* ──────────────────────────────────────────────────────────────────────────
   FloorPlateSelector — interactive typical-office-floor selector.

   A vector top-down floor plate (Al Hamra's square slab with a central core,
   divided into four perimeter suites) paired with a suite list. Hovering /
   focusing a suite — in the list OR on the plate — lights its zone in pearl
   gold while the rest stays pale stone. "Full Floor" lights the whole ring.
   Pure SVG (no image assets), on-brand, CMS-editable suite labels/areas.
──────────────────────────────────────────────────────────────────────────── */

const GOLD = "#CD1719";
const DARK = "#1D1D1B";
const STONE = "#EFEAE2";
const CORE = "#D9D3C8";

// Slab corners (outer) and core corners (inner) — the ring between them is the
// leasable office space, split into four trapezoids by the corner diagonals.
const O = { tl: [40, 40], tr: [480, 40], br: [480, 480], bl: [40, 480] };
const I = { tl: [200, 200], tr: [320, 200], br: [320, 320], bl: [200, 320] };
const pts = (...p: number[][]) => p.map(([x, y]) => `${x},${y}`).join(" ");

const ZONES: Record<string, { poly: number[][]; cx: number; cy: number }> = {
  A: { poly: [O.tl, O.tr, I.tr, I.tl], cx: 260, cy: 122 }, // top
  B: { poly: [O.tr, O.br, I.br, I.tr], cx: 398, cy: 262 }, // right
  C: { poly: [O.br, O.bl, I.bl, I.br], cx: 260, cy: 402 }, // bottom
  D: { poly: [O.bl, O.tl, I.tl, I.bl], cx: 122, cy: 262 }, // left
};
const ZONE_KEYS = ["A", "B", "C", "D"] as const;

const SUITES = {
  en: [
    { id: "A", label: "Suite A", area: "420 m²" },
    { id: "B", label: "Suite B", area: "510 m²" },
    { id: "C", label: "Suite C", area: "385 m²" },
    { id: "D", label: "Suite D", area: "435 m²" },
    { id: "FULL", label: "Full Floor", area: "1,750 m²" },
  ],
  ar: [
    { id: "A", label: "الجناح A", area: "420 م²" },
    { id: "B", label: "الجناح B", area: "510 م²" },
    { id: "C", label: "الجناح C", area: "385 م²" },
    { id: "D", label: "الجناح D", area: "435 م²" },
    { id: "FULL", label: "طابق كامل", area: "1,750 م²" },
  ],
};

export function FloorPlateSelector() {
  const { lang } = useI18n();
  const suites = (SUITES as any)[lang] ?? SUITES.en;
  const [active, setActive] = useState<string>("A");
  const hot = (z: string) => active === z || active === "FULL";

  return (
    <div className="fps">
      <div className="fps-plan">
        <svg viewBox="0 0 520 520" role="img" aria-label="Typical office floor plate with selectable suites">
          <rect x="40" y="40" width="440" height="440" fill="none" stroke="rgba(29,29,27,0.12)" />
          {ZONE_KEYS.map((z) => (
            <polygon
              key={z}
              points={pts(...ZONES[z].poly)}
              onMouseEnter={() => setActive(z)}
              style={{
                cursor: "pointer",
                fill: hot(z) ? "rgba(184,184,182,0.55)" : STONE,
                stroke: "#fff",
                strokeWidth: 2,
                transition: "fill 0.3s ease",
              }}
            />
          ))}
          {ZONE_KEYS.map((z) => (
            <text
              key={z}
              x={ZONES[z].cx}
              y={ZONES[z].cy + 6}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-brand)", fontSize: 22, fontWeight: 300,
                letterSpacing: "2px", pointerEvents: "none",
                fill: hot(z) ? GOLD : "#b7b1a6", transition: "fill 0.3s ease",
              }}
            >{z}</text>
          ))}
          <rect x="200" y="200" width="120" height="120" fill={CORE} stroke="#fff" strokeWidth="2" />
          <text x="260" y="264" textAnchor="middle" style={{ fontFamily: "var(--font-brand)", fontSize: 10, letterSpacing: "3px", fill: "#8a857b" }}>CORE</text>
        </svg>
      </div>

      <div className="fps-list">
        {suites.map((s: { id: string; label: string; area: string }, i: number) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className="fps-item"
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              aria-pressed={on}
            >
              <span className="fps-rule" style={{ background: on ? GOLD : "rgba(29,29,27,0.15)", height: on ? 46 : 26 }} />
              <span>
                <span className="fps-label" style={{ color: on ? DARK : "#6B6B6B" }}>
                  <Editable id={`page_prose:officeSpaces:suites.${i}.label`}>{s.label}</Editable>
                </span>
                <span className="fps-area" style={{ color: on ? GOLD : "#9a938a" }}>
                  <Editable id={`page_prose:officeSpaces:suites.${i}.area`}>{s.area}</Editable>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .fps{ display:grid; grid-template-columns:1.25fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .fps-plan svg{ width:100%; height:auto; display:block; max-width:560px; margin:0 auto; }
        .fps-list{ display:flex; flex-direction:column; }
        .fps-item{ display:flex; align-items:center; gap:22px; background:none; border:none; cursor:pointer;
          text-align:start; padding:18px 0; border-bottom:1px solid rgba(29,29,27,0.06); }
        .fps-item:last-child{ border-bottom:none; }
        .fps-rule{ width:2px; flex-shrink:0; transition:height 0.3s ease, background 0.3s ease; }
        .fps-label{ display:block; font-family:var(--font-brand); font-size:15px; letter-spacing:0.22em;
          text-transform:uppercase; transition:color 0.3s ease; }
        .fps-area{ display:block; font-family:var(--font-brand); font-size:13px; letter-spacing:0.1em;
          margin-top:5px; transition:color 0.3s ease; }
        @media (max-width:768px){ .fps{ grid-template-columns:1fr; gap:36px; } }
      `}</style>
    </div>
  );
}
