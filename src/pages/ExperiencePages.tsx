import { useState } from "react";
import { FloorPlanViewer } from "@/components/shared/FloorPlanViewer";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";
import { useI18n } from "@/lib/i18n";
import { usePageContent } from "@/lib/useCmsContent";
import { SlotImage, Editable } from "@/lib/EditMode";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ══════════════════════════════════════════════════
   SERVICES & FACILITIES  /services
══════════════════════════════════════════════════ */
const SERVICES_CONTENT = {
  en: {
    tag: "Experience · Services",
    title: "Services & Facilities",
    subtitle: "Al Hamra Business Tower delivers an integrated operational environment — professional property management, advanced security and access systems, and dedicated tenant coordination — engineered for efficiency, business continuity, and the highest standards of workplace comfort.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Experience", href: "/services" }],
    stats: [
      { number: "24/7", label: "Operations" },
      { number: "351m", label: "Sky Lounge Elevation" },
      { number: "100%", label: "Power Redundancy" },
      { number: "9", label: "Cinema Screens" },
    ],
    lobbyKicker: "Al Hamra Business Tower · Grand Lobby · 24/7 Operations",
    lobbyHeading: "Every service designed to",
    lobbyHeadingBold: "anticipate. Remove friction. Perform.",
    systemsTag: "Comprehensive Services · Continuous Operation",
    systemsHeading: "Operational Excellence at Scale",
    systemsBody: "Al Hamra Business Tower operates under a unified model that brings together engineering, digital infrastructure, facilities management, interior fit-out, marketing support, and health and wellness — a single framework ensuring continuity, efficiency, and institutional readiness at the highest level.",
    systems: [
      { number: "01", title: "Electrical Systems",       body: "Five dedicated electrical substations located at basement-2, floors 4, 27, 52, and 76 deliver uninterrupted power. 100% generator redundancy ensures zero-downtime continuity across every office floor." },
      { number: "02", title: "Water Supply & Plumbing",  body: "Centralised water distribution with booster pump stations serving all 80 floors. 24-hour leak response maintains consistent pressure and quality." },
      { number: "03", title: "Air Conditioning & HVAC",  body: "District-cooled chilled water system with variable air volume units. Individual zone control per floor — tenants regulate temperature independently." },
      { number: "04", title: "ICT & Telecommunications", body: "Dual fibre-optic backbone with structured cabling to every floor and 12-hour backup power — ensuring uninterrupted institutional operations." },
      { number: "05", title: "Security & Access Control",body: "Round-the-clock manned security, CCTV surveillance, smart card access, visitor management, and direct coordination with civil defense authorities." },
      { number: "06", title: "On-Site Medical Room",     body: "Fully equipped medical room staffed during business hours, with first-aid capabilities and emergency response. Defibrillators at key points." },
    ],
    facilityTag: "Premium Additional Services",
    facilityHeading: "Maintained to the Highest Standard",
    facility: [
      { number: "01", title: "Wellness & Roof Garden",    body: "A complete environment for health — medical clinics, spa facilities, and a carefully curated rooftop garden delivering a unique relaxation experience for tenants and visitors." },
      { number: "02", title: "Concierge & Building Management", body: "A central management team coordinates every aspect of engineering, maintenance, digital systems, and tenant requests, ensuring immediate response and continuous high-efficiency operations." },
      { number: "03", title: "Security & Protection", body: "A specialised security team with continuous 24-hour advanced surveillance systems protects tenants, visitors, and facilities to the highest safety standards." },
      { number: "04", title: "Smart Access", body: "Smart access systems, central building management, energy-efficient lighting, and traffic-control infrastructure enhance operational efficiency and reduce operational risk." },
    ],
    galleryCaps: [
      "VIP Elevator Hall · Levels 30–51",
      "Lamella Ceiling · Daylight",
      "Grand Lobby Structure · 24m Height",
    ],
    quote: "\"Behind every seamless day at Al Hamra Tower stands an infrastructure of precision — engineering teams, monitoring systems, and service protocols working in concert.\"",
    skyKicker: "Floors 78 – 80 · 351 Metres",
    skyTitle: "The Sky Lounge.",
    skyTitle2: "Kuwait's highest dining experience.",
    skyBody: "Starting at 351 metres above Kuwait City, the Al Hamra Sky Lounge occupies Floors 78–80 — the crown of the tower. VIP elevators connect directly from the ground lobby. No other venue in Kuwait begins this high.",
    skyCap1: "Fine Dining · Piano Bar",
    skyCap2: "Sky Lobby Lounge · Panoramic Views",
    mallTitle: "Al Hamra Luxury Centre",
    mallTag: "The Mall · 5 Levels · 24,000 m²",
    mallBody: "Directly connected to the tower, the Al Hamra Luxury Centre spans 24,000m² across five levels. Its façade is designed to be continuous with and complement the tower's limestone and glass cladding — a single architectural statement from ground to sky.",
    brands: [
      { category: "Luxury Fashion", brands: "Hermès · Gucci · Saint Laurent · Bottega Veneta · Salvatore Ferragamo · Bally · Ted Baker · Mont Blanc" },
      { category: "Jewellery & Watches", brands: "Officine Panerai · Cartier · Alma · Behbehani Luxury Boutique · Al Arbash" },
      { category: "Dining & Cafés", brands: "Piccola Milano · Bice · Entrecôte · Angelina · L'Eto · Café Bateel · Costa Coffee" },
    ],
    atriumCap: "Luxury Centre · Circular Atrium",
    cinemaCap: "Grand Cinema · 9 Screens",
    cinemaSub: "Premium recliners on the\nuppermost mall level",
    amenities: [
      { label: "9-Screen Cinema",    desc: "Grand Cinemas on the uppermost level" },
      { label: "Health Club & Spa",  desc: "Al Hamra Thermae between tower and mall" },
      { label: "Outdoor Roof Garden", desc: "6,000m² landscaped plaza" },
      { label: "2,000 Parking Spaces", desc: "11-level car park with pedestrian bridges" },
    ],
    cta: { title: "Secure Your Position", subtitle: "Ready to experience Al Hamra Tower's world-class environment? Speak with our leasing team today.", label: "Leasing Inquiry" },
  },
  ar: {
    tag: "تجربة الحمراء · الخدمات",
    title: "الخدمات والمرافق",
    subtitle: "يقدّم برج الحمراء للأعمال بيئة تشغيلية متكاملة، تجمع بين إدارة عقارية احترافية، وأنظمة أمن وتحكم متقدمة، وتنسيق مخصص للمستأجرين، جميعها مصممة لتعزيز الكفاءة، وضمان استمرارية العمل، وتوفير أقصى درجات الراحة في بيئة العمل.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "تجربة الحمراء", href: "/services" }],
    stats: [
      { number: "٢٤/٧", label: "تشغيل متواصل" },
      { number: "٣٥١م", label: "ارتفاع صالة السماء" },
      { number: "١٠٠٪", label: "احتياطي كهرباء كامل" },
      { number: "٩", label: "شاشات سينمائية" },
    ],
    lobbyKicker: "برج الحمراء للأعمال · اللوبي الكبير · تشغيل على مدار الساعة",
    lobbyHeading: "كلّ خدمة مصمَّمة كي",
    lobbyHeadingBold: "تستبق. وتُذلِّل العقبات. وتُؤدّي.",
    systemsTag: "الخدمات الشاملة · تشغيل متواصل",
    systemsHeading: "التميّز التشغيلي على نطاق واسع",
    systemsBody: "يعمل برج الحمراء للأعمال وفق نموذج تشغيلي متكامل يجمع بين الهندسة، والبنية التحتية الرقمية، وإدارة المرافق، والتجهيزات الداخلية، ودعم التسويق، والخدمات الصحية والعناية، ضمن إطار موحّد يضمن الاستمرارية والكفاءة والجاهزية المؤسسية بأعلى المعايير.",
    systems: [
      { number: "٠١", title: "الأنظمة الكهربائية",       body: "خمس محطات كهرباء فرعية مخصّصة موزّعة على القبو الثاني، والطوابق ٤ و٢٧ و٥٢ و٧٦، تضمن إمداداً متواصلاً للكهرباء، مع احتياطي كامل عبر مولدات تكفل استمرارية التشغيل على جميع طوابق المكاتب دون انقطاع." },
      { number: "٠٢", title: "إمدادات المياه والسباكة",  body: "نظام توزيع مياه مركزي مع محطات ضخّ معزّزة تخدم جميع طوابق البرج الثمانين، مع فرق استجابة على مدار الساعة للحفاظ على ثبات الضغط وجودة الإمداد." },
      { number: "٠٣", title: "التكييف والتهوية",          body: "نظام تبريد بالمياه المُبرَّدة على مستوى المنطقة مع وحدات حجم هواء متغيّر، وتحكّم مستقل بكل طابق يتيح للمستأجرين ضبط درجة الحرارة باستقلالية تامة." },
      { number: "٠٤", title: "البنية التحتية الرقمية والاتصالات", body: "اتصال مزدوج بالألياف الضوئية مع غرف بيانات متكاملة، واحتياطي طاقة يصل إلى ١٢ ساعة، لضمان استمرارية العمليات المؤسسية دون أي انقطاع." },
      { number: "٠٥", title: "الأمن وإدارة الوصول",       body: "أمن بشري حاضر على مدار الساعة، ومراقبة بكاميرات شاملة، ودخول ببطاقات ذكية، وإدارة احترافية للزوار، مع تنسيق مباشر مع جهات الدفاع المدني." },
      { number: "٠٦", title: "العيادات الصحية والخدمات الطبية", body: "خدمات طبية متميّزة في الموقع تشمل الطب العام، وطب الأسنان، والأمراض الجلدية، والعلاج الطبيعي، والفحوصات التشخيصية، إلى جانب عيادة طوارئ داخل لوبي البرج." },
    ],
    facilityTag: "خدمات مميّزة إضافية",
    facilityHeading: "صيانة وفق أرفع المعايير",
    facility: [
      { number: "٠١", title: "العناية الصحية وحديقة السطح",    body: "بيئة متكاملة للعناية بالصحة تشمل العيادات الطبية، ومرافق السبا، وحديقة سقف مصمّمة ومنسّقة خصيصاً لتوفير تجربة استرخاء فريدة للمستأجرين والزوار." },
      { number: "٠٢", title: "خدمة الكونسييرج وإدارة المبنى",   body: "فريق إدارة مركزي يُنسّق كل جانب من الشؤون الهندسية، والصيانة، والأنظمة الرقمية، ومتطلبات المستأجرين، لضمان الاستجابة الفورية واستمرارية العمل بكفاءة عالية." },
      { number: "٠٣", title: "الأمن والحماية",                 body: "فريق أمني متخصّص يعمل مع أنظمة مراقبة متقدّمة ومتواصلة على مدار الساعة، لحماية المستأجرين والزوار والمرافق وفق أعلى معايير السلامة والأمان." },
      { number: "٠٤", title: "الوصول الذكي",                   body: "أنظمة الوصول الذكي ونظام إدارة المبنى المركزي، والإضاءة الموفّرة للطاقة، والبنية التحتية للتحكّم في الحركة، ترفع الكفاءة التشغيلية وتقلّص المخاطر." },
    ],
    galleryCaps: [
      "ردهة مصاعد كبار الشخصيات · الطوابق ٣٠–٥١",
      "السقف المُضلَّع · ضوء النهار",
      "اللوبي الكبير · ارتفاع ٢٤ متراً",
    ],
    quote: "«وراء كل يوم متناغم في برج الحمراء بنية من الدقة — فِرَق هندسية، وأنظمة مراقبة، وبروتوكولات خدمة تعمل بانسجام تامّ.»",
    skyKicker: "الطوابق ٧٨ – ٨٠ · ٣٥١ متراً",
    skyTitle: "صالة السماء.",
    skyTitle2: "أعلى تجربة طعام في الكويت.",
    skyBody: "تنطلق على ارتفاع ٣٥١ متراً فوق مدينة الكويت، حيث تشغل صالة الحمراء السماوية الطوابق ٧٨–٨٠ — تاج البرج. تربطها مصاعد كبار الشخصيات مباشرةً باللوبي الأرضي. لا وجهة أخرى في الكويت تبدأ من هذا العلوّ.",
    skyCap1: "مطبخ راقٍ · بار البيانو",
    skyCap2: "صالة لوبي السماء · إطلالات بانورامية",
    mallTitle: "مركز الحمراء التجاري الفاخر",
    mallTag: "المول · ٥ مستويات · ٢٤٬٠٠٠ م²",
    mallBody: "يتّصل مركز الحمراء التجاري الفاخر بالبرج اتصالاً مباشراً، ويمتدّ على مساحة ٢٤٬٠٠٠ م² عبر خمسة مستويات. صُمِّمت واجهته لتمتدّ بانسجامٍ تامّ مع كسوة الحجر الجيري والزجاج المغلِّفة للبرج — بيان معماري واحد من الأرض إلى السماء.",
    brands: [
      { category: "أزياء فاخرة", brands: "هيرميس · غوتشي · سان لوران · بوتيغا فينيتا · سالفاتوري فيراغامو · بالي · تيد بيكر · مونت بلانك" },
      { category: "مجوهرات وساعات", brands: "أوفيتشيني بانيراي · كارتييه · آلما · بوتيك بهبهاني للأناقة · العرباش" },
      { category: "مطاعم ومقاهٍ", brands: "بيكولا ميلانو · بيتشي · أنتركوت · أنجلينا · ليتو · مقهى بتيل · كوستا كوفي" },
    ],
    atriumCap: "المركز التجاري · البهو الدائري",
    cinemaCap: "السينما الكبرى · ٩ شاشات",
    cinemaSub: "مقاعد قابلة للإمالة من فئة بريميوم\nفي المستوى الأعلى من المركز التجاري",
    amenities: [
      { label: "سينما من ٩ شاشات",    desc: "غراند سينما في المستوى الأعلى" },
      { label: "نادٍ صحّي ومنتجع",  desc: "حمّامات الحمراء بين البرج والمركز" },
      { label: "حديقة سطح خارجية", desc: "ساحة مُنسَّقة بمساحة ٦٬٠٠٠ م²" },
      { label: "٢٬٠٠٠ موقف سيارات", desc: "مجمع من ١١ مستوى مع جسور للمشاة" },
    ],
    cta: { title: "احجز موقعك", subtitle: "هل أنت مستعدّ لتجربة بيئة برج الحمراء العالمية؟ تواصل مع فريق التأجير اليوم.", label: "استفسار عن التأجير" },
  },
} as const;

