/* ──────────────────────────────────────────────────────────────────────────
   In-place visual editing — opt-in overlay for logged-in staff.

   SAFETY MODEL: this is completely dormant for normal visitors. Edit mode only
   activates when (a) a Supabase session exists AND (b) the user explicitly
   enabled it (via ?edit=1 or the toggle). When off, <Editable> renders its
   children verbatim with zero wrapping — the public site is byte-identical to
   before. All editing happens through the authed client, so RLS applies.

   Field identity is encoded as "table:group:field":
     - section_fields:  "section_fields:hero:title"
     - page_prose:      "page_prose:towerSustain:heroTitle"
   The overlay parses this to know what to update.
────────────────────────────────────────────────────────────────────────── */

import { createContext, useContext, useEffect, useState, ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSlotImage, invalidateSlotCache } from "@/lib/useCmsContent";
import { toEasternArabic } from "@/admin/ui";

interface EditContextValue {
  enabled: boolean;          // edit mode actively on
  canEdit: boolean;          // user is authenticated staff
  setEnabled: (v: boolean) => void;
}
const EditCtx = createContext<EditContextValue>({ enabled: false, canEdit: false, setEnabled: () => {} });

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [canEdit, setCanEdit] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Is there a logged-in user? (Only staff can have a session on this app.)
    supabase.auth.getSession().then(({ data }) => {
      const has = !!data.session;
      setCanEdit(has);
      // Auto-enable if ?edit=1 is present and the user is staff.
      const params = new URLSearchParams(window.location.search);
      if (has && params.get("edit") === "1") setEnabled(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setCanEdit(!!sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <EditCtx.Provider value={{ enabled: enabled && canEdit, canEdit, setEnabled }}>
      {children}
      {canEdit && <EditModeToggle enabled={enabled && canEdit} setEnabled={setEnabled} />}
    </EditCtx.Provider>
  );
}

export function useEditMode() { return useContext(EditCtx); }

/* Floating toggle, only visible to authenticated staff. */
function EditModeToggle({ enabled, setEnabled }: { enabled: boolean; setEnabled: (v: boolean) => void }) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 9999,
        background: enabled ? "#C8B99A" : "#1D1D1B", color: enabled ? "#1D1D1B" : "#F5F2EE",
        border: "1px solid #C8B99A", padding: "10px 16px", cursor: "pointer",
        fontFamily: "'Century Gothic',sans-serif", fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {enabled ? "✓ Editing — click any text" : "Edit this page"}
    </button>
  );
}

/* ── <Editable> ───────────────────────────────────────────────────────────
   Wrap any rendered text. Off → passthrough. On → hoverable, click to edit. */
export function Editable({
  id, children, as = "span", style,
}: {
  id: string;                // "table:group:field"
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}) {
  const { enabled } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  // Off mode: render children exactly as-is, no wrapper semantics.
  if (!enabled) {
    const Tag = as as any;
    return style ? <Tag style={style}>{children}</Tag> : <>{children}</>;
  }

  const Tag = as as any;
  return (
    <Tag
      style={{
        ...style,
        position: "relative", cursor: "pointer",
        outline: hover ? "2px dashed #C8B99A" : "1px dashed rgba(200,185,154,0.5)",
        outlineOffset: 2, borderRadius: 2,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e: any) => { e.stopPropagation(); e.preventDefault(); setEditing(true); }}
    >
      {children}
      {editing && <EditPopover id={id} onClose={() => setEditing(false)} />}
    </Tag>
  );
}

