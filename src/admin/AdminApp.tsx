/* Admin shell — the /admin frame. Guards on session, renders login when
   signed out, and the studio layout (header + outlet) when signed in. */

import { ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuth";
import { AdminLogin } from "./AdminLogin";

function Frame({ children }: { children: ReactNode }) {
  const { email, role, signOut, loading, session } = useAdminAuth();

  if (loading) {
    return (
      <div style={fullCenter}>
        <div style={{ color: "#9A8B73", fontSize: 13, letterSpacing: "0.14em" }}>Loading…</div>
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EE", color: "#1D1D1B", fontFamily: BRAND }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          height: 60,
          background: "#1D1D1B",
          color: "#F5F2EE",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ letterSpacing: "0.24em", fontSize: 10, color: "#C8B99A", textTransform: "uppercase" }}>
            Al Hamra
          </span>
          <span style={{ fontSize: 15, letterSpacing: "0.02em" }}>Content Studio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 12, color: "#9A8B73" }}>
            {email}
            {role && (
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: role === "manager" ? "#C8B99A" : "#9A8B73",
                  border: `1px solid ${role === "manager" ? "#C8B99A" : "#4A453E"}`,
                  padding: "2px 8px",
                }}
              >
                {role}
              </span>
            )}
          </span>
          <button onClick={signOut} style={signOutStyle}>Sign out</button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 80px" }}>
        {children}
      </main>
    </div>
  );
}

/* Placeholder home — replaced by the content browser in 6b. */
function StudioHome() {
  const { role } = useAdminAuth();
  return (
    <div>
      <div style={{ letterSpacing: "0.2em", fontSize: 11, textTransform: "uppercase", color: "#9A7550" }}>
        Welcome
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 400, margin: "12px 0 0" }}>Content Studio</h1>
      <div style={{ height: 1, width: 48, background: "#C8B99A", margin: "20px 0 28px" }} />
      <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 560, color: "#3A3733" }}>
        You're signed in. The content browser and editors arrive next. From here you'll
        manage every section of the site — homepage, tower pages, experiences, and global
        content — in both English and Arabic.
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 20, color: "#6E6456" }}>
        Your access level is <strong style={{ color: "#1D1D1B" }}>{role ?? "unknown"}</strong>.
        {role === "manager"
          ? " You can edit and publish content."
          : role === "editor"
            ? " You can edit drafts; a manager publishes them."
            : " Your role isn't set — contact the administrator."}
      </p>
    </div>
  );
}

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Frame>
        <StudioHome />
      </Frame>
    </AdminAuthProvider>
  );
}

const BRAND = "'Century Gothic','AppleGothic','Gill Sans MT',Futura,sans-serif";
const fullCenter: React.CSSProperties = {
  minHeight: "100vh", background: "#1D1D1B",
  display: "flex", alignItems: "center", justifyContent: "center",
};
const signOutStyle: React.CSSProperties = {
  background: "transparent", border: "1px solid #4A453E", color: "#F5F2EE",
  fontFamily: BRAND, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  padding: "6px 14px", cursor: "pointer",
};
