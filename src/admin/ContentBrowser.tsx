/* Content browser + bilingual field editor for flat text (section_fields,
   page_prose). EN/AR side by side, save-as-draft, manager publish. */

import { useEffect, useState } from "react";
import { useAdminAuth } from "./AdminAuth";
import {
  FlatTable, FlatField, listFlatGroups, loadFlatFields,
  saveFlatField, publishField, unpublishField, groupLabel,
} from "./adminData";
import { StructuredEditor } from "./StructuredEditor";
import { TABLE_DEFS, StructuredTable } from "./structuredData";
import { HistoryView } from "./HistoryView";

const PEARL = "#C8B99A";
const DARK = "#1D1D1B";
const INK = "#3A3733";
const MUTE = "#6E6456";

type GroupRow = { group: string; total: number; drafts: number; table: FlatTable };

export function ContentBrowser() {
  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [open, setOpen] = useState<GroupRow | null>(null);
  const [openStructured, setOpenStructured] = useState<StructuredTable | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const [sf, pp] = await Promise.all([
      listFlatGroups("section_fields"),
      listFlatGroups("page_prose"),
    ]);
    const rows: GroupRow[] = [
      ...sf.map((g) => ({ ...g, table: "section_fields" as FlatTable })),
      ...pp.map((g) => ({ ...g, table: "page_prose" as FlatTable })),
    ];
    setGroups(rows);
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);

  if (open) {
    return <GroupEditor row={open} onBack={() => { setOpen(null); refresh(); }} />;
  }
  if (openStructured) {
    return <StructuredEditor table={openStructured} onBack={() => setOpenStructured(null)} />;
  }
  if (showHistory) {
    return <HistoryView onBack={() => setShowHistory(false)} />;
  }

  return (
    <div>
      <Eyebrow>Content</Eyebrow>
      <H1>Editable sections</H1>
      <Rule />
      {loading ? (
        <Muted>Loading sections…</Muted>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {groups.map((g) => (
            <button
              key={`${g.table}:${g.group}`}
              onClick={() => setOpen(g)}
              style={{
                textAlign: "left", background: "#fff", border: "1px solid #E4DFD6",
                padding: "18px 20px", cursor: "pointer", fontFamily: "inherit",
                transition: "border-color 160ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = PEARL)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E4DFD6")}
            >
              <div style={{ fontSize: 15, color: DARK, marginBottom: 8 }}>{groupLabel(g.group)}</div>
              <div style={{ fontSize: 12, color: MUTE }}>
                {g.total} field{g.total !== 1 ? "s" : ""}
                {g.drafts > 0 && (
                  <span style={{ marginLeft: 10, color: "#A8842E" }}>
                    · {g.drafts} draft{g.drafts !== 1 ? "s" : ""}
                  </span>
                )}
                {g.drafts === 0 && <span style={{ marginLeft: 10, color: "#5A8A5A" }}>· all published</span>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Structured content — list tables (stats, awards, cards, timeline, specs) */}
      <div style={{ marginTop: 44 }}>
        <Eyebrow>Structured</Eyebrow>
        <H1>Lists & data</H1>
        <Rule />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {(Object.keys(TABLE_DEFS) as StructuredTable[]).map((tbl) => (
            <button
              key={tbl}
              onClick={() => setOpenStructured(tbl)}
              style={{
                textAlign: "left", background: "#fff", border: "1px solid #E4DFD6",
                padding: "18px 20px", cursor: "pointer", fontFamily: "inherit",
                transition: "border-color 160ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = PEARL)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E4DFD6")}
            >
              <div style={{ fontSize: 15, color: DARK }}>{TABLE_DEFS[tbl].title}</div>
            </button>
          ))}
        </div>

        {/* Publish history */}
        <div style={{ marginTop: 28 }}>
          <button
            onClick={() => setShowHistory(true)}
            style={{
              textAlign: "left", background: DARK, border: `1px solid ${DARK}`, color: "#F5F2EE",
              padding: "16px 20px", cursor: "pointer", fontFamily: "inherit", width: "100%", maxWidth: 320,
            }}
          >
            <div style={{ fontSize: 15, marginBottom: 4 }}>Publish history</div>
            <div style={{ fontSize: 12, color: "#9A8B73" }}>View past versions &amp; restore</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function GroupEditor({ row, onBack }: { row: GroupRow; onBack: () => void }) {
  const { role } = useAdminAuth();
  const isManager = role === "manager";
  const [fields, setFields] = useState<FlatField[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setFields(await loadFlatFields(row.table, row.group));
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [row.group]);

  return (
    <div>
      <button onClick={onBack} style={backStyle}>← All sections</button>
      <Eyebrow>{row.table === "section_fields" ? "Section" : "Page"}</Eyebrow>
      <H1>{groupLabel(row.group)}</H1>
      <Rule />
      {loading ? (
        <Muted>Loading fields…</Muted>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {fields.map((f) => (
            <FieldEditor
              key={f.id}
              table={row.table}
              field={f}
              isManager={isManager}
              onChanged={load}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FieldEditor({
  table, field, isManager, onChanged,
}: { table: FlatTable; field: FlatField; isManager: boolean; onChanged: () => void }) {
  const [en, setEn] = useState(field.value_en ?? "");
  const [ar, setAr] = useState(field.value_ar ?? "");
  const [busy, setBusy] = useState<"" | "save" | "publish" | "unpublish">("");
  const [msg, setMsg] = useState<string | null>(null);

  const dirty = en !== (field.value_en ?? "") || ar !== (field.value_ar ?? "");
  const long = field.field_type === "long";

  async function doSave() {
    setBusy("save"); setMsg(null);
    const { error } = await saveFlatField(table, field.id, { value_en: en, value_ar: ar || null });
    setBusy("");
    if (error) setMsg(error); else { setMsg("Saved"); onChanged(); }
  }
  async function doPublish() {
    setBusy("publish"); setMsg(null);
    if (dirty) { const s = await saveFlatField(table, field.id, { value_en: en, value_ar: ar || null }); if (s.error) { setBusy(""); setMsg(s.error); return; } }
    const { error } = await publishField(table, field.id);
    setBusy("");
    if (error) setMsg(error); else { setMsg("Published"); onChanged(); }
  }
  async function doUnpublish() {
    setBusy("unpublish"); setMsg(null);
    const { error } = await unpublishField(table, field.id);
    setBusy("");
    if (error) setMsg(error); else { setMsg("Reverted to draft"); onChanged(); }
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #E4DFD6", padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <code style={{ fontSize: 12, color: MUTE, fontFamily: "monospace" }}>{field.field_key}</code>
        <StatusPill status={field.status} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <FieldLabel>English</FieldLabel>
          {long
            ? <textarea value={en} onChange={(e) => setEn(e.target.value)} rows={4} style={taStyle} />
            : <input value={en} onChange={(e) => setEn(e.target.value)} style={inStyle} />}
        </div>
        <div>
          <FieldLabel>العربية (Arabic)</FieldLabel>
          {long
            ? <textarea value={ar} onChange={(e) => setAr(e.target.value)} rows={4} dir="rtl" style={{ ...taStyle, textAlign: "right" }} />
            : <input value={ar} onChange={(e) => setAr(e.target.value)} dir="rtl" style={{ ...inStyle, textAlign: "right" }} />}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <button onClick={doSave} disabled={!dirty || !!busy} style={btnGhost(!dirty || !!busy)}>
          {busy === "save" ? "Saving…" : "Save draft"}
        </button>
        {isManager && (
          <button onClick={doPublish} disabled={!!busy} style={btnSolid(!!busy)}>
            {busy === "publish" ? "Publishing…" : dirty ? "Save & publish" : "Publish"}
          </button>
        )}
        {isManager && field.status === "published" && (
          <button onClick={doUnpublish} disabled={!!busy} style={btnGhost(!!busy)}>
            {busy === "unpublish" ? "Reverting…" : "Unpublish"}
          </button>
        )}
        {msg && <span style={{ fontSize: 12, color: msg.length > 24 ? "#B05050" : "#5A8A5A", marginLeft: 4 }}>{msg}</span>}
      </div>
    </div>
  );
}

/* ── small presentational helpers ─────────────────────────────────────── */
const Eyebrow = ({ children }: { children: React.ReactNode }) =>
  <div style={{ letterSpacing: "0.2em", fontSize: 11, textTransform: "uppercase", color: "#9A7550" }}>{children}</div>;
const H1 = ({ children }: { children: React.ReactNode }) =>
  <h1 style={{ fontSize: 28, fontWeight: 400, margin: "12px 0 0", color: DARK }}>{children}</h1>;
const Rule = () => <div style={{ height: 1, width: 48, background: PEARL, margin: "18px 0 26px" }} />;
const Muted = ({ children }: { children: React.ReactNode }) => <div style={{ color: MUTE, fontSize: 14 }}>{children}</div>;
const FieldLabel = ({ children }: { children: React.ReactNode }) =>
  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTE, marginBottom: 6 }}>{children}</div>;

function StatusPill({ status }: { status: string }) {
  const pub = status === "published";
  return (
    <span style={{
      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
      color: pub ? "#5A8A5A" : "#A8842E",
      border: `1px solid ${pub ? "#BcdBBc" : "#E4CF8E"}`,
      padding: "2px 8px",
    }}>{pub ? "Published" : "Draft"}</span>
  );
}

const inStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", border: "1px solid #D8D2C7",
  fontFamily: "inherit", fontSize: 14, color: DARK, outline: "none", borderRadius: 0, background: "#FCFBF9",
};
const taStyle: React.CSSProperties = { ...inStyle, resize: "vertical", lineHeight: 1.6 };
const backStyle: React.CSSProperties = {
  background: "transparent", border: "none", color: MUTE, fontFamily: "inherit",
  fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", padding: 0, marginBottom: 20,
};
const btnSolid = (disabled: boolean): React.CSSProperties => ({
  padding: "9px 18px", background: disabled ? "#C9BfA8" : PEARL, color: DARK, border: "none",
  fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  cursor: disabled ? "default" : "pointer",
});
const btnGhost = (disabled: boolean): React.CSSProperties => ({
  padding: "9px 18px", background: "transparent", color: disabled ? "#B5AE9F" : INK,
  border: `1px solid ${disabled ? "#E0DAD0" : "#C5BCA9"}`,
  fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  cursor: disabled ? "default" : "pointer",
});
