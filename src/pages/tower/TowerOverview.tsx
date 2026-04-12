import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

/* ─── Brand tokens ─────────────────────────── */
const SAND    = "#C5A882";   /* use only on dark backgrounds */
const SAND_AA = "#9A7550";   /* 4.58:1 on white — WCAG AA ✅ */
const CREAM = "#F5F0E8";
const STONE = "#E8E0D4";
const DARK  = "#1D1D1B";
const MUTED = "#8A8580";
const WHITE = "#FFFFFF";

/* ─── Data ─────────────────────────────────── */
const TABS = ["Overview", "The Apex", "The Core", "The Foundation"];

const TAB_DATA = {
  Overview: {
    heading: "Kuwait's Landmark of Precision",
    body: "Al Hamra Business Tower rises 413 metres above Kuwait City — a permanent fixture on the Gulf skyline and a symbol of architectural ambition. Designed by Skidmore, Owings & Merrill, it stands as the world's tallest sculpted concrete tower, combining environmental intelligence with structural innovation.",
    stats: [{ n: "~413", u: "m", l: "Total Height" }, { n: "#1", u: "", l: "Tallest in Kuwait" }, { n: "24", u: "m", l: "Lobby Height" }],
    img: "/assets/kuwait-skyline.jpg",
  },
  "The Apex": {
    heading: "The Crown — 413 Metres",
    body: "One of the tallest towers in the region. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline. The asymmetrical spiral terminates in a razor-sharp apex — simultaneously shelter and statement.",
    stats: [{ n: "413", u: "m", l: "Apex Height" }, { n: "80", u: "", l: "Total Stories" }, { n: "60°", u: "", l: "Floor Rotation Crown" }],
    img: "/assets/tower-sunset.jpg",
  },
  "The Core": {
    heading: "Structural Intelligence",
    body: "Al Hamra Business Tower is anchored by structural intelligence and engineering precision. At its center, a reinforced concrete shear wall core serves as the primary lateral force-resisting system, complemented by a perimeter moment-resisting frame.",
    stats: [{ n: "1,200", u: "mm", l: "Shear Wall Thickness" }, { n: "85k", u: "m³", l: "Concrete Volume" }, { n: "50–80", u: "MPa", l: "Concrete Strength" }],
    img: "/assets/tower-facade-up.jpg",
  },
  "The Foundation": {
    heading: "Anchored for Centuries",
    body: "Beneath its sculpted form lies a foundation system engineered for long-term resilience. A 4.2-metre-deep raft foundation supported by 289 bored piles anchors the structure securely. Validated through comprehensive wind tunnel testing.",
    stats: [{ n: "4.2", u: "m", l: "Raft Foundation Depth" }, { n: "289", u: "", l: "Bored Piles" }, { n: "5,800", u: "m²", l: "Foundation Mat" }],
    img: "/assets/tower-street.jpg",
  },
};

const AWARDS = [
  { year: "2012", award: "Best Tall Building Middle East & Africa",   org: "CTBUH",                        icon: "◆" },
  { year: "2013", award: "MIPIM Architectural Review Future Project", org: "MIPIM Awards",                 icon: "◈" },
  { year: "2014", award: "Emirates Glass LEAF Award",                 org: "LEAF International",           icon: "◇" },
  { year: "2016", award: "International Property Award",             org: "International Property Awards", icon: "◆" },
  { year: "2019", award: "Iconic Landmark Recognition",              org: "World Architecture Festival",   icon: "◈" },
];

/* ─── 3D Tilt Card ──────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateY: tilt.x, rotateX: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 800, ...style }}
    >{children}</motion.div>
  );
}

/* ─── CountUp ───────────────────────────────── */
function CountUp({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(value);  /* T5: no flash — start at final value */
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]*$/)?.[0] ?? "";
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${prefix}${(eased * num).toFixed(num % 1 !== 0 ? 1 : 0)}${suffix}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

/* ─── FloatParticle ─────────────────────────── */
function FloatParticle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      style={{ position:"absolute", left:x, top:y, width:size, height:size, borderRadius:"50%", background:SAND, opacity:0.12, pointerEvents:"none" }}
      animate={{ y:[0,-24,0], opacity:[0.10,0.18,0.10] }}
      transition={{ duration:5+delay, repeat:Infinity, ease:"easeInOut", delay }}
    />
  );
}

