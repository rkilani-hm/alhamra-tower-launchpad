import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

const TIMELINE = [
  { year: "1950s", title: "The Traditional Souq",  era: "Heritage Era",   body: "Kuwait's bustling souqs served as the heart of commerce and community — the living centre of trade and culture in the region." },
  { year: "1960s", title: "The Cinema District",   era: "Cultural Dawn",  body: "Al Hamra Cinema opened as Kuwait's first entertainment venue, giving this district its name and cultural identity." },
  { year: "1970s", title: "A City Transformed",    era: "Urban Growth",   body: "Oil wealth enabled rapid modernisation, with Kuwait City expanding from a traditional port into a regional capital of ambition and influence." },
  { year: "2005",  title: "Breaking Ground",        era: "Visionary Leap", body: "Construction began on what would become Kuwait's tallest building — a structural challenge requiring entirely new construction methodology." },
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
  const [tab, setTab] = useState("Purposeful Design");

  return (
    <PageLayout>
      <PageHero
        tag="The Tower · Rising"
        title="Rising with Purpose"
        subtitle="Al Hamra Business Tower was conceived as a landmark that responds to its climate and city context through purposeful design."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }, { label: "Rising with Purpose", href: "/tower/rising" }]}
      />

      {/* Tab nav */}
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

        {/* ── PURPOSEFUL DESIGN ── */}
        {tab === "Purposeful Design" && (
          <motion.div key="design" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* Full-bleed entrance night photo */}
            <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
              <img
                src="/assets/entrance-night-wide.jpg"
                alt="Al Hamra Tower entrance at night"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.72) 0%, rgba(29,29,27,0.2) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, top: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "60px 80px" }}>
                <Rv>
                  <p style={{ fontFamily: "Jost,sans-serif", fontSize: "9.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
                    Purposeful Design · SOM Architecture
                  </p>
                  <h2 style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 200, color: "#fff", lineHeight: 1.12, maxWidth: 560 }}>
                    A Tower Shaped by<br /><strong style={{ fontWeight: 500 }}>Climate, Craft</strong><br />and Ambition
                  </h2>
                </Rv>
              </div>
              <div style={{ position: "absolute", bottom: 16, right: 24, fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Photo: Dave Burk · SOM
              </div>
            </div>

            <Section>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
                <div>
                  <Rv><Tag>Design Philosophy</Tag></Rv>
                  <Rv delay={0.1}><H2>Form Generated by Removal</H2></Rv>
                  <Rv delay={0.2}>
                    <Body>
                      Designed by Skidmore, Owings & Merrill, its asymmetrical form is generated by a simple operation of removal — creating a dynamic silhouette that maximises waterfront views and minimises heat exposure. The solid southern façade, clad in limestone, acts as a passive shield against intense sun, while glazed elevations frame dramatic vistas of Kuwait City and the Arabian Gulf.
                    </Body>
                  </Rv>
                  <Rv delay={0.3}>
                    <Body style={{ marginTop: 16 }}>
                      Construction began in 2005 and concluded in 2011, resulting in a tower that stands as both an architectural icon and a centre for business excellence.
                    </Body>
                  </Rv>
                  <Rv delay={0.4}>
                    <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "22px", fontStyle: "italic", fontWeight: 300, color: "#B2B2B2", lineHeight: 1.6, maxWidth: 480, marginTop: 36 }}>
                      "A tower shaped by climate, craft, and ambition."
                    </p>
                  </Rv>
                </div>
                <div>
                  {/* Stats + drone video */}
                  <Rv delay={0.15}>
                    <div style={{ display: "flex", gap: 1, background: "rgba(29,29,27,0.09)", marginBottom: 1 }}>
                      {[{ n: "80+", u: "km", l: "Visibility Range" }, { n: "2005", u: "–2011", l: "Construction Period" }].map(({ n, u, l }) => (
                        <div key={l} style={{ background: "#fff", padding: "32px 28px", flex: 1 }}>
                          <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 44, fontWeight: 300, color: "#1D1D1B", lineHeight: 1 }}>
                            {n}<span style={{ fontFamily: "Jost,sans-serif", fontSize: 16, fontWeight: 200, color: "#B2B2B2" }}>{u}</span>
                          </div>
                          <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 8 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </Rv>
                  {/* Drone video */}
                  <Rv delay={0.25}>
                    <div style={{ position: "relative", overflow: "hidden", background: "#0a0a09" }}>
                      <video
                        autoPlay muted loop playsInline preload="metadata"
                        style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "center", display: "block", opacity: 0.92 }}
                      >
                        <source src="/assets/tower-drone.mp4" type="video/mp4" />
                      </video>
                      <div style={{ position: "absolute", bottom: 12, left: 16, fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                        Drone footage · Al Hamra Tower · Kuwait City
                      </div>
                    </div>
                  </Rv>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {/* ── HERITAGE ── */}
        {tab === "The Site's Heritage" && (
          <motion.div key="heritage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Section>
              <Rv><Tag>Site Heritage · Timeline</Tag></Rv>
              <Rv delay={0.1}><H2>From Souq to Skyline</H2></Rv>
              <Rv delay={0.2}><Body style={{ maxWidth: 600, marginBottom: 60 }}>The site of Al Hamra Tower carries decades of Kuwaiti cultural identity — from the original Al Hamra Cinema district to today's global landmark.</Body></Rv>
              <div style={{ borderLeft: "1px solid rgba(29,29,27,0.12)", paddingLeft: 48, display: "flex", flexDirection: "column" }}>
                {TIMELINE.map(({ year, title, era, body }, i) => (
                  <Rv key={year} delay={i * 0.1}>
                    <div style={{ display: "flex", gap: 32, paddingBottom: 48, position: "relative" }}>
                      <div style={{ position: "absolute", left: -57, top: 4, width: 10, height: 10, borderRadius: "50%", background: "#fff", border: "1.5px solid #1D1D1B" }} />
                      <div style={{ minWidth: 80 }}>
                        <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 32, fontWeight: 300, color: "#1D1D1B", lineHeight: 1 }}>{year}</div>
                        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "8.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2", marginTop: 4 }}>{era}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "14px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}>{title}</div>
                        <div style={{ fontFamily: "Jost,sans-serif", fontSize: "13px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.85 }}>{body}</div>
                      </div>
                    </div>
                  </Rv>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* ── PRESENT DAY ── */}
        {tab === "Present Day" && (
          <motion.div key="present" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Section>
              <Rv><Tag>Founders' Vision</Tag></Rv>
              <Rv delay={0.1}><H2>The Voices Behind the Tower</H2></Rv>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 48 }}>
                {QUOTES.map(({ org, quote }, i) => (
                  <Rv key={org} delay={i * 0.12}>
                    <div style={{ background: "#fff", padding: "40px 36px" }}>
                      <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "18px", fontStyle: "italic", fontWeight: 300, color: "#1D1D1B", lineHeight: 1.7, marginBottom: 24 }}>"{quote}"</div>
                      <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2" }}>{org}</div>
                    </div>
                  </Rv>
                ))}
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>

      <DarkBand title="Explore the Design &amp; Engineering" subtitle="See how SOM's engineering precision transformed this bold vision into a permanent skyline landmark." ctaLabel="Design That Performs" ctaHref="/tower/design" />
    </PageLayout>
  );
}
