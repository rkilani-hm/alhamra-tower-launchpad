import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ── HorizontalGallery ────────────────────────────────────────────────
   Burj Khalifa and top luxury tower sites use horizontal scroll
   galleries — editorial-grade, drag to explore, no cropping.
   
   Drag to scroll, momentum physics, cursor changes to grab/grabbing.
   Images shown at natural aspect ratio in a tall fixed-height container.
   White background keeps it clean and editorial.
──────────────────────────────────────────────────────────────────────── */

const PEARL  = "#C8B99A";
const CG     = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

const IMAGES = [
  { src: "/assets/tower-exterior-blue-sky.jpg",      caption: "Al Hamra Tower — Kuwait City skyline",         year: "2011" },
  { src: "/assets/lobby-lamella-ceiling.jpg",        caption: "The Lamella — 24m column-free lobby vault",    year: "2011" },
  { src: "/assets/facade-limestone-south-wall.jpg",  caption: "South wall — 258,000 m² Jura limestone",       year: "2011" },
  { src: "/assets/sky-lobby-travertine-corridor.jpg",caption: "Sky Lobby — floor 55, travertine & chandelier", year: "2011" },
  { src: "/assets/tower-entrance-night.jpg",         caption: "Grand entrance — Sharq District, Kuwait City",  year: "2011" },
  { src: "/assets/office-south-corridor.jpg",        caption: "Office floors — column-free, Gulf-facing",      year: "2011" },
];

export function HorizontalGallery() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const velRef    = useRef(0);
  const lastX     = useRef(0);
  const rafRef    = useRef<number>();
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");
  const [activeIdx, setActiveIdx] = useState(0);

  /* Momentum physics */
  const applyMomentum = () => {
    const track = trackRef.current;
    if (!track) return;
    velRef.current *= 0.92;
    track.scrollLeft += velRef.current;
    if (Math.abs(velRef.current) > 0.5) {
      rafRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setCursor("grabbing");
    startX.current  = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    lastX.current = e.pageX;
    cancelAnimationFrame(rafRef.current!);
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const x    = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.2;
    velRef.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    setCursor("grab");
    rafRef.current = requestAnimationFrame(applyMomentum);
  };

  /* Update active index based on scroll position */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const itemW = track.scrollWidth / IMAGES.length;
      setActiveIdx(Math.round(track.scrollLeft / itemW));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{
      background: "#F8F6F3",
      padding: "clamp(56px,8vh,96px) 0 clamp(40px,5vh,64px)",
      overflow: "hidden",
    }}>

      {/* Header */}
      <div style={{
        padding: "0 clamp(28px,6vw,96px)",
        marginBottom: 40,
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 16,
          }}>
            <span style={{ width: 32, height: 1, background: `linear-gradient(to right, ${PEARL}, #D4CFC9)`, flexShrink: 0 }} />
            <span style={{
              fontFamily: CG, fontSize: "11px", letterSpacing: "0.4em",
              textTransform: "uppercase", color: PEARL,
            }}>
              The Tower
            </span>
          </div>
          <h2 style={{
            fontFamily: CG, fontWeight: 300,
            fontSize: "clamp(26px,3vw,42px)",
            color: "#1D1D1B", margin: 0, lineHeight: 1.1,
          }}>
            At every altitude,<br />a different world.
          </h2>
        </div>
        {/* Drag hint */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          opacity: 0.5,
        }} aria-hidden="true">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M1 7H21M15 1L21 7L15 13" stroke={PEARL} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.28em", textTransform: "uppercase", color: "#6B6B6B",
          }}>
            Drag to explore
          </span>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          display: "flex",
          gap: 16,
          paddingLeft: "clamp(28px,6vw,96px)",
          paddingRight: "clamp(28px,6vw,96px)",
          overflowX: "auto",
          cursor,
          userSelect: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            style={{
              flexShrink: 0,
              width: "clamp(260px,32vw,460px)",
              pointerEvents: "none",
            }}
          >
            {/* Image */}
            <div style={{
              height: "clamp(320px,42vw,560px)",
              overflow: "hidden",
              background: "#0c0b09",
              border: i === activeIdx ? `1px solid rgba(200,185,154,0.4)` : "1px solid transparent",
              transition: "border-color 0.3s ease",
            }}>
              <img
                loading="lazy"
                src={img.src}
                alt={img.caption}
                draggable={false}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                  transform: i === activeIdx ? "scale(1.02)" : "scale(1)",
                }}
              />
            </div>
            {/* Caption */}
            <div style={{ paddingTop: 14, paddingRight: 8 }}>
              <div style={{
                fontFamily: CG, fontSize: "10px",
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#6B6B6B", marginBottom: 4,
              }}>
                {String(i + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
              </div>
              <div style={{
                fontFamily: CG, fontSize: "clamp(12px,1vw,13px)",
                fontWeight: 300, color: "#1D1D1B", lineHeight: 1.5,
              }}>
                {img.caption}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Trailing spacer */}
        <div style={{ flexShrink: 0, width: "clamp(28px,6vw,96px)" }} />
      </div>

      {/* Progress dots */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 8,
        marginTop: 28,
      }} role="tablist" aria-label="Gallery position">
        {IMAGES.map((_, i) => (
          <button
            type="button"
            key={i}
            role="tab"
            aria-selected={activeIdx === i}
            aria-label={`Image ${i + 1}`}
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              const itemW = track.scrollWidth / IMAGES.length;
              track.scrollTo({ left: i * itemW, behavior: "smooth" });
            }}
            style={{
              width: activeIdx === i ? 24 : 6,
              height: 6, borderRadius: 3,
              background: activeIdx === i ? PEARL : "rgba(200,185,154,0.3)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
