import { Link } from "react-router-dom";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { PatternBand } from "@/components/shared/PatternBand";

const NAV = [
  {
    title: "The Tower",
    links: [
      { label: "Overview",             href: "/tower"                  },
      { label: "Rising with Purpose",  href: "/tower/rising"           },
      { label: "Design & Engineering", href: "/tower/design"           },
      { label: "Awards & Recognition", href: "/tower/recognition"      },
      { label: "Sustainability",       href: "/tower/sustainability"   },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Workplace Experience",    href: "/business"                          },
      { label: "Office Spaces",           href: "/business/office-spaces"            },
      { label: "Vertical Transportation", href: "/business/vertical-transportation"  },
      { label: "Connectivity",            href: "/business/connectivity"             },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Services & Facilities", href: "/services"  },
      { label: "Location & Access",     href: "/location"  },
    ],
  },
  {
    title: "Leasing",
    links: [
      { label: "Opportunities", href: "/leasing"           },
      { label: "Inquiry",       href: "/leasing/inquiry#inquiry-form"   },
      { label: "Downloads",     href: "/leasing/downloads" },
      { label: "Contact",       href: "/leasing/contact"   },
    ],
  },
];

const navLink: React.CSSProperties = {
  display: "block",
  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
  fontSize: "11.5px",
  fontWeight: 300,
  color: "#767676",
  textDecoration: "none",
  marginBottom: 10,
  transition: "color 0.2s",
};

export function Footer() {
  return (
    <footer style={{ background: "#fff" }}>


      {/* Sitemap grid */}
      <div className="footer-sitemap">
        {/* Logo + tagline + social icons */}
        <div>
          <img
            src="/assets/al-hamra-logo.png" alt="Al Hamra"
            style={{ height: 183, width: "auto", objectFit: "contain", marginBottom: 20 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          {/* Social icons row */}
          <SocialIcons variant="footer" color="#767676" hoverColor="#1D1D1B" />
        </div>

        {/* Nav columns */}
        {NAV.map(({ title, links }) => (
          <div key={title}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#1D1D1B", fontWeight: 500, marginBottom: 20 }}>
              {title}
            </div>
            {links.map(({ label, href }) => (
              <Link key={label} to={href}
                style={navLink}
                onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(29,29,27,0.07)" }}>
        <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color: "#767676", letterSpacing: "0.1em" }}>
          © 2026 Al Hamra Tower. All rights reserved. — Kuwait City, Kuwait
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Use"].map(l => (
            <Link key={l} to={l === "Privacy Policy" ? "/privacy" : "/terms"}
              style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color: "#767676", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
              onMouseLeave={e => (e.currentTarget.style.color = "#767676")}
            >{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
