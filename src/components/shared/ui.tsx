import { ReactNode, useRef } from "react";
import { motion }    from "framer-motion";
import { useInView } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";

const CG = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── SCROLL REVEAL ───────────────────────── */
interface RvProps { children: ReactNode; delay?: number; style?: React.CSSProperties; className?: string; }
export function Rv({ children, delay=0, style, className }: RvProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" as Parameters<typeof useInView>[1]["margin"] });
  return (
    <motion.div ref={ref} style={style} className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >{children}</motion.div>
  );
}


/* ── STATS BAR ───────────────────────────── */
interface Stat { number: string; unit?: string; label: string; }
export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="stats-bar" style={{ gridTemplateColumns: `repeat(${stats.length},1fr)` }}>
      {stats.map(({ number, unit, label }, i) => (
        <Rv key={label} delay={i*0.08}>
          <div className="stats-bar-cell"
            style={{ borderRight: i<stats.length-1 ? "1px solid rgba(29,29,27,0.09)" : "none", transition:"background 0.3s", cursor:"default" }}
            onMouseEnter={e=>((e.currentTarget as HTMLDivElement).style.background="#FAFAFA")}
            onMouseLeave={e=>((e.currentTarget as HTMLDivElement).style.background="#fff")}
          >
            <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"clamp(36px,4vw,52px)", fontWeight:300, lineHeight:1, color:"#1D1D1B", marginBottom:8 }}>
              {number}{unit && <span style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"clamp(14px,2vw,20px)", fontWeight:200, color:"#767676" }}>{unit}</span>}
            </div>
            <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing:"0.3em", textTransform:"uppercase", color:"#767676" }}>{label}</div>
          </div>
        </Rv>
      ))}
    </div>
  );
}

/* ── FEATURE GRID ────────────────────────── */
interface Feature { number: string; title: string; body: string; }
export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="feature-grid">
      {features.map(({ number, title, body }) => (
        <div key={number} className="ah-card-hover" style={{ background:"#fff", padding:"clamp(20px,2vw,28px) clamp(16px,2vw,26px)" }}
          onMouseEnter={e=>((e.currentTarget as HTMLDivElement).style.background="#FAFAFA")}
          onMouseLeave={e=>((e.currentTarget as HTMLDivElement).style.background="#fff")}
        >
          <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color:"#767676", letterSpacing:"0.2em", marginBottom:10 }}>{number}</div>
          <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"13px", fontWeight:500, color:"#1D1D1B", marginBottom:8, letterSpacing:"0.04em" }}>{title}</div>
          <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"12px", color:"#6B6B6B", lineHeight:1.8 }}>{body}</div>
        </div>
      ))}
    </div>
  );
}

/* ── SPEC TABLE ──────────────────────────── */
interface Spec { label: string; value: string; }
export function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <div>
      {specs.map(({ label, value }, i) => (
        <div key={label} style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"8px 24px", padding:"14px 0", borderBottom: i<specs.length-1 ? "1px solid rgba(29,29,27,0.07)":"none" }}>
          <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing:"0.22em", textTransform:"uppercase", color:"#767676", minWidth:"clamp(130px,20vw,200px)", flexShrink:0 }}>{label}</div>
          <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"14px", fontWeight:300, color:"#1D1D1B" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

/* ── TWO-COL SECTION ─────────────────────── */
interface TwoColProps { left: ReactNode; right: ReactNode; flip?: boolean; bg?: string; }
export function TwoCol({ left, right, flip=false, bg="#fff" }: TwoColProps) {
  return (
    <div className="grid-2col" style={{ background:bg, borderTop:"1px solid rgba(29,29,27,0.09)" }}>
      {flip ? <>{right}{left}</> : <>{left}{right}</>}
    </div>
  );
}

/* ── SECTION WRAPPER ─────────────────────── */
interface SWProps { children: ReactNode; bg?: string; style?: React.CSSProperties; }
export function Section({ children, bg="#fff", style }: SWProps) {
  return (
    <section className="ah-section" style={{ background:bg, borderTop:"1px solid rgba(29,29,27,0.09)", ...style }}>
      {children}
    </section>
  );
}

