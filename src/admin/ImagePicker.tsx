/* ImagePicker — pick an existing media asset or upload a new one.
   Used inside feature-card / timeline editors. Shows current image, a library
   grid to choose from, and an upload control. Writes image_id on save. */

import { useEffect, useRef, useState } from "react";
import { MediaAsset, listMedia, uploadMedia, setRowImage } from "./adminData";

const PEARL = "#B9B9B7", DARK = "#1D1D1B", MUTE = "#6E6456";

export function ImagePicker({
  table, rowId, currentImageId, onChanged,
}: {
  table: "feature_cards" | "timeline_entries";
  rowId: string;
  currentImageId: string | null;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const current = media.find((m) => m.id === currentImageId) || null;

  async function load() {
    setLoading(true);
    setMedia(await listMedia());
    setLoading(false);
  }
  useEffect(() => { if (open && media.length === 0) load(); /* eslint-disable-next-line */ }, [open]);
  // Load once on mount so we can show the current thumbnail.
  useEffect(() => { load(); }, []);

  async function choose(id: string | null) {
    setBusy(true); setMsg(null);
    const { error } = await setRowImage(table, rowId, id);
    setBusy(false);
    if (error) setMsg(error); else { setOpen(false); onChanged(); }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setMsg(null);
    const { id, error } = await uploadMedia(file);
    if (error || !id) { setBusy(false); setMsg(error ?? "Upload failed"); return; }
    await load();
    await choose(id);
    setBusy(false);
  }

  return (
    <div>
      <FieldLabel>Image</FieldLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 88, height: 60, background: "#EEE9E0", border: "1px solid #D8D2C7", overflow: "hidden", flexShrink: 0 }}>
          {current?.public_url
            ? <img src={current.public_url} alt={current.alt_en ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: MUTE }}>None</div>}
        </div>
        <button type="button" onClick={() => setOpen((o) => !o)} style={ghost}>
          {open ? "Close" : current ? "Change image" : "Choose image"}
        </button>
        {msg && <span style={{ fontSize: 12, color: "#B05050" }}>{msg}</span>}
      </div>

      {open && (
        <div style={{ marginTop: 12, border: "1px solid #E4DFD6", background: "#FCFBF9", padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: MUTE }}>Media library</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} style={ghost}>
                {busy ? "Working…" : "Upload new"}
              </button>
              {current && <button type="button" onClick={() => choose(null)} disabled={busy} style={ghost}>Remove</button>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} style={{ display: "none" }} />
          </div>
          {loading ? <span style={{ fontSize: 13, color: MUTE }}>Loading…</span> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 8, maxHeight: 260, overflowY: "auto" }}>
              {media.map((m) => (
                <button key={m.id} type="button" onClick={() => choose(m.id)} disabled={busy}
                  style={{
                    padding: 0, border: m.id === currentImageId ? `2px solid ${PEARL}` : "1px solid #D8D2C7",
                    background: "#fff", cursor: "pointer", aspectRatio: "4/3", overflow: "hidden",
                  }}>
                  {m.public_url
                    ? <img src={m.public_url} alt={m.alt_en ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 10, color: MUTE }}>{m.alt_en}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const FieldLabel = ({ children }: { children: React.ReactNode }) =>
  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTE, marginBottom: 6 }}>{children}</div>;
const ghost: React.CSSProperties = {
  padding: "7px 14px", background: "transparent", color: DARK, border: "1px solid #C5BCA9",
  fontFamily: "inherit", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
};
