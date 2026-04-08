import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, SpecTable, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

const STATS = [
  { number: "412",     unit: "m",  label: "Building Height"  },
  { number: "80",             label: "Stories"          },
  { number: "195,000", unit: "m²", label: "Gross Area"       },
  { number: "10,000",  unit: "m²", label: "Site Area"        },
];

const FEATURES = [
  { number: "01", title: "Carved Form",     body: "The tower's asymmetrical, carved form is a purposeful response to solar exposure. A quarter of each floor plate is strategically removed to reduce heat gain while enhancing views." },
  { number: "02", title: "Solar Response",  body: "The south facade's limestone cladding acts as a passive performance measure against the desert sun, reducing interior thermal stress." },
  { number: "03", title: "Façade & Structure", body: "Glass facades on three sides frame sweeping vistas, while engineered concrete structure supports the sculpted mass." },
  { number: "04", title: "Lobby & Arrival", body: "A dramatic column-free lobby of approximately 24 metres height defines the arrival experience." },
];

const SPECS = [
  { label: "Building Height",    value: "412m — Kuwait's tallest structure"   },
  { label: "Number of Stories",  value: "80 — Plus mechanical floors"         },
  { label: "Foundation Mat",     value: "5,800m² — Spanning full footprint"   },
  { label: "Gross Area",         value: "195,000m² — Office & retail space"   },
  { label: "Concrete Volume",    value: "85,000m³ — High-performance mix"     },
  { label: "Concrete Strength",  value: "50–80 MPa — Cube strength range"     },
  { label: "Shear Wall",         value: "1,200mm — Maximum thickness"         },
  { label: "Perimeter Columns",  value: "700–1,200mm — Square sections"       },
  { label: "Floor Slab",         value: "160mm × 6.0m span"                   },
];

const STRUCTURAL = [
  { number: "01", title: "Hyperbolic Paraboloid Walls",  body: "Two reinforced-concrete flared walls extend the full 412m height. The southeast wall leans INTO the building (lightly loaded), while the southwest wall leans AWAY, carrying enormous concentrated loads — unprecedented at this scale." },
  { number: "02", title: "Torsional Gravity Response",   body: "The tower twists elastically under gravity loads alone. Counter-clockwise circumferential forces create cumulative torsional moment from zero at top to maximum at base." },
  { number: "03", title: "Cantilevered Truss System",    body: "The observation deck's curtain wall is supported by an innovative cantilevered truss system that eliminates the need for columns, providing unobstructed 360-degree views." },
  { number: "04", title: "Sloped Perimeter Columns",     body: "Columns along the exterior slope inwards at the base, defining the street-level appearance while efficiently transferring loads to the foundation." },
];

const FLOOR_LEVELS = [
  { level: "Ground — 0°",  desc: "Base floor plate — the cut begins on the west side of the south facade"  },
  { level: "Level 20 — 16°", desc: "Rotation continues counter-clockwise" },
  { level: "Level 40 — 32°", desc: "Mid-tower rotation"  },
  { level: "Level 55 — 44°", desc: "Upper tower rotation" },
  { level: "Level 80 — 60°", desc: "Crown — full counter-clockwise rotation achieved" },
];

