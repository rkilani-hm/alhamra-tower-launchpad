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
   Business Centre — /business-centre
   Bilingual EN/AR content sourced from
   Al_Hamra_Business_Tower_Website — "Business Center" sheet
────────────────────────────────────────────────────────────────── */


export default function BusinessCentre() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.businessCentre");
  const c = usePageContent<any>("businessCentre", cStatic, lang);

  return (
    <PageLayout>
      <PageHero
        editKey="businessCentre"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        image="/assets/city-view-office.jpg"
        crumbs={[...c.crumbs]}
      />

      <StatsBar stats={[...c.stats]} editKey="businessCentre" />

      {/* ── HERO CAROUSEL-STYLE FULL-BLEED IMAGE ──────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <SlotImage
          loading="lazy"
          slot="businessCentre.hero"
          fallback="/assets/boardroom-gulf-view.jpg"
          alt={c.heroImageAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
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
            <Editable id="page_prose:businessCentre:heroKicker">{c.heroKicker}</Editable>
          </div>
          <h3 style={{
            fontFamily: CG, fontSize: "clamp(22px,2.5vw,38px)",
            fontWeight: 200, color: "#fff", lineHeight: 1.25,
            margin: 0, maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            <Editable id="page_prose:businessCentre:heroHeading">{c.heroHeading}</Editable> <strong style={{ fontWeight: 500 }}><Editable id="page_prose:businessCentre:heroHeadingBold">{c.heroHeadingBold}</Editable></strong>
          </h3>
        </div>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────── */}
      <Section>
        <div style={{
          display: "grid", gridTemplateColumns: "0.85fr 1.5fr",
          gap: "clamp(48px,6vw,96px)",
        }} className="bc-overview-grid">
          <div>
            <Rv><Tag><Editable id="page_prose:businessCentre:overviewTag">{c.overviewTag}</Editable></Tag></Rv>
            <Rv delay={0.1}>
              <H2>
                <Editable id="page_prose:businessCentre:overviewLine1">{c.overviewLine1}</Editable><br />
                <Editable id="page_prose:businessCentre:overviewLine2">{c.overviewLine2}</Editable><br />
                <em style={{ color: PEARL_TEXT, fontStyle: "normal" }}><Editable id="page_prose:businessCentre:overviewLine3">{c.overviewLine3}</Editable></em>
              </H2>
            </Rv>
          </div>
          <div>
            <Rv delay={0.2}>
              <Body style={{ marginBottom: 20 }}>
                <Editable id="page_prose:businessCentre:overviewBody1">{c.overviewBody1}</Editable>
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body>
                <Editable id="page_prose:businessCentre:overviewBody2">{c.overviewBody2}</Editable>
              </Body>
            </Rv>
          </div>
        </div>
      </Section>

      {/* ── STRATEGIC ADVANTAGE ────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag><Editable id="page_prose:businessCentre:strategicTag">{c.strategicTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:businessCentre:strategicHeading">{c.strategicHeading}</Editable></H2></Rv>
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
                  <EditableRow id={`feature_cards:businessCentre.advantages:${i}`}>{a.text}</EditableRow>
                </div>
              </motion.div>
            ))}
          </div>
        </Rv>
      </Section>

      {/* ── EXECUTIVE FACILITIES — 6 cards with images ─────────────── */}
      <Section>
        <Rv><Tag><Editable id="page_prose:businessCentre:facilitiesTag">{c.facilitiesTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:businessCentre:facilitiesHeading">{c.facilitiesHeading}</Editable></H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            <Editable id="page_prose:businessCentre:facilitiesBody">{c.facilitiesBody}</Editable>
          </Body>
        </Rv>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(20px,3vw,36px)",
        }}>
          {c.facilities.map((f, i) => (
            <motion.article
              key={f.num}
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
                <EditableImage id={`feature_cards:businessCentre.facilities:${i}`}>
                <img
                  loading="lazy"
                  src={f.image}
                  alt={`${f.title} — ${f.imageCaption}`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.7s ease",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                </EditableImage>
                {/* Pearl number badge */}
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  background: "rgba(29,29,27,0.82)",
                  color: PEARL, padding: "6px 12px",
                  fontFamily: CG, fontSize: "10px", letterSpacing: "0.28em",
                  backdropFilter: "blur(8px)",
                }}>
                  {f.num}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "clamp(20px,3vh,28px) clamp(16px,1.5vw,22px) 0" }}>
                <h3 style={{
                  fontFamily: CG, fontSize: "clamp(16px,1.4vw,20px)",
                  fontWeight: 400, color: DARK, lineHeight: 1.3,
                  margin: "0 0 12px",
                  letterSpacing: "-0.005em",
                }}>
                  <EditableRow id={`feature_cards:businessCentre.facilities:${i}`}>{f.title}</EditableRow>
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  <EditableRow id={`feature_cards:businessCentre.facilities:${i}`}>{f.body}</EditableRow>
                </p>
                <div style={{
                  fontFamily: CG, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: PEARL_TEXT,
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(200,185,154,0.25)",
                }}>
                  {f.imageCaption}
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
        editKey="businessCentre"
        editFields={{ title: "ctaTitle", subtitle: "ctaSubtitle", cta: "ctaLabel" }}
      />

      {/* Direct contact detail strip */}
      <div style={{
        background: "#0F0E0C",
        borderTop: "1px solid rgba(200,185,154,0.1)",
        padding: "clamp(48px,7vh,72px) clamp(28px,6vw,96px) clamp(32px,5vh,48px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "clamp(20px,3vw,48px)",
        }}>
          {c.contactRows.map((item, i) => (
            <div key={item.label}>
              <div style={{
                fontFamily: CG, fontSize: "10px", letterSpacing: "0.32em",
                textTransform: "uppercase", color: PEARL,
                marginBottom: 8,
              }}>
                <Editable id={`page_prose:businessCentre:contactRows.${i}.label`}>{item.label}</Editable>
              </div>
              <div style={{
                fontFamily: CG, fontSize: "clamp(13px,1.1vw,15px)",
                color: "#fff", fontWeight: 300,
              }}>
                <Editable id={`page_prose:businessCentre:contactRows.${i}.value`}>{item.value}</Editable>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bc-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