/* ─── Main ──────────────────────────────────── */
export default function TowerOverview() {
  const [tab, setTab] = useState("Overview");
  const content = TAB_DATA[tab as keyof typeof TAB_DATA];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const springY    = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), { stiffness:80, damping:20 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <PageLayout>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position:"relative", height:"100vh", overflow:"hidden", background:DARK }}>
        <motion.div style={{ position:"absolute", inset:0, y:springY }}>
          <img src="/assets/tower-sunset.jpg" alt="Al Hamra Tower"
            style={{ width:"100%", height:"115%", objectFit:"cover", objectPosition:"center top", filter:"brightness(0.75) saturate(1.1)" }} />
        </motion.div>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(29,29,27,0.25) 0%,transparent 40%,rgba(29,29,27,0.72) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(197,168,130,0.2) 0%,transparent 60%)" }} />

        <FloatParticle x="12%" y="60%" size={6} delay={0} />
        <FloatParticle x="25%" y="38%" size={4} delay={1.2} />
        <FloatParticle x="80%" y="70%" size={5} delay={0.6} />

        {/* Hero text */}
        <motion.div style={{ position:"absolute", bottom:0, left:0, right:0, y:textY, opacity:heroOpacity }}
          className="tower-hero-text"
        >
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
            style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20,
              fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.35em", textTransform:"uppercase" }}
          >
            <Link to="/" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Home</Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>›</span>
            <span style={{ color:"rgba(255,255,255,0.7)" }}>The Tower</span>
          </motion.div>

          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.9, ease:[0.16,1,0.3,1] }}>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(10px,1.1vw,12px)", letterSpacing:"0.5em", textTransform:"uppercase", color:SAND_AA, marginBottom:14 }}>
              Al Hamra Business Tower · SOM Architecture
            </div>
            <h1 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(40px,7vw,96px)", fontWeight:100, letterSpacing:"-0.03em", lineHeight:0.92, color:WHITE, marginBottom:20 }}>
              413<span style={{ fontFamily:"Cormorant Garamond,serif", fontStyle:"italic", fontWeight:300, color:SAND }}>m</span>
              <br />
              <span style={{ fontWeight:300, fontSize:"0.75em" }}>Above the Gulf</span>
            </h1>
            <p style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(12px,1.2vw,14px)", fontWeight:300, color:"rgba(255,255,255,0.55)", lineHeight:1.8, maxWidth:420 }}>
              Kuwait's most iconic commercial landmark — designed by Skidmore, Owings & Merrill.
            </p>
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.6 }}
            style={{ display:"flex", alignItems:"center", gap:12, marginTop:40 }}
          >
            <motion.div animate={{ scaleX:[0,1,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}
              style={{ width:48, height:1, background:SAND, transformOrigin:"left" }} />
            <span style={{ fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>
              Scroll to discover
            </span>
          </motion.div>
        </motion.div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:"linear-gradient(transparent,#FAFAF8)", pointerEvents:"none" }} />
      </section>

      {/* ══ STATS ══════════════════════════════════════════ */}
      <section style={{ background:"#FAFAF8", padding:"0" }}>
        <div className="tower-stats-grid">
          {[
            { n:"413", u:"m",  l:"Landmark Height",          icon:"↑" },
            { n:"80",  u:"",   l:"Stories of Office Space",  icon:"⬡" },
            { n:"#23", u:"",   l:"World Rank at Completion", icon:"◎" },
          ].map(({ n, u, l, icon }, i) => (
            <motion.div key={l}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.6 }}
              whileHover={{ backgroundColor:WHITE, scale:1.01 }}
              style={{ background:WHITE, padding:"clamp(28px,3vw,44px) clamp(20px,2.5vw,36px)", cursor:"default", transition:"background 0.3s", borderRight:`1px solid ${STONE}` }}
            >
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:10, color:SAND, letterSpacing:"0.3em", marginBottom:10 }}>{icon}</div>
              <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, color:DARK, lineHeight:1 }}>
                <CountUp value={n} />
                {u && <span style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(12px,1.8vw,20px)", fontWeight:200, color:SAND }}>{u}</span>}
              </div>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.3em", textTransform:"uppercase", color:MUTED, marginTop:8 }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TABS ═══════════════════════════════════════════ */}
      <section style={{ background:"#FAFAF8", paddingTop:60 }}>
        {/* Tab strip */}
        <div style={{ display:"flex", overflowX:"auto", padding:"0 clamp(20px,5vw,80px)", borderBottom:`1px solid ${STONE}`, position:"relative" }}>
          {TABS.map((t, i) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} style={{
                position:"relative", padding:"18px clamp(14px,2vw,28px) 16px",
                background:"none", border:"none", cursor:"pointer",
                fontFamily:"Jost,sans-serif", fontSize:"clamp(10px,1vw,10.5px)",
                letterSpacing:"0.2em", textTransform:"uppercase",
                color: active ? DARK : MUTED, transition:"color 0.25s", flexShrink:0, textAlign:"left" as const,
              }}>
                <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontFamily:"Cormorant Garamond,serif", fontSize:14, fontWeight:300, color:active ? SAND : STONE }}>{String(i+1).padStart(2,"0")}</span>
                  {t}
                </span>
                {active && (
                  <motion.div layoutId="tower-tab-indicator"
                    style={{ position:"absolute", bottom:-1, left:0, right:0, height:2, background:DARK }}
                    transition={{ type:"spring", stiffness:400, damping:35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity:0, y:14, filter:"blur(3px)" }}
            animate={{ opacity:1, y:0, filter:"blur(0px)" }}
            exit={{ opacity:0, y:-8, filter:"blur(3px)" }}
            transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
          >
            {/* Mobile: image FIRST, then text — stacks naturally */}
            <div className="tower-tab-layout">

              {/* Image — right on desktop, top on mobile */}
              <div className="tower-tab-image">
                <motion.img key={tab} src={content.img} alt={content.heading}
                  initial={{ scale:1.06, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(250,250,248,0.08) 0%, transparent 40%)" }} />
                <div style={{ position:"absolute", bottom:16, right:16, fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>
                  Photo: Dave Burk · SOM
                </div>
              </div>

              {/* Text — left on desktop, bottom on mobile */}
              <div className="tower-tab-text">
                <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10.5px", letterSpacing:"0.45em", textTransform:"uppercase", color:SAND_AA, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:24, height:1, background:SAND, flexShrink:0 }} />
                  Al Hamra Tower · {tab}
                </div>
                <h2 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(20px,2.8vw,40px)", fontWeight:200, lineHeight:1.18, letterSpacing:"-0.02em", color:DARK, marginBottom:20 }}>
                  {content.heading}
                </h2>
                <p style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(13px,1.2vw,15px)", fontWeight:300, color:MUTED, lineHeight:1.88, marginBottom:36 }}>
                  {content.body}
                </p>

                {/* Stat chips — 3 across, wrap on mobile */}
                <div className="tower-stat-chips">
                  {content.stats.map(({ n, u, l }) => (
                    <TiltCard key={l} style={{ background:CREAM, padding:"clamp(16px,2vw,22px) clamp(14px,1.5vw,20px)", flex:"1 1 120px", minWidth:0 }}>
                      <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(22px,2.5vw,32px)", fontWeight:300, color:DARK, lineHeight:1 }}>
                        <CountUp value={n} />
                        {u && <span style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(11px,1.2vw,13px)", fontWeight:200, color:SAND }}>{u}</span>}
                      </div>
                      <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.22em", textTransform:"uppercase", color:MUTED, marginTop:8, lineHeight:1.4 }}>{l}</div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ══ AWARDS ═════════════════════════════════════════ */}
      <section className="ah-section" style={{ background:"#FAFAF8" }}>
        <div className="grid-2col">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10.5px", letterSpacing:"0.45em", textTransform:"uppercase", color:SAND_AA, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:24, height:1, background:SAND }} />Awards & Recognition
              </div>
              <h2 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(26px,3.5vw,52px)", fontWeight:100, lineHeight:1.1, letterSpacing:"-0.025em", color:DARK, marginBottom:20 }}>
                Global<br /><span style={{ fontWeight:400 }}>Acknowledgement</span>
              </h2>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14px", fontWeight:300, color:MUTED, lineHeight:1.85, maxWidth:400 }}>
                Recognised by leading architectural institutions for design excellence and long-term presence on the global skyline.
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:32, marginTop:44, paddingTop:36, borderTop:`1px solid ${STONE}` }}>
                {[{ n:"23rd", l:"Tallest in World" }, { n:"#1", l:"Tallest Sculpted Tower" }].map(({ n, l }) => (
                  <div key={l}>
                    <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:300, color:DARK }}>{n}</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.25em", textTransform:"uppercase", color:MUTED, marginTop:6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — award rows */}
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {AWARDS.map(({ year, award, org, icon }, i) => (
              <TiltCard key={year}>
                <motion.div
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.09, duration:0.55 }}
                  whileHover={{ x:4 }}
                  style={{ display:"flex", alignItems:"center", gap:16, background:WHITE, padding:"20px 24px" }}
                >
                  <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(18px,2vw,26px)", fontWeight:300, color:STONE, flexShrink:0 }}>{year}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(11px,1vw,12px)", fontWeight:500, color:DARK, marginBottom:3 }}>{award}</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:MUTED, letterSpacing:"0.08em" }}>{org}</div>
                  </div>
                  <div style={{ color:SAND, fontSize:12, flexShrink:0 }}>{icon}</div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section style={{ position:"relative", overflow:"hidden", background:DARK }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="/assets/lobby-interior.jpg" alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.06, filter:"grayscale(1)" }} />
        </div>
        <motion.div
          animate={{ x:["-100%","200%"] }} transition={{ duration:8, repeat:Infinity, ease:"linear", delay:1 }}
          style={{ position:"absolute", top:0, bottom:0, left:0, width:2, background:`linear-gradient(to bottom,transparent,${SAND}44,transparent)`, transform:"skewX(-20deg)" }}
        />
        <div className="ah-section" style={{ position:"relative", background:"transparent", textAlign:"left" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize: "10px", letterSpacing:"0.5em", textTransform:"uppercase", color:SAND_AA, marginBottom:20 }}>
              Next · Design & Engineering
            </div>
            <h3 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(28px,5vw,64px)", fontWeight:100, color:WHITE, lineHeight:1.08, letterSpacing:"-0.025em", marginBottom:40 }}>
              Form shaped by<br />
              <span style={{ fontWeight:400, color:SAND }}>climate, craft</span><br />
              and ambition
            </h3>
            <Link to="/tower/design"
              style={{ display:"inline-flex", alignItems:"center", gap:14, fontFamily:"Jost,sans-serif", fontSize:"10.5px", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:DARK, background:WHITE, padding:"16px 32px", textDecoration:"none", transition:"all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background=SAND; e.currentTarget.style.color=WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.background=WHITE; e.currentTarget.style.color=DARK; }}
            >
              Design That Performs
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Responsive styles scoped to this page */}
      <style>{`
        .tower-hero-text {
          padding: 0 80px 80px;
        }
        .tower-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${STONE};
          border-top: 1px solid ${STONE};
        }
        .tower-tab-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          border-top: 1px solid ${STONE};
        }
        .tower-tab-text {
          padding: 60px 80px;
          background: ${WHITE};
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }
        .tower-tab-image {
          position: relative;
          overflow: hidden;
          min-height: 400px;
          background: ${STONE};
        }
        .tower-stat-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ── Tablet (< 1024px) ── */
        @media (max-width: 1024px) {
          .tower-hero-text { padding: 0 48px 64px; }
          .tower-tab-text { padding: 48px 48px; }
        }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 768px) {
          .tower-hero-text { padding: 0 24px 52px; }

          .tower-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .tower-stats-grid > *:last-child {
            grid-column: span 2;
            border-right: none;
          }

          /* Stack: image on top, text below */
          .tower-tab-layout {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .tower-tab-image {
            order: -1;
            min-height: 260px;
            max-height: 55vw;
          }
          .tower-tab-text {
            padding: 36px 24px 48px;
            text-align: left;
            justify-content: flex-start;
          }
          .tower-stat-chips {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .tower-stat-chips > * {
            flex: 1 1 calc(50% - 5px) !important;
            min-width: 0 !important;
          }
        }

        /* ── Small mobile (< 480px) ── */
        @media (max-width: 480px) {
          .tower-hero-text { padding: 0 20px 44px; }
          .tower-stats-grid { grid-template-columns: 1fr; }
          .tower-stats-grid > *:last-child { grid-column: span 1; }
          .tower-tab-text { padding: 28px 20px 40px; }
          .tower-tab-image { min-height: 220px; max-height: 60vw; }
          .tower-stat-chips > * { flex: 1 1 100% !important; }
        }
      `}</style>
    </PageLayout>
  );
}
