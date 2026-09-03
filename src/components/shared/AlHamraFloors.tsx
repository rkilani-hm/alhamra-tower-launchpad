import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Editable, SlotVideo } from "@/lib/EditMode";

/* ── AlHamraFloors ─────────────────────────────────────────────────────
   Floor-by-floor explorer: a sticky vertical tower diagram (left) whose
   highlighted floor band + tier label track the tier panel in view (right)
   as the visitor scrolls. Original Al Hamra tower stack, data and copy,
   in Al Hamra corporate colours (red accent, dark panel). Bilingual,
   CMS-editable (text via <Editable>, media via SlotVideo).
──────────────────────────────────────────────────────────────────────── */

const RED   = "#CD1719";
const DARK  = "#1D1D1B";
const MUTED = "#6B6B6B";
const BODY  = "#5a5a58";
const FONT  = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

interface Tier {
  id: string;
  short: string;
  tier: string;
  range: string;
  blurb: string;
  bands: string[];      // floor sub-ranges, top → bottom
  features: string[];
  video: string;
  zone: { top: number; h: number };   // highlight band as % of the elevation image
}

/* Floor data taken from the Al Hamra "Section Through Tower" drawing:
   three elevator groups (Low / Mid / High Rise), each split into a Low Zone,
   a Crossover and a High Zone, with Sky Lobby 1 at Floor 30, Sky Lobby 2 at
   Floor 55 and the Sky Lounge at Floor 78. */
