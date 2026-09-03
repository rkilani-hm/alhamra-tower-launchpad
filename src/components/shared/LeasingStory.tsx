import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Editable, SlotVideo } from "@/lib/EditMode";

/* ── LeasingStory ──────────────────────────────────────────────────────
   A pinned, scroll-driven story section modelled on the home ScrollPanRows:
   the frame holds still (video right, text left) while each slide holds,
   then crossfades to the next as the visitor scrolls. Media here is VIDEO
   (SlotVideo — CMS-swappable). Degrades to a plain stack under reduced-motion.
──────────────────────────────────────────────────────────────────────── */

const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const DARK  = "#1D1D1B";
const MUTED = "#6B6B6B";
const PEARL = "#B9B9B7";
const RED   = "#CD1719";

type StoryRow = { video: string; eyebrow?: string; heading: string; body: string };

const ROWS: Record<string, StoryRow[]> = {
  en: [
    { video: "/assets/tower-drone.mp4", eyebrow: "The Outlook",
      heading: "Space that reads the horizon.",
      body: "Every floor plate is wrapped in full-height glass to the north, east and west — the Arabian Gulf and Kuwait City in every direction, all day long." },
    { video: "/assets/opt/office-flex.mp4", eyebrow: "The Layout",
      heading: "Configured around your team.",
      body: "Column-free plates flex from a single executive suite to a full-floor headquarters — fitted out to your brief, with nothing in the way." },
    { video: "/assets/opt/office-floor-reception.mp4", eyebrow: "The Address",
      heading: "An address that works for you.",
      body: "Valet arrival, 2,000+ parking spaces, the Luxury Centre and the Sky Lounge — everything handled before the lift doors even open." },
  ],
  ar: [
    { video: "/assets/tower-drone.mp4", eyebrow: "الإطلالة",
      heading: "مساحةٌ تقرأ الأفق.",
      body: "كلّ طابقٍ محاطٌ بزجاجٍ بكامل الارتفاع نحو الشمال والشرق والغرب — الخليج العربيّ ومدينة الكويت في كلّ اتّجاه، طوال اليوم." },
    { video: "/assets/opt/office-flex.mp4", eyebrow: "التصميم",
      heading: "مُهيّأةٌ حول فريقك.",
      body: "طوابق خالية من الأعمدة تتكيّف من جناحٍ تنفيذيٍّ واحد إلى مقرٍّ بطابقٍ كامل — مُجهّزة وفق متطلّباتك، دون أيّ عائق." },
    { video: "/assets/opt/office-floor-reception.mp4", eyebrow: "العنوان",
      heading: "عنوانٌ يعمل لصالحك.",
      body: "وصولٌ بخدمة الڤاليه، وأكثر من ٢٬٠٠٠ موقف، والمركز التجاريّ وصالة السماء — كلّ شيءٍ مُيسَّرٌ قبل أن تُفتح أبواب المصعد." },
  ],
};

function useSlideAnim(index: number, n: number, progress: MotionValue<number>) {
  const seg = n > 1 ? 1 / (n - 1) : 1;
  const center = n > 1 ? index / (n - 1) : 0.5;
  const P = seg * 0.32;
  const range = [center - (seg - P), center - P, center + P, center + (seg - P)];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [52, 0, 0, -52]);
  return { opacity, y };
}

function VideoSlide({ row, index, n, progress, single }: { row: StoryRow; index: number; n: number; progress: MotionValue<number>; single: boolean }) {
  const { opacity } = useSlideAnim(index, n, progress);
  return (
    <motion.div style={{ position: "absolute", inset: 0, opacity: single ? 1 : opacity }}>
      <SlotVideo
        slot={`leasingStory.row${index}`}
        fallback={row.video}
        autoPlay muted loop playsInline
        aria-label={row.heading}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(12,11,9,0.35) 0%, transparent 45%)" }} />
    </motion.div>
  );
}