export default function TowerDesign() {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <PageLayout>
      <PageHero
        tag="The Tower · Design"
        title="Design That Performs"
        subtitle="Form, climate, and engineering in service of architecture — by Skidmore, Owings & Merrill."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }, { label: "Design", href: "/tower/design" }]}
      />

      {/* Key stats */}
      <StatsBar stats={STATS} />

      {/* Defining Elements */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <Rv><Tag>Architectural Concept</Tag></Rv>
            <Rv delay={0.1}><H2>A Timeless, Elegant Marker</H2></Rv>
            <Rv delay={0.2}>
              <Body>
                The tower's asymmetrical carved profile responds directly to solar exposure, optimising comfort while shaping a distinctive skyline identity. The massing reduces heat gain and enhances shading, transforming environmental constraints into architectural advantage.
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body style={{ marginTop: 16 }}>
                Glass curtain wall systems combined with stone cladding on solar-exposed surfaces ensure durability and performance across Kuwait's demanding climate.
              </Body>
            </Rv>
          </div>
          <Rv delay={0.15}>
            <FeatureGrid features={FEATURES} />
          </Rv>
        </div>
      </Section>

      {/* Floor rotation visualization */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Interactive Visualization</Tag></Rv>
        <Rv delay={0.1}><H2>Spiraling Floor Geometry</H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 560, marginBottom: 48 }}>Explore how the carved quadrant rotates 60° from base to crown. The carved south wall shifts from west at ground level to east at the crown — a total 60° counter-clockwise rotation over 80 stories.</Body></Rv>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Level selector */}
          <div>
            {FLOOR_LEVELS.map(({ level, desc }, i) => (
              <motion.div key={level}
                onClick={() => setActiveLevel(i)}
                style={{
                  padding: "20px 24px",
                  borderLeft: `3px solid ${activeLevel === i ? "#1D1D1B" : "rgba(29,29,27,0.1)"}`,
                  marginBottom: 4, cursor: "pointer",
                  background: activeLevel === i ? "#fff" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "11px", fontWeight: 500, color: activeLevel === i ? "#1D1D1B" : "#B2B2B2", letterSpacing: "0.1em" }}>{level}</div>
                {activeLevel === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.2 }}>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: 6 }}>{desc}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Visual rotation diagram */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 200 200" style={{ width: 200, height: 200 }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(29,29,27,0.08)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="2" fill="#1D1D1B"/>
              {[0, 12, 24, 36, 48, 60].map((deg, i) => {
                const rad = (deg - 90) * Math.PI / 180;
                return (
                  <g key={deg}>
                    <line
                      x1="100" y1="100"
                      x2={100 + 70 * Math.cos(rad)}
                      y2={100 + 70 * Math.sin(rad)}
                      stroke={i <= activeLevel ? "#1D1D1B" : "rgba(29,29,27,0.1)"}
                      strokeWidth={i === activeLevel ? 2 : 1}
                    />
                    <circle cx={100 + 70 * Math.cos(rad)} cy={100 + 70 * Math.sin(rad)} r="4"
                      fill={i <= activeLevel ? "#1D1D1B" : "rgba(29,29,27,0.15)"}/>
                    <text x={100 + 88 * Math.cos(rad)} y={100 + 88 * Math.sin(rad)}
                      textAnchor="middle" dominantBaseline="middle"
                      style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", fill: "rgba(29,29,27,0.45)" }}>
                      {deg}°
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </Section>

      {/* Technical specs */}
      <Section>
        <Rv><Tag>Technical Specifications</Tag></Rv>
        <Rv delay={0.1}><H2>Engineering Data</H2></Rv>
        <Rv delay={0.2}><SpecTable specs={SPECS} /></Rv>
      </Section>

      {/* Lobby */}
      <Section bg="#FAFAFA">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <Rv><Tag>Arrival Experience</Tag></Rv>
            <Rv delay={0.1}><H2>The 24-Metre Grand Lobby</H2></Rv>
            <Rv delay={0.2}><Body>A 24-metre-high column-free lobby establishes immediate presence and spatial clarity. The grand lobby on the north side of the tower extends from the core to its perimeter frame. The lobby's dramatic scale and carefully orchestrated light create an arrival experience befitting Kuwait's tallest building.</Body></Rv>
            <Rv delay={0.3}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 36 }}>
                {[{ n: "24m", l: "Lobby Height" }, { n: "7.6m", l: "Column Offset" }, { n: "130ft", l: "Sky Deck Height" }, { n: "360°", l: "Panoramic Views" }].map(({ n, l }) => (
                  <div key={l} style={{ background: "#fff", padding: "28px 22px" }}>
                    <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 36, fontWeight: 300, color: "#1D1D1B", lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 8 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
          <Rv delay={0.15}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src="/assets/tower-street.jpg" alt="Al Hamra Tower from street level"
                style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center top", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "20px 20px 16px" }}>
                <span style={{ fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Photo: Dave Burk · SOM Architecture
                </span>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      {/* Structural innovations */}
      <Section>
        <Rv><Tag>Structural Innovation</Tag></Rv>
        <Rv delay={0.1}><H2>Engineering the Impossible</H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={STRUCTURAL} /></Rv>
      </Section>

      <DarkBand
        title="Awards &amp; Recognition"
        subtitle="Al Hamra Tower's design has earned international recognition from the world's leading architectural institutions."
        ctaLabel="View Awards"
        ctaHref="/tower/recognition"
      />
    </PageLayout>
  );
}