const TIERS: Record<string, Tier[]> = {
  en: [
    { id: "sky", short: "Sky Lounge", tier: "Sky Lounge", range: "Floor 78 · Summit",
      blurb: "The summit. The Sky Lounge crowns the tower at Level 78 — the highest dining room in Kuwait — sitting above the high-rise mechanical plant and the roof levels 79–80.",
      bands: ["78"],
      features: ["Sky Lounge at Floor 78 — the highest dining in Kuwait", "Roof plant at Levels 79–80", "Reached by dedicated express lifts"],
      video: "/assets/tower-drone.mp4", zone: { top: 5, h: 7 } },
    { id: "highrise", short: "High Rise", tier: "High Rise", range: "Floors 56–77 · Sky Lobby 2",
      blurb: "The high-rise group, reached from Sky Lobby 2 on Floor 55. A Low Zone, a Crossover floor and a High Zone lift tenants to within reach of the sky, above the mid-rise plant.",
      bands: ["66–75", "65", "56–64"],
      features: ["Served from Sky Lobby 2 · Floor 55", "High Zone 66–75 · Crossover 65 · Low Zone 56–64", "Mechanical Levels 76–77 · Refuge Floor 54"],
      video: "/assets/hero.mp4", zone: { top: 12, h: 18 } },
    { id: "midrise", short: "Mid Rise", tier: "Mid Rise", range: "Floors 31–55 · Sky Lobby 1",
      blurb: "The mid-rise group, served from Sky Lobby 1 on Floor 30. Efficient, column-free plates across a Low Zone, a Crossover and a High Zone up to Sky Lobby 2 at Floor 55.",
      bands: ["43–51", "42", "31–41"],
      features: ["Served from Sky Lobby 1 · Floor 30", "High Zone 43–51 · Crossover 42 · Low Zone 31–41", "Refuge & mechanical at Levels 52–54"],
      video: "/assets/opt/office-flex.mp4", zone: { top: 30, h: 24 } },
    { id: "lowrise", short: "Low Rise", tier: "Low Rise", range: "Floors 6–30 · Main Lobby",
      blurb: "The low-rise group, entered straight off the Main Lobby. Fast local lifts serve a Low Zone, a Crossover and a High Zone, rising to Sky Lobby 1 at Floor 30.",
      bands: ["17–26", "16", "6–15"],
      features: ["Direct access from the Main Lobby", "High Zone 17–26 · Crossover 16 · Low Zone 6–15", "Refuge Floor 29 · Mechanical Levels 27–28"],
      video: "/assets/opt/office-floor-reception.mp4", zone: { top: 54, h: 24 } },
    { id: "podium", short: "Podium", tier: "Podium & Lobby", range: "Ground – Level 5",
      blurb: "The tower's base — the double-height Main Lobby, the Spa & Gym, and the Al Hamra Luxury Centre with cinema and parking. The address begins at street level.",
      bands: ["1–5", "G"],
      features: ["Grand double-height Main Lobby", "Spa & Gym at podium level", "Al Hamra Luxury Centre, cinema & parking"],
      video: "/assets/tower-drone.mp4", zone: { top: 78, h: 17 } },
  ],
  ar: [
    { id: "sky", short: "صالة السماء", tier: "صالة السماء", range: "الطابق ٧٨ · القمّة",
      blurb: "قمّة البرج. تتوّج صالة السماء البرج عند المستوى ٧٨ — أعلى مطعمٍ في الكويت — فوق التجهيزات الميكانيكيّة العلويّة ومستويات السطح ٧٩–٨٠.",
      bands: ["٧٨"],
      features: ["صالة السماء في الطابق ٧٨ — أعلى مطعمٍ في الكويت", "تجهيزات السطح في المستويين ٧٩–٨٠", "تُخدَم بمصاعد سريعة مخصّصة"],
      video: "/assets/tower-drone.mp4", zone: { top: 5, h: 7 } },
    { id: "highrise", short: "النطاق العلوي", tier: "النطاق العلوي", range: "الطوابق ٥٦–٧٧ · ردهة السماء ٢",
      blurb: "المجموعة العلويّة، تُخدَم من ردهة السماء ٢ في الطابق ٥٥. نطاقٌ سفليّ وطابق عبور ونطاقٌ علويّ ترفع المستأجرين إلى قرب السماء، فوق التجهيزات الوسطى.",
      bands: ["٦٦–٧٥", "٦٥", "٥٦–٦٤"],
      features: ["تُخدَم من ردهة السماء ٢ · الطابق ٥٥", "النطاق العلوي ٦٦–٧٥ · العبور ٦٥ · النطاق السفلي ٥٦–٦٤", "تجهيزات المستويين ٧٦–٧٧ · طابق اللجوء ٥٤"],
      video: "/assets/hero.mp4", zone: { top: 12, h: 18 } },
    { id: "midrise", short: "النطاق الأوسط", tier: "النطاق الأوسط", range: "الطوابق ٣١–٥٥ · ردهة السماء ١",
      blurb: "المجموعة الوسطى، تُخدَم من ردهة السماء ١ في الطابق ٣٠. طوابق فعّالة خالية من الأعمدة عبر نطاقٍ سفليّ وطابق عبور ونطاقٍ علويّ حتى ردهة السماء ٢ في الطابق ٥٥.",
      bands: ["٤٣–٥١", "٤٢", "٣١–٤١"],
      features: ["تُخدَم من ردهة السماء ١ · الطابق ٣٠", "النطاق العلوي ٤٣–٥١ · العبور ٤٢ · النطاق السفلي ٣١–٤١", "اللجوء والتجهيزات في المستويات ٥٢–٥٤"],
      video: "/assets/opt/office-flex.mp4", zone: { top: 30, h: 24 } },
    { id: "lowrise", short: "النطاق السفلي", tier: "النطاق السفلي", range: "الطوابق ٦–٣٠ · البهو الرئيسي",
      blurb: "المجموعة السفليّة، يُدخَل إليها مباشرةً من البهو الرئيسي. مصاعد محليّة سريعة تخدم نطاقاً سفليّاً وطابق عبور ونطاقاً علويّاً، صعوداً إلى ردهة السماء ١ في الطابق ٣٠.",
      bands: ["١٧–٢٦", "١٦", "٦–١٥"],
      features: ["وصولٌ مباشر من البهو الرئيسي", "النطاق العلوي ١٧–٢٦ · العبور ١٦ · النطاق السفلي ٦–١٥", "طابق اللجوء ٢٩ · التجهيزات ٢٧–٢٨"],
      video: "/assets/opt/office-floor-reception.mp4", zone: { top: 54, h: 24 } },
    { id: "podium", short: "القاعدة", tier: "القاعدة والبهو", range: "الأرضي – الطابق ٥",
      blurb: "قاعدة البرج — البهو الرئيسي المزدوج الارتفاع، والسبا والنادي الرياضي، ومركز الحمراء التجاريّ بالسينما والمواقف. يبدأ العنوان من مستوى الشارع.",
      bands: ["١–٥", "الأرضي"],
      features: ["بهوٌ رئيسيٌّ مزدوج الارتفاع", "سبا ونادٍ رياضيّ في مستوى القاعدة", "مركز الحمراء التجاريّ والسينما والمواقف"],
      video: "/assets/tower-drone.mp4", zone: { top: 78, h: 17 } },
  ],
};

/* ── Sticky tower diagram ──────────────────────────────────────────────
   A stylised tapering stack of floor bands. The bands of the active tier
   fill Al Hamra red; the rest are muted. Tier labels sit to the left. */
