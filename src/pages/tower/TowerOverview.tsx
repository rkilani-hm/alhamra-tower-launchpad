import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, AwardTable, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

const TABS = ["Overview", "The Apex", "The Core", "The Foundation"];

const TAB_CONTENT = {
  Overview: {
    heading: "Kuwait's Landmark of Precision",
    body: "Al Hamra Business Tower rises 412 metres above Kuwait City — a permanent fixture on the Gulf skyline and a symbol of architectural ambition. Designed by Skidmore, Owings & Merrill, it stands as the world's tallest sculpted concrete tower, combining environmental intelligence with structural innovation.",
    stats: [{ number: "~413", unit: "m", label: "Total Height" }, { number: "#1", label: "Tallest in Kuwait" }, { number: "24", unit: "m", label: "Lobby Height" }],
  },
  "The Apex": {
    heading: "The Crown — 412–413 Metres",
    body: "One of the tallest towers in the region. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline. The asymmetrical spiral terminates in a razor-sharp apex — simultaneously shelter and statement.",
    stats: [{ number: "412", unit: "m", label: "Apex Height" }, { number: "74", label: "Total Stories" }, { number: "60°", label: "Floor Rotation Crown" }],
  },
  "The Core": {
    heading: "Structural Intelligence",
    body: "Al Hamra Business Tower is anchored by structural intelligence and engineering precision. At its center, a reinforced concrete shear wall core serves as the primary lateral force-resisting system, complemented by a perimeter moment-resisting frame engineered to withstand both wind and gravity loads.",
    stats: [{ number: "1,200", unit: "mm", label: "Shear Wall Thickness" }, { number: "85,000", unit: "m³", label: "Concrete Volume" }, { number: "50–80", unit: "MPa", label: "Concrete Strength" }],
  },
  "The Foundation": {
    heading: "Anchored for Centuries",
    body: "Beneath its sculpted form lies a foundation system engineered for long-term resilience. A 4.2-metre-deep raft foundation supported by 289 bored piles anchors the structure securely. Structural performance was validated through comprehensive wind tunnel testing.",
    stats: [{ number: "4.2", unit: "m", label: "Raft Foundation Depth" }, { number: "289", label: "Bored Piles" }, { number: "5,800", unit: "m²", label: "Foundation Mat" }],
  },
};

const AWARDS = [
  { year: "2012", award: "Best Tall Building Middle East & Africa",    org: "CTBUH",                        notes: "Structural innovation & urban integration" },
  { year: "2013", award: "MIPIM Architectural Review Future Project",  org: "MIPIM Awards",                 notes: "Visionary architectural design"           },
  { year: "2014", award: "Emirates Glass LEAF Award",                  org: "LEAF International",           notes: "Façade engineering & sustainability"      },
  { year: "2016", award: "International Property Award",               org: "International Property Awards",notes: "Best Commercial High-Rise Arabia"         },
  { year: "2019", award: "Iconic Landmark Recognition",                org: "World Architecture Festival",  notes: "Enduring architectural heritage"          },
];

export default function TowerOverview() {
  const [tab, setTab] = useState("Overview");
  const content = TAB_CONTENT[tab as keyof typeof TAB_CONTENT];

  return (
    <PageLayout>
      <PageHero
        tag="The Tower"
        title="Al Hamra Business Tower"
        subtitle="412 metres of purposeful design — engineered by SOM for Kuwait's skyline and the world stage."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }]}
      />

      {/* Dual photo + text intro */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(29,29,27,0.09)" }}>
        {/* Large photo */}
        <div style={{ position: "relative", overflow: "hidden", height: 500 }}>
          <img src="/assets/tower-sunset.jpg" alt="Al Hamra Tower at sunset"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.35) 0%, transparent 50%)" }} />
        </div>
        {/* Skyline photo */}
        <div style={{ position: "relative", overflow: "hidden", height: 500 }}>
          <img src="/assets/kuwait-skyline.jpg" alt="Kuwait City skyline"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.35) 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", bottom: 24, left: 24 }}>
            <div style={{ fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              Photo: Dave Burk · SOM
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(29,29,27,0.09)", padding: "0 80px", background: "#fff" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              fontFamily: "Jost,sans-serif", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "20px 28px 18px", color: tab === t ? "#1D1D1B" : "#B2B2B2",
              background: "none", border: "none", cursor: "pointer",
              borderBottom: tab === t ? "2px solid #1D1D1B" : "2px solid transparent",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >{t}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <Section>
            <Rv><Tag>Al Hamra Tower · {tab}</Tag></Rv>
            <Rv delay={0.1}><H2>{content.heading}</H2></Rv>
            <Rv delay={0.2}><Body style={{ maxWidth: 680 }}>{content.body}</Body></Rv>
          </Section>
          <StatsBar stats={content.stats} />
        </motion.div>
      </AnimatePresence>

      {/* Recognition */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Awards & Recognition</Tag></Rv>
        <Rv delay={0.1}><H2>Global Acknowledgement</H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 600, marginBottom: 48 }}>Al Hamra Business Tower has been recognised by leading architectural and development institutions for its design excellence and long-term presence on the global skyline.</Body></Rv>
        <Rv delay={0.3}><AwardTable awards={AWARDS} /></Rv>
      </Section>

      <DarkBand title="Explore the Design &amp; Engineering" subtitle="Discover how SOM's carved form responds to Kuwait's climate while defining a permanent identity for the Gulf skyline." ctaLabel="Design That Performs" ctaHref="/tower/design" />
    </PageLayout>
  );
}
