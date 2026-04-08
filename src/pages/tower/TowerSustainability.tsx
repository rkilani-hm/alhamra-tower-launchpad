import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

const PERF_STATS = [
  { number: "80",   label: "Floors Monitored"      },
  { number: "100%", label: "Power Redundancy"       },
  { number: "5",    label: "Electrical Substations" },
  { number: "25%",  label: "Solar Heat Reduction"   },
];

const PERFORMANCE = [
  { number: "01", title: "Passive Solar Design",       body: "The tower's asymmetrical form reduces solar heat gain by removing a quarter of each floor plate from the south side, naturally cooling interior spaces while maximising Arabian Gulf views." },
  { number: "02", title: "Thermal Mass Shielding",     body: "The south-facing core is clad in 40mm thick Jura limestone, acting as a natural thermal barrier against Kuwait's intense desert sun." },
  { number: "03", title: "High-Performance Glazing",   body: "East, north, and west elevations feature unitised Low-E coated insulated glass units that minimise heat transfer while optimising natural daylight penetration." },
  { number: "04", title: "Sustainable Blinds",         body: "SilverScreen Enviro roller blinds are 100% recyclable, highly reflective, and hold both Oeko-Tex and Cradle to Cradle certifications." },
  { number: "05", title: "EV Charging Infrastructure", body: "The 11-level car park includes dedicated electric vehicle charging stations, supporting Kuwait's transition to sustainable transportation." },
  { number: "06", title: "Climate-Responsive Form",    body: "Recognised by Time Magazine's 50 Best Inventions for its innovative solar-responsive design that harmonises architecture with environment." },
];

const SAFETY = [
  { number: "01", title: "Siemens FireFinder XLSV",  body: "State-of-the-art firefighting system specifically designed for supertall structures, providing comprehensive fire detection and suppression throughout all 80 floors." },
  { number: "02", title: "Dedicated Refuge Floors",  body: "Two refuge floors on levels 29 and 54 provide protected areas for evacuation during emergencies, equipped with enhanced fire-resistant construction." },
  { number: "03", title: "100% Power Redundancy",    body: "Five electrical substations across levels B2, 4, 27, 52, and 76 ensure uninterrupted power distribution with full redundancy." },
  { number: "04", title: "Smart Building Management",body: "Advanced BMS and IT telecom networking with fiber optic backbone enables real-time monitoring and automated response systems." },
];

const SUBSTATION_MAP = [
  { level: "Level B2",  type: "Substation 1",   desc: "Underground power distribution hub"  },
  { level: "Level 4",   type: "Substation 2",   desc: "Lower tower power management"        },
  { level: "Level 27",  type: "Substation 3",   desc: "Mid-tower power relay"               },
  { level: "Level 29",  type: "Refuge Floor 1", desc: "Emergency evacuation zone"           },
  { level: "Level 52",  type: "Substation 4",   desc: "Upper tower power distribution"      },
  { level: "Level 54",  type: "Refuge Floor 2", desc: "High-rise emergency shelter"         },
  { level: "Level 80",  type: "Substation 5",   desc: "Crown level power management"        },
];

export default function TowerSustainability() {
  return (
    <PageLayout>
      <PageHero
        tag="The Tower · Sustainability"
        title="Sustainability & Innovation"
        subtitle="The tower's design integrates climate-responsive features that reduce heat gain and optimise occupant comfort through passive shading and thoughtful façade engineering."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }, { label: "Sustainability", href: "/tower/sustainability" }]}
      />

      <StatsBar stats={PERF_STATS} />

      {/* Performance */}
      <Section>
        <Rv><Tag>Operational Intelligence · Real-World Efficiency</Tag></Rv>
        <Rv delay={0.1}><H2>Form Follows Climate</H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 48 }}>Building systems are designed to support performance, comfort, and long-term asset value. The tower's asymmetrical sculpting reduces heat gain while the solid stone core acts as a thermal shield.</Body></Rv>
        <Rv delay={0.3}><FeatureGrid features={PERFORMANCE} /></Rv>
      </Section>

      {/* Safety */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Safety & Life Systems</Tag></Rv>
        <Rv delay={0.1}><H2>Built for Continuity</H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={SAFETY} /></Rv>
      </Section>

      {/* Substation map */}
      <Section>
        <Rv><Tag>Infrastructure Map</Tag></Rv>
        <Rv delay={0.1}><H2>Substation & Refuge Floor Locations</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ marginTop: 40 }}>
            {SUBSTATION_MAP.map(({ level, type, desc }, i) => {
              const isRefuge = type.includes("Refuge");
              return (
                <div key={level} style={{
                  display: "flex", alignItems: "center", gap: 24,
                  padding: "18px 0", borderBottom: i < SUBSTATION_MAP.length - 1 ? "1px solid rgba(29,29,27,0.07)" : "none",
                }}>
                  <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 22, fontWeight: 300, color: "#1D1D1B", minWidth: 90 }}>{level}</div>
                  <div style={{
                    fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                    padding: "4px 12px", background: isRefuge ? "#1D1D1B" : "rgba(29,29,27,0.07)",
                    color: isRefuge ? "#fff" : "#6B6B6B", minWidth: 130, textAlign: "center",
                  }}>{type}</div>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", fontWeight: 300, color: "#6B6B6B" }}>{desc}</div>
                </div>
              );
            })}
          </div>
        </Rv>
      </Section>

      {/* Closing statement */}
      <Section bg="#FAFAFA">
        <Rv>
          <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(20px,2.5vw,32px)", fontStyle: "italic", fontWeight: 300, color: "#1D1D1B", lineHeight: 1.6, maxWidth: 820 }}>
            "Al Hamra Tower demonstrates that iconic architecture and environmental responsibility are not competing values — they are complementary forces that, when unified, create structures worthy of their place in the world."
          </p>
        </Rv>
      </Section>

      <DarkBand
        title="Explore the Business Experience"
        subtitle="Discover how Al Hamra Tower's performance infrastructure translates into an exceptional workplace environment."
        ctaLabel="Workplace Experience"
        ctaHref="/business"
      />
    </PageLayout>
  );
}
