import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { MashrabiyaDivider } from "@/components/shared/MashrabiyaDivider";

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";

const PILLARS = [
  {
    n: "01", title: "The Desert Wall",
    body: "The solid south wall — 258,000 m² of Jura limestone — is the building's primary environmental strategy. Its geometry responds directly to Kuwait's solar path. Openings are positioned based on the envelope's relationship to the sun at each floor level, ensuring that direct solar radiation never enters an office space.",
    stat: "Zero south-facing offices in 62 floors",
  },
  {
    n: "02", title: "The Spiraling Form",
    body: "Removing a quarter of each floor plate on the south side does two things simultaneously: it maximises Gulf views for every tenant, and it reduces the total surface area exposed to desert sun. SOM describes it as a 'purely formal operation' — architecture and environmental engineering solved by the same geometric act.",
    stat: "30% less south-facing surface than a conventional tower of equal area",
  },
  {
    n: "03", title: "Low-E Insulating Glass",
    body: "55,000 m² of curtain wall on the north, east, and west facades uses insulating glass with low-emissivity coating. Approximately 30% of the glass units are curved — manufactured to wrap the tower's corners — with bending and coating processes designed to work in tandem.",
    stat: "55,000 m² insulating curtain wall",
  },
  {
    n: "04", title: "Trencadis — Weight Reduced Stone",
    body: "The upper floors of the limestone cladding use trencadis — a mesh coated with crushed limestone — rather than full tiles. This significantly reduces the facade weight at height while maintaining the visual continuity of the monolithic stone wall. A material innovation driven by structural necessity.",
    stat: "Significant weight reduction at height — same visual appearance",
  },
  {
    n: "05", title: "Smart Building Infrastructure",
    body: "A fibre optic backbone and advanced Building Automation System (BAS) managed by a world-leading facility management company monitors and controls all building systems across every floor. Five electrical substations located at strategic levels (B2, 4, 27, 52, 76) ensure 100% power supply redundancy.",
    stat: "100% power supply redundancy across 5 substations",
  },
  {
    n: "06", title: "Concrete Over Steel",
    body: "Al Hamra is one of the few reinforced concrete supertall buildings — a choice with long-term sustainability implications. Concrete's thermal mass moderates internal temperature swings. Its compressive strength allows efficient use of material. The 289 piles were designed for the specific chemistry of Kuwait's silty-sand geology to resist sulphate attack without corrosion.",
    stat: "195,000 m³ reinforced concrete — structural longevity by design",
  },
];

export default function TowerSustainability() {
  return (
    <PageLayout>
      <PageHero
        title="Sustainability"
        subtitle="Al Hamra's environmental performance was not engineered into the building after the form was set. It was the form itself — every design decision that gave the tower its identity also solved an environmental problem."
        image="/assets/tower-facade-up.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }]}
      />

      {/* ── Intro statement ─────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)",
          alignItems: "start" }} className="sust-intro-grid">
          <div>
            <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 20 }}>
              Environmental philosophy
            </div>
            <h2 style={{ fontFamily: "Cormorant Garamond,serif", fontStyle: "italic",
              fontWeight: 300, fontSize: "clamp(26px,3.5vw,50px)",
              color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 0 }}>
              The form is the strategy.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: "Jost,sans-serif", fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 20 }}>
              In most buildings, sustainability features are layered on after the architecture 
              is resolved — solar panels, shading devices, green roofs. At Al Hamra Tower, 
              the environmental response generated the architecture. The spiraling form that 
              makes the building unmistakable is the same act that removes the south-facing 
              glass. The stone wall that defines the skyline is also the primary solar shield.
            </p>
            <p style={{ fontFamily: "Jost,sans-serif", fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58", lineHeight: 1.9 }}>
              SOM's structural engineers describe the process as 'symbiotic evolution' — 
              the structural system and the exterior form developed together. Neither could 
              exist without the other. The flared walls are both the building's visual 
              signature and its lateral force-resisting system.
            </p>
          </div>
        </div>
      </div>

      {/* ── Six sustainability pillars ──────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(10px,0.85vw,11px)",
          letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 48 }}>
          Six environmental design principles
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1,
          background: "rgba(29,29,27,0.07)" }} className="sust-pillars-grid">
          {PILLARS.map(({ n, title, body, stat }, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.div key={n} ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                style={{ background: "#fff", padding: "clamp(28px,4vh,44px) clamp(24px,3vw,36px)" }}>
                <div style={{ fontFamily: "Cormorant Garamond,serif",
                  fontSize: "clamp(28px,3vw,44px)", fontWeight: 300,
                  color: "rgba(29,29,27,0.1)", lineHeight: 1, marginBottom: 20 }}>{n}</div>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 500, color: DARK, marginBottom: 16, letterSpacing: "0.03em" }}>{title}</div>
                <p style={{ fontFamily: "Jost,sans-serif", fontWeight: 300,
                  fontSize: "clamp(12px,0.95vw,13px)", color: "#767676",
                  lineHeight: 1.85, marginBottom: 20 }}>{body}</p>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: PEARL,
                  paddingTop: 16, borderTop: "1px solid rgba(200,185,154,0.3)" }}>{stat}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <MashrabiyaDivider count={9} />

      {/* ── Quote ───────────────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "Cormorant Garamond,serif", fontStyle: "italic",
            fontWeight: 300, fontSize: "clamp(22px,3vw,42px)",
            color: DARK, lineHeight: 1.4, marginBottom: 28 }}>
            "The solid south wall, and flared geometry, is generated in order to decrease 
            the absorption of solar radiation. This wall not only protects the building from 
            critical environmental conditions — it also assumes the role of structural backbone."
          </div>
          <div style={{ fontFamily: "Jost,sans-serif", fontSize: "10px",
            letterSpacing: "0.35em", textTransform: "uppercase", color: PEARL }}>
            Skidmore, Owings & Merrill LLP — Structural Sustainability Statement
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
