import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { useI18n }    from "@/lib/i18n";

const PEARL_TEXT = "#8B6E3E";
const DARK  = "#1D1D1B";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const CONTENT = {
  en: {
    heroTitle: "Sustainability",
    heroSubtitle:
      "Al Hamra's environmental performance was not engineered into the building after the form was set. It was the form itself — every design decision that gave the tower its identity also solved an environmental problem.",
    crumbHome: "Home",
    crumbTower: "The Tower",

    introKicker: "Environmental philosophy",
    introHeading: "The form is the strategy.",
    introP1:
      "In most buildings, sustainability features are layered on after the architecture is resolved — solar panels, shading devices, green roofs. At Al Hamra Tower, the environmental response generated the architecture. The spiraling form that makes the building unmistakable is the same act that removes the south-facing glass. The stone wall that defines the skyline is also the primary solar shield.",
    introP2:
      "SOM's structural engineers describe the process as 'symbiotic evolution' — the structural system and the exterior form developed together. Neither could exist without the other. The flared walls are both the building's visual signature and its lateral force-resisting system.",

    pillarsKicker: "Six environmental design principles",
    pillars: [
      {
        n: "01", title: "The Desert Wall",
        body: "The solid south wall — 258,000 m² of Jura limestone — is the building's primary environmental strategy. Its geometry responds directly to Kuwait's solar path. Openings are positioned based on the envelope's relationship to the sun at each floor level, ensuring that direct solar radiation never enters an office space.",
        stat: "Zero south-facing offices in 62 floors",
      },
      {
        n: "02", title: "The Spiraling Form",
        body: "Removing a quarter of each floor plate on the south side does two things simultaneously: it maximises Gulf views for every tenant, and it reduces the total surface area exposed to desert sun. SOM describes it as a 'purely formal operation' — architecture and environmental engineering solved by the same geometric act.",
        stat: "30% less south-facing surface than a conventional tower of equal area",
      },
      {
        n: "03", title: "Low-E Insulating Glass",
        body: "55,000 m² of curtain wall on the north, east, and west facades uses insulating glass with low-emissivity coating. Approximately 30% of the glass units are curved — manufactured to wrap the tower's corners — with bending and coating processes designed to work in tandem.",
        stat: "55,000 m² insulating curtain wall",
      },
      {
        n: "04", title: "Trencadis — Weight Reduced Stone",
        body: "The upper floors of the limestone cladding use trencadis — a mesh coated with crushed limestone — rather than full tiles. This significantly reduces the facade weight at height while maintaining the visual continuity of the monolithic stone wall. A material innovation driven by structural necessity.",
        stat: "Significant weight reduction at height — same visual appearance",
      },
      {
        n: "05", title: "Smart Building Infrastructure",
        body: "A fibre optic backbone and advanced Building Automation System (BAS) managed by a world-leading facility management company monitors and controls all building systems across every floor. Five electrical substations located at strategic levels (B2, 4, 27, 52, 76) ensure 100% power supply redundancy.",
        stat: "100% power supply redundancy across 5 substations",
      },
      {
        n: "06", title: "Concrete Over Steel",
        body: "Al Hamra is one of the few reinforced concrete supertall buildings — a choice with long-term sustainability implications. Concrete's thermal mass moderates internal temperature swings. Its compressive strength allows efficient use of material. The 289 piles were designed for the specific chemistry of Kuwait's silty-sand geology to resist sulphate attack without corrosion.",
        stat: "195,000 m³ reinforced concrete — structural longevity by design",
      },
    ],

    quote:
      "\"The solid south wall, and flared geometry, is generated in order to decrease the absorption of solar radiation. This wall not only protects the building from critical environmental conditions — it also assumes the role of structural backbone.\"",
    quoteCredit: "Skidmore, Owings & Merrill LLP — Structural Sustainability Statement",
  },
  ar: {
    heroTitle: "الاستدامة",
    heroSubtitle:
      "لم يكن الأداءُ البيئيّ لبرج الحمراء طبقةً أُضيفت بعد اكتمال التكوين. بل هو التكوينُ ذاتُه — كلُّ قرارٍ تصميميّ منح البرجَ هويتَه قد حلَّ في الوقت نفسه إشكاليةً بيئية.",
    crumbHome: "الرئيسية",
    crumbTower: "البرج",

    introKicker: "الفلسفة البيئية",
    introHeading: "التكوينُ هو الاستراتيجية.",
    introP1:
      "في معظم المباني، تُضافُ مزايا الاستدامة بعد أن تُحسَم العمارة — ألواحٌ شمسية، أجهزةُ تظليل، أسطحٌ خضراء. أمّا في برج الحمراء، فإنّ الاستجابةَ البيئيةَ هي التي ولَّدت العمارة. التكوينُ الحلزونيّ الذي يجعل المبنى لا يُخطئه نظر هو الفعلُ ذاتُه الذي يُلغي الزجاج الجنوبيّ. والجدارُ الحجريُّ الذي يُحدّد خطّ الأفق هو الدِّرعُ الشمسيّ الأوّل.",
    introP2:
      "يصف مهندسو SOM الإنشائيون العمليةَ بـ«التطوّر التكافليّ» — تطوّر فيه النظامُ الإنشائيّ والتكوينُ الخارجيّ معاً. لا يمكنُ لأحدهما أن يقومَ دون الآخر. الجدرانُ المنحرفةُ هي التوقيعُ البصريّ للمبنى ونظامُ مقاومةِ القوى الجانبية في آنٍ معاً.",

    pillarsKicker: "ستّةُ مبادئ تصميميةٍ بيئية",
    pillars: [
      {
        n: "01", title: "جدارُ الصحراء",
        body: "الجدارُ الجنوبيُّ المُصمت — 258,000م² من حجر الجوراسيك — هو الاستراتيجيةُ البيئيةُ الأولى للمبنى. هندستُه استجابةٌ مباشرةٌ لمسار الشمس فوق الكويت. وتُحدَّد مواضع الفتحات وفقاً لعلاقة الغلاف بالشمس عند كلّ مستوىً، بما يضمن ألّا يدخل الإشعاعُ الشمسيُّ المباشرُ فضاءَ مكتبٍ أبداً.",
        stat: "صفرُ مكاتبَ جنوبية في 62 طابقاً",
      },
      {
        n: "02", title: "التكوينُ الحلزونيّ",
        body: "إزالةُ ربعٍ من كلّ بلاطةِ طابق في الجهة الجنوبية تُحقّقُ هدفين في آنٍ معاً: تُعظّم مشاهد الخليج لكلّ مستأجر، وتُقلّص إجماليَّ المساحات المعرَّضة لشمس الصحراء. تصف SOM هذا بـ«عمليةٍ شكليةٍ صِرفة» — حلّت العمارةَ والهندسةَ البيئيةَ معاً بالفعل الهندسيّ ذاته.",
        stat: "30٪ أقلُّ سطحاً جنوبياً من برجٍ تقليديّ بمساحةٍ مكافئة",
      },
      {
        n: "03", title: "زجاجٌ عازلٌ منخفضُ الانبعاثية",
        body: "تستخدم 55,000م² من الجدار الستائريّ في الواجهات الشمالية والشرقية والغربية زجاجاً عازلاً بطلاءٍ منخفض الانبعاثية. ونحوُ 30٪ من وحدات الزجاج منحنية — مصنوعةٌ لتلتفّ حول زوايا البرج — وقد صُمّمت عمليات التشكيل والطلاء لتعمل بتناغمٍ تامّ.",
        stat: "55,000م² من الجدار الستائريّ العازل",
      },
      {
        n: "04", title: "ترِنكاديس — حجرٌ مُخفَّفُ الوزن",
        body: "تستخدم الطوابقُ العُليا من الكسوة الحجرية تقنيةَ الترِنكاديس — شبكٌ مكسوٌّ بالحجر الجيريّ المكسّر — بدلاً من البلاط الكامل. وهذا يُخفّضُ وزن الواجهة في الارتفاعات تخفيضاً ملحوظاً مع الحفاظ على الاتصال البصريّ للجدار الحجريّ المُصمت. ابتكارٌ ماديٌّ فرضتْه الضرورةُ الإنشائية.",
        stat: "تخفيضٌ كبيرٌ للوزن مع المظهر البصريّ ذاته",
      },
      {
        n: "05", title: "بنيةٌ تحتيةٌ لمبنىً ذكيّ",
        body: "عمودٌ فِقَريّ من الألياف الضوئية ونظامُ أتمتةِ مبنى متقدّم (BAS) تُديره شركةٌ رائدةٌ عالمياً في إدارة المنشآت يراقبان ويتحكّمان في جميع منظومات المبنى عبر كلّ طابق. وخمسُ محطّاتِ تحويلٍ كهربائيةٍ في مستوياتٍ استراتيجية (B2 و4 و27 و52 و76) تضمن تكراراً 100٪ في إمداد الطاقة.",
        stat: "تكرارٌ 100٪ في إمداد الطاقة عبر 5 محطّاتٍ تحويلية",
      },
      {
        n: "06", title: "الخرسانةُ على الفولاذ",
        body: "برجُ الحمراء هو أحدُ الأبراج الفائقة الارتفاع القليلة المبنيّة بالخرسانة المسلّحة — خيارٌ له تبعاتٌ استداميةٌ بعيدةُ المدى. الكتلةُ الحراريةُ للخرسانة تُلطّف تذبذبات درجة الحرارة الداخلية. ومقاومتُها للضغط تتيح استخداماً فعّالاً للمواد. وقد صُمّمت 289 ركيزةً وفق الكيمياء النوعية لجيولوجيا الكويت الرمليةِ الطميةِ لمقاومة هجوم الكبريتات دون تآكل.",
        stat: "195,000م³ من الخرسانة المسلّحة — متانةٌ إنشائيةٌ بتصميم",
      },
    ],

    quote:
      "«الجدارُ الجنوبيُّ المُصمت، والهندسةُ المنحرفة، يُولَّدان لتقليل امتصاص الإشعاع الشمسيّ. وهذا الجدار لا يحمي المبنى من الظروف البيئية الحرجة فحسب — بل يتولّى دور العمود الفقريّ الإنشائيّ.»",
    quoteCredit: "سكيدمور وأوينغز وميريل LLP — بيانُ الاستدامة الإنشائية",
  },
} as const;

