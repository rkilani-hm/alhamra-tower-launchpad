import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Editable, SlotImage, useEditMode } from "@/lib/EditMode";

/* ──────────────────────────────────────────────────────────────────────────
   ScrollPanRows — a pinned "Experiences Nearby" story section. The layout frame
   stays put: a fixed eyebrow + text on the left, a large full-bleed image on the
   right. As the visitor scrolls, each slide HOLDS (fully readable, constant
   size), then its heading/body fade + slide up and out while the next fades +
   slides up from below. Images and text keep the SAME size throughout (no
   clipping, no scaling) — only opacity and a small vertical slide change. Driven
   by framer-motion's useScroll. Under prefers-reduced-motion it degrades to a
   plain vertical stack.
────────────────────────────────────────────────────────────────────────────── */

const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";
const DARK  = "#1D1D1B";
const MUTED = "#6B6B6B";
const PEARL = "#C8B99A";
const PEARL_TEXT = "#CD1719";

export type PanRow = { img: string; eyebrow?: string; heading: string; body: string };

/* Hold-then-crossfade: each slide holds full opacity across ~64% of its segment,
   then crossfades with its neighbour at the boundary while sliding vertically. */
function useSlideAnim(index: number, n: number, progress: MotionValue<number>) {
  const seg = n > 1 ? 1 / (n - 1) : 1;
  const center = n > 1 ? index / (n - 1) : 0.5;
  const P = seg * 0.32; // half-width of the full-opacity hold
  const range = [center - (seg - P), center - P, center + P, center + (seg - P)];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [52, 0, 0, -52]);
  return { opacity, y };
}

function SlideText({ row, index, n, progress, idBase }: { row: PanRow; index: number; n: number; progress: MotionValue<number>; idBase?: string }) {
  const { opacity, y } = useSlideAnim(index, n, progress);
  return (
    <motion.div style={{ position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, top: "50%", translateY: "-50%", opacity, y }}>
      <h3 style={{
        fontFamily: FONT, fontWeight: 300, fontSize: "clamp(30px,3.6vw,54px)",
        color: DARK, lineHeight: 1.12, letterSpacing: "-0.02em", margin: 0,
        textWrap: "balance", maxWidth: 460,
      }}>{idBase ? <Editable id={`page_prose:${idBase}:rows.${index}.heading`}>{row.heading}</Editable> : row.heading}</h3>
      {row.eyebrow && (
        <div style={{ fontFamily: FONT, fontSize: "clamp(16px,1.5vw,21px)", fontWeight: 400, color: DARK, marginTop: 20, letterSpacing: "0.01em" }}>
          {idBase ? <Editable id={`page_prose:${idBase}:rows.${index}.eyebrow`}>{row.eyebrow}</Editable> : row.eyebrow}
        </div>
      )}
      <p style={{
        fontFamily: FONT, fontSize: "clamp(14px,1.05vw,16px)", fontWeight: 300,
        color: MUTED, lineHeight: 1.85, marginTop: 22, marginBottom: 0,
        maxWidth: 420, textWrap: "pretty",
      }}>{idBase ? <Editable id={`page_prose:${idBase}:rows.${index}.body`}>{row.body}</Editable> : row.body}</p>
    </motion.div>
  );
}

