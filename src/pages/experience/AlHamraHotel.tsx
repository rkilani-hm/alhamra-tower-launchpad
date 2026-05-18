import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { Section, Tag, H2, Body, Rv, StatsBar, DarkBand } from "@/components/shared/ui";
import { useI18n } from "@/lib/i18n";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ──────────────────────────────────────────────────────────────────
   Al Hamra Hotel — /hotel
   Bilingual EN/AR — MSA luxury register applied to existing content
────────────────────────────────────────────────────────────────── */

const CONTENT = {
  en: {
    tag: "Experience · Hospitality",
    title: "Al Hamra Hotel",
    subtitle: "A premium hospitality destination within Al Hamra's integrated ecosystem — designed for business and leisure travellers alike.",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Experience", href: "/services" },
      { label: "Al Hamra Hotel", href: "/hotel" },
    ],
    stats: [
      { number: "01", label: "Integrated Destination" },
      { number: "Direct", label: "Tower & Centre Access" },
      { number: "24/7", label: "Guest Services" },
      { number: "Sharq", label: "Kuwait City" },
    ],
    heroImageAlt: "Al Hamra Hotel — refined interior within the Al Hamra destination",
    heroKicker: "A Premium Destination · Kuwait City · Sharq District",
    heroHeading: "A fully integrated stay —",
    heroHeadingBold: "within a singular destination.",
    overviewTag: "Overview · The Experience",
    overviewLine1: "Refined.",
    overviewLine2: "Seamless.",
    overviewLine3: "Elevated.",
    overviewBody1: "Located within the Al Hamra development, the hotel offers a premium hospitality experience designed for business and leisure travellers alike.",
    overviewBody2: "With direct connectivity to the Business Tower and Shopping Centre, it provides a fully integrated stay — combining comfort, accessibility, and operational convenience within one unified destination.",
    advantagesTag: "Why Al Hamra Hotel · Distinct Advantage",
    advantagesHeading: "Five dimensions of an integrated stay.",
    advantages: [
      { num: "01", text: "Strategic location within Kuwait's leading mixed-use destination" },
      { num: "02", text: "Direct connectivity to the Business Tower and Shopping Centre" },
      { num: "03", text: "Designed for both short and extended stays" },
      { num: "04", text: "Access to curated retail, dining, and lifestyle offerings" },
      { num: "05", text: "Supported by Al Hamra's integrated infrastructure" },
    ],
    servicesTag: "Hotel Services & Facilities · Guest Experience",
    servicesHeading: "Every aspect, considered.",
    servicesBody: "Five service dimensions combine to deliver a seamless hospitality experience — from refined accommodation to curated access across the wider Al Hamra destination.",
    services: [
      { num: "01", title: "Accommodation",
        body: "Well-appointed rooms and suites designed for comfort, privacy, and functional efficiency — a refined retreat following a day of institutional business.",
        image: "/assets/sky-lobby-mirror-lounge.jpg",
        imageCaption: "Hotel Suite · Refined Interior" },
      { num: "02", title: "Dining & In-Room Services",
        body: "Access to on-site dining options and in-room services, complemented by direct connectivity to Al Hamra Shopping Centre's restaurants and cafés.",
        image: "/assets/mall-atrium-luxury-centre.jpg",
        imageCaption: "Shopping Centre · Culinary Access" },
      { num: "03", title: "Business & Meeting Access",
        body: "Proximity to Al Hamra Business Centre enables seamless access to meeting rooms, training facilities, and corporate services — a fully integrated institutional stay.",
        image: "/assets/boardroom-wide.jpg",
        imageCaption: "Business Centre · Direct Connectivity" },
      { num: "04", title: "Wellness & Leisure",
        body: "Access to fitness and wellness facilities designed to support balance and well-being during the stay, with views across Kuwait City and the Arabian Gulf.",
        image: "/assets/high-floor-view-lounge.jpg",
        imageCaption: "Wellness Lounge · Gulf Views" },
      { num: "05", title: "Parking & Accessibility",
        body: "Dedicated parking, valet services, and direct access to the wider Al Hamra complex ensure ease of movement across the destination.",
        image: "/assets/entrance-night-wide.jpg",
        imageCaption: "Complex Entrance · Dedicated Valet" },
    ],
    ctaTitle: "Plan your stay.",
    ctaSubtitle: "For reservations and inquiries, please contact the Al Hamra Hotel team directly. A fully integrated stay, within a singular destination.",
    ctaLabel: "Make a Reservation",
  },
  ar: {
    tag: "تجربة الحمراء · الضيافة",
    title: "فندق الحمراء",
    subtitle: "وجهة ضيافة راقية ضمن منظومة الحمراء المتكاملة — مصمَّمة لتلبية تطلّعات روّاد الأعمال والزوّار على حدٍّ سواء.",
    crumbs: [
      { label: "الرئيسية", href: "/" },
      { label: "تجربة الحمراء", href: "/services" },
      { label: "فندق الحمراء", href: "/hotel" },
    ],
    stats: [
      { number: "٠١", label: "وجهة متكاملة" },
      { number: "مباشر", label: "اتصال بالبرج والمركز" },
      { number: "٢٤/٧", label: "خدمات الضيوف" },
      { number: "شرق", label: "مدينة الكويت" },
    ],
    heroImageAlt: "فندق الحمراء — تصميم داخلي راقٍ ضمن وجهة الحمراء",
    heroKicker: "وجهة راقية · مدينة الكويت · منطقة شرق",
    heroHeading: "إقامة متكاملة —",
    heroHeadingBold: "ضمن وجهة واحدة استثنائية.",
    overviewTag: "نظرة عامة · التجربة",
    overviewLine1: "أناقة.",
    overviewLine2: "انسجام.",
    overviewLine3: "ارتقاء.",
    overviewBody1: "يقع الفندق ضمن مشروع الحمراء، ويقدّم تجربة ضيافة راقية مصمَّمة لتلبية احتياجات روّاد الأعمال والمسافرين الباحثين عن الفخامة في آنٍ معاً.",
    overviewBody2: "يتّصل الفندق مباشرةً ببرج الأعمال ومركز التسوّق، فيوفّر إقامة متكاملة تجمع بين الراحة، وسهولة الوصول، والكفاءة التشغيلية — كلّها ضمن وجهة واحدة موحَّدة.",
    advantagesTag: "لماذا فندق الحمراء · ميزات استثنائية",
    advantagesHeading: "خمسة أبعاد لإقامة متكاملة.",
    advantages: [
      { num: "٠١", text: "موقع استراتيجي ضمن أبرز وجهات الاستخدام المتعدّد في الكويت" },
      { num: "٠٢", text: "اتصال مباشر ببرج الأعمال ومركز التسوّق" },
      { num: "٠٣", text: "مصمَّم لإقامات قصيرة وطويلة الأمد" },
      { num: "٠٤", text: "وصولٌ إلى وجهات تسوّق ومطاعم وخدمات أسلوب حياة منتقاة" },
      { num: "٠٥", text: "مدعوم بالبنية التحتية المتكاملة للحمراء" },
    ],
    servicesTag: "خدمات الفندق ومرافقه · تجربة الضيف",
    servicesHeading: "كلّ التفاصيل مدروسة.",
    servicesBody: "تتضافر خمس فئات من الخدمات لتقديم تجربة ضيافة متناغمة — من الإقامة الراقية إلى الوصول المنتقى إلى وجهات الحمراء الأوسع.",
    services: [
      { num: "٠١", title: "الإقامة",
        body: "غرفٌ وأجنحة بتصاميم متقنة صُمِّمت من أجل الراحة والخصوصية والكفاءة العملية — ملاذٌ راقٍ في ختام يومٍ مؤسسي حافل.",
        image: "/assets/sky-lobby-mirror-lounge.jpg",
        imageCaption: "جناح الفندق · تصميم داخلي راقٍ" },
      { num: "٠٢", title: "خدمات الطعام والغرف",
        body: "خيارات طعام داخل الفندق وخدمات الغرف، إلى جانب الاتصال المباشر بمطاعم ومقاهي مركز الحمراء التجاري.",
        image: "/assets/mall-atrium-luxury-centre.jpg",
        imageCaption: "المركز التجاري · وصول إلى وجهات الطعام" },
      { num: "٠٣", title: "الوصول إلى الأعمال والاجتماعات",
        body: "يتيح القرب من مركز الحمراء للأعمال وصولاً سلساً إلى قاعات الاجتماعات، ومرافق التدريب، والخدمات المؤسسية — إقامة مؤسسية متكاملة.",
        image: "/assets/boardroom-wide.jpg",
        imageCaption: "مركز الأعمال · اتصال مباشر" },
      { num: "٠٤", title: "العافية والاسترخاء",
        body: "وصول إلى مرافق اللياقة والعناية الصحية التي تدعم التوازن والعافية خلال الإقامة، مع إطلالات على مدينة الكويت والخليج العربي.",
        image: "/assets/high-floor-view-lounge.jpg",
        imageCaption: "صالة العافية · إطلالة على الخليج" },
      { num: "٠٥", title: "المواقف وسهولة الوصول",
        body: "مواقف مخصَّصة، وخدمة صفّ السيارات، والوصول المباشر إلى مجمَّع الحمراء الأشمل، لضمان تنقّل سلس عبر الوجهة.",
        image: "/assets/entrance-night-wide.jpg",
        imageCaption: "مدخل المجمَّع · خدمة صفّ مخصَّصة" },
    ],
    ctaTitle: "خطِّط لإقامتك.",
    ctaSubtitle: "للحجز والاستفسار، يرجى التواصل مباشرةً مع فريق فندق الحمراء. إقامة متكاملة، ضمن وجهة واحدة استثنائية.",
    ctaLabel: "احجز إقامتك",
  },
} as const;

