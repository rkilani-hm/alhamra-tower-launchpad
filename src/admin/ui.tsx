/* ──────────────────────────────────────────────────────────────────────────
   Shared admin UI primitives — single source of truth for the Content Studio's
   styled elements. Previously duplicated across ContentBrowser, StructuredEditor,
   and HistoryView; consolidated here so styling stays consistent.
────────────────────────────────────────────────────────────────────────── */

import React from "react";

/* Convert Western digits (0-9) to Eastern Arabic-Indic numerals (٠-٩), and
   localize separators: thousands comma → ٬, decimal dot → ٫ (only between
   digits, so it won't touch sentence punctuation). Used live on Arabic CMS
   inputs so typed numbers match the site's Eastern-numeral convention. */
const W2E: Record<string, string> = { "0":"٠","1":"١","2":"٢","3":"٣","4":"٤","5":"٥","6":"٦","7":"٧","8":"٨","9":"٩" };
export function toEasternArabic(s: string): string {
  if (!s) return s;
  let out = s.replace(/[0-9]/g, (d) => W2E[d]);
  // separators only when sitting between Eastern digits
  out = out.replace(/([٠-٩])\.([٠-٩])/g, "$1٫$2").replace(/([٠-٩]),([٠-٩])/g, "$1٬$2");
  return out;
}

export const PEARL = "#C8B99A";
export const DARK = "#1D1D1B";
export const INK = "#3A3733";
export const MUTE = "#6E6456";

/* Headings / structure */
export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ letterSpacing: "0.2em", fontSize: 11, textTransform: "uppercase", color: "#9A7550" }}>{children}</div>
);
export const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: 28, fontWeight: 400, margin: "12px 0 0", color: DARK }}>{children}</h1>
);
export const Rule = () => <div style={{ height: 1, width: 48, background: PEARL, margin: "18px 0 26px" }} />;
export const Muted = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: MUTE, fontSize: 14 }}>{children}</div>
);
export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTE, marginBottom: 6 }}>{children}</div>
);

/* Status pill — draft (amber) / published (green) */
export function StatusPill({ status }: { status: string }) {
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

/* Inputs */
export const inStyle: React.CSSProperties = {
  width: "100%", padding: "9px 11px", border: "1px solid #D8D2C7",
  fontFamily: "inherit", fontSize: 14, color: DARK, outline: "none", borderRadius: 0, background: "#FCFBF9",
};
export const taStyle: React.CSSProperties = { ...inStyle, resize: "vertical", lineHeight: 1.6 };

/* Navigation / cards */
export const backStyle: React.CSSProperties = {
  background: "transparent", border: "none", color: MUTE, fontFamily: "inherit",
  fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", padding: 0, marginBottom: 20,
};
export const cardStyle: React.CSSProperties = {
  textAlign: "left", background: "#fff", border: "1px solid #E4DFD6",
  padding: "18px 20px", cursor: "pointer", fontFamily: "inherit", transition: "border-color 160ms",
};

/* Buttons (canonical sizing: 9px 18px / 0.12em) */
export const btnSolid = (d: boolean): React.CSSProperties => ({
  padding: "9px 18px", background: d ? "#C9BfA8" : PEARL, color: DARK, border: "none",
  fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  cursor: d ? "default" : "pointer",
});
export const btnGhost = (d: boolean): React.CSSProperties => ({
  padding: "9px 18px", background: "transparent", color: d ? "#B5AE9F" : INK,
  border: `1px solid ${d ? "#E0DAD0" : "#C5BCA9"}`,
  fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  cursor: d ? "default" : "pointer",
});

/* Hover handlers for cards (pearl border on hover) */
export const cardHoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = PEARL; };
export const cardHoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = "#E4DFD6"; };
