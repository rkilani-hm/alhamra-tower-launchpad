import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";

const PEARL = "#C8B99A";
const GULF  = "#2A5F7A";
const DARK  = "#1D1D1B";

/* ── Timeline eras from PDFs ─────────────────────────────────────── */
const ERAS = [
  {
    year: "2004",
    title: "The Site is Set",
    body: "A mixed-use complex with a 200m tower is designed by Al Jazera Consultants. Excavation begins — 289 cast-in-place bored piles are sunk 22–27 metres into Kuwait's silty sand. The foundation work cannot stop.",
    img: "/assets/da7f3866-ef56-43e9-93c1-9702fb1fcd3a.jpg",
  },
  {
    year: "2005",
    title: "The Height Doubles",
    body: "Kuwait City Municipality raises the maximum allowable building height to 400m. Client group engages Skidmore, Owings & Merrill (SOM) — one of the world's foremost high-rise architects — to design a landmark tower. SOM begins concept design while the contractor is already on site.",
    img: "/assets/6ca37380-97cf-4f0f-b1ee-8cbcb4092c0f.jpg",
  },
  {
    year: "2006",
    title: "The Form Emerges",
    body: "SOM's decisive gesture: subtract a spiraling quadrant from a prismatic volume, rotate it at each higher level. Two hyperbolic paraboloid walls emerge — the iconic flared ribbons. The geometry provides transparency toward the Gulf and opacity toward the desert. Construction begins.",
    img: "/assets/construction-phase-3.png",
  },
  {
    year: "2008",
    title: "The Lamella Rises",
    body: "The lobby lamella — a web of 24-metre curved steel elements arching outward from the building core — is constructed using fiberglass formwork fabricated from 3D parametric models. It creates a column-free 900m² lobby. Engineers run non-linear buckling analyses on each member.",
    img: "/assets/construction-phase-4.jpg",
  },
  {
    year: "2011",
    title: "Kuwait's Skyline Changes",
    body: "Al Hamra Tower tops out at 412.6 metres. At completion it ranks among the ten tallest buildings in the world. The world's largest stone-clad skyscraper — 258,000m² of Jura limestone — stands complete in Sharq District. Kuwait City has a new landmark.",
    img: "/assets/00e8159d-8643-460f-be76-bd73a6b778b6.jpg",
    img2: "/assets/skyline-gulf-night.jpg",
  },
];

/* ── Lamella facts from SOM paper ────────────────────────────────── */
const LAMELLA_FACTS = [
  { n: "24m",    l: "Column-free lobby height" },
  { n: "900m²",  l: "Grand lobby floor area"   },
  { n: "5",      l: "Lamella element types (A–E)" },
  { n: "160mm",  l: "Maximum steel plate thickness" },
];

