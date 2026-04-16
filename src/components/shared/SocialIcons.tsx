import React from "react";

interface SocialLink { name: string; url: string; }

const SOCIALS: SocialLink[] = [
  { name: "Instagram", url: "https://www.instagram.com/alhamratower"                         },
  { name: "Facebook",  url: "https://www.facebook.com/AlHamraTowerofficial"                  },
  { name: "X",         url: "https://x.com/AlHamraTower"                                     },
  { name: "LinkedIn",  url: "https://www.linkedin.com/company/al-hamra-real-estate-company"  },
  { name: "YouTube",   url: "https://www.youtube.com/@alhamratower"                          },
];

/* ── SVG icon paths ── */
const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="2.5"/>
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  X: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16M4 20L20 4"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  YouTube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon fill="currentColor" stroke="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

interface Props {
  /** "footer" — small icons on dark/light bg, row layout
   *  "contact" — larger icons with labels, vertical list */
  variant?: "footer" | "contact";
  /** For footer variant: icon color */
  color?: string;
  /** For footer variant: hover color */
  hoverColor?: string;
}

export function SocialIcons({ variant = "footer", color = "#6B6B6B", hoverColor = "#1D1D1B" }: Props) {
  if (variant === "contact") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SOCIALS.map(({ name, url }) => (
          <a key={name} href={url} target="_blank" rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "14px 0",
              borderBottom: "1px solid rgba(29,29,27,0.07)",
              textDecoration: "none", color: "#1D1D1B",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6B6B6B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#1D1D1B")}
          >
            {/* Icon square */}
            <div style={{
              width: 36, height: 36, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(29,29,27,0.12)",
              background: "#FAFAFA",
            }}>
              {ICONS[name]}
            </div>
            <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "13px", fontWeight: 300 }}>
              {name === "X" ? "X (Twitter)" : name}
            </span>
          </a>
        ))}
      </div>
    );
  }

  // Footer variant — compact icon row
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {SOCIALS.map(({ name, url }) => (
        <a key={name} href={url} target="_blank" rel="noreferrer"
          aria-label={name}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 34, height: 34,
            color,
            textDecoration: "none",
            transition: "color 0.25s, background 0.25s",
            border: "1px solid transparent",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = hoverColor;
            e.currentTarget.style.borderColor = "rgba(29,29,27,0.15)";
            e.currentTarget.style.background = "#FAFAFA";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = color;
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.background = "transparent";
          }}
        >
          {ICONS[name]}
        </a>
      ))}
    </div>
  );
}
