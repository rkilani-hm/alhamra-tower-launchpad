import { PageLayout }  from "@/components/layout/PageLayout";
import { FloorPlanViewer } from "@/components/shared/FloorPlanViewer";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

/* ══════════════════════════════════════════════════
   WORKPLACE EXPERIENCE  /business
══════════════════════════════════════════════════ */
const WORKPLACE_FEATURES = [
  { number: "01", title: "Office Spaces",      body: "Efficient floor plates allow flexible configurations. Typical floor: approx. 2,300 sqm build-up, approx. 1,750 sqm leasable area. Generous glazing maximises daylight and city views." },
  { number: "02", title: "Connectivity",       body: "The tower forms part of the larger Al Hamra destination, providing direct proximity to retail, dining, and lifestyle amenities within Kuwait City's commercial core." },
  { number: "03", title: "Vertical Transport", body: "The tower's circulation strategy ensures smooth arrival, efficient transfers, and clear separation between visitor and tenant movement flows." },
  { number: "04", title: "Support Services",   body: "Operational support designed to stay out of the way — present when needed, invisible when not. Building management around the clock, every day of the year." },
];

export function WorkplaceExperience() {
  return (
    <PageLayout>
      <PageHero
        tag="Business · Workplace"
        title="Workplace Experience"
        subtitle="Al Hamra Business Tower provides an environment defined by discretion, efficiency, and professional clarity."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }]}
      />

      <StatsBar stats={[
        { number: "50+",  label: "Leading Companies"   },
        { number: "95%",  label: "Occupancy Rate"      },
        { number: "24/7", label: "Building Operations" },
      ]} />

      {/* Full-bleed lobby — H51: grand lamella lobby, white arches, full daylight */}
      <div style={{ position: "relative", height:"clamp(340px,48vw,640px)", overflow: "hidden" }}>
        <img src="/assets/lobby-grand-lamella.jpg" alt="Al Hamra Tower Grand Lobby — lamella arches"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(29,29,27,0.05) 0%, rgba(29,29,27,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 48, left: 80, right: 80 }}>
          <Rv>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>Grand Lobby · 24m Column-Free · Lamella Bracing</p>
            <h3 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 200, color: "#fff", lineHeight: 1.25, maxWidth: 560 }}>
              An arrival experience<br /><strong style={{ fontWeight: 500 }}>befitting Kuwait's tallest building</strong>
            </h3>
          </Rv>
        </div>
      </div>

      {/* Two-col: text + corridor photo */}
      <Section>
        <div className="grid-2col media-right">
          <div>
            <Rv><Tag>Premium Workspace Features</Tag></Rv>
            <Rv delay={0.1}><H2>Space That Adapts to the Way You Work</H2></Rv>
            <Rv delay={0.2}>
              <Body>Efficient floor plates allow flexible configurations suitable for single-tenant headquarters or multi-tenant layouts. Everything you need — close, connected, effortless. Retail, dining, and service amenities within the Al Hamra complex reinforce the tower as a complete professional environment.</Body>
            </Rv>
            <Rv delay={0.3}>
              <FeatureGrid features={WORKPLACE_FEATURES} />
            </Rv>
          </div>

          {/* Interior corridor photo */}
          <Rv delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src="/assets/lobby-elevator-corridor.jpg" alt="Al Hamra elevator corridor — travertine and lamella"
                  style={{ width: "100%", height: 320, objectFit: "cover", objectPosition: "center center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.4))", padding: "16px 20px 14px" }}>
                  <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                    Elevator Hall · Travertine & Lamella Framing
                  </span>
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src="/assets/lounge-at-window.jpg" alt="Sky Lobby lounge — panoramic Kuwait City view"
                  style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.4))", padding: "12px 20px 12px" }}>
                  <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                    360° Views · Kuwait City & Arabian Gulf
                  </span>
                </div>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      <DarkBand title="Explore Office Spaces &amp; Floor Plans" ctaLabel="View Configurations" ctaHref="/business/office-spaces" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   OFFICE SPACES  /business/office-spaces
