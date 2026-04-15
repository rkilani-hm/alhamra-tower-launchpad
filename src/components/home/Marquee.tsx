import { useState } from "react";

const ITEMS = [
  "Best Tall Building Middle East — CTBUH 2012",
  "MIPIM Architectural Review 2013",
  "Emirates Glass LEAF Award 2014",
  "International Property Award 2016",
  "World Architecture Festival 2019",
  "Designed by Skidmore, Owings & Merrill",
  "#1 Tallest Sculpted Tower · #23 World",
  "195,000 m² Gross Area · 10,000 m² Site",
];

const DOUBLED = [...ITEMS, ...ITEMS];

export function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    /* W7: Pause marquee on hover or keyboard focus — WCAG 2.2.2 */
    <div
      style={{ background: "#1D1D1B", padding: "15px 0", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Awards and recognitions"
    >
      <div
        className="animate-marquee"
        style={{
          display: "flex",
          width: "max-content",
          animationPlayState: paused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        {DOUBLED.map((item, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 28,
              padding: "0 36px",
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "10.5px",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.25)", borderRadius: "50%", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
