import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, EditableImage, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK  = "#1D1D1B";
const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Bilingual content ─────────────────────────────────────────────── */
;

export default function TowerRising() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.towerRising");
  const c = usePageContent<any>("towerRising", cStatic, lang);

  const [activeEra, setActiveEra] = useState<number>(0);

  const lamellaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lamellaRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <PageHero
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tag={c.hero.tag}
        crumbs={c.hero.crumbs}
        image="/assets/office-interior.jpg"
      />

      {/* ── SECTION 1: Construction Timeline ── */}
      <section style={{ background: "#fff", padding: "clamp(64px,10vh,120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,6vw,96px)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
            <span style={{ width: 32, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`, flexShrink: 0 }} />
            <div style={{ fontFamily: FONT,
              fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL_TEXT }}>
              {c.timeline.kicker}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}
            className="timeline-grid">

            <div>
              <h2 style={{ fontFamily: FONT,
                fontWeight: 300, fontSize: "clamp(26px,2.8vw,40px)", color: DARK,
                lineHeight: 1.1, marginBottom: 40, whiteSpace: "pre-line" }}>
                {c.timeline.titleLine1}
              </h2>

              {c.eras.map((era, i) => {
                const isOpen = activeEra === i;
                return (
                  <div key={era.year} style={{ borderTop: "1px solid rgba(29,29,27,0.08)" }}>
                    <button type="button"
                      onClick={() => setActiveEra(i)}
                      style={{
                        width: "100%", textAlign: lang === "ar" ? "right" : "left", background: "none", border: "none",
                        cursor: "pointer", padding: "18px 0",
                        display: "flex", alignItems: "center", gap: 16,
                      }}
                      aria-expanded={isOpen}
                    >
                      <span style={{
                        fontFamily: FONT,
                        fontSize: "20px", fontWeight: 300,
                        color: isOpen ? DARK : "#6B6B6B",
                        minWidth: 52, transition: "color 0.3s ease",
                      }}>
                        {era.year}
                      </span>
                      <span style={{
                        fontFamily: FONT,
                        fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                        color: isOpen ? DARK : "#6B6B6B",
                        flex: 1, transition: "color 0.3s ease",
                      }}>
                        {era.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          display: "block", width: 14, height: 14, flexShrink: 0,
                          color: isOpen ? PEARL : "#c0bdb8",
                          fontSize: 20, lineHeight: "14px", userSelect: "none",
                        }}
                      >+</motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p style={{
                            fontFamily: FONT,
                            fontWeight: 300, fontSize: "clamp(13px,1.05vw,15px)",
                            color: "#5a5a58", lineHeight: 1.9,
                            paddingBottom: 24, paddingRight: 8,
                            marginBottom: 0,
                          }}>
                            <EditableRow id={`timeline_entries:towerRising.eras:${i}`}>{era.body}</EditableRow>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}

              <div style={{ borderTop: "1px solid rgba(29,29,27,0.08)" }} />
            </div>

            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{
                    fontFamily: FONT,
                    fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
                    color: PEARL_TEXT, marginBottom: 16,
                  }}>
                    {c.eras[activeEra].year}
                  </div>

                  <div style={{
                    background: "#f7f6f4",
                    border: "1px solid rgba(29,29,27,0.07)",
                    overflow: "hidden",
                    maxHeight: "calc((5 * 58px + 180px) * 1.7)",
                  }}>
                    <EditableImage id={`timeline_entries:towerRising.eras:${activeEra}`}>
                    <img
                      src={c.eras[activeEra].img}
                      alt={c.eras[activeEra].title}
                      loading="lazy"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.15"; }}
                    />
                    </EditableImage>
                  </div>

                  <div style={{
                    fontFamily: FONT,
                    fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#6B6B6B", marginTop: 14,
                  }}>
                    {c.eras[activeEra].title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: The Lamella Story ── */}
      <section style={{ background: DARK, overflow: "hidden" }}
        className="lamella-section">
        <div ref={lamellaRef} style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "clamp(64px,10vh,120px) clamp(24px,6vw,96px)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
            alignItems: "center" }} className="lamella-grid">

            <div>
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                  <span style={{ width: 32, height: 1,
                    background: `linear-gradient(to right, ${PEARL}, #D4CFC9)` }} />
                  <div style={{ fontFamily: FONT, fontSize: "11px",
                    letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL_TEXT }}>
                    <Editable id="page_prose:towerRising:lamella.kicker">{c.lamella.kicker}</Editable>
                  </div>
                </div>

                <h2 style={{ fontFamily: FONT,
                  fontWeight: 300, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff",
                  lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
                  <Editable id="page_prose:towerRising:lamella.heading">{c.lamella.heading}</Editable>
                </h2>

                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 20 }}>
                  <Editable id="page_prose:towerRising:lamella.body1">{c.lamella.body1}</Editable>
                </p>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 36 }}>
                  <Editable id="page_prose:towerRising:lamella.body2">{c.lamella.body2}</Editable>
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {(c.lamella?.facts ?? []).map(({ n, l }, fi) => (
                    <EditableRow key={l} id={`stat_counters:towerRising:towerRising_${fi}`}>
                    <div style={{
                      borderTop: "1px solid rgba(200,185,154,0.2)",
                      paddingTop: 16,
                    }}>
                      <div style={{ fontFamily: FONT,
                        fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 300,
                        color: "#fff", marginBottom: 4 }}>
                        {n}
                      </div>
                      <div style={{ fontFamily: FONT, fontSize: "10px",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)" }}>
                        {l}
                      </div>
                    </div>
                    </EditableRow>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <SlotImage
                slot="towerRising.lamellaCeiling"
                fallback="/assets/lobby-lamella-ceiling.jpg"
                alt={lang === "ar" ? "برج الحمراء — سقف لاميلا اللوبي بارتفاع 24 متراً، خالٍ من الأعمدة" : "Al Hamra Tower — lamella lobby ceiling, 24 metres high, column-free"}
                style={{ width: "100%", display: "block",
                  objectFit: "cover", minHeight: 400 }}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/lobby-lamella-ceiling.jpg";
                }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
                background: `linear-gradient(to top, ${DARK}, transparent)`,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: 20, left: 20,
                fontFamily: FONT, fontSize: "10px",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: PEARL,
              }}>
                <Editable id="page_prose:towerRising:lamella.caption">{c.lamella.caption}</Editable>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: The Building Today — gallery ── */}
      <section style={{ background: "#fff",
        padding: "clamp(64px,10vh,100px) clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <span style={{ width: 32, height: 1,
              background: `linear-gradient(to right, ${PEARL}, #D4CFC9)` }} />
            <div style={{ fontFamily: FONT, fontSize: "11px",
              letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL_TEXT }}>
              <Editable id="page_prose:towerRising:galleryKicker">{c.galleryKicker}</Editable>
            </div>
          </div>

          <div className="tower-gallery">
            {[
              { src: "/assets/tower-exterior-blue-sky.jpg",       alt: lang === "ar" ? "برج الحمراء أمام سماء الكويت الزرقاء" : "Al Hamra Tower against blue Kuwaiti sky", cls: "gi-tall" },
              { src: "/assets/facade-limestone-south-wall.jpg",   alt: lang === "ar" ? "واجهة حجر جورا الجيريّ — الجدار الجنوبيّ الحجريّ" : "Jura limestone facade — the stone south wall", cls: "gi-wide" },
              { src: "/assets/tower-entrance-night.jpg",          alt: lang === "ar" ? "مدخل البرج مضاءً في الليل" : "Tower entrance lit at night", cls: "gi-wide" },
              { src: "/assets/mall-atrium-luxury-centre.jpg",     alt: lang === "ar" ? "بهو مركز الحمراء الفاخر" : "Al Hamra Luxury Centre atrium", cls: "gi-wide-bottom" },
              { src: "/assets/office-south-corridor.jpg",         alt: lang === "ar" ? "الممرّ الجنوبيّ للمكاتب" : "Office south corridor", cls: "gi-tall-right" },
              { src: "/assets/sky-lobby-travertine-corridor.jpg", alt: lang === "ar" ? "ممرّ البهو السماويّ — الترافرتين، حلقات الإضاءة، إطلالات الخليج" : "Sky Lobby corridor — travertine, chandelier rings, Gulf views", cls: "gi-tall-end" },
            ].map(({ src, alt, cls }, i) => (
              <motion.div
                key={src}
                className={cls}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                style={{ overflow: "hidden", background: "#0c0b09", position: "relative" }}
              >
                <img
                  src={src} alt={alt}
                  loading="lazy"
                  style={{ width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 0.6s ease" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .tower-gallery {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 4px;
        }
        .gi-tall { grid-column: 1; grid-row: 1 / 3; }
        .gi-wide { grid-column: span 1; }
        .gi-wide-bottom { grid-column: span 1; }
        .gi-tall-right { grid-column: 4; grid-row: 1 / 3; }
        .gi-tall-end { grid-column: 3; grid-row: 2; }

        @media (max-width: 900px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
          .lamella-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tower-gallery {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .gi-tall, .gi-wide, .gi-wide-bottom, .gi-tall-right, .gi-tall-end {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .gi-tall, .gi-tall-right, .gi-tall-end {
            aspect-ratio: 3/4;
          }
          .gi-wide, .gi-wide-bottom {
            aspect-ratio: 4/3;
          }
        }
        @media (max-width: 900px) {
          .timeline-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 540px) {
          .tower-gallery { grid-template-columns: 1fr !important; }
          .gi-tall, .gi-wide, .gi-wide-bottom, .gi-tall-right, .gi-tall-end {
            aspect-ratio: auto !important;
          }
        }
      `}</style>

      <PatternBand />
      <Footer />
    </>
  );
}
