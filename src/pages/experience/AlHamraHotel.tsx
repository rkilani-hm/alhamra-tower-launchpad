import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, StatsBar, DarkBand } from "@/components/shared/ui";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Al Hamra Hotel — /hotel ─────────────────────────────────────────
   Content sourced directly from:
   Al_Hamra_Business_Tower_Website — "Al Hamra Hotel" sheet
   Column C (Content) organized per Column A / Column B hierarchy.

   Five beats:
   1. HERO          — premium hospitality within Al Hamra's ecosystem
   2. OVERVIEW      — Refined. Seamless. Elevated.
   3. DISTINCT      — 5 bullet advantages
   4. GUEST EXP     — 5 service categories (accommodation, dining, business
                      access, wellness, parking)
   5. CTA           — reservations
──────────────────────────────────────────────────────────────────────── */

const ADVANTAGES = [
  { num: "01", text: "Strategic location within Kuwait's leading mixed-use destination" },
  { num: "02", text: "Direct connectivity to Business Tower and Shopping Centre" },
  { num: "03", text: "Designed for both short and extended stays" },
  { num: "04", text: "Access to curated retail, dining, and lifestyle offerings" },
  { num: "05", text: "Supported by Al Hamra's integrated infrastructure" },
];

const SERVICES = [
  {
    num: "01",
    title: "Accommodation",
    body: "Well-appointed rooms and suites designed for comfort, privacy, and functional efficiency — a refined retreat following a day of institutional business.",
    image: "/assets/sky-lobby-mirror-lounge.jpg",
    imageCaption: "Hotel Suite · Refined Interior",
  },
  {
    num: "02",
    title: "Dining & In-Room Services",
    body: "Access to on-site dining options and in-room services, complemented by direct connectivity to Al Hamra Shopping Centre's restaurants and cafés.",
    image: "/assets/mall-atrium-luxury-centre.jpg",
    imageCaption: "Shopping Centre · Culinary Access",
  },
  {
    num: "03",
    title: "Business & Meeting Access",
    body: "Proximity to Al Hamra Business Centre enables seamless access to meeting rooms, training facilities, and corporate services — a fully integrated institutional stay.",
    image: "/assets/boardroom-wide.jpg",
    imageCaption: "Business Centre · Direct Connectivity",
  },
  {
    num: "04",
    title: "Wellness & Leisure",
    body: "Access to fitness and wellness facilities designed to support balance and well-being during the stay, with views across Kuwait City and the Arabian Gulf.",
    image: "/assets/high-floor-view-lounge.jpg",
    imageCaption: "Wellness Lounge · Gulf Views",
  },
  {
    num: "05",
    title: "Parking & Accessibility",
    body: "Dedicated parking, valet services, and direct access to the wider Al Hamra complex ensure ease of movement across the destination.",
    image: "/assets/entrance-night-wide.jpg",
    imageCaption: "Complex Entrance · Dedicated Valet",
  },
];

export default function AlHamraHotel() {
  return (
    <PageLayout>
      <PageHero
        tag="Experience · Hospitality"
        title="Al Hamra Hotel"
        subtitle="A premium hospitality destination within Al Hamra's integrated ecosystem — designed for business and leisure travellers alike."
        image="/assets/skyline-gulf-night.jpg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Experience", href: "/services" },
          { label: "Al Hamra Hotel", href: "/hotel" },
        ]}
      />

      <StatsBar stats={[
        { number: "01", label: "Integrated Destination" },
        { number: "Direct", label: "Tower & Centre Access" },
        { number: "24/7", label: "Guest Services" },
        { number: "Sharq", label: "Kuwait City" },
      ]} />

      {/* ── HERO FULL-BLEED ───────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <img
          loading="lazy"
          src="/assets/lobby-atrium-dramatic.jpg"
          alt="Al Hamra Hotel — refined interior within the Al Hamra destination"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%" }}
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
            A Premium Destination · Kuwait City · Sharq District
          </div>
          <h3 style={{
            fontFamily: CG, fontSize: "clamp(22px,2.5vw,38px)",
            fontWeight: 200, color: "#fff", lineHeight: 1.25,
            margin: 0, maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            A fully integrated stay — <strong style={{ fontWeight: 500 }}>within a singular destination.</strong>
          </h3>
        </div>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      <Section>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(48px,6vw,96px)",
        }} className="hotel-overview-grid">
          <div>
            <Rv><Tag>Overview · The Experience</Tag></Rv>
            <Rv delay={0.1}>
              <H2>
                Refined.<br />
                Seamless.<br />
                <em style={{ color: PEARL_TEXT, fontStyle: "normal" }}>Elevated.</em>
              </H2>
            </Rv>
          </div>
          <div>
            <Rv delay={0.2}>
              <Body style={{ marginBottom: 20 }}>
                Located within the Al Hamra development, the hotel offers a premium
                hospitality experience designed for business and leisure travellers alike.
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body>
                With direct connectivity to the Business Tower and Shopping Centre, it
                provides a fully integrated stay — combining comfort, accessibility,
                and operational convenience within one unified destination.
              </Body>
            </Rv>
          </div>
        </div>
      </Section>

      {/* ── DISTINCT ADVANTAGE ─────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag>Why Al Hamra Hotel · Distinct Advantage</Tag></Rv>
        <Rv delay={0.1}><H2>Five dimensions of an integrated stay.</H2></Rv>
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

      {/* ── GUEST EXPERIENCE — 5 service categories ────────────────── */}
      <Section>
        <Rv><Tag>Hotel Services & Facilities · Guest Experience</Tag></Rv>
        <Rv delay={0.1}><H2>Every aspect, considered.</H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            Five service dimensions combine to deliver a seamless hospitality experience —
            from refined accommodation to curated access across the wider Al Hamra destination.
          </Body>
        </Rv>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(20px,3vw,36px)",
        }}>
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.num}
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
                  src={s.image}
                  alt={`${s.title} — ${s.imageCaption}`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  background: "rgba(29,29,27,0.82)",
                  color: PEARL, padding: "6px 12px",
                  fontFamily: CG, fontSize: "10px", letterSpacing: "0.28em",
                  backdropFilter: "blur(8px)",
                }}>
                  {s.num}
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
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  {s.body}
                </p>
                <div style={{
                  fontFamily: CG, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: PEARL_TEXT,
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(200,185,154,0.25)",
                }}>
                  {s.imageCaption}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <DarkBand
        title="Plan your stay."
        subtitle="For reservations and inquiries, please contact the Al Hamra Hotel team directly. A fully integrated stay, within a singular destination."
        ctaLabel="Make a Reservation"
        ctaHref="/leasing/inquiry#inquiry-form"
      />

      <style>{`
        @media (max-width: 900px) {
          .hotel-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
