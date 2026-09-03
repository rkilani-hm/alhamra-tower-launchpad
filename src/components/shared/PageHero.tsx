import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerSlow, fadeUp, fadeLeft } from "@/lib/motion";
import { GoldLineDraw } from "@/components/shared/ScrollReveal";
import { PatternBackground } from "@/components/shared/PatternBand";
import { Editable } from "@/lib/EditMode";

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
  /* When set (e.g. "workplace"), hero text becomes click-to-edit in edit mode,
     mapping to page_prose rows tag/title/subtitle for this page_key. Optional —
     pages that don't pass it render exactly as before. */
  editKey?: string;
}

export function PageHero({ tag, title, subtitle, crumbs, editKey }: Props) {
  /* Helper: wrap with <Editable> only when an editKey is provided. */
  const E = (field: string, node: React.ReactNode) =>
    editKey ? <Editable id={`page_prose:${editKey}:${field}`}>{node}</Editable> : <>{node}</>;
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
      {/* Stagger container — title only, centred (tag line + subtitle removed) */}
      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        style={{ position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
      >
        {/* Breadcrumb */}
        {crumbs && crumbs.length > 0 && (
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32,
              fontFamily: CG, fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            {crumbs.map((c, i) => (
              <span key={c.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ color: "rgba(29,29,27,0.2)", fontSize: "10px" }}>›</span>}
                <Link
                  to={c.href}
                  style={{ color: "#6B6B6B", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B6B6B")}
                >{c.label}</Link>
              </span>
            ))}
          </motion.div>
        )}

        {/* H1 — title only, same font/size/weight, centred */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: CG, fontSize: "clamp(32px,4vw,64px)",
            fontWeight: 200, letterSpacing: "-0.025em",
            lineHeight: 1.1, color: "#1D1D1B", marginBottom: 20,
          }}
        >
          {E("title", title)}
        </motion.h1>

        {/* Gold underline accent — centred */}
        <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
          <GoldLineDraw width={64} delay={0} color="linear-gradient(to right, #B9B9B7, transparent)" height={1} />
        </motion.div>
      </motion.div>
    </PatternBackground>
  );
}
