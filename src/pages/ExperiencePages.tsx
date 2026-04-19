import { useState } from "react";
import { FloorPlanViewer } from "@/components/shared/FloorPlanViewer";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";
import { PatternBackground } from "@/components/shared/PatternBand";

/* ══════════════════════════════════════════════════
   SERVICES & FACILITIES  /services
══════════════════════════════════════════════════ */
const SYSTEMS = [
  { number: "01", title: "Electrical Systems",       body: "Five dedicated electrical substations located at basement-2, floors 4, 27, 52, and 76 deliver uninterrupted power. 100% generator redundancy ensures zero-downtime continuity across all 62 office floors." },
  { number: "02", title: "Water Supply & Plumbing",  body: "Centralised water distribution with booster pump stations serving all 80 floors. 24-hour leak response maintains consistent pressure and quality." },
  { number: "03", title: "Air Conditioning & HVAC",  body: "District-cooled chilled water system with variable air volume units. Individual zone control per floor — tenants regulate temperature independently." },
  { number: "04", title: "ICT & Telecommunications", body: "Fiber-optic backbone with structured cabling to every floor. Multiple carrier access, dedicated server rooms, and centralised BMS." },
  { number: "05", title: "Security & Access Control",body: "Round-the-clock manned security, CCTV surveillance, smart card access, visitor management, and direct coordination with civil defense authorities." },
  { number: "06", title: "On-Site Medical Room",     body: "Fully equipped medical room staffed during business hours, with first-aid capabilities and emergency response. Defibrillators at key points." },
];

const FACILITY = [
  { number: "01", title: "Fire & Life Safety",    body: "Siemens FireFinder XLSV system. Dedicated refuge floors at Levels 29 and 54. Pressurised stairwells, sprinkler coverage, annual civil defense drills." },
  { number: "02", title: "Preventive Maintenance",body: "Scheduled maintenance programs for all mechanical, electrical, and plumbing systems. Dedicated engineering teams ensure equipment longevity." },
  { number: "03", title: "Common Area Management",body: "Lobby presentation, corridor upkeep, restroom servicing, and elevator cabin maintenance — maintained to five-star hospitality standards." },
  { number: "04", title: "CCTV & Monitoring",     body: "Comprehensive closed-circuit coverage with 24/7 monitoring from a centralised control room. Recorded footage retained per regulatory requirements." },
];

const TENANT = [
  { number: "01", title: "Valet & Parking",       body: "2,000+ spaces across 11 levels with VIP drop-off and valet service." },
  { number: "02", title: "Cleaning & Housekeeping",body: "Professional daily cleaning of tenanted floors and common areas." },
  { number: "03", title: "Help Desk & Dispatch",  body: "Centralised service desk for all maintenance requests with tracked response times." },
  { number: "04", title: "Reception & Concierge", body: "Dedicated lobby reception with tenant coordination and visitor escort services." },
];