export function Services() {
  const { lang } = useI18n();
  const c = usePageContent<any>("services", SERVICES_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="services"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />
      <StatsBar stats={[...c.stats]} editKey="services" />

      {/* Lobby entrance corridor — full bleed */}
      <div style={{ position: "relative", height:"clamp(240px,35vw,440px)", overflow: "hidden" }}>
        <SlotImage
              loading="lazy" slot="services.corridor" fallback="/assets/lobby-entrance-corridor.jpg"
              alt={lang === "ar" ? "ممرّ مدخل اللوبي الكبير لبرج الحمراء" : "Al Hamra Tower Grand Lobby entrance corridor"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 30%, rgba(29,29,27,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 44, left: 80, right: 80 }}>
          <p style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>
            <Editable id="page_prose:services:lobbyKicker">{c.lobbyKicker}</Editable>
          </p>
          <h3 style={{ fontFamily: FONT, fontSize: "clamp(20px,2.2vw,34px)", fontWeight: 200, color: "#fff", lineHeight: 1.3 }}>
            <Editable id="page_prose:services:lobbyHeading">{c.lobbyHeading}</Editable><br /><strong style={{ fontWeight: 500 }}><Editable id="page_prose:services:lobbyHeadingBold">{c.lobbyHeadingBold}</Editable></strong>
          </h3>
        </div>
      </div>

      <Section>
        <Rv><Tag><Editable id="page_prose:services:systemsTag">{c.systemsTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:services:systemsHeading">{c.systemsHeading}</Editable></H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 48 }}><Editable id="page_prose:services:systemsBody">{c.systemsBody}</Editable></Body></Rv>
        <Rv delay={0.3}><FeatureGrid features={[...c.systems]} editKey="services" editField="systems" /></Rv>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag><Editable id="page_prose:services:facilityTag">{c.facilityTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:services:facilityHeading">{c.facilityHeading}</Editable></H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={[...c.facility]} editKey="services" editField="facility" /></Rv>
      </Section>

      {/* Interior photo gallery */}
      <div className="grid-3col-photo">
        {[
          { src: "/assets/lobby-elevator-hall.jpg",   alt: lang === "ar" ? "ردهة مصاعد كبار الشخصيات" : "VIP elevator hall",        cap: c.galleryCaps[0] },
          { src: "/assets/lobby-ceiling-day.jpg",     alt: lang === "ar" ? "هيكل سقف اللوبي" : "Lobby ceiling structure",  cap: c.galleryCaps[1] },
          { src: "/assets/lobby-ceiling-portrait.jpg",alt: lang === "ar" ? "السقف الإنشائي للوبي" : "Lobby ceiling portrait",   cap: c.galleryCaps[2] },
        ].map(({ src, alt, cap }, i) => (
          <div key={src} style={{ position: "relative", overflow: "hidden", height: 300 }}>
            <img src={src} alt={alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transition: "transform 0.6s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.55))", padding: "14px 18px 12px" }}>
              <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}><Editable id={`page_prose:services:galleryCaps.${i}`}>{cap}</Editable></span>
            </div>
          </div>
        ))}
      </div>

      <Section>
        <Rv>
          <p style={{ fontFamily: FONT, fontSize: "clamp(18px,2vw,26px)", fontWeight: 200, letterSpacing: "0.04em", color: "#1D1D1B", lineHeight: 1.65, maxWidth: 720 }}>
            <Editable id="page_prose:services:quote">{c.quote}</Editable>
          </p>
        </Rv>
      </Section>

      {/* ── Sky Lounge ─────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", height: "clamp(320px,45vw,580px)", overflow: "hidden", background: "#0c0b09" }}>
          <SlotImage
              loading="lazy" slot="services.skyPanoramic" fallback="/assets/sky-lobby-panoramic.jpg"
            alt={lang === "ar" ? "صالة الحمراء السماوية — مطعم بانورامي على ارتفاع ٣٥١ متراً يطلّ على الكويت" : "Al Hamra Sky Lounge — 351m dining with panoramic Kuwait views"}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.75)" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 30%, rgba(29,29,27,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(32px,5vh,56px) clamp(28px,6vw,96px)" }}>
            <Rv>
              <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#C8B99A", marginBottom: 12 }}>
                <Editable id="page_prose:services:skyKicker">{c.skyKicker}</Editable>
              </div>
              <h2 style={{ fontFamily: FONT, fontWeight: 200, letterSpacing: "0.04em", fontSize: "clamp(26px,4vw,58px)", color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
                <Editable id="page_prose:services:skyTitle">{c.skyTitle}</Editable><br /><Editable id="page_prose:services:skyTitle2">{c.skyTitle2}</Editable>
              </h2>
              <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.65 }}>
                <Editable id="page_prose:services:skyBody">{c.skyBody}</Editable>
              </p>
            </Rv>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#0c0b09" }}>
          <div style={{ position: "relative", height: "clamp(160px,20vw,260px)", overflow: "hidden" }}>
            <SlotImage
              loading="lazy" slot="services.skyLounge" fallback="/assets/sky-lobby-lounge.jpg"
              alt={lang === "ar" ? "قاعة طعام صالة السماء — ثريا وطاولات مستديرة وبار بيانو" : "Sky Lounge dining room — chandelier, round tables, piano bar"}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", bottom: 10, left: 14, fontFamily: FONT, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}><Editable id="page_prose:services:skyCap1">{c.skyCap1}</Editable></div>
          </div>
          <div style={{ position: "relative", height: "clamp(160px,20vw,260px)", overflow: "hidden" }}>
            <SlotImage
              loading="lazy" slot="services.lounge" fallback="/assets/lounge-at-window.jpg"
              alt={lang === "ar" ? "صالة لوبي السماء — أرائك كريمية وإطلالة على مدينة الكويت" : "Sky Lobby lounge — cream sofas, Kuwait City through full-height windows"}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
            <div style={{ position: "absolute", bottom: 10, left: 14, fontFamily: FONT, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}><Editable id="page_prose:services:skyCap2">{c.skyCap2}</Editable></div>
          </div>
        </div>
      </div>

      {/* ── Luxury Centre ──────────────────────────────────── */}
      <Section>
        <Rv><Tag><Editable id="page_prose:services:mallTag">{c.mallTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:services:mallTitle">{c.mallTitle}</Editable></H2></Rv>
        <p style={{ fontFamily: FONT, fontWeight: 300,
          fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58", lineHeight: 1.9,
          maxWidth: 720, marginBottom: 40 }}>
          <Editable id="page_prose:services:mallBody">{c.mallBody}</Editable>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2,
          marginBottom: 48 }} className="grid-3col">
          {c.brands.map(({ category, brands }, i) => (
            <div key={category} style={{ background: "#FAFAFA",
              padding: "clamp(24px,3vw,36px)", borderTop: "2px solid #C8B99A" }}>
              <div style={{ fontFamily: FONT, fontSize: "10px",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#9A7550", marginBottom: 12 }}><Editable id={`page_prose:services:brands.${i}.category`}>{category}</Editable></div>
              <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1vw,13px)",
                color: "#6B6B6B", lineHeight: 1.9 }}><Editable id={`page_prose:services:brands.${i}.brands`}>{brands}</Editable></div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
          <div style={{ position: "relative", height: "clamp(220px,28vw,380px)", overflow: "hidden", background: "#0c0b09" }}>
            <SlotImage
              loading="lazy" slot="services.mallAtrium" fallback="/assets/mall-atrium-skylight.jpg"
              alt={lang === "ar" ? "مركز الحمراء التجاري — بهو دائري بقبّة هندسية" : "Al Hamra Luxury Centre — circular atrium with geometric skylight"}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, rgba(12,11,9,0.7), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 20, fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8B99A" }}>
              <Editable id="page_prose:services:atriumCap">{c.atriumCap}</Editable>
            </div>
          </div>
          <div style={{ position: "relative", height: "clamp(220px,28vw,380px)", overflow: "hidden", background: "#0c0b09" }}>
            <SlotImage
              loading="lazy" slot="services.entrance" fallback="/assets/tower-entrance-lit.jpg"
              alt={lang === "ar" ? "غراند سينما الحمراء — مجمع سينمائي من ٩ شاشات بمقاعد جلدية قابلة للإمالة" : "Al Hamra Grand Cinema — 9-screen multiplex, leather recliners"}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(to top, rgba(12,11,9,0.8), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 16, left: 20 }}>
              <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8B99A", marginBottom: 6 }}><Editable id="page_prose:services:cinemaCap">{c.cinemaCap}</Editable></div>
              <div style={{ fontFamily: FONT, fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, whiteSpace: "pre-line" }}><Editable id="page_prose:services:cinemaSub">{c.cinemaSub}</Editable></div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: 1, marginTop: 2 }} className="grid-4col">
          {c.amenities.map(({ label, desc }, i) => (
            <div key={label} style={{ background: "#FAFAFA",
              padding: "clamp(20px,2.5vw,28px)", borderTop: "1px solid rgba(29,29,27,0.09)" }}>
              <div style={{ fontFamily: FONT,
                fontSize: 20, color: "#C8B99A", marginBottom: 8 }}>◆</div>
              <div style={{ fontFamily: FONT, fontSize: "12px",
                fontWeight: 500, color: "#1D1D1B", marginBottom: 6,
                letterSpacing: "0.04em" }}><Editable id={`page_prose:services:amenities.${i}.label`}>{label}</Editable></div>
              <div style={{ fontFamily: FONT, fontSize: "11px",
                color: "#6B6B6B", lineHeight: 1.7 }}><Editable id={`page_prose:services:amenities.${i}.desc`}>{desc}</Editable></div>
            </div>
          ))}
        </div>
      </Section>

      <DarkBand title={c.cta.title} subtitle={c.cta.subtitle} ctaLabel={c.cta.label} ctaHref="/leasing/inquiry#inquiry-form" editKey="services" editFields={{ title: "cta.title", subtitle: "cta.subtitle", cta: "cta.label" }} />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LOCATION  /location