══════════════════════════════════════════════════ */
const CONFIGS = [
  { code: "01", title: "Executive Suite",  size: "250–500 m²",     bullets: ["Corner positions with panoramic Gulf views","Private reception and executive amenities","Shell-and-core or fully finished options"] },
  { code: "02", title: "Full Floor HQ",   size: "1,200–1,800 m²", bullets: ["Entire floor plates with dedicated elevator lobbies","360° views — full branding integration","Private elevator lobby and dedicated reception"] },
  { code: "03", title: "Corporate Campus",size: "3,000+ m²",      bullets: ["Contiguous multi-floor configurations","Internal staircases and dedicated reception","Building signage rights available"] },
];

const FLEX_FEATURES = [
  { number: "01", title: "Column-Free Layouts",  body: "Open floor plates with minimal structural columns allow maximum flexibility in space planning and furniture layouts." },
  { number: "02", title: "3.2m Ceiling Heights", body: "Generous floor-to-ceiling heights create a sense of openness and allow for raised flooring and suspended ceiling systems." },
  { number: "03", title: "Fit-Out Support",       body: "Dedicated project management for tenant fit-outs. Shell-and-core or fully finished options available." },
  { number: "04", title: "Modular Partitioning",  body: "Pre-engineered partition grid allows rapid reconfiguration as teams grow or organisational needs evolve." },
];

