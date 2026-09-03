import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, EditableImage, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

const PEARL      = "#B9B9B7";
const PEARL_TEXT = "#CD1719";
const DARK  = "#1D1D1B";
const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Bilingual content ─────────────────────────────────────────────── */
;

export default function TowerRising() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.towerRising");
  const c = usePageContent<any>("towerRising", cStatic, lang);

  const [activeEra, setActiveEra] = useState<number>(0);

  /* Scroll-driven timeline: as each era row crosses a thin band at the middle
     of the viewport it becomes active — opening its copy on the left and
     switching the sticky image on the right at the same time. Clicking a row
     still works; the observer simply follows the scroll (deck slide 5). */
  const eraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eraCount = (c.eras ?? []).length;
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand.length) {
          const idx = Number((inBand[0].target as HTMLElement).dataset.era);
          if (!Number.isNaN(idx)) setActiveEra(idx);
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    eraRefs.current.slice(0, eraCount).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [eraCount]);

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
              <Editable id="page_prose:towerRising:timeline.kicker">{c.timeline.kicker}</Editable>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "start" }}
            className="timeline-grid">

            <div>
              <h2 style={{ fontFamily: FONT,
                fontWeight: 300, fontSize: "clamp(26px,2.8vw,40px)", color: DARK,
                lineHeight: 1.1, marginBottom: 40, whiteSpace: "pre-line" }}>
                <Editable id="page_prose:towerRising:timeline.titleLine1">{c.timeline.titleLine1}</Editable>
              </h2>

              {c.eras.map((era, i) => {
                const isOpen = activeEra === i;
                return (
                  <div key={era.year}
                    ref={(el) => { eraRefs.current[i] = el; }}
                    data-era={i}
                    style={{ borderTop: "1px solid rgba(29,29,27,0.08)", scrollMarginTop: 120 }}>
                    <button type="button"
                      onClick={() => setActiveEra(i)}
                      style={{
                        width: "100%", textAlign: lang === "ar" ? "right" : "left", background: "none", border: "none",
                        cursor: "pointer", padding: "22px 0",
                        display: "flex", alignItems: "center", gap: 16,
                      }}
                      aria-expanded={isOpen}
                    >
                      <span style={{
                        fontFamily: FONT,
                        fontSize: "20px", fontWeight: 300,
                        color: isOpen ? DARK : "#6B6B6B",
                        minWidth: 64, transition: "color 0.3s ease",
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
                          color: isOpen ? "#CD1719" : "#c0bdb8",
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
                            paddingBottom: 28, paddingRight: 24,
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
                    maxHeight: "min(70vh, 720px)",
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
      <section style={{ background: "#F1F1F0", overflow: "hidden" }}
        className="lamella-section">
        <div ref={lamellaRef} style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "clamp(64px,10vh,120px) clamp(24px,6vw,96px)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,96px)",
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
                  fontWeight: 300, fontSize: "clamp(28px,3.5vw,48px)", color: DARK,
                  lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
                  <Editable id="page_prose:towerRising:lamella.heading">{c.lamella.heading}</Editable>
                </h2>

                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
                  lineHeight: 1.9, marginBottom: 20 }}>
                  <Editable id="page_prose:towerRising:lamella.body1">{c.lamella.body1}</Editable>
                </p>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
                  lineHeight: 1.9, marginBottom: 36 }}>
                  <Editable id="page_prose:towerRising:lamella.body2">{c.lamella.body2}</Editable>
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {(c.lamella?.facts ?? []).map(({ n, l }, fi) => (
                    <EditableRow key={l} id={`stat_counters:towerRising:towerRising_${fi}`}>
                    <div style={{
                      borderTop: "1px solid rgba(184,184,182,0.6)",
                      paddingTop: 16,
                    }}>
                      <div style={{ fontFamily: FONT,
                        fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 300,
                        color: DARK, marginBottom: 4 }}>
                        {n}
                      </div>
                      <div style={{ fontFamily: FONT, fontSize: "10px",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#6B6B6B" }}>
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
                color: "#CD1719",
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
              { src: "/assets/tower-exterior-blue-sky.jpg",       cls: "gi-tall",
                alt: lang === "ar" ? "برج الحمراء أمام سماء الكويت الزرقاء" : "Al Hamra Tower against blue Kuwaiti sky",
                title: lang === "ar" ? "البرج" : "The Tower",
                desc: lang === "ar" ? "أوّل ناطحة سحابٍ غير متماثلة، ترتفع فوق ضباب الخليج." : "The first asymmetrical skyscraper, rising above the Gulf haze.",
                href: "/tower" },
              { src: "/assets/facade-limestone-south-wall.jpg",   cls: "gi-wide",
                alt: lang === "ar" ? "واجهة حجر جورا الجيريّ — الجدار الجنوبيّ الحجريّ" : "Jura limestone facade — the stone south wall",
                title: lang === "ar" ? "الواجهة" : "The Façade",
                desc: lang === "ar" ? "٢٥٨٬٠٠٠ م² من حجر الجورا تحمي الجدار الجنوبي." : "258,000 m² of Jura limestone shielding the south wall.",
                href: "/tower/engineering" },
              { src: "/assets/tower-entrance-night.jpg",          cls: "gi-wide",
                alt: lang === "ar" ? "مدخل البرج مضاءً في الليل" : "Tower entrance lit at night",
                title: lang === "ar" ? "الوصول" : "Arrival",
                desc: lang === "ar" ? "المدخل الشماليّ ومظلّته المنحنية، مضاءةً ليلاً." : "The north entrance and curved canopy, lit at night.",
                href: "/experience/services" },
              { src: "/assets/mall-atrium-luxury-centre.jpg",     cls: "gi-wide-bottom",
                alt: lang === "ar" ? "بهو مركز الحمراء الفاخر" : "Al Hamra Luxury Centre atrium",
                title: lang === "ar" ? "المركز التجاري" : "Luxury Centre",
                desc: lang === "ar" ? "تسوّقٌ وطعامٌ وسينما أسفل البرج مباشرة." : "Shopping, dining and cinema beneath the tower.",
                href: "/experience/services" },
              { src: "/assets/office-south-corridor.jpg",         cls: "gi-tall-right",
                alt: lang === "ar" ? "الممرّ الجنوبيّ للمكاتب" : "Office south corridor",
                title: lang === "ar" ? "مساحات العمل" : "Workspace",
                desc: lang === "ar" ? "طوابق مكتبيّة خالية من الأعمدة بإطلالاتٍ بانوراميّة." : "Column-free office floors with panoramic views.",
                href: "/leasing" },
              { src: "/assets/sky-lobby-travertine-corridor.jpg", cls: "gi-tall-end",
                alt: lang === "ar" ? "ممرّ البهو السماويّ — الترافرتين، حلقات الإضاءة، إطلالات الخليج" : "Sky Lobby corridor — travertine, chandelier rings, Gulf views",
                title: lang === "ar" ? "البهو السماوي" : "Sky Lobby",
                desc: lang === "ar" ? "ترافرتين وحلقات إضاءة وإطلالاتٌ على الخليج في الأعالي." : "Travertine, chandelier rings and Gulf views on high.",
                href: "/experience/overview" },
            ].map(({ src, alt, cls, title, desc, href }, i) => (
              <motion.div
                key={src}
                className={cls}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                style={{ overflow: "hidden", background: "#0c0b09", position: "relative" }}
              >
                <Link to={href} className="gallery-tile"
                  aria-label={`${title} — ${desc}`}
                  style={{ display: "block", width: "100%", height: "100%",
                    position: "relative", textDecoration: "none", color: "inherit" }}>
                  <SlotImage
                    slot={`towerRising.gallery.${i}`} fallback={src} alt={alt}
                    loading="lazy"
                    className="gallery-img"
                    style={{ width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                      transition: "transform 0.6s ease" }}
                  />
                  <div aria-hidden="true" className="gallery-shade" style={{ position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(12,11,9,0.88) 0%, rgba(12,11,9,0.15) 48%, transparent 72%)" }} />
                  <div className="gallery-caption" style={{ position: "absolute", left: 0, right: 0, bottom: 0,
                    padding: "clamp(18px,1.8vw,26px)" }}>
                    <div style={{ fontFamily: FONT, fontSize: "clamp(15px,1.3vw,19px)",
                      fontWeight: 500, color: "#fff", marginBottom: 6 }}>
                      <Editable id={`page_prose:towerRising:gallery.${i}.title`}>{title}</Editable>
                    </div>
                    <div className="gallery-desc" style={{ fontFamily: FONT, fontSize: "12px",
                      fontWeight: 300, color: "rgba(255,255,255,0.78)", lineHeight: 1.55, marginBottom: 12 }}>
                      <Editable id={`page_prose:towerRising:gallery.${i}.desc`}>{desc}</Editable>
                    </div>
                    <span className="gallery-cta" style={{ display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: FONT, fontSize: "10px", letterSpacing: "0.25em",
                      textTransform: "uppercase", color: "#fff" }}>
                      {lang === "ar" ? "استكشف" : "Explore"}
                      <span aria-hidden="true" className="gallery-arrow" style={{ transition: "transform 0.3s ease" }}>→</span>
                    </span>
                  </div>
                </Link>
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

        .gallery-tile { outline: none; }
        .gallery-tile:hover .gallery-img,
        .gallery-tile:focus-visible .gallery-img { transform: scale(1.05); }
        .gallery-tile:hover .gallery-arrow,
        .gallery-tile:focus-visible .gallery-arrow { transform: translateX(5px); }
        .gallery-tile:focus-visible { outline: 2px solid #B9B9B7; outline-offset: -2px; }

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
