/**
 * TowerWireframe — Concept 1 procedural 3D twist diagram
 * ────────────────────────────────────────────────────────────────────────
 * Renders Al Hamra's signature sculpted-plate geometry as a projected SVG
 * wireframe. 80 floor plates, each a 240° arc representing the carved
 * south-facing facade, rotated incrementally by ~0.36° per floor for a
 * cumulative ~29° spiral from base to crown — matching the SOM design.
 *
 * Why SVG (not Three.js):
 *   • zero new dependencies — Three.js + R3F + Drei add ~600KB
 *   • crisp at any DPI, scales naturally with viewport
 *   • animates trivially with Framer Motion (already in the stack)
 *   • reduced-motion friendly without WebGL fallback complexity
 *   • the geometry is a few hundred lines projected in 2D — pure overkill
 *     to invoke a WebGL pipeline for it
 *
 * Two animation surfaces:
 *   • progress (0–1)        → on-load build, floors materialize from base up
 *   • cameraRotation (deg)  → scroll-driven orbit around the vertical axis
 */

import { useMemo } from "react";

interface TowerWireframeProps {
  /** 0–1 build animation. 1 = fully constructed. */
  progress?: number;
  /** Camera Y-axis rotation in degrees — drives the orbit on scroll. */
  cameraRotation?: number;
  /** Stroke colour. Defaults to brand pearl. */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Architectural constants ───────────────────────────────────────────
const FLOORS            = 80;
const TWIST_TOTAL_DEG   = 29;     // cumulative twist from base to crown
const FLOOR_HEIGHT      = 13;     // visual unit, not metres
const RADIUS            = 195;    // plate radius (visual)
const CAMERA_TILT_DEG   = 4;      // slight downward look
const ARC_SEGMENTS      = 18;     // arc smoothness per floor
const ARC_OPEN_DEG      = 240;    // arc spans 240° (120° opening = carved south side)

// SVG canvas
const VIEWBOX_W = 1920;
const VIEWBOX_H = 1080;
const CX        = 1140;           // wireframe horizontal anchor
const CY        = 540;            // wireframe vertical anchor

// ─── 3D math (orthographic projection with Y-rot + X-tilt) ────────────
type V3 = readonly [number, number, number];

function rotY(p: V3, rad: number): V3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rotX(p: V3, rad: number): V3 {
  const c = Math.cos(rad), s = Math.sin(rad);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}

/** Generate the 240° arc vertices for a single floor at index i. */
function floorArc(i: number): V3[] {
  const fy    = i * FLOOR_HEIGHT - (FLOORS * FLOOR_HEIGHT) / 2;
  const twist = ((i * TWIST_TOTAL_DEG) / FLOORS) * (Math.PI / 180);
  const start = (-30 * Math.PI) / 180 + twist;
  const span  = (ARC_OPEN_DEG * Math.PI) / 180;
  const out: V3[] = [];
  for (let s = 0; s <= ARC_SEGMENTS; s++) {
    const a = start + span * (s / ARC_SEGMENTS);
    out.push([RADIUS * Math.cos(a), fy, RADIUS * Math.sin(a)]);
  }
  return out;
}

/** Project 3D point → 2D screen coordinates given a camera Y rotation. */
function project(p: V3, camRotDeg: number): [number, number] {
  let v: V3 = rotY(p, (camRotDeg * Math.PI) / 180);
  v = rotX(v, (CAMERA_TILT_DEG * Math.PI) / 180);
  return [CX + v[0], CY - v[1]];
}

// ─── Component ─────────────────────────────────────────────────────────
export function TowerWireframe({
  progress = 1,
  cameraRotation = 14,
  color = "#C8B99A",
  className,
  style,
}: TowerWireframeProps) {
  /**
   * Floor geometry (in 3D model space) is independent of camera, so it's
   * memoised once. Projection re-runs only when camera rotation changes.
   */
  const geometry = useMemo<V3[][]>(() => {
    const all: V3[][] = [];
    for (let i = 0; i < FLOORS; i++) all.push(floorArc(i));
    return all;
  }, []);

  const projected = useMemo<[number, number][][]>(
    () => geometry.map((floor) => floor.map((p) => project(p, cameraRotation))),
    [geometry, cameraRotation]
  );

  // Build animation: integer floor count ramps from 2 → FLOORS.
  const visibleCount = Math.max(2, Math.floor(FLOORS * Math.max(0, Math.min(1, progress))));
  const floors = projected.slice(0, visibleCount);
  const arcN = ARC_SEGMENTS + 1;

  // Five vertical "ribbon" traces — leading edge, quarter, mid, three-quarter,
  // trailing edge. The two outer ones (the cut edges of the sculpted plate)
  // are the most prominent.
  const ribbonIdx = [0, Math.floor(arcN / 4), Math.floor(arcN / 2), Math.floor((arcN * 3) / 4), arcN - 1];
  const ribbonIsEdge = (k: number) => k === 0 || k === arcN - 1;

  /** Stringify a floor's points as an SVG path (M ... L ...). */
  const floorPath = (pts: [number, number][]) =>
    "M " + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L ");

  /** Stringify a single ribbon's vertical trace through all visible floors. */
  const ribbonPath = (k: number) =>
    "M " + floors.map((f) => `${f[k][0].toFixed(1)},${f[k][1].toFixed(1)}`).join(" L ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ pointerEvents: "none", ...style }}
      aria-hidden="true"
    >
      {/* Vertical ribbons — the spiral of the twist made legible */}
      {ribbonIdx.map((k, i) => {
        const edge = ribbonIsEdge(k);
        return (
          <path
            key={`r-${i}`}
            d={ribbonPath(k)}
            stroke={color}
            strokeWidth={edge ? 1.5 : 1.0}
            strokeLinecap="round"
            fill="none"
            opacity={edge ? 0.95 : 0.55}
          />
        );
      })}

      {/* Horizontal floor sections every 4 floors — implies the stacking */}
      {floors.map((floor, i) => {
        if (i % 4 !== 0) return null;
        return (
          <path
            key={`h-${i}`}
            d={floorPath(floor)}
            stroke={color}
            strokeWidth={0.8}
            fill="none"
            opacity={0.4}
          />
        );
      })}

      {/* Top + bottom emphasised — book-ends the spire */}
      {[0, floors.length - 1].map((idx, i) => (
        <path
          key={`emph-${i}`}
          d={floorPath(floors[idx])}
          stroke={color}
          strokeWidth={1.6}
          fill="none"
          opacity={1.0}
        />
      ))}
    </svg>
  );
}
