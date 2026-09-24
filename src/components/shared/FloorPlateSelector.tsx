import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Editable, SlotImage } from "@/lib/EditMode";

/* ──────────────────────────────────────────────────────────────────────────
   FloorPlateSelector — interactive typical-office-floor selector.

   Renders the real Al Hamra typical-floor plan (image) with three selectable
   leasable units + Full Floor. Hovering / focusing a unit — in the list OR on
   the plan — lights its region in CI red while the rest stays neutral. "Full
   Floor" lights all three.

   The plan image is CMS-swappable via the `workplace.floorplan` slot; drop the
   file at public/assets/typical-floor-plan.png. The three REGION polygons are
   percentage coordinates over the image (0–100 on each axis) — tune them to
   line up with the plan once the final image is in place.
──────────────────────────────────────────────────────────────────────────── */

const RED  = "#CD1719";
const DARK = "#1D1D1B";

type Unit = { id: string; label: string; area: string };

// Highlight regions as percentage polygons over the isometric floor plan,
// following the plate's three office wings. Tune the points to taste.
const REGIONS: Record<string, number[][]> = {
  U1: [[3, 48], [22, 36], [30, 58], [37, 88], [16, 70]],  // left / front-left offices
  U2: [[22, 36], [38, 4], [72, 20], [52, 32]],            // top / back offices
  U3: [[60, 42], [72, 20], [97, 33], [88, 60]],           // right offices + wing
};

const UNITS: Record<string, Unit[]> = {
  en: [
    { id: "U1", label: "Unit 1", area: "580 m²" },
    { id: "U2", label: "Unit 2", area: "590 m²" },
    { id: "U3", label: "Unit 3", area: "580 m²" },
    { id: "FULL", label: "Full Floor", area: "1,750 m²" },
  ],
  ar: [
    { id: "U1", label: "الوحدة ١", area: "٥٨٠ م²" },
    { id: "U2", label: "الوحدة ٢", area: "٥٩٠ م²" },
    { id: "U3", label: "الوحدة ٣", area: "٥٨٠ م²" },
    { id: "FULL", label: "طابق كامل", area: "١٬٧٥٠ م²" },
  ],
};

export function FloorPlateSelector() {
  const { lang } = useI18n();
  const units = UNITS[lang] ?? UNITS.en;
  const [active, setActive] = useState<string>("U1");
  const [imgOk, setImgOk] = useState(true);
  const isHot = (id: string) => active === id || active === "FULL";

  return (
    <div className="fps">
      <div className="fps-plan">
        <div style={{ position: "relative", width: "100%", background: "#fff" }}>
          {imgOk ? (
            <SlotImage
              slot="workplace.floorplan"
              fallback="/assets/office-typical-floor-plan.webp"
              alt={lang === "ar" ? "مخطط الطابق النموذجي لبرج الحمراء" : "Al Hamra typical floor plan"}
              onError={() => setImgOk(false)}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ) : (
            // Placeholder until the plan image is added at the path above.
            <div aria-hidden="true" style={{ width: "100%", aspectRatio: "1 / 1",
              background: "repeating-linear-gradient(45deg,#f3f1ec,#f3f1ec 10px,#efeae2 10px,#efeae2 20px)" }} />
          )}

          {/* Highlight overlay — percentage coordinates over the image */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {units.filter((u) => REGIONS[u.id]).map((u) => {
              const on = isHot(u.id);
              return (
                <polygon
                  key={u.id}
                  points={REGIONS[u.id].map((p) => p.join(",")).join(" ")}
                  onMouseEnter={() => setActive(u.id)}
                  onClick={() => setActive(u.id)}
                  style={{
                    cursor: "pointer",
                    pointerEvents: "auto",
                    fill: on ? "rgba(205,23,25,0.26)" : "rgba(205,23,25,0)",
                    stroke: on ? RED : "rgba(29,29,27,0.16)",
                    strokeWidth: 0.4,
                    transition: "fill 0.3s ease, stroke 0.3s ease",
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="fps-list">
        {units.map((u, i) => {
          const on = active === u.id;
          return (
            <button
              key={u.id}
              type="button"
              className="fps-item"
              onMouseEnter={() => setActive(u.id)}
              onFocus={() => setActive(u.id)}
              aria-pressed={on}
            >
              <span className="fps-rule" style={{ background: on ? RED : "rgba(29,29,27,0.15)", height: on ? 46 : 26 }} />
              <span>
                <span className="fps-label" style={{ color: on ? DARK : "#6B6B6B" }}>
                  <Editable id={`page_prose:workplace:units.${i}.label`}>{u.label}</Editable>
                </span>
                <span className="fps-area" style={{ color: on ? RED : "#9a938a" }}>
                  <Editable id={`page_prose:workplace:units.${i}.area`}>{u.area}</Editable>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .fps{ display:grid; grid-template-columns:1.25fr 1fr; gap:clamp(32px,5vw,72px); align-items:center; }
        .fps-plan{ max-width:620px; margin:0 auto; width:100%; }
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
