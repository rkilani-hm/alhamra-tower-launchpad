/* Publish History — a manager's audit + restore view over content_versions.
   Lists recent publishes newest-first; restore writes a snapshot back to the
   live row. Read access is open to staff; restore is managers-only (RLS). */

import { useEffect, useState } from "react";
import { useAdminAuth } from "./AdminAuth";
import { VersionRow, listVersions, restoreVersion, versionSummary } from "./adminData";
import { groupLabel } from "./adminData";

const PEARL = "#C8B99A", DARK = "#1D1D1B", INK = "#3A3733", MUTE = "#6E6456";

const TABLE_TITLES: Record<string, string> = {
  section_fields: "Section text",
  page_prose: "Page text",
  stat_counters: "Statistics",
  awards: "Awards",
  feature_cards: "Feature cards",
  timeline_entries: "Timeline",
  spec_rows: "Specifications",
};

export function HistoryView({ onBack }: { onBack: () => void }) {
  const { role } = useAdminAuth();
  const isManager = role === "manager";
  const [versions, setVersions] = useState<VersionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function load() { setLoading(true); setVersions(await listVersions(60)); setLoading(false); }
  useEffect(() => { load(); }, []);

  async function doRestore(v: VersionRow) {
    setBusyId(v.id); setMsg(null);
    const { error } = await restoreVersion(v);
    setBusyId(null); setConfirmId(null);
    if (error) setMsg(`Restore failed: ${error}`);
    else { setMsg("Restored — this version's values are now live."); load(); }
  }

  return (
    <div>
      <button onClick={onBack} style={backStyle}>← All sections</button>
      <Eyebrow>Audit</Eyebrow>
      <H1>Publish history</H1>
      <Rule />
      <p style={{ fontSize: 13, color: MUTE, maxWidth: 560, marginTop: -10, marginBottom: 24, lineHeight: 1.6 }}>
        Every time content is published, a snapshot is recorded here. Restore writes a
        past version''s values back to the live site.
      </p>

      {msg && <div style={{ fontSize: 13, color: msg.startsWith("Restore failed") ? "#B05050" : "#5A8A5A", marginBottom: 18 }}>{msg}</div>}

      {loading ? <Muted>Loading history…</Muted> : versions.length === 0 ? (
        <Muted>No publishes recorded yet. Publishing content will create history here.</Muted>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#E4DFD6", border: "1px solid #E4DFD6" }}>
          {versions.map((v) => (
            <div key={v.id} style={{ background: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A7550", border: "1px solid #E4D8C2", padding: "1px 7px" }}>
                    {TABLE_TITLES[v.table_name] ?? v.table_name}
                  </span>
                  <span style={{ fontSize: 12, color: MUTE }}>{fmt(v.published_at)}</span>
                </div>
                <div style={{ fontSize: 13, color: INK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {versionSummary(v)}
                </div>
              </div>
              {isManager && (
                confirmId === v.id ? (
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button onClick={() => doRestore(v)} disabled={busyId === v.id} style={btnSolid(busyId === v.id)}>
                      {busyId === v.id ? "Restoring…" : "Confirm restore"}
                    </button>
                    <button onClick={() => setConfirmId(null)} style={btnGhost(false)}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmId(v.id)} style={btnGhost(false)}>Restore</button>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function fmt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

const Eyebrow = ({ children }: { children: React.ReactNode }) =>
  <div style={{ letterSpacing: "0.2em", fontSize: 11, textTransform: "uppercase", color: "#9A7550" }}>{children}</div>;
const H1 = ({ children }: { children: React.ReactNode }) =>
  <h1 style={{ fontSize: 28, fontWeight: 400, margin: "12px 0 0", color: DARK }}>{children}</h1>;
const Rule = () => <div style={{ height: 1, width: 48, background: PEARL, margin: "18px 0 26px" }} />;
const Muted = ({ children }: { children: React.ReactNode }) => <div style={{ color: MUTE, fontSize: 14 }}>{children}</div>;
const backStyle: React.CSSProperties = { background: "transparent", border: "none", color: MUTE, fontFamily: "inherit", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", padding: 0, marginBottom: 20 };
const btnSolid = (d: boolean): React.CSSProperties => ({ padding: "8px 16px", background: d ? "#C9BfA8" : PEARL, color: DARK, border: "none", fontFamily: "inherit", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: d ? "default" : "pointer" });
const btnGhost = (d: boolean): React.CSSProperties => ({ padding: "8px 16px", background: "transparent", color: d ? "#B5AE9F" : INK, border: `1px solid ${d ? "#E0DAD0" : "#C5BCA9"}`, fontFamily: "inherit", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: d ? "default" : "pointer" });