function TowerDiagram({ tiers, active }: { tiers: Tier[]; active: string }) {
  const bands: { tierId: string; label: string }[] = [];
  tiers.forEach((t) => t.bands.forEach((label) => bands.push({ tierId: t.id, label })));
  const N = bands.length;
  const topY = 34, bandH = 38, cx = 214;
  const wTop = 30, wBot = 152;
  const widthAt = (i: number) => wTop + (wBot - wTop) * (i / N);
  const vbH = topY + N * bandH + 16;

  // tier band index ranges (for tier labels)
  let idx = 0;
  const tierRanges = tiers.map((t) => { const start = idx; idx += t.bands.length; return { id: t.id, short: t.short, start, end: idx }; });

  return (
    <svg viewBox={`0 0 320 ${vbH}`} width="100%" height="100%" role="img"
      aria-label="Al Hamra Tower floor stack" preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: "78vh" }}>
      {/* spire */}
      <line x1={cx} y1={8} x2={cx} y2={topY} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      {bands.map((b, i) => {
        const yTop = topY + i * bandH, yBot = yTop + bandH;
        const wt = widthAt(i), wb = widthAt(i + 1);
        const on = b.tierId === active;
        const pts = `${cx - wt / 2},${yTop} ${cx + wt / 2},${yTop} ${cx + wb / 2},${yBot} ${cx - wb / 2},${yBot}`;
        return (
          <g key={i} style={{ transition: "opacity 0.4s ease" }}>
            <polygon points={pts}
              fill={on ? RED : "#7d7d7b"} fillOpacity={on ? 1 : 0.42}
              stroke="#1D1D1B" strokeWidth="1.2"
              style={{ transition: "fill 0.4s ease, fill-opacity 0.4s ease" }} />
            <text x={cx} y={(yTop + yBot) / 2 + 3} textAnchor="middle"
              fontFamily={FONT} fontSize="10" letterSpacing="1"
              fill={on ? "#fff" : "rgba(255,255,255,0.7)"}>{b.label}</text>
          </g>
        );
      })}
      {tierRanges.map((tr) => {
        const midY = topY + ((tr.start + tr.end) / 2) * bandH + 3;
        const on = tr.id === active;
        return (
          <text key={tr.id} x={118} y={midY} textAnchor="end"
            fontFamily={FONT} fontSize="12" letterSpacing="1.5"
            fontWeight={on ? 600 : 400} fill={on ? RED : "rgba(255,255,255,0.55)"}
            style={{ transition: "fill 0.4s ease" }}>{tr.short}</text>
        );
      })}
    </svg>
  );
}

