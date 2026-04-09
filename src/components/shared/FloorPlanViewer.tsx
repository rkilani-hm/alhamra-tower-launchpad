import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLANS = [
  {
    id: "ground",
    label: "Ground Floor",
    level: "G",
    src: "/assets/plan-ground.jpg",
    desc: "Main retail level featuring Gucci, Hermès, Bottega Veneta, Ferragamo, and luxury international brands.",
    tags: ["Retail", "Luxury", "Dining"],
  },
  {
    id: "mezzanine",
    label: "Mezzanine",
    level: "M",
    src: "/assets/plan-mezzanine.jpg",
    desc: "Mezzanine level with Mont Blanc, Ted Baker, Harry's of London, Costa, NBK banking, and fashion boutiques.",
    tags: ["Retail", "F&B", "Banking"],
  },
  {
    id: "basement1",
    label: "First Basement",
    level: "B1",
    src: "/assets/plan-basement-1.jpg",
    desc: "First basement level with Starbucks, Adidas Originals, WHSmith, Al Hajery Pharmacy, Café Meem, and Coffea.",
    tags: ["F&B", "Retail", "Services"],
  },
  {
    id: "basement2",
    label: "Second Basement",
    level: "B2",
    src: "/assets/plan-basement-2.jpg",
    desc: "Second basement level — extensive parking, loading bays, and service infrastructure for the complex.",
    tags: ["Parking", "Services", "Logistics"],
  },
];

export function FloorPlanViewer() {
  const [active, setActive] = useState("ground");
  const plan = PLANS.find(p => p.id === active)!;

  return (
    <div style={{ borderTop: "1px solid rgba(29,29,27,0.09)" }}>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(29,29,27,0.09)",
        background: "#FAFAFA",
        overflowX: "auto",
      }}>
        {PLANS.map(({ id, label, level }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              aria-controls={`floorplan-panel-${id}`}
              id={`floorplan-tab-${id}`}
              onClick={() => setActive(id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "18px 32px",
                fontFamily: "Jost,sans-serif", fontSize: "10.5px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: isActive ? "#1D1D1B" : "#767676",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: isActive ? "2px solid #1D1D1B" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
            >
              {/* Level badge */}
              <span style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "18px", fontWeight: 300,
                color: isActive ? "#1D1D1B" : "#EDEDED",
                lineHeight: 1,
                transition: "color 0.2s",
              }}>{level}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Plan viewer */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="floorplan-viewer" style={{ borderBottom: "1px solid rgba(29,29,27,0.09)" }}>

            {/* Left — info panel */}
            <div style={{
              padding: "clamp(24px,4vw,48px) clamp(20px,3vw,40px)",
              borderRight: "1px solid rgba(29,29,27,0.09)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              background: "#fff",
            }}>
              <div>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "64px", fontWeight: 300, color: "#EDEDED", lineHeight: 1, marginBottom: 4 }}>
                  {plan.level}
                </div>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "10.5px", fontWeight: 500, color: "#1D1D1B", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
                  {plan.label}
                </div>
                <p style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.85 }}>
                  {plan.desc}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32 }}>
                {plan.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "Jost,sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#6B6B6B", border: "1px solid rgba(29,29,27,0.12)",
                    padding: "5px 12px",
                  }}>{tag}</span>
                ))}
              </div>

              {/* Legend */}
              <div style={{ marginTop: 36 }}>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#767676", marginBottom: 12 }}>Legend</div>
                {[
                  { color: "#F5C842", label: "Occupied — Retail" },
                  { color: "#5BB8E8", label: "F&B — Food & Beverage" },
                  { color: "#fff",    label: "Vacant / Available", border: "1px solid rgba(29,29,27,0.2)" },
                ].map(({ color, label, border }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 16, height: 12, background: color, border: border ?? "none", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Jost,sans-serif", fontSize: "11px", color: "#6B6B6B" }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 32 }}>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#767676" }}>
                  Al Hamra Business Tower · Kuwait City
                </div>
              </div>
            </div>

            {/* Right — floor plan image */}
            <div
              role="tabpanel"
              id={`floorplan-panel-${active}`}
              aria-labelledby={`floorplan-tab-${active}`}
              style={{
                background: "#F7F6F4",
                padding: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 560,
              }}>
              <img
                src={plan.src}
                alt={`Al Hamra Tower — ${plan.label}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "min(600px, 70vw)",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
