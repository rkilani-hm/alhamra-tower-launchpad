import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Crumb { label: string; href: string; }
interface Props {
  tag:      string;
  title:    string;
  subtitle?: string;
  crumbs?:  Crumb[];
}

const S = {
  section: {
    background: "#fff",
    borderBottom: "1px solid rgba(29,29,27,0.09)",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  crumbRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
    fontFamily: "Jost, sans-serif",
    fontSize: "10px",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
  },
  crumbLink: {
    color: "#767676",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  crumbSep: { color: "rgba(29,29,27,0.2)", fontSize: "10px" },
  tag: {
    fontFamily: "Jost, sans-serif",
    fontSize: "10.5px",
    letterSpacing: "0.4em",
    textTransform: "uppercase" as const,
    color: "#767676",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  h1: {
    fontFamily: "Jost, sans-serif",
    fontSize: "clamp(32px,4vw,64px)",
    fontWeight: 200,
    letterSpacing: "-0.025em",
    lineHeight: 1.1,
    color: "#1D1D1B",
    marginBottom: 20,
  },
  sub: {
    fontFamily: "Jost, sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    color: "#6B6B6B",
    lineHeight: 1.85,
    maxWidth: 640,
  },
  line: { width: 40, height: 1, background: "#EDEDED", flexShrink: 0 },
};

export function PageHero({ tag, title, subtitle, crumbs }: Props) {
  return (
    <section className="page-hero" style={S.section}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(29,29,27,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        {crumbs && crumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={S.crumbRow}
          >
            {crumbs.map((c, i) => (
              <span key={c.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={S.crumbSep}>›</span>}
                <Link
                  to={c.href} style={S.crumbLink}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
                >{c.label}</Link>
              </span>
            ))}
          </motion.div>
        )}

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={S.tag}
        >
          <span style={S.line} />
          {tag}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={S.h1}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={S.sub}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
