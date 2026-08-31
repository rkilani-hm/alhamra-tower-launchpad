import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { StatsBar, FeatureGrid, Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";
import { useI18n }     from "@/lib/i18n";
import { usePageContent } from "@/lib/useCmsContent";
import { Editable, EditableRow, SlotImage } from "@/lib/EditMode";

/* Minimal line icons for the Flexibility & Fit-Out feature cards, index-mapped:
   open floor plate · ceiling clearance · fit-out plan · modular partitions.
   Colour comes from `currentColor` so the card hover can recolour them. */
const FLEX_ICONS = [
  (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="20" height="18" rx="1"/><rect x="5.5" y="6.5" width="2.6" height="2.6"/><rect x="17.9" y="6.5" width="2.6" height="2.6"/><rect x="5.5" y="16.9" width="2.6" height="2.6"/><rect x="17.9" y="16.9" width="2.6" height="2.6"/></svg>),
  (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="22" y2="4"/><line x1="4" y1="22" x2="22" y2="22"/><line x1="13" y1="7.5" x2="13" y2="18.5"/><path d="M10 10.5 L13 7.5 L16 10.5"/><path d="M10 15.5 L13 18.5 L16 15.5"/></svg>),
  (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="20" rx="1"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></svg>),
  (<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7.5" height="7.5" rx="0.6"/><rect x="14.5" y="4" width="7.5" height="7.5" rx="0.6"/><rect x="4" y="14.5" width="7.5" height="7.5" rx="0.6"/><rect x="14.5" y="14.5" width="7.5" height="7.5" rx="0.6"/></svg>),
];

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ════════════════════════════════════════════════════════════════════
   Bilingual content dictionaries — split per-page for clarity.
   Arabic copy sourced from V01 translation sheet (Business + Leasing).
══════════════════════════════════════════════════════════════════════ */
const WORKPLACE_CONTENT = {
  en: {
    tag: "Business · Workplace",
    title: "Workplace Experience",
    subtitle: "Al Hamra Business Tower provides an environment defined by discretion, efficiency, and professional clarity.",
    crumbHome: "Home", crumbBusiness: "Business",
    stats: [
      { number: "50+",  label: "Leading Companies"   },
      { number: "95%",  label: "Occupancy Rate"      },
      { number: "24/7", label: "Building Operations" },
    ],
    lobbyAlt: "Al Hamra Tower Grand Lobby — lamella arches",
    lobbyKicker: "Grand Lobby · 24m Column-Free · Lamella Bracing",
    lobbyHeading1: "An arrival experience",
    lobbyHeading2: "befitting Kuwait's tallest building",
    workTag: "Premium Workspace Features",
    workH2: "Space That Adapts to the Way You Work",
    workBody: "Efficient floor plates allow flexible configurations suitable for single-tenant headquarters or multi-tenant layouts. Everything you need — close, connected, effortless. Retail, dining, and service amenities within the Al Hamra complex reinforce the tower as a complete professional environment.",
    features: [
      { number: "01", title: "Office Spaces",      body: "Efficient floor plates allow flexible configurations. Typical floor: approx. 2,300 sqm build-up, approx. 1,750 sqm leasable area. Generous glazing maximises daylight and city views." },
      { number: "02", title: "Connectivity",       body: "The tower forms part of the larger Al Hamra destination, providing direct proximity to retail, dining, and lifestyle amenities within Kuwait City's commercial core." },
      { number: "03", title: "Vertical Transport", body: "The tower's circulation strategy ensures smooth arrival, efficient transfers, and clear separation between visitor and tenant movement flows." },
      { number: "04", title: "Support Services",   body: "Operational support designed to stay out of the way — present when needed, invisible when not. Building management around the clock, every day of the year." },
    ],
    corridorAlt: "Al Hamra elevator corridor — travertine and lamella",
    corridorCap: "Elevator Hall · Travertine & Lamella Framing",
    loungeAlt: "Sky Lobby lounge — panoramic Kuwait City view",
    loungeCap: "360° Views · Kuwait City & Arabian Gulf",
    darkTitle: "Explore Office Spaces & Floor Plans",
    darkCta: "View Configurations",
  },
  ar: {
    tag: "الأعمال · بيئة العمل",
    title: "تجربةُ بيئة العمل",
    subtitle: "يُقدّم برج الحمراء التجاري بيئةً تتسم بالخصوصية، والكفاءة، والوضوح المهنيّ.",
    crumbHome: "الرئيسية", crumbBusiness: "الأعمال",
    stats: [
      { number: "+50",  label: "شركاتٌ رائدة"         },
      { number: "95٪",  label: "نسبة الإشغال"         },
      { number: "24/7", label: "تشغيلٌ متواصل"        },
    ],
    lobbyAlt: "ردهةُ برج الحمراء الكبرى — أقواس اللاميلا",
    lobbyKicker: "الردهةُ الكبرى · 24م بلا أعمدة · تدعيمٌ باللاميلا",
    lobbyHeading1: "تجربةُ وصولٍ",
    lobbyHeading2: "تليقُ بأعلى أبراج الكويت",
    workTag: "مزايا بيئة عملٍ مميّزة",
    workH2: "فضاءٌ يتكيّف مع أسلوب عملِك",
    workBody: "بلاطاتُ الطوابق الكفء تتيح تكويناتٍ مرنةً تناسب المقارّات الرئيسية أحاديةَ المستأجر أو متعدّدةَ المستأجرين. كلُّ ما تحتاجه — قريبٌ، مترابط، يسير. مرافقُ التجزئة والمطاعم والخدمات داخل مجمّع الحمراء تُرسّخ البرج بيئةً مهنيةً مكتملة.",
    features: [
      { number: "01", title: "المساحاتُ المكتبية",      body: "بلاطاتُ الطوابق الكفء تتيح تكويناتٍ مرنة. الطابقُ النموذجيّ: نحو 2,300م² مبنيّة، ونحو 1,750م² صافيةً للإيجار. وزجاجٌ سخيٌّ يُعظّم الإنارة الطبيعية ومشاهد المدينة." },
      { number: "02", title: "الترابط",                 body: "يُشكّل البرج جزءاً من وجهة الحمراء الأكبر، فيُتيح قُرباً مباشراً من مرافق التجزئة والمطاعم وأنماط الحياة في قلب الكويت التجاريّ." },
      { number: "03", title: "النقلُ الرأسيّ",          body: "استراتيجيةُ الحركة في البرج تضمن وصولاً سلساً، وتنقّلاتٍ كفءً، وفصلاً واضحاً بين حركة الزوّار والمستأجرين." },
      { number: "04", title: "خدماتُ الدعم",            body: "دعمٌ تشغيليٌّ مُصمَّمٌ ليبقى بعيداً عن الأنظار — حاضرٌ عند الحاجة، خفيٌّ في غيرها. إدارةُ المبنى على مدار الساعة، كلَّ يومٍ من العام." },
    ],
    corridorAlt: "ممرُّ مصاعد الحمراء — حجرُ التراڤرتين واللاميلا",
    corridorCap: "قاعةُ المصاعد · تراڤرتين وتأطيرُ اللاميلا",
    loungeAlt: "صالةُ ردهة السماء — مشاهد بانورامية لمدينة الكويت",
    loungeCap: "مشاهدُ 360° · مدينةُ الكويت والخليج العربي",
    darkTitle: "استكشف المساحات المكتبية ومخططات الطوابق",
    darkCta: "اعرض التكوينات",
  },
} as const;

export function WorkplaceExperience() {
  const { lang } = useI18n();
  const c = usePageContent<any>("workplace", WORKPLACE_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="workplace"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbBusiness, href: "/business" }]}
      />

      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <StatsBar stats={[...c.stats]} editKey="workplace" />
      </div>

      <div style={{ position: "relative", height: "clamp(340px,48vw,640px)", overflow: "hidden" }}>
        <SlotImage slot="workplace.lobby" fallback="/assets/lobby-grand-lamella.jpg" loading="lazy" alt={c.lobbyAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(29,29,27,0.05) 0%, rgba(29,29,27,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: 48, left: "clamp(20px,5vw,80px)", right: "clamp(20px,5vw,80px)" }}>
          <Rv>
            <p style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 12 }}><Editable id="page_prose:workplace:lobbyKicker">{c.lobbyKicker}</Editable></p>
            <h3 style={{ fontFamily: FONT, fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 200, color: "#fff", lineHeight: 1.25, maxWidth: 560 }}>
              <Editable id="page_prose:workplace:lobbyHeading1">{c.lobbyHeading1}</Editable><br /><strong style={{ fontWeight: 500 }}><Editable id="page_prose:workplace:lobbyHeading2">{c.lobbyHeading2}</Editable></strong>
            </h3>
          </Rv>
        </div>
      </div>

      <Section>
        <div className="grid-2col media-right">
          <div>
            <Rv><Tag><Editable id="page_prose:workplace:workTag">{c.workTag}</Editable></Tag></Rv>
            <Rv delay={0.1}><H2><Editable id="page_prose:workplace:workH2">{c.workH2}</Editable></H2></Rv>
            <Rv delay={0.2}><Body><Editable id="page_prose:workplace:workBody">{c.workBody}</Editable></Body></Rv>
            <Rv delay={0.3}>
              <div style={{ marginTop: 40 }}>
                <FeatureGrid features={[...c.features]} editKey="workplace" />
              </div>
            </Rv>
          </div>

          <Rv delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <SlotImage loading="lazy" slot="workplace.corridor" fallback="/assets/lobby-elevator-corridor.jpg" alt={c.corridorAlt}
                  style={{ width: "100%", height: 320, objectFit: "cover", objectPosition: "center center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.4))", padding: "16px 20px 14px" }}>
                  <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                    <Editable id="page_prose:workplace:corridorCap">{c.corridorCap}</Editable>
                  </span>
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <SlotImage loading="lazy" slot="workplace.lounge" fallback="/assets/lounge-at-window.jpg" alt={c.loungeAlt}
                  style={{ width: "100%", height: 360, objectFit: "cover", objectPosition: "center center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.4))", padding: "12px 20px 12px" }}>
                  <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                    <Editable id="page_prose:workplace:loungeCap">{c.loungeCap}</Editable>
                  </span>
                </div>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      <DarkBand title={c.darkTitle} ctaLabel={c.darkCta} ctaHref="/business/office-spaces" editKey="workplace" />
    </PageLayout>
  );
}

