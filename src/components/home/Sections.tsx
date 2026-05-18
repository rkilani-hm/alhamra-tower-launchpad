import { ScrollReveal } from "../shared/ScrollReveal";
import { Link } from "react-router-dom";
import { PatternBackground } from "../shared/PatternBand";
import { useI18n } from "@/lib/i18n";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ──────────────────────────────────────────────────────────────────
   Three homepage sections exported from this file:
     • Perspectives  — The Light / The Silence / The Vantage
     • FloorConfigs  — three lease configurations
     • LeasingBand   — dark CTA band (not currently mounted in Index)
     • ContactStrip  — bottom contact rail (phone / email / hours / address)
   All bilingual EN/AR with MSA luxury register.
────────────────────────────────────────────────────────────────── */

// ── PERSPECTIVES ──────────────────────────────────────────
const PERSP_CONTENT = {
  en: [
    { n: "01", title: "The Light",
      body: "The asymmetric form is environmental, not aesthetic. Kuwait's south-facing sun is the harshest in the GCC. Al Hamra's stone wall absorbs it — not a single office window points into it. Every workspace receives the gentler northern, eastern, or western light, framed by the Gulf or the city." },
    { n: "02", title: "The Silence",
      body: "From the Sky Lobby at Floor 30, the traffic of Sharq becomes a distant idea. By Floor 55, the city stops talking. The Sky Lounge at 351m offers a stillness that does not exist anywhere else in Kuwait — an altitude where conversation, not commute, defines the day." },
    { n: "03", title: "The Vantage",
      body: "Kuwait Bay to the north. The Arabian Gulf to the east. The desert horizon to the west. From the upper third of the tower, all three are simultaneously visible from a single window — a perspective once reserved for aircraft, now for the institutions that work here." },
  ],
  ar: [
    { n: "٠١", title: "النور",
      body: "الشكل غير المتماثل قرارٌ بيئيٌّ لا جماليٌّ فحسب. شمس الكويت الجنوبيّة الأقسى في دول الخليج تمتصّها كتلة برج الحمراء الحجريّة — فلا تواجهها نافذة مكتبٍ واحدة. كلّ مساحة عملٍ تستقبل ضوءاً ألطفَ من الشمال أو الشرق أو الغرب، يؤطّره الخليج أو تؤطّره المدينة." },
    { n: "٠٢", title: "السكون",
      body: "ابتداءً من لوبي السماء عند الطابق الثلاثين، تتحوّل حركة شرق إلى فكرةٍ بعيدة. وعند الطابق الخامس والخمسين، تكفّ المدينة عن الكلام. أمّا صالة السماء على ارتفاع ٣٥١ متراً فتمنح هدوءاً لا نظير له في الكويت — على ارتفاعٍ يصير فيه الحديث، لا الانتقال، هو ما يصوغ اليوم." },
    { n: "٠٣", title: "النقطة العليا",
      body: "جون الكويت شمالاً. الخليج العربيّ شرقاً. أفق الصحراء غرباً. من الثلث الأعلى للبرج، تتجلّى الثلاثة جميعاً من نافذةٍ واحدة — منظورٌ كان حكراً على الطائرات، صار اليوم للمؤسسات التي تعمل من هنا." },
  ],
} as const;

