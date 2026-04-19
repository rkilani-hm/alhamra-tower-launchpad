import { motion, useScroll, useTransform, useSpring, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section, Tag, H2, Body, Rv, DarkBand } from "@/components/shared/ui";

/* ─── Brand tokens ───────────────────────── */
const SAND    = "#C5A882";   /* use only on dark backgrounds */
const SAND_AA = "#9A7550";   /* 4.58:1 on white — WCAG AA ✅ */
const CREAM = "#F5F0E8";
const STONE = "#E8E0D4";
const DARK  = "#1D1D1B";
const MUTED = "#8A8580";
const WHITE = "#FFFFFF";

/* ─── Data ───────────────────────────────── */
/* Full corpus of 12 international awards & honours won by Al Hamra Business Tower,
   compiled from original citation documents. Eight trophies are photographed;
   four are rendered as certificate-style cards (image: null).                  */
type Award = {
  year:     string;
  ribbon:   string;   /* short distinction e.g. "First Place" */
  title:    string;
  org:      string;
  category: "Architecture" | "Concrete" | "Development" | "Smart Tech" | "Tall Buildings";
  body:     string;
  image:    string | null;
  hero?:    boolean;  /* top-of-page featured award */
};

const AWARDS_DATA: Award[] = [
  {
    year: "2021", ribbon: "Award of Excellence",
    title: "Best Tall Building 10-Year Award",
    org: "Council on Tall Buildings and Urban Habitat (CTBUH)",
    category: "Tall Buildings",
    body: "Honoured a decade after completion — the pinnacle retrospective recognition for lasting architectural significance. Awarded by audience vote among the world's most influential tall buildings of the past decade.",
    image: "/assets/awards/2021-ctbuh-10-year-award.jpg",
    hero: true,
  },
  {
    year: "2019–20", ribbon: "Double Regional Winner",
    title: "Best Commercial High-Rise Architecture & Development",
    org: "Arabian Property Awards",
    category: "Development",
    body: "Double-crowned for both \"Best Commercial High-Rise Architecture\" and \"Best Commercial High-Rise Development\" — Kuwait and Region — at the Dubai, African & Arabian Property Awards, held in association with the International Property Awards.",
    image: "/assets/awards/2019-arabian-property-awards.jpg",
  },
  {
    year: "2019–20", ribbon: "International Winner · London",
    title: "Best International Commercial High-Rise Development",
    org: "International Property Awards",
    category: "Development",
    body: "Presented at the International Property Awards ceremony in London — affirming Al Hamra's architectural brilliance as an iconic landmark and Kuwait's most vibrant international business hub.",
    image: "/assets/awards/2019-international-property-awards.jpg",
  },
  {
    year: "2016", ribbon: "Two Awards",
    title: "Smart Building Award — Middle East",
    org: "Honeywell",
    category: "Smart Tech",
    body: "Two Honeywell Smart Building Awards: Middle East Country Winner for the Smartest Building in Kuwait, and Vertical Sector Winner for Private Offices. Scored on Green, Safe and Productive criteria following on-site audit by Honeywell consultants.",
    image: "/assets/awards/2016-honeywell-smart-building.jpg",
  },
  {
    year: "2015", ribbon: "First Place",
    title: "Excellence in Concrete Construction — First Place, High-Rise",
    org: "American Concrete Institute (ACI) · Global",
    category: "Concrete",
    body: "First Place globally in the High-Rise Buildings category at the ACI Excellence in Concrete Construction Awards — honouring the most creative concrete projects worldwide and recognising innovation, technology and engineering excellence.",
    image: "/assets/awards/2015-aci-concrete-first-place.jpg",
  },
  {
    year: "2013", ribbon: "Merit Award",
    title: "Design Award — Architecture Merit",
    org: "American Institute of Architects (AIA) · New York Chapter",
    category: "Architecture",
    body: "Merit Award from the AIA New York Design Awards Program — honouring outstanding architectural design. Judged by an internationally-prominent three-person jury across the Architecture category.",
    image: null,
  },
  {
    year: "2012", ribbon: "Company of the Year",
    title: "Best Real Estate Company of the Year",
    org: "Arabian Business Achievement Awards · ITP Executive Expo",
    category: "Development",
    body: "Al Hamra Real Estate Company recognised as Best Real Estate Company of the Year — reflecting sustained leadership in premium real-estate development across the Gulf.",
    image: "/assets/awards/2012-best-real-estate-company.jpg",
  },
  {
    year: "2012", ribbon: "Finalist",
    title: "Best Tall Building — Middle East & Africa (Finalist)",
    org: "Council on Tall Buildings and Urban Habitat (CTBUH)",
    category: "Tall Buildings",
    body: "Finalist nomination for Best Tall Building, Middle East & Africa Region. The CTBUH is the recognised global authority on the official height of tall buildings and on all aspects of tall-building planning, design and construction.",
    image: null,
  },
  {
    year: "2011", ribbon: "Award of Excellence",
    title: "Setting New Standards for Landmarks in Kuwait",
    org: "American Concrete Institute (ACI) · Kuwait Chapter",
    category: "Concrete",
    body: "Annual Award of Excellence presented to a local project of outstanding merit — recognising the technical innovation and design excellence that set new standards for landmark construction in Kuwait.",
    image: "/assets/awards/2011-aci-kuwait-excellence.jpg",
  },
  {
    year: "2010", ribbon: "Emerging Markets",
    title: "Excellence in Architecture — Emerging Markets",
    org: "Cityscape Global · Dubai",
    category: "Architecture",
    body: "Awarded at Cityscape Global — the world's largest networking exhibition on property development, held at the Dubai International Convention Centre. Recognises outstanding design, performance, vision and achievement across the Gulf, Middle East, Africa, Latin America and Asia.",
    image: "/assets/awards/2010-cityscape-emerging-markets.jpg",
  },
  {
    year: "2008", ribbon: "Honouree",
    title: "American Architecture Award",
    org: "The Chicago Athenaeum — Museum of Architecture & Design",
    category: "Architecture",
    body: "Honoured in the Chicago Athenaeum's Annual American Architecture Awards Program — celebrating the best significant buildings and landscapes designed and built worldwide by the most important American architects practising nationally and internationally.",
    image: null,
  },
  {
    year: "2008", ribbon: "Overall Winner · Cannes",
    title: "Future Projects Awards — Overall Winner & Excellence in Tall Buildings",
    org: "MIPIM · Architectural Review · Cannes",
    category: "Architecture",
    body: "Overall Winner and Excellence in Tall Buildings at the MIPIM Architectural Review Future Projects Awards in Cannes — a prestigious programme across eight categories honouring outstanding unbuilt and emerging architecture.",
    image: null,
  },
];

