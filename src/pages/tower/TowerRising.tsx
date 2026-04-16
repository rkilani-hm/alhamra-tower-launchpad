import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";

const PEARL = "#C8B99A";
const DARK  = "#1D1D1B";

/* ── 5-Phase Construction Timeline ───────────────────────────────── */
const PHASES = [
  {
    number: "01",
    year: "2006",
    title: "Foundation & Podium",
    subtitle: "Breaking Ground",
    caption:
      "289 bored piles — each 1,200 mm in diameter and up to 27 metres deep — are driven into Kuwait's earth. A 4-metre-thick raft foundation anchors the entire 412-metre tower. The podium footprint takes shape as cranes and concrete command the site.",
    img: "/assets/construction-phase-1.jpg",
    alt: "Aerial view of Al Hamra Tower construction site, early podium phase",
  },
  {
    number: "02",
    year: "2007",
    title: "Core Ascending",
    subtitle: "The Tower Begins to Rise",
    caption:
      "The reinforced-concrete core climbs floor by floor using slip-form formwork. The spiralling geometry demands millimetre-precise rotational corrections at every pour — each level is cast slightly clockwise to pre-correct for the tower's anticipated elastic twist.",
    img: "/assets/construction-phase-2.png",
    alt: "Al Hamra Tower core rising with twin cranes visible at the top",
  },
  {
    number: "03",
    year: "2008",
    title: "Structure Mid-Rise",
    subtitle: "Form Emerges",
    caption:
      "Above the 30th floor the tower's decisive gesture becomes unmistakeable — a spiralling quadrant removed from a prismatic volume, rotating at each higher level. Composite perimeter columns frame the sculpted void. The two hyperbolic-paraboloid flared walls begin their sweep.",
    img: "/assets/construction-phase-3.png",
    alt: "Al Hamra Tower at mid-construction showing the twisted sculptural form",
  },
  {
    number: "04",
    year: "2009",
    title: "Facade & Glazing",
    subtitle: "The Skin Takes Hold",
    caption:
      "High-performance curtain-wall glass wraps the structure while 258,000 m² of Jura limestone clads the south face — the world's largest stone-clad skyscraper. The signature carved void is revealed as cladding climbs toward the pinnacle against the Arabian Gulf.",
    img: "/assets/construction-phase-4.png",
    alt: "Al Hamra Tower glazing installation with the Gulf visible in the background",
  },
  {
    number: "05",
    year: "2011",
    title: "Landmark Complete",
    subtitle: "Kuwait's Defining Skyline",
    caption:
      "Al Hamra Tower tops out at 412.6 metres — among the ten tallest buildings in the world at completion. The 900 m² column-free lobby beneath its lamella vault opens to the city. Kuwait City has a new monument, and the skyline of Sharq District is changed forever.",
    img: "/assets/construction-phase-5.png",
    alt: "Completed Al Hamra Tower against deep blue Kuwait sky with the Gulf beyond",
  },
];

/* ── Lamella facts ────────────────────────────────────────────────── */
const LAMELLA_FACTS = [
  { n: "24m",    l: "Column-free lobby height" },
  { n: "900m²",  l: "Grand lobby floor area"   },
  { n: "5",      l: "Lamella element types (A–E)" },
  { n: "160mm",  l: "Maximum steel plate thickness" },
];