export default function AlHamraHotel() {
  const { lang } = useI18n();
  const c = CONTENT[lang];

  return (
    <PageLayout>
      <PageHero
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        image="/assets/skyline-gulf-night.jpg"
        crumbs={[...c.crumbs]}
      />

      <StatsBar stats={[...c.stats]} />

      {/* ── HERO FULL-BLEED ───────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <img
          loading="lazy"
          src="/assets/lobby-atrium-dramatic.jpg"
          alt={c.heroImageAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(29,29,27,0.35) 0%, transparent 30%, transparent 60%, rgba(29,29,27,0.85) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: "clamp(32px,5vh,56px)", left: "clamp(24px,5vw,80px)", right: "clamp(24px,5vw,80px)" }}>
          <div style={{
            fontFamily: CG, fontSize: "10px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL, marginBottom: 12,
          }}>
            {c.heroKicker}
          </div>
          <h3 style={{
            fontFamily: CG, fontSize: "clamp(22px,2.5vw,38px)",
            fontWeight: 200, color: "#fff", lineHeight: 1.25,
            margin: 0, maxWidth: 760, letterSpacing: "-0.005em",
          }}>
            {c.heroHeading} <strong style={{ fontWeight: 500 }}>{c.heroHeadingBold}</strong>
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
            <Rv><Tag>{c.overviewTag}</Tag></Rv>
            <Rv delay={0.1}>
              <H2>
                {c.overviewLine1}<br />
                {c.overviewLine2}<br />
                <em style={{ color: PEARL_TEXT, fontStyle: "normal" }}>{c.overviewLine3}</em>
              </H2>
            </Rv>
          </div>
          <div>
            <Rv delay={0.2}>
              <Body style={{ marginBottom: 20 }}>
                {c.overviewBody1}
              </Body>
            </Rv>
            <Rv delay={0.3}>
              <Body>
                {c.overviewBody2}
              </Body>
            </Rv>
          </div>
        </div>
      </Section>

      {/* ── DISTINCT ADVANTAGE ─────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag>{c.advantagesTag}</Tag></Rv>
        <Rv delay={0.1}><H2>{c.advantagesHeading}</H2></Rv>
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
                  {a.text}
                </div>
              </motion.div>
            ))}
          </div>
        </Rv>
      </Section>

      {/* ── GUEST EXPERIENCE — 5 service categories ────────────────── */}
      <Section>
        <Rv><Tag>{c.servicesTag}</Tag></Rv>
        <Rv delay={0.1}><H2>{c.servicesHeading}</H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            {c.servicesBody}
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
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  {s.body}
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
