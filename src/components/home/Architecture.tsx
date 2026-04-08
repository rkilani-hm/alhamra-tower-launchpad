import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../shared/ScrollReveal";

const FEATURES = [
  { n: "01", title: "Carved Form",            desc: "Solar-responsive asymmetrical profile. Quarter of each floor strategically removed for performance." },
  { n: "02", title: "Solar Response",          desc: "Limestone south façade as passive thermal shield against Kuwait's desert climate." },
  { n: "03", title: "24m Grand Lobby",         desc: "Column-free arrival hall. One of the region's most dramatic entrance volumes." },
  { n: "04", title: "Structural Innovation",   desc: "Hyperbolic paraboloid walls spanning 412m. Unprecedented at this scale globally." },
];

const CALLOUTS = [
  { id: "crown",  top: "8%",  left: "52%", title: "Crown",       sub: "412m · Level 80",      delay: 2700 },
  { id: "sky55",  top: "34%", left: "56%", title: "Sky Lobby",   sub: "Level 55 · High-Rise", delay: 2100 },
  { id: "sky30",  top: "57%", left: "59%", title: "Sky Lobby",   sub: "Level 30 · Mid-Rise",  delay: 1400 },
  { id: "lobby",  top: "86%", left: "56%", title: "Grand Lobby", sub: "24m · Column-Free",    delay: 600  },
];

function Callout({ top, left, title, sub, visible }: { top: string; left: string; title: string; sub: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", top, left, display: "flex", alignItems: "center", pointerEvents: "none" }}
        >
          <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(29,29,27,0.55)", background: "rgba(29,29,27,0.08)" }} />
            <div className="animate-pulse-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(29,29,27,0.3)" }} />
          </div>
          <div style={{ width: 44, height: 1, background: "rgba(29,29,27,0.22)" }} />
          <div style={{ paddingLeft: 10 }}>
            <span style={{ display: "block", fontFamily: "Jost, sans-serif", fontSize: "10.5px", fontWeight: 500, color: "rgba(29,29,27,0.75)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{title}</span>
            <span style={{ display: "block", fontFamily: "Jost, sans-serif", fontSize: "10px", color: "rgba(29,29,27,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>{sub}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Architecture() {
  const { ref, inView } = useInView({ threshold: 0.18, triggerOnce: true });
  const [revealed, setRevealed] = useState(false);
  const [visibleCallouts, setVisibleCallouts] = useState<Set<string>>(new Set());
  const [labelVisible, setLabelVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!inView || revealed) return;
    setRevealed(true);
    CALLOUTS.forEach(({ id, delay }) => {
      const t = setTimeout(() => setVisibleCallouts((p) => new Set([...p, id])), delay);
      timersRef.current.push(t);
    });
    const l = setTimeout(() => setLabelVisible(true), 3400);
    timersRef.current.push(l);
    return () => timersRef.current.forEach(clearTimeout);
  }, [inView, revealed]);

  return (
    <section id="arch" className="arch-section">

      {/* LEFT — sketch + callouts */}
      <div ref={ref} className="arch-left" style={{ background:"#F7F6F4", position:"relative", borderRight:"1px solid rgba(29,29,27,0.09)", overflow:"hidden" }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(29,29,27,0.05) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
        {/* Image — fills full container height, width scales proportionally */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
          <img
            src="/assets/arch-sketch.jpg"
            alt="Al Hamra Tower — Architecture Drawing"
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "none",
              objectFit: "contain",
              objectPosition: "bottom center",
              display: "block",
              clipPath: revealed ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              transition: "clip-path 3s cubic-bezier(0.4, 0, 0.15, 1)",
            }}
          />
        </div>

        {/* Callout overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          {CALLOUTS.map(({ id, top, left, title, sub }) => (
            <Callout key={id} top={top} left={left} title={title} sub={sub} visible={visibleCallouts.has(id)} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: labelVisible ? 1 : 0 }} transition={{ duration: 0.8 }}
          style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", zIndex: 3, fontFamily: "Jost, sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(29,29,27,0.3)" }}>
          Al Hamra Business Tower · SOM Architecture · 2011
        </motion.div>
      </div>

      {/* RIGHT — text */}
      <div className="arch-right ah-section" style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <ScrollReveal>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#767676", marginBottom: 24 }}>
            Architecture · Skidmore, Owings &amp; Merrill
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 style={{ fontFamily: "Jost, sans-serif", fontSize: "clamp(26px, 3vw, 48px)", fontWeight: 200, lineHeight: 1.18, letterSpacing: "-0.015em", color: "#1D1D1B", marginBottom: 28 }}>
            Form shaped by<br /><strong style={{ fontWeight: 500 }}>climate, craft</strong><br />and ambition
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p style={{ fontFamily: "Jost, sans-serif", fontSize: "14.5px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.95, maxWidth: 460 }}>
            The tower's asymmetrical carved profile responds directly to solar exposure. A quarter of each floor plate is removed — rotating 60° counter-clockwise from base to crown — reducing heat gain while defining a permanent skyline identity for Kuwait.
          </p>
        </ScrollReveal>

        {/* Tower sunset photo — real photography */}
        <ScrollReveal delay={0.3}>
          <div style={{ marginTop: 40, position: "relative", overflow: "hidden" }}>
            <img
              src="/assets/tower-sunset.jpg"
              alt="Al Hamra Tower at golden hour"
              style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(29,29,27,0.6))",
              padding: "20px 20px 16px",
            }}>
              <span style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                Photo Credit: Nick Merrick © Hedrich Blessing
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 1 }}>
            {FEATURES.map(({ n, title, desc }) => (
              <div key={n}
                style={{ background: "#fff", padding: "26px 24px", transition: "background 0.3s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
              >
                <div style={{ fontFamily: "Jost, sans-serif", fontSize: 10, color: "#767676", letterSpacing: "0.2em", marginBottom: 10 }}>{n}</div>
                <div style={{ fontFamily: "Jost, sans-serif", fontSize: 13, fontWeight: 500, color: "#1D1D1B", marginBottom: 7, letterSpacing: "0.04em" }}>{title}</div>
                <div style={{ fontFamily: "Jost, sans-serif", fontSize: "11.5px", color: "#6B6B6B", lineHeight: 1.75 }}>{desc}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
