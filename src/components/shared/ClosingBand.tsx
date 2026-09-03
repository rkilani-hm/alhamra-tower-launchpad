import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { Editable, SlotImage } from "@/lib/EditMode";

/* ── Secure Your Position in Sharq ─────────────────────────────────────
   The sitewide closing band. Rendered by PageLayout directly above the
   footer on every page EXCEPT Inquiry & Contact (where it would point at
   itself). Content is CMS-editable via section_fields:closingBand:* and
   bilingual through the shared t() keys under `closingBand.*`.
──────────────────────────────────────────────────────────────────────── */

const DARK  = "#1D1D1B";
const PEARL = "#B9B9B7";
const RED   = "#CD1719";
const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

export function ClosingBand() {
  const t = useT();
  return (
    <section
      aria-labelledby="closing-band-title"
      style={{ position: "relative", overflow: "hidden", background: "#0c0b09" }}
    >
      {/* Background — editable tower image, dimmed for legibility */}
      <SlotImage
        slot="closingBand.bg"
        fallback="/assets/tower-overview-banner.jpg"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%", opacity: 0.28 }}
        onError={(e: any) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(12,11,9,0.72) 0%, rgba(12,11,9,0.6) 55%, rgba(12,11,9,0.82) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2,
        padding: "clamp(48px,8vh,96px) clamp(28px,6vw,96px)",
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20,
            fontFamily: FONT, fontSize: "clamp(9px,0.75vw,10px)",
            letterSpacing: "0.45em", textTransform: "uppercase", color: RED }}>
          <span style={{ width: 32, height: 1, background: PEARL }} />
          <Editable id="section_fields:closingBand:kicker">{t("closingBand.kicker")}</Editable>
          <span style={{ width: 32, height: 1, background: PEARL }} />
        </motion.div>

        <motion.h2 id="closing-band-title"
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
          style={{ fontFamily: FONT, fontWeight: 300,
            fontSize: "clamp(24px,4vw,50px)", color: "#fff",
            letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 16px", maxWidth: 900 }}>
          <Editable id="section_fields:closingBand:headline">{t("closingBand.headline")}</Editable>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: FONT, fontWeight: 200,
            fontSize: "clamp(12px,1.05vw,14px)", color: "rgba(255,255,255,0.62)",
            lineHeight: 1.7, margin: "0 0 34px", maxWidth: 560 }}>
          <Editable id="section_fields:closingBand:sub">{t("closingBand.sub")}</Editable>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          <Link to="/leasing/inquiry#inquiry-form"
            style={{ display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: DARK, fontFamily: FONT,
              fontSize: "9.5px", letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "13px 32px", textDecoration: "none",
              transition: "background 0.3s ease, color 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.background=PEARL;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=DARK;}}>
            <Editable id="section_fields:closingBand:ctaPrimary">{t("closingBand.ctaPrimary")}</Editable>
          </Link>
          <Link to="/leasing"
            style={{ display: "inline-flex", alignItems: "center", gap: 12,
              background: "none", border: `1px solid rgba(184,184,182,0.45)`, color: "#fff",
              fontFamily: FONT, fontSize: "9.5px", letterSpacing: "0.25em",
              textTransform: "uppercase", padding: "13px 32px", textDecoration: "none",
              transition: "border-color 0.3s ease, background 0.3s ease" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=PEARL;e.currentTarget.style.background="rgba(255,255,255,0.06)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(184,184,182,0.45)";e.currentTarget.style.background="none";}}>
            <Editable id="section_fields:closingBand:ctaSecondary">{t("closingBand.ctaSecondary")}</Editable>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
