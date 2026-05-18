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
   Business Centre — /business-centre
   Bilingual EN/AR content sourced from
   Al_Hamra_Business_Tower_Website — "Business Center" sheet
────────────────────────────────────────────────────────────────── */

const CONTENT = {
  en: {
    tag: "Experience · Business Centre",
    title: "Al Hamra Business Centre",
    subtitle: "An executive business facility within Al Hamra Business Tower. Configurable rooms for high-level convenings — purpose-built for corporate engagements, workshops, and training.",
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Experience", href: "/services" },
      { label: "Business Centre", href: "/business-centre" },
    ],
    stats: [
      { number: "36", label: "Floor Level" },
      { number: "∞",  label: "Configurable Layouts" },
      { number: "24/7", label: "Operational Support" },
      { number: "412m", label: "Tower Elevation" },
    ],
    heroKicker: "36th Floor · Kuwait City & the Arabian Gulf",
    heroHeading: "Executive convenings,",
    heroHeadingBold: "at the altitude of institutions.",
    heroImageAlt: "Al Hamra Business Centre — Boardroom on the 36th floor overlooking the Arabian Gulf",
    overviewTag: "Overview · The Space",
    overviewLine1: "Professional.",
    overviewLine2: "Distinguished.",
    overviewLine3: "Pioneering.",
    overviewBody1: "Located on the 36th floor, Al Hamra Business Centre offers a purpose-built environment for corporate meetings, executive workshops, training sessions, and high-level convenings.",
    overviewBody2: "Available to companies and individuals alike, supported by direct on-site logistical coordination — ensuring a seamless, professional experience across every engagement.",
    strategicTag: "Why Al Hamra Business Centre · Strategic Advantages",
    strategicHeading: "Five reasons institutions choose this address.",
    advantages: [
      { num: "01", text: "Strategic location within Kuwait's finest integrated development" },
      { num: "02", text: "A refined environment that elevates professional performance and productivity" },
      { num: "03", text: "End-to-end management from initial inquiry to final delivery" },
      { num: "04", text: "Configurable spaces with flexible pricing tailored to diverse needs" },
      { num: "05", text: "Supported by Al Hamra's integrated infrastructure" },
    ],
    facilitiesTag: "Business Support Services · Executive Facilities",
    facilitiesHeading: "A comprehensively managed executive environment.",
    facilitiesBody: "Al Hamra Business Centre provides a fully-managed executive environment, supported by integrated infrastructure and refined operational services — ensuring efficiency, business continuity, and professional excellence across every engagement.",
    facilities: [
      { num: "01", title: "Spatial Configuration & Capacity",
        body: "Flexible, customisable spaces — including executive meeting rooms, seminar arrangements, and collaborative workshop formats — with seating capacities and final layouts tailored to each session's requirements.",
        image: "/assets/boardroom-wide.jpg",
        imageCaption: "Primary Boardroom · Configurable Layouts" },
      { num: "02", title: "Integrated Systems",
        body: "A complete audio-visual system with smart controls and on-call technical support ensures uninterrupted presentations and conferencing, with continuous digital connectivity.",
        image: "/assets/meeting-room-glass-pattern.jpg",
        imageCaption: "Meeting Room · AV + Smart Controls" },
      { num: "03", title: "Catering & Hospitality",
        body: "Direct access to Al Hamra Mall enables a wide range of hospitality options from restaurant tenants, with arrangements for meals and coffee breaks tailored to the engagement, and the option to engage external caterers as required.",
        image: "/assets/mall-atrium-luxury-centre.jpg",
        imageCaption: "Al Hamra Luxury Centre · Curated Catering" },
      { num: "04", title: "Parking & Access",
        body: "The complex provides organised parking, internal shuttle service to Dasman Parking, valet service, and access via ride-share services — ensuring a smooth, efficient arrival for guests.",
        image: "/assets/entrance-night.jpg",
        imageCaption: "Grand Entrance · Valet + Structured Parking" },
      { num: "05", title: "Premium Touchpoints",
        body: "Stationery bearing the Al Hamra Business Centre identity and an operational environment managed to Al Hamra Tower's highest standards of quality and institutional professionalism.",
        image: "/assets/lobby-executive-lounge.jpg",
        imageCaption: "Executive Lounge · Branded Environment" },
      { num: "06", title: "Accommodation",
        body: "Distinguished accommodation for trainers and guest speakers at preferred corporate rates at Al Hamra Hotel within the complex — ensuring comfort and continuity of the engagement.",
        image: "/assets/sky-lobby-travertine-corridor.jpg",
        imageCaption: "Al Hamra Hotel · Preferred Corporate Rates" },
    ],
    ctaTitle: "Host your next meeting.",
    ctaSubtitle: "For bookings and inquiries, call 1829000 or visit www.alhamra.com.kw to discuss your requirements.",
    ctaLabel: "Begin the Conversation",
    contactRows: [
      { label: "Phone",    value: "1829000" },
      { label: "Website",  value: "www.alhamra.com.kw" },
      { label: "Location", value: "36th Floor · Al Hamra Business Tower" },
    ],
  },
  ar: {
    tag: "تجربة الحمراء · مركز الأعمال",
    title: "مركز الحمراء للأعمال",
    subtitle: "مرفق أعمال تنفيذي داخل برج الحمراء للأعمال. غرف مرنة تناسب الاجتماعات رفيعة المستوى — مصمَّمة خصيصاً لاستضافة اجتماعات المؤسسات، وورش العمل، وجلسات التدريب.",
    crumbs: [
      { label: "الرئيسية", href: "/" },
      { label: "تجربة الحمراء", href: "/services" },
      { label: "مركز الأعمال", href: "/business-centre" },
    ],
    stats: [
      { number: "٣٦", label: "الطابق" },
      { number: "∞",  label: "تصاميم متعدّدة" },
      { number: "٢٤/٧", label: "دعم تشغيلي" },
      { number: "٤١٢م", label: "ارتفاع البرج" },
    ],
    heroKicker: "الطابق السادس والثلاثون · مدينة الكويت والخليج العربي",
    heroHeading: "اجتماعات تنفيذية،",
    heroHeadingBold: "على ارتفاع المؤسسات.",
    heroImageAlt: "مركز الحمراء للأعمال — قاعة اجتماعات في الطابق ٣٦ مطلّة على الخليج العربي",
    overviewTag: "نظرة عامة · المساحة",
    overviewLine1: "احترافية.",
    overviewLine2: "تميُّز.",
    overviewLine3: "ريادة.",
    overviewBody1: "يقع مركز الحمراء للأعمال في الطابق السادس والثلاثين، ويقدّم بيئة مصمَّمة خصيصاً لاستضافة اجتماعات المؤسسات والشركات، وورش العمل، وجلسات التدريب، وغيرها من الفعاليات رفيعة المستوى.",
    overviewBody2: "يوفّر المركز خدماته للشركات والأفراد، ويضمّ دعماً لوجستياً مباشراً في الموقع لضمان تجربة سلسة واحترافية في كلّ المناسبات.",
    strategicTag: "لماذا مركز الحمراء للأعمال · مزايا استراتيجية",
    strategicHeading: "خمسة أسباب تجعل المؤسسات تختار هذا العنوان.",
    advantages: [
      { num: "٠١", text: "موقع استراتيجي داخل أرقى المشاريع المتطوّرة في الكويت" },
      { num: "٠٢", text: "بيئة راقية تعزّز الأداء الاحترافي والإنتاجية" },
      { num: "٠٣", text: "إدارة شاملة من الألف إلى الياء" },
      { num: "٠٤", text: "مساحات قابلة للتخصيص مع أسعار مرنة تلبّي مختلف الاحتياجات" },
      { num: "٠٥", text: "مدعومٌ بالبنية التحتية المتكاملة لبرج الحمراء" },
    ],
    facilitiesTag: "خدمات دعم الأعمال · المرافق التنفيذية",
    facilitiesHeading: "بيئة تنفيذية مُدارة بالكامل.",
    facilitiesBody: "يقدّم مركز أعمال الحمراء بيئةً تنفيذية مُدارة بالكامل، مدعومة ببنية تحتية متكاملة وخدمات تشغيلية مُتقنة تضمن الكفاءة، واستمرارية الأعمال، والتميّز المهني في كلّ مناسبة.",
    facilities: [
      { num: "٠١", title: "التوزيع المكاني والسعة",
        body: "مساحات مرنة قابلة للتخصيص، تشمل غرف الاجتماعات التنفيذية، وترتيبات الندوات، وصيغ ورش العمل التعاونية، مع تحديد السعة وتوزيع المقاعد بما يتوافق مع متطلبات كلّ فعالية.",
        image: "/assets/boardroom-wide.jpg",
        imageCaption: "قاعة الاجتماعات الرئيسية · تصاميم قابلة للتخصيص" },
      { num: "٠٢", title: "الأنظمة المتكاملة",
        body: "نظام صوتي ومرئي متكامل مع تحكّم ذكي ودعم تقني متوافر، لضمان تقديم عروض ومؤتمرات متواصلة، واتصال رقمي مستمرّ دون انقطاع.",
        image: "/assets/meeting-room-glass-pattern.jpg",
        imageCaption: "قاعة الاجتماعات · الأنظمة الصوتية والمرئية والتحكّم الذكي" },
      { num: "٠٣", title: "خدمات الطعام والضيافة",
        body: "يتيح الوصول المباشر إلى مول الحمراء خياراتٍ متنوّعة من ضيافة مطاعم المستأجرين، مع إمكانية ترتيب وجباتٍ واستراحات قهوة وفق احتياجات الفعالية، ودعم الاستعانة بمقدّمي خدمات تموين خارجيين عند الحاجة.",
        image: "/assets/mall-atrium-luxury-centre.jpg",
        imageCaption: "مركز الحمراء التجاري · ضيافة منتقاة" },
      { num: "٠٤", title: "المواقف ووسائل الوصول",
        body: "يوفّر المجمَّع مواقف منظَّمة للسيارات، وخدمات نقل داخلية إلى موقف دسمان، وخدمة صفّ السيارات، وإمكانية الوصول عبر خدمات الركوب التشاركي، لضمان وصول سلس وفعّال للضيوف.",
        image: "/assets/entrance-night.jpg",
        imageCaption: "المدخل الكبير · صفّ السيارات والمواقف المنظَّمة" },
      { num: "٠٥", title: "لمسات راقية",
        body: "أدوات مكتبية تحمل هويّة مركز أعمال الحمراء، وبيئة تشغيلية مُدارة وفق أعلى معايير الجودة والاحتراف المؤسسي لبرج الحمراء.",
        image: "/assets/lobby-executive-lounge.jpg",
        imageCaption: "الصالة التنفيذية · بيئة بهويّة المركز" },
      { num: "٠٦", title: "الإقامة",
        body: "إقامة مميَّزة للمدرّبين والضيوف بأسعار خاصّة للشركات في فندق الحمراء ضمن المجمَّع، لضمان الراحة واستمرارية الفعاليات.",
        image: "/assets/sky-lobby-travertine-corridor.jpg",
        imageCaption: "فندق الحمراء · أسعار شركات تفضيلية" },
    ],
    ctaTitle: "استضِف اجتماعك القادم.",
    ctaSubtitle: "للحجز والاستفسار، تفضّل بالاتصال على ١٨٢٩٠٠٠ أو زيارة www.alhamra.com.kw للتعرّف على احتياجاتكم.",
    ctaLabel: "ابدأ المحادثة",
    contactRows: [
      { label: "الهاتف",    value: "١٨٢٩٠٠٠" },
      { label: "الموقع الإلكتروني",  value: "www.alhamra.com.kw" },
      { label: "العنوان", value: "الطابق ٣٦ · برج الحمراء للأعمال" },
    ],
  },
} as const;