/* The inline edit popover — loads current value, saves + publishes on confirm. */
function EditPopover({ id, onClose }: { id: string; onClose: () => void }) {
  const [table, group, field] = id.split(":");
  const [valEn, setValEn] = useState("");
  const [valAr, setValAr] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [longText, setLongText] = useState(false);

  useEffect(() => {
    (async () => {
      const groupCol = table === "section_fields" ? "section_key" : "page_key";
      const { data } = await (supabase.from(table as any) as any)
        .select("id,value_en,value_ar,field_type")
        .eq(groupCol, group).eq("field_key", field).maybeSingle();
      if (data) {
        setRowId(data.id); setValEn(data.value_en ?? ""); setValAr(data.value_ar ?? "");
        setLongText(data.field_type === "long" || (data.value_en ?? "").length > 60);
      }
      setLoading(false);
    })();
  }, [table, group, field]);

  async function save(publish: boolean) {
    if (!rowId) return;
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    const patch: any = { value_en: valEn, value_ar: valAr, updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() };
    if (publish) patch.status = "published";
    await (supabase.from(table as any) as any).update(patch).eq("id", rowId);
    setBusy(false);
    onClose();
    if (publish) window.location.reload(); // reflect published change
  }

  return (
    <PopoverShell title="Edit text" onClose={onClose}>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This text isn't editable yet ({id}).</div>
      ) : (
        <>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A7550", marginBottom: 10 }}>
            {group} · {field}
          </div>
          <Label>English</Label>
          {longText
            ? <textarea value={valEn} onChange={(e) => setValEn(e.target.value)} rows={3} style={ta} />
            : <input value={valEn} onChange={(e) => setValEn(e.target.value)} style={inp} />}
          <Label>العربية</Label>
          {longText
            ? <textarea value={valAr} onChange={(e) => setValAr(toEasternArabic(e.target.value))} rows={3} dir="rtl" style={{ ...ta, textAlign: "right" }} />
            : <input value={valAr} onChange={(e) => setValAr(toEasternArabic(e.target.value))} dir="rtl" style={{ ...inp, textAlign: "right" }} />}
          <div style={{ position: "sticky", bottom: -18, background: "#fff", paddingTop: 12, paddingBottom: 2, marginTop: 12, borderTop: "1px solid #ECE7DD", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => save(true)} disabled={busy} style={solid}>{busy ? "Saving…" : "Publish"}</button>
            <button onClick={() => save(false)} disabled={busy} style={ghost}>Save draft</button>
            <button onClick={onClose} disabled={busy} style={ghost}>Cancel</button>
          </div>
        </>
      )}
    </PopoverShell>
  );
}

const Label = ({ children }: { children: ReactNode }) =>
  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6E6456", margin: "8px 0 4px" }}>{children}</div>;
