import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Editable, SlotImage } from "@/lib/EditMode";

/* ── HeroImageCentered ─────────────────────────────────────────────────
   Full-bleed image hero overlaid with a single bold headline centred in
   the middle. Used on Tower Overview, Experience Overview and Leasing.
   Image is CMS-swappable via SlotImage (static asset fallback); the text
   line is click-to-edit via `editId`.
──────────────────────────────────────────────────────────────────────── */

const FONT = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

interface Props {
  /** SlotImage slot key (admin-swappable image). */
  slot: string;
  /** Static fallback asset path, e.g. "/assets/tower-overview-banner.jpg". */
  image: string;
  alt: string;
  /** page_prose Editable id for the headline text, e.g. "page_prose:leasing:title". */
  editId?: string;
  /** The single bold headline line. */
  children: ReactNode;
}

export function HeroImageCentered({ slot, image, alt, editId, children }: Props) {
  return (
    <section style={{ position: "relative", height: "clamp(360px,60vh,620px)",
      overflow: "hidden", background: "#0c0b09" }}>
      <SlotImage
        motion
        slot={slot}
        fallback={image}
        alt={alt}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center", filter: "brightness(0.6)" }}
      />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(12,11,9,0.35) 0%, rgba(12,11,9,0.55) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "0 clamp(24px,6vw,96px)" }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: FONT, fontWeight: 700,
            fontSize: "clamp(30px,6vw,84px)", color: "#fff",
            letterSpacing: "-0.01em", lineHeight: 1.05, margin: 0,
            textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>
          {editId ? <Editable id={editId}>{children}</Editable> : children}
        </motion.h1>
      </div>
    </section>
  );
}
