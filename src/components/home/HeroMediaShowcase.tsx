import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useEditMode, PopoverShell, isVideoSrc } from "@/lib/EditMode";

/* ──────────────────────────────────────────────────────────────────────────
   HeroMediaShowcase — a full-bleed hero that holds MANY media items (videos
   and images together) in one location, admin-managed in place.

   Storage: reuses the feature_cards table with collection = "home.heroGallery"
   (image_id → media_assets, sort_order, status). No new table / migration —
   the standard CMS RLS already applies (public reads published; managers add,
   publish, reorder and delete; editors add drafts).

   View mode: rotates through the PUBLISHED items — videos play to the end then
   advance, images hold for a few seconds — with a crossfade, dots and arrows.
   If the gallery is empty it falls back to the original single hero video, so
   the homepage is never worse than before. Honours reduced-data / reduced-
   motion by showing a single still.
──────────────────────────────────────────────────────────────────────────── */

const COLLECTION = "home.heroGallery";

// Video (and the poster still) fill the frame full-bleed — cover, with a touch
// of parallax overscan and a brightness lift for the dusk footage.
const videoStyle: React.CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "115%",
  objectFit: "cover", objectPosition: "center 15%", display: "block",
  filter: "brightness(1.18) saturate(1.05)",
};

// Uploaded images fill the hero full-bleed (cover), matching the video. The
// client supplies 16:9 assets, so any crop against the viewport is negligible.
// Left unaltered (no brightness filter — images are chosen already-exposed).
const imageStyle: React.CSSProperties = {
  position: "absolute", inset: 0, width: "100%", height: "115%",
  objectFit: "cover", objectPosition: "center", display: "block",
};

type Item = { id: string; url: string; alt: string; isVideo: boolean; status: string; sort: number };

/* Persist the resolved gallery so a reload paints the correct media instantly
   (stale-while-revalidate) rather than flashing the bundled fallback video
   while the network fetch is in flight. */
const HERO_LS_KEY = "ah_herogallery_v1";
function readHeroLS(): Item[] | null {
  try {
    const s = typeof localStorage !== "undefined" ? localStorage.getItem(HERO_LS_KEY) : null;
    const a = s ? JSON.parse(s) : null;
    return Array.isArray(a) ? (a as Item[]) : null;
  } catch { return null; }
}
function writeHeroLS(items: Item[]) {
  try { localStorage.setItem(HERO_LS_KEY, JSON.stringify(items)); } catch { /* quota / unavailable */ }
}

async function fetchGallery(allStatuses: boolean): Promise<Item[]> {
  let q = supabase
    .from("feature_cards")
    .select("id,image_id,sort_order,status")
    .eq("collection", COLLECTION)
    .order("sort_order", { ascending: true });
  if (!allStatuses) q = q.eq("status", "published");
  const { data: rows, error } = await q;
  if (error || !rows || rows.length === 0) return [];

  const ids = rows.map((r: any) => r.image_id).filter(Boolean) as string[];
  const media: Record<string, { url: string; alt: string }> = {};
  if (ids.length) {
    const { data: m } = await supabase.from("media_assets").select("id,public_url,alt_en").in("id", ids);
    (m ?? []).forEach((a: any) => { media[a.id] = { url: a.public_url, alt: a.alt_en ?? "" }; });
  }
  return rows
    .filter((r: any) => r.image_id && media[r.image_id])
    .map((r: any) => ({
      id: r.id, url: media[r.image_id].url, alt: media[r.image_id].alt,
      isVideo: isVideoSrc(media[r.image_id].url), status: r.status, sort: r.sort_order,
    }));
}

