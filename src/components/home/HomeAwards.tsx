import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Editable } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

/* ═════════════════════════════════════════════════════════════════════════
   HOME — PRIZES & AWARDS
   ────────────────────────────────────────────────────────────────────────
   Leasing-credibility section for the Al Hamra Business Tower home page.
   Text-forward award cards (no fabricated award-logo imagery) in a clean
   typographic grid, closed by an ISO / certified-operations strip.

   Bilingual (EN / AR) via a local CONTENT dictionary keyed off useI18n().
   Award-body names stay in Latin script in both languages; only the year
   (identical) and the descriptor are translated.
═════════════════════════════════════════════════════════════════════════ */

const FONT =
  "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const PEARL_TEXT = "#CD1719";
const DARK = "#1D1D1B";
const MUTED = "#6B6B6B";

interface AwardCard {
  year: string;
  title: string;
  desc: string;
}

interface AwardsContent {
  eyebrow: string;
  heading: string;
  intro: string;
  cards: AwardCard[];
  isoLabel: string;
  isoText: string;
}

const CONTENT: Record<"en" | "ar", AwardsContent> = {
  en: {
    eyebrow: "Recognition",
    heading: "Prizes & awards.",
    intro:
      "An address validated by the industry, and operated to certified international standards.",
    cards: [
      { year: "2012", title: "CTBUH Award", desc: "Best Tall Building, Middle East" },
      { year: "2011", title: "Time Magazine", desc: "Best Inventions of the Year" },
      { year: "2014", title: "Emirates Glass LEAF Award", desc: "International architecture recognition" },
      { year: "2019", title: "World Architecture Festival", desc: "Completed Buildings" },
    ],
    isoLabel: "Certified Operations",
    isoText:
      "The tower is managed to certified international standards for quality, safety and environmental management (ISO).",
  },
  ar: {
    eyebrow: "التقدير",
    heading: "الجوائز والتقدير.",
    intro: "عنوانٌ يشهد له القطاع، ويُدار وفق معايير دولية معتمدة.",
    cards: [
      { year: "2012", title: "CTBUH Award", desc: "أفضل مبنى شاهق، الشرق الأوسط" },
      { year: "2011", title: "Time Magazine", desc: "أفضل اختراعات العام" },
      { year: "2014", title: "Emirates Glass LEAF Award", desc: "تقدير معماري دولي" },
      { year: "2019", title: "World Architecture Festival", desc: "المباني المكتملة" },
    ],
    isoLabel: "تشغيل معتمد",
    isoText:
      "يُدار البرج وفق معايير دولية معتمدة للجودة والسلامة والإدارة البيئية (ISO).",
  },
};

export function HomeAwards() {
  const { lang } = useI18n();
  const c = usePageContent<any>("home2awards", CONTENT[lang] ?? CONTENT.en, lang);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        background: "#FAFAFA",
        padding: "clamp(80px,12vh,140px) clamp(28px,6vw,96px)",
      }}
    >
      <div ref={ref} style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Eyebrow — hairline gold bar + uppercase gold label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <span style={{ width: 32, height: 1, background: PEARL_TEXT }} />
          <span
            style={{
              fontFamily: FONT,
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: PEARL_TEXT,
            }}
          >
            <Editable id="page_prose:home2awards:eyebrow">{c.eyebrow}</Editable>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONT,
            fontWeight: 200,
            fontSize: "clamp(24px,3vw,44px)",
            lineHeight: 1.16,
            letterSpacing: "-0.018em",
            color: DARK,
            marginBottom: 16,
            textWrap: "balance",
          }}
        >
          <Editable id="page_prose:home2awards:heading">{c.heading}</Editable>
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONT,
            fontSize: "clamp(14px,1.1vw,16px)",
            fontWeight: 300,
            color: MUTED,
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: "clamp(40px,5vh,64px)",
            textWrap: "pretty",
          }}
        >
          <Editable id="page_prose:home2awards:intro">{c.intro}</Editable>
        </motion.p>

        {/* Award card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "clamp(16px,2vw,28px)",
          }}
        >
          {c.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                background: "#fff",
                border: "1px solid rgba(29,29,27,0.10)",
                padding: "clamp(24px,2.4vw,34px)",
              }}
            >
              {/* Year */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  color: PEARL_TEXT,
                }}
              >
                <Editable id={`page_prose:home2awards:cards.${i}.year`}>{card.year}</Editable>
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: "16px",
                  fontWeight: 400,
                  color: DARK,
                  lineHeight: 1.3,
                  marginTop: 8,
                }}
              >
                <Editable id={`page_prose:home2awards:cards.${i}.title`}>{card.title}</Editable>
              </div>

              {/* Descriptor */}
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: "12.5px",
                  fontWeight: 300,
                  color: MUTED,
                  lineHeight: 1.7,
                  marginTop: 10,
                  textWrap: "pretty",
                }}
              >
                <Editable id={`page_prose:home2awards:cards.${i}.desc`}>{card.desc}</Editable>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ISO / certified-operations strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderTop: "1px solid rgba(29,29,27,0.10)",
            marginTop: "clamp(32px,4vh,56px)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: PEARL_TEXT,
              marginBottom: 12,
            }}
          >
            <Editable id="page_prose:home2awards:isoLabel">{c.isoLabel}</Editable>
          </div>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(14px,1.1vw,16px)",
              fontWeight: 300,
              color: MUTED,
              lineHeight: 1.8,
              maxWidth: 720,
              margin: 0,
              textWrap: "pretty",
            }}
          >
            <Editable id="page_prose:home2awards:isoText">{c.isoText}</Editable>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeAwards;