export function OfficeSpaces() {
  return (
    <PageLayout>
      <PageHero
        tag="Business · Office Spaces"
        title="Office Spaces & Floor Plans"
        subtitle="Flexible configurations from executive suites to full-floor headquarters. Every layout is designed around natural light, panoramic views, and operational efficiency."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Office Spaces", href: "/business/office-spaces" }]}
      />

      {/* Hero — city view with overlay stats */}
      <div style={{ position: "relative", height:"clamp(280px,40vw,520px)", overflow: "hidden" }}>
        <img src="/assets/sky-lobby-corridor.jpg" alt="Al Hamra Sky Lobby — travertine corridor with chandelier and Gulf views"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(29,29,27,0.68) 100%)" }} />
        <div className="office-hero-stats">
          {[{ n: "3.2m", l: "Ceiling Height" }, { n: "360°", l: "Views" }, { n: "1,750", u: "m²", l: "Typical Floor Plate" }].map(({ n, u, l }) => (
            <div key={l}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                {n}<span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 200, color: "rgba(255,255,255,0.55)" }}>{u}</span>
              </div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurations */}
      <Section>
        <Rv><Tag>Space Configurations</Tag></Rv>
        <Rv delay={0.1}><H2>Flexible Configurations for Every Scale</H2></Rv>
        <div className="grid-3col feature-grid" style={{ marginTop: 48 }}>
          {CONFIGS.map(({ code, title, size, bullets }, i) => (
            <Rv key={code} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "44px 36px", height: "100%" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#767676", marginBottom: 14 }}>Configuration {code}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "16px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "36px", fontWeight: 300, color: "#767676", lineHeight: 1, marginBottom: 20 }}>{size}</div>
                {bullets.map(b => (
                  <div key={b} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#767676" }}>—</span>
                    <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", color: "#6B6B6B", lineHeight: 1.7 }}>{b}</span>
                  </div>
                ))}
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      {/* Full-bleed lobby arrival experience — using lobby-elevator-corridor-2 (warm gold ambiance) */}
      <div style={{ position: "relative", height: "clamp(300px,42vw,560px)", overflow: "hidden" }}>
        <img src="/assets/lobby-elevator-corridor-2.jpg" alt="Al Hamra Tower — elevator corridor lamella"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.75) 0%, rgba(29,29,27,0.2) 60%, transparent 100%)" }} />
        <div className="ah-section" style={{ position: "absolute", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent" }}>
          <Rv>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Arrival Experience</div>
            <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,3vw,44px)", fontWeight: 200, color: "#fff", lineHeight: 1.12, maxWidth: 480, marginBottom: 20 }}>
              A 24-metre column-free lobby.<br /><strong style={{ fontWeight: 500 }}>Kuwait's most prestigious address.</strong>
            </h2>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 400 }}>
              Every tenant's day begins in a grand, column-free lobby with a 24-metre vaulted lamella ceiling — an architectural statement that sets the tone for the floors above.
            </p>
          </Rv>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 24, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Grand Lobby · Al Hamra Tower
        </div>
      </div>

      {/* 4-image interior gallery strip — upgraded with premium new images */}
      <div className="office-gallery-strip">
        {[
          { src: "/assets/lobby-grand-lamella.jpg",      cap: "Grand Lobby · White Lamella Arches",       pos: "center"    },
          { src: "/assets/lobby-elevator-corridor.jpg",  cap: "Elevator Hall · Travertine & Lamella",     pos: "center"    },
          { src: "/assets/offices-south-corridor.jpg",   cap: "Office Corridor · Travertine Finishes",    pos: "center"    },
          { src: "/assets/entrance-night-wide.jpg",      cap: "North Entrance · Blue Hour",               pos: "center"    },
        ].map(({ src, cap, pos }, i) => (
          <Rv key={cap} delay={i * 0.08}>
            <div style={{ position: "relative", overflow: "hidden", height: "clamp(200px,24vw,320px)" }}>
              <img src={src} alt={cap}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transition: "transform 0.6s ease", display: "block" }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 14, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>{cap}</div>
            </div>
          </Rv>
        ))}
      </div>

      {/* Corridor + flexibility features */}
      <Section bg="#FAFAFA">
        <div className="grid-2col">
          <Rv>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, height: "100%", minHeight: 420 }}>
              <div style={{ position: "relative", overflow: "hidden", flex: 1 }}>
                <img src="/assets/floor-reception.jpg" alt="Al Hamra floor reception — travertine and steel fins"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", minHeight: 200 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "16px 20px 14px" }}>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}>Floor Reception</div>
                  <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                    Limestone · Steel Fin Screen
                  </span>
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden", flex: 1 }}>
                <img src="/assets/tenant-lobby.jpg" alt="Al Hamra tenant lobby — warm timber and leather"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", minHeight: 200 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "16px 20px 14px" }}>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}>Tenant Lobby</div>
                  <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                    Timber Panelling · Al Hamra Branding
                  </span>
                </div>
              </div>
            </div>
          </Rv>
          <div>
            <Rv><Tag>Flexibility & Fit-Out</Tag></Rv>
            <Rv delay={0.1}><H2>Workspaces Designed to Adapt</H2></Rv>
            <Rv delay={0.2}><FeatureGrid features={FLEX_FEATURES} /></Rv>
            <Rv delay={0.3}>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11.5px", color: "#767676", marginTop: 20, fontStyle: "italic" }}>
                All configurations subject to availability. Contact the leasing team for detailed floor plans.
              </p>
            </Rv>
          </div>
        </div>
      </Section>

      {/* Entrance night — full-bleed dark split */}
      <div className="office-night-split">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/assets/entrance-night.jpg" alt="Al Hamra Tower entrance at night"
            style={{ width: "100%", height: "clamp(260px,35vw,460px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.65))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}>Night Presence</div>
            <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              North Entrance · After Hours
            </span>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/assets/boardroom-enhanced.jpg" alt="Al Hamra boardroom — 14-seat table, Kuwait City view, awards"
            style={{ width: "100%", height: "clamp(260px,35vw,460px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.65))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}>Executive Boardroom</div>
            <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              14-Seat Table · Award Plaques · Gulf Views
            </span>
          </div>
        </div>
      </div>

      {/* Floor Plan Viewer */}
      <div>
        <div className="ah-section" style={{ paddingBottom: 0 }}>
          <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#767676", marginBottom: 16 }}>
            Floor Plans · Al Hamra Complex
          </div>
          <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 200, letterSpacing: "-0.015em", color: "#1D1D1B", lineHeight: 1.2, marginBottom: 8 }}>
            Retail & Ground Level Plans
          </h2>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.65, maxWidth: 560 }}>
            Detailed floor plans for the Al Hamra complex — Ground, Mezzanine, and basement levels featuring retail, dining, parking, and service infrastructure.
          </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <FloorPlanViewer />
        </div>
      </div>

      <DarkBand title="Ready to Secure Your Space?" subtitle="Contact our leasing team for availability and pricing aligned to your requirements." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />

      <style>{`
        .office-hero-stats {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; gap: clamp(24px,5vw,60px);
          padding: clamp(20px,4vw,40px) clamp(20px,5vw,80px);
        }
        .office-gallery-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(29,29,27,0.09);
        }
        .office-night-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(29,29,27,0.09);
        }
        @media (max-width: 768px) {
          .office-gallery-strip { grid-template-columns: repeat(2, 1fr); }
          .office-night-split   { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .office-gallery-strip { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageLayout>
  );
}



/* ── Vertical Transportation data ───────────── */
const ASCENT = [
  {
    floor: "G",
    label: "Ground — Arrival",
    body: "Main lobby entry. Express elevators depart for Sky Lobby 30 and Sky Lobby 55. Local low-rise service begins from Level 6.",
  },
  {
    floor: "30",
    label: "Sky Lobby 1",
    body: "Mid-rise transfer hub. Fully equipped business centre, executive lounge with 7m ceilings, and panoramic Gulf views from 120 metres.",
  },
  {
    floor: "55",
    label: "Sky Lobby 2",
    body: "High-rise transfer hub. Second business lounge, breakout facilities, and express VIP elevator access to the executive crown.",
  },
  {
    floor: "80",
    label: "Executive Crown",
    body: "The highest business address in Kuwait. VIP floor with dedicated reception, panoramic observation, and the At The Top restaurant.",
  },
];

const LOBBY_FEATURES = [
  { number: "01", title: "Two Sky Lobbies",       body: "Transfer floors at Level 30 and Level 55 — each a fully equipped business centre with panoramic views and executive lounge facilities." },
  { number: "02", title: "VIP Direct Access",     body: "Dedicated VIP elevators run non-stop from the ground lobby to the crown. Separate from general tenant traffic." },
  { number: "03", title: "8 Express Units",       body: "High-speed express elevators at 6 m/s connect the ground floor directly to sky lobby transfer points." },
  { number: "04", title: "Zero-Wait Strategy",    body: "Staggered destination dispatch across three elevator zones — low, mid, and high rise — minimises lobby congestion at peak hours." },
];

export function VerticalTransportation() {
  return (
    <PageLayout>
      <PageHero
        tag="Business · Vertical Movement"
        title="Vertical Transportation"
        subtitle="The tower's vertical transportation strategy ensures efficient flow for tenants and visitors with multiple elevators and strategically placed transfer floors."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Vertical Transportation", href: "/business/vertical-transportation" }]}
      />
      <StatsBar stats={[{ number: "43", label: "Total Elevators" }, { number: "8", label: "Express Units" }, { number: "6", unit: "m/s", label: "Max Speed" }]} />

      {/* Elevator corridor — new: lobby-elevator-corridor.jpg (warm travertine + lamella framing) */}
      <div style={{ position: "relative", height:"clamp(260px,38vw,480px)", overflow: "hidden" }}>
        <img src="/assets/lobby-elevator-corridor.jpg" alt="Al Hamra Tower — elevator corridor with lamella structure"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.65) 0%, rgba(29,29,27,0.1) 60%, transparent 100%)" }} />
        <div className="photo-overlay-text" style={{ position: "absolute", bottom: 0, left: 0, top: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>
            Lobby Level · Elevator Hall · Lamella Structure
          </p>
          <h3 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(20px,2.2vw,36px)", fontWeight: 200, color: "#fff", lineHeight: 1.25 }}>
            43 elevators.<br /><strong style={{ fontWeight: 500 }}>One seamless ascent.</strong>
          </h3>
        </div>
      </div>

      <Section>
        <Rv><Tag>Sky Lobby Transfer Points</Tag></Rv>
        <Rv delay={0.1}><H2>The Vertical Journey</H2></Rv>
        <div className="grid-4col" style={{ gap:1, background:"rgba(29,29,27,0.09)", marginTop:48 }}>
          {ASCENT.map(({ floor, label, body }, i) => (
            <Rv key={floor} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "36px 28px", height: "100%" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: 36, fontWeight: 300, color: "#1D1D1B", lineHeight: 1, marginBottom: 8 }}>{floor}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#767676", marginBottom: 12 }}>{label}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12.5px", color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag>Elevator System Architecture</Tag></Rv>
        <Rv delay={0.1}><H2>Elevator Routes</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ marginTop: 40 }}>
            {[
              { name: "Express to Sky Lobby 55", floors: "G → 55", speed: "6 m/s", cap: "24 persons" },
              { name: "Express to Sky Lobby 30", floors: "G → 30", speed: "6 m/s", cap: "24 persons" },
              { name: "Low-Rise Local",          floors: "G → 20", speed: "4 m/s", cap: "16 persons" },
              { name: "Mid-Rise Local",          floors: "30 → 50",speed: "4 m/s", cap: "16 persons" },
              { name: "High-Rise Local",         floors: "55 → 80",speed: "4 m/s", cap: "16 persons" },
            ].map(({ name, floors, speed, cap }, i) => (
              <div key={name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "18px 0", borderBottom: i < 4 ? "1px solid rgba(29,29,27,0.07)" : "none", gap: 24 }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 400, color: "#1D1D1B" }}>{name}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "22px", fontWeight: 300, color: "#1D1D1B" }}>{floors}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{speed}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{cap}</div>
              </div>
            ))}
          </div>
        </Rv>
      </Section>

      <Section>
        <Rv><Tag>Sky Lobby Features</Tag></Rv>
        <Rv delay={0.1}><H2>Vertical Connectivity for Business</H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={LOBBY_FEATURES} /></Rv>
      </Section>

      <DarkBand title="Explore Connectivity &amp; Integration" ctaLabel="District Integration" ctaHref="/business/connectivity" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   CONNECTIVITY  /business/connectivity
══════════════════════════════════════════════════ */
const CONNECTIVITY_FEATURES = [
  {
    number: "01",
    title: "Al Hamra Shopping Center",
    body: "Direct internal access to a premium retail destination featuring international brands, dining, and lifestyle services — all within the Al Hamra complex.",
    url: "https://www.alhamracenter.com",
  },
  { number: "02", title: "On-Site Amenities",    body: "Ground-floor cafés, restaurants, banking services, and business support facilities ensure daily convenience without leaving the complex." },
  { number: "03", title: "Transport Links",      body: "Proximity to major arterial roads and Kuwait's developing public transit infrastructure. 11-level car park with 2,000+ spaces and dedicated VIP access." },
  { number: "04", title: "District Integration", body: "Positioned in Sharq, Kuwait City's central business district, within walking distance of government ministries, embassies, and the financial corridor." },
];

export function Connectivity() {
  return (
    <PageLayout>
      <PageHero
        tag="Business · Connectivity"
        title="Connectivity & Integration"
        subtitle="Al Hamra Tower is more than an office building — it is the center of a fully integrated urban district connecting retail, dining, transport, and government infrastructure."
        crumbs={[{ label: "Home", href: "/" }, { label: "Business", href: "/business" }, { label: "Connectivity", href: "/business/connectivity" }]}
      />
      <StatsBar stats={[
        { number: "2,000+", label: "Parking Spaces"      },
        { number: "11",     label: "Parking Levels"      },
        { number: "90+",    label: "Retail Outlets"      },
        { number: "5",      unit: "min", label: "To Government District" },
      ]} />
      <Section>
        <Rv><Tag>The Sharq District · Kuwait City's Commercial Heart</Tag></Rv>
        <Rv delay={0.1}><H2>Integrated Ecosystem</H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 48 }}>The Al Hamra complex integrates a premier shopping center, extensive car parking, and direct connections to Kuwait City's central business corridor — creating a self-contained environment for professionals.</Body></Rv>
        <Rv delay={0.3}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(29,29,27,0.09)" }}>
            {CONNECTIVITY_FEATURES.map(({ number, title, body, url }: { number: string; title: string; body: string; url?: string }) => (
              <div key={number}
                style={{ background: "#fff", padding: "28px 26px", transition: "background 0.3s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
              >
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color: "#767676", letterSpacing: "0.2em", marginBottom: 10 }}>{number}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8, letterSpacing: "0.04em" }}>{title}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12px", color: "#6B6B6B", lineHeight: 1.6, marginBottom: url ? 14 : 0 }}>{body}</div>
                {url && (
                  <a href={url} target="_blank" rel="noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#1D1D1B", textDecoration: "none",
                      borderBottom: "1px solid rgba(29,29,27,0.25)",
                      paddingBottom: 2, transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#767676"; e.currentTarget.style.borderColor = "rgba(29,29,27,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#1D1D1B"; e.currentTarget.style.borderColor = "rgba(29,29,27,0.25)"; }}
                  >
                    Visit alhamracenter.com
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </Rv>
      </Section>
      <DarkBand title="Ready to Secure Your Space?" subtitle="Contact our leasing team for availability aligned to your business needs." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry#inquiry-form" />
    </PageLayout>
  );
}
