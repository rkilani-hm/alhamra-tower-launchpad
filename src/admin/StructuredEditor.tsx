/* Structured content editor — drives all 5 list tables from TABLE_DEFS.
   Browse collections → edit rows (bilingual + scalar fields) → save/publish. */

import { useEffect, useState } from "react";
import { useAdminAuth } from "./AdminAuth";
import {
  StructuredTable, TableDef, TABLE_DEFS, FieldDef,
  listStructuredGroups, loadStructuredRows, saveStructuredRow, setStructuredStatus,
} from "./structuredData";

const PEARL = "#C8B99A", DARK = "#1D1D1B", INK = "#3A3733", MUTE = "#6E6456";

export function StructuredEditor({ table, onBack }: { table: StructuredTable; onBack: () => void }) {
  const def = TABLE_DEFS[table];
  const [groups, setGroups] = useState<{ group: string; total: number; drafts: number }[]>([]);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    setGroups(await listStructuredGroups(def));
    setLoading(false);
  }
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [table]);

  if (openGroup !== null) {
    return <GroupRows def={def} group={openGroup} onBack={() => { setOpenGroup(null); refresh(); }} />;
  }

  // If the table isn't grouped, skip straight into the single list.
  if (!def.groupCol && groups.length === 1) {
    return <GroupRows def={def} group={null} onBack={onBack} singleList />;
  }

  return (
    <div>
      <button onClick={onBack} style={backStyle}>← All sections</button>
      <Eyebrow>Structured</Eyebrow>
      <H1>{def.title}</H1>
      <Rule />
      {loading ? <Muted>Loading…</Muted> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {groups.map((g) => (
            <button key={g.group} onClick={() => setOpenGroup(g.group)} style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = PEARL)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E4DFD6")}>
              <div style={{ fontSize: 15, color: DARK, marginBottom: 8 }}>{g.group}</div>
              <div style={{ fontSize: 12, color: MUTE }}>
                {g.total} item{g.total !== 1 ? "s" : ""}
                {g.drafts > 0
                  ? <span style={{ marginLeft: 10, color: "#A8842E" }}>· {g.drafts} draft{g.drafts !== 1 ? "s" : ""}</span>
                  : <span style={{ marginLeft: 10, color: "#5A8A5A" }}>· all published</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GroupRows({ def, group, onBack, singleList }: { def: TableDef; group: string | null; onBack: () => void; singleList?: boolean }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  async function load() { setLoading(true); setRows(await loadStructuredRows(def, group)); setLoading(false); }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [group]);

  return (
    <div>
      <button onClick={onBack} style={backStyle}>← {singleList ? "All sections" : def.title}</button>
      <Eyebrow>{def.title}</Eyebrow>
      <H1>{group ?? def.title}</H1>
      <Rule />
      {loading ? <Muted>Loading…</Muted> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {rows.map((r) => <RowEditor key={r.id} def={def} row={r} onChanged={load} />)}
        </div>
      )}
    </div>
  );
}

function RowEditor({ def, row, onChanged }: { def: TableDef; row: any; onChanged: () => void }) {
  const { role } = useAdminAuth();
  const isManager = role === "manager";
  const [vals, setVals] = useState<Record<string, any>>(() => initVals(def, row));
  const [busy, setBusy] = useState<"" | "save" | "pub" | "unpub">("");
  const [msg, setMsg] = useState<string | null>(null);

  const dirty = isDirty(def, row, vals);

  async function doSave(thenPublish = false) {
    setBusy(thenPublish ? "pub" : "save"); setMsg(null);
    if (dirty) {
      const { error } = await saveStructuredRow(def, row.id, vals);
      if (error) { setBusy(""); setMsg(error); return; }
    }
    if (thenPublish) {
      const { error } = await setStructuredStatus(def, row.id, "published");
      if (error) { setBusy(""); setMsg(error); return; }
    }
    setBusy(""); setMsg(thenPublish ? "Published" : "Saved"); onChanged();
  }
  async function doUnpublish() {
    setBusy("unpub"); setMsg(null);
    const { error } = await setStructuredStatus(def, row.id, "draft");
    setBusy(""); if (error) setMsg(error); else { setMsg("Reverted to draft"); onChanged(); }
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #E4DFD6", padding: "16px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: INK }}>{def.rowLabel(row, "en")}</span>
        <StatusPill status={row.status} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {def.fields.map((f) => <FieldRow key={f.col} f={f} vals={vals} setVals={setVals} />)}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
        <button onClick={() => doSave(false)} disabled={!dirty || !!busy} style={btnGhost(!dirty || !!busy)}>
          {busy === "save" ? "Saving…" : "Save draft"}
        </button>
        {isManager && (
          <button onClick={() => doSave(true)} disabled={!!busy} style={btnSolid(!!busy)}>
            {busy === "pub" ? "Publishing…" : dirty ? "Save & publish" : "Publish"}
          </button>
        )}
        {isManager && row.status === "published" && (
          <button onClick={doUnpublish} disabled={!!busy} style={btnGhost(!!busy)}>
            {busy === "unpub" ? "Reverting…" : "Unpublish"}
          </button>
        )}
        {msg && <span style={{ fontSize: 12, color: msg.length > 24 ? "#B05050" : "#5A8A5A", marginLeft: 4 }}>{msg}</span>}
      </div>
    </div>
  );
}

function FieldRow({ f, vals, setVals }: { f: FieldDef; vals: Record<string, any>; setVals: (u: any) => void }) {
  const set = (k: string, v: any) => setVals((p: any) => ({ ...p, [k]: v }));

  if (f.kind === "bilingual" || f.kind === "bilingual-long") {
    const long = f.kind === "bilingual-long";
    const enK = `${f.col}_en`, arK = `${f.col}_ar`;
    return (
      <div>
        <FieldLabel>{f.label}</FieldLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {long
            ? <textarea value={vals[enK] ?? ""} onChange={(e) => set(enK, e.target.value)} rows={3} style={taStyle} />
            : <input value={vals[enK] ?? ""} onChange={(e) => set(enK, e.target.value)} style={inStyle} />}
          {long
            ? <textarea value={vals[arK] ?? ""} onChange={(e) => set(arK, e.target.value)} rows={3} dir="rtl" style={{ ...taStyle, textAlign: "right" }} />
            : <input value={vals[arK] ?? ""} onChange={(e) => set(arK, e.target.value)} dir="rtl" style={{ ...inStyle, textAlign: "right" }} />}
        </div>
      </div>
    );
  }

  // scalar (text / number / longtext)
  const k = f.col;
  return (
    <div>
      <FieldLabel>{f.label}</FieldLabel>
      {f.kind === "longtext"
        ? <textarea value={vals[k] ?? ""} onChange={(e) => set(k, e.target.value)} rows={3} style={taStyle} />
        : <input
            type={f.kind === "number" ? "number" : "text"}
            value={vals[k] ?? ""}
            onChange={(e) => set(k, f.kind === "number" ? (e.target.value === "" ? null : Number(e.target.value)) : e.target.value)}
            style={{ ...inStyle, maxWidth: f.kind === "number" ? 160 : undefined }}
          />}
    </div>
  );
}

/* ── value helpers ─────────────────────────────────────────────────────── */
function initVals(def: TableDef, row: any): Record<string, any> {
  const v: Record<string, any> = {};
  for (const f of def.fields) {
    if (f.kind === "bilingual" || f.kind === "bilingual-long") {
      v[`${f.col}_en`] = row[`${f.col}_en`] ?? "";
      v[`${f.col}_ar`] = row[`${f.col}_ar`] ?? "";
    } else {
      v[f.col] = row[f.col] ?? (f.kind === "number" ? null : "");
    }
  }
  return v;
}
function isDirty(def: TableDef, row: any, vals: Record<string, any>): boolean {
  for (const f of def.fields) {
    if (f.kind === "bilingual" || f.kind === "bilingual-long") {
      if ((vals[`${f.col}_en`] ?? "") !== (row[`${f.col}_en`] ?? "")) return true;
      if ((vals[`${f.col}_ar`] ?? "") !== (row[`${f.col}_ar`] ?? "")) return true;
    } else {
      const a = vals[f.col] ?? (f.kind === "number" ? null : "");
      const b = row[f.col] ?? (f.kind === "number" ? null : "");
      if (a !== b) return true;
    }
  }
  return false;
}

/* ── shared presentational bits ────────────────────────────────────────── */
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
  return <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: pub ? "#5A8A5A" : "#A8842E", border: `1px solid ${pub ? "#BcdBBc" : "#E4CF8E"}`, padding: "2px 8px" }}>{pub ? "Published" : "Draft"}</span>;
}
const inStyle: React.CSSProperties = { width: "100%", padding: "9px 11px", border: "1px solid #D8D2C7", fontFamily: "inherit", fontSize: 14, color: DARK, outline: "none", borderRadius: 0, background: "#FCFBF9" };
const taStyle: React.CSSProperties = { ...inStyle, resize: "vertical", lineHeight: 1.6 };
const cardStyle: React.CSSProperties = { textAlign: "left", background: "#fff", border: "1px solid #E4DFD6", padding: "18px 20px", cursor: "pointer", fontFamily: "inherit", transition: "border-color 160ms" };
const backStyle: React.CSSProperties = { background: "transparent", border: "none", color: MUTE, fontFamily: "inherit", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", padding: 0, marginBottom: 20 };
const btnSolid = (d: boolean): React.CSSProperties => ({ padding: "9px 18px", background: d ? "#C9BfA8" : PEARL, color: DARK, border: "none", fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", cursor: d ? "default" : "pointer" });
const btnGhost = (d: boolean): React.CSSProperties => ({ padding: "9px 18px", background: "transparent", color: d ? "#B5AE9F" : INK, border: `1px solid ${d ? "#E0DAD0" : "#C5BCA9"}`, fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", cursor: d ? "default" : "pointer" });
