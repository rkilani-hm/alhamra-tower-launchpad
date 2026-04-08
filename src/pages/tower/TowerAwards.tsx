import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, AwardTable, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

const AWARDS = [
  { year: "2007", award: "Structural Engineers World Congress Paper", org: "CTBUH",             notes: "Research on sculpted high-rise design"   },
  { year: "2012", award: "Best Tall Building Middle East & Africa",   org: "CTBUH",             notes: "Structural innovation & urban integration" },
  { year: "2014", award: "Outstanding Structure Award",               org: "IABSE",             notes: ""                                        },
  { year: "2015", award: "Excellence in Engineering",                 org: "ASCE",              notes: ""                                        },
  { year: "2016", award: "Sustainable Design Recognition",            org: "MEA Awards",        notes: ""                                        },
  { year: "2019", award: "Decade of Excellence",                     org: "Gulf Construction", notes: ""                                        },
];

const GLOBAL_STATS = [
  { number: "23rd",    label: "Tallest in World at Completion" },
  { number: "#1",      label: "Tallest Sculpted Tower"        },
  { number: "4",       label: "Parallel Analysis Models"      },
  { number: "189,000", unit: "kN", label: "Lamella Buckling Capacity" },
];

const COLLABORATORS = [
  { role: "Lead Architect & Engineer", org: "SOM — Skidmore, Owings & Merrill" },
  { role: "Associate Architect",       org: "VDA"                              },
  { role: "Digital Project Software",  org: "Gehry Technologies"               },
  { role: "General Contractor",        org: "Ahmadiah / KCSC"                  },
];

export function TowerAwards() {
  return (
    <PageLayout>
      <PageHero
        tag="The Tower · Recognition"
        title="Global Acknowledgement"
        subtitle="Al Hamra Business Tower has been recognised by leading architectural and development institutions for its design excellence and long-term presence on the global skyline."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }, { label: "Awards", href: "/tower/recognition" }]}
      />

      {/* Published Research */}
      <Section>
        <Rv><Tag>Published Research · CTBUH 2007</Tag></Rv>
        <Rv delay={0.1}><H2>"Sculpted High Rise: The Al Hamra Tower"</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 32 }}>
            <div>
              <Body>
                Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM) — Council on Tall Buildings and Urban Habitat, Structural Engineers World Congress 2007.
              </Body>
              <div style={{ marginTop: 40, padding: "28px 32px", borderLeft: "3px solid rgba(29,29,27,0.15)" }}>
                <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "19px", fontStyle: "italic", fontWeight: 300, color: "#1D1D1B", lineHeight: 1.65 }}>
                  "The design and construction of the Al Hamra Tower is a significant step forward both in terms of architectural design form and process. By blending conventional engineering tools with parametric modelling software, SOM has brought together the realms of free-form design and the super high-rise skyscraper."
                </p>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 16 }}>
                  CTBUH Research Paper · 2007
                </div>
              </div>
            </div>
            <div>
              {[["Publication","CTBUH Research Paper — Structural Engineers World Congress 2007"],
                ["Authors","Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM)"],
                ["Publisher","Council on Tall Buildings and Urban Habitat"],
                ["Tags","Free Form Design · Sculpted Tower · Twisted Tower · Hyperbolic Paraboloid"]
              ].map(([label, value]) => (
                <div key={label} style={{ padding: "14px 0", borderBottom: "1px solid rgba(29,29,27,0.07)", display: "flex", gap: 24 }}>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B2B2B2", minWidth: 100, flexShrink: 0, paddingTop: 2 }}>{label}</div>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Rv>
      </Section>

      {/* Awards table */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Awards & Honours</Tag></Rv>
        <Rv delay={0.1}><H2>International Recognition</H2></Rv>
        <Rv delay={0.2}><AwardTable awards={AWARDS} /></Rv>
      </Section>

      {/* Global standing */}
      <StatsBar stats={GLOBAL_STATS} />

      {/* Collaborators */}
      <Section>
        <Rv><Tag>Project Collaborators</Tag></Rv>
        <Rv delay={0.1}><H2>The Team Behind the Tower</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 40 }}>
            {COLLABORATORS.map(({ role, org }) => (
              <div key={org} style={{ background: "#fff", padding: "32px 28px" }}>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 12 }}>{role}</div>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "15px", fontWeight: 400, color: "#1D1D1B" }}>{org}</div>
              </div>
            ))}
          </div>
        </Rv>
      </Section>

      <DarkBand
        title="Explore Sustainability &amp; Innovation"
        subtitle="See how Al Hamra Tower integrates climate-responsive engineering with world-class environmental performance."
        ctaLabel="Sustainability"
        ctaHref="/tower/sustainability"
      />
    </PageLayout>
  );
}