/* ════════════════════════════════════════════════════════════════════
   OFFICE SPACES
══════════════════════════════════════════════════════════════════════ */
const OFFICE_CONTENT = {
  en: {
    tag: "Business · Office Spaces",
    title: "Office Spaces & Floor Plans",
    subtitle: "Flexible configurations from executive suites to full-floor headquarters. Every layout is designed around natural light, panoramic views, and operational efficiency.",
    crumbHome: "Home", crumbBusiness: "Business", crumbThis: "Office Spaces",
    skyAlt: "Al Hamra Sky Lobby — travertine corridor with chandelier and Gulf views",
    heroStats: [
      { n: "3.2m", u: "",   l: "Ceiling Height"     },
      { n: "360°", u: "",   l: "Views"              },
      { n: "1,750",u: "m²", l: "Typical Floor Plate"},
    ],
    configTag: "Space Configurations",
    configH2: "Flexible Configurations for Every Scale",
    configLabel: "Configuration",
    configs: [
      { code: "01", title: "Executive Suite",  size: "250–500 m²",     bullets: ["Corner positions with panoramic Gulf views","Private reception and executive amenities","Shell-and-core or fully finished options"] },
      { code: "02", title: "Full Floor HQ",    size: "1,200–1,800 m²", bullets: ["Entire floor plates with dedicated elevator lobbies","360° views — full branding integration","Private elevator lobby and dedicated reception"] },
      { code: "03", title: "Corporate Campus", size: "3,000+ m²",      bullets: ["Contiguous multi-floor configurations","Internal staircases and dedicated reception","Building signage rights available"] },
    ],
    arrivalAlt: "Al Hamra Tower — elevator corridor lamella",
    arrivalKicker: "Arrival Experience",
    arrivalH1: "A 24-metre column-free lobby.",
    arrivalH2: "Kuwait's most prestigious address.",
    arrivalBody: "Every tenant's day begins in a grand, column-free lobby with a 24-metre vaulted lamella ceiling — an architectural statement that sets the tone for the floors above.",
    arrivalCorner: "Grand Lobby · Al Hamra Tower",
    gallery: [
      { src: "/assets/opt/office-gallery0.jpg",     cap: "Meeting Rooms · Quiet, Considered",     pos: "center" },
      { src: "/assets/opt/office-gallery1.jpg",     cap: "Elevator Hall · Travertine & Lamella", pos: "center" },
      { src: "/assets/opt/office-gallery2.jpg",     cap: "Office Corridor · Breakout Booths",     pos: "center" },
      { src: "/assets/opt/office-boardroom.jpg",    cap: "Boardroom · Gulf-View Meetings",        pos: "center" },
    ],
    floorReceptionAlt: "Al Hamra floor reception — travertine and steel fins",
    floorReceptionTitle: "Floor Reception",
    floorReceptionCap: "Limestone · Steel Fin Screen",
    tenantLobbyAlt: "Al Hamra tenant lobby — warm timber and leather",
    tenantLobbyTitle: "Tenant Lobby",
    tenantLobbyCap: "Timber Panelling · Al Hamra Branding",
    flexTag: "Flexibility & Fit-Out",
    flexH2: "Workspaces Designed to Adapt",
    flexFeatures: [
      { number: "01", title: "Column-Free Layouts",   body: "Open floor plates with minimal structural columns allow maximum flexibility in space planning and furniture layouts." },
      { number: "02", title: "3.2m Ceiling Heights",  body: "Generous floor-to-ceiling heights create a sense of openness and allow for raised flooring and suspended ceiling systems." },
      { number: "03", title: "Fit-Out Support",       body: "Dedicated project management for tenant fit-outs. Shell-and-core or fully finished options available." },
      { number: "04", title: "Modular Partitioning",  body: "Pre-engineered partition grid allows rapid reconfiguration as teams grow or organisational needs evolve." },
    ],
    flexFootnote: "All configurations subject to availability. Contact the leasing team for detailed floor plans.",
    entranceAlt: "Al Hamra Tower entrance at night",
    entranceTitle: "Night Presence",
    entranceCap: "North Entrance · After Hours",
    boardroomAlt: "Al Hamra boardroom — 14-seat table, Kuwait City view, awards",
    boardroomTitle: "Executive Boardroom",
    boardroomCap: "14-Seat Table · Award Plaques · Gulf Views",
    floorPlansKicker: "Floor Plans · Al Hamra Complex",
    floorPlansH2: "Retail & Ground Level Plans",
    floorPlansBody: "Detailed floor plans for the Al Hamra complex — Ground, Mezzanine, and basement levels featuring retail, dining, parking, and service infrastructure.",
    darkTitle: "Ready to Secure Your Space?",
    darkSubtitle: "Contact our leasing team for availability and pricing aligned to your requirements.",
    darkCta: "Leasing Inquiry",
  },
  ar: {
    tag: "الأعمال · المساحاتُ المكتبية",
    title: "المساحاتُ المكتبية ومخططاتُ الطوابق",
    subtitle: "تكويناتٌ مرنةٌ من الأجنحة التنفيذية إلى مقارّاتِ الطوابق الكاملة. صُمِّمَ كلُّ تخطيطٍ حول الضوء الطبيعيّ، والمشاهد البانورامية، والكفاءة التشغيلية.",
    crumbHome: "الرئيسية", crumbBusiness: "الأعمال", crumbThis: "المساحاتُ المكتبية",
    skyAlt: "ردهةُ السماء في الحمراء — ممرٌّ من التراڤرتين بثُريّا ومشاهد الخليج",
    heroStats: [
      { n: "3.2م", u: "",   l: "ارتفاعُ السقف"        },
      { n: "360°", u: "",   l: "المشاهد"              },
      { n: "1,750",u: "م²", l: "بلاطةُ الطابق النموذجية"},
    ],
    configTag: "تكويناتُ المساحات",
    configH2: "تكويناتٌ مرنةٌ لكلِّ مقياس",
    configLabel: "تكوين",
    configs: [
      { code: "01", title: "جناحٌ تنفيذيّ",     size: "250–500 م²",     bullets: ["مواقعُ زواوية بمشاهد بانورامية للخليج","استقبالٌ خاصٌّ ومرافقَ تنفيذية","خيارُ الهيكل والقلب أو التشطيب الكامل"] },
      { code: "02", title: "طابقٌ كاملٌ كمقرٍّ", size: "1,200–1,800 م²", bullets: ["بلاطاتُ طوابقَ كاملة مع ردهات مصاعد مخصّصة","مشاهدُ 360° — دمجٌ كاملٌ للعلامة التجارية","ردهةُ مصعدٍ خاصة واستقبالٌ مخصّص"] },
      { code: "03", title: "مَجمعٌ مؤسّسيّ",     size: "+3,000 م²",      bullets: ["تكويناتٌ متعدّدةُ الطوابق متصلة","سلالمُ داخلية واستقبالٌ مخصّص","حقوقُ لافتاتٍ على المبنى متاحة"] },
    ],
    arrivalAlt: "برج الحمراء — ممرُّ مصاعد بهيكل اللاميلا",
    arrivalKicker: "تجربةُ الوصول",
    arrivalH1: "ردهةٌ بلا أعمدة بارتفاع 24 متراً.",
    arrivalH2: "أرقى عنوانٍ في الكويت.",
    arrivalBody: "يبدأ يومُ كلِّ مستأجرٍ في ردهةٍ كبرى بلا أعمدةٍ بسقفٍ مقبّبٍ من اللاميلا بارتفاع 24 متراً — بيانٌ معماريٌّ يحدّد نَفَس الطوابق فوقَه.",
    arrivalCorner: "الردهةُ الكبرى · برج الحمراء",
    gallery: [
      { src: "/assets/opt/office-gallery0.jpg",     cap: "غرفُ الاجتماعات · هدوءٌ وتركيز",               pos: "center" },
      { src: "/assets/opt/office-gallery1.jpg",     cap: "قاعةُ المصاعد · التراڤرتين واللاميلا",           pos: "center" },
      { src: "/assets/opt/office-gallery2.jpg",     cap: "ممرُّ المكاتب · مقصوراتُ الاستراحة",            pos: "center" },
      { src: "/assets/opt/office-boardroom.jpg",    cap: "قاعةُ اجتماعات · بإطلالةٍ على الخليج",           pos: "center" },
    ],
    floorReceptionAlt: "استقبالُ الطابق في الحمراء — تراڤرتين وزعانفُ فولاذية",
    floorReceptionTitle: "استقبالُ الطابق",
    floorReceptionCap: "حجرٌ جيريّ · شاشةُ زعانفَ فولاذية",
    tenantLobbyAlt: "ردهةُ المستأجر في الحمراء — خشبٌ دافئٌ وجلد",
    tenantLobbyTitle: "ردهةُ المستأجر",
    tenantLobbyCap: "تكسيةٌ خشبية · هويةُ الحمراء",
    flexTag: "المرونةُ والتشطيب",
    flexH2: "بيئاتُ عملٍ مُصمَّمةٌ للتكيّف",
    flexFeatures: [
      { number: "01", title: "تخطيطاتٌ بلا أعمدة",     body: "بلاطاتُ طوابق مفتوحة بأعمدةٍ إنشائيةٍ في حدّها الأدنى تتيح أقصى مرونةٍ في تخطيط الفضاء وترتيب الأثاث." },
      { number: "02", title: "ارتفاعُ سقفٍ 3.2م",      body: "ارتفاعاتُ السقف السخيّة تخلق إحساساً بالاتساع وتتيح أرضياتٍ مرفوعةً وأنظمةَ أسقفٍ معلّقة." },
      { number: "03", title: "دعمُ التشطيب",            body: "إدارةُ مشاريع متفرّغة لتشطيبات المستأجرين. خيارُ الهيكل والقلب أو التشطيب الكامل متاح." },
      { number: "04", title: "قواطعُ نمطية",            body: "شبكةُ قواطعَ مُسبَقةُ الهندسة تتيح إعادةَ تكوينٍ سريعةً كلّما نمت الفِرَق أو تطوّرت الاحتياجاتُ التنظيمية." },
    ],
    flexFootnote: "كلُّ التكوينات خاضعةٌ للتوافر. تواصل مع فريق التأجير للحصول على مخططات تفصيلية.",
    entranceAlt: "مدخلُ برج الحمراء ليلاً",
    entranceTitle: "حضورٌ ليليّ",
    entranceCap: "المدخلُ الشماليّ · بعد ساعات العمل",
    boardroomAlt: "قاعةُ اجتماعات الحمراء — طاولةُ 14 مقعداً، مشاهدُ الكويت، جوائز",
    boardroomTitle: "قاعةُ الاجتماعات التنفيذية",
    boardroomCap: "طاولةُ 14 مقعداً · لوحاتُ جوائز · مشاهدُ الخليج",
    floorPlansKicker: "مخططاتُ الطوابق · مَجمَّع الحمراء",
    floorPlansH2: "مخططاتُ التجزئة والطوابق الأرضية",
    floorPlansBody: "مخططاتُ طوابق تفصيلية لمجمَّع الحمراء — الطوابق الأرضية والميزانين والقبوية، شاملةً مرافق التجزئة والمطاعم والمواقف والبنية الخدميّة.",
    darkTitle: "هل أنت مستعدٌّ لحجز مساحتِك؟",
    darkSubtitle: "تواصل مع فريق التأجير للحصول على التوافر والتسعير وفق متطلباتك.",
    darkCta: "استفسارُ التأجير",
  },
} as const;