══════════════════════════════════════════════════ */
const LOCATION_CONTENT = {
  en: {
    tag: "Experience · Location",
    title: "Location & Access",
    subtitle: "Al Hamra Business Tower is located in Sharq, Kuwait City — strategically positioned at the heart of the capital's principal commercial and government corridor, immediately adjacent to ministries, financial institutions, and major thoroughfares.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Experience", href: "/services" }, { label: "Location", href: "/location" }],
    stats: [
      { number: "5",      unit: " min", label: "To Government District" },
      { number: "2,000+",              label: "Parking Spaces"          },
      { number: "Sharq",               label: "Kuwait City District"    },
    ],
    bannerKicker: "Al Hamra Tower · Sharq · Kuwait City",
    bannerLine1: "Kuwait City's",
    bannerLine2: "Commercial Heart",
    bannerCredit: "Photo: Dave Burk · SOM",
    sectionTag: "Sharq District · Kuwait City",
    sectionHeading: "Where Governance, Commerce and Culture Converge",
    sectionBody: "The tower stands on Jaber Al Mubarak Street, with direct access to Kuwait City's main highway network — a strategic position that places government ministries, financial centres, and residential districts within a short, efficient drive. Kuwait International Airport is approximately 15 minutes away, ensuring swift regional and international reach for executives and visiting delegations.",
    detailLabels: ["Address", "Coordinates", "District", "Transport"],
    detailValues: [
      "Al Hamra Tower, Jaber Al Mubarak Street, Sharq, Kuwait City, Kuwait",
      "29.3759° N, 47.9774° E",
      "Sharq — Kuwait City's Central Business District",
      "Direct access to major arterial roads",
    ],
    directionsLabel: "Get Directions",
    cta: { title: "Secure Your Position in Sharq", subtitle: "Contact our leasing team to discuss available configurations at Kuwait City's premier business address.", label: "Leasing Inquiry" },
  },
  ar: {
    tag: "تجربة الحمراء · الموقع",
    title: "الموقع والوصول",
    subtitle: "يقع برج الحمراء للأعمال في منطقة شرق بمدينة الكويت، ويحتلّ موقعاً استراتيجياً في قلب الممرّ التجاري والحكومي الرئيسي للعاصمة، على مقربةٍ مباشرة من الوزارات والمؤسسات المالية والشوارع الرئيسية.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "تجربة الحمراء", href: "/services" }, { label: "الموقع", href: "/location" }],
    stats: [
      { number: "٥",      unit: " د", label: "إلى مجمّع الوزارات" },
      { number: "٢٬٠٠٠+",            label: "موقف سيارات" },
      { number: "شرق",               label: "حيّ مدينة الكويت" },
    ],
    bannerKicker: "برج الحمراء · شرق · مدينة الكويت",
    bannerLine1: "قلب الكويت",
    bannerLine2: "التجاري النابض",
    bannerCredit: "تصوير: ديف بِرك · SOM",
    sectionTag: "منطقة شرق · مدينة الكويت",
    sectionHeading: "حيث تلتقي الحوكمة والتجارة والثقافة",
    sectionBody: "يقف البرج على شارع جابر المبارك، باتصالٍ مباشر بشبكة الطرق السريعة الرئيسية في مدينة الكويت — موقعٌ استراتيجي يجعل الوزارات والمراكز المالية والمناطق السكنية على مسافة قصيرة وفعّالة. ويبعد مطار الكويت الدولي نحو ١٥ دقيقة، ما يتيح وصولاً سريعاً إقليمياً ودولياً لرجال الأعمال والوفود الزائرة.",
    detailLabels: ["العنوان", "الإحداثيات", "المنطقة", "الوصول"],
    detailValues: [
      "برج الحمراء، شارع جابر المبارك، منطقة شرق، مدينة الكويت، الكويت",
      "٢٩٫٣٧٥٩° شمالاً، ٤٧٫٩٧٧٤° شرقاً",
      "شرق — منطقة الأعمال المركزية لمدينة الكويت",
      "اتصال مباشر بالطرق السريعة الرئيسية",
    ],
    directionsLabel: "احصل على الاتجاهات",
    cta: { title: "احجز موقعك في منطقة شرق", subtitle: "تواصل مع فريق التأجير لمناقشة الخيارات المتاحة في أرقى عنوان للأعمال في مدينة الكويت.", label: "استفسار عن التأجير" },
  },
} as const;