export function HeroMediaShowcase({
  fallbackVideo, fallbackPoster, lightHero, mediaY,
  pauseLabel, playLabel,
}: {
  fallbackVideo: string;
  fallbackPoster: string;
  lightHero: boolean;
  mediaY: MotionValue<string> | MotionValue<number>;
  pauseLabel: string;
  playLabel: string;
}) {
  const { enabled } = useEditMode();
  // Seed from the persisted gallery so a reload renders the right media at once.
  const [published, setPublished] = useState<Item[] | null>(() => readHeroLS());
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [manageOpen, setManageOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGallery(false).then((items) => {
      if (cancelled) return;
      setPublished(items);
      writeHeroLS(items);
    });
    return () => { cancelled = true; };
  }, []);

  // True only once the gallery has actually resolved (from cache or network).
  // Until then, on a cold first visit we show a neutral dark frame rather than
  // the bundled fallback video, so no "old media" ever flashes.
  const resolved = published !== null;

  const fallbackItem: Item = {
    id: "__fallback", url: fallbackVideo, alt: "",
    isVideo: isVideoSrc(fallbackVideo), status: "published", sort: 0,
  };
  const items = published && published.length > 0 ? published : [fallbackItem];
  const safeIndex = index % items.length;
  const current = items[safeIndex];
  const multiple = items.length > 1;

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  // Reset if the list shrank underneath us.
  useEffect(() => { if (index >= items.length) setIndex(0); }, [items.length, index]);

  // Auto-advance images (videos advance on their own `ended`).
  useEffect(() => {
    if (lightHero || !multiple || !playing || current.isVideo) return;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIndex, lightHero, multiple, playing, current.isVideo]);

  // Keep the real <video> element in sync with the play/pause state. Driving it
  // from an effect (not only inside the click handler) guarantees the video
  // actually pauses/resumes — even across rotations and re-renders.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || lightHero || !current.isVideo) return;
    if (playing) v.play().catch(() => {}); else v.pause();
  }, [playing, safeIndex, current.isVideo, lightHero]);

  const toggle = () => setPlaying((p) => !p);

  return (
    <>
      <motion.div style={{ position: "absolute", inset: 0, y: mediaY }}>
        <AnimatePresence initial={false}>
          {!resolved ? (
            <motion.div
              key="hero-loading"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", inset: 0, background: "#0c0b09" }}
              aria-hidden="true"
            />
          ) : (
          <motion.div
            key={lightHero ? "light" : current.id + ":" + safeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            style={{ position: "absolute", inset: 0 }}
          >
            {lightHero ? (
              <img
                src={current.isVideo ? fallbackPoster : current.url}
                alt={current.alt}
                style={current.isVideo ? videoStyle : imageStyle}
              />
            ) : current.isVideo ? (
              // Plain <video> (real DOM ref) so play()/pause() is reliable.
              <video
                ref={videoRef}
                src={current.url}
                autoPlay={playing}
                muted
                playsInline
                preload="auto"
                poster={fallbackPoster}
                loop={!multiple}
                onEnded={multiple ? next : undefined}
                style={videoStyle}
              />
            ) : (
              <img src={current.url} alt={current.alt} style={imageStyle} />
            )}
          </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Prev / next arrows + dots (only with several items) */}
      {resolved && !lightHero && multiple && (
        <>
          <button onClick={prev} aria-label="Previous" className="hero-nav-arrow" style={arrowStyle("left")}>‹</button>
          <button onClick={next} aria-label="Next" className="hero-nav-arrow" style={arrowStyle("right")}>›</button>
          <div style={{
            position: "absolute", bottom: 104, left: 0, right: 0, zIndex: 9,
            display: "flex", justifyContent: "center", gap: 10, pointerEvents: "none",
          }} className="hero-dots">
            {items.map((it, i) => (
              <button
                key={it.id}
                onClick={() => setIndex(i)}
                aria-label={`Show item ${i + 1}`}
                style={{
                  pointerEvents: "auto", width: i === safeIndex ? 26 : 9, height: 4,
                  padding: 0, border: "none", cursor: "pointer", borderRadius: 2,
                  background: i === safeIndex ? "#C8B99A" : "rgba(255,255,255,0.45)",
                  transition: "width 0.4s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* WCAG 2.1.2 pause/play — only when the current item is a moving video */}
      {resolved && !lightHero && current.isVideo && (
        <button
          onClick={toggle}
          aria-label={playing ? pauseLabel : playLabel}
          className="hero-pause-btn"
          style={{
            position: "absolute", bottom: 88, right: 20, zIndex: 20,
            background: "rgba(12,11,9,0.5)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", width: 44, height: 44, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)", transition: "background 0.2s ease", padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(29,29,27,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(12,11,9,0.5)")}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="4" height="14" rx="1" /><rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
              <path d="M1 1l10 6-10 6V1z" />
            </svg>
          )}
        </button>
      )}

      {/* Admin: manage the whole gallery in place */}
      {enabled && (
        <button
          onClick={() => setManageOpen(true)}
          style={{
            position: "absolute", top: 84, right: 20, zIndex: 40,
            background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
            padding: "8px 14px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
          }}
        >Manage hero media</button>
      )}
      {manageOpen && <HeroGalleryManager onClose={() => setManageOpen(false)} />}

      <style>{`
        .hero-nav-arrow { opacity: 0; transition: opacity 0.3s ease, background 0.2s ease; }
        section:hover .hero-nav-arrow { opacity: 1; }
        @media (max-width: 768px) { .hero-dots { bottom: 24px; } }
      `}</style>
    </>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", top: "50%", [side]: 18, transform: "translateY(-50%)",
    zIndex: 12, width: 46, height: 46, borderRadius: "50%",
    background: "rgba(12,11,9,0.4)", border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff", fontSize: 24, lineHeight: 1, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(6px)", paddingBottom: 3,
  };
}

/* ── In-place manager: upload / add / reorder / publish / delete ─────────── */
function HeroGalleryManager({ onClose }: { onClose: () => void }) {
  const [rows, setRows] = useState<Item[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { fetchGallery(true).then(setRows); }, []);

  async function addFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("site-media").upload(path, file, { upsert: false, contentType: file.type });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      const { data: u } = await supabase.auth.getUser();
      const ins = await supabase.from("media_assets")
        .insert({ storage_path: path, public_url: pub.publicUrl, alt_en: file.name, uploaded_by: u.user?.id ?? null })
        .select("id").single();
      if (!ins.data) throw new Error("media insert failed");
      const maxSort = rows && rows.length ? Math.max(...rows.map((r) => r.sort)) : -1;
      await (supabase as any).from("feature_cards").insert({
        collection: COLLECTION, image_id: ins.data.id, sort_order: maxSort + 1,
        status: "published", updated_by: u.user?.id ?? null,
      });
      window.location.reload();
    } catch { setBusy(false); }
  }

  async function remove(id: string) {
    setBusy(true);
    await supabase.from("feature_cards").delete().eq("id", id);
    window.location.reload();
  }

  async function togglePublish(it: Item) {
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    await (supabase as any).from("feature_cards")
      .update({ status: it.status === "published" ? "draft" : "published", updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() })
      .eq("id", it.id);
    window.location.reload();
  }

  async function move(it: Item, dir: -1 | 1) {
    if (!rows) return;
    const i = rows.findIndex((r) => r.id === it.id);
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    setBusy(true);
    const a = rows[i], b = rows[j];
    const { data: u } = await supabase.auth.getUser();
    await (supabase as any).from("feature_cards").update({ sort_order: b.sort, updated_by: u.user?.id ?? null }).eq("id", a.id);
    await (supabase as any).from("feature_cards").update({ sort_order: a.sort, updated_by: u.user?.id ?? null }).eq("id", b.id);
    window.location.reload();
  }

  return (
    <PopoverShell title="Hero media — videos & images" onClose={onClose}>
      <div style={{ fontSize: 11, color: "#6E6456", marginBottom: 12, lineHeight: 1.5 }}>
        Add as many videos and images as you like — they rotate in the hero, in this order. Newly added items are published (live) immediately.
      </div>
      <label style={{ display: "inline-block", marginBottom: 14, padding: "8px 16px", background: "#C8B99A", color: "#1D1D1B", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
        {busy ? "Working…" : "+ Add video or image"}
        <input type="file" accept="image/*,video/*" onChange={addFile} style={{ display: "none" }} disabled={busy} />
      </label>

      {!rows ? (
        <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div>
      ) : rows.length === 0 ? (
        <div style={{ fontSize: 13, color: "#6E6456" }}>No hero media yet — the original hero video is showing. Add items above.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((it, i) => (
            <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #E4DED3", padding: 6 }}>
              <div style={{ width: 64, height: 44, flexShrink: 0, background: "#0c0b09", overflow: "hidden" }}>
                {it.isVideo
                  ? <video src={it.url} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <img src={it.url} alt={it.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: it.isVideo ? "#9A7550" : "#6E6456" }}>
                  {it.isVideo ? "Video" : "Image"} · #{i + 1}
                </div>
                <div style={{ fontSize: 10, color: it.status === "published" ? "#3B7A57" : "#B0862F" }}>
                  {it.status === "published" ? "Live" : "Draft (hidden)"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <IconBtn label="Move up" disabled={busy || i === 0} onClick={() => move(it, -1)}>↑</IconBtn>
                <IconBtn label="Move down" disabled={busy || i === rows.length - 1} onClick={() => move(it, 1)}>↓</IconBtn>
                <IconBtn label={it.status === "published" ? "Hide" : "Publish"} disabled={busy} onClick={() => togglePublish(it)}>
                  {it.status === "published" ? "◎" : "●"}
                </IconBtn>
                <IconBtn label="Delete" disabled={busy} onClick={() => remove(it.id)} danger>×</IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
    </PopoverShell>
  );
}

function IconBtn({ children, onClick, disabled, danger, label }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean; label: string;
}) {
  return (
    <button
      onClick={onClick} disabled={disabled} title={label} aria-label={label}
      style={{
        width: 28, height: 28, cursor: disabled ? "default" : "pointer",
        border: "1px solid #D8D2C7", background: "#fff", opacity: disabled ? 0.35 : 1,
        color: danger ? "#B05050" : "#1D1D1B", fontSize: 14, lineHeight: 1, padding: 0,
      }}
    >{children}</button>
  );
}
