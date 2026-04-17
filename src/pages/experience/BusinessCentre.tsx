import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, StatsBar, DarkBand } from "@/components/shared/ui";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Business Centre — /business-centre ──────────────────────────────
   Content sourced directly from:
   Al_Hamra_Business_Tower_Website — "Business Center" sheet
   Column C (Content) organized per Column A (Section) / Column B
   (Subsection) hierarchy.

   Five beats:
   1. HERO           — 36th floor positioning
   2. OVERVIEW       — Focused. Composed. Elevated.
   3. STRATEGIC      — 5 bullet advantages
   4. FACILITIES     — 6 categories of executive services
   5. CTA            — booking strip
──────────────────────────────────────────────────────────────────────── */

const ADVANTAGES = [
  { num: "01", text: "Landmark location within Kuwait's premier development" },
  { num: "02", text: "Elevated setting that enhances focus and clarity" },
  { num: "03", text: "End-to-end operational coordination" },
  { num: "04", text: "Configurable layouts and flexible pricing" },
  { num: "05", text: "Supported by Al Hamra's integrated infrastructure" },
];

const FACILITIES = [
  {
    num: "01",
    title: "Spatial Configuration & Capacity",
    body: "Configurable layouts including boardroom settings, seminar arrangements, and collaborative workshop formats. Seating capacities and final layouts are tailored to each session's requirements.",
    image: "/assets/boardroom-wide.jpg",
    imageCaption: "Primary Boardroom · Configurable Layouts",
  },
  {
    num: "02",
    title: "Integrated Systems",
    body: "A fully integrated audio-visual system with smart controls and dedicated IT support ensures uninterrupted presentations, conferencing, and digital connectivity.",
    image: "/assets/meeting-room-glass-pattern.jpg",
    imageCaption: "Meeting Room · AV + Smart Controls",
  },
  {
    num: "03",
    title: "Catering & Hospitality",
    body: "Direct access to Al Hamra Shopping Center allows curated catering options from restaurant tenants, diverse dining choices for coffee breaks and meals, preferential arrangements where applicable, and the option to engage external caterers.",
    image: "/assets/mall-atrium-luxury-centre.jpg",
    imageCaption: "Al Hamra Luxury Centre · Curated Catering",
  },
  {
    num: "04",
    title: "Parking & Access",
    body: "Guests benefit from structured parking within the Al Hamra complex, shuttle connectivity to Dasman Parking, valet services, and ride-service access, ensuring practical and efficient arrival.",
    image: "/assets/entrance-night.jpg",
    imageCaption: "Grand Entrance · Valet + Structured Parking",
  },
  {
    num: "05",
    title: "Premium Touchpoints",
    body: "Business Hub-branded stationery and a professionally managed environment aligned with Al Hamra's corporate standards.",
    image: "/assets/lobby-executive-lounge.jpg",
    imageCaption: "Executive Lounge · Branded Environment",
  },
  {
    num: "06",
    title: "Accommodation",
    body: "Visiting trainers and guest speakers may access special corporate rates at Al Hamra Hotel, located within the complex, ensuring convenience and continuity.",
    image: "/assets/sky-lobby-travertine-corridor.jpg",
    imageCaption: "Al Hamra Hotel · Preferred Corporate Rates",
  },
];

