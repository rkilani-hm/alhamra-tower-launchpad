import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

/* ─── Brand tokens ───────────────────────── */
const SAND    = "#C5A882";   /* use only on dark backgrounds */
const SAND_AA = "#9A7550";   /* 4.58:1 on white — WCAG AA ✅ */
const CREAM = "#F5F0E8";
const STONE = "#E8E0D4";
const DARK  = "#1D1D1B";
const MUTED = "#8A8580";
const WHITE = "#FFFFFF";

/* ─── Data ───────────────────────────────── */
const AWARDS = [
  { year: "2010", award: "Cityscape Award for Commercial, Mixed-Use Developments",    org: "Cityscape International",    cat: "Architecture",   color: SAND },
  { year: "2010", award: "Architecture Award",                                         org: "Chicago Athenaeum",          cat: "Design",         color: DARK },
  { year: "2009", award: "Future Project Award",                                       org: "MIPIM Architectural Review", cat: "Innovation",     color: SAND },
  { year: "2007", award: "Bronze · Under Construction Category",                       org: "Miami Architectural Biennial", cat: "Engineering", color: DARK },
  { year: "2014", award: "Emirates Glass LEAF Award",                                  org: "LEAF Awards",                cat: "Sustainability", color: SAND },
  { year: "2019", award: "World Architecture Festival Recognition",                    org: "WAF",                        cat: "Tall Buildings", color: DARK },
];

const ENGINEERING_FACTS = [
  {
    stat: "#1",
    label: "Tallest Stone-Clad Tower",
    body: "258,000 m² of Jura limestone — the world's largest area of stone cladding on a single building. A world record held since 2011 and the first asymmetrical skyscraper ever built. No other tower of comparable height achieves this degree of sculptural mass removal from its own structural body.",
    img: "/lovable-uploads/Global_Acknowledgement.png",
    imgCaption: "Dual facade · Glass meets limestone",
    credit: "Photo: Dave Burk · SOM",
  },
  {
    stat: "24m",
    label: "Column-Free Lobby",
    body: "The lamella structure — a web of curved concrete members inspired by Middle Eastern vault architecture — prevents the sloping perimeter columns from buckling. Without it, those columns would need to be three times larger.",
    img: "/assets/lobby-grand-lamella.jpg",
    imgCaption: "Grand lobby · White lamella arches, Kuwait flag, 24m height",
    credit: "Al Hamra Tower",
  },
  {
    stat: "289",
    label: "Foundation Piles",
    body: "A 4.2-metre reinforced concrete raft supported by 289 bored piles, each 1,200mm in diameter driven 22–27 metres deep. Poured in four months using nighttime concreting to combat Kuwait's extreme heat.",
    img: "/assets/entrance-night-wide.jpg",
    imgCaption: "North entrance · Curved canopy at blue hour",
    credit: "Photo: Dave Burk · SOM",
  },
];

const COLLABORATORS = [
  { role: "Lead Architect & Engineer", org: "SOM — Skidmore, Owings & Merrill" },
  { role: "Associate Architect",       org: "VDA · Al-Jazera Consultants"      },
  { role: "Digital Project Software",  org: "Gehry Technologies"               },
  { role: "General Contractor",        org: "Ahmadiah Contracting & Trading"   },
];

/* ─── Parallax image ─────────────────────── */
function ParallaxImg({ src, alt, height }: { src: string; alt: string; height: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]), { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", height }}>
      <motion.img src={src} alt={alt} style={{ y, width: "100%", height: "120%", objectFit: "cover", objectPosition: "center", position: "absolute", top: 0 }} />
    </div>
  );
}