export function Perspectives() {
  const { lang } = useI18n();
  const items = PERSP_CONTENT[lang];
  return (
    <PatternBackground opacity={0.25} style={{ background: "#fff", borderTop: "1px solid rgba(29,29,27,0.07)" }}>
      <div className="grid-3col">
        {items.map(({ n, title, body }, i) => (
          <ScrollReveal key={n} delay={i * 0.1}>
            <div
              style={{ padding: "52px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", transition: "background 0.3s", height: "100%" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
            >
              <div style={{ fontFamily: FONT, fontSize: 44, fontWeight: 300, color: "#EDEDED", lineHeight: 1, marginBottom: 16 }}>{n}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#1D1D1B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
              <div style={{ fontFamily: FONT, fontSize: "12.5px", color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </PatternBackground>
  );
}

// ── FLOOR CONFIGURATIONS ──────────────────────────────────
const FLOORS_CONTENT = {
  en: [
    { code: "Configuration 01", title: "Ministerial Suite", size: "250–500 m²", body: "Corner office configuration with panoramic city views and private meeting room. Ideal for regional offices and professional firms." },
    { code: "Configuration 02", title: "Sovereign Floor",      size: "1,200–1,800 m²", body: "Entire floor exclusivity with private elevator access and dedicated reception. 3.2m ceiling height with 360° views." },
    { code: "Configuration 03", title: "Flagship Headquarters",   size: "3,000+ m²", body: "Multiple floors with building signage rights and dedicated parking levels. Kuwait's premier headquarters address." },
  ],
  ar: [
    { code: "التصميم ٠١", title: "الجناح الوزاري",      size: "٢٥٠–٥٠٠ م²",    body: "مكتبٌ زاويٌّ بإطلالاتٍ بانوراميّة على المدينة، وغرفة اجتماعاتٍ خاصّة. خيارٌ مثاليٌّ للمكاتب الإقليميّة والشركات المهنيّة." },
    { code: "التصميم ٠٢", title: "الطابق السياديّ",      size: "١٬٢٠٠–١٬٨٠٠ م²", body: "حصرية الطابق بأكمله، مع وصولٍ خاصٍّ بالمصاعد، ومكتب استقبالٍ مخصَّص. ارتفاع سقفٍ ٣٫٢ متر، وإطلالاتٌ بزاوية ٣٦٠ درجة." },
    { code: "التصميم ٠٣", title: "المقرّ الرئيسيّ",       size: "أكثر من ٣٬٠٠٠ م²", body: "طوابقُ متعدّدة، مع حقوق وضع اللوحات الإعلانيّة على المبنى، وطوابق مواقفَ مخصَّصة. أرقى عناوين المقرّات الرئيسيّة في الكويت." },
  ],
} as const;

export function FloorConfigs() {
  const { lang } = useI18n();
  const items = FLOORS_CONTENT[lang];
  return (
    <PatternBackground opacity={0.28} style={{ background: "#FAFAFA" }}>
      <div className="grid-3col">
      {items.map(({ code, title, size, body }, i) => (
        <ScrollReveal key={code} delay={i * 0.1}>
          <div
            style={{ padding: "56px 48px", borderRight: i < 2 ? "1px solid rgba(29,29,27,0.09)" : "none", borderTop: "1px solid rgba(29,29,27,0.09)", position: "relative", overflow: "hidden", transition: "background 0.3s", height: "100%" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#fff";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.height = "100%";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "#FAFAFA";
              const bar = e.currentTarget.querySelector(".left-bar") as HTMLElement;
              if (bar) bar.style.height = "0";
            }}
          >
            <div className="left-bar" style={{ position: "absolute", top: 0, left: 0, width: 2, height: 0, background: "#1D1D1B", transition: "height 0.4s ease" }} />
            <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 16 }}>{code}</div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 500, color: "#1D1D1B", marginBottom: 12, letterSpacing: "0.04em" }}>{title}</div>
            <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 300, color: "#6B6B6B", lineHeight: 1, marginBottom: 16 }}>{size}</div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: "#6B6B6B", lineHeight: 1.8 }}>{body}</div>
          </div>
        </ScrollReveal>
      ))}
      </div>
    </PatternBackground>
  );
}

