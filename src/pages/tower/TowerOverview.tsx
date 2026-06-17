import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PatternBackground } from "@/components/shared/PatternBand";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

const CREAM  = "#F5F0E8";
const STONE  = "#E8E0D4";
const DARK   = "#1D1D1B";
const PEARL  = "#C8B99A";

/* ── Bilingual content dictionary ─────────────────────────────────────
   English copy preserved verbatim. Arabic copy sourced from
   the Al Hamra V01 Arabic translation sheet.
──────────────────────────────────────────────────────────────────────── */
;

/* ── CountUp ── */
function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(num) || num === 0) { setDisplay(value); return; }
    let start = 0;
    const step = Math.ceil(num / 40);
    const t = setTimeout(() => {
      const id = setInterval(() => {
        start += step;
        if (start >= num) { setDisplay(value); clearInterval(id); }
        else setDisplay(value.replace(/[0-9,]+/, start.toLocaleString()));
      }, 30);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView]);
  return <span ref={ref}>{display}</span>;
}

/* ── TiltCard ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className={className}
      style={{ transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease", willChange: "transform" }}>
      {children}
    </div>
  );
}

export default function TowerOverview() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.towerOverview");
  const c = usePageContent<any>("towerOverview", cStatic, lang);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "22%"]), { stiffness: 50, damping: 18 });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeTab, setActiveTab] = useState(c.tabs[0].id);
  const activeContent = c.tabs.find(t => t.id === activeTab) ?? c.tabs[0];

  const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

  return (
    <PageLayout>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ position: "relative", height: "90vh", minHeight: 520, overflow: "hidden", background: "#0c0b09" }}>
        <SlotImage
          motion
          slot="towerOverview.banner"
          fallback="/assets/tower-overview-banner.jpg"
          alt={lang === "ar" ? "برج الحمراء — رسم SOM المعماري الرسمي عند الغسق، مدينة الكويت" : "Al Hamra Tower — official SOM architectural render at dusk, Kuwait City"}
          style={{ y: imgY, position: "absolute", inset: 0, width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center top" }}
        />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(12,11,9,0.3) 0%, transparent 30%, rgba(12,11,9,0.25) 65%, rgba(12,11,9,0.9) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(12,11,9,0.6) 0%, transparent 60%)" }} />
        <motion.div style={{ opacity: fade, position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 clamp(28px,6vw,96px) clamp(48px,7vh,80px)" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
              fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL }}>
            <span style={{ width: 32, height: 1, background: `linear-gradient(to right,${PEARL},#D4CFC9)`, flexShrink: 0 }} />
            <Editable id="page_prose:towerOverview:heroKicker">{c.heroKicker}</Editable>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: FONT,
              fontWeight: 300, fontSize: "clamp(36px,6vw,88px)", color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1.0, margin: "0 0 12px" }}>
            <Editable id="page_prose:towerOverview:heroTitle">{c.heroTitle}</Editable>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            style={{ fontFamily: FONT, fontWeight: 200,
              fontSize: "clamp(13px,1.3vw,18px)", color: "rgba(255,255,255,0.6)",
              maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            {c.heroSub[0]}<br />
            {c.heroSub[1]}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{ marginTop: 8, fontFamily: FONT, fontSize: "10px",
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
            <Editable id="page_prose:towerOverview:heroCredit">{c.heroCredit}</Editable>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats grid ─────────────────────────────────────────────── */}
      <PatternBackground opacity={0.3} style={{ background: "#fff", borderBottom: "1px solid rgba(29,29,27,0.07)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }} className="overview-stats-grid">
          {c.stats.map(({ n, u, icon, l, sub }, i) => (
            <motion.div key={l}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ padding: "clamp(28px,4vh,44px) clamp(20px,3vw,40px)",
                borderRight: [0,1,3,4].includes(i) ? "1px solid rgba(29,29,27,0.07)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none",
                display: "flex", flexDirection: "column", gap: 6 }}>
              <div aria-hidden="true" style={{ fontFamily: FONT, fontSize: "10px",
                color: PEARL, letterSpacing: "0.3em", marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: FONT,
                fontSize: "clamp(22px,3vw,42px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                <EditableRow id={`stat_counters:towerOverview:towerOverview_${i}`}>
                <CountUp value={n} delay={i * 0.1} />
                {u && <span style={{ fontFamily: FONT,
                  fontSize: "clamp(11px,1.3vw,17px)", fontWeight: 200, color: PEARL, marginLeft: 4 }}>{u}</span>}
                </EditableRow>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.2em", textTransform: "uppercase", color: DARK, fontWeight: 400 }}>{l}</div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.82vw,11px)",
                color: "#6B6B6B" }}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </PatternBackground>

      {/* ── Architecture tabs ──────────────────────────────────────── */}
      <div style={{ background: CREAM, padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(29,29,27,0.1)",
          marginBottom: 56, overflowX: "auto" }}>
          {c.tabs.map(tab => (
            <button type="button" key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ position: "relative", background: "none", border: "none",
                padding: "14px 28px", cursor: "pointer",
                fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.3em", textTransform: "uppercase", whiteSpace: "nowrap",
                color: activeTab === tab.id ? DARK : "#6B6B6B",
                fontWeight: activeTab === tab.id ? 500 : 300,
                transition: "color 0.3s" }}>
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-line"
                  style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2,
                    background: `linear-gradient(to right,${PEARL},#D4CFC9)` }} />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)" }}
            className="tab-content-grid">
            <div>
              <h2 style={{ fontFamily: FONT,
                fontWeight: 300, fontSize: "clamp(24px,3vw,42px)", color: DARK,
                lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.01em" }}>
                {activeContent.heading}
              </h2>
              {activeContent.body.map((p, i) => (
                <p key={i} style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
                  lineHeight: 1.9, marginBottom: 16 }}>{p}</p>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ borderLeft: `2px solid ${PEARL}`, paddingLeft: 24, marginBottom: 40 }}>
                <p style={{ fontFamily: FONT, fontStyle: "italic",
                  fontSize: "clamp(15px,1.4vw,19px)", color: DARK, lineHeight: 1.7, margin: "0 0 12px" }}>
                  "{activeContent.quote}"
                </p>
                <div style={{ fontFamily: FONT, fontSize: "10px",
                  letterSpacing: "0.28em", textTransform: "uppercase", color: PEARL }}>
                  {activeContent.credit}
                </div>
              </div>
              <TiltCard>
                <div style={{ background: STONE, padding: "clamp(24px,3vh,36px) clamp(20px,3vw,36px)" }}>
                  <div style={{ fontFamily: FONT,
                    fontSize: "clamp(36px,5vw,68px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                    {activeContent.statN}
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                    letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", marginTop: 8 }}>
                    {activeContent.statL}
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Awards strip ───────────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(48px,7vh,80px) clamp(28px,6vw,96px)",
        borderTop: "1px solid rgba(29,29,27,0.07)" }}>
        <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
          letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 36 }}>
          <Editable id="page_prose:towerOverview:awardsKicker">{c.awardsKicker}</Editable>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
          {c.awards.map(({ year, title, sub }, i) => (
            <motion.div key={year + title}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              style={{ borderLeft: `1px solid rgba(200,185,154,0.4)`, paddingLeft: 20 }}>
              <div style={{ fontFamily: FONT,
                fontSize: "clamp(20px,2vw,28px)", fontWeight: 300, color: DARK, lineHeight: 1, marginBottom: 6 }}>
                {year}
              </div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(11px,0.9vw,13px)",
                fontWeight: 400, color: DARK, marginBottom: 4 }}>
                <EditableRow id={`awards::${i}`}>{title}</EditableRow>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.8vw,11px)",
                color: "#6B6B6B" }}>{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div style={{ background: DARK, padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)",
        textAlign: "center" }}>
        <div style={{ fontFamily: FONT,
          fontWeight: 300, fontSize: "clamp(28px,4vw,56px)", color: "#fff",
          letterSpacing: "-0.01em", marginBottom: 40 }}>
          <Editable id="page_prose:towerOverview:ctaHeadline">{c.ctaHeadline}</Editable>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <Link to="/tower/design" style={{ display: "inline-flex", alignItems: "center", gap: 12,
            background: "none", border: `1px solid rgba(200,185,154,0.4)`, color: PEARL,
            fontFamily: FONT, fontSize: "10.5px", letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "15px 32px", textDecoration: "none",
            transition: "all 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=PEARL;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,185,154,0.4)";e.currentTarget.style.color=PEARL;}}>
            <Editable id="page_prose:towerOverview:ctaPrimary">{c.ctaPrimary}</Editable>
          </Link>
          <Link to="/leasing/inquiry#inquiry-form" style={{ display: "inline-flex", alignItems: "center", gap: 12,
            background: "#fff", color: DARK, fontFamily: FONT,
            fontSize: "10.5px", letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "15px 32px", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=PEARL;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=DARK;}}>
            <Editable id="page_prose:towerOverview:ctaSecondary">{c.ctaSecondary}</Editable>
          </Link>
        </div>
      </div>

      <style>{`
        .overview-stats-grid { grid-template-columns: repeat(3,1fr) !important; }
        .tab-content-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 900px) {
          .overview-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .tab-content-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .overview-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