export default function BusinessCentre() {
  const { lang } = useI18n();
  const c = CONTENT[lang];

  return (
    <PageLayout>
      <PageHero
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        image="/assets/city-view-office.jpg"
        crumbs={[...c.crumbs]}
      />

      <StatsBar stats={[...c.stats]} />

      {/* ── HERO CAROUSEL-STYLE FULL-BLEED IMAGE ──────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px,48vw,560px)", overflow: "hidden" }}>
        <img
          loading="lazy"
          src="/assets/boardroom-gulf-view.jpg"
          alt={c.heroImageAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
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
        }} className="bc-overview-grid">
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

      {/* ── STRATEGIC ADVANTAGE ────────────────────────────────────── */}
      <Section bg="#FAFAFA">
        <Rv><Tag>{c.strategicTag}</Tag></Rv>
        <Rv delay={0.1}><H2>{c.strategicHeading}</H2></Rv>
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

      {/* ── EXECUTIVE FACILITIES — 6 cards with images ─────────────── */}
      <Section>
        <Rv><Tag>{c.facilitiesTag}</Tag></Rv>
        <Rv delay={0.1}><H2>{c.facilitiesHeading}</H2></Rv>
        <Rv delay={0.2}>
          <Body style={{ maxWidth: 720, marginBottom: "clamp(40px,6vh,64px)" }}>
            {c.facilitiesBody}
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
              <div style={{ padding: "clamp(20px,3vh,28px) clamp(4px,1vw,12px) 0" }}>
                <h3 style={{
                  fontFamily: CG, fontSize: "clamp(16px,1.4vw,20px)",
                  fontWeight: 400, color: DARK, lineHeight: 1.3,
                  margin: "0 0 12px",
                  letterSpacing: "-0.005em",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: CG, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 300, color: "#4a4a48",
                  lineHeight: 1.75, margin: "0 0 10px",
                }}>
                  {f.body}
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
      />

      {/* Direct contact detail strip */}
      <div style={{
        background: "#0F0E0C",
        borderTop: "1px solid rgba(200,185,154,0.1)",
        padding: "clamp(32px,5vh,48px) clamp(28px,6vw,96px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "clamp(20px,3vw,48px)",
        }}>
          {c.contactRows.map(item => (
            <div key={item.label}>
              <div style={{
                fontFamily: CG, fontSize: "10px", letterSpacing: "0.32em",
                textTransform: "uppercase", color: PEARL,
                marginBottom: 8,
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: CG, fontSize: "clamp(13px,1.1vw,15px)",
                color: "#fff", fontWeight: 300,
              }}>
                {item.value}
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
