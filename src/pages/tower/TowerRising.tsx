import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PatternBand } from "@/components/shared/PatternBand";
import { useI18n } from "@/lib/i18n";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const GULF  = "#2A5F7A";
const DARK  = "#1D1D1B";
const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Bilingual content ─────────────────────────────────────────────── */
const CONTENT = {
  en: {
    hero: {
      title: "Rising with Purpose",
      subtitle: "The construction of Al Hamra Tower",
      tag: "2006 – 2011",
      crumbs: [{ label: "Home", href: "/" }, { label: "The Tower", href: "/tower" }],
    },
    timeline: {
      kicker: "Construction Timeline",
      title: "From excavation to icon.",
      titleLine1: "From excavation",
      titleLine2: "to icon.",
    },
    eras: [
      {
        year: "2004",
        title: "The Site is Set",
        body: "A mixed-use complex with a 200m tower is designed by Al Jazera Consultants. Excavation begins — 289 cast-in-place bored piles are sunk 22–27 metres into Kuwait's silty sand. The foundation work cannot stop.",
        img: "/assets/rising-era-2004-site-set.jpg",
      },
      {
        year: "2005",
        title: "The Height Doubles",
        body: "Kuwait City Municipality raises the maximum allowable building height to 400m. Client group engages Skidmore, Owings & Merrill (SOM) — one of the world's foremost high-rise architects — to design a landmark tower. SOM begins concept design while the contractor is already on site.",
        img: "/assets/rising-era-2005-height-doubles.jpg",
      },
      {
        year: "2006",
        title: "The Form Emerges",
        body: "SOM's decisive gesture: subtract a spiraling quadrant from a prismatic volume, rotate it at each higher level. Two hyperbolic paraboloid walls emerge — the iconic flared ribbons. The geometry provides transparency toward the Gulf and opacity toward the desert. Construction begins.",
        img: "/assets/rising-era-2006-form-emerges.png",
      },
      {
        year: "2008",
        title: "The Lamella Rises",
        body: "The lobby lamella — a web of 24-metre curved steel elements arching outward from the building core — is constructed using fiberglass formwork fabricated from 3D parametric models. It creates a column-free 900m² lobby. Engineers run non-linear buckling analyses on each member.",
        img: "/assets/rising-era-2008-lamella-rises.jpg",
      },
      {
        year: "2011",
        title: "Kuwait's Skyline Changes",
        body: "Al Hamra Tower tops out at 412.6 metres. At completion it ranks among the ten tallest buildings in the world. The world's largest stone-clad skyscraper — 258,000m² of Jura limestone — stands complete in Sharq District. Kuwait City has a new landmark.",
        img: "/assets/rising-era-2011-skyline-changes.png",
        img2: "/assets/skyline-gulf-night.jpg",
      },
    ],
    lamella: {
      kicker: "Engineering Feat",
      heading: "The Lamella — a 24-metre vault with no columns.",
      body1: "To create Kuwait's most dramatic lobby, SOM devised the lamella bracing system — a web of five distinct element types (A through E) that curve outward from the building core following a circular arch 24 metres high, creating a completely column-free space beneath the tower.",
      body2: "Each element was designed using parametric 3D modelling. The fiberglass formwork moulds were fabricated directly from digital models. Non-linear buckling analyses were performed on every member — engineering and architecture resolved as a single sculptural gesture.",
      caption: "The lobby lamella · Ground floor",
      facts: [
        { n: "24m",    l: "Column-free lobby height" },
        { n: "900m²",  l: "Grand lobby floor area"   },
        { n: "5",      l: "Lamella element types (A–E)" },
        { n: "160mm",  l: "Maximum steel plate thickness" },
      ],
    },
    galleryKicker: "The Tower Today",
  },
  ar: {
    hero: {
      title: "نشأة المعلم",
      subtitle: "تشييد برج الحمراء للأعمال",
      tag: "2006 – 2011",
      crumbs: [{ label: "الرئيسية", href: "/" }, { label: "البرج", href: "/tower" }],
    },
    timeline: {
      kicker: "الجدول الزمني للإنشاء",
      title: "من الحفر إلى الأيقونة.",
      titleLine1: "من الحفر",
      titleLine2: "إلى الأيقونة.",
    },
    eras: [
      {
        year: "2004",
        title: "تثبيت الموقع",
        body: "صمّم استشاريو الجزيرة مجمّعاً متعدّد الاستخدامات يضمّ برجاً بارتفاع 200 م. تبدأ أعمال الحفر — تُغرس 289 ركيزة خرسانيّة مصبوبة في الموقع على عمقٍ يتراوح بين 22 و27 متراً في الرمال الطميية للكويت. لا يمكن لأعمال الأساس أن تتوقّف.",
        img: "/assets/rising-era-2004-site-set.jpg",
      },
      {
        year: "2005",
        title: "تضاعف الارتفاع",
        body: "ترفع بلديّة الكويت الحدّ الأقصى المسموح به لارتفاع المباني إلى 400 م. تتعاقد مجموعة العميل مع سكيدمور، أوينغز أند ميريل (SOM) — أحد أبرز معماريي الأبراج الشاهقة في العالم — لتصميم برجٍ معلميّ. تبدأ SOM التصميم المفاهيميّ بينما المقاول حاضرٌ بالفعل في الموقع.",
        img: "/assets/rising-era-2005-height-doubles.jpg",
      },
      {
        year: "2006",
        title: "يبرز الشكل",
        body: "إيماءة SOM الحاسمة: اقتطاع شريحةٍ حلزونيّة من كتلةٍ منشوريّة، ثمّ تدويرها عند كلّ مستوى أعلى. ينبثق جداران مكافئان زائديّان — الشريطان المتدلّيان الأيقونيّان. توفّر الهندسة شفافيّة نحو الخليج وعتمة نحو الصحراء. تبدأ أعمال البناء.",
        img: "/assets/rising-era-2006-form-emerges.png",
      },
      {
        year: "2008",
        title: "تنهض اللاميلا",
        body: "يُشيَّد هيكل اللاميلا في اللوبي — شبكةٌ من العناصر الفولاذيّة المنحنية بطول 24 متراً، تنحني للخارج من نواة المبنى — باستخدام قوالب من الألياف الزجاجيّة مصنوعة من نماذج بارامتريّة ثلاثيّة الأبعاد. تخلق لوبي خالياً من الأعمدة بمساحة 900 م². يُجري المهندسون تحليلات انبعاجٍ غير خطيّة على كلّ عنصر.",
        img: "/assets/rising-era-2008-lamella-rises.jpg",
      },
      {
        year: "2011",
        title: "أفق الكويت يتغيّر",
        body: "يكتمل برج الحمراء عند ارتفاع 412.6 متراً. عند الإنجاز يأتي ضمن أعلى عشرة مبانٍ في العالم. تقف ناطحة السحاب الأكبر المكسوّة بالحجر في العالم — 258,000 م² من حجر جورا الجيريّ — مكتملةً في منطقة الشرق. ولمدينة الكويت معلمٌ جديد.",
        img: "/assets/rising-era-2011-skyline-changes.png",
        img2: "/assets/skyline-gulf-night.jpg",
      },
    ],
    lamella: {
      kicker: "إنجازٌ هندسيّ",
      heading: "اللاميلا — قبوٌ بطول 24 متراً بلا أعمدة.",
      body1: "لإنشاء أكثر اللوبيات إثارةً في الكويت، ابتكرت SOM نظام دعامات اللاميلا — شبكةٌ من خمسة أنواع متمايزة من العناصر (من A إلى E) تنحني للخارج من نواة المبنى متّبعةً قوساً دائريّاً بارتفاع 24 متراً، لتخلق مساحةً خاليةً تماماً من الأعمدة تحت البرج.",
      body2: "صُمّم كلّ عنصرٍ باستخدام النمذجة البارامتريّة ثلاثيّة الأبعاد. صُنعت قوالب القولبة من الألياف الزجاجيّة مباشرةً من النماذج الرقميّة. أُجريت تحليلات الانبعاج غير الخطيّة على كلّ عنصر — حيث ائتلفت الهندسة والعمارة في إيماءةٍ نحتيّةٍ واحدة.",
      caption: "لاميلا اللوبي · الطابق الأرضي",
      facts: [
        { n: "24 م",   l: "ارتفاع اللوبي الخالي من الأعمدة" },
        { n: "900 م²", l: "مساحة اللوبي الكبير"            },
        { n: "5",      l: "أنواع عناصر اللاميلا (A–E)"     },
        { n: "160 مم", l: "أقصى سُمكٍ للوحة الفولاذيّة"     },
      ],
    },
    galleryKicker: "البرج اليوم",
  },
};

export default function TowerRising() {
  const { lang } = useI18n();
  const c = CONTENT[lang];

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
                lineHeight: 1.1, marginBottom: 40 }}>
                {c.timeline.titleLine1}<br />{c.timeline.titleLine2}
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
                        color: isOpen ? DARK : "#9a9894",
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
                            {era.body}
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
                  </div>

                  <div style={{
                    fontFamily: FONT,
                    fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "#9a9894", marginTop: 14,
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
                    {c.lamella.kicker}
                  </div>
                </div>

                <h2 style={{ fontFamily: FONT,
                  fontWeight: 300, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff",
                  lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
                  {c.lamella.heading}
                </h2>

                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 20 }}>
                  {c.lamella.body1}
                </p>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.9, marginBottom: 36 }}>
                  {c.lamella.body2}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {c.lamella.facts.map(({ n, l }) => (
                    <div key={l} style={{
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
              <img
                src="/assets/lobby-lamella-ceiling.jpg"
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
                {c.lamella.caption}
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
              {c.galleryKicker}
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