export function Location() {
  const { lang } = useI18n();
  const c = usePageContent<any>("location", LOCATION_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="location"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />
      <StatsBar stats={[...c.stats]} editKey="location" />

      {/* Full-bleed waterfront photo */}
      <div style={{ position: "relative", height:"clamp(260px,40vw,520px)", overflow: "hidden" }}>
        <SlotImage
              loading="lazy" slot="location.waterfront" fallback="/assets/kuwait-waterfront.jpg"
              alt={lang === "ar" ? "واجهة مدينة الكويت البحرية والأفق" : "Kuwait City waterfront and skyline"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 40%, rgba(29,29,27,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 80, right: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}><Editable id="page_prose:location:bannerKicker">{c.bannerKicker}</Editable></div>
            <h3 style={{ fontFamily: FONT, fontSize: "clamp(20px,2.5vw,36px)", fontWeight: 200, color: "#fff", lineHeight: 1.2 }}>
              <Editable id="page_prose:location:bannerLine1">{c.bannerLine1}</Editable><br /><strong style={{ fontWeight: 500 }}><Editable id="page_prose:location:bannerLine2">{c.bannerLine2}</Editable></strong>
            </h3>
          </div>
          <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            <Editable id="page_prose:location:bannerCredit">{c.bannerCredit}</Editable>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid-2col media-right">
          <div>
            <Rv><Tag><Editable id="page_prose:location:sectionTag">{c.sectionTag}</Editable></Tag></Rv>
            <Rv delay={0.1}><H2><Editable id="page_prose:location:sectionHeading">{c.sectionHeading}</Editable></H2></Rv>
            <Rv delay={0.2}><Body><Editable id="page_prose:location:sectionBody">{c.sectionBody}</Editable></Body></Rv>
            <Rv delay={0.3}>
              <div style={{ marginTop: 40 }}>
                {c.detailLabels.map((label, i) => (
                  <div key={label} style={{ display: "flex", gap: 24, padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(29,29,27,0.07)" : "none" }}>
                    <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B", minWidth: 110, flexShrink: 0, paddingTop: 2 }}><Editable id={`page_prose:location:detailLabels.${i}`}>{label}</Editable></div>
                    <div style={{ fontFamily: FONT, fontSize: "13.5px", fontWeight: 300, color: "#1D1D1B" }}><Editable id={`page_prose:location:detailValues.${i}`}>{c.detailValues[i]}</Editable></div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
          <Rv delay={0.15}>
            <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: 380 }}>
              <SlotImage
              loading="lazy" slot="location.skyline" fallback="/assets/kuwait-skyline.jpg"
              alt={lang === "ar" ? "أفق مدينة الكويت مع برج الحمراء" : "Kuwait City skyline with Al Hamra Tower"}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "24px 24px 20px" }}>
                <a href="https://maps.google.com/?q=Al+Hamra+Tower+Kuwait" target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#fff", textDecoration: "none" }}>
                  <Editable id="page_prose:location:directionsLabel">{c.directionsLabel}</Editable>
                </a>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      <DarkBand title={c.cta.title} subtitle={c.cta.subtitle} ctaLabel={c.cta.label} ctaHref="/leasing/inquiry#inquiry-form" editKey="location" editFields={{ title: "cta.title", subtitle: "cta.subtitle", cta: "cta.label" }} />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LEASING OPPORTUNITIES  /leasing
══════════════════════════════════════════════════ */
const LEASING_CONTENT = {
  en: {
    tag: "Leasing",
    title: "Leasing Opportunities",
    subtitle: "Al Hamra Business Tower offers scalable office spaces within Kuwait's most prestigious commercial address — designed to support institutional growth, raise operational efficiency, and ensure long-term lease stability.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }],
    stats: [
      { number: "450", unit: " m²", label: "Minimum office size" },
      { number: "1,750", unit: " m²", label: "Maximum floor plate" },
      { number: "2,300", unit: " m²", label: "Built-up area per floor" },
      { number: "80", label: "Floors, podium to crown" },
    ],
    quote: "\"Every office.\nEvery corner.\nAn unbroken horizon.\"",
    configsTag: "Available Configurations",
    configsHeading: "Premium Office Spaces",
    configLabel: "Configuration",
    configs: [
      {
        code: "01",
        title: "Executive Suites",
        size: "250 – 500 m²",
        bullets: [
          "Corner office configuration",
          "Panoramic city views",
          "Private meeting room",
        ],
      },
      {
        code: "02",
        title: "Full Floor",
        size: "1,200 – 1,800 m²",
        bullets: [
          "Exclusive whole-floor lease",
          "Dedicated elevator access",
          "Bespoke reception",
        ],
      },
      {
        code: "03",
        title: "Corporate Headquarters",
        size: "3,000+ m²",
        bullets: [
          "Multi-floor lease opportunity",
          "Building signage rights",
          "Dedicated parking levels",
        ],
      },
    ],
    amenitiesTag: "Luxury Amenities",
    amenitiesHeading: "Included with Every Configuration",
    amenities: [
      { label: "Grand Lobby Access", desc: "24m column-free arrival experience" },
      { label: "3.2m Ceiling Height", desc: "Generous floor-to-ceiling proportions" },
      { label: "Conference Centre", desc: "Fully equipped shared facilities" },
      { label: "Flexible Lease Terms", desc: "Configurations tailored to your timeline" },
    ],
    plansKicker: "Floor Plans · Al Hamra Complex",
    plansTitle: "Ground, Mezzanine & Basement Plans",
    plansBody: "Full floor plans for the Al Hamra complex retail and parking levels. Contact the leasing team for office floor configurations.",
    cta: { title: "Secure Your Position", subtitle: "Contact our leasing team for availability, floor plans, and pricing.", label: "Submit Inquiry" },
  },
  ar: {
    tag: "التأجير",
    title: "فرص التأجير",
    subtitle: "يقدّم برج الحمراء للأعمال مساحات مكتبية قابلة للتوسّع ضمن أرقى الوجهات التجارية في الكويت، مصمّمة لتعزيز نموّ المؤسسات، ورفع كفاءة العمليات التشغيلية، وضمان استقرار الإيجار على المدى الطويل.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "التأجير", href: "/leasing" }],
    stats: [
      { number: "٤٥٠", unit: " م²", label: "الحدّ الأدنى للمكتب" },
      { number: "١٬٧٥٠", unit: " م²", label: "أكبر مساحة طابق" },
      { number: "٢٬٣٠٠", unit: " م²", label: "مساحة البناء لكل طابق" },
      { number: "80", label: "طابقاً من القاعدة إلى التاج" },
    ],
    quote: "«كلّ مكتب.\nكلّ زاوية.\nأفقٌ لا ينقطع.»",
    configsTag: "التصاميم المتوفّرة",
    configsHeading: "مساحات مكتبية بمعايير راقية",
    configLabel: "التصميم",
    configs: [
      {
        code: "٠١",
        title: "الأجنحة التنفيذية",
        size: "٢٥٠ – ٥٠٠ م²",
        bullets: [
          "تصميم زاوية للمكتب",
          "إطلالات بانورامية على المدينة",
          "غرفة اجتماعات خاصة",
        ],
      },
      {
        code: "٠٢",
        title: "الطابق الكامل",
        size: "١٬٢٠٠ – ١٬٨٠٠ م²",
        bullets: [
          "حصرياً الطابق بالكامل",
          "وصول خاص بالمصاعد",
          "مكتب استقبال مخصّص",
        ],
      },
      {
        code: "٠٣",
        title: "مقرّ المؤسسة",
        size: "أكثر من ٣٬٠٠٠ م²",
        bullets: [
          "إمكانية استئجار طوابق متعدّدة",
          "حقوق وضع اللوحات الإعلانية على المبنى",
          "طوابق مواقف مخصّصة",
        ],
      },
    ],
    amenitiesTag: "مرافق فاخرة",
    amenitiesHeading: "متوفّرة مع كلّ تصميم",
    amenities: [
      { label: "الوصول إلى اللوبي الكبير", desc: "تجربة وصول بارتفاع ٢٤ متراً دون أعمدة" },
      { label: "ارتفاع سقف ٣٫٢ متر", desc: "تناسبٌ سخيّ بين الأرضية والسقف" },
      { label: "مركز مؤتمرات مجهَّز", desc: "مرافق مشتركة بأعلى مستوى تجهيز" },
      { label: "شروط تأجير مرنة", desc: "تصاميم مفصَّلة وفق مهلتك الزمنية" },
    ],
    plansKicker: "مخطّطات الطوابق · مجمّع الحمراء",
    plansTitle: "مخطّطات الطابق الأرضي والميزانين والقبو",
    plansBody: "مخطّطات الطوابق الكاملة لمستويات التجزئة والمواقف في مجمّع الحمراء. تواصل مع فريق التأجير للاطلاع على تصاميم الطوابق المكتبية.",
    cta: { title: "احجز موقعك", subtitle: "تواصل مع فريق التأجير للاطلاع على المتاح، والمخطّطات، والأسعار.", label: "تقديم استفسار" },
  },
} as const;

export function LeasingOpportunities() {
  const { lang } = useI18n();
  const c = usePageContent<any>("leasing", LEASING_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="leasing"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />
      <StatsBar stats={[...c.stats]} editKey="leasing" />

      <div style={{ position: "relative", height:"clamp(220px,32vw,400px)", overflow: "hidden" }}>
        <SlotImage
              loading="lazy" slot="leasing.skyPanoramic" fallback="/assets/sky-lobby-panoramic.jpg"
              alt={lang === "ar" ? "إطلالة بانورامية على مدينة الكويت والخليج العربي من لوبي السماء" : "Kuwait City and Arabian Gulf panoramic view from Al Hamra Sky Lobby"}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 35%, rgba(29,29,27,0.5) 100%)" }} />
        <div style={{ position: "absolute", bottom: 40, right: lang === "ar" ? "auto" : 80, left: lang === "ar" ? 80 : "auto", textAlign: lang === "ar" ? "left" : "right" }}>
          <p style={{ fontFamily: FONT, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 200, letterSpacing: "0.04em", color: "#fff", lineHeight: 1.4, whiteSpace: "pre-line" }}>
            <Editable id="page_prose:leasing:quote">{c.quote}</Editable>
          </p>
        </div>
      </div>

      <Section>
        <Rv><Tag><Editable id="page_prose:leasing:configsTag">{c.configsTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:leasing:configsHeading">{c.configsHeading}</Editable></H2></Rv>
        <div className="grid-3col" style={{ gap:1, background:"rgba(29,29,27,0.09)", marginTop:48 }}>
          {c.configs.map(({ code, title, size, bullets }, i) => (
            <Rv key={code} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "44px 36px", height: "100%" }}>
                <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 14 }}><Editable id="page_prose:leasing:configLabel">{c.configLabel}</Editable> {code}</div>
                <div style={{ fontFamily: FONT, fontSize: "16px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}><Editable id={`page_prose:leasing:configs.${i}.title`}>{title}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "36px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1, marginBottom: 20 }}><Editable id={`page_prose:leasing:configs.${i}.size`}>{size}</Editable></div>
                {bullets.map((b, bi) => (
                  <div key={b} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#6B6B6B" }}>—</span>
                    <span style={{ fontFamily: FONT, fontSize: "12px", color: "#6B6B6B", lineHeight: 1.7 }}><Editable id={`page_prose:leasing:configs.${i}.bullets.${bi}`}>{b}</Editable></span>
                  </div>
                ))}
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag><Editable id="page_prose:leasing:amenitiesTag">{c.amenitiesTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:leasing:amenitiesHeading">{c.amenitiesHeading}</Editable></H2></Rv>
        <div className="grid-4col" style={{ gap:1, background:"rgba(29,29,27,0.09)", marginTop:40 }}>
          {c.amenities.map(({ label, desc }, i) => (
            <div key={label} style={{ background: "#fff", padding: "32px 28px" }}>
              <div style={{ fontFamily: FONT, fontSize: "13px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}><Editable id={`page_prose:leasing:amenities.${i}.label`}>{label}</Editable></div>
              <div style={{ fontFamily: FONT, fontSize: "11.5px", color: "#6B6B6B", lineHeight: 1.7 }}><Editable id={`page_prose:leasing:amenities.${i}.desc`}>{desc}</Editable></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Floor Plan Viewer */}
      <div>
        <div style={{ padding: "64px 80px 0" }}>
          <div style={{ fontFamily: FONT, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>
            <Editable id="page_prose:leasing:plansKicker">{c.plansKicker}</Editable>
          </div>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 200, letterSpacing: "-0.015em", color: "#1D1D1B", lineHeight: 1.2, marginBottom: 8 }}>
            <Editable id="page_prose:leasing:plansTitle">{c.plansTitle}</Editable>
          </h2>
          <p style={{ fontFamily: FONT, fontSize: "14px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1.65, maxWidth: 560 }}>
            <Editable id="page_prose:leasing:plansBody">{c.plansBody}</Editable>
          </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <FloorPlanViewer />
        </div>
      </div>

      <DarkBand title={c.cta.title} subtitle={c.cta.subtitle} ctaLabel={c.cta.label} ctaHref="/leasing/inquiry#inquiry-form" editKey="leasing" editFields={{ title: "cta.title", subtitle: "cta.subtitle", cta: "cta.label" }} />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   LEASING INQUIRY  /leasing/inquiry
══════════════════════════════════════════════════ */
const INQUIRY_CONTENT = {
  en: {
    tag: "Leasing · Inquiry",
    title: "Leasing & General Inquiries",
    subtitle: "Share your requirements and timeline. Our leasing team will respond with options aligned to your business needs.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Inquiry", href: "/leasing/inquiry#inquiry-form" }],
    sentTitle: "Inquiry Received",
    sentBody: "Our leasing team will respond within one business day.",
    fieldLabels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
    submitLabel: "Submit Inquiry",
    contactTag: "Contact Details",
    contactRows: [
      { label: "Phone",   value: "+965 2227 5000" },
      { label: "Email",   value: "leasing@alhamratower.com" },
      { label: "Address", value: "Al Hamra Tower, Jaber Al Mubarak Street, Sharq, Kuwait City, Kuwait" },
      { label: "Hours",   value: "Sunday – Thursday · 8:00 AM – 6:00 PM" },
    ],
  },
  ar: {
    tag: "التأجير · الاستفسار",
    title: "الاستفسارات العامة وطلبات التأجير",
    subtitle: "شاركنا متطلباتك والمهلة الزمنية المناسبة لك، وسيرد فريق التأجير بخيارات تتوافق مع احتياجات عملك.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "التأجير", href: "/leasing" }, { label: "الاستفسار", href: "/leasing/inquiry#inquiry-form" }],
    sentTitle: "تم استلام الاستفسار",
    sentBody: "سيتواصل فريق التأجير معك خلال يوم عمل واحد.",
    fieldLabels: { name: "الاسم", email: "البريد الإلكتروني", subject: "الموضوع", message: "الرسالة" },
    submitLabel: "إرسال الاستفسار",
    contactTag: "تفاصيل التواصل",
    contactRows: [
      { label: "الهاتف",          value: "+٩٦٥ ٢٢٢٧ ٥٠٠٠" },
      { label: "البريد الإلكتروني", value: "leasing@alhamratower.com" },
      { label: "العنوان",          value: "برج الحمراء، شارع جابر المبارك، منطقة شرق، مدينة الكويت، الكويت" },
      { label: "ساعات العمل",       value: "الأحد – الخميس · ٨:٠٠ صباحاً – ٦:٠٠ مساءً" },
    ],
  },
} as const;

export function LeasingInquiry() {
  const { lang } = useI18n();
  const c = usePageContent<any>("inquiry", INQUIRY_CONTENT[lang], lang);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 0",
    border: "none", borderBottom: "1px solid rgba(29,29,27,0.18)",
    fontFamily: FONT, fontSize: "14px", fontWeight: 300,
    color: "#1D1D1B", background: "transparent", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <PageLayout>
      <PageHero
        editKey="inquiry"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />

      <Section>
        <div id="inquiry-form" style={{ scrollMarginTop: "100px" }}>
        <div className="grid-2col">
          {/* Form */}
          <Rv>
            {sent ? (
              <div style={{ padding: "60px 0" }}>
                <div style={{ fontFamily: FONT, fontSize: "32px", fontWeight: 300, color: "#1D1D1B", marginBottom: 12 }}><Editable id="page_prose:inquiry:sentTitle">{c.sentTitle}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "14px", color: "#6B6B6B" }}><Editable id="page_prose:inquiry:sentBody">{c.sentBody}</Editable></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {(["name","email","subject"] as const).map(field => (
                  <div key={field}>
                    <label
                      htmlFor={`inquiry-${field}`}
                      style={{ display: "block", fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 8 }}
                    >
                      <Editable id={`page_prose:inquiry:fieldLabels.${field}`}>{c.fieldLabels[field]}</Editable>
                    </label>
                    <input
                      id={`inquiry-${field}`}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      autoComplete={field === "email" ? "email" : field === "name" ? "name" : "off"}
                      value={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      style={inputStyle}
                      aria-required="true"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="inquiry-message"
                    style={{ display: "block", fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 8 }}
                  >
                    <Editable id="page_prose:inquiry:fieldLabels.message">{c.fieldLabels.message}</Editable>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    required rows={5}
                    aria-required="true"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>
                <button type="submit" style={{
                  alignSelf: "flex-start",
                  background: "#1D1D1B", color: "#fff",
                  fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  padding: "15px 40px", border: "none", cursor: "pointer",
                  transition: "opacity 0.3s",
                }}>
                  <Editable id="page_prose:inquiry:submitLabel">{c.submitLabel}</Editable>
                </button>
              </form>
            )}
          </Rv>

          {/* Contact details */}
          <Rv delay={0.15}>
            <div>
              <Tag><Editable id="page_prose:inquiry:contactTag">{c.contactTag}</Editable></Tag>
              {c.contactRows.map(({ label, value }, i) => (
                <div key={label} style={{ padding: "18px 0", borderBottom: "1px solid rgba(29,29,27,0.07)" }}>
                  <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 6 }}><Editable id={`page_prose:inquiry:contactRows.${i}.label`}>{label}</Editable></div>
                  <div style={{ fontFamily: FONT, fontSize: "14px", fontWeight: 300, color: "#1D1D1B" }}><Editable id={`page_prose:inquiry:contactRows.${i}.value`}>{value}</Editable></div>
                </div>
              ))}
            </div>
          </Rv>
        </div>
        </div>{/* closes id="inquiry-form" */}
      </Section>
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   DOWNLOADS  /leasing/downloads
══════════════════════════════════════════════════ */
const DOWNLOADS_CONTENT = {
  en: {
    tag: "Leasing · Downloads",
    title: "Downloads",
    subtitle: "Download brochures, floor plans, and media materials for Al Hamra Tower.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Downloads", href: "/leasing/downloads" }],
    items: [
      { title: "Corporate Brochure", format: "PDF", size: "12 MB", desc: "Complete overview of Al Hamra Tower — architecture, services, and leasing information." },
      { title: "Floor Plans",        format: "PDF", size: "8 MB",  desc: "Detailed floor plan layouts for executive, full-floor, and corporate headquarters configurations." },
      { title: "Media Kit",          format: "ZIP", size: "45 MB", desc: "High-resolution images, logos, and press materials for media use." },
    ],
    downloadLabel: "Download",
    cta: { title: "Ready to Enquire?", label: "Submit Inquiry" },
  },
  ar: {
    tag: "التأجير · التحميلات",
    title: "التحميلات",
    subtitle: "تحميل الكتيبات والمخطّطات والمواد الإعلامية الخاصة ببرج الحمراء.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "التأجير", href: "/leasing" }, { label: "التحميلات", href: "/leasing/downloads" }],
    items: [
      { title: "كتيّب المؤسسة", format: "PDF", size: "١٢ ميغابايت", desc: "نظرة شاملة على برج الحمراء — العمارة، والخدمات، ومعلومات التأجير." },
      { title: "مخطّطات الطوابق", format: "PDF", size: "٨ ميغابايت",  desc: "مخطّطات تفصيلية للأجنحة التنفيذية، والطوابق الكاملة، ومقرّات الشركات الكبرى." },
      { title: "مجموعة المواد الإعلامية", format: "ZIP", size: "٤٥ ميغابايت", desc: "صور عالية الدقّة، وشعارات، ومواد صحفية للاستخدام الإعلامي." },
    ],
    downloadLabel: "تحميل",
    cta: { title: "هل أنت مستعدّ للاستفسار؟", label: "تقديم استفسار" },
  },
} as const;

export function Downloads() {
  const { lang } = useI18n();
  const c = usePageContent<any>("downloads", DOWNLOADS_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="downloads"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(29,29,27,0.09)" }}>
          {c.items.map(({ title, format, size, desc }, i) => (
            <Rv key={title} delay={i * 0.1}>
              <div style={{
                background: "#fff", padding: "36px 40px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40,
                transition: "background 0.2s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: FONT, fontSize: "15px", fontWeight: 500, color: "#1D1D1B" }}><Editable id={`page_prose:downloads:items.${i}.title`}>{title}</Editable></span>
                    <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", border: "1px solid rgba(29,29,27,0.12)", padding: "3px 8px" }}><Editable id={`page_prose:downloads:items.${i}.format`}>{format}</Editable> · <Editable id={`page_prose:downloads:items.${i}.size`}>{size}</Editable></span>
                  </div>
                  <div style={{ fontFamily: FONT, fontSize: "12.5px", color: "#6B6B6B" }}><Editable id={`page_prose:downloads:items.${i}.desc`}>{desc}</Editable></div>
                </div>
                <button type="button" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0,
                  background: "none", border: "1px solid rgba(29,29,27,0.2)", cursor: "pointer",
                  fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#1D1D1B", padding: "10px 22px",
                  transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="#1D1D1B"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1D1D1B"; }}
                >
                  <Editable id="page_prose:downloads:downloadLabel">{c.downloadLabel}</Editable>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v7M2 8l4 3 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </Rv>
          ))}
        </div>
      </Section>
      <DarkBand title={c.cta.title} ctaLabel={c.cta.label} ctaHref="/leasing/inquiry#inquiry-form" editKey="downloads" editFields={{ title: "cta.title", cta: "cta.label" }} />
    </PageLayout>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT  /leasing/contact
══════════════════════════════════════════════════ */
const CONTACT_CONTENT = {
  en: {
    tag: "Leasing · Contact",
    title: "Get in Touch",
    subtitle: "Share your requirements and timeline. Our leasing team will respond with options aligned to your business needs.",
    crumbs: [{ label: "Home", href: "/" }, { label: "Leasing", href: "/leasing" }, { label: "Contact", href: "/leasing/contact" }],
    rows: [
      { label: "Phone",   value: "+965 2227 0000" },
      { label: "Email",   value: "info@alhamratower.com" },
      { label: "Hours",   value: "Sun – Thu · 8:00 AM – 6:00 PM" },
      { label: "Address", value: "Al Hamra Tower, Jaber Al Mubarak Street, Sharq, Kuwait City, Kuwait" },
    ],
    socialTag: "Social Media",
    socialHeading: "Follow Al Hamra Tower",
    teamTag: "Leasing Team",
    teamHeading: "Dedicated Support",
    teamBody: "Our leasing team is available to discuss available configurations, floor plans, pricing, and customisation options. Contact us directly for a response within one business day.",
    ctaLabel: "Submit Inquiry",
  },
  ar: {
    tag: "التأجير · التواصل",
    title: "تواصل معنا",
    subtitle: "شاركنا متطلباتك والمهلة الزمنية المناسبة لك، وسيرد فريق التأجير بخيارات تتوافق مع احتياجات عملك.",
    crumbs: [{ label: "الرئيسية", href: "/" }, { label: "التأجير", href: "/leasing" }, { label: "التواصل", href: "/leasing/contact" }],
    rows: [
      { label: "الهاتف",          value: "+٩٦٥ ٢٢٢٧ ٠٠٠٠" },
      { label: "البريد الإلكتروني", value: "info@alhamratower.com" },
      { label: "ساعات العمل",       value: "الأحد – الخميس · ٨:٠٠ صباحاً – ٦:٠٠ مساءً" },
      { label: "العنوان",          value: "برج الحمراء، شارع جابر المبارك، منطقة شرق، مدينة الكويت، الكويت" },
    ],
    socialTag: "وسائل التواصل الاجتماعي",
    socialHeading: "تابع برج الحمراء",
    teamTag: "فريق التأجير",
    teamHeading: "دعمٌ مخصَّص",
    teamBody: "فريق التأجير لدينا جاهز لمناقشة التصاميم المتوفّرة، ومخطّطات الطوابق، والأسعار، وخيارات التخصيص. تواصل معنا مباشرةً لتلقّي ردٍّ خلال يوم عمل واحد.",
    ctaLabel: "تقديم استفسار",
  },
} as const;

export function Contact() {
  const { lang } = useI18n();
  const c = usePageContent<any>("contact", CONTACT_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="contact"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[...c.crumbs]}
      />
      <Section>
        <div className="grid-4col" style={{ gap:1, background:"rgba(29,29,27,0.09)" }}>
          {c.rows.map(({ label, value }, i) => (
            <div key={label} style={{ background: "#fff", padding: "44px 36px" }}>
              <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 14 }}><Editable id={`page_prose:contact:rows.${i}.label`}>{label}</Editable></div>
              <div style={{ fontFamily: FONT, fontSize: "15px", fontWeight: 300, color: "#1D1D1B" }}><Editable id={`page_prose:contact:rows.${i}.value`}>{value}</Editable></div>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="#FAFAFA">
        <div className="grid-2col">
          <Rv>
            <Tag><Editable id="page_prose:contact:socialTag">{c.socialTag}</Editable></Tag>
            <H2><Editable id="page_prose:contact:socialHeading">{c.socialHeading}</Editable></H2>
            <SocialIcons variant="contact" />
          </Rv>
          <Rv delay={0.15}>
            <Tag><Editable id="page_prose:contact:teamTag">{c.teamTag}</Editable></Tag>
            <H2><Editable id="page_prose:contact:teamHeading">{c.teamHeading}</Editable></H2>
            <Body><Editable id="page_prose:contact:teamBody">{c.teamBody}</Editable></Body>
            <a href="/leasing/inquiry#inquiry-form" style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginTop: 36,
              background: "#1D1D1B", color: "#fff",
              fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "15px 34px", textDecoration: "none", transition: "opacity 0.3s",
            }}>
              <Editable id="page_prose:contact:ctaLabel">{c.ctaLabel}</Editable>
            </a>
          </Rv>
        </div>
      </Section>
    </PageLayout>
  );
}
