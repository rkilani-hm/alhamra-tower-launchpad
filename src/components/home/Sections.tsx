import { ScrollReveal } from "../shared/ScrollReveal";
import { Link } from "react-router-dom";

// ── PERSPECTIVES ──────────────────────────────────────────
const PERSP = [
  { n: "01", title: "Recognition",   body: "CTBUH Best Tall Building, MIPIM Architectural Review, Emirates Glass LEAF Award, and multiple international accolades affirming engineering and aesthetic legacy." },
  { n: "02", title: "Business Value",body: "Flexible floor plates, efficient vertical circulation, professional building systems, and integration with daily services — a cohesive ecosystem for business excellence." },
  { n: "03", title: "Location",      body: "Sharq, Kuwait City's central business district. Direct proximity to financial institutions, government entities, and 2,000+ parking spaces across 11 levels." },
];

export function Perspectives() {
  return (
    <div style={{ /* grid-3col */ }}>
      {PERSP.map(({ n, title, body }, i) => (
        <ScrollReveal key={n} delay={i * 0.1}>
          <div
            style={{ padding: "52px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", transition: "background 0.3s", height: "100%" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
          >
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 44, fontWeight: 300, color: "#EDEDED", lineHeight: 1, marginBottom: 16 }}>{n}</div>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, color: "#1D1D1B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: "12.5px", color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

// ── FLOOR CONFIGURATIONS ──────────────────────────────────
const FLOORS = [
  { code: "Configuration 01", title: "Executive Suite", size: "250–500 m²", body: "Corner office configuration with panoramic city views and private meeting room. Ideal for regional offices and professional firms." },
  { code: "Configuration 02", title: "Full Floor",      size: "1,200–1,800 m²", body: "Entire floor exclusivity with private elevator access and dedicated reception. 3.2m ceiling height with 360° views." },
  { code: "Configuration 03", title: "Corporate HQ",   size: "3,000+ m²", body: "Multiple floors with building signage rights and dedicated parking levels. Kuwait's premier headquarters address." },
];

export function FloorConfigs() {
  return (
    <div className="grid-3col" style={{ background:"#FAFAFA" }}>
      {FLOORS.map(({ code, title, size, body }, i) => (
        <ScrollReveal key={code} delay={i * 0.1}>
          <div
            style={{ padding: "56px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", borderTop: "1px solid rgba(29,29,27,0.09)", position: "relative", overflow: "hidden", transition: "background 0.3s", height: "100%" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#fff";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.height = "100%";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#FAFAFA";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.height = "0";
            }}
          >
            <div className="left-bar" style={{ position: "absolute", top: 0, left: 0, width: 2, height: 0, background: "#1D1D1B", transition: "height 0.4s ease" }} />
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#767676", marginBottom: 16 }}>{code}</div>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: 16, fontWeight: 500, color: "#1D1D1B", marginBottom: 12, letterSpacing: "0.04em" }}>{title}</div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, fontWeight: 300, color: "#767676", lineHeight: 1, marginBottom: 16 }}>{size}</div>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: 12, color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

// ── LEASING BAND ──────────────────────────────────────────
export function LeasingBand() {
  return (
    <section
      id="leasing"
      className="leasing-band" style={{ background:"#1D1D1B" }}
    >
      <ScrollReveal>
        <div style={{ maxWidth: 500 }}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>
            Leasing Opportunities
          </p>
          <h3 style={{ fontFamily: "Jost, sans-serif", fontSize: "clamp(24px, 2.5vw, 42px)", fontWeight: 200, color: "#fff", lineHeight: 1.25, marginBottom: 0 }}>
            Secure your position<br />at Kuwait's<br />
            <strong style={{ fontWeight: 500 }}>premier address</strong>
          </h3>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginTop: 16 }}>
            Whether you require a full-floor headquarters, a customized configuration,
            or a long-term corporate base — our leasing team will guide you through
            available opportunities.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          <Link
            to="/leasing"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: "#1D1D1B",
              fontFamily: "Jost, sans-serif", fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "16px 36px", textDecoration: "none", whiteSpace: "nowrap",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Request Availability
          </Link>
          <Link
            to="/leasing/downloads"
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "Jost, sans-serif", fontSize: "10.5px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <span style={{ width: 36, height: 1, background: "currentColor", transition: "width 0.3s" }} />
            Download Brochure
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ── CONTACT STRIP ──────────────────────────────────────────
const CONTACTS = [
  { label: "Phone",   value: "+965 2227 5000" },
  { label: "Email",   value: "leasing@alhamratower.com" },
  { label: "Hours",   value: "Sun – Thu · 8:00 AM – 6:00 PM" },
  { label: "Address", value: "Sharq, Kuwait City, Kuwait" },
];

export function ContactStrip() {
  return (
    <div className="grid-4col" style={{ borderTop:"1px solid rgba(29,29,27,0.09)" }}>
      {CONTACTS.map(({ label, value }, i) => (
        <ScrollReveal key={label} delay={i * 0.1}>
          <div style={{ padding: "44px 48px", borderRight: "1px solid rgba(29,29,27,0.09)", height: "100%" }}>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#767676", marginBottom: 12 }}>{label}</div>
            <div style={{ fontFamily: "Jost, sans-serif", fontSize: "14.5px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