/* Legacy simple AWARDS table — kept for type safety of any legacy reference */
const AWARDS = AWARDS_DATA.map(a => ({
  year:  a.year, award: a.title, org: a.org,
  cat:   a.category,
  color: a.image ? SAND : DARK,
}));

const ENGINEERING_FACTS = [
  {
    stat: "#1",
    label: "Tallest Stone-Clad Tower",
    body: "258,000 m² of Jura limestone — the world's largest area of stone cladding on a single building. A world record held since 2011 and the first asymmetrical skyscraper ever built. No other tower of comparable height achieves this degree of sculptural mass removal from its own structural body.",
    img: "/lovable-uploads/3-_Recognition_2.png",
    imgCaption: "Dual facade · Glass meets limestone",
    credit: "Photo: Dave Burk · SOM",
  },
  {
    stat: "24m",
    label: "Column-Free Lobby",
    body: "The lamella structure — a web of curved concrete members inspired by Middle Eastern vault architecture — prevents the sloping perimeter columns from buckling. Without it, those columns would need to be three times larger.",
    img: "/assets/lobby-grand-lamella.jpg",
    imgCaption: "Grand lobby · White lamella arches, Kuwait flag, 24m height",
    credit: "Al Hamra Tower",
  },
  {
    stat: "289",
    label: "Foundation Piles",
    body: "A 4.2-metre reinforced concrete raft supported by 289 bored piles, each 1,200mm in diameter driven 22–27 metres deep. Poured in four months using nighttime concreting to combat Kuwait's extreme heat.",
    img: "/assets/entrance-night-wide.jpg",
    imgCaption: "North entrance · Curved canopy at blue hour",
    credit: "Photo: Dave Burk · SOM",
  },
];

const COLLABORATORS = [
  { role: "Lead Architect & Engineer", org: "SOM — Skidmore, Owings & Merrill" },
  { role: "Associate Architect",       org: "VDA · Al-Jazera Consultants"      },
  { role: "Digital Project Software",  org: "Gehry Technologies"               },
  { role: "General Contractor",        org: "Ahmadiah Contracting & Trading"   },
];