export function OfficeSpaces() {
  const { lang } = useI18n();
  const c = usePageContent<any>("officeSpaces", OFFICE_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="officeSpaces"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbBusiness, href: "/business" }, { label: c.crumbThis, href: "/business/office-spaces" }]}
      />

      <div style={{ position: "relative", height: "clamp(280px,40vw,520px)", overflow: "hidden" }}>
        <SlotImage loading="lazy" slot="officeSpaces.sky" fallback="/assets/sky-lobby-corridor.jpg" alt={c.skyAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, transparent 35%, rgba(29,29,27,0.68) 100%)" }} />
        <div className="office-hero-stats">
          {c.heroStats.map(({ n, u, l }, i) => (
            <div key={l}>
              <div style={{ fontFamily: FONT, fontSize: "clamp(28px,4vw,40px)", fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                <Editable id={`page_prose:officeSpaces:heroStats.${i}.n`}>{n}</Editable><span style={{ fontFamily: FONT, fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 200, color: "rgba(255,255,255,0.55)" }}>{u}</span>
              </div>
              <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 6 }}><Editable id={`page_prose:officeSpaces:heroStats.${i}.l`}>{l}</Editable></div>
            </div>
          ))}
        </div>
      </div>

      <Section>
        <Rv><Tag><Editable id="page_prose:officeSpaces:configTag">{c.configTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:officeSpaces:configH2">{c.configH2}</Editable></H2></Rv>
        <div className="grid-3col feature-grid" style={{ marginTop: 48 }}>
          {c.configs.map(({ code, title, size, bullets }, i) => (
            <Rv key={i} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "48px 40px", height: "100%" }}>
                <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 14 }}>
                  <Editable id="page_prose:officeSpaces:configLabel">{c.configLabel}</Editable>{" "}
                  <Editable id={`page_prose:officeSpaces:configs.${i}.code`}>{code}</Editable>
                </div>
                <div style={{ fontFamily: FONT, fontSize: "16px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8 }}><Editable id={`page_prose:officeSpaces:configs.${i}.title`}>{title}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "36px", fontWeight: 300, color: "#6B6B6B", lineHeight: 1, marginBottom: 20 }}><Editable id={`page_prose:officeSpaces:configs.${i}.size`}>{size}</Editable></div>
                {bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#6B6B6B" }}>—</span>
                    <span style={{ fontFamily: FONT, fontSize: "12px", color: "#6B6B6B", lineHeight: 1.7 }}><Editable id={`page_prose:officeSpaces:configs.${i}.bullets.${j}`}>{b}</Editable></span>
                  </div>
                ))}
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      <div style={{ position: "relative", height: "clamp(330px,46.2vw,616px)", overflow: "hidden" }}>
        <SlotImage loading="lazy" slot="officeSpaces.arrival" fallback="/assets/office-arrival-lobby.jpg" alt={c.arrivalAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, rgba(29,29,27,0.75) 0%, rgba(29,29,27,0.2) 60%, transparent 100%)" }} />
        <div className="ah-section" style={{ position: "absolute", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "center", background: "transparent" }}>
          <Rv>
            <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}><Editable id="page_prose:officeSpaces:arrivalKicker">{c.arrivalKicker}</Editable></div>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(22px,3vw,44px)", fontWeight: 200, color: "#fff", lineHeight: 1.12, maxWidth: 480, marginBottom: 20 }}>
              <Editable id="page_prose:officeSpaces:arrivalH1">{c.arrivalH1}</Editable><br /><strong style={{ fontWeight: 500 }}><Editable id="page_prose:officeSpaces:arrivalH2">{c.arrivalH2}</Editable></strong>
            </h2>
            <p style={{ fontFamily: FONT, fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 400 }}>
              <Editable id="page_prose:officeSpaces:arrivalBody">{c.arrivalBody}</Editable>
            </p>
          </Rv>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 24, fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          <Editable id="page_prose:officeSpaces:arrivalCorner">{c.arrivalCorner}</Editable>
        </div>
      </div>

      <div className="office-gallery-strip">
        {c.gallery.map(({ src, cap, pos }, i) => (
          <Rv key={cap} delay={i * 0.08}>
            <div style={{ position: "relative", overflow: "hidden", height: "clamp(200px,24vw,320px)" }}>
              <SlotImage slot={`officeSpaces.gallery${i}`} fallback={src} alt={cap} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transition: "transform 0.6s ease", display: "block" }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(29,29,27,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 14, fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}><Editable id={`page_prose:officeSpaces:gallery.${i}.cap`}>{cap}</Editable></div>
            </div>
          </Rv>
        ))}
      </div>

      <Section bg="#FAFAFA">
        <div className="grid-2col">
          <Rv>
            {/* One merged media cell (image OR video) filling the column. */}
            <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: 440 }}>
              <SlotImage loading="lazy" slot="officeSpaces.flexMedia" fallback="/assets/floor-reception.jpg" alt={c.floorReceptionAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", minHeight: 440 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.55))", padding: "18px 22px 16px" }}>
                <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}><Editable id="page_prose:officeSpaces:floorReceptionTitle">{c.floorReceptionTitle}</Editable></div>
                <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  <Editable id="page_prose:officeSpaces:floorReceptionCap">{c.floorReceptionCap}</Editable>
                </span>
              </div>
            </div>
          </Rv>
          <div className="flex-fitout">
            <Rv><Tag><Editable id="page_prose:officeSpaces:flexTag">{c.flexTag}</Editable></Tag></Rv>
            <Rv delay={0.1}><H2><Editable id="page_prose:officeSpaces:flexH2">{c.flexH2}</Editable></H2></Rv>

            <div className="flex-fitout-grid">
              {c.flexFeatures.map((f: { number: string; title: string; body: string }, i: number) => (
                <Rv key={f.number} delay={0.16 + i * 0.08} className="ff-card">
                  <span className="ff-icon" aria-hidden="true">{FLEX_ICONS[i % FLEX_ICONS.length]}</span>
                  <span className="ff-num" aria-hidden="true">{f.number}</span>
                  <h3 className="ff-title"><Editable id={`page_prose:officeSpaces:flexFeatures.${i}.title`}>{f.title}</Editable></h3>
                  <p className="ff-body"><Editable id={`page_prose:officeSpaces:flexFeatures.${i}.body`}>{f.body}</Editable></p>
                </Rv>
              ))}
            </div>

            <Rv delay={0.44}>
              <p className="ff-foot">
                <span className="ff-foot-dot" aria-hidden="true" />
                <Editable id="page_prose:officeSpaces:flexFootnote">{c.flexFootnote}</Editable>
              </p>
            </Rv>

            <style>{`
              .flex-fitout-grid{
                display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
                gap:1px;background:rgba(29,29,27,0.09);
                border:1px solid rgba(29,29,27,0.09);margin-top:28px;
              }
              .ff-card{
                position:relative;background:#fff;overflow:hidden;
                padding:clamp(20px,2vw,30px) clamp(18px,1.8vw,26px);
                transition:background .35s ease;
              }
              .ff-card::before{
                content:"";position:absolute;top:0;left:0;height:2px;width:100%;
                background:#B9B9B7;transform:scaleX(0);transform-origin:left;
                transition:transform .5s cubic-bezier(.16,1,.3,1);
              }
              .ff-card:hover{background:#FAFAFA;}
              .ff-card:hover::before{transform:scaleX(1);}
              .ff-icon{display:block;color:#B9B9B7;margin-bottom:16px;
                transition:color .3s ease,transform .4s cubic-bezier(.16,1,.3,1);}
              .ff-card:hover .ff-icon{color:#CD1719;transform:translateY(-2px);}
              .ff-num{position:absolute;top:12px;right:16px;font-family:var(--font-brand);
                font-size:34px;font-weight:200;line-height:1;letter-spacing:-.02em;
                color:rgba(184,184,182,.30);pointer-events:none;}
              .ff-title{font-family:var(--font-brand);font-size:14px;font-weight:500;
                color:#1D1D1B;letter-spacing:.02em;line-height:1.35;margin:0 0 9px;
                padding-right:34px;}
              .ff-body{font-family:var(--font-brand);font-size:12.5px;color:#6B6B6B;
                line-height:1.8;margin:0;}
              .ff-foot{font-family:var(--font-brand);font-size:11.5px;color:#6B6B6B;
                margin-top:28px;font-style:italic;display:flex;align-items:center;gap:9px;}
              .ff-foot-dot{width:5px;height:5px;border-radius:50%;background:#B9B9B7;flex-shrink:0;}
              @media (max-width:560px){.flex-fitout-grid{grid-template-columns:1fr;}}
            `}</style>
          </div>
        </div>
      </Section>

      <div className="office-night-split">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <SlotImage loading="lazy" slot="officeSpaces.entrance" fallback="/assets/entrance-night.jpg" alt={c.entranceAlt}
            style={{ width: "100%", height: "clamp(260px,35vw,460px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.65))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}><Editable id="page_prose:officeSpaces:entranceTitle">{c.entranceTitle}</Editable></div>
            <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              <Editable id="page_prose:officeSpaces:entranceCap">{c.entranceCap}</Editable>
            </span>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <SlotImage loading="lazy" slot="officeSpaces.boardroom" fallback="/assets/boardroom-enhanced.jpg" alt={c.boardroomAlt}
            style={{ width: "100%", height: "clamp(260px,35vw,460px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.65))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1.1vw,14px)", fontWeight: 500, color: "#fff", marginBottom: 4 }}><Editable id="page_prose:officeSpaces:boardroomTitle">{c.boardroomTitle}</Editable></div>
            <span style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              <Editable id="page_prose:officeSpaces:boardroomCap">{c.boardroomCap}</Editable>
            </span>
          </div>
        </div>
      </div>

      {/* Typical office floor plan — white keyed out so it blends on the grey plate */}
      <div style={{ background: "#EEEDEA", padding: "clamp(56px,8vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: FONT, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#CD1719", marginBottom: 14, textAlign: "center" }}>
            {lang === "ar" ? "طابق مكتبي نموذجي" : "Typical Office Floor"}
          </div>
          <img
            src="/assets/office-typical-floor-plan.webp"
            alt={lang === "ar" ? "مخطط طابق مكتبي نموذجي في برج الحمراء" : "Al Hamra Tower typical office floor plan"}
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <DarkBand title={c.darkTitle} subtitle={c.darkSubtitle} ctaLabel={c.darkCta} ctaHref="/leasing/inquiry#inquiry-form" />

      <style>{`
        .office-hero-stats {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; gap: clamp(24px,5vw,60px);
          padding: clamp(20px,4vw,40px) clamp(20px,5vw,80px);
        }
        .office-gallery-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(29,29,27,0.09);
        }
        .office-night-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(29,29,27,0.09);
        }
        @media (max-width: 768px) {
          .office-gallery-strip { grid-template-columns: repeat(2, 1fr); }
          .office-night-split   { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .office-gallery-strip { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .office-hero-stats { flex-wrap: wrap; gap: 24px 40px; }
        }
      `}</style>
    </PageLayout>
  );
}

