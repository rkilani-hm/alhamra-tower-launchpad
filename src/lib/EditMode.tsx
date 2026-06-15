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