const inp: CSSProperties = { width: "100%", padding: "8px 10px", border: "1px solid #D8D2C7", fontFamily: "inherit", fontSize: 14, background: "#FCFBF9", color: "#1D1D1B", caretColor: "#1D1D1B", outline: "none", WebkitTextFillColor: "#1D1D1B" } as CSSProperties;
const ta: CSSProperties = { ...inp, resize: "vertical", lineHeight: 1.6 };
const solid: CSSProperties = { padding: "8px 16px", background: "#C8B99A", color: "#1D1D1B", border: "none", fontFamily: "inherit", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" };
const ghost: CSSProperties = { padding: "8px 16px", background: "transparent", color: "#3A3733", border: "1px solid #C5BCA9", fontFamily: "inherit", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" };

/* ──────────────────────────────────────────────────────────────────────────
   <EditableRow> — in-place editing for STRUCTURED tables (stat_counters,
   feature_cards, timeline_entries, spec_rows). These don't fit the flat
   value_en/value_ar shape, so this sibling wrapper addresses a row by its
   natural key and edits the table's relevant bilingual fields.

   Locator: "table:group:key"
     stat_counters:home:height           → group_key='home',  stat_key='height'
     feature_cards:towerSustain.pillars:0 → collection=...,    sort_order=0
     timeline_entries:towerRising.eras:0  → collection=...,    sort_order=0
     spec_rows::5                         → (no group),        sort_order=5
──────────────────────────────────────────────────────────────────────────── */

interface RowFieldDef { col: string; label: string; bilingual: boolean; }
const ROW_FIELDS: Record<string, RowFieldDef[]> = {
  stat_counters: [
    { col: "display", label: "Display value", bilingual: true },
    { col: "unit", label: "Unit", bilingual: true },
    { col: "label", label: "Label", bilingual: true },
    { col: "sub", label: "Sub-label", bilingual: true },
  ],
  feature_cards: [
    { col: "title", label: "Title", bilingual: true },
    { col: "body", label: "Body", bilingual: true },
    { col: "image_caption", label: "Image caption", bilingual: true },
  ],
  timeline_entries: [
    { col: "title", label: "Title", bilingual: true },
    { col: "body", label: "Body", bilingual: true },
  ],
  spec_rows: [
    { col: "label", label: "Label", bilingual: true },
    { col: "value", label: "Value", bilingual: true },
  ],
  awards: [
    { col: "year", label: "Year", bilingual: false },
    { col: "title", label: "Title", bilingual: true },
    { col: "sub", label: "Subtitle", bilingual: true },
  ],
};
// How to locate a row by its natural key, per table.
function rowMatch(table: string, group: string, key: string) {
  if (table === "stat_counters") return [{ c: "group_key", v: group }, { c: "stat_key", v: key }];
  if (table === "spec_rows") return [{ c: "__or_label__", v: key }];
  if (table === "awards") return [{ c: "sort_order", v: Number(key) }];
  // feature_cards / timeline_entries: collection + sort_order
  return [{ c: "collection", v: group }, { c: "sort_order", v: Number(key) }];
}

export function EditableRow({
  id, children, as = "span", style,
}: { id: string; children: ReactNode; as?: keyof JSX.IntrinsicElements; style?: CSSProperties }) {
  const { enabled } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  if (!enabled) {
    const Tag = as as any;
    return style ? <Tag style={style}>{children}</Tag> : <>{children}</>;
  }
  const Tag = as as any;
  return (
    <Tag
      style={{ ...style, position: "relative", cursor: "pointer",
        outline: hover ? "2px dashed #C8B99A" : "1px dashed rgba(200,185,154,0.5)", outlineOffset: 2, borderRadius: 2 }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={(e: any) => { e.stopPropagation(); e.preventDefault(); setEditing(true); }}
    >
      {children}
      {editing && <RowPopover id={id} onClose={() => setEditing(false)} />}
    </Tag>
  );
}

function RowPopover({ id, onClose }: { id: string; onClose: () => void }) {
  const [table, group, key] = id.split(":");
  const fields = ROW_FIELDS[table] ?? [];
  const [vals, setVals] = useState<Record<string, string>>({});
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      let q = (supabase.from(table as any) as any).select("*");
      for (const m of rowMatch(table, group, key)) {
        if (m.c === "__or_label__") {
          q = q.or(`label_en.eq.${m.v},label_ar.eq.${m.v}`);
        } else {
          q = q.eq(m.c, m.v);
        }
      }
      const { data } = await q.maybeSingle();
      if (data) {
        setRowId(data.id);
        const v: Record<string, string> = {};
        for (const f of fields) {
          if (f.bilingual) { v[`${f.col}_en`] = data[`${f.col}_en`] ?? ""; v[`${f.col}_ar`] = data[`${f.col}_ar`] ?? ""; }
          else v[f.col] = data[f.col] ?? "";
        }
        setVals(v);
      }
      setLoading(false);
    })();
  }, [id]);

  async function save(publish: boolean) {
    if (!rowId) return;
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    const patch: any = { ...vals, updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() };
    if (publish) patch.status = "published";
    await (supabase.from(table as any) as any).update(patch).eq("id", rowId);
    setBusy(false); onClose();
    if (publish) window.location.reload();
  }

  const set = (k: string, val: string) => setVals((p) => ({ ...p, [k]: val }));

  return (
    <PopoverShell title="Edit item" onClose={onClose}>
      <div style={{ direction: "ltr" }}>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This item isn't editable yet ({id}).</div>
      ) : (
        <>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A7550", marginBottom: 10 }}>
            {table.replace("_", " ")} · {group || key}
          </div>
          {fields.map((f) => f.bilingual ? (
            <div key={f.col}>
              <Label>{f.label} — EN</Label>
              <input value={vals[`${f.col}_en`] ?? ""} onChange={(e) => set(`${f.col}_en`, e.target.value)} style={inp} />
              <Label>{f.label} — AR</Label>
              <input value={vals[`${f.col}_ar`] ?? ""} onChange={(e) => set(`${f.col}_ar`, toEasternArabic(e.target.value))} dir="rtl" style={{ ...inp, textAlign: "right" }} />
            </div>
          ) : (
            <div key={f.col}>
              <Label>{f.label}</Label>
              <input value={vals[f.col] ?? ""} onChange={(e) => set(f.col, e.target.value)} style={inp} />
            </div>
          ))}
          <div style={{ position: "sticky", bottom: -18, background: "#fff", paddingTop: 12, paddingBottom: 2, marginTop: 12, borderTop: "1px solid #ECE7DD", display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => save(true)} disabled={busy} style={solid}>{busy ? "Saving…" : "Publish"}</button>
            <button onClick={() => save(false)} disabled={busy} style={ghost}>Save draft</button>
            <button onClick={onClose} disabled={busy} style={ghost}>Cancel</button>
          </div>
        </>
      )}
      </div>
    </PopoverShell>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   <EditableImage> — in-place image swap for feature_cards / timeline_entries.
   Wraps an <img> (passed as children). In edit mode, overlays a "Change image"
   control that opens a media library (pick existing) + upload (new file), then
   updates the row's image_id. Locator: "table:collection:index".