/* ════════════════════════════════════════════════════════════════════
   VERTICAL TRANSPORTATION
══════════════════════════════════════════════════════════════════════ */
const VERTICAL_CONTENT = {
  en: {
    tag: "Business · Vertical Movement",
    title: "Vertical Transportation",
    subtitle: "The tower's vertical transportation strategy ensures efficient flow for tenants and visitors with multiple elevators and strategically placed transfer floors.",
    crumbHome: "Home", crumbBusiness: "Business", crumbThis: "Vertical Transportation",
    stats: [
      { number: "43", label: "Total Elevators" },
      { number: "8",  label: "Express Units"   },
      { number: "6",  unit: "m/s", label: "Max Speed" },
    ],
    corridorAlt: "Al Hamra Tower — elevator corridor with lamella structure",
    corridorKicker: "Lobby Level · Elevator Hall · Lamella Structure",
    corridorH1: "43 elevators.",
    corridorH2: "One seamless ascent.",
    ascentTag: "Sky Lobby Transfer Points",
    ascentH2: "The Vertical Journey",
    ascent: [
      { floor: "G",  label: "Ground — Arrival",   body: "Main lobby entry. Express elevators depart for Sky Lobby 30 and Sky Lobby 55. Local low-rise service begins from Level 6." },
      { floor: "30", label: "Sky Lobby 1",        body: "Mid-rise transfer hub. Fully equipped business centre, executive lounge with 7m ceilings, and panoramic Gulf views from 120 metres." },
      { floor: "55", label: "Sky Lobby 2",        body: "High-rise transfer hub. Second business lounge, breakout facilities, and express VIP elevator access to the executive crown." },
      { floor: "80", label: "Executive Crown",    body: "The highest business address in Kuwait. VIP floor with dedicated reception, panoramic observation, and the At The Top restaurant." },
    ],
    routesTag: "Elevator System Architecture",
    routesH2: "Elevator Routes",
    routesCols: ["Route", "Floors", "Speed", "Capacity"],
    routes: [
      { name: "Express to Sky Lobby 55", floors: "G → 55",  speed: "6 m/s", cap: "24 persons" },
      { name: "Express to Sky Lobby 30", floors: "G → 30",  speed: "6 m/s", cap: "24 persons" },
      { name: "Low-Rise Local",          floors: "G → 20",  speed: "4 m/s", cap: "16 persons" },
      { name: "Mid-Rise Local",          floors: "30 → 50", speed: "4 m/s", cap: "16 persons" },
      { name: "High-Rise Local",         floors: "55 → 80", speed: "4 m/s", cap: "16 persons" },
    ],
    lobbyTag: "Sky Lobby Features",
    lobbyH2: "Vertical Connectivity for Business",
    lobbyFeatures: [
      { number: "01", title: "Two Sky Lobbies",    body: "Transfer floors at Level 30 and Level 55 — each a fully equipped business centre with panoramic views and executive lounge facilities." },
      { number: "02", title: "VIP Direct Access",  body: "Dedicated VIP elevators run non-stop from the ground lobby to the crown. Separate from general tenant traffic." },
      { number: "03", title: "8 Express Units",    body: "High-speed express elevators at 6 m/s connect the ground floor directly to sky lobby transfer points." },
      { number: "04", title: "Zero-Wait Strategy", body: "Staggered destination dispatch across three elevator zones — low, mid, and high rise — minimises lobby congestion at peak hours." },
    ],
    darkTitle: "Explore Connectivity & Integration",
    darkCta: "District Integration",
  },
  ar: {
    tag: "الأعمال · النقلُ الرأسيّ",
    title: "النقلُ الرأسيّ",
    subtitle: "تضمن استراتيجيةُ النقل الرأسيّ في البرج انسيابيةَ التدفّق للمستأجرين والزوار بمصاعدَ متعدّدةٍ وطوابقِ تحويلٍ موضوعةٍ استراتيجياً.",
    crumbHome: "الرئيسية", crumbBusiness: "الأعمال", crumbThis: "النقلُ الرأسيّ",
    stats: [
      { number: "43", label: "إجماليُّ المصاعد" },
      { number: "8",  label: "وحداتٌ سريعة"     },
      { number: "6",  unit: "م/ث", label: "السرعةُ القصوى" },
    ],
    corridorAlt: "برج الحمراء — ممرُّ مصاعدَ بهيكل اللاميلا",
    corridorKicker: "مستوى الردهة · قاعةُ المصاعد · هيكل اللاميلا",
    corridorH1: "43 مصعداً.",
    corridorH2: "صعودٌ واحدٌ بلا انقطاع.",
    ascentTag: "نقاطُ تحويل ردهات السماء",
    ascentH2: "الرحلةُ الرأسية",
    ascent: [
      { floor: "G",  label: "الأرضيّ — الوصول",  body: "مدخلُ الردهة الرئيسة. تنطلق المصاعدُ السريعةُ نحو ردهة السماء 30 وردهة السماء 55. وتبدأ خدمةُ المرتفعات المنخفضة المحلية من الطابق 6." },
      { floor: "30", label: "ردهةُ السماء 1",     body: "مركزُ تحويلٍ للمرتفعات الوسطى. مركزُ أعمالٍ مجهّزٌ بالكامل، صالةٌ تنفيذية بسقوفِ 7م، ومشاهدُ بانورامية للخليج من ارتفاع 120 متراً." },
      { floor: "55", label: "ردهةُ السماء 2",     body: "مركزُ تحويلٍ للمرتفعات العالية. صالةُ أعمالٍ ثانية، مرافقُ استراحة، ووصولٌ سريعٌ بمصعد كبار الشخصيات إلى التاج التنفيذيّ." },
      { floor: "80", label: "التاجُ التنفيذيّ",    body: "أعلى عنوانٍ تجاريّ في الكويت. طابقُ كبار الشخصيات باستقبالٍ مخصّص، ومرصدٍ بانوراميّ، ومطعمِ At The Top." },
    ],
    routesTag: "بنيةُ منظومة المصاعد",
    routesH2: "مساراتُ المصاعد",
    routesCols: ["المسار", "الطوابق", "السرعة", "السعة"],
    routes: [
      { name: "السريعُ إلى ردهة السماء 55", floors: "G → 55",  speed: "6 م/ث", cap: "24 شخصاً" },
      { name: "السريعُ إلى ردهة السماء 30", floors: "G → 30",  speed: "6 م/ث", cap: "24 شخصاً" },
      { name: "المحليُّ للمرتفعات المنخفضة",  floors: "G → 20",  speed: "4 م/ث", cap: "16 شخصاً" },
      { name: "المحليُّ للمرتفعات الوسطى",    floors: "30 → 50", speed: "4 م/ث", cap: "16 شخصاً" },
      { name: "المحليُّ للمرتفعات العالية",    floors: "55 → 80", speed: "4 م/ث", cap: "16 شخصاً" },
    ],
    lobbyTag: "مزايا ردهات السماء",
    lobbyH2: "ترابطٌ رأسيٌّ للأعمال",
    lobbyFeatures: [
      { number: "01", title: "ردهتا سماء",            body: "طابقا تحويلٍ عند المستوى 30 والمستوى 55 — كلٌّ منهما مركزُ أعمالٍ مجهّزٌ بالكامل بمشاهدَ بانورامية ومرافقِ صالاتٍ تنفيذية." },
      { number: "02", title: "وصولٌ مباشر لكبار الشخصيات", body: "مصاعدُ كبار الشخصيات المخصّصة تعمل دون توقّفٍ من الردهة الأرضية إلى التاج. منفصلةٌ عن حركة المستأجرين العامة." },
      { number: "03", title: "8 وحداتٍ سريعة",           body: "مصاعدُ سريعةٌ عاليةُ السرعة عند 6 م/ث تربط الطابق الأرضيّ مباشرةً بنقاط تحويل ردهات السماء." },
      { number: "04", title: "استراتيجيةُ صفر انتظار",   body: "إرسالٌ متدرّجٌ حسب الوجهة عبر ثلاث مناطق مصاعد — منخفضة ووسطى وعالية — يُقلّص ازدحام الردهة في ساعات الذروة." },
    ],
    darkTitle: "استكشِف الترابط والتكامل",
    darkCta: "تكاملُ الحيّ",
  },
} as const;

