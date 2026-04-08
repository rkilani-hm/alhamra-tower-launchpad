import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "The Tower",  href: "/tower"    },
  { label: "Business",   href: "/business"  },
  { label: "Experience", href: "/services"  },
  { label: "Location",   href: "/location"  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between"
      style={{
        padding: scrolled ? "14px 64px" : "22px 64px",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,29,27,0.09)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/assets/logo.jpg"
          alt="Al Hamra"
          style={{ height: 48, width: "auto", objectFit: "contain" }}
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            t.style.display = "none";
            const parent = t.parentElement!;
            parent.innerHTML = `<span style="font-family:Jost,sans-serif;font-size:13px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#1D1D1B">AL HAMRA</span>`;
          }}
        />
      </Link>

      {/* Nav links */}
      <ul className="flex items-center gap-10 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              to={href}
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#B2B2B2",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1D1D1B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B2B2B2")}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/leasing"
        style={{
          fontFamily: "Jost, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#1D1D1B",
          textDecoration: "none",
          border: "1px solid #1D1D1B",
          padding: "10px 24px",
          transition: "background 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#1D1D1B";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#1D1D1B";
        }}
      >
        Leasing Inquiry
      </Link>
    </nav>
  );
}
