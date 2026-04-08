import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

export function Hero() {
  return (
    <section className="hero-section" style={{ position: "relative", overflow: "hidden", background: "#fff", paddingTop: 92 }}>
      {/* Red rule */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: [0.4,0,0.2,1], delay: 0.2 }}
        style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"#CD1719", transformOrigin:"top", zIndex:10 }}
      />

      {/* LEFT */}
      <div className="hero-left" style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative", zIndex:2 }}>
        <motion.div {...fadeUp(0.9)} style={{ display:"inline-flex", alignItems:"center", gap:14, fontFamily:"Jost,sans-serif", fontSize:"9.5px", letterSpacing:"0.4em", textTransform:"uppercase", color:"#6B6B6B", marginBottom:28 }}>
          <span style={{ width:32, height:1, background:"#B2B2B2", flexShrink:0 }} />
          Kuwait City, Sharq District · Completed 2011
        </motion.div>

        <motion.h1 {...fadeUp(1.05)} style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(32px,4.2vw,70px)", fontWeight:200, lineHeight:1.08, letterSpacing:"-0.025em", color:"#1D1D1B", marginBottom:28 }}>
          Kuwait's Most<br />
          <em style={{ fontFamily:"Cormorant Garamond,serif", fontStyle:"italic", fontWeight:300, color:"#B2B2B2" }}>Iconic</em>{" "}Business<br />Address
        </motion.h1>

        <motion.p {...fadeUp(1.2)} style={{ fontFamily:"Jost,sans-serif", fontSize:"clamp(13px,1.2vw,14px)", fontWeight:300, color:"#6B6B6B", lineHeight:1.9, maxWidth:400, marginBottom:48 }}>
          A sculptural landmark designed for performance, prestige, and long-term corporate value. Rising 412 metres above the Arabian Gulf.
        </motion.p>

        <motion.div {...fadeUp(1.35)} style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"16px 28px" }}>
          <Link to="/#arch"
            style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#1D1D1B", color:"#fff", fontFamily:"Jost,sans-serif", fontSize:"10.5px", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", padding:"15px 28px", textDecoration:"none", transition:"opacity 0.3s" }}
            onMouseEnter={e=>(e.currentTarget.style.opacity="0.82")}
            onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
          >
            Explore the Tower
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M9 1L13 5L9 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link to="/leasing"
            className="hide-mobile"
            style={{ display:"inline-flex", alignItems:"center", gap:14, color:"#6B6B6B", fontFamily:"Jost,sans-serif", fontSize:"10.5px", letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"color 0.3s" }}
            onMouseEnter={e=>(e.currentTarget.style.color="#1D1D1B")}
            onMouseLeave={e=>(e.currentTarget.style.color="#6B6B6B")}
          >
            <span style={{ width:36, height:1, background:"currentColor" }} />Leasing Inquiry
          </Link>
        </motion.div>

        <motion.div {...fadeUp(1.7)} className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:12, marginTop:40 }}>
          <div style={{ width:48, height:1, background:"#B2B2B2", position:"relative", overflow:"hidden" }} className="animate-bar-slide" />
          <span style={{ fontFamily:"Jost,sans-serif", fontSize:"8.5px", letterSpacing:"0.35em", textTransform:"uppercase", color:"#B2B2B2" }}>Scroll to explore</span>
        </motion.div>
      </div>

      {/* RIGHT — video */}
      <div className="hero-right" style={{ position:"relative", overflow:"hidden", background:"#0a0a09", borderLeft:"1px solid rgba(255,255,255,0.08)", alignSelf:"stretch" }}>
        <motion.video
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2, delay:0.3 }}
          autoPlay muted loop playsInline preload="auto"
          style={{ position:"absolute", top:0, left:0, right:0, bottom:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center center", display:"block" }}
        >
          <source src="/assets/tower-drone.mp4" type="video/mp4" />
        </motion.video>
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:60, background:"linear-gradient(to right,#ffffff,transparent)", zIndex:2, pointerEvents:"none" }} />
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:1.8 }}
          className="hide-mobile"
          style={{ position:"absolute", bottom:24, left:0, right:0, textAlign:"center", zIndex:3, fontFamily:"Jost,sans-serif", fontSize:"7.5px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)" }}
        >
          Al Hamra Business Tower · Kuwait City · 412m
        </motion.div>
      </div>
    </section>
  );
}