function SlideImage({ row, index, n, progress, idBase }: { row: PanRow; index: number; n: number; progress: MotionValue<number>; idBase?: string }) {
  const { opacity, y } = useSlideAnim(index, n, progress);
  return (
    <motion.div style={{ position: "absolute", inset: 0, opacity, y, overflow: "hidden", background: "#0c0b09" }}>
      {idBase
        ? <SlotImage motion slot={`${idBase}.row${index}`} fallback={row.img} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        : <img src={row.img} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
    </motion.div>
  );
}

export function ScrollPanRows({ rows, title, idBase, titleId, titleSize, titleSizeId }: { rows: PanRow[]; title?: string; idBase?: string; titleId?: string; titleSize?: string; titleSizeId?: string }) {
  const reduce = useReducedMotion();
  const { enabled } = useEditMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = Math.max(rows.length, 1);

  // Reduced-motion fallback: a plain vertical stack of image + text rows.
  if (reduce) {
    return (
      <section style={{ background: "#fff", padding: "clamp(64px,9vh,110px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(48px,7vh,88px)" }}>
          {title && <h2 style={{ fontFamily: FONT, fontWeight: 300, fontSize: "clamp(20px,2.4vw,34px)", color: DARK, margin: 0 }}>{titleId ? <Editable id={titleId}>{title}</Editable> : title}</h2>}
          {rows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="pan-panel-grid">
              <div className="pan-img" style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "#0c0b09", gridColumn: i % 2 === 1 ? 2 : 1, gridRow: 1 }}>
                {idBase
                  ? <SlotImage motion slot={`${idBase}.row${i}`} fallback={row.img} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  : <img src={row.img} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div className="pan-text" style={{ gridColumn: i % 2 === 1 ? 1 : 2, gridRow: 1 }}>
                <h3 style={{ fontFamily: FONT, fontWeight: 300, fontSize: "clamp(24px,3vw,42px)", color: DARK, margin: 0, lineHeight: 1.14, textWrap: "balance" }}>{idBase ? <Editable id={`page_prose:${idBase}:rows.${i}.heading`}>{row.heading}</Editable> : row.heading}</h3>
                {row.eyebrow && <div style={{ fontFamily: FONT, fontSize: "18px", color: DARK, marginTop: 14 }}>{idBase ? <Editable id={`page_prose:${idBase}:rows.${i}.eyebrow`}>{row.eyebrow}</Editable> : row.eyebrow}</div>}
                <p style={{ fontFamily: FONT, fontSize: "15px", fontWeight: 300, color: MUTED, lineHeight: 1.85, marginTop: 16, textWrap: "pretty", maxWidth: 460 }}>{idBase ? <Editable id={`page_prose:${idBase}:rows.${i}.body`}>{row.body}</Editable> : row.body}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width:820px){.pan-panel-grid{grid-template-columns:1fr !important;gap:22px !important}.pan-panel-grid .pan-img{grid-column:1 !important;grid-row:1 !important}.pan-panel-grid .pan-text{grid-column:1 !important;grid-row:2 !important}}`}</style>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ position: "relative", height: `${n * 95}vh`, background: "#fff" }}>
      <div className="story-sticky" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#fff" }}>
        {/* Right — full-bleed image, constant size, crossfading slides */}
        <div className="story-img" style={{
          position: "absolute", top: "clamp(24px,6vh,72px)", bottom: "clamp(24px,6vh,72px)",
          insetInlineEnd: 0, width: "50%", overflow: "hidden", background: "#0c0b09",
        }}>
          {rows.map((row, i) => <SlideImage key={i} row={row} index={i} n={n} progress={scrollYProgress} idBase={idBase} />)}
        </div>

        {/* Left — fixed eyebrow + crossfading text, constant size */}
        <div className="story-text" style={{
          position: "absolute", insetInlineStart: "clamp(28px,6vw,110px)", top: 0, bottom: 0,
          width: "min(40%, 500px)", display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {title && (
            <div style={{ position: "absolute", top: "calc(50% - min(30vh, 250px))", insetInlineStart: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 30, height: 1, background: PEARL }} />
                <span style={{ fontFamily: FONT, fontSize: titleSize || "11px", fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: PEARL_TEXT }}>
                  {titleId ? <Editable id={titleId}>{title}</Editable> : title}
                </span>
              </div>
              {enabled && titleSizeId && (
                <div style={{ fontFamily: FONT, fontSize: "10px", color: "#8a857b", letterSpacing: "0.05em" }}>
                  text size:&nbsp;<Editable id={titleSizeId}>{titleSize || "11px"}</Editable>
                </div>
              )}
            </div>
          )}
          <div style={{ position: "relative", height: "min(48vh, 380px)" }}>
            {rows.map((row, i) => <SlideText key={i} row={row} index={i} n={n} progress={scrollYProgress} idBase={idBase} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .story-img { position: relative !important; top: 0 !important; bottom: auto !important; width: 100% !important; height: 42vh; inset-inline-end: auto !important; }
          .story-text { position: relative !important; inset-inline-start: 0 !important; width: 100% !important; padding: 28px clamp(24px,6vw,40px) 40px; }
          .story-sticky { display: flex; flex-direction: column; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