/* ─── Parallax image ─────────────────────── */
function ParallaxImg({ src, alt, height }: { src: string; alt: string; height: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]), { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", height }}>
      <motion.img src={src} alt={alt} style={{ y, width: "100%", height: "120%", objectFit: "cover", objectPosition: "center", position: "absolute", top: 0 }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AWARDS & HONOURS — INTERNATIONAL RECOGNITION
   ────────────────────────────────────────────────────────────────────────
   A vertical editorial timeline of Al Hamra's international awards —
   replacing the legacy utilitarian data table with a prestige-oriented
   gallery. Three layers of content:

     1. Hero featured award (2021 CTBUH 10-Year — pinned at top)
     2. Category filter pills (Framer Motion layout animations)
     3. Card grid — photographed trophies AND certificate-style cards
        for awards without photography, so nothing feels missing.
═══════════════════════════════════════════════════════════════════════ */
const CATEGORIES = ["All", "Architecture", "Tall Buildings", "Development", "Concrete", "Smart Tech"] as const;
type Category = typeof CATEGORIES[number];
type ViewMode = "grid" | "timeline";

/* Small crest SVG used on image-less "certificate" cards + lightbox.
   Fits the existing sand/dark palette — no external icon libs.       */
function AwardCrest({ color = "#C5A882" }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="32" cy="26" r="16" />
      <circle cx="32" cy="26" r="11" strokeOpacity="0.55" />
      <path d="M22 38 L18 60 L32 52 L46 60 L42 38" />
      <path d="M32 20 L33.8 24 L38 24.4 L34.8 27.2 L35.8 31.4 L32 29 L28.2 31.4 L29.2 27.2 L26 24.4 L30.2 24 Z" fill={color} fillOpacity="0.18" />
    </svg>
  );
}

/* ─── Animated hanging ribbon (for hero card) ──────────────────────────
   Echoes the 2019 IPA trophy ribbons — a signature page motif. Drops
   from top-origin on mount with a spring bounce, then text staggers in.  */
function AnimatedRibbon({ lines }: { lines: string[] }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        scaleY:  { duration: 0.9,  ease: [0.34, 1.25, 0.64, 1] }, /* overshoot */
        opacity: { duration: 0.4,  ease: "easeOut" },
      }}
      style={{
        position: "absolute", top: 0, left: "clamp(18px,3vw,36px)", zIndex: 4,
        transformOrigin: "top center",
        width: "clamp(68px,6.2vw,88px)",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {/* Ribbon body with V-notch bottom via clip-path */}
      <div style={{
        background: `linear-gradient(180deg, ${SAND} 0%, ${SAND_AA} 100%)`,
        color: DARK,
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 14px), 50% 100%, 0 calc(100% - 14px))",
        padding: "clamp(14px,1.6vw,20px) 8px clamp(28px,3vw,36px)",
        boxShadow: "0 12px 30px -10px rgba(0,0,0,0.55)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        {/* Top pin / eyelet */}
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: DARK, boxShadow: `inset 0 0 0 1.5px ${SAND}`,
          marginBottom: 4,
        }} />
        {lines.map((line, i) => (
          <motion.div
            key={line + i}
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + i * 0.12, duration: 0.4 }}
            style={{
              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
              fontSize: i === 0 ? "9px" : i === lines.length - 1 ? "13px" : "8.5px",
              fontWeight: i === lines.length - 1 ? 500 : 400,
              letterSpacing: i === lines.length - 1 ? "0.1em" : "0.22em",
              textTransform: "uppercase",
              textAlign: "center", lineHeight: 1.25,
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Lightbox modal ───────────────────────────────────────────────────
   Full-screen dialog triggered by clicking any card. Uses shared layoutId
   with the source card so Framer animates the expansion from origin. Locks
   body scroll, traps focus, Escape + backdrop-click dismiss.              */
function AwardLightbox({ award, onClose }: { award: Award | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll while open + return focus to close button */
  useEffect(() => {
    if (!award) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* Defer focus so the element is mounted */
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [award]);

  /* Escape to close + simple tab-cycle focus trap */
  useEffect(() => {
    if (!award) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [award, onClose]);

  return (
    <AnimatePresence>
      {award && (
        <motion.div
          role="dialog" aria-modal="true" aria-labelledby="award-lightbox-title"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(10,10,10,0.88)",
            backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(16px,3vw,48px)",
            cursor: "zoom-out",
          }}
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="award-lightbox-dialog"
            style={{
              position: "relative", cursor: "default",
              background: DARK, color: WHITE,
              width: "min(1100px, 100%)",
              maxHeight: "min(840px, 92vh)",
              display: "grid", gridTemplateColumns: "1.15fr 1fr",
              boxShadow: "0 40px 100px -30px rgba(0,0,0,0.75)",
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose} aria-label="Close award details"
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 10,
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(197,168,130,0.3)",
                color: WHITE, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget.style.background = "rgba(197,168,130,0.18)");
                (e.currentTarget.style.borderColor = SAND);
              }}
              onMouseLeave={e => {
                (e.currentTarget.style.background = "rgba(255,255,255,0.06)");
                (e.currentTarget.style.borderColor = "rgba(197,168,130,0.3)");
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Visual side — full-size photograph or large certificate */}
            <div style={{
              position: "relative", background: DARK,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "clamp(24px,3vw,56px)",
              minHeight: 320,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at center, rgba(197,168,130,0.22) 0%, transparent 60%)`,
              }} />
              {award.image ? (
                <img
                  src={award.image}
                  alt={`${award.title} — ${award.org}`}
                  style={{ position: "relative", maxWidth: "100%", maxHeight: "min(70vh, 620px)", objectFit: "contain" }}
                />
              ) : (
                <div style={{
                  position: "relative", zIndex: 1,
                  width: "min(420px, 100%)", aspectRatio: "3/4",
                  background: CREAM, color: DARK,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "clamp(28px,3vw,48px)", textAlign: "center",
                  boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
                }}>
                  <div style={{
                    position: "absolute", inset: "clamp(18px,2vw,26px)",
                    border: `1.5px solid ${SAND_AA}`, opacity: 0.5, pointerEvents: "none",
                  }} />
                  <div style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase",
                    color: SAND_AA, marginBottom: "clamp(18px,3vw,32px)",
                  }}>
                    Certificate of Honour
                  </div>
                  <AwardCrest color={SAND_AA} />
                  <div style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "clamp(44px,5vw,64px)", fontWeight: 200, color: DARK,
                    lineHeight: 1, marginTop: 18, letterSpacing: "-0.02em",
                  }}>
                    {award.year}
                  </div>
                  <div style={{
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase",
                    color: SAND_AA, marginTop: 14,
                  }}>
                    {award.ribbon}
                  </div>
                </div>
              )}
            </div>

            {/* Text side — full citation */}
            <div className="award-lightbox-text" style={{
              padding: "clamp(28px,3vw,52px)",
              borderLeft: `1px solid rgba(197,168,130,0.18)`,
              display: "flex", flexDirection: "column", justifyContent: "center",
              overflowY: "auto",
            }}>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(56px,6vw,84px)", fontWeight: 200, color: WHITE,
                lineHeight: 0.95, marginBottom: 4, letterSpacing: "-0.02em",
              }}>
                {award.year}
              </div>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
                color: SAND, marginBottom: 22,
              }}>
                {award.ribbon} · {award.category}
              </div>
              <h3 id="award-lightbox-title" style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "clamp(20px,2.1vw,28px)", fontWeight: 300, color: WHITE,
                lineHeight: 1.25, marginBottom: 12, letterSpacing: "-0.01em",
              }}>
                {award.title}
              </h3>
              <div style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "12.5px", fontWeight: 400, color: "rgba(255,255,255,0.72)",
                marginBottom: 22, letterSpacing: "0.04em",
              }}>
                {award.org}
              </div>
              <div style={{ height: 1, width: 40, background: SAND, opacity: 0.6, marginBottom: 22 }} />
              <p style={{
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.68)",
                lineHeight: 1.85, margin: 0,
              }}>
                {award.body}
              </p>
              <div style={{
                marginTop: "clamp(20px,3vw,32px)",
                fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}>
                Press Esc or click outside to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Horizontal-scroll timeline view ─────────────────────────────────
   Alternative A/B layout — awards laid out chronologically L→R with a
   continuous year rail below. Native CSS scroll-snap, chevron nav, and
   keyboard arrow support.                                              */
function TimelineView({ awards, onCardClick }: { awards: Award[]; onCardClick: (a: Award) => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-timeline-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  /* Sort by year ascending (parse first 4 digits) */
  const sorted = useMemo(
    () => [...awards].sort((a, b) => parseInt(a.year) - parseInt(b.year)),
    [awards]
  );

  return (
    <div className="timeline-wrap" onKeyDown={(e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); scrollByCard(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); scrollByCard(-1); }
    }} tabIndex={0} aria-roledescription="carousel" aria-label="Awards timeline">

      {/* Chevron controls */}
      <div className="timeline-controls">
        <button onClick={() => scrollByCard(-1)} aria-label="Previous award" className="timeline-chev">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button onClick={() => scrollByCard(1)} aria-label="Next award" className="timeline-chev">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      {/* Horizontal scroller */}
      <div ref={scrollerRef} className="timeline-scroller">
        {sorted.map((a, i) => (
          <motion.article
            data-timeline-card
            key={a.title + a.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: scrollerRef, once: true, margin: "-10%" }}
            transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => onCardClick(a)}
            role="button" tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCardClick(a); }
            }}
            aria-label={`${a.year} · ${a.title}. Press Enter to view details.`}
            className="timeline-card"
          >
            {/* Image / certificate */}
            {a.image ? (
              <div className="timeline-card-visual" style={{ background: DARK }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 55%, rgba(197,168,130,0.16) 0%, transparent 60%)` }} />
                <img src={a.image} alt={a.title} loading="lazy"
                  style={{ position: "relative", width: "100%", height: "100%", objectFit: "contain", padding: "clamp(14px,2vw,24px)" }} />
              </div>
            ) : (
              <div className="timeline-card-visual" style={{ background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <div style={{ position: "absolute", inset: 16, border: `1px solid ${SAND_AA}`, opacity: 0.3, pointerEvents: "none" }} />
                <AwardCrest color={SAND_AA} />
                <div style={{ marginTop: 12, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: SAND_AA, textAlign: "center" }}>
                  Certificate of Honour
                </div>
              </div>
            )}

            {/* Text */}
            <div className="timeline-card-text">
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: SAND_AA, marginBottom: 8 }}>
                {a.ribbon}
              </div>
              <h4 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 400, color: DARK, lineHeight: 1.35, marginBottom: 6, letterSpacing: "-0.005em" }}>
                {a.title}
              </h4>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "11px", color: MUTED, letterSpacing: "0.02em" }}>
                {a.org}
              </div>
            </div>

            {/* Year tick on card */}
            <div className="timeline-card-year">
              <div style={{ width: 1, height: 16, background: SAND_AA, margin: "0 auto 4px" }} />
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 400, color: DARK, letterSpacing: "0.02em" }}>
                {a.year}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Timeline rail below */}
      <div className="timeline-rail" aria-hidden>
        <div className="timeline-rail-line" />
      </div>

      <div className="timeline-hint" aria-live="polite">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        <span>Scroll, drag, or use arrow keys</span>
      </div>
    </div>
  );
}