export function AlHamraFloors() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const tiers = TIERS[lang] ?? TIERS.en;
  const [active, setActive] = useState(tiers[0].id);
  const [imgOk, setImgOk] = useState(true);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Highlight zone (% of the elevation image) per tier — from the section drawing.
  const zones = tiers.map((t) => ({ id: t.id, short: t.short, top: t.zone.top, h: t.zone.h }));

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis.length) {
          const id = (vis[0].target as HTMLElement).dataset.tier;
          if (id) setActive(id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    Object.values(panelRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [tiers.length]);

  return (
    <section style={{ background: "#fff" }}>
      <div className="floors-layout" style={{ maxWidth: 1440, margin: "0 auto",
        display: "grid", gridTemplateColumns: "minmax(300px, 40%) 1fr" }}>

        {/* Sticky tower rail — dark "blueprint" card on the white page */}
        <div className="floors-rail" style={{ position: "sticky", top: 92,
          height: "calc(100vh - 92px)", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "clamp(16px,3vh,40px) clamp(12px,2vw,28px)" }}>
          <div style={{ background: "#080809", border: "1px solid rgba(29,29,27,0.12)",
            height: "84vh", width: "100%", display: "flex", alignItems: "center",
            justifyContent: "center", padding: "clamp(16px,3vh,32px) clamp(24px,2vw,44px)",
            boxShadow: "0 30px 80px -50px rgba(0,0,0,0.6)" }}>
            {imgOk ? (
              <div style={{ position: "relative", height: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", height: "100%" }}>
                  {/* Al Hamra "Section Through Tower" — shown in its native colours */}
                  <img
                    src="/assets/tower-elevation.png"
                    alt="Al Hamra Tower — section through tower"
                    onError={() => setImgOk(false)}
                    style={{ height: "100%", width: "auto", display: "block", filter: "contrast(1.02)" }}
                  />
                  {zones.map((z) => {
                    const on = z.id === active;
                    return (
                      <div key={z.id}>
                        {on && (
                          <div aria-hidden="true" style={{ position: "absolute",
                            left: "-14%", right: "-14%", top: `${z.top}%`, height: `${z.h}%`,
                            background: "rgba(205,23,25,0.28)", mixBlendMode: "screen",
                            borderTop: `1px solid ${RED}`, borderBottom: `1px solid ${RED}`,
                            boxShadow: "0 0 26px rgba(205,23,25,0.5)",
                            transition: "top 0.45s ease, height 0.45s ease" }} />
                        )}
                        <span style={{ position: "absolute", insetInlineEnd: "114%",
                          top: `${z.top + z.h / 2}%`, transform: "translateY(-50%)",
                          whiteSpace: "nowrap", fontFamily: FONT, fontSize: 11, letterSpacing: "1.5px",
                          fontWeight: on ? 600 : 400, color: on ? RED : "rgba(255,255,255,0.6)",
                          transition: "color 0.35s ease" }}>{z.short}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <TowerDiagram tiers={tiers} active={active} />
            )}
          </div>
        </div>

        {/* Scrolling tier panels */}
        <div className="floors-panels">
          {tiers.map((t) => (
            <div key={t.id} id={`floor-${t.id}`} data-tier={t.id}
              ref={(el) => { panelRefs.current[t.id] = el; }}
              style={{ minHeight: "calc(100vh - 92px)", display: "flex",
                flexDirection: "column", justifyContent: "center",
                padding: "clamp(48px,9vh,110px) clamp(28px,5vw,80px)",
                borderTop: "1px solid rgba(29,29,27,0.08)" }}>

              <div style={{ fontFamily: FONT, fontSize: "clamp(10px,0.85vw,11px)",
                letterSpacing: "0.35em", textTransform: "uppercase", color: RED, marginBottom: 16 }}>
                <Editable id={`section_fields:alhamraFloors:${t.id}.range`}>{t.range}</Editable>
              </div>
              <h3 style={{ fontFamily: FONT, fontWeight: 300,
                fontSize: "clamp(26px,3.2vw,46px)", color: DARK, lineHeight: 1.12,
                letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 22px" }}>
                <Editable id={`section_fields:alhamraFloors:${t.id}.tier`}>{t.tier}</Editable>
              </h3>
              <p style={{ fontFamily: FONT, fontWeight: 300,
                fontSize: "clamp(14px,1.1vw,16px)", color: MUTED,
                lineHeight: 1.85, margin: "0 0 30px", maxWidth: 540 }}>
                <Editable id={`section_fields:alhamraFloors:${t.id}.blurb`}>{t.blurb}</Editable>
              </p>

              <Link to="/leasing/inquiry#inquiry-form"
                style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12,
                  background: "none", border: "1px solid rgba(29,29,27,0.35)", color: DARK,
                  fontFamily: FONT, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                  padding: "14px 32px", textDecoration: "none", marginBottom: "clamp(28px,4vh,44px)",
                  transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=RED;e.currentTarget.style.color=RED;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(29,29,27,0.35)";e.currentTarget.style.color=DARK;}}>
                {isAr ? "اعرف المزيد" : "Learn More"}
                <span aria-hidden="true">→</span>
              </Link>

              {/* Media */}
              <div style={{ position: "relative", overflow: "hidden", background: "#0c0b09",
                aspectRatio: "16/9", maxWidth: 820, marginBottom: 24 }}>
                <SlotVideo slot={`floors.${t.id}.video`} fallback={t.video}
                  autoPlay muted loop playsInline aria-label={t.tier}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 14, insetInlineStart: 14,
                  background: "rgba(12,11,9,0.75)", color: "#fff", fontFamily: FONT,
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 12px" }}>
                  <Editable id={`section_fields:alhamraFloors:${t.id}.range2`}>{t.range}</Editable>
                </div>
              </div>

              {/* Feature bullets */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: 820,
                display: "grid", gap: 12 }}>
                {t.features.map((f, fi) => (
                  <li key={fi} style={{ display: "flex", gap: 12, alignItems: "flex-start",
                    fontFamily: FONT, fontSize: "clamp(13px,1.05vw,15px)", fontWeight: 300,
                    color: BODY, lineHeight: 1.6 }}>
                    <span aria-hidden="true" style={{ color: RED, flexShrink: 0, marginTop: 2 }}>◆</span>
                    <Editable id={`section_fields:alhamraFloors:${t.id}.features.${fi}`}>{f}</Editable>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .floors-layout { grid-template-columns: 1fr !important; }
          .floors-rail {
            position: relative !important; top: 0 !important;
            height: 46vh !important; border-bottom: 1px solid rgba(29,29,27,0.08);
          }
        }
      `}</style>
    </section>
  );
}