export function TowerAwards() {
  return (
    <PageLayout>

      {/* ══ HERO — tower-render-dusk.jpg: official SOM/CTBUH render, purple dusk sky ═══ */}
      <div style={{ position: "relative", height: "clamp(360px,55vw,680px)", overflow: "hidden", background: DARK }}>
        <motion.img
          src="/assets/tower-render-dusk.jpg"
          alt="Al Hamra Tower — official SOM architectural render at dusk"
          initial={{ scale: 1.06 }} animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "brightness(0.75) saturate(1.1)" }}
        />
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(29,29,27,0.1) 0%, transparent 40%, rgba(29,29,27,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(197,168,130,0.15) 0%, transparent 60%)` }} />

        {/* Text overlay */}
        <div className="awards-hero-text">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND, marginBottom: 14 }}>
              The Tower · Awards & Recognition
            </div>
            <h1 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(28px,5vw,72px)", fontWeight: 100, letterSpacing: "-0.03em", lineHeight: 1, color: WHITE, marginBottom: 16 }}>
              Global<br /><span style={{ fontWeight: 400 }}>Acknowledgement</span>
            </h1>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.55)", maxWidth: 440, lineHeight: 1.8 }}>
              The world's tallest stone-clad tower and first asymmetrical skyscraper — recognised by leading engineering, architecture, and sustainability institutions for over a decade.
            </p>
          </motion.div>
        </div>

        {/* Bottom credit */}
        <div style={{ position: "absolute", bottom: 18, right: 24, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Photo: Dave Burk · SOM Architecture
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent, #FAFAF8)`, pointerEvents: "none" }} />
      </div>

      {/* ══ GLOBAL STATS BAR ══════════════════════════════ */}
      <div className="awards-stats-bar">
        {[
          { n: "23rd",     l: "Tallest in World at Completion" },
          { n: "#1",       l: "Tallest Sculpted Concrete Tower" },
          { n: "80",       l: "Floors of Curved Concrete" },
          { n: "189,000", u:"kN", l: "Lamella Buckling Capacity" },
        ].map(({ n, u, l }, i) => (
          <motion.div key={l}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{ background: WHITE, padding: "clamp(24px,3vw,40px) clamp(18px,2.5vw,32px)", borderRight: `1px solid ${STONE}` }}
          >
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
              {n}{u && <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1.5vw,16px)", fontWeight: 200, color: SAND }}>{u}</span>}
            </div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 8 }}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* ══ ENGINEERING SHOWCASE ══════════════════════════ */}
      <section style={{ background: "#FAFAF8" }}>
        <div className="ah-section" style={{ background: "transparent" }}>
          <Rv>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: SAND }} />
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>
                Engineering Milestones
              </div>
            </div>
          </Rv>
          <Rv delay={0.1}>
            <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,3vw,44px)", fontWeight: 100, letterSpacing: "-0.025em", lineHeight: 1.1, color: DARK, marginBottom: 8 }}>
              Why the World<br /><span style={{ fontWeight: 400 }}>Took Notice</span>
            </h2>
          </Rv>
          <Rv delay={0.2}>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: MUTED, lineHeight: 1.65, maxWidth: 560, marginBottom: 56 }}>
              Three structural achievements set Al Hamra Tower apart from every skyscraper that preceded it — each one recognised independently by international institutions.
            </p>
          </Rv>
        </div>

        {/* Engineering cards — alternating layout */}
        {ENGINEERING_FACTS.map(({ stat, label, body, img, imgCaption, credit }, i) => (
          <Rv key={stat} delay={i * 0.08}>
            <div className={`eng-card ${i % 2 === 1 ? "eng-card-flip" : ""}`}
              style={{ borderTop: `1px solid ${STONE}` }}>

              {/* Image side */}
              <div className="eng-card-img" style={{ position: "relative", overflow: "hidden", minHeight: "clamp(260px,35vw,440px)", background: STONE }}>
                <ParallaxImg src={img} alt={imgCaption} height={440} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,2vw,24px)" }}>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", color: "rgba(255,255,255,0.7)" }}>{imgCaption}</div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{credit}</div>
                </div>
              </div>

              {/* Text side */}
              <div className="eng-card-text" style={{ background: WHITE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(48px,7vw,88px)", fontWeight: 300, color: CREAM, lineHeight: 1, marginBottom: 4 }}>{stat}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: SAND, marginBottom: 20 }}>{label}</div>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(13px,1.2vw,14.5px)", fontWeight: 300, color: MUTED, lineHeight: 1.9 }}>{body}</p>
              </div>
            </div>
          </Rv>
        ))}
      </section>

      {/* ══ LOBBY FEATURE — FULL-BLEED ════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <ParallaxImg src="/assets/lobby-interior.jpg" alt="Al Hamra Grand Lobby lamella structure" height={520} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.78) 0%, rgba(29,29,27,0.3) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="awards-lobby-text">
            <Rv>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND, marginBottom: 16 }}>
                The Lamella Structure · Grand Lobby
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(24px,4vw,56px)", fontWeight: 100, color: WHITE, lineHeight: 1.08, marginBottom: 20 }}>
                The barrel vault of<br /><span style={{ fontWeight: 400, color: SAND }}>concrete lamellae</span><br />that holds up 412m
              </h2>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 480 }}>
                Concrete lamellae prevent the 24-metre sloping columns from buckling by providing alternate load paths to the foundation. The structural system reduces the columns to one-third of what they would otherwise require — creating the column-free arrival experience of Kuwait's most prestigious address.
              </p>
            </Rv>
          </div>
        </div>
      </section>

      {/* ══ CTBUH RESEARCH ════════════════════════════════ */}
      <Section>
        <div className="grid-2col">
          <div>
            <Rv>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: SAND }} />
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>Published Research · CTBUH 2007</div>
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 100, letterSpacing: "-0.02em", color: DARK, lineHeight: 1.15, marginBottom: 24 }}>
                "Sculpted High Rise:<br /><span style={{ fontWeight: 400 }}>The Al Hamra Tower"</span>
              </h2>
              <Body>Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM) — Council on Tall Buildings and Urban Habitat, Structural Engineers World Congress 2007.</Body>
            </Rv>
            <Rv delay={0.15}>
              <div style={{ marginTop: 36, padding: "28px 28px 28px 24px", borderLeft: `3px solid ${SAND}`, background: CREAM }}>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(15px,1.5vw,18px)", fontStyle: "italic", fontWeight: 300, color: DARK, lineHeight: 1.7, marginBottom: 16 }}>
                  "By blending conventional engineering tools with parametric modelling software, SOM has brought together the realms of free-form design and the super high-rise skyscraper."
                </p>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED }}>
                  CTBUH Research Paper · 2007
                </div>
              </div>
            </Rv>
          </div>

          {/* Right — lamella ceiling close-up */}
          <Rv delay={0.2}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src="/assets/lobby-ceiling-day.jpg" alt="Lamella ceiling structure — daylight view"
                style={{ width: "100%", height: "clamp(300px,40vw,480px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "20px 20px 16px" }}>
                <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Lamella ceiling · Daylight filtering through the web of concrete
                </span>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      {/* ══ AWARDS TABLE ══════════════════════════════════ */}
      <Section bg="#FAFAF8">
        <Rv>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: SAND }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>Awards & Honours</div>
          </div>
        </Rv>
        <Rv delay={0.1}>
          <H2>International Recognition</H2>
        </Rv>

        <div style={{ marginTop: 40, borderTop: `1px solid ${STONE}` }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 24, padding: "12px 0", borderBottom: `1px solid ${STONE}` }}>
            {["Year", "Award", "Organisation"].map(h => (
              <div key={h} style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: MUTED }}>{h}</div>
            ))}
          </div>
          {AWARDS.map(({ year, award, org, cat, color }, i) => (
            <Rv key={year + award} delay={i * 0.07}>
              <motion.div
                whileHover={{ x: 6, backgroundColor: CREAM }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "clamp(10px,2vw,24px)", padding: "clamp(14px,1.5vw,20px) 0", borderBottom: `1px solid ${STONE}`, cursor: "default", alignItems: "center" }}
              >
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 300, color: DARK }}>{year}</div>
                <div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 400, color: DARK, marginBottom: 2 }}>{award}</div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(10px,0.9vw,11.5px)", color: MUTED }}>{org}</div>
                </div>
                <div style={{
                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "4px 10px",
                  background: color === DARK ? DARK : color === SAND ? CREAM : STONE,
                  color: color === DARK ? WHITE : MUTED,
                  whiteSpace: "nowrap",
                }}>
                  {cat}
                </div>
              </motion.div>
            </Rv>
          ))}
        </div>
      </Section>

      {/* ══ PHOTO PAIR — ENTRANCE ENGINEERING ══════════════ */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="awards-photo-pair">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/assets/entrance-night.jpg" alt="Al Hamra Tower entrance — night"
            style={{ width: "100%", height: "clamp(300px,40vw,500px)", objectFit: "cover", objectPosition: "center", display: "block", filter: "brightness(0.9)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.6))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", fontWeight: 500, color: WHITE, marginBottom: 4 }}>The Entrance at Night</div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              Sloped perimeter columns defining the street appearance
            </div>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/assets/lobby-ceiling-portrait.jpg" alt="Lamella ceiling — portrait"
            style={{ width: "100%", height: "clamp(300px,40vw,500px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.6))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", fontWeight: 500, color: WHITE, marginBottom: 4 }}>The Lamella Web</div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              189,000 kN buckling capacity — engineered elegance
            </div>
          </div>
        </div>
      </section>

      {/* ══ COLLABORATORS ═════════════════════════════════ */}
      <Section>
        <Rv>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: SAND }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>Project Collaborators</div>
          </div>
        </Rv>
        <Rv delay={0.1}><H2>The Team Behind the Tower</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: STONE, marginTop: 40 }}>
            {COLLABORATORS.map(({ role, org }) => (
              <div key={org} style={{ background: WHITE, padding: "clamp(24px,2.5vw,32px) clamp(20px,2vw,28px)" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: SAND, marginBottom: 12 }}>{role}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 400, color: DARK }}>{org}</div>
              </div>
            ))}
          </div>
        </Rv>
      </Section>

      <DarkBand title="Explore Sustainability &amp; Innovation" subtitle="See how Al Hamra Tower's climate-responsive engineering translates into world-class environmental performance." ctaLabel="Sustainability" ctaHref="/tower/sustainability" />

      {/* Scoped styles */}
      <style>{`
        .awards-hero-text {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(24px,5vw,60px) clamp(20px,5vw,80px) clamp(40px,5vw,80px);
        }
        .awards-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid ${STONE};
          border-bottom: 1px solid ${STONE};
          background: ${STONE};
          gap: 1px;
        }
        .awards-lobby-text {
          padding: clamp(24px,5vw,60px) clamp(20px,5vw,80px);
          max-width: 680px;
        }
        .eng-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .eng-card-text {
          padding: clamp(36px,5vw,80px) clamp(24px,4vw,72px);
        }
        .eng-card-flip .eng-card-img { order: 2; }
        .eng-card-flip .eng-card-text { order: 1; }
        .awards-photo-pair > * {
          border-right: 1px solid ${STONE};
        }
        .awards-photo-pair > *:last-child {
          border-right: none;
        }

        @media (max-width: 900px) {
          .awards-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .eng-card { grid-template-columns: 1fr; }
          .eng-card-img { order: -1 !important; }
          .eng-card-text { order: 1 !important; }
          .awards-photo-pair { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 640px) {
          .awards-stats-bar { grid-template-columns: 1fr 1fr; }
          .awards-lobby-text { padding: 32px 20px; }
        }

        @media (max-width: 480px) {
          .awards-stats-bar { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageLayout>
  );
}
