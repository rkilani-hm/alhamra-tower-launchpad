import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PatternBackground } from "@/components/shared/PatternBand";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";
import { HeroImageCentered } from "@/components/shared/HeroImageCentered";

const CREAM  = "#F5F0E8";
const STONE  = "#E8E0D4";
const DARK   = "#1D1D1B";
const PEARL  = "#B9B9B7";

/* ── Bilingual content dictionary ─────────────────────────────────────
   English copy preserved verbatim. Arabic copy sourced from
   the Al Hamra V01 Arabic translation sheet.
──────────────────────────────────────────────────────────────────────── */

/* "What makes it singular" — three grey pillars distilled from the tower's
   defining architectural qualities (Form · Façade · Lobby). Replaces the old
   four-tab component that duplicated the Engineering page. Editable via
   page_prose:towerOverview:pillars.N.* */
const PILLARS: Record<string, { kicker: string; title: string; body: string; statN: string; statL: string }[]> = {
  en: [
    { kicker: "01 — The Form",   title: "Born from a single sculptural act.",       body: "A spiralling quarter subtracted from a prismatic volume, then rotated at every level — the world's first asymmetrical skyscraper.", statN: "1st",     statL: "Asymmetrical skyscraper in the world" },
    { kicker: "02 — The Façade", title: "Glass toward the Gulf. Stone toward the desert.", body: "Three glazed faces open onto Kuwait Bay; a single limestone wall shields the south — the largest area of stone cladding on any building.", statN: "258,000", statL: "m² of Jura limestone cladding" },
    { kicker: "03 — The Lobby",  title: "Twenty-four metres, and not one column.",  body: "A ground-floor volume engineered to feel impossible — clear, open and uninterrupted from end to end.", statN: "900", statL: "m² column-free lobby area" },
  ],
  ar: [
    { kicker: "٠١ — الشكل",    title: "وُلد من فعلٍ نحتيٍّ واحد.",              body: "رُبعٌ حلزونيٌّ اقتُطع من كتلةٍ منشوريّة ثمّ دُوِّر عند كلّ مستوى — أوّل ناطحة سحابٍ غير متماثلة في العالم.", statN: "الأولى", statL: "ناطحة سحابٍ غير متماثلة في العالم" },
    { kicker: "٠٢ — الواجهة", title: "زجاجٌ نحو الخليج. حجرٌ نحو الصحراء.",     body: "ثلاث واجهاتٍ زجاجيّة تُطلّ على جون الكويت، وجدارٌ حجريٌّ واحد يحمي الجهة الجنوبيّة — أكبر مساحة كسوةٍ حجريّة على أيّ مبنى.", statN: "٢٥٨٬٠٠٠", statL: "م² من حجر الجورا الكلسي" },
    { kicker: "٠٣ — البهو",   title: "أربعةٌ وعشرون متراً، دون عمودٍ واحد.",   body: "بهوٌ أرضيٌّ صُمِّم ليبدو مستحيلاً — واضحٌ ومفتوحٌ ومتّصلٌ من طرفٍ إلى طرف.", statN: "٩٠٠", statL: "م² مساحة بهوٍ خالية من الأعمدة" },
  ],
};

/* Condensed awards block — total + latest award image + link to the full page.
   Replaces the eight-card award grid that used to repeat under every tab. */
