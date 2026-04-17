import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useT } from "@/lib/i18n";

/* ── AwardsStrip ──────────────────────────────────────────────────────
   burjkhalifa.ae/the-tower/ has a brilliant moment: 3 MASSIVE numbers
   shown as "FLOORS / VISITORS PER YEAR / HIGH" with award logos below
   in a strip. Numbers read like monuments.

   Adapted for Al Hamra's actual record-holding stats:
   - 412.6 m        HEIGHT
   - 258,000 m²     LIMESTONE (world record stone cladding)
   - 80             FLOORS

   Awards row: SOM / CTBUH / LEED Gold / Guinness / ENR as small text
   chips (since we don't have actual logos).
──────────────────────────────────────────────────────────────────────── */

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const MONUMENTS = [
  { raw: 412,    display: "412",     unit: ".6 m",    labelKey: "awards.monuments.height.label",    subKey: "awards.monuments.height.sub"    },
  { raw: 258000, display: "258,000", unit: " m²",     labelKey: "awards.monuments.limestone.label", subKey: "awards.monuments.limestone.sub" },
  { raw: 80,     display: "80",      unit: "",        labelKey: "awards.monuments.floors.label",    subKey: "awards.monuments.floors.sub"    },
];

const RECOGNITION = [
  { labelKey: "awards.recognition.som.label",      subKey: "awards.recognition.som.sub"      },
  { labelKey: "awards.recognition.ctbuh.label",    subKey: "awards.recognition.ctbuh.sub"    },
  { labelKey: "awards.recognition.guinness.label", subKey: "awards.recognition.guinness.sub" },
  { labelKey: "awards.recognition.leed.label",     subKey: "awards.recognition.leed.sub"     },
  { labelKey: "awards.recognition.enr.label",      subKey: "awards.recognition.enr.sub"      },
];

function useCountUp(target: number, duration = 2000, delay = 0, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number, start: number | null = null;
    const timer = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - t, 4)) * target));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, delay, active]);
  return value;
}

function Monument({ m, i, active, t }: { m: typeof MONUMENTS[number]; i: number; active: boolean; t: (k: string) => string }) {
  const hasComma = m.display.includes(",");
  const counted  = useCountUp(m.raw, 2000, i * 150, active);
  const shown    = active ? (hasComma ? counted.toLocaleString("en-US") : String(counted)) : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1,
        padding: "clamp(32px,5vh,56px) clamp(20px,3vw,40px)",
        borderRight: i < 2 ? "1px solid rgba(200,185,154,0.15)" : "none",
        display: "flex", flexDirection: "column", gap: 8,
        textAlign: "center",
      }}
    >
      {/* Label top */}
      <div style={{
        fontFamily: CG, fontSize: "10px",
        letterSpacing: "0.4em", textTransform: "uppercase",
        color: PEARL, marginBottom: 6,
      }}>
        {t(m.labelKey)}
      </div>

      {/* THE NUMBER — monumental */}
      <div style={{
        fontFamily: CG, fontWeight: 200,
        fontSize: "clamp(54px,8vw,120px)",
        color: "#fff",
        lineHeight: 1,
        letterSpacing: "-0.03em",
      }}>
        {shown}
        <span style={{
          fontFamily: CG,
          fontSize: "clamp(18px,2.5vw,36px)",
          fontWeight: 200, color: PEARL,
          letterSpacing: "-0.01em",
        }}>{m.unit}</span>
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: CG, fontSize: "11px",
        color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.1em",
        marginTop: 8,
      }}>
        {t(m.subKey)}
      </div>
    </motion.div>
  );
}

export function AwardsStrip() {
  const t = useT();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{
      background: "#0F0E0C",
      padding: "clamp(72px,10vh,120px) clamp(24px,5vw,80px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient gold glow — centre */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(200,185,154,0.06) 0%, transparent 60%)",
      }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14, marginBottom: "clamp(40px,5vh,64px)",
          }}
        >
          <span style={{ width: 32, height: 1, background: PEARL }} />
          <span style={{
            fontFamily: CG, fontSize: "11px", letterSpacing: "0.4em",
            textTransform: "uppercase", color: PEARL,
          }}>
            {t("awards.kicker")}
          </span>
          <span style={{ width: 32, height: 1, background: PEARL }} />
        </motion.div>

        {/* 3 monumental numbers */}
        <div style={{
          display: "flex",
          alignItems: "stretch",
          marginBottom: "clamp(64px,9vh,96px)",
          borderTop: "1px solid rgba(200,185,154,0.15)",
          borderBottom: "1px solid rgba(200,185,154,0.15)",
        }} className="monuments-row">
          {MONUMENTS.map((m, i) => (
            <Monument key={m.labelKey} m={m} i={i} active={inView} t={t} />
          ))}
        </div>

        {/* Awards / recognition row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div style={{
            textAlign: "center",
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.38em", textTransform: "uppercase",
            color: PEARL_TEXT, marginBottom: 28,
          }}>
            {t("awards.recognitionKicker")}
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(16px,3vw,48px)",
            alignItems: "center",
          }}>
            {RECOGNITION.map((r, i) => (
              <motion.div
                key={r.labelKey}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                style={{
                  textAlign: "center",
                  padding: "8px 4px",
                  position: "relative",
                }}
              >
                <div style={{
                  fontFamily: CG, fontSize: "clamp(11px,1vw,13px)",
                  fontWeight: 400, color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                  whiteSpace: "nowrap",
                }}>
                  {t(r.labelKey)}
                </div>
                <div style={{
                  fontFamily: CG, fontSize: "9px",
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(200,185,154,0.45)",
                }}>
                  {t(r.subKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .monuments-row {
            flex-direction: column !important;
          }
          .monuments-row > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(200,185,154,0.15) !important;
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
          .monuments-row > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
