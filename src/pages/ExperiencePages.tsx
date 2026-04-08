import { useState } from "react";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

/* ══════════════════════════════════════════════════
   SERVICES & FACILITIES  /services
══════════════════════════════════════════════════ */
const SYSTEMS = [
  { number: "01", title: "Electrical Systems",       body: "Five dedicated substations deliver uninterrupted power. Full generator redundancy ensures zero-downtime continuity for every tenanted floor." },
  { number: "02", title: "Water Supply & Plumbing",  body: "Centralised water distribution with booster pump stations serving all 77 floors. 24-hour leak response maintains consistent pressure and quality." },
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
      <StatsBar stats={[{ number: "24/7", label: "Operations" }, { number: "365", label: "Days Per Year" }, { number: "6", label: "Core Building Systems" }]} />

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

      <Section>
        <Rv><Tag>Tenant Support · Comprehensive Daily Support</Tag></Rv>
        <Rv delay={0.1}><H2>Present When You Need It</H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={TENANT} /></Rv>
        <Rv delay={0.4}>
          <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(18px,2vw,26px)", fontStyle: "italic", fontWeight: 300, color: "#B2B2B2", lineHeight: 1.65, maxWidth: 720, marginTop: 60 }}>
            "Behind every seamless day at Al Hamra Tower stands an infrastructure of precision — engineering teams, monitoring systems, and service protocols working in concert."
          </p>
        </Rv>
      </Section>

      <DarkBand title="Secure Your Position" subtitle="Ready to experience Al Hamra Tower's world-class environment? Speak with our leasing team today." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry" />
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
        { number: "5",   unit: " min", label: "To Government District" },
        { number: "2,000+", label: "Parking Spaces" },
        { number: "Sharq", label: "Kuwait City District" },
      ]} />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <Rv><Tag>Sharq District · Kuwait City</Tag></Rv>
            <Rv delay={0.1}><H2>Kuwait City's Commercial Heart</H2></Rv>
            <Rv delay={0.2}><Body>The tower is situated at 29.3759° N, 47.9774° E in Sharq — Kuwait City's central business district where governance, commerce, and culture converge. Direct access to major arterial roads and Kuwait City's central transport corridors.</Body></Rv>
            <Rv delay={0.3}>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column" as const, gap: 0 }}>
                {[
                  { label: "Address",     value: "Al Hamra Tower, Sharq, Kuwait City, Kuwait" },
                  { label: "Coordinates", value: "29.3759° N, 47.9774° E" },
                  { label: "District",    value: "Sharq — Kuwait City's Central Business District" },
                  { label: "Transport",   value: "Direct access to major arterial roads" },
                ].map(({ label, value }, i) => (
                  <div key={label} style={{ display: "flex", gap: 24, padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none" }}>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B2B2B2", minWidth: 110, flexShrink: 0, paddingTop: 2 }}>{label}</div>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: "13.5px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
          <Rv delay={0.15}>
            {/* Map placeholder */}
            <div style={{
              width: "100%", height: 420,
              background: "#F7F6F4",
              border: "1px solid rgba(29,29,27,0.09)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column" as const, gap: 12,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="rgba(29,29,27,0.2)"/>
              </svg>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B2B2B2" }}>Sharq, Kuwait City</div>
              <a href="https://maps.google.com/?q=Al+Hamra+Tower+Kuwait" target="_blank" rel="noreferrer"
                style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1D1D1B", textDecoration: "none", borderBottom: "1px solid rgba(29,29,27,0.3)", paddingBottom: 2 }}>
                Get Directions
              </a>
            </div>
          </Rv>
        </div>
      </Section>

      <DarkBand title="Secure Your Position in Sharq" subtitle="Contact our leasing team to discuss available configurations at Kuwait City's premier business address." ctaLabel="Leasing Inquiry" ctaHref="/leasing/inquiry" />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LEASING OPPORTUNITIES  /leasing
══════════════════════════════════════════════════ */
const LEASING_CONFIGS = [
  { code: "01", title: "Executive Suite",  size: "250–500 m²",     bullets: ["Corner office configuration","Panoramic city views","Private meeting room"] },
  { code: "02", title: "Full Floor",       size: "1,200–1,800 m²", bullets: ["Entire floor exclusivity","Private elevator access","Dedicated reception"] },
  { code: "03", title: "Corporate HQ",    size: "3,000+ m²",      bullets: ["Multiple floors available","Building signage rights","Dedicated parking levels"] },
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
      <StatsBar stats={[{ number: "3.2", unit: "m", label: "Ceiling Height" }, { number: "360°", label: "Views" }, { number: "4", label: "Premium Amenities" }]} />

      <Section>
        <Rv><Tag>Available Configurations</Tag></Rv>
        <Rv delay={0.1}><H2>Premium Office Spaces</H2></Rv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 48 }}>
          {LEASING_CONFIGS.map(({ code, title, size, bullets }, i) => (
            <Rv key={code} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "44px 36px", height: "100%" }}>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 14 }}>Configuration {code}</div>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "16px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{title}</div>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "36px", fontWeight: 300, color: "#B2B2B2", lineHeight: 1, marginBottom: 20 }}>{size}</div>
                {bullets.map(b => (
                  <div key={b} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#B2B2B2" }}>—</span>
                    <span style={{ fontFamily: "Jost,sans-serif", fontSize: "12px", color: "#6B6B6B", lineHeight: 1.7 }}>{b}</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 40 }}>
          {[
            { label: "Grand Lobby Access", desc: "24m column-free arrival experience" },
            { label: "3.2m Ceiling Height", desc: "Generous floor-to-ceiling proportions" },
            { label: "Conference Center", desc: "Shared executive-grade facilities" },
            { label: "Flexible Terms", desc: "Configurations tailored to your timeline" },
          ].map(({ label, desc }) => (
            <div key={label} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "11.5px", color: "#6B6B6B", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <DarkBand title="Secure Your Position" subtitle="Contact our leasing team for availability, floor plans, and pricing." ctaLabel="Submit Inquiry" ctaHref="/leasing/inquiry" />
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
    fontFamily: "Jost,sans-serif", fontSize: "14px", fontWeight: 300,
    color: "#1D1D1B", background: "transparent", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <PageLayout>
      <PageHero
        tag="Leasing · Inquiry"
        title="Leasing & General Inquiries"
        subtitle="Share your requirements and timeline. Our leasing team will respond with options aligned to your business needs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Inquiry", href: "/leasing/inquiry" }]}
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
          {/* Form */}
          <Rv>
            {sent ? (
              <div style={{ padding: "60px 0" }}>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "32px", fontWeight: 300, color: "#1D1D1B", marginBottom: 12 }}>Inquiry Received</div>
                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "14px", color: "#6B6B6B" }}>Our leasing team will respond within one business day.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {(["name","email","subject"] as const).map(field => (
                  <div key={field}>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 8 }}>{field}</div>
                    <input
                      type={field === "email" ? "email" : "text"}
                      required
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 8 }}>Message</div>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>
                <button type="submit" style={{
                  alignSelf: "flex-start",
                  background: "#1D1D1B", color: "#fff",
                  fontFamily: "Jost,sans-serif", fontSize: "10.5px", fontWeight: 500,
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
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "14px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
                </div>
              ))}
            </div>
          </Rv>
        </div>
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
                    <span style={{ fontFamily: "Jost,sans-serif", fontSize: "15px", fontWeight: 500, color: "#1D1D1B" }}>{title}</span>
                    <span style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2", border: "1px solid rgba(29,29,27,0.12)", padding: "3px 8px" }}>{format} · {size}</span>
                  </div>
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: "12.5px", color: "#6B6B6B" }}>{desc}</div>
                </div>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0,
                  background: "none", border: "1px solid rgba(29,29,27,0.2)", cursor: "pointer",
                  fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.2em",
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
      <DarkBand title="Ready to Enquire?" ctaLabel="Submit Inquiry" ctaHref="/leasing/inquiry" />
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(29,29,27,0.09)" }}>
          {[
            { label: "Phone",   value: "+965 2227 0000" },
            { label: "Email",   value: "info@alhamratower.com" },
            { label: "Hours",   value: "Sun – Thu · 8:00 AM – 6:00 PM" },
            { label: "Address", value: "Al Hamra Tower, Sharq, Kuwait City, Kuwait" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#fff", padding: "44px 36px" }}>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B2B2B2", marginBottom: 14 }}>{label}</div>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "15px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="#FAFAFA">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
          <Rv>
            <Tag>Social Media</Tag>
            <H2>Follow Al Hamra Tower</H2>
            {[
              { name: "Instagram", url: "https://www.instagram.com/alhamratower"                          },
              { name: "Facebook",  url: "https://www.facebook.com/AlHamraTowerofficial"                   },
              { name: "X (Twitter)",url: "https://x.com/AlHamraTower"                                    },
              { name: "LinkedIn",  url: "https://www.linkedin.com/company/al-hamra-real-estate-company"  },
              { name: "YouTube",   url: "https://www.youtube.com/@alhamratower"                           },
            ].map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 0",
                  borderBottom: "1px solid rgba(29,29,27,0.07)", textDecoration: "none",
                  fontFamily: "Jost,sans-serif", fontSize: "13px", color: "#1D1D1B",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#B2B2B2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1D1D1B")}
              >
                <span style={{ width: 20, height: 1, background: "rgba(29,29,27,0.15)" }} />
                {name}
              </a>
            ))}
          </Rv>
          <Rv delay={0.15}>
            <Tag>Leasing Team</Tag>
            <H2>Dedicated Support</H2>
            <Body>Our leasing team is available to discuss available configurations, floor plans, pricing, and customisation options. Contact us directly for a response within one business day.</Body>
            <a href="/leasing/inquiry" style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginTop: 36,
              background: "#1D1D1B", color: "#fff",
              fontFamily: "Jost,sans-serif", fontSize: "10.5px", fontWeight: 500,
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
