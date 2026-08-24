import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";
import { useI18n }    from "@/lib/i18n";

const PEARL_TEXT = "#CD1719";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Privacy Policy ───────────────────────────────────────────────────
   Bilingual (EN/AR) privacy policy for a marketing / leasing website
   that collects contact-form data. Not legal advice — content should be
   reviewed by counsel before production.
──────────────────────────────────────────────────────────────────────── */

type Section = { n: string; title: string; body: string[] };
type Content = {
  tag: string; title: string; subtitle: string; crumbHome: string; crumbThis: string;
  effLabel: string; effNote: string; intro: string; sections: Section[];
};

const CONTENT: Record<string, Content> = {
  en: {
    tag: "Legal",
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect the information you share with us.",
    crumbHome: "Home",
    crumbThis: "Privacy Policy",
    effLabel: "Effective Date · January 2026",
    effNote: "This policy was last reviewed and updated on January 2026.",
    intro:
      "This Privacy Policy describes how Al Hamra Tower (\"we,\" \"us,\" or \"our\") collects, uses, and protects the personal information of visitors to our website and of individuals who contact us. By using our website or submitting information through our forms, you acknowledge that you have read and understood this Privacy Policy.",
    sections: [
      { n: "01", title: "Information we collect", body: [
        "We collect information that you voluntarily provide when you contact us through our inquiry form, subscribe to updates, or request information about leasing opportunities. This typically includes your name, email address, telephone number, company name, and the details of your enquiry.",
        "We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device identifier, pages visited, time spent on pages, and referring URLs. This information is collected through cookies and similar technologies.",
      ] },
      { n: "02", title: "How we use your information", body: [
        "We use the information you provide to respond to your enquiries, to provide the services you have requested, to communicate with you about leasing opportunities or related matters, and to improve our website and services.",
        "We may also use your information to send you periodic communications about Al Hamra Tower, provided you have consented to receive such communications. You may opt out of these communications at any time.",
      ] },
      { n: "03", title: "Legal basis for processing", body: [
        "Where applicable law requires a legal basis for processing your personal data, we rely on the following bases: your consent, the performance of a contract to which you are a party, compliance with a legal obligation to which we are subject, or the legitimate interests pursued by us or by a third party, except where such interests are overridden by your rights.",
      ] },
      { n: "04", title: "Sharing of information", body: [
        "We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided that those parties agree to keep this information confidential.",
        "We may also disclose your information where required by law, in response to valid legal process, or to protect the rights, property, or safety of our organisation, our tenants, or others.",
      ] },
      { n: "05", title: "Cookies and tracking technologies", body: [
        "Our website uses cookies and similar tracking technologies to distinguish you from other users, remember your preferences, and analyse how our website is used. This helps us provide you with a better experience and improve our services over time.",
        "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.",
      ] },
      { n: "06", title: "Data retention", body: [
        "We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or for as long as we are required to retain it to comply with applicable legal, accounting, or reporting requirements.",
      ] },
      { n: "07", title: "Security", body: [
        "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.",
      ] },
      { n: "08", title: "Your rights", body: [
        "Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the processing of your personal data, the right to data portability, and the right to object to processing.",
        "To exercise any of these rights, or if you have any questions about how we handle your personal information, please contact us using the details provided below.",
      ] },
      { n: "09", title: "Third-party links", body: [
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We encourage you to read the privacy policies of any third-party websites you visit.",
      ] },
      { n: "10", title: "Changes to this policy", body: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will post any changes on this page with an updated revision date. We encourage you to review this policy periodically.",
      ] },
      { n: "11", title: "Contact us", body: [
        "If you have any questions, comments, or requests regarding this Privacy Policy or our privacy practices, please contact us via our inquiry form or at the address listed in the footer of our website.",
      ] },
    ],
  },
  ar: {
    tag: "الشؤون القانونية",
    title: "سياسة الخصوصية",
    subtitle: "كيف نجمع المعلومات التي تشاركها معنا ونستخدمها ونحميها.",
    crumbHome: "الرئيسية",
    crumbThis: "سياسة الخصوصية",
    effLabel: "تاريخ السريان · يناير ٢٠٢٦",
    effNote: "روجعت هذه السياسة وحُدّثت آخر مرة في يناير ٢٠٢٦.",
    intro:
      "توضّح سياسة الخصوصية هذه كيف يقوم برج الحمراء («نحن» أو «لنا» أو «الخاص بنا») بجمع المعلومات الشخصية لزوّار موقعنا الإلكتروني وللأفراد الذين يتواصلون معنا، واستخدامها وحمايتها. وباستخدامك موقعنا أو تقديمك معلومات عبر نماذجنا، فإنك تُقرّ بأنك قد قرأت سياسة الخصوصية هذه وفهمتها.",
    sections: [
      { n: "٠١", title: "المعلومات التي نجمعها", body: [
        "نجمع المعلومات التي تقدّمها طواعيةً عند تواصلك معنا عبر نموذج الاستفسار، أو اشتراكك في التحديثات، أو طلبك معلومات حول فرص التأجير. ويشمل ذلك عادةً اسمك، وعنوان بريدك الإلكتروني، ورقم هاتفك، واسم شركتك، وتفاصيل استفسارك.",
        "كما نجمع تلقائياً بعض المعلومات التقنية عند زيارتك لموقعنا، بما في ذلك عنوان بروتوكول الإنترنت (IP) الخاص بك، ونوع المتصفّح، ومعرّف الجهاز، والصفحات التي زُرتها، والمدّة التي أمضيتها على الصفحات، وعناوين الإحالة. وتُجمع هذه المعلومات عبر ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة.",
      ] },
      { n: "٠٢", title: "كيف نستخدم معلوماتك", body: [
        "نستخدم المعلومات التي تقدّمها للردّ على استفساراتك، وتقديم الخدمات التي طلبتها، والتواصل معك بشأن فرص التأجير أو الأمور ذات الصلة، وتحسين موقعنا وخدماتنا.",
        "وقد نستخدم معلوماتك أيضاً لإرسال مراسلاتٍ دورية إليك حول برج الحمراء، شريطة موافقتك على تلقّي هذه المراسلات. ويمكنك إلغاء الاشتراك فيها في أيّ وقت.",
      ] },
      { n: "٠٣", title: "الأساس القانوني للمعالجة", body: [
        "حيثما يقتضي القانون المعمول به وجود أساسٍ قانوني لمعالجة بياناتك الشخصية، فإننا نستند إلى الأسس التالية: موافقتك، أو تنفيذ عقدٍ أنت طرفٌ فيه، أو الامتثال لالتزامٍ قانوني نخضع له، أو المصالح المشروعة التي نسعى إليها نحن أو طرفٌ ثالث، إلا حيثما تكون حقوقك راجحةً على تلك المصالح.",
      ] },
      { n: "٠٤", title: "مشاركة المعلومات", body: [
        "لا نبيع معلوماتك الشخصية أو نؤجّرها أو نتاجر بها مع أطرافٍ ثالثة. وقد نشارك معلوماتك مع مزوّدي خدماتٍ موثوقين يساعدوننا في تشغيل موقعنا أو إدارة أعمالنا أو خدمتك، شريطة موافقة تلك الأطراف على الحفاظ على سرّية هذه المعلومات.",
        "وقد نُفصح عن معلوماتك أيضاً حيثما يقتضي القانون ذلك، أو استجابةً لإجراءٍ قانوني سليم، أو لحماية حقوق مؤسستنا أو مستأجرينا أو غيرهم، أو ممتلكاتهم أو سلامتهم.",
      ] },
      { n: "٠٥", title: "ملفات تعريف الارتباط وتقنيات التتبّع", body: [
        "يستخدم موقعنا ملفات تعريف الارتباط (الكوكيز) وتقنيات تتبّعٍ مشابهة لتمييزك عن المستخدمين الآخرين، وتذكّر تفضيلاتك، وتحليل كيفية استخدام موقعنا. ويساعدنا ذلك على تقديم تجربةٍ أفضل لك وتحسين خدماتنا مع الوقت.",
        "ويمكنك ضبط متصفّحك لرفض جميع ملفات تعريف الارتباط أو بعضها، أو لتنبيهك عند قيام المواقع بتعيينها أو الوصول إليها. وإذا عطّلت ملفات تعريف الارتباط أو رفضتها، فيُرجى ملاحظة أن بعض أجزاء هذا الموقع قد تصبح غير متاحة أو قد لا تعمل بشكلٍ صحيح.",
      ] },
      { n: "٠٦", title: "الاحتفاظ بالبيانات", body: [
        "سنحتفظ بمعلوماتك الشخصية فقط طوال المدّة اللازمة للأغراض المبيّنة في سياسة الخصوصية هذه، أو طوال المدّة التي يُطلب منّا فيها الاحتفاظ بها امتثالاً للمتطلّبات القانونية أو المحاسبية أو التنظيمية المعمول بها.",
      ] },
      { n: "٠٧", title: "الأمان", body: [
        "نطبّق تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرّح به أو التعديل أو الإفصاح أو الإتلاف. ومع ذلك، لا توجد وسيلة نقلٍ عبر الإنترنت أو وسيلة تخزينٍ إلكتروني آمنة تماماً، ولا يمكننا ضمان الأمان المطلق.",
      ] },
      { n: "٠٨", title: "حقوقك", body: [
        "قد تتمتّع، تبعاً للاختصاص القضائي المُطبَّق عليك، بحقوقٍ معيّنة بشأن معلوماتك الشخصية، بما في ذلك الحق في الوصول إليها أو تصحيحها أو حذفها أو تقييد معالجتها، والحق في قابلية نقل البيانات، والحق في الاعتراض على المعالجة.",
        "ولممارسة أيٍّ من هذه الحقوق، أو إذا كانت لديك أيّ أسئلة حول كيفية تعاملنا مع معلوماتك الشخصية، يُرجى التواصل معنا باستخدام التفاصيل الواردة أدناه.",
      ] },
      { n: "٠٩", title: "روابط الأطراف الثالثة", body: [
        "قد يحتوي موقعنا على روابط لمواقع تابعة لأطرافٍ ثالثة. ولسنا مسؤولين عن ممارسات الخصوصية أو محتوى تلك المواقع. ونشجّعك على قراءة سياسات الخصوصية الخاصة بأيّ مواقع لأطرافٍ ثالثة تزورها.",
      ] },
      { n: "١٠", title: "التغييرات على هذه السياسة", body: [
        "قد نُحدّث سياسة الخصوصية هذه من حينٍ لآخر لتعكس التغييرات في ممارساتنا أو تقنياتنا أو المتطلّبات القانونية أو عوامل أخرى. وسننشر أيّ تغييرات على هذه الصفحة مع تحديث تاريخ المراجعة. ونشجّعك على مراجعة هذه السياسة بشكلٍ دوري.",
      ] },
      { n: "١١", title: "تواصل معنا", body: [
        "إذا كانت لديك أيّ أسئلة أو ملاحظات أو طلبات بخصوص سياسة الخصوصية هذه أو ممارساتنا المتعلّقة بالخصوصية، يُرجى التواصل معنا عبر نموذج الاستفسار أو على العنوان المُدرَج في تذييل موقعنا.",
      ] },
    ],
  },
};