export default function TowerRising() {
  const [activeEra, setActiveEra] = useState<number>(0);
  
  const lamellaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lamellaRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <PageHero
        title="Rising with Purpose"
        subtitle="The construction of Al Hamra Tower"
        tag="2006 – 2011"
        crumbs={[{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }]}
        image="/assets/office-interior.jpg"
      />

      {/* ── SECTION 1: Construction Timeline — accordion + portrait image ── */}
      <section style={{ background: "#fff", padding: "clamp(64px,10vh,120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,6vw,96px)" }}>

          {/* Section kicker */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
            <span style={{ width: 32, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`, flexShrink: 0 }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL }}>
              Construction Timeline
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}
            className="timeline-grid">

            {/* ── LEFT: Accordion ─────────────────────────────────── */}
            <div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontWeight: 300, fontSize: "clamp(26px,2.8vw,40px)", color: DARK,
                lineHeight: 1.1, marginBottom: 40 }}>
                From excavation<br />to icon.
              </h2>

              {ERAS.map((era, i) => {
                const isOpen = activeEra === i;
                return (
                  <div key={era.year} style={{ borderTop: "1px solid rgba(29,29,27,0.08)" }}>

                    {/* Row header — always visible, clickable */}
                    <button
                      onClick={() => setActiveEra(isOpen ? -1 : i)}
                      style={{
                        width: "100%", textAlign: "left", background: "none", border: "none",
                        cursor: "pointer", padding: "18px 0",
                        display: "flex", alignItems: "center", gap: 16,
                      }}
                      aria-expanded={isOpen}
                    >
                      {/* Year */}
                      <span style={{
                        fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                        fontSize: "20px", fontWeight: 300,
                        color: isOpen ? DARK : "#9a9894",
                        minWidth: 52, transition: "color 0.3s ease",
                      }}>
                        {era.year}
                      </span>

                      {/* Title */}
                      <span style={{
                        fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                        fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                        color: isOpen ? DARK : "#767676",
                        flex: 1, transition: "color 0.3s ease",
                      }}>
                        {era.title}
                      </span>

                      {/* Chevron */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          display: "block", width: 14, height: 14, flexShrink: 0,
                          color: isOpen ? PEARL : "#c0bdb8",
                          fontSize: 20, lineHeight: "14px", userSelect: "none",
                        }}
                      >+</motion.span>
                    </button>

                    {/* Collapsible body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p style={{
                            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                            fontWeight: 300, fontSize: "clamp(13px,1.05vw,15px)",
                            color: "#5a5a58", lineHeight: 1.9,
                            paddingBottom: 24, paddingRight: 8,
                            marginBottom: 0,
                          }}>
                            {era.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

              {/* Close the last border */}
              <div style={{ borderTop: "1px solid rgba(29,29,27,0.08)" }} />
            </div>

            {/* ── RIGHT: Portrait image — sticky, natural proportions ── */}
            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Year badge */}
                  <div style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
                    color: PEARL, marginBottom: 16,
                  }}>
                    {activeEra >= 0 ? ERAS[activeEra].year : ERAS[0].year}
                  </div>

                  {/* Image — natural size, no fixed height, no cropping */}
                  <div style={{
                    background: "#f7f6f4",
                    border: "1px solid rgba(29,29,27,0.07)",
                    overflow: "hidden",
                  }}>
                    <img
                      src={activeEra >= 0 ? ERAS[activeEra].img : ERAS[0].img}
                      alt={activeEra >= 0 ? ERAS[activeEra].title : ERAS[0].title}
                      loading="lazy"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",          /* preserves portrait ratio exactly */
                        objectFit: "contain",
                        objectPosition: "center top",
                      }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.15"; }}
                    />
                  </div>

                  {/* Caption */}
                  <div style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#9a9894", marginTop: 14,
                  }}>
                    {activeEra >= 0 ? ERAS[activeEra].title : ERAS[0].title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>


      {/* ── SECTION 2: The Lamella Story ───────────────────────────── */}
      <section style={{ background: DARK, overflow: "hidden" }}
        className="pattern-band">
        <div ref={lamellaRef} style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "clamp(64px,10vh,120px) clamp(24px,6vw,96px)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
            alignItems: "center" }} className="lamella-grid">

            {/* Left text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                  <span style={{ width: 32, height: 1,
                    background: `linear-gradient(to right, ${PEARL}, #D4CFC9)` }} />
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px",
                    letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL }}>
                    Engineering Feat
                  </div>
                </div>

                <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                  fontWeight: 300, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff",
                  lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
                  The Lamella — a 24-metre vault with no columns.
                </h2>

                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 20 }}>
                  To create Kuwait's most dramatic lobby, SOM devised the lamella 
                  bracing system — a web of five distinct element types (A through E) 
                  that curve outward from the building core following a circular arch 24 
                  metres high, creating a completely column-free space beneath the tower.
                </p>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 36 }}>
                  Each element was designed using parametric 3D modelling. The fiberglass 
                  formwork moulds were fabricated directly from digital models. 
                  Non-linear buckling analyses were performed on every member — 
                  engineering and architecture resolved as a single sculptural gesture.
                </p>

                {/* Lamella facts grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {LAMELLA_FACTS.map(({ n, l }) => (
                    <div key={l} style={{
                      borderTop: "1px solid rgba(200,185,154,0.2)",
                      paddingTop: 16,
                    }}>
                      <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                        fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 300,
                        color: "#fff", marginBottom: 4 }}>
                        {n}
                      </div>
                      <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)" }}>
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — lobby image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <img
                src="/assets/2503102f-7fe4-4836-9a96-3f78e4ae1161.jpg"
                alt="Al Hamra Tower — lamella lobby ceiling, 24 metres high, column-free"
                style={{ width: "100%", display: "block",
                  objectFit: "cover", minHeight: 400 }}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/2503102f-7fe4-4836-9a96-3f78e4ae1161.jpg";
                }}
              />
              {/* Pearl gradient overlay bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
                background: `linear-gradient(to top, ${DARK}, transparent)`,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: PEARL,
              }}>
                The lobby lamella · Ground floor
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* ── SECTION 3: The Building Today — gallery ────────────────── */}
      <section style={{ background: "#fff",
        padding: "clamp(64px,10vh,100px) clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <span style={{ width: 32, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)` }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px",
              letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL }}>
              The Tower Today
            </div>
          </div>


          {/* Bespoke masonry grid: 4 columns, portrait images span 2 rows */}
          <div className="tower-gallery">
            {[
              { src: "/assets/cb81b098-f1c8-4aa7-a05d-0a4ddb88c5e5.png", alt: "Al Hamra Tower against blue Kuwaiti sky", cls: "gi-tall" },
              { src: "/assets/b4097b4e-ffb1-4d82-8006-3d1b87bb8726.png", alt: "Jura limestone facade — the stone south wall", cls: "gi-wide" },
              { src: "/assets/0d638fff-a80b-43f1-9dd5-9bcf1791fa2e.png", alt: "Tower entrance lit at night", cls: "gi-wide" },
              { src: "/assets/3fd1126d-6489-475d-8b72-ebcb2637eae5.png", alt: "Al Hamra Luxury Centre atrium", cls: "gi-wide-bottom" },
              { src: "/assets/eba71a53-124d-4e05-9354-6ec21564d0be.png", alt: "Office south corridor", cls: "gi-tall-right" },
              { src: "/assets/571e6fd5-b20f-42c8-9e9b-41a0e94868be.png", alt: "Sky Lobby corridor — travertine, chandelier rings, Gulf views", cls: "gi-tall-end" },
            ].map(({ src, alt, cls }, i) => (
              <motion.div
                key={src}
                className={cls}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                style={{ overflow: "hidden", background: "#0c0b09", position: "relative" }}
              >
                <img
                  src={src} alt={alt}
                  loading="lazy"
                  style={{ width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.6s ease" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .tower-gallery {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 4px;
        }
        /* Portrait: tower exterior — col 1, spans 2 rows */
        .gi-tall { grid-column: 1; grid-row: 1 / 3; }
        /* Landscape images fill remaining cells */
        .gi-wide { grid-column: span 1; }
        .gi-wide-bottom { grid-column: span 1; }
        /* Portrait: office corridor — spans 2 rows */
        .gi-tall-right { grid-column: 4; grid-row: 1 / 3; }
        /* Portrait: sky lobby — col 3 row 2 */
        .gi-tall-end { grid-column: 3; grid-row: 2; }


        @media (max-width: 900px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
          .lamella-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tower-gallery {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .gi-tall, .gi-wide, .gi-wide-bottom, .gi-tall-right, .gi-tall-end {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .gi-tall, .gi-tall-right, .gi-tall-end {
            aspect-ratio: 3/4;
          }
          .gi-wide, .gi-wide-bottom {
            aspect-ratio: 4/3;
          }
        }
        /* On mobile: image moves below accordion text for each phase */
        @media (max-width: 900px) {
          .timeline-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 540px) {
          .tower-gallery { grid-template-columns: 1fr !important; }
          .gi-tall, .gi-wide, .gi-wide-bottom, .gi-tall-right, .gi-tall-end {
            aspect-ratio: auto !important;
          }
        }
      `}</style>

      <PatternBand />
      <Footer />
    </>
  );
}