export default function BusinessCentre() {
  return (
    <PageLayout>
      <PageHero
        tag="Experience · Business Centre"
        title="Al Hamra Business Centre"
        subtitle="An executive business facility within Al Hamra Business Tower. Configurable rooms for high-level convenings — purpose-built for corporate engagements."
        image="/assets/city-view-office.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Experience", href: "/services" },
          { label: "Business Centre", href: "/business-centre" },
        ]}
      />

      <StatsBar stats={[
        { number: "36", label: "Floor Level" },
        { number: "∞",  label: "Configurable Layouts" },
        { number: "24/7", label: "Operational Support" },
        { number: "412m", label: "Tower Elevation" },
      ]} />

      {/* ── HERO CAROUSEL-STYLE FULL-BLEED IMAGE ──────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <img
          loading="lazy"
          src="/assets/boardroom-gulf-view.jpg"
          alt="Al Hamra Business Centre — Boardroom on the 36th floor overlooking the Arabian Gulf"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(29,29,27,0.35) 0%, transparent 30%, transparent 60%, rgba(29,29,27,0.85) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: "clamp(32px,5vh,56px)", left: "clamp(24px,5vw,80px)", right: "clamp(24px,5vw,80px)" }}>
          <div style={{
            fontFamily: CG, fontSize: "10px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL, marginBottom: 12,
          }}>
            36<sup style={{ fontSize: "60%", top: "-0.5em", position: "relative" }}>th</sup> Floor · Kuwait City &amp; the Arabian Gulf
          </div>
          <h3 style={{
            fontFamily: CG, fontSize: "clamp(22px,2.5vw,38px)",
            fontWeight: 200, color: "#fff", lineHeight: 1.25,
            margin: 0, maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            Executive convenings, <strong style={{ fontWeight: 500 }}>at the altitude of institutions.</strong>
          </h3>
        </div>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      <Section>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(48px,6vw,96px)",
        }} className="bc-overview-grid">
          <div>
            <Rv><Tag>Overview · The Space</Tag></Rv>
            <Rv delay={0.1}>
              <H2>
                Focused.<br />
                Composed.<br />
                <em style={{ color: PEARL_TEXT, fontStyle: "normal" }}>Elevated.</em>
              </H2>
            </Rv>
          </div>
          <div>
            <Rv delay={0.2}>
              <Body style={{ marginBottom: 20 }}>
                Located on the 36th floor, the Al Hamra Business Centre offers a
                purpose-built environment for corporate meetings, executive workshops,
                training sessions, and high-level convenings.
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body>
                Available to institutions, companies, and individuals, supported by
                on-site operational coordination to ensure seamless oversight — from
                the first inquiry to the final engagement.
              </Body>
            </Rv>
          </div>
        </div>
      </Section>

      {/* ── STRATEGIC ADVANTAGE ────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Why Al Hamra Business Centre · Strategic Advantage</Tag></Rv>
        <Rv delay={0.1}><H2>Five reasons institutions choose this address.</H2></Rv>
        <Rv delay={0.2}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(16px,2vw,24px)",
            marginTop: "clamp(32px,5vh,56px)",
          }}>
            {ADVANTAGES.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "clamp(22px,3vh,32px) clamp(20px,2vw,28px)",
                  background: "#fff",
                  borderTop: `1px solid rgba(200,185,154,0.4)`,
                  display: "flex", flexDirection: "column", gap: 14,
                }}
              >
                <div style={{
                  fontFamily: CG, fontSize: "11px", letterSpacing: "0.28em",
                  color: PEARL_TEXT, fontWeight: 300,
                }}>
                  {a.num}
                </div>
                <div style={{
                  fontFamily: CG, fontSize: "clamp(13px,1.1vw,15px)",
                  color: DARK, fontWeight: 300, lineHeight: 1.65,
                }}>
                  {a.text}
                </div>
              </motion.div>
            ))}
          </div>
        </Rv>
      </Section>

      {/* ── EXECUTIVE FACILITIES — 6 cards with images ─────────────── */}
      <Section>
        <Rv><Tag>Business Support Services · Executive Facilities</Tag></Rv>
        <Rv delay={0.1}><H2>A comprehensively managed executive environment.</H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            Al Hamra Business Centre provides integrated infrastructure and operational
            services designed to ensure efficiency, continuity, and professional excellence
            across every session.
          </Body>
        </Rv>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(20px,3vw,36px)",
        }}>
          {FACILITIES.map((f, i) => (
            <motion.article
              key={f.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "#fff" }}
            >
              {/* Image */}
              <div style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                background: "#0c0b09",
              }}>
                <img
                  loading="lazy"
                  src={f.image}
                  alt={`${f.title} — ${f.imageCaption}`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                {/* Pearl number badge */}
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  background: "rgba(29,29,27,0.82)",
                  color: PEARL, padding: "6px 12px",
                  fontFamily: CG, fontSize: "10px", letterSpacing: "0.28em",
                  backdropFilter: "blur(8px)",
                }}>
                  {f.num}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "clamp(20px,3vh,28px) clamp(4px,1vw,12px) 0" }}>
                <h3 style={{
                  fontFamily: CG, fontSize: "clamp(16px,1.4vw,20px)",
                  fontWeight: 400, color: DARK, lineHeight: 1.3,
                  margin: "0 0 12px",
                  letterSpacing: "-0.005em",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  {f.body}
                </p>
                <div style={{
                  fontFamily: CG, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: PEARL_TEXT,
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(200,185,154,0.25)",
                }}>
                  {f.imageCaption}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <DarkBand
        title="Host your next meeting."
        subtitle="For bookings and inquiries, contact our team to discuss your requirements. Configurable layouts, flexible pricing, and end-to-end operational coordination."
        ctaLabel="Begin the Conversation"
        ctaHref="/leasing/inquiry#inquiry-form"
      />

      {/* Direct contact detail strip */}
      <div style={{
        background: "#0F0E0C",
        borderTop: "1px solid rgba(200,185,154,0.1)",
        padding: "clamp(32px,5vh,48px) clamp(28px,6vw,96px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "clamp(20px,3vw,48px)",
        }}>
          {[
            { label: "Phone",    value: "1829000" },
            { label: "Website",  value: "www.alhamra.com.kw" },
            { label: "Location", value: "36th Floor · Al Hamra Business Tower" },
          ].map(item => (
            <div key={item.label}>
              <div style={{
                fontFamily: CG, fontSize: "10px", letterSpacing: "0.32em",
                textTransform: "uppercase", color: PEARL,
                marginBottom: 8,
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: CG, fontSize: "clamp(13px,1.1vw,15px)",
                color: "#fff", fontWeight: 300,
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bc-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
