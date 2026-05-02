import { useState } from "react";

/* ── Verified 12-award corpus, newest first.
   Mirrors the source-of-truth dataset on /tower/recognition (TowerAwards.tsx).
   This is now the ONLY place on Home where awards are named — Architecture
   and Perspectives sections previously duplicated subsets of this list and
   have been re-purposed to tell different stories. ─────────────────────── */
const ITEMS = [
  "2021 CTBUH Ten-Year Award of Excellence",
  "2019–20 International Property Awards · London",
  "2019–20 Arabian Property Awards · Double Winner",
  "2016 Honeywell Smart Building Award · Middle East",
  "2015 ACI First Place · High-Rise Concrete",
  "2013 AIA New York · Architecture Merit Award",
  "2012 Best Real Estate Company · Arabian Business",
  "2012 CTBUH Finalist · Middle East & Africa",
  "2011 ACI Award of Excellence · Kuwait",
  "2010 Cityscape Global · Excellence in Architecture",
  "2008 American Architecture Award · Chicago Athenaeum",
  "2008 MIPIM Architectural Review · Cannes · Overall Winner",
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