export function Services() {
  return (
    <PageLayout>
      <PageHero
        tag="Experience · Services"
        title="Services & Facilities"
        subtitle="Al Hamra Tower operates as a fully managed environment. A resident engineering and facilities team delivers round-the-clock support across every building system."
        crumbs={[{ label: "Home", href: "/" }, { label: "Experience", href: "/services" }]}
      />
      <StatsBar stats={[{ number: "24/7", label: "Operations" }, { number: "351m", label: "Sky Lounge (351m) Elevation" }, { number: "100%", label: "Power Redundancy" }, { number: "9", label: "Cinema Screens" }]} />

      {/* Lobby entrance corridor — full bleed */}
      <div style={{ position: "relative", height:"clamp(240px,35vw,440px)", overflow: "hidden" }}>
        <img
              loading="lazy" src="/assets/lobby-entrance-corridor.jpg" alt="Al Hamra Tower Grand Lobby entrance corridor"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(29,29,27,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 44, left: 80, right: 80 }}>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
            Al Hamra Business Tower · Grand Lobby · 24/7 Operations
          </p>
          <h3 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.2vw,34px)", fontWeight: 200, color: "#fff", lineHeight: 1.3 }}>
            Every service designed to<br /><strong style={{ fontWeight: 500 }}>anticipate. Remove friction. Perform.</strong>
          </h3>
        </div>
      </div>

      <Section>
        <Rv><Tag>Building Systems · Continuous Operation</Tag></Rv>
        <Rv delay={0.1}><H2>Six Systems. One Standard.</H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 48 }}>Six principal systems form the operational backbone of the tower, each monitored and maintained around the clock by dedicated engineering personnel.</Body></Rv>
        <Rv delay={0.3}><FeatureGrid features={SYSTEMS} /></Rv>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag>Facility Management · Highest Standard</Tag></Rv>
        <Rv delay={0.1}><H2>Maintained to the Highest Standard</H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={FACILITY} /></Rv>
      </Section>

            {/* Interior photo gallery */}
      <div className="grid-3col-photo">
        {[
          { src: "/assets/lobby-elevator-hall.jpg",   alt: "VIP elevator hall",        cap: "VIP Elevator Hall · Levels 30–51"   },
          { src: "/assets/lobby-ceiling-day.jpg",     alt: "Lobby ceiling structure",  cap: "Lamella Ceiling · Daylight"         },
          { src: "/assets/lobby-ceiling-portrait.jpg",alt: "Lobby ceiling portrait",   cap: "Grand Lobby Structure · 24m Height" },
        ].map(({ src, alt, cap }) => (
          <div key={src} style={{ position: "relative", overflow: "hidden", height: 300 }}>
            <img src={src} alt={alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transition: "transform 0.6s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.55))", padding: "14px 18px 12px" }}>
              <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>{cap}</span>
            </div>
          </div>
        ))}
      </div>

      <Section>
        <Rv>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 200, letterSpacing: "0.04em", color: "#1D1D1B", lineHeight: 1.65, maxWidth: 720 }}>
            "Behind every seamless day at Al Hamra Tower stands an infrastructure of precision — engineering teams, monitoring systems, and service protocols working in concert."
          </p>
        </Rv>
      </Section>

      {/* ── Sky Lounge ─────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Full-bleed sky lounge image */}
        <div style={{ position: "relative", height: "clamp(320px,45vw,580px)", overflow: "hidden", background: "#0c0b09" }}>
          <img
              loading="lazy" src="/assets/sky-lobby-panoramic.jpg"
            alt="Al Hamra Sky Lounge — 351m dining with panoramic Kuwait views"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.75)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(29,29,27,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(32px,5vh,56px) clamp(28px,6vw,96px)" }}>
            <Rv>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#C8B99A", marginBottom: 12 }}>
                Floors 78 – 80 · 351 Metres
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 200, letterSpacing: "0.04em", fontSize: "clamp(26px,4vw,58px)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
                The Sky Lounge.<br />Kuwait's highest dining experience.
              </h2>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.65 }}>
                Starting at 351 metres above Kuwait City, the Al Hamra Sky Lounge occupies Floors 78–80 — the crown of the tower. VIP elevators connect directly from the ground lobby. No other venue in Kuwait begins this high.
              </p>
            </Rv>
          </div>
        </div>
        {/* Two-image strip: dining interior + city view */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#0c0b09" }}>
          <div style={{ position: "relative", height: "clamp(160px,20vw,260px)", overflow: "hidden" }}>
            <img
              loading="lazy" src="/assets/sky-lobby-lounge.jpg"
              alt="Sky Lounge dining room — chandelier, round tables, piano bar"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", bottom: 10, left: 14, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Fine Dining · Piano Bar</div>
          </div>
          <div style={{ position: "relative", height: "clamp(160px,20vw,260px)", overflow: "hidden" }}>
            <img
              loading="lazy" src="/assets/lounge-at-window.jpg"
              alt="Sky Lobby lounge — cream sofas, Kuwait City through full-height windows"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", bottom: 10, left: 14, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Sky Lobby Lounge · Panoramic Views</div>
          </div>
        </div>
      </div>

      {/* ── Luxury Centre ──────────────────────────────────── */}
      <Section title="Al Hamra Luxury Centre" tag="The Mall · 5 Levels · 24,000 m²">
        <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
          fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58", lineHeight: 1.9,
          maxWidth: 720, marginBottom: 40 }}>
          Directly connected to the tower, the Al Hamra Luxury Centre spans 24,000m² across 
          five levels. Its façade is designed to be continuous with and complement the tower's 
          limestone and glass cladding — a single architectural statement from ground to sky.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2,
          marginBottom: 48 }} className="grid-3col">
          {[
            { category: "Luxury Fashion", brands: "Hermès · Gucci · Saint Laurent · Bottega Veneta · Salvatore Ferragamo · Bally · Ted Baker · Mont Blanc" },
            { category: "Jewellery & Watches", brands: "Officine Panerai · Cartier · Alma · Behbehani Luxury Boutique · Al Arbash" },
            { category: "Dining & Cafés", brands: "Piccola Milano · Bice · Entrecôte · Angelina · L'Eto · Café Bateel · Costa Coffee" },
          ].map(({ category, brands }) => (
            <div key={category} style={{ background: "#FAFAFA",
              padding: "clamp(24px,3vw,36px)", borderTop: "2px solid #C8B99A" }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#9A7550", marginBottom: 12 }}>{category}</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1vw,13px)",
                color: "#6B6B6B", lineHeight: 1.9 }}>{brands}</div>
            </div>
          ))}
        </div>

        {/* Mall atrium + cinema in two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
          <div style={{ position: "relative", height: "clamp(220px,28vw,380px)", overflow: "hidden", background: "#0c0b09" }}>
            <img
              loading="lazy" src="/assets/mall-atrium-skylight.jpg"
              alt="Al Hamra Luxury Centre — circular atrium with geometric skylight"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, rgba(12,11,9,0.7), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8B99A" }}>
              Luxury Centre · Circular Atrium
            </div>
          </div>
          <div style={{ position: "relative", height: "clamp(220px,28vw,380px)", overflow: "hidden", background: "#0c0b09" }}>
            <img
              loading="lazy" src="/assets/tower-entrance-lit.jpg"
              alt="Al Hamra Grand Cinema — 9-screen multiplex, leather recliners"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(to top, rgba(12,11,9,0.8), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 20 }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8B99A", marginBottom: 6 }}>Grand Cinema · 9 Screens</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Premium recliners on the<br />uppermost mall level</div>
            </div>
          </div>
        </div>

        {/* Additional amenities */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: 1, marginTop: 2 }} className="grid-4col">
          {[
            { icon: "diamond", label: "9-Screen Cinema",    desc: "Grand Cinemas on the uppermost level" },
            { icon: "diamond", label: "Health Club & Spa",  desc: "Al Hamra Thermae between tower and mall" },
            { icon: "diamond", label: "Outdoor Roof Garden", desc: "6,000m² landscaped plaza" },
            { icon: "diamond", label: "2,000 Parking Spaces", desc: "11-level car park with pedestrian bridges" },
          ].map(({ icon, label, desc }) => (
            <div key={label} style={{ background: "#FAFAFA",
              padding: "clamp(20px,2.5vw,28px)", borderTop: "1px solid rgba(29,29,27,0.09)" }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: 20, color: "#C8B99A", marginBottom: 8 }}>{icon}</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px",
                fontWeight: 500, color: "#1D1D1B", marginBottom: 6,
                letterSpacing: "0.04em" }}>{label}</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px",
                color: "#6B6B6B", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <DarkBand title="Secure Your Position" subtitle="Ready to experience Al Hamra Tower's world-class environment? Speak with our leasing team today." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LOCATION  /location
