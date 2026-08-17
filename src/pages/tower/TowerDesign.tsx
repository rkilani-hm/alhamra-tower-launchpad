import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageLayout }  from "@/components/layout/PageLayout";
import { PageHero }    from "@/components/shared/PageHero";
import { useI18n, useContent } from "@/lib/i18n";
import { Editable, EditableRow, SlotImage } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";

const PEARL  = "#C8B99A";
const DARK   = "#1D1D1B";

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Bilingual content dictionary ─────────────────────────────────────
   Arabic copy sourced from V01 translation sheet (The Tower).
──────────────────────────────────────────────────────────────────────── */

interface SpecTableProps { cat: string; rows: readonly (readonly [string, string])[]; }
function SpecTable({ cat, rows }: SpecTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ marginBottom: 40 }}>
      <div style={{ fontFamily: FONT, fontSize: "10px",
        letterSpacing: "0.4em", textTransform: "uppercase", color: PEARL,
        marginBottom: 16, paddingBottom: 12,
        borderBottom: `1px solid rgba(200,185,154,0.25)` }}>{cat}</div>
      {rows.map(([label, value], i) => (
        <motion.div key={label}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          style={{ display: "flex", gap: 16,
            padding: "14px 0", borderBottom: i < rows.length-1 ? "1px solid rgba(29,29,27,0.06)" : "none" }}>
          <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
            color: "#6B6B6B", minWidth: 200, flexShrink: 0, letterSpacing: "0.05em" }}>{label}</div>
          <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
            color: DARK, fontWeight: 400 }}>
            <EditableRow id={`spec_rows::${label}`}>{value}</EditableRow>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function TowerDesign() {
  const { lang } = useI18n();
  const cStatic = useContent<any>("content.towerDesign");
  const c = usePageContent<any>("towerDesign", cStatic, lang);
  const facadeRef = useRef<HTMLDivElement>(null);
  const facadeInView = useInView(facadeRef, { once: true, margin: "-80px" });

  return (
    <PageLayout>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        image="/assets/tower-facade-up.jpg"
        crumbs={[{ label: c.crumbHome, href: "/" }, { label: c.crumbTower, href: "/tower" }]}
      />

      {/* ── The Dual Facade ─────────────────────────────────────── */}
      <div style={{ background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "60vh" }}
          className="design-grid-1">
          <div style={{ position: "relative", overflow: "hidden", background: "#0c0b09", minHeight: 360 }}>
            <SlotImage
              loading="lazy" slot="towerDesign.facade" fallback="/assets/facade-dual-glass-stone.jpg"
              alt={lang === "ar" ? "برج الحمراء — واجهةٌ مزدوجة: جدارٌ ستائريّ زجاجيّ وحجرُ الجوراسيك جنباً إلى جنب" : "Al Hamra Tower dual facade — glass curtain wall and Jura limestone side by side"}
              style={{ width: "100%", height: "100%", objectFit: "cover",
                objectPosition: "center", display: "block" }} />
          </div>
          <div ref={facadeRef}
            style={{ padding: "clamp(48px,8vh,96px) clamp(32px,5vw,80px)",
              display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={facadeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}>
              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 20 }}>
                <Editable id="page_prose:towerDesign:facadeKicker">{c.facadeKicker}</Editable>
              </div>
              <h2 style={{ fontFamily: FONT,
                fontWeight: 300, fontSize: "clamp(26px,3.5vw,48px)",
                color: DARK, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 24, whiteSpace: "pre-line" }}>
                <Editable id="page_prose:towerDesign:facadeHeadingLine1">{c.facadeHeadingLine1}</Editable>
              </h2>
              <p style={{ fontFamily: FONT, fontWeight: 300,
                fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
                lineHeight: 1.9, marginBottom: 20, maxWidth: 560 }}>
                <Editable id="page_prose:towerDesign:facadeP1Part1">{c.facadeP1Part1}</Editable>
                <strong style={{ color: DARK, fontWeight: 400 }}><Editable id="page_prose:towerDesign:facadeP1Strong">{c.facadeP1Strong}</Editable></strong>
              </p>
              <p style={{ fontFamily: FONT, fontWeight: 300,
                fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58", lineHeight: 1.9, marginBottom: 32, maxWidth: 560 }}>
                <Editable id="page_prose:towerDesign:facadeP2">{c.facadeP2}</Editable>
              </p>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {c.facadeStats.map(({ n, u, l }, i) => (
                  <div key={l}>
                    <div style={{ fontFamily: FONT,
                      fontSize: "clamp(24px,3vw,38px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
                      <EditableRow id={`stat_counters:towerDesign:towerDesign_${i}`}>{n}{u && <span style={{ fontFamily: FONT,
                        fontSize: "0.4em", color: PEARL, marginLeft: 3, fontWeight: 200 }}>{u}</span>}</EditableRow>
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: "10px",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "#6B6B6B", marginTop: 6 }}><EditableRow id={`stat_counters:towerDesign:towerDesign_${i}`}>{l}</EditableRow></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── The Lamella Lobby ───────────────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,100px)" }}
          className="design-grid-2">
          <div>
            <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
              letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 20 }}>
              <Editable id="page_prose:towerDesign:lamellaKicker">{c.lamellaKicker}</Editable>
            </div>
            <h2 style={{ fontFamily: FONT,
              fontWeight: 300, fontSize: "clamp(24px,3.2vw,44px)",
              color: DARK, lineHeight: 1.1, marginBottom: 24, whiteSpace: "pre-line" }}>
              <Editable id="page_prose:towerDesign:lamellaHeadingLine1">{c.lamellaHeadingLine1}</Editable>
            </h2>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 16 }}>
              <Editable id="page_prose:towerDesign:lamellaP1">{c.lamellaP1}</Editable>
            </p>
            <p style={{ fontFamily: FONT, fontWeight: 300,
              fontSize: "clamp(13px,1.05vw,15px)", color: "#5a5a58",
              lineHeight: 1.9, marginBottom: 28 }}>
              <Editable id="page_prose:towerDesign:lamellaP2">{c.lamellaP2}</Editable>
            </p>
            <div style={{ borderLeft: lang === "ar" ? "none" : `2px solid ${PEARL}`,
              borderRight: lang === "ar" ? `2px solid ${PEARL}` : "none",
              paddingLeft: lang === "ar" ? 0 : 20,
              paddingRight: lang === "ar" ? 20 : 0 }}>
              <p style={{ fontFamily: FONT, fontStyle: "italic",
                fontSize: "clamp(14px,1.3vw,18px)", color: DARK, lineHeight: 1.7, margin: 0 }}>
                <Editable id="page_prose:towerDesign:lamellaQuote">{c.lamellaQuote}</Editable>
              </p>
              <div style={{ fontFamily: FONT, fontSize: "10px",
                letterSpacing: "0.28em", textTransform: "uppercase", color: PEARL, marginTop: 10 }}>
                <Editable id="page_prose:towerDesign:lamellaQuoteCredit">{c.lamellaQuoteCredit}</Editable>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", minHeight: 480 }}>
            <div style={{ position: "relative", overflow: "hidden", flex: 2 }}>
              <SlotImage
              loading="lazy" slot="towerDesign.lobby" fallback="/assets/lobby-grand-lamella.jpg"
                alt={lang === "ar" ? "ردهةُ برج الحمراء — أقواسُ اللاميلا البيضاء، فضاءٌ بلا أعمدة بارتفاع 24م" : "Al Hamra Tower lobby — white lamella arches, 24m column-free atrium"}
                style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 360,
                  objectPosition: "center", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <div style={{ position: "relative", overflow: "hidden", height: "clamp(160px,14vw,220px)" }}>
                <SlotImage
              loading="lazy" slot="towerDesign.escalator" fallback="/assets/lobby-escalator-art.jpg"
                  alt={lang === "ar" ? "سلالمُ الحمراء الكهربائية ومنحوتةُ السقف الفولاذية" : "Al Hamra escalator and sculptural steel ceiling installation"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: FONT, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}><Editable id="page_prose:towerDesign:lobbyCaption1">{c.lobbyCaption1}</Editable></div>
              </div>
              <div style={{ position: "relative", overflow: "hidden", height: "clamp(160px,14vw,220px)" }}>
                <SlotImage
              loading="lazy" slot="towerDesign.trencadis" fallback="/assets/facade-trencadis-detail.jpg"
                  alt={lang === "ar" ? "واجهةُ برج الحمراء — تفصيلُ الحجر الجيريّ والترِنكاديس" : "Al Hamra Tower facade — limestone and trencadis mosaic detail"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: FONT, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,185,154,0.8)" }}><Editable id="page_prose:towerDesign:lobbyCaption2">{c.lobbyCaption2}</Editable></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full Specification Table ────────────────────────────── */}
      <div style={{ background: "#fff", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
            letterSpacing: "0.45em", textTransform: "uppercase", color: PEARL, marginBottom: 16 }}>
            <Editable id="page_prose:towerDesign:specKicker">{c.specKicker}</Editable>
          </div>
          <h2 style={{ fontFamily: FONT,
            fontWeight: 300, fontSize: "clamp(26px,3.5vw,48px)",
            color: DARK, lineHeight: 1.1 }}>
            <Editable id="page_prose:towerDesign:specHeading">{c.specHeading}</Editable>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)" }}
          className="spec-table-grid">
          <div>
            {c.specs.slice(0,3).map(s => <SpecTable key={s.cat} cat={s.cat} rows={s.rows as readonly (readonly [string, string])[]} />)}
          </div>
          <div>
            {c.specs.slice(3).map(s => <SpecTable key={s.cat} cat={s.cat} rows={s.rows as readonly (readonly [string, string])[]} />)}
          </div>
        </div>
      </div>

      {/* ── Drawings & Documentation ─────────────────────────────── */}
      <div style={{ background: "#FAFAFA", padding: "clamp(60px,9vh,100px) clamp(28px,6vw,96px)" }}>

        <div style={{ fontFamily: FONT,
          fontSize: "clamp(10px,0.85vw,11px)", letterSpacing: "0.45em",
          textTransform: "uppercase", color: PEARL, marginBottom: 48 }}>
          <Editable id="page_prose:towerDesign:drawingsKicker">{c.drawingsKicker}</Editable>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ marginBottom: 64 }}
        >
          <SlotImage
            slot="towerDesign.floorPlan" fallback="/assets/drawings/floor-plan-typical.jpg"
            alt={lang === "ar" ? "SOM — مخطّط طابق المكاتب النموذجيّ لبرج الحمراء، نحو 2,300م² صافي" : "SOM — Al Hamra Tower typical office floor plan, ~2,300 m² NLA per floor"}
            loading="lazy"
            style={{ width: "100%", display: "block", border: "1px solid rgba(29,29,27,0.07)" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginTop: 14, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: FONT,
              fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B" }}>
              <Editable id="page_prose:towerDesign:drawingsPlanLabel">{c.drawingsPlanLabel}</Editable>
            </div>
            <div style={{ fontFamily: FONT,
              fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: PEARL }}>
              <Editable id="page_prose:towerDesign:drawingsPlanNote">{c.drawingsPlanNote}</Editable>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div style={{ fontFamily: FONT,
            fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#6B6B6B", marginBottom: 20 }}>
            <Editable id="page_prose:towerDesign:drawingsElevKicker">{c.drawingsElevKicker}</Editable>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
            className="elevation-grid">
            {[
              { src: "/assets/drawings/south-wall-elevation.jpg", label: c.drawingsLabelSouth, fld: "drawingsLabelSouth" },
              { src: "/assets/drawings/massing-05-elevation.jpg", label: c.drawingsLabelContext, fld: "drawingsLabelContext" },
            ].map(({ src, label, fld }) => (
              <div key={label}>
                <SlotImage slot={`towerDesign.drawing.${fld}`} fallback={src} alt={label} loading="lazy"
                  style={{ width: "100%", display: "block", border: "1px solid rgba(29,29,27,0.07)" }} />
                <div style={{ fontFamily: FONT,
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#6B6B6B", marginTop: 12 }}><Editable id={`page_prose:towerDesign:${fld}`}>{label}</Editable></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .design-grid-1, .design-grid-2 { grid-template-columns: 1fr 1fr !important; }
        .spec-table-grid { grid-template-columns: 1fr 1fr !important; }
        .design-drawing-grid { grid-template-columns: 1fr 1fr !important; }
        .elevation-grid { grid-template-columns: 1fr 1fr !important; }

        .massing-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .massing-scroll::-webkit-scrollbar { height: 2px; }
        .massing-scroll::-webkit-scrollbar-track { background: rgba(29,29,27,0.05); }
        .massing-scroll::-webkit-scrollbar-thumb { background: rgba(200,185,154,0.5); border-radius: 1px; }
        .massing-item {
          flex: 0 0 auto;
          height: 340px;
          overflow: hidden;
          scroll-snap-align: start;
        }
        .massing-item img { object-fit: contain; }

        @media (max-width: 768px) {
          .design-grid-1, .design-grid-2 { grid-template-columns: 1fr !important; }
          .spec-table-grid { grid-template-columns: 1fr !important; }
          .design-drawing-grid { grid-template-columns: 1fr !important; }
          .elevation-grid { grid-template-columns: 1fr !important; }
          .massing-item { height: 240px; }
        }
      `}</style>
    </PageLayout>
  );
}
