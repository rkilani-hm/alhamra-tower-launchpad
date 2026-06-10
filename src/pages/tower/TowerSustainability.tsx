import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { useI18n, useContent } from "@/lib/i18n";
import { usePageContent } from "@/lib/useCmsContent";

const PEARL_TEXT = "#8B6E3E";
const DARK  = "#1D1D1B";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";


export default function TowerSustainability() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.towerSustain");
  const c = usePageContent<any>("towerSustain", cStatic, lang);

  return (
    <PageLayout>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        image="/assets/tower-foggy.jpg"
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbTower, href: "/tower" }]}
      />

      {/* ── Intro statement ─────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)",
          alignItems: "start" }} className="sust-intro-grid">
          <div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL_TEXT, marginBottom: 20 }}>
              {c.introKicker}
            </div>
            <h2 style={{ fontFamily: FONT,
              fontWeight: 300, fontSize: "clamp(26px,3.5vw,50px)",
              color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 0 }}>
              {c.introHeading}
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 20 }}>
              {c.introP1}
            </p>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58", lineHeight: 1.9 }}>
              {c.introP2}
            </p>
          </div>
        </div>
      </div>

      {/* ── Six sustainability pillars ──────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
          letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL_TEXT, marginBottom: 48 }}>
          {c.pillarsKicker}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1,
          background: "rgba(29,29,27,0.07)" }} className="sust-pillars-grid">
          {c.pillars.map(({ n, title, body, stat }, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.div key={n} ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                style={{ background: "#fff", padding: "clamp(28px,4vh,44px) clamp(24px,3vw,36px)" }}>
                <div style={{ fontFamily: FONT,
                  fontSize: "clamp(28px,3vw,44px)", fontWeight: 300,
                  color: "rgba(29,29,27,0.1)", lineHeight: 1, marginBottom: 20 }}>{n}</div>
                <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 500, color: DARK, marginBottom: 16, letterSpacing: "0.03em" }}>{title}</div>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(12px,0.95vw,13px)", color: "#6B6B6B",
                  lineHeight: 1.65, marginBottom: 20 }}>{body}</p>
                <div style={{ fontFamily: FONT, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: PEARL_TEXT,
                  paddingTop: 16, borderTop: "1px solid rgba(200,185,154,0.3)" }}>{stat}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Quote ───────────────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FONT,
            fontWeight: 300, fontSize: "clamp(22px,3vw,42px)",
            color: DARK, lineHeight: 1.4, marginBottom: 28 }}>
            {c.quote}
          </div>
          <div style={{ fontFamily: FONT, fontSize: "10px",
            letterSpacing: "0.35em", textTransform: "uppercase", color: PEARL_TEXT }}>
            {c.quoteCredit}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
