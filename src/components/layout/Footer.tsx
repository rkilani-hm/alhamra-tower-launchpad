import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "The Tower",  href: "/tower"    },
  { label: "Business",   href: "/business"  },
  { label: "Leasing",    href: "/leasing"   },
  { label: "Instagram",  href: "#"          },
  { label: "LinkedIn",   href: "#"          },
  { label: "Privacy Policy", href: "#"      },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(29,29,27,0.09)",
        padding: "44px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img
          src="/assets/logo.jpg"
          alt="Al Hamra"
          style={{ height: 34, width: "auto", objectFit: "contain", opacity: 0.4 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <span
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 10,
            color: "#B2B2B2",
            letterSpacing: "0.12em",
          }}
        >
          © 2026 Al Hamra Tower · All rights reserved · Kuwait City, Kuwait
        </span>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {FOOTER_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            style={{
              fontFamily: "Jost, sans-serif",
              fontSize: 10,
              color: "#B2B2B2",
              textDecoration: "none",
              letterSpacing: "0.12em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1D1D1B")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#B2B2B2")}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