function TextSlide({ row, index, n, progress }: { row: StoryRow; index: number; n: number; progress: MotionValue<number> }) {
  const { opacity, y } = useSlideAnim(index, n, progress);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none")) as unknown as "auto" | "none";
  return (
    <motion.div style={{ position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, top: "50%", translateY: "-50%", opacity, y, pointerEvents }}>
      {row.eyebrow && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <span style={{ width: 30, height: 1, background: PEARL }} />
          <span style={{ fontFamily: FONT, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.32em", textTransform: "uppercase", color: RED }}>
            <Editable id={`page_prose:leasingStory:rows.${index}.eyebrow`}>{row.eyebrow}</Editable>
          </span>
        </div>
      )}
      <h3 style={{ fontFamily: FONT, fontWeight: 300, fontSize: "clamp(30px,3.6vw,54px)",
        color: DARK, lineHeight: 1.12, letterSpacing: "-0.02em", margin: 0,
        textWrap: "balance", maxWidth: 460 }}>
        <Editable id={`page_prose:leasingStory:rows.${index}.heading`}>{row.heading}</Editable>
      </h3>
      <p style={{ fontFamily: FONT, fontSize: "clamp(14px,1.05vw,16px)", fontWeight: 300,
        color: MUTED, lineHeight: 1.85, marginTop: 22, marginBottom: 0, maxWidth: 420, textWrap: "pretty" }}>
        <Editable id={`page_prose:leasingStory:rows.${index}.body`}>{row.body}</Editable>
      </p>
    </motion.div>
  );
}

export function LeasingStory() {
  const { lang } = useI18n();
  const reduce = useReducedMotion();
  const rows = ROWS[lang] ?? ROWS.en;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = Math.max(rows.length, 1);

  if (reduce) {
    return (
      <section style={{ background: "#fff", padding: "clamp(64px,9vh,110px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(48px,7vh,88px)" }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="lstory-grid">
              <div className="lstory-media" style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "#0c0b09", gridColumn: i % 2 === 1 ? 2 : 1, gridRow: 1 }}>
                <SlotVideo slot={`leasingStory.row${i}`} fallback={row.video} autoPlay muted loop playsInline
                  aria-label={row.heading} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="lstory-text" style={{ gridColumn: i % 2 === 1 ? 1 : 2, gridRow: 1 }}>
                {row.eyebrow && <div style={{ fontFamily: FONT, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", color: RED, marginBottom: 14 }}><Editable id={`page_prose:leasingStory:rows.${i}.eyebrow`}>{row.eyebrow}</Editable></div>}
                <h3 style={{ fontFamily: FONT, fontWeight: 300, fontSize: "clamp(24px,3vw,42px)", color: DARK, margin: 0, lineHeight: 1.14, textWrap: "balance" }}><Editable id={`page_prose:leasingStory:rows.${i}.heading`}>{row.heading}</Editable></h3>
                <p style={{ fontFamily: FONT, fontSize: "15px", fontWeight: 300, color: MUTED, lineHeight: 1.85, marginTop: 16, textWrap: "pretty", maxWidth: 460 }}><Editable id={`page_prose:leasingStory:rows.${i}.body`}>{row.body}</Editable></p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width:820px){.lstory-grid{grid-template-columns:1fr !important;gap:22px !important}.lstory-grid .lstory-media{grid-column:1 !important;grid-row:1 !important}.lstory-grid .lstory-text{grid-column:1 !important;grid-row:2 !important}}`}</style>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ position: "relative", height: `${n * 95}vh`, background: "#fff" }}>
      <div className="lstory-sticky" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#fff" }}>
        {/* Right — steady video frame, crossfading slides */}
        <div className="lstory-vid" style={{
          position: "absolute", top: "clamp(24px,6vh,72px)", bottom: "clamp(24px,6vh,72px)",
          insetInlineEnd: 0, width: "50%", overflow: "hidden", background: "#0c0b09",
        }}>
          {rows.map((row, i) => <VideoSlide key={i} row={row} index={i} n={n} progress={scrollYProgress} single={n === 1} />)}
        </div>

        {/* Left — crossfading text, constant frame */}
        <div className="lstory-copy" style={{
          position: "absolute", insetInlineStart: "clamp(28px,6vw,110px)", top: 0, bottom: 0,
          width: "min(40%, 500px)", display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ position: "relative", height: "min(48vh, 380px)" }}>
            {rows.map((row, i) => <TextSlide key={i} row={row} index={i} n={n} progress={scrollYProgress} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .lstory-vid { position: relative !important; top: 0 !important; bottom: auto !important; width: 100% !important; height: 42vh; inset-inline-end: auto !important; }
          .lstory-copy { position: relative !important; inset-inline-start: 0 !important; width: 100% !important; padding: 28px clamp(24px,6vw,40px) 40px; }
          .lstory-sticky { display: flex; flex-direction: column; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
