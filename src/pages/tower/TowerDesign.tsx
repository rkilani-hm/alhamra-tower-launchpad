import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";

const PEARL  = "#C8B99A";
const GULF   = "#2A5F7A";
const DARK   = "#1D1D1B";
const SAND_AA = "#9A7550";

const SPECS = [
  { cat: "Height",          rows: [
    ["Height to tip",            "412.6 m"],
    ["Occupied height",          "371.4 m"],
    ["Top floor height",         "368 m"],
    ["Sky Lounge elevation",     "351 m"],
  ]},
  { cat: "Structure",       rows: [
    ["Structural type",          "RC shear wall core + perimeter MRF"],
    ["Foundation",               "289 piles × 1,200mm dia."],
    ["Pile depth range",         "22–27 m"],
    ["Raft thickness",           "4.0 m"],
    ["Structural steel",         "6,000 tons"],
    ["Reinforcing steel",        "38,000 tons"],
    ["Concrete poured",          "195,000 m³ / 500,000 tons"],
    ["Core wall thickness",      "300 mm – 1,200 mm"],
  ]},
  { cat: "Facade",          rows: [
    ["South wall limestone",     "258,000 m² (world record)"],
    ["Curtain wall glass",       "55,000 m²"],
    ["Glass type",               "Insulated low-emissivity coating"],
    ["Curved glass units",       "~30% of total glass area"],
    ["Stone type (lower)",       "Jura limestone tiles"],
    ["Stone type (upper)",       "Trencadis (mesh + crushed limestone)"],
  ]},
  { cat: "Floors",          rows: [
    ["Total levels",             "80"],
    ["Office floors",            "62"],
    ["Office floor BUA",         "2,300 m² per floor"],
    ["Tenantable range",         "450 m² – 1,750 m²"],
    ["South-facing offices",     "Zero — none"],
    ["Sky Lobby 1",              "Floor 30 (7m ceiling)"],
    ["Sky Lobby 2",              "Floor 55 (7m ceiling)"],
    ["Executive floors",         "74–75"],
    ["Sky Lounge",               "Floors 78–80"],
  ]},
  { cat: "Services",        rows: [
    ["Elevators (tower)",        "43"],
    ["Escalators",               "16"],
    ["Elevator zones",           "3 — Low / Mid / High rise"],
    ["VIP elevator",             "Direct lobby → crown"],
    ["Power supply",             "100% redundancy"],
    ["Electrical substations",   "5 (Floors B2, 4, 27, 52, 76)"],
    ["IT backbone",              "Fibre optic smart building"],
  ]},
  { cat: "Engineering Team", rows: [
    ["Architect",                "Skidmore, Owings & Merrill LLP"],
    ["Structural engineer",      "SOM San Francisco"],
    ["MEP engineer",             "SOM Chicago"],
    ["Local architect",          "Al Jazera Consultants, Kuwait"],
    ["Wind engineer",            "BMT Fluid Mechanics, London"],
    ["Geotechnical engineer",    "Consultancy Group Company, Beirut"],
    ["Client",                   "Ajial Real Estate & Entertainment Co."],
    ["Contractor",               "Ahmadiah Contracting & Trading Co."],
    ["Design code",              "IBC 2003 + ACI 318-02M"],
    ["Construction",             "2006–2011"],
  ]},
];

