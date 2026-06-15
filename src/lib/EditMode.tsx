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
import { supabase } from "@/integrations/supabase/client";
import { toEasternArabic } from "@/admin/ui";
import { useI18n } from "@/lib/i18n";

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
  const { lang } = useI18n();
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
      {editing && <EditPopover id={id} lang={lang} onClose={() => setEditing(false)} />}
    </Tag>
  );
}

/* The inline edit popover — loads current value, saves + publishes on confirm. */
function EditPopover({ id, lang, onClose }: { id: string; lang: "en" | "ar"; onClose: () => void }) {
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
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute", top: "100%", left: 0, marginTop: 8, zIndex: 10000,
        width: 420, maxWidth: "90vw", background: "#fff", color: "#1D1D1B",
        border: "1px solid #C8B99A", boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        padding: 16, fontFamily: "'Century Gothic',sans-serif", textAlign: "left",
      }}
    >
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This text isn't editable yet ({id}).</div>
      ) : (
        <>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A7550", marginBottom: 10 }}>
            Editing · {group} · {field}
          </div>
          <Label>English</Label>
          {longText
            ? <textarea value={valEn} onChange={(e) => setValEn(e.target.value)} rows={3} style={ta} />
            : <input value={valEn} onChange={(e) => setValEn(e.target.value)} style={inp} />}
          <Label>العربية</Label>
          {longText
            ? <textarea value={valAr} onChange={(e) => setValAr(toEasternArabic(e.target.value))} rows={3} dir="rtl" style={{ ...ta, textAlign: "right" }} />
            : <input value={valAr} onChange={(e) => setValAr(toEasternArabic(e.target.value))} dir="rtl" style={{ ...inp, textAlign: "right" }} />}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => save(true)} disabled={busy} style={solid}>{busy ? "Saving…" : "Publish"}</button>
            <button onClick={() => save(false)} disabled={busy} style={ghost}>Save draft</button>
            <button onClick={onClose} disabled={busy} style={ghost}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) =>
  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6E6456", margin: "8px 0 4px" }}>{children}</div>;
const inp: CSSProperties = { width: "100%", padding: "8px 10px", border: "1px solid #D8D2C7", fontFamily: "inherit", fontSize: 14, background: "#FCFBF9", outline: "none" };
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
  const { lang } = useI18n();
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
      {editing && <RowPopover id={id} lang={lang} onClose={() => setEditing(false)} />}
    </Tag>
  );
}

function RowPopover({ id, lang, onClose }: { id: string; lang: "en" | "ar"; onClose: () => void }) {
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
    <div onClick={(e) => e.stopPropagation()} style={{
      position: "absolute", top: "100%", left: 0, marginTop: 8, zIndex: 10000, width: 440, maxWidth: "90vw",
      background: "#fff", color: "#1D1D1B", border: "1px solid #C8B99A", boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      padding: 16, fontFamily: "'Century Gothic',sans-serif", textAlign: "left", direction: "ltr" }}>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This item isn't editable yet ({id}).</div>
      ) : (
        <>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A7550", marginBottom: 10 }}>
            Editing · {table.replace("_", " ")} · {group || key}
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
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => save(true)} disabled={busy} style={solid}>{busy ? "Saving…" : "Publish"}</button>
            <button onClick={() => save(false)} disabled={busy} style={ghost}>Save draft</button>
            <button onClick={onClose} disabled={busy} style={ghost}>Cancel</button>
          </div>
        </>
      )}
    </div>
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

function ImageSwapPopover({ id, onClose }: { id: string; onClose: () => void }) {
  const [table, collection, index] = id.split(":");
  const [media, setMedia] = useState<any[]>([]);
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const fileRef = (typeof document !== "undefined") ? { current: null as HTMLInputElement | null } : { current: null };

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
    <div onClick={(e) => e.stopPropagation()} style={{
      position: "absolute", top: 48, right: 10, zIndex: 10001, width: 360, maxWidth: "90vw",
      background: "#fff", border: "1px solid #C8B99A", boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      padding: 14, fontFamily: "'Century Gothic',sans-serif", textAlign: "left" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A7550" }}>Change image</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#6E6456" }}>×</button>
      </div>
      {loading ? <div style={{ fontSize: 13, color: "#6E6456" }}>Loading…</div> : !rowId ? (
        <div style={{ fontSize: 13, color: "#B05050" }}>This image isn't editable yet.</div>
      ) : (
        <>
          <label style={{ display: "inline-block", marginBottom: 10, padding: "7px 14px", background: "#C8B99A", color: "#1D1D1B", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
            {busy ? "Working…" : "Upload new"}
            <input type="file" accept="image/*" onChange={upload} style={{ display: "none" }} disabled={busy} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, maxHeight: 280, overflowY: "auto" }}>
            {media.map((m) => (
              <button key={m.id} onClick={() => choose(m.id)} disabled={busy}
                style={{ padding: 0, border: "1px solid #D8D2C7", background: "#fff", cursor: "pointer", aspectRatio: "4/3", overflow: "hidden" }}>
                {m.public_url ? <img src={m.public_url} alt={m.alt_en ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 9 }}>{m.alt_en}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
