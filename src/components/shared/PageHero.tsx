import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerSlow, fadeUp, fadeLeft } from "@/lib/motion";
import { GoldLineDraw } from "@/components/shared/ScrollReveal";
import { PatternBackground } from "@/components/shared/PatternBand";

/* ── PageHero ───────────────────────────────────────────────────────────
   Interior page hero — used on every sub-page.
   Orchestrated stagger: breadcrumb → gold rule+tag → headline → subtitle.
   The dot-grid background and gold accent line establish architectural depth.
──────────────────────────────────────────────────────────────────────── */

const CG = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

interface Crumb { label: string; href: string; }
interface Props {
  tag?:     string;
  title:    string;
  subtitle?: string;
  crumbs?:  Crumb[];
  image?:   string;
}

export function PageHero({ tag, title, subtitle, crumbs, image }: Props) {
  return (
    <PatternBackground
      opacity={0.4}
      className="page-hero"
      style={{
        background: "#fff",
        borderBottom: "1px solid rgba(29,29,27,0.09)",
        overflow: "hidden",
      }}
    >
      {/* Animated left pearl rule */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: "absolute", left: 0, top: "15%", bottom: "15%", width: 2,
          background: "linear-gradient(to bottom, #C8B99A, #D4CFC9 50%, #C8B99A)",
          transformOrigin: "top",
        }}
        aria-hidden="true"
      />

      {/* Stagger container */}
      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Breadcrumb */}
        {crumbs && crumbs.length > 0 && (
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 40,
              fontFamily: CG, fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {crumbs.map((c, i) => (
              <span key={c.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ color: "rgba(29,29,27,0.2)", fontSize: "10px" }}>›</span>}
                <Link
                  to={c.href}
                  style={{ color: "#767676", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
                >{c.label}</Link>
              </span>
            ))}
          </motion.div>
        )}

        {/* Tag line with animated gold rule */}
        <motion.div variants={fadeLeft} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <GoldLineDraw width={28} delay={0.2} />
          <span style={{ fontFamily: CG, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#767676" }}>
            {tag}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: CG, fontSize: "clamp(32px,4vw,64px)",
            fontWeight: 200, letterSpacing: "-0.025em",
            lineHeight: 1.1, color: "#1D1D1B", marginBottom: 20,
          }}
        >
          {title}
        </motion.h1>

        {/* Gold underline accent */}
        <motion.div variants={fadeUp}>
          <GoldLineDraw width={64} delay={0} color="linear-gradient(to right, #C8B99A, transparent)" height={1} />
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: CG, fontSize: "15px", fontWeight: 300,
              color: "#6B6B6B", lineHeight: 1.65, maxWidth: 640, marginTop: 20,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </PatternBackground>
  );
}