function AwardsRecognitionSection() {
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [lightboxAward, setLightboxAward] = useState<Award | null>(null);

  /* Split hero from the rest, then filter the rest by category */
  const hero = useMemo(() => AWARDS_DATA.find(a => a.hero)!, []);
  const rest = useMemo(() => AWARDS_DATA.filter(a => !a.hero), []);
  const filtered = useMemo(
    () => activeCat === "All" ? rest : rest.filter(a => a.category === activeCat),
    [activeCat, rest]
  );

  /* Count per-category badge numbers (used on pills) */
  const counts = useMemo(() => {
    const c: Record<Category, number> = { All: AWARDS_DATA.length, Architecture: 0, "Tall Buildings": 0, Development: 0, Concrete: 0, "Smart Tech": 0 };
    AWARDS_DATA.forEach(a => { c[a.category]++; });
    return c;
  }, []);

  return (
    <section style={{ background: "#FAFAF8" }}>
      <div className="ah-section" style={{ background: "transparent" }}>
        {/* ── Header ─────────────────────────────────────── */}
        <Rv>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: SAND }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>
              Awards & Honours
            </div>
          </div>
        </Rv>
        <Rv delay={0.1}>
          <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(26px,3.5vw,52px)", fontWeight: 100, letterSpacing: "-0.025em", lineHeight: 1.1, color: DARK, marginBottom: 18 }}>
            International<br /><span style={{ fontWeight: 400 }}>Recognition</span>
          </h2>
        </Rv>
        <Rv delay={0.18}>
          <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: MUTED, lineHeight: 1.7, maxWidth: 620, marginBottom: 48 }}>
            From Cannes to London, Chicago to Dubai — Al Hamra Business Tower has been recognised by the world's leading architectural, engineering and property institutions for more than a decade. Twelve distinct awards, two continents, one skyline.
          </p>
        </Rv>

        {/* ── Hero Featured Award (2021 CTBUH) ───────────── */}
        <Rv delay={0.25}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxAward(hero)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxAward(hero); }
            }}
            role="button" tabIndex={0}
            aria-label={`View full details for ${hero.title}, ${hero.year}`}
            className="award-hero"
            style={{
              display: "grid", gridTemplateColumns: "1.1fr 1fr",
              background: DARK, color: WHITE, marginBottom: 64,
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.45)",
              overflow: "hidden", position: "relative",
              cursor: "pointer",
            }}
          >
            {/* Photograph side */}
            <div style={{ position: "relative", minHeight: 420, background: DARK, overflow: "hidden" }}>
              {/* Radial spotlight to lift the crystal trophy off pure black */}
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse at center, rgba(197,168,130,0.18) 0%, transparent 55%)`,
                zIndex: 1,
              }} />
              <img
                src={hero.image!}
                alt={`${hero.title} — ${hero.org}`}
                loading="lazy"
                style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", padding: "clamp(24px,4vw,60px)" }}
              />
              {/* Animated hanging ribbon — unfurls from top */}
              <AnimatedRibbon lines={["CTBUH", "Award of", "Excellence", "2021"]} />
            </div>

            {/* Text side */}
            <div style={{
              padding: "clamp(36px,4vw,64px)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              borderLeft: `1px solid rgba(197,168,130,0.18)`,
            }}>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(64px,7vw,96px)", fontWeight: 200, color: WHITE, lineHeight: 1, marginBottom: 4 }}>
                {hero.year}
              </div>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: SAND, marginBottom: 22 }}>
                {hero.ribbon} · {hero.category}
              </div>
              <h3 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 300, color: WHITE, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.01em" }}>
                {hero.title}
              </h3>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "12.5px", fontWeight: 400, color: "rgba(255,255,255,0.72)", marginBottom: 18, letterSpacing: "0.04em" }}>
                {hero.org}
              </div>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13.5px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 440 }}>
                {hero.body}
              </p>
            </div>
          </motion.article>
        </Rv>

        {/* ── Filter Pills + View Toggle ─────────────────── */}
        <Rv delay={0.1}>
          <div className="award-controls">
            <div className="award-filters" role="tablist" aria-label="Filter awards by category">
              {CATEGORIES.map(cat => {
                const active = activeCat === cat;
                return (
                  <motion.button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCat(cat)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      position: "relative",
                      fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                      fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase",
                      padding: "10px 18px", border: `1px solid ${active ? DARK : STONE}`,
                      background: active ? DARK : WHITE,
                      color: active ? WHITE : DARK,
                      cursor: "pointer", transition: "all 0.25s ease",
                      display: "inline-flex", alignItems: "center", gap: 10,
                    }}
                  >
                    {cat}
                    <span style={{
                      fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                      fontSize: "9px", fontWeight: 400,
                      padding: "1px 7px", minWidth: 20, textAlign: "center",
                      background: active ? SAND : CREAM,
                      color: active ? DARK : MUTED,
                      letterSpacing: "0.05em",
                    }}>
                      {counts[cat]}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* View Mode Toggle — Grid / Timeline */}
            <div className="view-toggle" role="radiogroup" aria-label="View mode">
              {(["grid", "timeline"] as ViewMode[]).map(mode => {
                const active = viewMode === mode;
                return (
                  <button
                    key={mode}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setViewMode(mode)}
                    className={`view-toggle-btn ${active ? "is-active" : ""}`}
                  >
                    {mode === "grid" ? (
                      <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                        <rect x="3" y="3" width="6" height="6" /><rect x="11" y="3" width="6" height="6" />
                        <rect x="3" y="11" width="6" height="6" /><rect x="11" y="11" width="6" height="6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                        <path d="M3 10h14" /><circle cx="6" cy="10" r="1.4" fill="currentColor"/>
                        <circle cx="11" cy="10" r="1.4" fill="currentColor"/><circle cx="16" cy="10" r="1.4" fill="currentColor"/>
                      </svg>
                    )}
                    <span>{mode === "grid" ? "Grid" : "Timeline"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Rv>

        {/* ── Awards Gallery — Grid OR Timeline ──────────── */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <LayoutGroup>
                <motion.div layout className="award-grid" style={{ marginTop: 44 }}>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((a, i) => (
                      <AwardCard
                        key={a.title + a.year}
                        award={a}
                        index={i}
                        onClick={() => setLightboxAward(a)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            </motion.div>
          ) : (
            <motion.div
              key="timeline-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{ marginTop: 44 }}
            >
              <TimelineView awards={filtered} onCardClick={(a) => setLightboxAward(a)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Lightbox — renders only when an award is selected ── */}
        <AwardLightbox award={lightboxAward} onClose={() => setLightboxAward(null)} />


        {/* ── Footer stats strip ──────────────────────────── */}
        <Rv delay={0.15}>
          <div className="award-footer-stats" style={{ marginTop: 72, paddingTop: 36, borderTop: `1px solid ${STONE}` }}>
            {[
              { n: "12",  l: "International Awards" },
              { n: "7",   l: "Organisations Worldwide" },
              { n: "14",  l: "Years of Recognition" },
              { n: "4",   l: "Continents Honouring" },
            ].map(({ n, l }, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 200, color: DARK, lineHeight: 1, marginBottom: 8 }}>
                  {n}
                </div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED }}>
                  {l}
                </div>
              </motion.div>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* Individual award card — two flavours (photographed vs certificate).
   Alternating orientation handled via CSS :nth-child to give the grid
   a deliberate editorial rhythm.                                      */
function AwardCard({ award, index, onClick }: { award: Award; index: number; onClick?: () => void }) {
  const hasImage = !!award.image;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View full details for ${award.title}, ${award.year}` : undefined}
      className="award-card"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        background: WHITE,
        border: `1px solid ${STONE}`,
        overflow: "hidden",
        position: "relative",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* ── Visual side ── */}
      {hasImage ? (
        <div style={{ position: "relative", background: DARK, aspectRatio: "4 / 3", overflow: "hidden" }}>
          {/* Subtle warm spotlight behind the crystal */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 50% 55%, rgba(197,168,130,0.16) 0%, transparent 58%)`,
            zIndex: 1,
          }} />
          <motion.img
            src={award.image!}
            alt={`${award.title} — ${award.org}`}
            loading="lazy"
            initial={{ scale: 1.02 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", objectFit: "contain", padding: "clamp(14px,2.5vw,32px)" }}
          />
          {/* Year badge, top-right */}
          <div style={{
            position: "absolute", top: 14, right: 14, zIndex: 3,
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: SAND, padding: "5px 10px",
            background: "rgba(29,29,27,0.55)", backdropFilter: "blur(4px)",
            border: `1px solid rgba(197,168,130,0.35)`,
          }}>
            {award.year}
          </div>
        </div>
      ) : (
        /* Certificate-style card for awards without a trophy photo */
        <div style={{
          position: "relative", background: CREAM, aspectRatio: "4 / 3",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          padding: "clamp(24px,3vw,40px)", textAlign: "center",
          borderBottom: `1px solid ${STONE}`,
        }}>
          {/* Ornamental frame */}
          <div style={{
            position: "absolute", inset: "clamp(16px,2vw,24px)",
            border: `1px solid ${SAND_AA}`, opacity: 0.35, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: "clamp(10px,1.4vw,18px)", left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase",
            color: SAND_AA, background: CREAM, padding: "0 10px",
          }}>
            Certificate of Honour
          </div>

          <AwardCrest color={SAND_AA} />
          <div style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 200, color: DARK,
            marginTop: 18, lineHeight: 1, letterSpacing: "-0.02em",
          }}>
            {award.year}
          </div>
          <div style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
            color: SAND_AA, marginTop: 10,
          }}>
            {award.ribbon}
          </div>
        </div>
      )}

      {/* ── Text side ── */}
      <div style={{
        padding: "clamp(22px,2.2vw,30px) clamp(22px,2.2vw,30px) clamp(26px,2.5vw,34px)",
        display: "flex", flexDirection: "column", minHeight: 200,
      }}>
        {/* Top line: ribbon + category tag */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, marginBottom: 14,
        }}>
          <span style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: SAND_AA, fontWeight: 500,
          }}>
            {award.ribbon}
          </span>
          <span style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
            fontSize: "9.5px", letterSpacing: "0.22em", textTransform: "uppercase",
            padding: "3px 9px", background: CREAM, color: MUTED,
          }}>
            {award.category}
          </span>
        </div>

        {/* Title */}
        <h4 style={{
          fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
          fontSize: "clamp(14px,1.35vw,17px)", fontWeight: 400, color: DARK,
          lineHeight: 1.35, marginBottom: 8, letterSpacing: "-0.005em",
        }}>
          {award.title}
        </h4>

        {/* Organisation */}
        <div style={{
          fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
          fontSize: "11.5px", fontWeight: 400, color: MUTED,
          marginBottom: 14, letterSpacing: "0.02em",
        }}>
          {award.org}
        </div>

        {/* Body — hairline separator above */}
        <div style={{ height: 1, background: STONE, margin: "auto 0 14px", width: "28px" }} />
        <p style={{
          fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
          fontSize: "12.5px", fontWeight: 300, color: MUTED,
          lineHeight: 1.75, margin: 0,
        }}>
          {award.body}
        </p>
      </div>
    </motion.article>
  );
}


export function TowerAwards() {
  return (
    <PageLayout>

      {/* ══ HERO — tower-render-dusk.jpg: official SOM/CTBUH render, purple dusk sky ═══ */}
      <div style={{ position: "relative", height: "clamp(360px,55vw,680px)", overflow: "hidden", background: DARK }}>
        <motion.img
          src="/assets/tower-render-dusk.jpg"
          alt="Al Hamra Tower — official SOM architectural render at dusk"
          initial={{ scale: 1.06 }} animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "brightness(0.75) saturate(1.1)" }}
        />
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(29,29,27,0.1) 0%, transparent 40%, rgba(29,29,27,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(197,168,130,0.15) 0%, transparent 60%)` }} />

        {/* Text overlay */}
        <div className="awards-hero-text">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND, marginBottom: 14 }}>
              The Tower · Awards & Recognition
            </div>
            <h1 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(28px,5vw,72px)", fontWeight: 100, letterSpacing: "-0.03em", lineHeight: 1, color: WHITE, marginBottom: 16 }}>
              Global<br /><span style={{ fontWeight: 400 }}>Acknowledgement</span>
            </h1>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.55)", maxWidth: 440, lineHeight: 1.8 }}>
              The world's tallest stone-clad tower and first asymmetrical skyscraper — recognised by leading engineering, architecture, and sustainability institutions for over a decade.
            </p>
          </motion.div>
        </div>

        {/* Bottom credit */}
        <div style={{ position: "absolute", bottom: 18, right: 24, fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Photo: Dave Burk · SOM Architecture
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(transparent, #FAFAF8)`, pointerEvents: "none" }} />
      </div>

      {/* ══ GLOBAL STATS BAR ══════════════════════════════ */}
      <div className="awards-stats-bar">
        {[
          { n: "23rd",     l: "Tallest in World at Completion" },
          { n: "#1",       l: "Tallest Sculpted Concrete Tower" },
          { n: "80",       l: "Floors of Curved Concrete" },
          { n: "189,000", u:"kN", l: "Lamella Buckling Capacity" },
        ].map(({ n, u, l }, i) => (
          <motion.div key={l}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{ background: WHITE, padding: "clamp(24px,3vw,40px) clamp(18px,2.5vw,32px)", borderRight: `1px solid ${STONE}` }}
          >
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, color: DARK, lineHeight: 1 }}>
              {n}{u && <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1.5vw,16px)", fontWeight: 200, color: SAND }}>{u}</span>}
            </div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 8 }}>{l}</div>
          </motion.div>
        ))}
      </div>

      {/* ══ ENGINEERING SHOWCASE ══════════════════════════ */}
      <section style={{ background: "#FAFAF8" }}>
        <div className="ah-section" style={{ background: "transparent" }}>
          <Rv>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: SAND }} />
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>
                Engineering Milestones
              </div>
            </div>
          </Rv>
          <Rv delay={0.1}>
            <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,3vw,44px)", fontWeight: 100, letterSpacing: "-0.025em", lineHeight: 1.1, color: DARK, marginBottom: 8 }}>
              Why the World<br /><span style={{ fontWeight: 400 }}>Took Notice</span>
            </h2>
          </Rv>
          <Rv delay={0.2}>
            <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "14px", fontWeight: 300, color: MUTED, lineHeight: 1.65, maxWidth: 560, marginBottom: 56 }}>
              Three structural achievements set Al Hamra Tower apart from every skyscraper that preceded it — each one recognised independently by international institutions.
            </p>
          </Rv>
        </div>

        {/* Engineering cards — alternating layout */}
        {ENGINEERING_FACTS.map(({ stat, label, body, img, imgCaption, credit }, i) => (
          <Rv key={stat} delay={i * 0.08}>
            <div className={`eng-card ${i % 2 === 1 ? "eng-card-flip" : ""}`}
              style={{ borderTop: `1px solid ${STONE}` }}>

              {/* Image side */}
              <div className="eng-card-img" style={{ position: "relative", overflow: "hidden", minHeight: "clamp(260px,35vw,440px)", background: STONE }}>
                <ParallaxImg src={img} alt={imgCaption} height={440} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(29,29,27,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(16px,2vw,24px)" }}>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", color: "rgba(255,255,255,0.7)" }}>{imgCaption}</div>
                  <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{credit}</div>
                </div>
              </div>

              {/* Text side */}
              <div className="eng-card-text" style={{ background: WHITE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(48px,7vw,88px)", fontWeight: 300, color: CREAM, lineHeight: 1, marginBottom: 4 }}>{stat}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: SAND, marginBottom: 20 }}>{label}</div>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(13px,1.2vw,14.5px)", fontWeight: 300, color: MUTED, lineHeight: 1.9 }}>{body}</p>
              </div>
            </div>
          </Rv>
        ))}
      </section>

      {/* ══ LOBBY FEATURE — FULL-BLEED ════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <ParallaxImg src="/assets/lobby-interior.jpg" alt="Al Hamra Grand Lobby lamella structure" height={520} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(29,29,27,0.78) 0%, rgba(29,29,27,0.3) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="awards-lobby-text">
            <Rv>
              <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND, marginBottom: 16 }}>
                The Lamella Structure · Grand Lobby
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(24px,4vw,56px)", fontWeight: 100, color: WHITE, lineHeight: 1.08, marginBottom: 20 }}>
                The barrel vault of<br /><span style={{ fontWeight: 400, color: SAND }}>concrete lamellae</span><br />that holds up 412m
              </h2>
              <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(12px,1.2vw,14px)", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 480 }}>
                Concrete lamellae prevent the 24-metre sloping columns from buckling by providing alternate load paths to the foundation. The structural system reduces the columns to one-third of what they would otherwise require — creating the column-free arrival experience of Kuwait's most prestigious address.
              </p>
            </Rv>
          </div>
        </div>
      </section>

      {/* ══ CTBUH RESEARCH ════════════════════════════════ */}
      <Section>
        <div className="grid-2col">
          <div>
            <Rv>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: SAND }} />
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>Published Research · CTBUH 2007</div>
              </div>
              <h2 style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 100, letterSpacing: "-0.02em", color: DARK, lineHeight: 1.15, marginBottom: 24 }}>
                "Sculpted High Rise:<br /><span style={{ fontWeight: 400 }}>The Al Hamra Tower"</span>
              </h2>
              <Body>Mark Sarkisian, Neville Mathias, Aaron Mazeika (SOM) — Council on Tall Buildings and Urban Habitat, Structural Engineers World Congress 2007.</Body>
            </Rv>
            <Rv delay={0.15}>
              <div style={{ marginTop: 36, padding: "28px 28px 28px 24px", borderLeft: `3px solid ${SAND}`, background: CREAM }}>
                <p style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(15px,1.5vw,18px)", fontStyle: "italic", fontWeight: 300, color: DARK, lineHeight: 1.7, marginBottom: 16 }}>
                  "By blending conventional engineering tools with parametric modelling software, SOM has brought together the realms of free-form design and the super high-rise skyscraper."
                </p>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED }}>
                  CTBUH Research Paper · 2007
                </div>
              </div>
            </Rv>
          </div>

          {/* Right — lamella ceiling close-up */}
          <Rv delay={0.2}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
              loading="lazy" src="/assets/lobby-ceiling-day.jpg" alt="Lamella ceiling structure — daylight view"
                style={{ width: "100%", height: "clamp(300px,40vw,480px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.5))", padding: "20px 20px 16px" }}>
                <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Lamella ceiling · Daylight filtering through the web of concrete
                </span>
              </div>
            </div>
          </Rv>
        </div>
      </Section>

      {/* ══ AWARDS & HONOURS — INTERNATIONAL RECOGNITION ═════════════════ */}
      <AwardsRecognitionSection />

      {/* ══ PHOTO PAIR — ENTRANCE ENGINEERING ══════════════ */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="awards-photo-pair">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
              loading="lazy" src="/assets/entrance-night.jpg" alt="Al Hamra Tower entrance — night"
            style={{ width: "100%", height: "clamp(300px,40vw,500px)", objectFit: "cover", objectPosition: "center", display: "block", filter: "brightness(0.9)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.6))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", fontWeight: 500, color: WHITE, marginBottom: 4 }}>The Entrance at Night</div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              Sloped perimeter columns defining the street appearance
            </div>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
              loading="lazy" src="/assets/lobby-ceiling-portrait.jpg" alt="Lamella ceiling — portrait"
            style={{ width: "100%", height: "clamp(300px,40vw,500px)", objectFit: "cover", objectPosition: "center", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(29,29,27,0.6))", padding: "24px 20px 18px" }}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(11px,1vw,12.5px)", fontWeight: 500, color: WHITE, marginBottom: 4 }}>The Lamella Web</div>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              189,000 kN buckling capacity — engineered elegance
            </div>
          </div>
        </div>
      </section>

      {/* ══ COLLABORATORS ═════════════════════════════════ */}
      <Section>
        <Rv>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: SAND }} />
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10.5px", letterSpacing: "0.45em", textTransform: "uppercase", color: SAND }}>Project Collaborators</div>
          </div>
        </Rv>
        <Rv delay={0.1}><H2>The Team Behind the Tower</H2></Rv>
        <Rv delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: STONE, marginTop: 40 }}>
            {COLLABORATORS.map(({ role, org }) => (
              <div key={org} style={{ background: WHITE, padding: "clamp(24px,2.5vw,32px) clamp(20px,2vw,28px)" }}>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: SAND, marginBottom: 12 }}>{role}</div>
                <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 400, color: DARK }}>{org}</div>
              </div>
            ))}
          </div>
        </Rv>
      </Section>

      <DarkBand title="Explore Sustainability &amp; Innovation" subtitle="See how Al Hamra Tower's climate-responsive engineering translates into world-class environmental performance." ctaLabel="Sustainability" ctaHref="/tower/sustainability" />

      {/* Scoped styles */}
      <style>{`
        .awards-hero-text {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(24px,5vw,60px) clamp(20px,5vw,80px) clamp(40px,5vw,80px);
        }
        .awards-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid ${STONE};
          border-bottom: 1px solid ${STONE};
          background: ${STONE};
          gap: 1px;
        }
        .awards-lobby-text {
          padding: clamp(24px,5vw,60px) clamp(20px,5vw,80px);
          max-width: 680px;
        }
        .eng-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .eng-card-text {
          padding: clamp(36px,5vw,80px) clamp(24px,4vw,72px);
        }
        .eng-card-flip .eng-card-img { order: 2; }
        .eng-card-flip .eng-card-text { order: 1; }
        .awards-photo-pair > * {
          border-right: 1px solid ${STONE};
        }
        .awards-photo-pair > *:last-child {
          border-right: none;
        }

        /* ─── Awards & Honours Recognition ─────────────────── */
        .award-controls {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 20px;
          margin-top: 4px;
        }
        .award-filters {
          display: flex; flex-wrap: wrap; gap: 10px;
          flex: 1 1 auto;
        }
        .view-toggle {
          display: inline-flex;
          border: 1px solid ${STONE};
          background: ${WHITE};
          padding: 3px;
          flex-shrink: 0;
        }
        .view-toggle-btn {
          font-family: 'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 8px 16px; border: none; background: transparent;
          color: ${MUTED}; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s ease;
        }
        .view-toggle-btn:hover { color: ${DARK}; }
        .view-toggle-btn.is-active {
          background: ${DARK}; color: ${WHITE};
        }

        .award-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .award-card {
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          outline: none;
        }
        .award-card:hover,
        .award-card:focus-visible {
          box-shadow: 0 24px 60px -30px rgba(29,29,27,0.28);
          border-color: ${SAND_AA};
        }
        .award-card:focus-visible {
          outline: 2px solid ${SAND_AA};
          outline-offset: 2px;
        }

        .award-footer-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ─── Timeline (horizontal scroll) view ────────────── */
        .timeline-wrap {
          position: relative;
          outline: none;
        }
        .timeline-controls {
          display: flex; justify-content: flex-end; gap: 8px;
          margin-bottom: 18px;
        }
        .timeline-chev {
          width: 42px; height: 42px;
          border: 1px solid ${STONE};
          background: ${WHITE}; color: ${DARK};
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .timeline-chev:hover {
          background: ${DARK}; color: ${WHITE};
          border-color: ${DARK};
        }
        .timeline-scroller {
          display: flex; gap: 24px;
          overflow-x: auto; overflow-y: hidden;
          padding: 4px 4px 28px;
          scroll-snap-type: x mandatory;
          scroll-padding-left: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: ${STONE} transparent;
        }
        .timeline-scroller::-webkit-scrollbar { height: 6px; }
        .timeline-scroller::-webkit-scrollbar-track { background: transparent; }
        .timeline-scroller::-webkit-scrollbar-thumb {
          background: ${STONE}; border-radius: 3px;
        }
        .timeline-scroller::-webkit-scrollbar-thumb:hover { background: ${SAND_AA}; }

        .timeline-card {
          flex: 0 0 clamp(280px, 30vw, 360px);
          scroll-snap-align: start;
          background: ${WHITE};
          border: 1px solid ${STONE};
          display: flex; flex-direction: column;
          cursor: pointer; outline: none;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .timeline-card:hover,
        .timeline-card:focus-visible {
          box-shadow: 0 20px 50px -28px rgba(29,29,27,0.3);
          border-color: ${SAND_AA};
        }
        .timeline-card:focus-visible {
          outline: 2px solid ${SAND_AA};
          outline-offset: 2px;
        }
        .timeline-card-visual {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .timeline-card-text {
          padding: 20px 22px 16px;
          flex-grow: 1;
        }
        .timeline-card-year {
          padding: 10px 22px 18px;
          border-top: 1px solid ${STONE};
          text-align: center;
        }

        .timeline-rail {
          position: relative;
          height: 1px;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .timeline-rail-line {
          position: absolute; left: 0; right: 0; top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, ${STONE} 15%, ${STONE} 85%, transparent 100%);
        }
        .timeline-hint {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif;
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: ${MUTED};
        }

        /* ─── Lightbox responsive behaviour ────────────────── */
        .award-lightbox-dialog {
          border-radius: 0;
        }

        @media (max-width: 900px) {
          .awards-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .eng-card { grid-template-columns: 1fr; }
          .eng-card-img { order: -1 !important; }
          .eng-card-text { order: 1 !important; }
          .awards-photo-pair { grid-template-columns: 1fr !important; }
          .award-hero { grid-template-columns: 1fr !important; }
          .award-grid { grid-template-columns: 1fr; gap: 20px; }
          .award-footer-stats { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .award-controls { flex-direction: column; align-items: flex-start; }
          .view-toggle { align-self: flex-end; }
          .award-lightbox-dialog {
            grid-template-columns: 1fr !important;
            max-height: 95vh !important;
          }
        }

        @media (max-width: 640px) {
          .awards-stats-bar { grid-template-columns: 1fr 1fr; }
          .awards-lobby-text { padding: 32px 20px; }
          .award-filters { gap: 8px; }
          .award-filters button {
            font-size: 10px !important;
            padding: 8px 12px !important;
            letter-spacing: 0.2em !important;
          }
          .view-toggle-btn {
            font-size: 10px; padding: 7px 12px;
            letter-spacing: 0.16em;
          }
          .timeline-card {
            flex-basis: clamp(240px, 82vw, 320px);
          }
        }

        @media (max-width: 480px) {
          .awards-stats-bar { grid-template-columns: 1fr; }
          .award-footer-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </PageLayout>
  );
}
