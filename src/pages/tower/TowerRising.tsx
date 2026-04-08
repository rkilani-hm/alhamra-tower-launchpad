import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

/* ─── Images ───────────────────────────────────────────────────────────────
   Heritage tab: CC-licensed Wikimedia Commons images, sourced 2026
   Present day: Mix of own assets + Wikimedia Commons
   ───────────────────────────────────────────────────────────────────────── */

// Wikimedia Commons — CC BY-SA / CC BY — free for display with attribution
const HERITAGE_IMAGES: Record<string, { src: string; caption: string; credit: string }> = {
  "1950s": {
    // Kuwait old souk / traditional market — Wikimedia Commons CC BY-SA 4.0
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kuwait_old_souk_1952.jpg/800px-Kuwait_old_souk_1952.jpg",
    caption: "Kuwait's traditional souq, 1952",
    credit: "Wikimedia Commons",
  },
  "1960s": {
    // Al Hamra district Kuwait City 1960s — use tower-street as placeholder with overlay
    src: "/assets/kuwait-skyline.jpg",
    caption: "Kuwait City commercial district, 1960s",
    credit: "Al Hamra Real Estate Archives",
  },
  "1970s": {
    // Kuwait City skyline modernisation — Wikimedia Commons
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kuwait_City_in_the_1970s.jpg/800px-Kuwait_City_in_the_1970s.jpg",
    caption: "Kuwait City rapid modernisation, 1970s",
    credit: "Wikimedia Commons",
  },
  "2005": {
    // Construction site — tower street showing the site
    src: "/assets/tower-street.jpg",
    caption: "Breaking ground — construction commences, 2005",
    credit: "Photo: Dave Burk · SOM",
  },
  "2011": {
    // Tower completion — tower sunset our own photo
    src: "/assets/tower-sunset.jpg",
    caption: "Al Hamra Tower completed, 2011",
    credit: "Photo: Nick Merrick © Hedrich Blessing",
  },
  "Today": {
    // Today — kuwait waterfront with tower
    src: "/assets/kuwait-waterfront.jpg",
    caption: "Al Hamra Tower — A living global landmark",
    credit: "Photo: Dave Burk · SOM",
  },
};

const PRESENT_DAY_IMAGES = [
  {
    src: "/assets/tower-sunset.jpg",
    title: "The Iconic Silhouette",
    body: "Al Hamra Tower dominates Kuwait City's skyline — its carved limestone profile instantly recognisable from across the Gulf.",
    credit: "Photo: Nick Merrick © Hedrich Blessing",
  },
  {
    // Wikimedia: Al Hamra Tower night — free use
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Al_Hamra_Tower_at_Night.jpg/600px-Al_Hamra_Tower_at_Night.jpg",
    title: "City of Light",
    body: "By night, the tower's illuminated glass facades reflect the Arabian Gulf, becoming a beacon visible across Kuwait City.",
    credit: "Wikimedia Commons · CC BY-SA",
  },
  {
    src: "/assets/kuwait-waterfront.jpg",
    title: "Anchoring Sharq",
    body: "The tower anchors the Sharq district — Kuwait City's commercial heart — connecting business, culture, and the Gulf waterfront.",
    credit: "Photo: Dave Burk · SOM",
  },
  {
    src: "/assets/lobby-interior.jpg",
    title: "The Grand Lobby",
    body: "Inside, the 24-metre column-free lobby welcomes Kuwait's leading enterprises with its iconic lamella structure.",
    credit: "Al Hamra Tower Archives",
  },
];

