/* Image Migration — one-time utility to move referenced /assets images into
   the site-media Storage bucket. Runs in the manager's browser (uses the
   authed session's upload permission). For each media_asset still pointing at
   /assets, it fetches the file from the live site, uploads it to Storage, and
   updates the row's storage_path + public_url. Idempotent: skips rows already
   on Storage. */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eyebrow, H1, Rule, Muted, backStyle, btnSolid, MUTE, INK } from "./ui";

interface Item {
  id: string;
  public_url: string;
  status: "pending" | "working" | "done" | "skip" | "error";
  note?: string;
}

export function ImageMigration({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("media_assets")
      .select("id,public_url")
      .order("created_at", { ascending: true });
    const list: Item[] = (data ?? []).map((r) => ({
      id: r.id,
      public_url: r.public_url ?? "",
      status: (r.public_url ?? "").startsWith("http") ? "skip" : "pending",
      note: (r.public_url ?? "").startsWith("http") ? "Already on Storage" : undefined,
    }));
    setItems(list);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function migrateOne(it: Item): Promise<Item> {
    if (it.status === "skip") return it;
    try {
      // Fetch the file from the live site (relative /assets path resolves to current origin).
      const res = await fetch(it.public_url, { cache: "no-store" });
      if (!res.ok) return { ...it, status: "error", note: `Fetch ${res.status}` };
      const blob = await res.blob();
      const name = it.public_url.split("/").pop() || `${it.id}`;
      const ext = name.split(".").pop() || "bin";
      const path = `migrated/${it.id}.${ext}`;

      const up = await supabase.storage.from("site-media").upload(path, blob, {
        cacheControl: "3600", upsert: true, contentType: blob.type || undefined,
      });
      if (up.error) return { ...it, status: "error", note: up.error.message };

      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      const upd = await supabase
        .from("media_assets")
        .update({ storage_path: path, public_url: pub.publicUrl })
        .eq("id", it.id);
      if (upd.error) return { ...it, status: "error", note: upd.error.message };

      return { ...it, status: "done", note: "Migrated", public_url: pub.publicUrl };
    } catch (e: any) {
      return { ...it, status: "error", note: e?.message ?? "Failed" };
    }
  }

  async function runAll() {
    setRunning(true);
    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      if (next[i].status === "skip" || next[i].status === "done") continue;
      next[i] = { ...next[i], status: "working" };
      setItems([...next]);
      next[i] = await migrateOne(next[i]);
      setItems([...next]);
    }
    setRunning(false);
  }

  const pending = items.filter((i) => i.status === "pending").length;
  const done = items.filter((i) => i.status === "done").length;
  const errors = items.filter((i) => i.status === "error").length;

  return (
    <div>
      <button onClick={onBack} style={backStyle}>← All sections</button>
      <Eyebrow>Maintenance</Eyebrow>
      <H1>Migrate images to Storage</H1>
      <Rule />
      <p style={{ fontSize: 13, color: MUTE, maxWidth: 580, marginTop: -10, marginBottom: 22, lineHeight: 1.6 }}>
        This moves the site's referenced images from the bundled <code>/assets</code> folder into
        Supabase Storage, so they can be managed and replaced from the admin. Run it once. It's safe
        to re-run — already-migrated images are skipped.
      </p>

      {loading ? <Muted>Loading…</Muted> : (
        <>
          <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 20 }}>
            <button onClick={runAll} disabled={running || pending === 0} style={btnSolid(running || pending === 0)}>
              {running ? "Migrating…" : pending === 0 ? "Nothing to migrate" : `Migrate ${pending} image${pending !== 1 ? "s" : ""}`}
            </button>
            <span style={{ fontSize: 13, color: MUTE }}>
              {done} done · {pending} pending{errors > 0 && <span style={{ color: "#B05050" }}> · {errors} error{errors !== 1 ? "s" : ""}</span>}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#E4DFD6", border: "1px solid #E4DFD6" }}>
            {items.map((it) => (
              <div key={it.id} style={{ background: "#fff", padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                <code style={{ fontSize: 12, color: INK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {it.public_url.split("/").pop()}
                </code>
                <StatusTag it={it} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusTag({ it }: { it: Item }) {
  const map: Record<Item["status"], { label: string; color: string; border: string }> = {
    pending: { label: "Pending", color: "#A8842E", border: "#E4CF8E" },
    working: { label: "Working…", color: "#5A6E8A", border: "#AEC0D8" },
    done: { label: "Migrated", color: "#5A8A5A", border: "#BcdBBc" },
    skip: { label: "On Storage", color: "#6E6456", border: "#D8D2C7" },
    error: { label: it.note || "Error", color: "#B05050", border: "#E0B0B0" },
  };
  const s = map[it.status];
  return (
    <span style={{ flexShrink: 0, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: s.color, border: `1px solid ${s.border}`, padding: "2px 8px" }}>
      {s.label}
    </span>
  );
}