function SpecTable({ cat, rows }: { cat: string; rows: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ marginBottom: 40 }}>
      <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
        letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL,
        marginBottom: 16, paddingBottom: 12,
        borderBottom: `1px solid rgba(200,185,154,0.25)` }}>{cat}</div>
      {rows.map(([label, value], i) => (
        <motion.div key={label}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          style={{ display: "flex", gap: 16,
            padding: "11px 0", borderBottom: i < rows.length-1 ? "1px solid rgba(29,29,27,0.06)" : "none" }}>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            color: "#6B6B6B", minWidth: 200, flexShrink: 0, letterSpacing: "0.05em" }}>{label}</div>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            color: DARK, fontWeight: 400 }}>{value}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function TowerDesign() {
  const facadeRef = useRef<HTMLDivElement>(null);
  const facadeInView = useInView(facadeRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        title="Design & Engineering"
        subtitle="How a single formal act — subtracting a spiraling quadrant from a prismatic volume — created both the architectural identity and the structural system of Kuwait's most ambitious building."
        image="/assets/tower-facade-up.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }]}
      />

      {/* ── The Dual Facade ─────────────────────────────────────── */}
      <div style={{ background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh" }}
          className="design-grid-1">
          {/* Left — image: H39 dual facade: glass curtain wall LEFT, limestone RIGHT — perfect editorial shot */}
          <div style={{ position: "relative", overflow: "hidden", background: "#0c0b09", minHeight: 360 }}>
            <img
              loading="lazy" src="/assets/facade-dual-glass-stone.jpg"
              alt="Al Hamra Tower dual facade — glass curtain wall and Jura limestone side by side"
              style={{ width: "100%", height: "100%", objectFit: "cover",
                objectPosition: "center", display: "block" }} />
          </div>
          {/* Right — text */}
          <div ref={facadeRef}
            style={{ padding: "clamp(48px,8vh,96px) clamp(32px,5vw,80px)",
              display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={facadeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 20 }}>
                The Dual Façade
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontWeight: 300, fontSize: "clamp(26px,3.5vw,48px)",
                color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 24 }}>
                Glass toward the Gulf.<br />Stone toward the desert.
              </h2>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
                fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
                lineHeight: 1.9, marginBottom: 20 }}>
                Three facades face north, east, and west — fully glazed with insulating 
                low-emissivity glass, maximising views across Kuwait Bay and the Arabian Gulf. 
                <strong style={{ color: DARK, fontWeight: 400 }}> Not a single office in the building faces south.</strong>
              </p>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
                fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58", lineHeight: 1.9, marginBottom: 32 }}>
                The south wall is 258,000 m² of Jura limestone — the world's largest area of stone 
                cladding on any single building. Deep angled windows carved into the stone frame 
                oblique city and peninsula views while completely blocking direct solar radiation.
              </p>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {[
                  { n: "258,000", u: "m²", l: "World record limestone cladding" },
                  { n: "55,000",  u: "m²", l: "Low-E curtain wall glass" },
                  { n: "0",       u: "",   l: "South-facing offices" },
                ].map(({ n, u, l }) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                      fontSize: "clamp(24px,3vw,38px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                      {n}{u && <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                        fontSize: "0.4em", color: PEARL, marginLeft: 3, fontWeight: 200 }}>{u}</span>}
                    </div>
                    <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#6B6B6B", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── The Lamella Lobby ───────────────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)" }}
          className="design-grid-2">
          <div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 20 }}>
              The Lamella Structure
            </div>
            <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontWeight: 300, fontSize: "clamp(24px,3.2vw,44px)",
              color: DARK, lineHeight: 1.1, marginBottom: 24 }}>
              24 metres. No columns.<br />Engineered to be impossible.
            </h2>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 16 }}>
              The main lobby rises 24 metres without a single column — achieved through 
              the lamella bracing system. The north tower columns, vertical from Level 12 
              upward, slope outward following a circular arch from 60 metres high, 
              intercepting the ground slab 7.6 metres further north than a vertical column would.
            </p>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 28 }}>
              Five interlocking element types — A, B, C, D, E — form a three-dimensional 
              web. Non-linear buckling analysis confirmed the system: adding the D elements 
              alone increased buckling resistance by a factor of two. All fiberglass formwork 
              moulds were fabricated directly from parametric 3D models — an early milestone 
              in computational construction.
            </p>
            <div style={{ borderLeft: `2px solid ${PEARL}`, paddingLeft: 20 }}>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontStyle: "italic",
                fontSize: "clamp(14px,1.3vw,18px)", color: DARK, lineHeight: 1.7, margin: 0 }}>
                "The geometry of this area is generated by the application of the principles 
                of the laminar structure supporting the tower above and below articulates space."
              </p>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                letterSpacing: "0.28em", textTransform: "uppercase", color: PEARL, marginTop: 10 }}>
                SOM / Skidmore, Owings & Merrill
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", minHeight: 480 }}>
            <div style={{ position: "relative", overflow: "hidden", flex: 2 }}>
              <img
              loading="lazy" src="/assets/lobby-grand-lamella.jpg"
                alt="Al Hamra Tower lobby — white lamella arches, 24m column-free atrium"
                style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 360,
                  objectPosition: "center", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <div style={{ position: "relative", overflow: "hidden", height: 160 }}>
                <img
              loading="lazy" src="/assets/lobby-escalator-art.jpg"
                  alt="Al Hamra escalator and sculptural steel ceiling installation"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Escalator Hall · Steel Sculpture</div>
              </div>
              <div style={{ position: "relative", overflow: "hidden", height: 160 }}>
                <img
              loading="lazy" src="/assets/facade-trencadis-detail.jpg"
                  alt="Al Hamra Tower facade — limestone and trencadis mosaic detail"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,185,154,0.8)" }}>Trencadis Façade · Upper Floors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* ── Full Specification Table ────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
            letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 16 }}>
            Technical Specification
          </div>
          <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontWeight: 300, fontSize: "clamp(26px,3.5vw,48px)",
            color: DARK, lineHeight: 1.1 }}>
            The numbers behind the form.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)" }}
          className="spec-table-grid">
          <div>
            {SPECS.slice(0,3).map(s => <SpecTable key={s.cat} {...s} />)}
          </div>
          <div>
            {SPECS.slice(3).map(s => <SpecTable key={s.cat} {...s} />)}
          </div>
        </div>
      </div>

      {/* ── Drawings & Documentation ─────────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(48px,7vh,80px) clamp(28px,6vw,96px)" }}>

        {/* Section kicker */}
        <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
          fontSize: "clamp(10px,0.85vw,11px)", letterSpacing: "0.45em",
          textTransform: "uppercase", color: PEARL, marginBottom: 48 }}>
          Drawings & Documentation
        </div>

        {/* ① Typical Floor Plan — full-width feature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ marginBottom: 64 }}
        >
          <img
            src="/assets/drawings/floor-plan-typical.jpg"
            alt="SOM — Al Hamra Tower typical office floor plan, ~2,300 m² NLA per floor"
            loading="lazy"
            style={{ width: "100%", display: "block", border: "1px solid rgba(29,29,27,0.07)" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginTop: 14, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B" }}>
              SOM — Typical office floor plan
            </div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: PEARL }}>
              ~2,300 m² net leasable area per floor
            </div>
          </div>
        </motion.div>

        {/* ② South Wall Elevation — paired 2-col, portrait drawings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#6B6B6B", marginBottom: 20 }}>
            Elevation Drawings
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
            className="elevation-grid">
            {[
              { src: "/assets/drawings/south-wall-elevation.jpg", label: "South wall elevation · 412.6 m" },
              { src: "/assets/drawings/massing-05-elevation.jpg", label: "South elevation — full context" },
            ].map(({ src, label }) => (
              <div key={label}>
                <img src={src} alt={label} loading="lazy"
                  style={{ width: "100%", display: "block", border: "1px solid rgba(29,29,27,0.07)" }} />
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#6B6B6B", marginTop: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .design-grid-1, .design-grid-2 { grid-template-columns: 1fr 1fr !important; }
        .spec-table-grid { grid-template-columns: 1fr 1fr !important; }
        .design-drawing-grid { grid-template-columns: 1fr 1fr !important; }
        .elevation-grid { grid-template-columns: 1fr 1fr !important; }

        /* Horizontal massing carousel */
        .massing-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .massing-scroll::-webkit-scrollbar { height: 2px; }
        .massing-scroll::-webkit-scrollbar-track { background: rgba(29,29,27,0.05); }
        .massing-scroll::-webkit-scrollbar-thumb { background: rgba(200,185,154,0.5); border-radius: 1px; }
        .massing-item {
          flex: 0 0 auto;
          height: 340px;
          overflow: hidden;
          scroll-snap-align: start;
        }
        .massing-item img { object-fit: contain; }

        @media (max-width: 768px) {
          .design-grid-1, .design-grid-2 { grid-template-columns: 1fr !important; }
          .spec-table-grid { grid-template-columns: 1fr !important; }
          .design-drawing-grid { grid-template-columns: 1fr !important; }
          .elevation-grid { grid-template-columns: 1fr !important; }
          .massing-item { height: 240px; }
        }
      `}</style>
    </PageLayout>
  );
}