/* ── SECTION TAG ─────────────────────────── */
export function Tag({ children }: { children: ReactNode }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" as Parameters<typeof useInView>[1]["margin"] });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "block", width: 24, height: 1, background: "#C8B99A", transformOrigin: "left", flexShrink: 0 }}
        aria-hidden="true"
      />
      <span style={{ fontFamily: CG, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#767676" }}>
        {children}
      </span>
    </motion.div>
  );
}

/* ── HEADING ─────────────────────────────── */
export function H2({ children }: { children: ReactNode }) {
  const ref    = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" as Parameters<typeof useInView>[1]["margin"] });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      style={{ fontFamily: CG, fontSize: "clamp(20px,2.5vw,40px)", fontWeight: 200, lineHeight: 1.22, letterSpacing: "-0.015em", color: "#1D1D1B", marginBottom: 16 }}
    >
      {children}
    </motion.h2>
  );
}

/* ── BODY TEXT ───────────────────────────── */
export function Body({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"14.5px", fontWeight:300, color:"#6B6B6B", lineHeight:1.95, ...style }}>{children}</p>;
}

/* ── DARK BAND ───────────────────────────── */
interface DarkBandProps { title: string; subtitle?: string; ctaLabel: string; ctaHref: string; }
export function DarkBand({ title, subtitle, ctaLabel, ctaHref }: DarkBandProps) {
  return (
    <section className="dark-band" style={{ background:"#1D1D1B" }}>
      <div>
        <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:16 }}>Next Step</div>
        <h3 style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"clamp(20px,2.5vw,38px)", fontWeight:200, color:"#fff", lineHeight:1.3 }} dangerouslySetInnerHTML={{ __html:title }} />
        {subtitle && <p style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"14px", fontWeight:300, color:"rgba(255,255,255,0.45)", lineHeight:1.8, marginTop:12, maxWidth:480 }}>{subtitle}</p>}
      </div>
      <a href={ctaHref}
        style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#1D1D1B", fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"10.5px", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", padding:"15px 30px", textDecoration:"none", flexShrink:0, whiteSpace:"nowrap", transition:"opacity 0.3s" }}
        onMouseEnter={e=>(e.currentTarget.style.opacity="0.88")}
        onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
      >
        {ctaLabel}
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5H11M7 1L11 4.5L7 8" stroke="#1D1D1B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    </section>
  );
}

/* ── AWARD TABLE ─────────────────────────── */
interface Award { year: string; award: string; org: string; notes?: string; }
export function AwardTable({ awards }: { awards: Award[] }) {
  return (
    <div style={{ borderTop:"1px solid rgba(29,29,27,0.09)" }}>
      <div className="award-table-row" style={{ padding:"14px 0", borderBottom:"1px solid rgba(29,29,27,0.09)" }}>
        {["Year","Award","Organisation","Notes"].map(h => (
          <div key={h} className={h==="Notes"?"award-table-notes":h==="Organisation"?"award-table-org":""} style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing:"0.25em", textTransform:"uppercase", color:"#767676" }}>{h}</div>
        ))}
      </div>
      {awards.map(({ year, award, org, notes }) => (
        <Rv key={year+award}>
          <div className="award-table-row"
            style={{ padding:"18px 0", borderBottom:"1px solid rgba(29,29,27,0.06)", transition:"background 0.2s" }}
            onMouseEnter={e=>((e.currentTarget as HTMLDivElement).style.background="#FAFAFA")}
            onMouseLeave={e=>((e.currentTarget as HTMLDivElement).style.background="transparent")}
          >
            <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"22px", fontWeight:300, color:"#1D1D1B" }}>{year}</div>
            <div style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"13px", fontWeight:400, color:"#1D1D1B" }}>{award}</div>
            <div className="award-table-org" style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"12px", color:"#6B6B6B" }}>{org}</div>
            <div className="award-table-notes" style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"11.5px", color:"#767676", fontStyle:"italic" }}>{notes}</div>
          </div>
        </Rv>
      ))}
    </div>
  );
}