══════════════════════════════════════════════════ */
export function Location() {
  return (
    <PageLayout>
      <PageHero
        tag="Experience · Location"
        title="Location & Access"
        subtitle="Located in Kuwait City's Sharq district, Al Hamra Business Tower provides a prestigious address within the region's most vibrant commercial and civic environment."
        crumbs={[{ label: "Home", href: "/" }, { label: "Experience", href: "/services" }, { label: "Location", href: "/location" }]}
      />
      <StatsBar stats={[
        { number: "5",      unit: " min", label: "To Government District" },
        { number: "2,000+",              label: "Parking Spaces"          },
        { number: "Sharq",               label: "Kuwait City District"    },
      ]} />

      {/* Full-bleed waterfront photo */}
      <div style={{ position: "relative", height:"clamp(260px,40vw,520px)", overflow: "hidden" }}>
        <img
              loading="lazy" src="/assets/kuwait-waterfront.jpg" alt="Kuwait City waterfront and skyline"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(29,29,27,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 80, right: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>Al Hamra Tower · Sharq · Kuwait City</div>
            <h3 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.5vw,36px)", fontWeight: 200, color: "#fff", lineHeight: 1.2 }}>
              Kuwait City's<br /><strong style={{ fontWeight: 500 }}>Commercial Heart</strong>
            </h3>
          </div>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Photo: Dave Burk · SOM
          </div>
        </div>
      </div>

      <Section>
        <div className="grid-2col media-right">
          <div>
            <Rv><Tag>Sharq District · Kuwait City</Tag></Rv>
            <Rv delay={0.1}><H2>Where Governance, Commerce and Culture Converge</H2></Rv>
            <Rv delay={0.2}><Body>The tower is situated at 29.3759° N, 47.9774° E in Sharq — Kuwait City's central business district. Direct access to major arterial roads, government ministries, embassies, and the financial corridor.</Body></Rv>
            <Rv delay={0.3}>
              <div style={{ marginTop: 40 }}>
                {[
                  { label: "Address",     value: "Al Hamra Tower, Sharq, Kuwait City, Kuwait" },
                  { label: "Coordinates", value: "29.3759° N, 47.9774° E" },
                  { label: "District",    value: "Sharq — Kuwait City's Central Business District" },
                  { label: "Transport",   value: "Direct access to major arterial roads" },
                ].map(({ label, value }, i) => (
                  <div key={label} style={{ display: "flex", gap: 24, padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none" }}>
                    <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B", minWidth: 110, flexShrink: 0, paddingTop: 2 }}>{label}</div>
                    <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13.5px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
          <Rv delay={0.15}>
            <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: 380 }}>
              <img
              loading="lazy" src="/assets/kuwait-skyline.jpg" alt="Kuwait City skyline with Al Hamra Tower"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "24px 24px 20px" }}>
                <a href="https://maps.google.com/?q=Al+Hamra+Tower+Kuwait" target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff", textDecoration: "none" }}>
                  Get Directions
                </a>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      <DarkBand title="Secure Your Position in Sharq" subtitle="Contact our leasing team to discuss available configurations at Kuwait City's premier business address." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />
    </PageLayout>
  );
}


/* ── Leasing Configurations ─────────────────── */
const LEASING_CONFIGS = [
  {
    code: "LOW RISE",
    title: "Ministerial Suite",
    size: "450 – 1,750 m²",
    bullets: [
      "Floors 6 – 26 · Three dedicated elevator zones",
      "2,300 m² built-up area per floor",
      "No south-facing offices — every tenant faces the Gulf",
      "Ideal for ministries, sovereign institutions, embassies",
    ],
  },
  {
    code: "MID RISE",
    title: "Sovereign Floor",
    size: "450 – 1,750 m²",
    bullets: [
      "Floors 27 – 51 · Sky Lobby 1 at Floor 30",
      "Business centre + 7m-ceiling lounge at sky lobby",
      "Panoramic Gulf and Kuwait Bay views above city roofline",
      "Ideal for GCC financial institutions and law firms",
    ],
  },
  {
    code: "HIGH RISE",
    title: "Flagship Headquarters",
    size: "3,000+ m²",
    bullets: [
      "Multiple contiguous floors · Floors 52 – 75 · Sky Lobby 2 at Floor 55",
      "Executive floors 74 – 75 — Kuwait's highest business address",
      "Dedicated parking levels + building signage rights",
      "VIP elevator direct from arrival lobby to Sky Lounge at 351 m",
      "Ideal for global luxury brands and regional corporate HQs",
    ],
  },
];

export function LeasingOpportunities() {
  return (
    <PageLayout>
      <PageHero
        tag="Leasing"
        title="Leasing Opportunities"
        subtitle="Al Hamra Business Tower offers premium office spaces with flexible configurations suitable for corporate headquarters, regional offices, and professional operations."
        crumbs={[{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }]}
      />
      <StatsBar stats={[{ number: "450", unit: "–", label: "Min office size (m²)" }, { number: "1,750", unit: "m²", label: "Maximum floor plate" }, { number: "2,300", unit: "m²", label: "BUA per floor" }, { number: "62", label: "Dedicated office floors" }]} />

      {/* City view — upgraded to enhanced sky lobby panoramic (Kuwait Bay clearly visible) */}
      <div style={{ position: "relative", height:"clamp(220px,32vw,400px)", overflow: "hidden" }}>
        <img
              loading="lazy" src="/assets/sky-lobby-panoramic.jpg" alt="Kuwait City and Arabian Gulf panoramic view from Al Hamra Sky Lobby"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(29,29,27,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, right: 80, textAlign: "right" }}>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 200, letterSpacing: "0.04em", color: "#fff", lineHeight: 1.4 }}>
            "Every office.<br />Every corner.<br />An unbroken horizon."
          </p>
        </div>
      </div>

      <Section>
        <Rv><Tag>Available Configurations</Tag></Rv>
        <Rv delay={0.1}><H2>Premium Office Spaces</H2></Rv>
        <div className="grid-3col" style={{ gap:1, background:"rgba(29,29,27,0.09)", marginTop:48 }}>
          {LEASING_CONFIGS.map(({ code, title, size, bullets }, i) => (
            <Rv key={code} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "44px 36px", height: "100%" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 14 }}>Configuration {code}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "16px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "36px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1, marginBottom: 20 }}>{size}</div>
                {bullets.map(b => (
                  <div key={b} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#6B6B6B" }}>—</span>
                    <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", color: "#6B6B6B", lineHeight: 1.7 }}>{b}</span>
                  </div>
                ))}
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag>Premium Amenities</Tag></Rv>
        <Rv delay={0.1}><H2>Included with Every Configuration</H2></Rv>
        <div className="grid-4col" style={{ gap:1, background:"rgba(29,29,27,0.09)", marginTop:40 }}>
          {[
            { label: "Grand Lobby Access", desc: "24m column-free arrival experience" },
            { label: "3.2m Ceiling Height", desc: "Generous floor-to-ceiling proportions" },
            { label: "Conference Center", desc: "Shared executive-grade facilities" },
            { label: "Flexible Terms", desc: "Configurations tailored to your timeline" },
          ].map(({ label, desc }) => (
            <div key={label} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11.5px", color: "#6B6B6B", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Floor Plan Viewer */}
      <div>
        <div style={{ padding: "64px 80px 0" }}>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>
            Floor Plans · Al Hamra Complex
          </div>
          <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 200, letterSpacing: "-0.015em", color: "#1D1D1B", lineHeight: 1.2, marginBottom: 8 }}>
            Ground, Mezzanine &amp; Basement Plans
          </h2>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.65, maxWidth: 560 }}>
            Full floor plans for the Al Hamra complex retail and parking levels. Contact the leasing team for office floor configurations.
          </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <FloorPlanViewer />
        </div>
      </div>

      <DarkBand title="Secure Your Position" subtitle="Contact our leasing team for availability, floor plans, and pricing." ctaLabel="Submit Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LEASING INQUIRY  /leasing/inquiry