──────────────────────────────────────────────────────────────────────────── */

export function EditableImage({
  id, children,
}: { id: string; children: ReactNode }) {
  const { enabled } = useEditMode();
  const [open, setOpen] = useState(false);
  if (!enabled) return <>{children}</>;

  return (
    <span style={{ position: "relative", display: "block" }}>
      {children}
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 50,
          background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
          padding: "6px 12px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
        }}
      >Change image</button>
      {open && <ImageSwapPopover id={id} onClose={() => setOpen(false)} />}
    </span>
  );
}

/* Shared modal shell for image/video swap popovers. Renders a fixed,
   viewport-centered panel on a dimmed backdrop, above all page content —
   so it never gets clipped by a short image container or trapped beneath
   later sections. Backdrop click and Esc close it. */
function PopoverShell({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2147483000,
        background: "rgba(12,11,9,0.55)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420, maxWidth: "92vw", maxHeight: "85vh", overflowY: "auto",
          background: "#fff", border: "1px solid #C8B99A", boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
          padding: 18, fontFamily: "'Century Gothic',sans-serif", textAlign: "left",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A7550" }}>{title}</span>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#6E6456", lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ImageSwapPopover({ id, onClose }: { id: string; onClose: () => void }) {
  const [table, collection, index] = id.split(":");
  const [media, setMedia] = useState<any[]>([]);
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: row } = await (supabase.from(table as any) as any)
        .select("id").eq("collection", collection).eq("sort_order", Number(index)).maybeSingle();
      if (row) setRowId(row.id);
      const { data: m } = await supabase.from("media_assets").select("id,public_url,alt_en").order("created_at", { ascending: false });
      setMedia(m ?? []);
      setLoading(false);
    })();
  }, [id]);

  async function choose(imageId: string) {
    if (!rowId) return;
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    await (supabase.from(table as any) as any)
      .update({ image_id: imageId, status: "published", updated_by: u.user?.id ?? null, updated_at: new Date().toISOString() })
      .eq("id", rowId);
    setBusy(false); onClose(); window.location.reload();
  }

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("site-media").upload(path, file, { upsert: false, contentType: file.type });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      const { data: u } = await supabase.auth.getUser();
      const ins = await supabase.from("media_assets").insert({ storage_path: path, public_url: pub.publicUrl, alt_en: file.name, uploaded_by: u.user?.id ?? null }).select("id").single();
      if (ins.data) await choose(ins.data.id);
    } catch { setBusy(false); }
  }

  return (
    <PopoverShell title="Change image" onClose={onClose}>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This image isn't editable yet.</div>
      ) : (
        <>
          <label style={{ display: "inline-block", marginBottom: 10, padding: "7px 14px", background: "#C8B99A", color: "#1D1D1B", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
            {busy ? "Working…" : "Upload new"}
            <input type="file" accept="image/*" onChange={upload} style={{ display: "none" }} disabled={busy} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {media.map((m) => (
              <button key={m.id} onClick={() => choose(m.id)} disabled={busy}
                style={{ padding: 0, border: "1px solid #D8D2C7", background: "#fff", cursor: "pointer", aspectRatio: "4/3", overflow: "hidden" }}>
                {m.public_url ? <img src={m.public_url} alt={m.alt_en ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 9 }}>{m.alt_en}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </PopoverShell>
  );
}

/* Any media container (SlotImage / SlotVideo) can hold EITHER an image or a
   video — the admin can swap one for the other. We pick the element to render
   from the resolved asset's extension, not from which component was used. */
export const isVideoSrc = (u?: string) => !!u && /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(u);

/* ──────────────────────────────────────────────────────────────────────────
   <SlotImage> — a hardcoded image made editable via the image_slots table.
   Resolves slot→media (fallback to the original path). Renders an <img>, or a
   muted autoplay <video> if the chosen asset is a video — so an image
   container can be swapped for a video. In edit mode, overlays "Change media"
   → library pick / upload. Use in place of a plain <img> for section images.
──────────────────────────────────────────────────────────────────────────── */

export function SlotImage({
  slot, fallback, alt, style, className, motion: useMotion, ...rest
}: {
  slot: string; fallback: string; alt?: string;
  style?: any; className?: string; motion?: boolean; [k: string]: any;
}) {
  const { enabled } = useEditMode();
  const src = useSlotImage(slot, fallback);
  const [open, setOpen] = useState(false);

  // If the admin picked a video for this (nominally image) slot, render it as
  // a background-style video. Drop img-only props so they don't hit <video>.
  const asVideo = isVideoSrc(src);
  const { loading: _loading, ...mediaRest } = rest;
  const img = asVideo
    ? (useMotion
        ? <motion.video src={src} autoPlay muted loop playsInline style={style} className={className} aria-label={alt ?? ""} {...mediaRest} />
        : <video src={src} autoPlay muted loop playsInline style={style} className={className} aria-label={alt ?? ""} {...mediaRest} />)
    : (useMotion
        ? <motion.img src={src} alt={alt ?? ""} style={style} className={className} {...rest} />
        : <img src={src} alt={alt ?? ""} style={style} className={className} {...rest} />);
  if (!enabled) return img;

  // For motion/parallax images, avoid a wrapper span (which would break
  // absolute positioning). Render the button as an absolutely-positioned
  // sibling — the parent container is already positioned in these cases.
  if (useMotion) {
    return (
      <>
        {img}
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
          style={{
            position: "absolute", top: 10, right: 10, zIndex: 50,
            background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
            padding: "6px 12px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
          }}
        >Change media</button>
        {open && <SlotSwapPopover slot={slot} fallback={fallback} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <span style={{ position: "relative", display: "block", width: "100%", height: "100%" }}>
      {img}
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 50,
          background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
          padding: "6px 12px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
        }}
      >Change media</button>
      {open && <SlotSwapPopover slot={slot} fallback={fallback} onClose={() => setOpen(false)} />}
    </span>
  );
}

function SlotSwapPopover({ slot, fallback, onClose }: { slot: string; fallback: string; kind?: "image" | "video"; onClose: () => void }) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("media_assets").select("id,public_url,alt_en").order("created_at", { ascending: false });
      setMedia(data ?? []); setLoading(false);
    })();
  }, []);

  async function apply(mediaId: string) {
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    // Upsert the slot → media mapping.
    await (supabase as any).from("image_slots").upsert({
      slot, media_id: mediaId, fallback_path: fallback,
      status: "published", updated_by: u.user?.id ?? null, updated_at: new Date().toISOString(),
    }, { onConflict: "slot" });
    invalidateSlotCache();
    setBusy(false); onClose(); window.location.reload();
  }

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("site-media").upload(path, file, { upsert: false, contentType: file.type });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      const { data: u } = await supabase.auth.getUser();
      const ins = await supabase.from("media_assets").insert({ storage_path: path, public_url: pub.publicUrl, alt_en: file.name, uploaded_by: u.user?.id ?? null }).select("id").single();
      if (ins.data) await apply(ins.data.id);
    } catch { setBusy(false); }
  }

  return (
    <PopoverShell title="Change media" onClose={onClose}>
      <div style={{ fontSize: 11, color: "#6E6456", marginBottom: 10, lineHeight: 1.5 }}>Pick an image or a video — either can replace what is here now.</div>
      <label style={{ display: "inline-block", marginBottom: 10, padding: "7px 14px", background: "#C8B99A", color: "#1D1D1B", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
        {busy ? "Working…" : "Upload new"}
        <input type="file" accept="image/*,video/*" onChange={upload} style={{ display: "none" }} disabled={busy} />
      </label>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {media.map((m) => (
            <button key={m.id} onClick={() => apply(m.id)} disabled={busy}
              style={{ padding: 0, border: "1px solid #D8D2C7", background: "#fff", cursor: "pointer", aspectRatio: "4/3", overflow: "hidden" }}>
              {m.public_url
                ? (/\.(mp4|webm|mov)(\?|$)/i.test(m.public_url)
                    ? <video src={m.public_url} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <img src={m.public_url} alt={m.alt_en ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />)
                : <span style={{ fontSize: 9 }}>{m.alt_en}</span>}
            </button>
          ))}
        </div>
      )}
    </PopoverShell>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   <SlotVideo> — a hardcoded <video> made editable via the same image_slots
   table (a slot can point at a video media asset). Drop-in for a plain
   <video src=...>. In edit mode, overlays "Change video" → library/upload.
──────────────────────────────────────────────────────────────────────────── */

export function SlotVideo({
  slot, fallback, style, className, ...rest
}: {
  slot: string; fallback: string;
  style?: any; className?: string; [k: string]: any;
}) {
  const { enabled } = useEditMode();
  const src = useSlotImage(slot, fallback);
  const [open, setOpen] = useState(false);

  // If the admin picked an image for this (nominally video) slot, render it as
  // a still image. Drop video-only props so they don't hit <img>.
  const asImage = !isVideoSrc(src);
  const { autoPlay: _a, muted: _m, loop: _l, playsInline: _p, controls: _c, poster: _po, ...imgRest } = rest;
  const vid = asImage
    ? <img src={src} alt={(rest as any)["aria-label"] ?? ""} style={style} className={className} {...imgRest} />
    : <video src={src} style={style} className={className} {...rest} />;
  if (!enabled) return vid;

  return (
    <span style={{ position: "relative", display: "block", width: "100%", height: "100%" }}>
      {vid}
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 50,
          background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
          padding: "6px 12px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
        }}
      >Change media</button>
      {open && <SlotSwapPopover slot={slot} fallback={fallback} onClose={() => setOpen(false)} />}
    </span>
  );
}

/* useSlotVideoSrc — for cases where a plain wrapper won't do (e.g. a
   motion.video with a <source> child and a ref). Resolves the slot URL so the
   caller can apply it to its own element; the caller adds its own edit button
   via <SlotVideoEditButton>. */
export function useSlotVideoSrc(slot: string, fallback: string) {
  return useSlotImage(slot, fallback);
}

export function SlotVideoEditButton({ slot, fallback }: { slot: string; fallback: string }) {
  const { enabled } = useEditMode();
  const [open, setOpen] = useState(false);
  if (!enabled) return null;
  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true); }}
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 50,
          background: "rgba(29,29,27,0.85)", color: "#C8B99A", border: "1px solid #C8B99A",
          padding: "6px 12px", fontFamily: "'Century Gothic',sans-serif", fontSize: 10,
          letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(6px)",
        }}
      >Change media</button>
      {open && <SlotSwapPopover slot={slot} fallback={fallback} onClose={() => setOpen(false)} />}
    </>
  );
}
