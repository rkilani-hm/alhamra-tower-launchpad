import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

/* ─── Brand tokens ─────────────────────────── */
const SAND  = "#C5A882";
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
    body: "Al Hamra Business Tower rises 412 metres above Kuwait City — a permanent fixture on the Gulf skyline and a symbol of architectural ambition. Designed by Skidmore, Owings & Merrill, it stands as the world's tallest sculpted concrete tower, combining environmental intelligence with structural innovation.",
    stats: [{ n: "~413", u: "m", l: "Total Height" }, { n: "#1", u: "", l: "Tallest in Kuwait" }, { n: "24", u: "m", l: "Lobby Height" }],
  },
  "The Apex": {
    heading: "The Crown — 412–413 Metres",
    body: "One of the tallest towers in the region. The crown features the distinctive carved geometry that defines Al Hamra's silhouette against the Arabian Gulf skyline. The asymmetrical spiral terminates in a razor-sharp apex — simultaneously shelter and statement.",
    stats: [{ n: "412", u: "m", l: "Apex Height" }, { n: "80", u: "", l: "Total Stories" }, { n: "60°", u: "", l: "Floor Rotation Crown" }],
  },
  "The Core": {
    heading: "Structural Intelligence",
    body: "Al Hamra Business Tower is anchored by structural intelligence and engineering precision. At its center, a reinforced concrete shear wall core serves as the primary lateral force-resisting system, complemented by a perimeter moment-resisting frame engineered to withstand both wind and gravity loads.",
    stats: [{ n: "1,200", u: "mm", l: "Shear Wall Thickness" }, { n: "85k", u: "m³", l: "Concrete Volume" }, { n: "50–80", u: "MPa", l: "Concrete Strength" }],
  },
  "The Foundation": {
    heading: "Anchored for Centuries",
    body: "Beneath its sculpted form lies a foundation system engineered for long-term resilience. A 4.2-metre-deep raft foundation supported by 289 bored piles anchors the structure securely. Structural performance was validated through comprehensive wind tunnel testing.",
    stats: [{ n: "4.2", u: "m", l: "Raft Foundation Depth" }, { n: "289", u: "", l: "Bored Piles" }, { n: "5,800", u: "m²", l: "Foundation Mat" }],
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
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
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
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div ref={ref} className={className}
      onMouseMove={handleMove} onMouseLeave={reset}
      animate={{ rotateY: tilt.x, rotateX: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ──────────────────────── */
function CountUp({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]*$/)?.[0] ?? "";
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (start === 0) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (eased * num).toFixed(num % 1 !== 0 ? 1 : 0);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Floating particle ─────────────────────── */
function FloatParticle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: SAND, opacity: 0.12, pointerEvents: "none" }}
      animate={{ y: [0, -24, 0], opacity: [0.10, 0.18, 0.10] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Main page ─────────────────────────────── */
export default function TowerOverview() {
  const [tab, setTab] = useState("Overview");
  const content = TAB_DATA[tab as keyof typeof TAB_DATA];

  /* Parallax refs */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY   = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const textY       = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);
  const springY     = useSpring(parallaxY, { stiffness: 80, damping: 20 });

  return (
    <PageLayout>
      {/* ══ HERO — full viewport, parallax ══════════════════ */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", overflow: "hidden", background: DARK }}>

        {/* Parallax tower image */}
        <motion.div style={{ position: "absolute", inset: 0, y: springY }}>
          <img src="/assets/tower-sunset.jpg" alt="Al Hamra Tower"
            style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center top", filter: "brightness(0.75) saturate(1.1)" }} />
        </motion.div>

        {/* Warm gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(29,29,27,0.3) 0%, transparent 40%, rgba(29,29,27,0.7) 100%)` }} />

        {/* Sand-tone side vignette */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(197,168,130,0.25) 0%, transparent 50%, rgba(197,168,130,0.1) 100%)` }} />

        {/* Floating particles */}
        <FloatParticle x="12%" y="60%" size={6} delay={0} />
        <FloatParticle x="25%" y="35%" size={4} delay={1.2} />
        <FloatParticle x="80%" y="70%" size={5} delay={0.6} />
        <FloatParticle x="70%" y="25%" size={3} delay={2.1} />

        {/* Hero text — parallax up */}
        <motion.div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 80px 80px", y: textY, opacity: heroOpacity }}>
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase" }}
          >
            <Link to="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>The Tower</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(11px,1.2vw,13px)", letterSpacing: "0.5em", textTransform: "uppercase", color: SAND, marginBottom: 16 }}>
              Al Hamra Business Tower · SOM Architecture
            </div>
            <h1 style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(36px,6vw,88px)", fontWeight: 100, letterSpacing: "-0.03em", lineHeight: 0.95, color: WHITE, marginBottom: 24 }}>
              412<span style={{ fontFamily: "Cormorant Garamond,serif", fontStyle: "italic", fontWeight: 300, color: SAND }}>m</span>
              <br />
              <span style={{ fontWeight: 300 }}>Above the Gulf</span>
            </h1>
            <p style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(13px,1.3vw,15px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 480 }}>
              Kuwait's most iconic commercial landmark — designed by Skidmore, Owings & Merrill.
            </p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 48 }}
          >
            <motion.div
              animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 48, height: 1, background: SAND, transformOrigin: "left" }}
            />
            <span style={{ fontFamily: "Jost,sans-serif", fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Scroll to discover
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom fade to white */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #FAFAF8)", pointerEvents: "none" }} />
      </section>

      {/* ══ FLOATING STATS BAR ══════════════════════════════ */}
      <section style={{ background: "#FAFAF8", padding: "0 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: STONE, margin: "-1px 0 0", transform: "translateZ(0)" }}>
          {[
            { n: "412", u: "m",  l: "Landmark Height",        icon: "↑" },
            { n: "80",  u: "",   l: "Stories of Office Space", icon: "⬡" },
            { n: "#23", u: "",   l: "World Rank at Completion",icon: "◎" },
          ].map(({ n, u, l, icon }, i) => (
            <motion.div key={l}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ background: WHITE, scale: 1.01 }}
              style={{ background: WHITE, padding: "44px 36px", cursor: "default", transition: "background 0.3s" }}
            >
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: 10, color: SAND, letterSpacing: "0.3em", marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                <CountUp value={n} />
                {u && <span style={{ fontFamily: "Jost,sans-serif", fontSize: "clamp(14px,2vw,20px)", fontWeight: 200, color: SAND }}>{u}</span>}
              </div>
              <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: MUTED, marginTop: 8 }}>{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TABS — 3D CONTENT CARDS ══════════════════════════ */}
      <section style={{ background: "#FAFAF8", padding: "80px 0 0" }}>
        {/* Tab strip */}
        <div style={{ display: "flex", overflowX: "auto", padding: "0 80px", borderBottom: `1px solid ${STONE}`, background: "#FAFAF8", position: "relative" }}>
          {TABS.map((t, i) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  position: "relative", padding: "20px 28px 18px", background: "none", border: "none",
                  cursor: "pointer", fontFamily: "Jost,sans-serif", fontSize: "10.5px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: active ? DARK : MUTED,
                  transition: "color 0.25s", flexShrink: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 14, fontWeight: 300, color: active ? SAND : STONE }}>{String(i+1).padStart(2,"0")}</span>
                  {t}
                </span>
                {active && (
                  <motion.div layoutId="tab-underline"
                    style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: DARK }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Two-col: text + image */}
            <div className="grid-2col media-right" style={{ borderTop: `1px solid ${STONE}` }}>
              {/* Left — text */}
              <div style={{ padding: "72px 80px", background: WHITE }}>
                <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1, duration:0.6 }}>
                  <div style={{ fontFamily:"Jost,sans-serif", fontSize:"9.5px", letterSpacing:"0.45em", textTransform:"uppercase", color:SAND, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:28, height:1, background:SAND }} />
                    Al Hamra Tower · {tab}
                  </div>
                  <h2 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(24px,3vw,44px)", fontWeight:200, lineHeight:1.15, letterSpacing:"-0.02em", color:DARK, marginBottom:24 }}>
                    {content.heading}
                  </h2>
                  <p style={{ fontFamily:"Jost,sans-serif", fontSize:"15px", fontWeight:300, color:MUTED, lineHeight:1.9, maxWidth:520, marginBottom:48 }}>
                    {content.body}
                  </p>
                </motion.div>

                {/* Stat cards — 3D tilt */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                  {content.stats.map(({ n, u, l }, i) => (
                    <TiltCard key={l} style={{ background:CREAM, padding:"24px 20px" }}>
                      <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(22px,2.5vw,34px)", fontWeight:300, color:DARK, lineHeight:1 }}>
                        <CountUp value={n} />
                        {u && <span style={{ fontFamily:"Jost,sans-serif", fontSize:13, fontWeight:200, color:SAND }}>{u}</span>}
                      </div>
                      <div style={{ fontFamily:"Jost,sans-serif", fontSize:"8.5px", letterSpacing:"0.25em", textTransform:"uppercase", color:MUTED, marginTop:8 }}>{l}</div>
                    </TiltCard>
                  ))}
                </div>
              </div>

              {/* Right — image */}
              <div style={{ position:"relative", overflow:"hidden", minHeight:480, background:STONE }}>
                <motion.img
                  key={tab}
                  src={tab === "The Foundation" ? "/assets/tower-street.jpg" : tab === "The Core" ? "/assets/tower-facade-up.jpg" : tab === "The Apex" ? "/assets/tower-sunset.jpg" : "/assets/kuwait-skyline.jpg"}
                  alt={content.heading}
                  initial={{ scale:1.08, opacity:0 }}
                  animate={{ scale:1, opacity:1 }}
                  transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }}
                />
                {/* Warm overlay */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left, transparent 60%, rgba(255,255,255,0.08) 100%)" }} />
                {/* Photo credit */}
                <div style={{ position:"absolute", bottom:20, right:20, fontFamily:"Jost,sans-serif", fontSize:"8px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>
                  Photo: Dave Burk · SOM
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ══ AWARDS — DEPTH CARDS ═══════════════════════════ */}
      <section style={{ background:"#FAFAF8", padding:"96px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }} className="grid-2col">

          {/* Left — title */}
          <div>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
              <div style={{ fontFamily:"Jost,sans-serif", fontSize:"9.5px", letterSpacing:"0.45em", textTransform:"uppercase", color:SAND, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:28, height:1, background:SAND }} />
                Awards & Recognition
              </div>
              <h2 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(28px,3.5vw,52px)", fontWeight:100, lineHeight:1.1, letterSpacing:"-0.025em", color:DARK, marginBottom:24 }}>
                Global<br />
                <span style={{ fontWeight:400 }}>Acknowledgement</span>
              </h2>
              <p style={{ fontFamily:"Jost,sans-serif", fontSize:"14.5px", fontWeight:300, color:MUTED, lineHeight:1.85, maxWidth:420 }}>
                Recognised by leading architectural and development institutions for design excellence and long-term presence on the global skyline.
              </p>

              {/* Global standing stats */}
              <div style={{ display:"flex", gap:32, marginTop:48, paddingTop:40, borderTop:`1px solid ${STONE}` }}>
                {[{ n:"23rd", l:"Tallest in World" }, { n:"#1", l:"Tallest Sculpted Tower" }].map(({ n, l }) => (
                  <div key={l}>
                    <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:300, color:DARK }}>{n}</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:MUTED, marginTop:6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — award cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {AWARDS.map(({ year, award, org, icon }, i) => (
              <TiltCard key={year}
                style={{ background:WHITE, padding:"22px 28px", display:"flex", alignItems:"center", gap:20, borderLeft:`2px solid transparent`, transition:"border-color 0.3s" }}
              >
                <motion.div
                  initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.1, duration:0.6 }}
                  style={{ display:"flex", alignItems:"center", gap:20, width:"100%" }}
                  whileHover={{ x:4 }}
                >
                  <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:28, fontWeight:300, color:STONE, flexShrink:0, lineHeight:1 }}>{year}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:"12px", fontWeight:500, color:DARK, marginBottom:3 }}>{award}</div>
                    <div style={{ fontFamily:"Jost,sans-serif", fontSize:"10px", color:MUTED, letterSpacing:"0.1em" }}>{org}</div>
                  </div>
                  <div style={{ color:SAND, fontSize:14, flexShrink:0 }}>{icon}</div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA — FULL-BLEED DARK BAND ════════════════════ */}
      <section style={{ position:"relative", overflow:"hidden", background:DARK, padding:"0" }}>
        {/* Background — facade-up photo very dim */}
        <div style={{ position:"absolute", inset:0 }}>
          <img src="/assets/lobby-interior.jpg" alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", opacity:0.06, filter:"grayscale(1)" }} />
        </div>

        {/* Animated diagonal sand line */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration:8, repeat:Infinity, ease:"linear", delay:1 }}
          style={{ position:"absolute", top:0, bottom:0, left:0, width:1, background:`linear-gradient(to bottom, transparent, ${SAND}55, transparent)`, transform:"skewX(-20deg)" }}
        />

        <div style={{ position:"relative", padding:"96px 80px", display:"flex", flexDirection:"column" as const, alignItems:"flex-start" }}>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
            <div style={{ fontFamily:"Jost,sans-serif", fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase", color:SAND, marginBottom:20 }}>
              Next · Design & Engineering
            </div>
            <h3 style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(24px,4vw,60px)", fontWeight:100, color:WHITE, lineHeight:1.05, letterSpacing:"-0.025em", marginBottom:40 }}>
              Form shaped by<br />
              <span style={{ fontWeight:400, color:SAND }}>climate, craft</span><br />
              and ambition
            </h3>

            <Link to="/tower/design"
              style={{
                display:"inline-flex", alignItems:"center", gap:14,
                fontFamily:"Jost,sans-serif", fontSize:"10.5px", fontWeight:500,
                letterSpacing:"0.22em", textTransform:"uppercase",
                color:DARK, background:WHITE,
                padding:"16px 36px", textDecoration:"none",
                transition:"all 0.3s",
              }}
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
    </PageLayout>
  );
}