// ── LEASING BAND ──────────────────────────────────────────
const LEASING_BAND_CONTENT = {
  en: {
    kicker: "Leasing Opportunities",
    h1: "Secure your position",
    h2: "at Kuwait's",
    h3: "premier address",
    body: "Whether you require a full-floor headquarters, a customised configuration, or a long-term corporate base — our leasing team will guide you through available opportunities.",
    primary: "Request Availability",
    secondary: "Download Brochure",
  },
  ar: {
    kicker: "فرص التأجير",
    h1: "احجز موقعك",
    h2: "في أرقى",
    h3: "عناوين الكويت",
    body: "سواء أرغبت في مقرٍّ رئيسيٍّ يشغل طابقاً كاملاً، أو تصميمٍ مخصَّصٍ يلائم احتياجاتك، أو قاعدةٍ مؤسسيّة طويلة الأمد — فإنّ فريق التأجير لدينا يرافقك في استكشاف الخيارات المتاحة.",
    primary: "اطلب الاطلاع على المتاح",
    secondary: "تحميل الكتيّب",
  },
} as const;

export function LeasingBand() {
  const { lang } = useI18n();
  const c = LEASING_BAND_CONTENT[lang];
  return (
    <section
      id="leasing"
      className="leasing-band" style={{ background:"#1D1D1B" }}
    >
      <ScrollReveal>
        <div style={{ maxWidth: 500 }}>
          <p style={{ fontFamily: FONT, fontSize: "10.5px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>
            {c.kicker}
          </p>
          <h3 style={{ fontFamily: FONT, fontSize: "clamp(24px, 2.5vw, 42px)", fontWeight: 200, color: "#fff", lineHeight: 1.25, marginBottom: 0 }}>
            {c.h1}<br />{c.h2}<br />
            <strong style={{ fontWeight: 500 }}>{c.h3}</strong>
          </h3>
          <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 16 }}>
            {c.body}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          <Link
            to="/leasing"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#fff", color: "#1D1D1B",
              fontFamily: FONT, fontSize: "10.5px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "16px 36px", textDecoration: "none", whiteSpace: "nowrap",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {c.primary}
          </Link>
          <Link
            to="/leasing/downloads"
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              color: "rgba(255,255,255,0.45)",
              fontFamily: FONT, fontSize: "10.5px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textDecoration: "none", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <span style={{ width: 36, height: 1, background: "currentColor", transition: "width 0.3s" }} />
            {c.secondary}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ── CONTACT STRIP ──────────────────────────────────────────
const CONTACT_STRIP_CONTENT = {
  en: [
    { label: "Phone",   value: "+965 2227 5000" },
    { label: "Email",   value: "leasing@alhamratower.com" },
    { label: "Hours",   value: "Sun – Thu · 8:00 AM – 6:00 PM" },
    { label: "Address", value: "Jaber Al Mubarak Street, Sharq, Kuwait City" },
  ],
  ar: [
    { label: "الهاتف",          value: "+٩٦٥ ٢٢٢٧ ٥٠٠٠" },
    { label: "البريد الإلكتروني", value: "leasing@alhamratower.com" },
    { label: "ساعات العمل",      value: "الأحد – الخميس · ٨:٠٠ صباحاً – ٦:٠٠ مساءً" },
    { label: "العنوان",          value: "شارع جابر المبارك، منطقة شرق، مدينة الكويت" },
  ],
} as const;

export function ContactStrip() {
  const { lang } = useI18n();
  const items = CONTACT_STRIP_CONTENT[lang];
  return (
    <PatternBackground opacity={0.3} style={{ borderTop: "1px solid rgba(29,29,27,0.09)", background: "#fff" }}>
      <div className="grid-4col">
        {items.map(({ label, value }, i) => (
          <ScrollReveal key={label} delay={i * 0.1}>
            <div style={{ padding: "44px 48px", borderRight: "1px solid rgba(29,29,27,0.09)", height: "100%" }}>
              <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 12 }}>{label}</div>
              <div style={{ fontFamily: FONT, fontSize: "14.5px", fontWeight: 300, color: "#1D1D1B" }}>{value}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </PatternBackground>
  );
}