══════════════════════════════════════════════════ */
export function LeasingInquiry() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 0",
    border: "none", borderBottom: "1px solid rgba(29,29,27,0.18)",
    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300,
    color: "#1D1D1B", background: "transparent", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <PageLayout>
      <PageHero
        tag="Leasing · Inquiry"
        title="Leasing & General Inquiries"
        subtitle="Share your requirements and timeline. Our leasing team will respond with options aligned to your business needs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Inquiry", href: "/leasing/inquiry#inquiry-form" }]}
      />

      <Section>
        <div id="inquiry-form" style={{ scrollMarginTop: "100px" }}>
        <div className="grid-2col">
          {/* Form */}
          <Rv>
            {sent ? (
              <div style={{ padding: "60px 0" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "32px", fontWeight: 300, color: "#1D1D1B", marginBottom: 12 }}>Inquiry Received</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", color: "#6B6B6B" }}>Our leasing team will respond within one business day.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {(["name","email","subject"] as const).map(field => (
                  <div key={field}>
                    <label
                      htmlFor={`inquiry-${field}`}
                      style={{ display: "block", fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 8 }}
                    >
                      {field}
                    </label>
                    <input
                      id={`inquiry-${field}`}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      autoComplete={field === "email" ? "email" : field === "name" ? "name" : "off"}
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      style={inputStyle}
                      aria-required="true"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="inquiry-message"
                    style={{ display: "block", fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 8 }}
                  >
                    Message
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    required rows={5}
                    aria-required="true"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>
                <button type="submit" style={{
                  alignSelf: "flex-start",
                  background: "#1D1D1B", color: "#fff",
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  padding: "15px 40px", border: "none", cursor: "pointer",
                  transition: "opacity 0.3s",
                }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </Rv>

          {/* Contact details */}
          <Rv delay={0.15}>
            <div>
              <Tag>Contact Details</Tag>
              {[
                { label: "Phone",   value: "+965 2227 5000" },
                { label: "Email",   value: "leasing@alhamratower.com" },
                { label: "Address", value: "Al Hamra Tower, Sharq, Kuwait City, Kuwait" },
                { label: "Hours",   value: "Sunday – Thursday · 8:00 AM – 6:00 PM" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "18px 0", borderBottom: "1px solid rgba(29,29,27,0.07)" }}>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
                </div>
              ))}
            </div>
          </Rv>
        </div>
        </div>{/* closes id="inquiry-form" */}
      </Section>
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   DOWNLOADS  /leasing/downloads
══════════════════════════════════════════════════ */
const DOWNLOADS = [
  { title: "Corporate Brochure", format: "PDF", size: "12 MB", desc: "Complete overview of Al Hamra Tower — architecture, services, and leasing information." },
  { title: "Floor Plans",        format: "PDF", size: "8 MB",  desc: "Detailed floor plan layouts for executive, full-floor, and corporate headquarters configurations." },
  { title: "Media Kit",          format: "ZIP", size: "45 MB", desc: "High-resolution images, logos, and press materials for media use." },
];

export function Downloads() {
  return (
    <PageLayout>
      <PageHero
        tag="Leasing · Downloads"
        title="Downloads"
        subtitle="Access brochures, floor plans, and media materials for Al Hamra Tower."
        crumbs={[{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Downloads", href: "/leasing/downloads" }]}
      />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(29,29,27,0.09)" }}>
          {DOWNLOADS.map(({ title, format, size, desc }, i) => (
            <Rv key={title} delay={i * 0.1}>
              <div style={{
                background: "#fff", padding: "36px 40px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40,
                transition: "background 0.2s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "15px", fontWeight: 500, color: "#1D1D1B" }}>{title}</span>
                    <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", border: "1px solid rgba(29,29,27,0.12)", padding: "3px 8px" }}>{format} · {size}</span>
                  </div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12.5px", color: "#6B6B6B" }}>{desc}</div>
                </div>
                <button type="button" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0,
                  background: "none", border: "1px solid rgba(29,29,27,0.2)", cursor: "pointer",
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#1D1D1B", padding: "10px 22px",
                  transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="#1D1D1B"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1D1D1B"; }}
                >
                  Download
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M2 8l4 3 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </Rv>
          ))}
        </div>
      </Section>
      <DarkBand title="Ready to Enquire?" ctaLabel="Submit Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT  /leasing/contact
══════════════════════════════════════════════════ */
export function Contact() {
  return (
    <PageLayout>
      <PageHero
        tag="Leasing · Contact"
        title="Get in Touch"
        subtitle="Share your requirements and timeline. Our leasing team will respond with options aligned to your business needs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Contact", href: "/leasing/contact" }]}
      />
      <Section>
        <div className="grid-4col" style={{ gap:1, background:"rgba(29,29,27,0.09)" }}>
          {[
            { label: "Phone",   value: "+965 2227 0000" },
            { label: "Email",   value: "info@alhamratower.com" },
            { label: "Hours",   value: "Sun – Thu · 8:00 AM – 6:00 PM" },
            { label: "Address", value: "Al Hamra Tower, Sharq, Kuwait City, Kuwait" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#fff", padding: "44px 36px" }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 14 }}>{label}</div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "15px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="#FAFAFA">
        <div className="grid-2col">
          <Rv>
            <Tag>Social Media</Tag>
            <H2>Follow Al Hamra Tower</H2>
            <SocialIcons variant="contact" />
          </Rv>
          <Rv delay={0.15}>
            <Tag>Leasing Team</Tag>
            <H2>Dedicated Support</H2>
            <Body>Our leasing team is available to discuss available configurations, floor plans, pricing, and customisation options. Contact us directly for a response within one business day.</Body>
            <a href="/leasing/inquiry#inquiry-form" style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginTop: 36,
              background: "#1D1D1B", color: "#fff",
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 34px", textDecoration: "none", transition: "opacity 0.3s",
            }}>
              Submit Inquiry
            </a>
          </Rv>
        </div>
      </Section>
    </PageLayout>
  );
}
