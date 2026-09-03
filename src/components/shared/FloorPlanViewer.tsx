import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Editable, SlotImage } from "@/lib/EditMode";

/* Structural data only — editable text (label/desc/tags) comes from the CMS
   via t("floorplan.<id>.<field>"). This shared component is used by multiple
   pages; all read the same section_fields:floorplan rows. */
const PLANS = [
  { id: "ground",    level: "G",  src: "/assets/plan-ground.jpg" },
  { id: "mezzanine", level: "M",  src: "/assets/plan-mezzanine.jpg" },
  { id: "basement1", level: "B1", src: "/assets/plan-basement-1.jpg" },
  { id: "basement2", level: "B2", src: "/assets/plan-basement-2.jpg" },
];

export function FloorPlanViewer() {
  const t = useT();
  /* Cursor-follow magnify: hovering the plan scales it up with the transform
     origin tracking the pointer, so visitors can focus on part of the plan. */
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  /* t() returns the key itself when a string is missing/unpublished; tf falls
     back to the structural default so the level badge never shows a raw key. */
  const tf = (key: string, fallback: string) => { const v = t(key); return v === key ? fallback : v; };
  const [active, setActive] = useState("ground");
  const plan = PLANS.find(p => p.id === active)!;
  const planLabel = t(`floorplan.${plan.id}.label`);
  const planDesc  = t(`floorplan.${plan.id}.desc`);
  const planTags  = t(`floorplan.${plan.id}.tags`).split("·").map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ borderTop: "1px solid rgba(29,29,27,0.09)" }}>

      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(29,29,27,0.09)",
        background: "#FAFAFA",
        overflowX: "auto",
      }}>
        {PLANS.map(({ id, level }) => {
          const isActive = active === id;
          const tabLabel = t(`floorplan.${id}.label`);
          return (
            <button type="button"
              key={id}
              role="tab"
              aria-selected={active === id}
              aria-controls={`floorplan-panel-${id}`}
              id={`floorplan-tab-${id}`}
              onClick={() => setActive(id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "18px 32px",
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: isActive ? "#1D1D1B" : "#6B6B6B",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: isActive ? "2px solid #1D1D1B" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
            >
              {/* Level badge */}
              <span style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "18px", fontWeight: 300,
                color: isActive ? "#1D1D1B" : "#EDEDED",
                lineHeight: 1,
                transition: "color 0.2s",
              }}>{tf(`floorplan.${id}.level`, level)}</span>
              {isActive
                ? <Editable id={`section_fields:floorplan:${id}.label`}>{tabLabel}</Editable>
                : tabLabel}
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
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "64px", fontWeight: 300, color: "#EDEDED", lineHeight: 1, marginBottom: 4 }}>
                  <Editable id={`section_fields:floorplan:${plan.id}.level`}>{tf(`floorplan.${plan.id}.level`, plan.level)}</Editable>
                </div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", fontWeight: 500, color: "#1D1D1B", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
                  <Editable id={`section_fields:floorplan:${plan.id}.label`}>{planLabel}</Editable>
                </div>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.65 }}>
                  <Editable id={`section_fields:floorplan:${plan.id}.desc`}>{planDesc}</Editable>
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32, alignItems: "center" }}>
                <Editable id={`section_fields:floorplan:${plan.id}.tags`}>
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {planTags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#6B6B6B", border: "1px solid rgba(29,29,27,0.12)",
                      padding: "5px 12px",
                    }}>{tag}</span>
                  ))}
                  </span>
                </Editable>
              </div>

              {/* Legend */}
              <div style={{ marginTop: 36 }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 12 }}>
                  <Editable id="section_fields:floorplan:legendTitle">{t("floorplan.legendTitle")}</Editable>
                </div>
                {[
                  { color: "#F5C842", border: undefined },
                  { color: "#5BB8E8", border: undefined },
                  { color: "#fff",    border: "1px solid rgba(29,29,27,0.2)" },
                ].map(({ color, border }, li) => (
                  <div key={li} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 16, height: 12, background: color, border: border ?? "none", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px", color: "#6B6B6B" }}>
                      <Editable id={`section_fields:floorplan:legend.${li}`}>{t(`floorplan.legend.${li}`)}</Editable>
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", paddingTop: 32 }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B" }}>
                  <Editable id="section_fields:floorplan:footer">{t("floorplan.footer")}</Editable>
                </div>
              </div>
            </div>

            {/* Right — floor plan image (hover to magnify / focus) */}
            <div
              role="tabpanel"
              id={`floorplan-panel-${active}`}
              aria-labelledby={`floorplan-tab-${active}`}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                  on: true,
                });
              }}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
              style={{
                background: "#F7F6F4",
                padding: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 476,
                overflow: "hidden",
                cursor: "zoom-in",
              }}>
              <SlotImage
                slot={`floorplan.${plan.id}`}
                fallback={plan.src}
                alt={`Al Hamra Tower — ${planLabel}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "min(510px, 60vw)",
                  objectFit: "contain",
                  display: "block",
                  transform: zoom.on ? "scale(2.4)" : "scale(1)",
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  transition: "transform 0.12s ease-out",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
