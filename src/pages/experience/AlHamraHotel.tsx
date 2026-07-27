import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, StatsBar, DarkBand } from "@/components/shared/ui";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, EditableImage, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ──────────────────────────────────────────────────────────────────
   Al Hamra Hotel — /hotel
   Bilingual EN/AR — MSA luxury register applied to existing content
────────────────────────────────────────────────────────────────── */


export default function AlHamraHotel() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.alHamraHotel");
  const c = usePageContent<any>("alHamraHotel", cStatic, lang);

  return (
    <PageLayout>
      <PageHero
        editKey="alHamraHotel"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        image="/assets/skyline-gulf-night.jpg"
        crumbs={[...c.crumbs]}
      />

      <StatsBar stats={[...c.stats]} editKey="alHamraHotel" />

      {/* ── HERO FULL-BLEED ───────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <SlotImage
          loading="lazy"
          slot="alHamraHotel.hero"
          fallback="/assets/lobby-atrium-dramatic.jpg"
          alt={c.heroImageAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(29,29,27,0.35) 0%, transparent 30%, transparent 60%, rgba(29,29,27,0.85) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: "clamp(32px,5vh,56px)", left: "clamp(24px,5vw,80px)", right: "clamp(24px,5vw,80px)" }}>
          <div style={{
            fontFamily: CG, fontSize: "10px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL, marginBottom: 12,
          }}>
            <Editable id="page_prose:alHamraHotel:heroKicker">{c.heroKicker}</Editable>
          </div>
          <h3 style={{
            fontFamily: CG, fontSize: "clamp(22px,2.5vw,38px)",
            fontWeight: 200, color: "#fff", lineHeight: 1.25,
            margin: 0, maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            <Editable id="page_prose:alHamraHotel:heroHeading">{c.heroHeading}</Editable> <strong style={{ fontWeight: 500 }}><Editable id="page_prose:alHamraHotel:heroHeadingBold">{c.heroHeadingBold}</Editable></strong>
          </h3>
        </div>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      <Section>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(48px,6vw,96px)",
        }} className="hotel-overview-grid">
          <div>
            <Rv><Tag><Editable id="page_prose:alHamraHotel:overviewTag">{c.overviewTag}</Editable></Tag></Rv>
            <Rv delay={0.1}>
              <H2>
                <Editable id="page_prose:alHamraHotel:overviewLine1">{c.overviewLine1}</Editable><br />
                <Editable id="page_prose:alHamraHotel:overviewLine2">{c.overviewLine2}</Editable><br />
                <em style={{ color: PEARL_TEXT, fontStyle: "normal" }}><Editable id="page_prose:alHamraHotel:overviewLine3">{c.overviewLine3}</Editable></em>
              </H2>
            </Rv>
          </div>
          <div>
            <Rv delay={0.2}>
              <Body style={{ marginBottom: 20 }}>
                <Editable id="page_prose:alHamraHotel:overviewBody1">{c.overviewBody1}</Editable>
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body>
                <Editable id="page_prose:alHamraHotel:overviewBody2">{c.overviewBody2}</Editable>
              </Body>
            </Rv>
          </div>
        </div>
      </Section>

      {/* ── DISTINCT ADVANTAGE ─────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag><Editable id="page_prose:alHamraHotel:advantagesTag">{c.advantagesTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:alHamraHotel:advantagesHeading">{c.advantagesHeading}</Editable></H2></Rv>
        <Rv delay={0.2}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(16px,2vw,24px)",
            marginTop: "clamp(32px,5vh,56px)",
          }}>
            {c.advantages.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "clamp(22px,3vh,32px) clamp(20px,2vw,28px)",
                  background: "#fff",
                  borderTop: `1px solid rgba(200,185,154,0.4)`,
                  display: "flex", flexDirection: "column", gap: 14,
                }}
              >
                <div style={{
                  fontFamily: CG, fontSize: "11px", letterSpacing: "0.28em",
                  color: PEARL_TEXT, fontWeight: 300,
                }}>
                  {a.num}
                </div>
                <div style={{
                  fontFamily: CG, fontSize: "clamp(13px,1.1vw,15px)",
                  color: DARK, fontWeight: 300, lineHeight: 1.65,
                }}>
                  <EditableRow id={`feature_cards:alHamraHotel.advantages:${i}`}>{a.text}</EditableRow>
                </div>
              </motion.div>
            ))}
          </div>
        </Rv>
      </Section>

      {/* ── GUEST EXPERIENCE — 5 service categories ────────────────── */}
      <Section>
        <Rv><Tag><Editable id="page_prose:alHamraHotel:servicesTag">{c.servicesTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:alHamraHotel:servicesHeading">{c.servicesHeading}</Editable></H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            <Editable id="page_prose:alHamraHotel:servicesBody">{c.servicesBody}</Editable>
          </Body>
        </Rv>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(20px,3vw,36px)",
        }}>
          {c.services.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "#fff" }}
            >
              {/* Image */}
              <div style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                background: "#0c0b09",
              }}>
                <EditableImage id={`feature_cards:alHamraHotel.services:${i}`}>
                <img
                  loading="lazy"
                  src={s.image}
                  alt={`${s.title} — ${s.imageCaption}`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                </EditableImage>
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  background: "rgba(29,29,27,0.82)",
                  color: PEARL, padding: "6px 12px",
                  fontFamily: CG, fontSize: "10px", letterSpacing: "0.28em",
                  backdropFilter: "blur(8px)",
                }}>
                  {s.num}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "clamp(20px,3vh,28px) clamp(4px,1vw,12px) 0" }}>
                <h3 style={{
                  fontFamily: CG, fontSize: "clamp(16px,1.4vw,20px)",
                  fontWeight: 400, color: DARK, lineHeight: 1.3,
                  margin: "0 0 12px",
                  letterSpacing: "-0.005em",
                }}>
                  <EditableRow id={`feature_cards:alHamraHotel.services:${i}`}>{s.title}</EditableRow>
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  <EditableRow id={`feature_cards:alHamraHotel.services:${i}`}>{s.body}</EditableRow>
                </p>
                <div style={{
                  fontFamily: CG, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: PEARL_TEXT,
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(200,185,154,0.25)",
                }}>
                  {s.imageCaption}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <DarkBand
        title={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaLabel}
        ctaHref="/leasing/inquiry#inquiry-form"
        editKey="alHamraHotel"
        editFields={{ title: "ctaTitle", subtitle: "ctaSubtitle", cta: "ctaLabel" }}
      />

      <style>{`
        @media (max-width: 900px) {
          .hotel-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