/* ── Phase Card ─────────────────────────────────────────────────── */
function PhaseCard({ phase, index }: { phase: (typeof PHASES)[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr clamp(40px,5vw,72px) 1fr",
        alignItems: "start",
        gap: 0,
      }}
      className="phase-row"
    >
      {/* Image side */}
      <div style={{
        gridColumn: isEven ? 1 : 3,
        gridRow: 1,
        paddingRight: isEven ? "clamp(24px,4vw,52px)" : 0,
        paddingLeft: isEven ? 0 : "clamp(24px,4vw,52px)",
      }}>
        <div style={{ position: "relative", overflow: "hidden", background: "#0c0b09" }}>
          <motion.img
            src={phase.img}
            alt={phase.alt}
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width: "100%",
              height: "clamp(240px,28vw,420px)",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              filter: "brightness(0.93) contrast(1.04)",
            }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.15"; }}
          />
          {/* Corner accents */}
          <div style={{ position:"absolute", top:14, left:14, width:22, height:22, borderTop:`1px solid ${PEARL}`, borderLeft:`1px solid ${PEARL}`, opacity:0.65, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:14, right:14, width:22, height:22, borderBottom:`1px solid ${PEARL}`, borderRight:`1px solid ${PEARL}`, opacity:0.65, pointerEvents:"none" }} />
          {/* Ghost year watermark */}
          <div style={{
            position:"absolute", bottom:10,
            left: isEven ? 16 : "auto", right: isEven ? "auto" : 16,
            fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
            fontSize:"clamp(28px,4vw,52px)", fontWeight:300, fontStyle:"italic",
            color:"rgba(255,255,255,0.11)", letterSpacing:"-0.02em",
            lineHeight:1, userSelect:"none", pointerEvents:"none",
          }}>{phase.year}</div>
        </div>
      </div>

      {/* Connector */}
      <div style={{
        gridColumn: 2, gridRow: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: "clamp(20px,3vw,40px)", position: "relative", zIndex: 2,
      }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.25 }}
          style={{
            width: "clamp(44px,4vw,56px)", height: "clamp(44px,4vw,56px)",
            borderRadius:"50%", border:`1px solid ${PEARL}`, background:"#F8F6F3",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0, boxShadow:`0 0 0 8px rgba(200,185,154,0.08)`,
          }}
        >
          <span style={{
            fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
            fontSize:"12px", color:PEARL, fontStyle:"italic", letterSpacing:"0.05em",
          }}>{phase.number}</span>
        </motion.div>
        {index < PHASES.length - 1 && (
          <div style={{
            flex:1, width:1, minHeight:80, marginTop:8,
            background:`linear-gradient(to bottom, rgba(200,185,154,0.4), rgba(200,185,154,0.06))`,
          }} />
        )}
      </div>

      {/* Text side */}
      <div style={{
        gridColumn: isEven ? 3 : 1, gridRow: 1,
        paddingLeft: isEven ? "clamp(24px,4vw,52px)" : 0,
        paddingRight: isEven ? 0 : "clamp(24px,4vw,52px)",
        paddingTop: "clamp(20px,3vw,36px)",
        textAlign: isEven ? "left" : "right",
        display:"flex", flexDirection:"column",
      }}>
        <p style={{
          fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
          fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase",
          color:PEARL, marginBottom:10, margin:"0 0 10px",
        }}>{phase.subtitle}</p>
        <h3 style={{
          fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
          fontWeight:300, fontSize:"clamp(20px,2.4vw,32px)",
          color:DARK, margin:"0 0 18px", lineHeight:1.15, letterSpacing:"-0.01em",
        }}>{phase.title}</h3>
        <div style={{
          width:36, height:1, background:`rgba(200,185,154,0.55)`, marginBottom:18,
          marginLeft: isEven ? 0 : "auto",
        }} />
        <p style={{
          fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
          fontWeight:300, fontSize:"clamp(13px,1.1vw,14.5px)",
          color:"#5a5a58", lineHeight:1.85, margin:0, maxWidth:400,
          marginLeft: isEven ? 0 : "auto",
        }}>{phase.caption}</p>
      </div>
    </motion.div>
  );
}