export function VerticalTransportation() {
  const { lang } = useI18n();
  const c = usePageContent<any>("verticalTransport", VERTICAL_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="verticalTransport"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbBusiness, href: "/business" }, { label: c.crumbThis, href: "/business/vertical-transportation" }]}
      />
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <StatsBar stats={[...c.stats]} editKey="verticalTransport" />
      </div>

      <div style={{ position: "relative", height: "clamp(260px,38vw,480px)", overflow: "hidden" }}>
        <SlotImage loading="lazy" slot="verticalTransport.corridor" fallback="/assets/lobby-elevator-corridor.jpg" alt={c.corridorAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, rgba(29,29,27,0.65) 0%, rgba(29,29,27,0.1) 60%, transparent 100%)" }} />
        <div className="photo-overlay-text" style={{ position: "absolute", bottom: 0, left: 0, top: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <p style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>
            <Editable id="page_prose:verticalTransport:corridorKicker">{c.corridorKicker}</Editable>
          </p>
          <h3 style={{ fontFamily: FONT, fontSize: "clamp(20px,2.2vw,36px)", fontWeight: 200, color: "#fff", lineHeight: 1.25 }}>
            <Editable id="page_prose:verticalTransport:corridorH1">{c.corridorH1}</Editable><br /><strong style={{ fontWeight: 500 }}><Editable id="page_prose:verticalTransport:corridorH2">{c.corridorH2}</Editable></strong>
          </h3>
        </div>
      </div>

      <Section>
        <Rv><Tag><Editable id="page_prose:verticalTransport:ascentTag">{c.ascentTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:verticalTransport:ascentH2">{c.ascentH2}</Editable></H2></Rv>
        <div className="grid-4col" style={{ gap: 1, background: "rgba(29,29,27,0.09)", marginTop: 48 }}>
          {c.ascent.map(({ floor, label, body }, i) => (
            <Rv key={floor} delay={i * 0.1}>
              <div style={{ background: "#fff", padding: "40px 32px", height: "100%" }}>
                <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 300, color: "#1D1D1B", lineHeight: 1, marginBottom: 8 }}><Editable id={`page_prose:verticalTransport:ascent.${i}.floor`}>{floor}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 12 }}><Editable id={`page_prose:verticalTransport:ascent.${i}.label`}>{label}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "12.5px", color: "#6B6B6B", lineHeight: 1.8 }}><Editable id={`page_prose:verticalTransport:ascent.${i}.body`}>{body}</Editable></div>
              </div>
            </Rv>
          ))}
        </div>
      </Section>

      <Section bg="#FAFAFA">
        <Rv><Tag><Editable id="page_prose:verticalTransport:routesTag">{c.routesTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:verticalTransport:routesH2">{c.routesH2}</Editable></H2></Rv>
        <Rv delay={0.2}>
          <div className="route-grid" style={{ marginTop: 40 }}>
            {c.routes.map(({ name, floors, speed, cap }, i) => (
              <div key={name} className="route-card">
                <span className="route-name"><Editable id={`page_prose:verticalTransport:routes.${i}.name`}>{name}</Editable></span>
                <div className="rc-row"><span className="rc-l">{c.routesCols[1]}</span><span className="rc-v"><Editable id={`page_prose:verticalTransport:routes.${i}.floors`}>{floors}</Editable></span></div>
                <div className="rc-row"><span className="rc-l">{c.routesCols[2]}</span><span className="rc-v"><Editable id={`page_prose:verticalTransport:routes.${i}.speed`}>{speed}</Editable></span></div>
                <div className="rc-row"><span className="rc-l">{c.routesCols[3]}</span><span className="rc-v"><Editable id={`page_prose:verticalTransport:routes.${i}.cap`}>{cap}</Editable></span></div>
              </div>
            ))}
            <style>{`
              .route-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px; align-items:start; }
              .route-card{ background:#fff; border:1px solid rgba(29,29,27,0.09); padding:clamp(24px,2.2vw,34px) clamp(20px,1.8vw,30px); }
              .route-name{ display:block; font-family:var(--font-brand); font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#CD1719; padding-bottom:16px; margin-bottom:4px; border-bottom:1px solid rgba(184,184,182,0.35); }
              .rc-row{ display:flex; justify-content:space-between; align-items:baseline; gap:16px; padding:14px 0; border-bottom:1px solid rgba(29,29,27,0.06); }
              .rc-row:last-child{ border-bottom:none; padding-bottom:2px; }
              .rc-l{ font-family:var(--font-brand); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:#9a938a; }
              .rc-v{ font-family:var(--font-brand); font-size:16px; font-weight:300; color:#1D1D1B; text-align:right; }
            `}</style>
          </div>
        </Rv>
      </Section>

      <Section>
        <Rv><Tag><Editable id="page_prose:verticalTransport:lobbyTag">{c.lobbyTag}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:verticalTransport:lobbyH2">{c.lobbyH2}</Editable></H2></Rv>
        <Rv delay={0.2}><FeatureGrid features={[...c.lobbyFeatures]} editKey="verticalTransport" editField="lobbyFeatures" /></Rv>
      </Section>

      <DarkBand title={c.darkTitle} ctaLabel={c.darkCta} ctaHref="/business/connectivity" editKey="verticalTransport" />
    </PageLayout>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CONNECTIVITY
══════════════════════════════════════════════════════════════════════ */
const CONN_CONTENT = {
  en: {
    tag: "Business · Connectivity",
    title: "Connectivity & Integration",
    subtitle: "Al Hamra Tower is more than an office building — it is the center of a fully integrated urban district connecting retail, dining, transport, and government infrastructure.",
    crumbHome: "Home", crumbBusiness: "Business", crumbThis: "Connectivity",
    stats: [
      { number: "2,000+", label: "Parking Spaces" },
      { number: "11",     label: "Parking Levels" },
      { number: "90+",    label: "Retail Outlets" },
      { number: "5",      unit: "min", label: "To Government District" },
    ],
    tag2: "The Sharq District · Kuwait City's Commercial Heart",
    h2: "Integrated Ecosystem",
    body: "The Al Hamra complex integrates a premier shopping center, extensive car parking, and direct connections to Kuwait City's central business corridor — creating a self-contained environment for professionals.",
    features: [
      { number: "01", title: "Al Hamra Shopping Center", body: "Direct internal access to a premium retail destination featuring international brands, dining, and lifestyle services — all within the Al Hamra complex.", url: "https://www.alhamracenter.com" },
      { number: "02", title: "On-Site Amenities",        body: "Ground-floor cafés, restaurants, banking services, and business support facilities ensure daily convenience without leaving the complex." },
      { number: "03", title: "Transport Links",          body: "Proximity to major arterial roads and Kuwait's developing public transit infrastructure. 11-level car park with 2,000+ spaces and dedicated VIP access." },
      { number: "04", title: "District Integration",     body: "Positioned in Sharq, Kuwait City's central business district, within walking distance of government ministries, embassies, and the financial corridor." },
    ],
    visitLink: "Visit alhamracenter.com",
    darkTitle: "Ready to Secure Your Space?",
    darkSubtitle: "Contact our leasing team for availability aligned to your business needs.",
    darkCta: "Leasing Inquiry",
  },
  ar: {
    tag: "الأعمال · الترابط",
    title: "الترابطُ والتكامل",
    subtitle: "برج الحمراء أكثرُ من مبنىً مكتبيّ — هو مركزُ حيٍّ حضريّ متكاملٍ تماماً يربط التجزئة والمطاعم والنقل والبنية الحكومية.",
    crumbHome: "الرئيسية", crumbBusiness: "الأعمال", crumbThis: "الترابط",
    stats: [
      { number: "+2,000", label: "مواقفُ سيارات" },
      { number: "11",     label: "طوابقُ مواقف" },
      { number: "+90",    label: "منافذُ تجزئة" },
      { number: "5",      unit: "دقيقة", label: "إلى الحيّ الحكوميّ" },
    ],
    tag2: "حيُّ شرق · القلبُ التجاريّ لمدينة الكويت",
    h2: "منظومةٌ متكاملة",
    body: "يدمج مجمَّع الحمراء مركزَ تسوّقٍ راقياً، ومواقفَ سياراتٍ واسعة، واتصالاتٍ مباشرة بالممرّ التجاريّ المركزيّ لمدينة الكويت — في بيئةٍ مكتفيةٍ بذاتها للمحترفين.",
    features: [
      { number: "01", title: "مركزُ الحمراء للتسوّق", body: "وصولٌ داخليّ مباشرٌ إلى وجهةِ تجزئةٍ راقيةٍ تضمّ علاماتٍ عالمية، ومطاعمَ، وخدماتِ أنماط حياة — جميعُها داخل مجمَّع الحمراء.", url: "https://www.alhamracenter.com" },
      { number: "02", title: "مرافقُ ضمن الموقع",     body: "مقاهٍ ومطاعمُ وخدماتٌ مصرفية ومرافقُ دعم أعمالٍ في الطابق الأرضيّ تضمن الراحة اليومية دون مغادرة المجمَّع." },
      { number: "03", title: "روابطُ النقل",          body: "قُربٌ من الطرق الشريانية الرئيسية وبنية النقل العامّ المتطوّرة في الكويت. مَرفِقُ سياراتٍ من 11 طابقاً يضمّ أكثر من 2,000 موقفاً ووصولاً مخصّصاً لكبار الشخصيات." },
      { number: "04", title: "تكاملُ الحيّ",           body: "موقعٌ في حيّ شرق، قلبِ الكويت التجاريّ، على بُعد مسافةٍ قصيرة سيراً من الوزارات والسفارات والممرّ الماليّ." },
    ],
    visitLink: "زر alhamracenter.com",
    darkTitle: "هل أنت مستعدٌّ لحجز مساحتِك؟",
    darkSubtitle: "تواصل مع فريق التأجير للحصول على التوافر وفق احتياجات عملك.",
    darkCta: "استفسارُ التأجير",
  },
} as const;

export function Connectivity() {
  const { lang } = useI18n();
  const c = usePageContent<any>("connectivity", CONN_CONTENT[lang], lang);
  return (
    <PageLayout>
      <PageHero
        editKey="connectivity"
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbBusiness, href: "/business" }, { label: c.crumbThis, href: "/business/connectivity" }]}
      />
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <StatsBar stats={[...c.stats]} editKey="connectivity" />
      </div>
      <Section>
        <Rv><Tag><Editable id="page_prose:connectivity:tag2">{c.tag2}</Editable></Tag></Rv>
        <Rv delay={0.1}><H2><Editable id="page_prose:connectivity:h2">{c.h2}</Editable></H2></Rv>
        <Rv delay={0.2}><Body style={{ maxWidth: 640, marginBottom: 48 }}><Editable id="page_prose:connectivity:body">{c.body}</Editable></Body></Rv>
        <Rv delay={0.3}>
          <div className="conn-feature-grid" style={{ display: "grid", gap: 1, background: "rgba(29,29,27,0.09)" }}>
            {c.features.map(({ number, title, body, url }, i) => (
              <div key={number}
                style={{ background: "#fff", padding: "clamp(28px,2.2vw,40px) clamp(24px,2vw,34px)", transition: "background 0.18s ease" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
              >
                <div style={{ fontFamily: FONT, fontSize: "10px", color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 10 }}>{number}</div>
                <div style={{ fontFamily: FONT, fontSize: "13px", fontWeight: 500, color: "#1D1D1B", marginBottom: 8, letterSpacing: "0.04em" }}><Editable id={`page_prose:connectivity:features.${i}.title`}>{title}</Editable></div>
                <div style={{ fontFamily: FONT, fontSize: "12px", color: "#6B6B6B", lineHeight: 1.6, marginBottom: url ? 14 : 0 }}><Editable id={`page_prose:connectivity:features.${i}.body`}>{body}</Editable></div>
                {url && (
                  <a href={url} target="_blank" rel="noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: FONT, fontSize: "10.5px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#1D1D1B", textDecoration: "none",
                      borderBottom: "1px solid rgba(29,29,27,0.25)",
                      paddingBottom: 2, transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#6B6B6B"; e.currentTarget.style.borderColor = "rgba(29,29,27,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#1D1D1B"; e.currentTarget.style.borderColor = "rgba(29,29,27,0.25)"; }}
                  >
                    <Editable id="page_prose:connectivity:visitLink">{c.visitLink}</Editable>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </Rv>
        <style>{`
          .conn-feature-grid{ grid-template-columns:1fr 1fr; }
          @media (max-width:640px){ .conn-feature-grid{ grid-template-columns:1fr; } }
        `}</style>
      </Section>
      <DarkBand title={c.darkTitle} subtitle={c.darkSubtitle} ctaLabel={c.darkCta} ctaHref="/leasing/inquiry#inquiry-form" editKey="connectivity" />
    </PageLayout>
  );
}