export default function PrivacyPolicy() {
  const { lang } = useI18n();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <PageLayout>
      <PageHero
        tag={c.tag}
        title={c.title}
        subtitle={c.subtitle}
        image="/assets/tower-foggy.jpg"
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbThis, href: "/privacy" }]}
      />

      {/* ── Effective date bar ──────────────────────────────────── */}
      <div style={{
        background: "#FAFAFA",
        borderBottom: "1px solid rgba(29,29,27,0.07)",
        padding: "24px clamp(28px,6vw,96px)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: PEARL_TEXT,
          }}>
            {c.effLabel}
          </div>
          <div style={{
            fontFamily: CG, fontSize: "11px", color: "#6B6B6B", letterSpacing: "0.04em",
          }}>
            {c.effNote}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(64px,10vh,120px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "clamp(48px,7vh,80px)" }}
          >
            <p style={{
              fontFamily: CG, fontWeight: 300,
              fontSize: "clamp(15px,1.25vw,18px)",
              color: DARK, lineHeight: 1.75, margin: 0, maxWidth: 720,
            }}>
              {c.intro}
            </p>
          </motion.div>

          {/* Numbered sections */}
          {c.sections.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: "clamp(16px,3vw,48px)",
                padding: "clamp(28px,4vh,44px) 0",
                borderTop: "1px solid rgba(29,29,27,0.08)",
              }}
              className="legal-row"
            >
              {/* Number */}
              <div style={{
                fontFamily: CG, fontSize: "clamp(14px,1.2vw,16px)",
                fontWeight: 300, color: PEARL_TEXT,
                letterSpacing: "0.2em",
                paddingTop: 8,
              }}>
                {s.n}
              </div>

              {/* Content */}
              <div>
                <h2 style={{
                  fontFamily: CG, fontWeight: 300,
                  fontSize: "clamp(18px,1.8vw,26px)",
                  color: DARK, lineHeight: 1.25,
                  margin: "0 0 16px", letterSpacing: "-0.005em",
                }}>
                  {s.title}
                </h2>
                {s.body.map((paragraph, j) => (
                  <p key={j} style={{
                    fontFamily: CG, fontWeight: 300,
                    fontSize: "clamp(13px,1.05vw,15px)",
                    color: "#4a4a48", lineHeight: 1.9,
                    margin: j < s.body.length - 1 ? "0 0 16px" : 0,
                    maxWidth: 680,
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Closing rule */}
          <div style={{ borderTop: "1px solid rgba(29,29,27,0.08)", marginTop: 8 }} />
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .legal-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </PageLayout>
  );
}