const AWARDS_CONDENSED: Record<string, { kicker: string; total: string; totalLabel: string; latestYear: string; latestTitle: string; latestSub: string; cta: string }> = {
  en: { kicker: "Awards & Recognition", total: "12", totalLabel: "International awards, ten institutions", latestYear: "2019", latestTitle: "World Architecture Festival", latestSub: "Completed Buildings — Office", cta: "View all awards" },
  ar: { kicker: "الجوائز والتقدير",     total: "١٢", totalLabel: "جائزة دوليّة من عشر مؤسّسات",        latestYear: "٢٠١٩", latestTitle: "مهرجان العمارة العالمي", latestSub: "المباني المكتملة — المكاتب", cta: "عرض جميع الجوائز" },
};

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

  const pillars = PILLARS[lang] ?? PILLARS.en;
  const awardsC = AWARDS_CONDENSED[lang] ?? AWARDS_CONDENSED.en;

  const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

  return (
    <PageLayout>
      {/* ── Hero — image overlaid with one bold centred line ──────── */}
      <HeroImageCentered
        slot="towerOverview.banner"
        image="/assets/tower-overview-banner.jpg"
        alt={lang === "ar" ? "برج الحمراء — مدينة الكويت" : "Al Hamra Tower — Kuwait City"}
        editId="page_prose:towerOverview:heroTitle"
      >
        {c.heroTitle}
      </HeroImageCentered>

      {/* ── Stats grid ─────────────────────────────────────────────── */}
      <PatternBackground opacity={0.3} style={{ background: "#fff", borderBottom: "1px solid rgba(29,29,27,0.07)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }} className="overview-stats-grid">
          {c.stats.map(({ n, u, icon, l, sub }, i) => (
            <motion.div key={l}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ padding: "clamp(36px,5vh,56px) clamp(28px,3vw,44px)",
                borderRight: [0,1,3,4].includes(i) ? "1px solid rgba(29,29,27,0.07)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none",
                display: "flex", flexDirection: "column", gap: 6 }}>
              <div aria-hidden="true" style={{ fontFamily: FONT, fontSize: "10px",
                color: "#CD1719", letterSpacing: "0.3em", marginBottom: 4 }}>{icon}</div>
              <div style={{ fontFamily: FONT,
                fontSize: "clamp(22px,3vw,42px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                <EditableRow id={`stat_counters:towerOverview:towerOverview_${i}`}>
                <CountUp value={n} delay={i * 0.1} />
                {u && <span style={{ fontFamily: FONT,
                  fontSize: "clamp(11px,1.3vw,17px)", fontWeight: 200, color: "#CD1719", marginLeft: 4 }}>{u}</span>}
                </EditableRow>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.2em", textTransform: "uppercase", color: DARK, fontWeight: 400 }}>
                <EditableRow id={`stat_counters:towerOverview:towerOverview_${i}`}>{l}</EditableRow>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.82vw,11px)",
                color: "#6B6B6B" }}>
                <EditableRow id={`stat_counters:towerOverview:towerOverview_${i}`}>{sub}</EditableRow>
              </div>
            </motion.div>
          ))}
        </div>
      </PatternBackground>

      {/* ── What makes it singular — three grey pillars ─────────────── */}
      <div style={{ background: "#F1F1F0", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{ width: 32, height: 1, background: PEARL, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: "#CD1719" }}>
              <Editable id="page_prose:towerOverview:singularKicker">{c.singularKicker ?? "What makes it singular"}</Editable>
            </span>
          </div>
          <h2 style={{ fontFamily: FONT, fontWeight: 200,
            fontSize: "clamp(26px,3.4vw,46px)", color: DARK, lineHeight: 1.1,
            letterSpacing: "-0.015em", margin: "0 0 clamp(40px,5vh,64px)", maxWidth: 760 }}>
            <Editable id="page_prose:towerOverview:singularTitle">{c.singularTitle ?? "Three things no other tower in the region can claim."}</Editable>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,2vw,28px)" }}
            className="singular-grid">
            {pillars.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
                style={{ background: "#E3E3E2", padding: "clamp(28px,3vw,40px)",
                  display: "flex", flexDirection: "column", minHeight: 340 }}>
                <div style={{ fontFamily: FONT, fontSize: "10px",
                  letterSpacing: "0.32em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 20 }}>
                  <Editable id={`page_prose:towerOverview:pillars.${i}.kicker`}>{p.kicker}</Editable>
                </div>
                <h3 style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(19px,1.7vw,24px)", color: DARK, lineHeight: 1.25,
                  letterSpacing: "-0.01em", margin: "0 0 16px" }}>
                  <Editable id={`page_prose:towerOverview:pillars.${i}.title`}>{p.title}</Editable>
                </h3>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.05vw,14.5px)", color: "#5a5a58",
                  lineHeight: 1.8, margin: "0 0 28px" }}>
                  <Editable id={`page_prose:towerOverview:pillars.${i}.body`}>{p.body}</Editable>
                </p>
                <div style={{ marginTop: "auto", paddingTop: 20, borderTop: `1px solid ${PEARL}` }}>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(28px,3vw,40px)",
                    fontWeight: 300, color: DARK, lineHeight: 1 }}>
                    <Editable id={`page_prose:towerOverview:pillars.${i}.statN`}>{p.statN}</Editable>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.8vw,11px)",
                    letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6B6B", marginTop: 8 }}>
                    <Editable id={`page_prose:towerOverview:pillars.${i}.statL`}>{p.statL}</Editable>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Awards, condensed ──────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(56px,8vh,96px) clamp(28px,6vw,96px)",
        borderTop: "1px solid rgba(29,29,27,0.07)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}
          className="awards-condensed-grid">
          {/* Left — total + link */}
          <div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: "#CD1719", marginBottom: 28 }}>
              <Editable id="page_prose:towerOverview:awardsKicker">{c.awardsKicker ?? awardsC.kicker}</Editable>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
              <span style={{ fontFamily: FONT, fontSize: "clamp(56px,9vw,120px)",
                fontWeight: 200, color: DARK, lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                <Editable id="page_prose:towerOverview:awardsTotal">{awardsC.total}</Editable>
              </span>
            </div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1vw,15px)",
              color: "#5a5a58", lineHeight: 1.6, maxWidth: 340, marginBottom: 36 }}>
              <Editable id="page_prose:towerOverview:awardsTotalLabel">{awardsC.totalLabel}</Editable>
            </div>
            <Link to="/tower/awards" style={{ display: "inline-flex", alignItems: "center", gap: 12,
              background: DARK, color: "#fff", fontFamily: FONT,
              fontSize: "10.5px", letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "15px 32px", textDecoration: "none", transition: "background 0.3s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#000";}}
              onMouseLeave={e=>{e.currentTarget.style.background=DARK;}}>
              <Editable id="page_prose:towerOverview:awardsCta">{awardsC.cta}</Editable>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          {/* Right — latest award image + caption */}
          <div>
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#0c0b09" }}>
              <SlotImage
                slot="towerOverview.latestAward"
                fallback="/assets/facade-dual-glass-stone.jpg"
                alt={lang === "ar" ? "أحدث جائزة نالها برج الحمراء" : "Al Hamra Tower — latest award"}
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e: any) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginTop: 20,
              borderLeft: `1px solid ${PEARL}`, paddingLeft: 20 }}>
              <div style={{ fontFamily: FONT, fontSize: "clamp(20px,2vw,28px)",
                fontWeight: 300, color: DARK, lineHeight: 1 }}>
                <Editable id="page_prose:towerOverview:latestAwardYear">{awardsC.latestYear}</Editable>
              </div>
              <div>
                <div style={{ fontFamily: FONT, fontSize: "clamp(13px,1.05vw,15px)",
                  fontWeight: 400, color: DARK }}>
                  <Editable id="page_prose:towerOverview:latestAwardTitle">{awardsC.latestTitle}</Editable>
                </div>
                <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.82vw,11.5px)", color: "#6B6B6B", marginTop: 3 }}>
                  <Editable id="page_prose:towerOverview:latestAwardSub">{awardsC.latestSub}</Editable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .overview-stats-grid { grid-template-columns: repeat(3,1fr) !important; }
        .singular-grid { grid-template-columns: repeat(3,1fr) !important; }
        .awards-condensed-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 900px) {
          .overview-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .singular-grid { grid-template-columns: 1fr !important; }
          .awards-condensed-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .overview-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
