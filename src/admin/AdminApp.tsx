/* Admin shell — the /admin frame. Guards on session, renders login when
   signed out, and the studio layout (header + outlet) when signed in. */

import { ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuth";
import { AdminLogin } from "./AdminLogin";
import { ContentBrowser } from "./ContentBrowser";

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
          <span style={{ letterSpacing: "0.24em", fontSize: 10, color: "#CD1719", textTransform: "uppercase" }}>
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
                  color: role === "manager" ? "#B9B9B7" : "#9A8B73",
                  border: `1px solid ${role === "manager" ? "#B9B9B7" : "#4A453E"}`,
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

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Frame>
        <ContentBrowser />
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