/* ── Video Feature ─────────────────────────────────────────────── */
function VideoFeature() {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: "clamp(64px,8vh,100px)" }}
    >
      {/* Label */}
      <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:28 }}>
        <div style={{ flex:1, height:1, background:`linear-gradient(to right, transparent, rgba(200,185,154,0.25))` }} />
        <p style={{
          fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
          fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase",
          color:PEARL, margin:0, whiteSpace:"nowrap",
        }}>Construction in Motion</p>
        <div style={{ flex:1, height:1, background:`linear-gradient(to left, transparent, rgba(200,185,154,0.25))` }} />
      </div>

      {/* Video frame */}
      <div style={{
        position:"relative", aspectRatio:"16/9", background:"#0c0b09",
        border:"1px solid rgba(200,185,154,0.15)", overflow:"hidden",
        maxWidth:1000, margin:"0 auto",
      }}>
        {!loaded && (
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(90deg,#0c0b09 0%,#181714 50%,#0c0b09 100%)",
            backgroundSize:"200% 100%", animation:"ctShimmer 2s infinite",
          }} />
        )}
        <video
          ref={videoRef}
          onLoadedMetadata={() => setLoaded(true)}
          onEnded={() => setPlaying(false)}
          playsInline loop
          poster="/assets/construction-video-poster.jpg"
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity: loaded ? 1 : 0, transition:"opacity 0.5s ease" }}
        >
          <source src="/assets/construction-timelapse.mp4" type="video/mp4" />
          <source src="/assets/construction-timelapse.mov" type="video/quicktime" />
        </video>

        {/* Play button */}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play construction timelapse"}
          style={{
            position:"absolute", inset:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            background: playing ? "transparent" : "rgba(13,10,8,0.38)",
            border:"none", cursor:"pointer", transition:"background 0.3s ease",
          }}
        >
          {!playing && (
            <div style={{
              width:68, height:68, borderRadius:"50%",
              border:`1.5px solid rgba(200,185,154,0.75)`,
              display:"flex", alignItems:"center", justifyContent:"center",
              backdropFilter:"blur(4px)",
            }}>
              <svg viewBox="0 0 24 24" fill={PEARL} width={22} height={22}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </button>

        {/* Corner marks */}
        <div style={{ position:"absolute",top:14,left:14,width:22,height:22,borderTop:`1px solid rgba(200,185,154,0.5)`,borderLeft:`1px solid rgba(200,185,154,0.5)`,pointerEvents:"none" }} />
        <div style={{ position:"absolute",top:14,right:14,width:22,height:22,borderTop:`1px solid rgba(200,185,154,0.5)`,borderRight:`1px solid rgba(200,185,154,0.5)`,pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:14,left:14,width:22,height:22,borderBottom:`1px solid rgba(200,185,154,0.5)`,borderLeft:`1px solid rgba(200,185,154,0.5)`,pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:14,right:14,width:22,height:22,borderBottom:`1px solid rgba(200,185,154,0.5)`,borderRight:`1px solid rgba(200,185,154,0.5)`,pointerEvents:"none" }} />
      </div>

      <p style={{
        textAlign:"center",
        fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif",
        fontSize:"12px", color:"#8a8880", fontStyle:"italic",
        marginTop:18, fontWeight:300, lineHeight:1.6,
      }}>
        Construction in motion — Al Hamra Tower rising over Kuwait City, 2006–2011
      </p>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function TowerRising() {
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

      {/* ══ SECTION 1 · CONSTRUCTION TIMELINE ══════════════════════ */}
      <section id="construction-timeline" style={{ background: "#F8F6F3", padding: "clamp(72px,10vh,128px) 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(24px,6vw,96px)" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
            style={{ marginBottom:"clamp(48px,6vh,80px)" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <span style={{ width:32, height:1, background:`linear-gradient(to right,${PEARL},#D4CFC9)`, flexShrink:0 }} />
              <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"11px", letterSpacing:"0.4em", textTransform:"uppercase", color:PEARL, margin:0 }}>
                Construction Timeline
              </p>
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:32, flexWrap:"wrap" }}>
              <h2 style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontWeight:300, fontSize:"clamp(30px,4vw,54px)", color:DARK, lineHeight:1.1, margin:0, letterSpacing:"-0.015em" }}>
                From excavation<br />to icon.
              </h2>
              <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontWeight:300, fontSize:"clamp(13px,1.1vw,15px)", color:"#6a6a68", lineHeight:1.8, margin:0, maxWidth:440 }}>
                Five phases. Five years. One of the most architecturally and structurally complex supertall buildings ever constructed.
              </p>
            </div>
          </motion.div>

          {/* Phase year strip */}
          <motion.div
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.2 }}
            style={{ display:"flex", marginBottom:"clamp(56px,7vh,80px)", borderBottom:"1px solid rgba(200,185,154,0.2)" }}
          >
            {PHASES.map((p) => (
              <div key={p.number} style={{
                flex:1, padding:"14px 8px",
                textAlign:"center",
              }}>
                <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#9a9894" }}>
                  <span style={{ display:"block", marginBottom:2, fontSize:"9px", opacity:0.5 }}>{p.number}</span>
                  {p.year}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Video */}
          <VideoFeature />

          {/* 5 Phase Cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:"clamp(48px,6vh,72px)" }}>
            {PHASES.map((phase, i) => (
              <PhaseCard key={phase.number} phase={phase} index={i} />
            ))}
          </div>

        </div>
      </section>

      <PatternBand />

      {/* ══ SECTION 2 · THE LAMELLA STORY ══════════════════════════ */}
      <section style={{ background: DARK, overflow:"hidden" }} className="pattern-band">
        <div ref={lamellaRef} style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(64px,10vh,120px) clamp(24px,6vw,96px)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="lamella-grid">

            <div>
              <motion.div
                initial={{ opacity:0, x:-24 }}
                animate={inView ? { opacity:1, x:0 } : {}}
                transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
                  <span style={{ width:32, height:1, background:`linear-gradient(to right,${PEARL},#D4CFC9)` }} />
                  <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"11px", letterSpacing:"0.4em", textTransform:"uppercase", color:PEARL }}>
                    Engineering Feat
                  </div>
                </div>
                <h2 style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontWeight:300, fontSize:"clamp(28px,3.5vw,48px)", color:"#fff", lineHeight:1.1, marginBottom:24, letterSpacing:"-0.01em" }}>
                  The Lamella — a 24-metre<br />vault with no columns.
                </h2>
                <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontWeight:300, fontSize:"clamp(13px,1.1vw,15px)", color:"rgba(255,255,255,0.6)", lineHeight:1.9, marginBottom:20 }}>
                  To create Kuwait's most dramatic lobby, SOM devised the lamella bracing system — a web of five distinct element types (A through E) that curve outward from the building core following a circular arch 24 metres high, creating a completely column-free space beneath the tower.
                </p>
                <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontWeight:300, fontSize:"clamp(13px,1.1vw,15px)", color:"rgba(255,255,255,0.6)", lineHeight:1.9, marginBottom:36 }}>
                  Each element was designed using parametric 3D modelling. The fiberglass formwork moulds were fabricated directly from digital models. Non-linear buckling analyses were performed on every member — engineering and architecture resolved as a single sculptural gesture.
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                  {LAMELLA_FACTS.map(({ n, l }) => (
                    <div key={l} style={{ borderTop:"1px solid rgba(200,185,154,0.2)", paddingTop:16 }}>
                      <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"clamp(20px,2.5vw,32px)", fontWeight:300, color:"#fff", marginBottom:4 }}>{n}</div>
                      <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity:0, scale:1.04 }}
              animate={inView ? { opacity:1, scale:1 } : {}}
              transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
              style={{ position:"relative", overflow:"hidden" }}
            >
              <img
                src="/assets/lobby-ceiling-day.jpg"
                alt="Al Hamra Tower — lamella lobby ceiling, 24 metres high, column-free"
                style={{ width:"100%", display:"block", objectFit:"cover", minHeight:400 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/assets/lobby-interior.jpg"; }}
              />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%", background:`linear-gradient(to top,${DARK},transparent)`, pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:20, left:20, fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase", color:PEARL }}>
                The lobby lamella · Ground floor
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PatternBand />

      {/* ══ SECTION 3 · THE BUILDING TODAY ═════════════════════════ */}
      <section style={{ background:"#fff", padding:"clamp(64px,10vh,100px) clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:48 }}>
            <span style={{ width:32, height:1, background:`linear-gradient(to right,${PEARL},#D4CFC9)` }} />
            <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT',sans-serif", fontSize:"11px", letterSpacing:"0.4em", textTransform:"uppercase", color:PEARL }}>
              The Tower Today
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:2 }} className="gallery-grid">
            {[
              { src:"/assets/tower-day-sky.jpg",          alt:"Al Hamra Tower against blue Kuwaiti sky" },
              { src:"/assets/tower-facade-stone.jpg",     alt:"Jura limestone facade — the stone south wall" },
              { src:"/assets/tower-entrance-lit.jpg",     alt:"Tower entrance lit at night" },
              { src:"/assets/offices_south_corridor.jpg", alt:"Office south corridor" },
              { src:"/assets/sky-lobby-corridor.jpg",     alt:"Sky Lobby corridor — travertine, chandelier rings, Gulf views" },
              { src:"/assets/mall-atrium-skylight.jpg",   alt:"Al Hamra Luxury Centre atrium" },
            ].map(({ src, alt }, i) => (
              <motion.div key={src} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.7, delay:i*0.08 }} style={{ overflow:"hidden", aspectRatio:"4/3", background:"#0c0b09" }} whileHover={{ scale:1.02 }}>
                <img src={src} alt={alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s ease" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ctShimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }
        @media(max-width:900px){
          .phase-row{grid-template-columns:clamp(36px,5vw,52px) 1fr!important}
          .phase-row>*:nth-child(1){grid-column:2!important;grid-row:1!important;padding:0 0 20px 16px!important}
          .phase-row>*:nth-child(2){grid-column:1!important;grid-row:1/3!important}
          .phase-row>*:nth-child(3){grid-column:2!important;grid-row:2!important;padding:0 0 0 16px!important;text-align:left!important}
          .lamella-grid{grid-template-columns:1fr!important;gap:40px!important}
          .gallery-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:540px){.gallery-grid{grid-template-columns:1fr!important}}
        @media(prefers-reduced-motion:reduce){*{transition-duration:0.01ms!important;animation-duration:0.01ms!important}}
      `}</style>

      <Footer />
    </>
  );
}
