/* Admin login — quiet, branded entry to the Content Studio.
   Charcoal canvas, pearl accents, Century Gothic. No marketing chrome. */

import { useState } from "react";
import { useAdminAuth } from "./AdminAuth";

export function AdminLogin() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    setError(null);
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) setError(error === "Invalid login credentials"
      ? "Email or password is incorrect."
      : error);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1D1D1B",
        color: "#F5F2EE",
        fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT',Futura,sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Wordmark */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{ letterSpacing: "0.28em", fontSize: 11, color: "#CD1719", textTransform: "uppercase" }}>
            Al Hamra Business Tower
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 400, margin: "14px 0 0", letterSpacing: "0.02em" }}>
            Content Studio
          </h1>
          <div style={{ height: 1, width: 48, background: "#C8B99A", margin: "18px auto 0", opacity: 0.6 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9A8B73" }}>
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
              autoComplete="email"
              style={inputStyle}
            />
          </label>

          <label style={{ display: "block" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9A8B73" }}>
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
              autoComplete="current-password"
              style={inputStyle}
            />
          </label>

          {error && (
            <div style={{ fontSize: 13, color: "#E0A0A0", lineHeight: 1.5 }}>{error}</div>
          )}

          <button
            onClick={handleSignIn}
            disabled={busy || !email || !password}
            style={{
              marginTop: 8,
              padding: "13px 16px",
              background: busy ? "#7A6E58" : "#C8B99A",
              color: "#1D1D1B",
              border: "none",
              fontFamily: "inherit",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: busy || !email || !password ? "default" : "pointer",
              opacity: !email || !password ? 0.5 : 1,
              transition: "background 160ms, opacity 160ms",
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </div>

        <p style={{ marginTop: 28, fontSize: 11, lineHeight: 1.7, color: "#6E6456", textAlign: "center" }}>
          Authorised editors only. Contact the site administrator for access.
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 7,
  padding: "12px 14px",
  background: "#262422",
  border: "1px solid #3A3733",
  color: "#F5F2EE",
  fontFamily: "inherit",
  fontSize: 15,
  outline: "none",
  borderRadius: 0,
};