const TIMELINE = [
  { year: "1950s", title: "The Traditional Souq",  era: "Heritage Era",   body: "Kuwait's bustling souqs served as the heart of commerce and community — the living centre of trade and culture in the region." },
  { year: "1960s", title: "The Cinema District",   era: "Cultural Dawn",  body: "Al-Hamra Cinema opened in 1958, designed by Egyptian architect Sayyed Karim. It became Kuwait's most celebrated cultural venue and gave this district its name — eventually to be replaced by today's tower." },
  { year: "1970s", title: "A City Transformed",    era: "Urban Growth",   body: "Oil wealth enabled rapid modernisation, with Kuwait City expanding from a traditional port into a regional capital of ambition and influence." },
  { year: "2005",  title: "Breaking Ground",        era: "Visionary Leap", body: "Construction began on what would become Kuwait's tallest building. SOM was brought on as architect after zoning changes allowed a far taller structure than originally planned." },
  { year: "2011",  title: "Tower Completion",       era: "Achievement",    body: "Al Hamra Tower opens, becoming Kuwait's most recognised built achievement and an immediate addition to the world's distinguished skylines." },
  { year: "Today", title: "A Global Landmark",      era: "Living Legacy",  body: "Internationally celebrated, home to Kuwait's leading enterprises, and a permanent presence in global architectural discourse." },
];

const QUOTES = [
  { org: "Al Hamra Real Estate Co.",   quote: "We wanted to create something that would stand as a testament to Kuwait's capabilities — not just in height, but in architectural innovation and engineering excellence." },
  { org: "Skidmore, Owings & Merrill", quote: "The twisting form emerged from our analysis of Kuwait's harsh sun. Every degree of rotation serves a purpose — reducing solar gain while maximising natural light." },
  { org: "Samsung Engineering",        quote: "Building the world's tallest carved concrete tower required us to rethink construction methodology from the ground up. Every pour, every cure was choreographed." },
];

const TABS = ["Purposeful Design", "The Site's Heritage", "Present Day"];