export default function TowerSustainability() {
  const { lang } = useI18n();
  const c = CONTENT[lang];

  return (
    <PageLayout>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        image="/assets/tower-foggy.jpg"
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbTower, href: "/tower" }]}
      />

      {/* ── Intro statement ─────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)",
          alignItems: "start" }} className="sust-intro-grid">
          <div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL_TEXT, marginBottom: 20 }}>
              {c.introKicker}
            </div>
            <h2 style={{ fontFamily: FONT,
              fontWeight: 300, fontSize: "clamp(26px,3.5vw,50px)",
              color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 0 }}>
              {c.introHeading}
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 20 }}>
              {c.introP1}
            </p>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.1vw,15px)", color: "#5a5a58", lineHeight: 1.9 }}>
              {c.introP2}
            </p>
          </div>
        </div>
      </div>

      {/* ── Six sustainability pillars ──────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
          letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL_TEXT, marginBottom: 48 }}>
          {c.pillarsKicker}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1,
          background: "rgba(29,29,27,0.07)" }} className="sust-pillars-grid">
          {c.pillars.map(({ n, title, body, stat }, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });
            return (
              <motion.div key={n} ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                style={{ background: "#fff", padding: "clamp(28px,4vh,44px) clamp(24px,3vw,36px)" }}>
                <div style={{ fontFamily: FONT,
                  fontSize: "clamp(28px,3vw,44px)", fontWeight: 300,
                  color: "rgba(29,29,27,0.1)", lineHeight: 1, marginBottom: 20 }}>{n}</div>
                <div style={{ fontFamily: FONT, fontSize: "clamp(12px,1vw,14px)",
                  fontWeight: 500, color: DARK, marginBottom: 16, letterSpacing: "0.03em" }}>{title}</div>
                <p style={{ fontFamily: FONT, fontWeight: 300,
                  fontSize: "clamp(12px,0.95vw,13px)", color: "#6B6B6B",
                  lineHeight: 1.65, marginBottom: 20 }}>{body}</p>
                <div style={{ fontFamily: FONT, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: PEARL_TEXT,
                  paddingTop: 16, borderTop: "1px solid rgba(200,185,154,0.3)" }}>{stat}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Quote ───────────────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(64px,10vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FONT,
            fontWeight: 300, fontSize: "clamp(22px,3vw,42px)",
            color: DARK, lineHeight: 1.4, marginBottom: 28 }}>
            {c.quote}
          </div>
          <div style={{ fontFamily: FONT, fontSize: "10px",
            letterSpacing: "0.35em", textTransform: "uppercase", color: PEARL_TEXT }}>
            {c.quoteCredit}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