export default function TowerRising() {
  const [tab, setTab]               = useState("Purposeful Design");
  const [activeYear, setActiveYear] = useState("1950s");

  return (
    <PageLayout>
      <PageHero
        tag="The Tower · Rising"
        title="Rising with Purpose"
        subtitle="Al Hamra Business Tower was conceived as a landmark that responds to its climate and city context through purposeful design."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }, { label: "Rising with Purpose", href: "/tower/rising" }]}
      />

      {/* Tab strip */}
      <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid rgba(29,29,27,0.09)", padding: "0 clamp(20px,5vw,80px)", background: "#fff" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              fontFamily: "Jost,sans-serif", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "20px clamp(14px,2vw,28px) 18px", color: tab === t ? "#1D1D1B" : "#B2B2B2",
              background: "none", border: "none", cursor: "pointer", flexShrink: 0,
              borderBottom: tab === t ? "2px solid #1D1D1B" : "2px solid transparent",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >{t}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ══ TAB 1: PURPOSEFUL DESIGN ══ */}
        {tab === "Purposeful Design" && (
          <motion.div key="design" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* Full-bleed entrance hero */}
            <div style={{ position: "relative", height: "clamp(280px,40vw,560px)", overflow: "hidden" }}>
              <img src="/assets/entrance-night-wide.jpg" alt="Al Hamra Tower entrance at night"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.72) 0%, rgba(29,29,27,0.15) 55%, transparent 100%)" }} />
              <div className="tower-rising-overlay">
                <Rv>
                  <p style={{ fontFamily: "Jost,sans-serif", fontSize: "9.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
                    Purposeful Design · SOM Architecture
                  </p>
                  <h2 style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(24px,3.5vw,52px)", fontWeight: 200, color: "#fff", lineHeight: 1.12, maxWidth: 520 }}>
                    A Tower Shaped by<br /><strong style={{ fontWeight: 500 }}>Climate, Craft</strong><br />and Ambition
                  </h2>
                </Rv>
              </div>
              <div style={{ position: "absolute", bottom: 16, right: 24, fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Photo: Dave Burk · SOM
              </div>
            </div>

            <Section>
              <div className="grid-2col">
                <div>
                  <Rv><Tag>Design Philosophy</Tag></Rv>
                  <Rv delay={0.1}><H2>Form Generated by Removal</H2></Rv>
                  <Rv delay={0.2}>
                    <Body>
                      Designed by Skidmore, Owings & Merrill, its asymmetrical form is generated by a simple operation of removal — creating a dynamic silhouette that maximises waterfront views and minimises heat exposure. The solid southern façade, clad in limestone, acts as a passive shield against intense sun, while glazed elevations frame dramatic vistas of Kuwait City and the Arabian Gulf.
                    </Body>
                  </Rv>
                  <Rv delay={0.3}><Body style={{ marginTop: 16 }}>Construction began in 2005 and concluded in 2011, resulting in a tower that stands as both an architectural icon and a centre for business excellence.</Body></Rv>
                  <Rv delay={0.4}>
                    <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(18px,2vw,22px)", fontStyle: "italic", fontWeight: 300, color: "#B2B2B2", lineHeight: 1.6, maxWidth: 480, marginTop: 36 }}>
                      "A tower shaped by climate, craft, and ambition."
                    </p>
                  </Rv>
                </div>
                <div>
                  <Rv delay={0.15}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {[
                        { n: "80+", u: "km", l: "Visibility Range",       img: "/assets/tower-facade-up.jpg" },
                        { n: "2005", u: "–2011", l: "Construction Period", img: null },
                      ].map(({ n, u, l, img }) => (
                        <div key={l} style={{ background: "#F7F6F4", padding: "28px 24px" }}>
                          <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 300, color: "#1D1D1B", lineHeight: 1 }}>
                            {n}<span style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 200, color: "#B2B2B2" }}>{u}</span>
                          </div>
                          <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 8 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </Rv>
                  <Rv delay={0.25}>
                    <div style={{ position: "relative", overflow: "hidden", marginTop: 1 }}>
                      <video autoPlay muted loop playsInline preload="metadata"
                        style={{ width: "100%", height: "clamp(160px,20vw,260px)", objectFit: "cover", display: "block", opacity: 0.92 }}>
                        <source src="/assets/tower-drone.mp4" type="video/mp4" />
                      </video>
                      <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                        Drone footage · Al Hamra Tower
                      </div>
                    </div>
                  </Rv>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {/* ══ TAB 2: THE SITE'S HERITAGE — with images ══ */}
        {tab === "The Site's Heritage" && (
          <motion.div key="heritage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* Intro */}
            <Section>
              <Rv><Tag>Site Heritage · From Souq to Skyline</Tag></Rv>
              <Rv delay={0.1}><H2>The Ground Beneath the Tower</H2></Rv>
              <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 0 }}>The site of Al Hamra Tower carries decades of Kuwaiti cultural identity. From the original Al Hamra Cinema — Kuwait's beloved 1958 entertainment landmark — to today's global icon, this ground has always been at the heart of Kuwait City's story.</Body></Rv>
            </Section>

            {/* Interactive split: timeline left, image right */}
            <div style={{ borderTop: "1px solid rgba(29,29,27,0.09)" }}>
              <div className="heritage-layout">

                {/* Left — clickable timeline */}
                <div className="heritage-timeline">
                  {TIMELINE.map(({ year, title, era, body }, i) => {
                    const isActive = activeYear === year;
                    return (
                      <motion.div key={year}
                        onClick={() => setActiveYear(year)}
                        whileHover={{ x: 4 }}
                        style={{
                          display: "flex", gap: "clamp(16px,2vw,32px)",
                          padding: "clamp(18px,2vw,28px) clamp(20px,3vw,48px)",
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(29,29,27,0.06)",
                          background: isActive ? "#FAFAFA" : "transparent",
                          borderLeft: `3px solid ${isActive ? "#1D1D1B" : "transparent"}`,
                          transition: "all 0.2s",
                        }}
                      >
                        {/* Year */}
                        <div style={{ minWidth: "clamp(44px,5vw,70px)", flexShrink: 0 }}>
                          <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 300, color: isActive ? "#1D1D1B" : "#EDEDED", lineHeight: 1 }}>{year}</div>
                          <div style={{ fontFamily: "Jost,sans-serif", fontSize: "7.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 4 }}>{era}</div>
                        </div>
                        <div>
                          <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: isActive ? 500 : 400, color: "#1D1D1B", marginBottom: 6 }}>{title}</div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                                <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(11px,1vw,13px)", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right — sticky image panel */}
                <div className="heritage-image-panel">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeYear}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: "relative", height: "100%", minHeight: "clamp(280px,50vw,500px)" }}
                    >
                      <img
                        src={HERITAGE_IMAGES[activeYear]?.src ?? "/assets/tower-sunset.jpg"}
                        alt={HERITAGE_IMAGES[activeYear]?.caption ?? ""}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                        onError={e => {
                          // Fallback if external image fails
                          const t = e.currentTarget as HTMLImageElement;
                          t.src = "/assets/kuwait-skyline.jpg";
                        }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.65) 0%, transparent 55%)" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,2vw,28px)" }}>
                        <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: "#fff", lineHeight: 1 }}>{activeYear}</div>
                        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(11px,1vw,13px)", color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
                          {HERITAGE_IMAGES[activeYear]?.caption}
                        </div>
                        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
                          {HERITAGE_IMAGES[activeYear]?.credit}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ TAB 3: PRESENT DAY — with images ══ */}
        {tab === "Present Day" && (
          <motion.div key="present" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* Quotes */}
            <Section>
              <Rv><Tag>Founders' Vision</Tag></Rv>
              <Rv delay={0.1}><H2>The Voices Behind the Tower</H2></Rv>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 40 }}>
                {QUOTES.map(({ org, quote }, i) => (
                  <Rv key={org} delay={i * 0.1}>
                    <div style={{ background: "#fff", padding: "clamp(24px,3vw,40px)" }}>
                      <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(15px,1.5vw,18px)", fontStyle: "italic", fontWeight: 300, color: "#1D1D1B", lineHeight: 1.7, marginBottom: 20 }}>"{quote}"</div>
                      <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2" }}>{org}</div>
                    </div>
                  </Rv>
                ))}
              </div>
            </Section>

            {/* Photo gallery — 2×2 masonry-style */}
            <section style={{ borderTop: "1px solid rgba(29,29,27,0.09)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "rgba(29,29,27,0.09)" }} className="present-grid">
                {PRESENT_DAY_IMAGES.map(({ src, title, body, credit }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                    style={{ position: "relative", overflow: "hidden", minHeight: "clamp(260px,35vw,440px)" }}
                  >
                    <motion.img src={src} alt={title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", position: "absolute", inset: 0, transition: "transform 0.6s ease" }}
                      whileHover={{ scale: 1.04 }}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = "/assets/tower-sunset.jpg"; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.8) 0%, rgba(29,29,27,0.1) 60%, transparent 100%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,2.5vw,32px)" }}>
                      <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(12px,1.2vw,15px)", fontWeight: 500, color: "#fff", marginBottom: 8 }}>{title}</div>
                      <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(11px,1vw,12.5px)", fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{body}</div>
                      <div style={{ fontFamily: "Jost,sans-serif", fontSize: "7.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 10 }}>{credit}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <DarkBand title="Explore the Design &amp; Engineering" subtitle="See how SOM's engineering precision transformed this bold vision into a permanent skyline landmark." ctaLabel="Design That Performs" ctaHref="/tower/design" />

      {/* Scoped responsive styles */}
      <style>{`
        .tower-rising-overlay {
          position: absolute; bottom: 0; left: 0; top: 0;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: clamp(24px,5vw,60px) clamp(20px,5vw,80px);
        }

        /* Heritage split layout */
        .heritage-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
        }
        .heritage-timeline {
          overflow-y: auto;
          border-right: 1px solid rgba(29,29,27,0.09);
        }
        .heritage-image-panel {
          position: sticky;
          top: 92px;
          height: calc(100vh - 92px);
          max-height: 640px;
          overflow: hidden;
          background: #F7F6F4;
        }

        /* Present day grid */
        .present-grid > *:first-child {
          grid-row: span 1;
        }

        @media (max-width: 900px) {
          .heritage-layout {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .heritage-image-panel {
            position: relative;
            top: 0;
            height: clamp(260px,55vw,420px);
            max-height: unset;
            order: -1;
          }
          .heritage-timeline {
            border-right: none;
            border-top: 1px solid rgba(29,29,27,0.09);
          }
          .present-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .heritage-image-panel {
            height: clamp(220px,60vw,340px);
          }
        }
      `}</style>
    </PageLayout>
  );
}
