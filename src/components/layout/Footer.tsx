import { Link } from "react-router-dom";

const NAV = [
  {
    title: "The Tower",
    links: [
      { label: "Overview",            href: "/tower"                   },
      { label: "Rising with Purpose", href: "/tower/rising"            },
      { label: "Design & Engineering",href: "/tower/design"            },
      { label: "Awards & Recognition",href: "/tower/recognition"       },
      { label: "Sustainability",      href: "/tower/sustainability"    },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Workplace Experience",   href: "/business"                          },
      { label: "Office Spaces",          href: "/business/office-spaces"            },
      { label: "Vertical Transportation",href: "/business/vertical-transportation"  },
      { label: "Connectivity",           href: "/business/connectivity"             },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Services & Facilities",  href: "/services"  },
      { label: "Location & Access",      href: "/location"  },
    ],
  },
  {
    title: "Leasing",
    links: [
      { label: "Opportunities", href: "/leasing"           },
      { label: "Inquiry",       href: "/leasing/inquiry"   },
      { label: "Downloads",     href: "/leasing/downloads" },
      { label: "Contact",       href: "/leasing/contact"   },
    ],
  },
];

const SOCIAL = [
  { name: "Instagram", url: "https://www.instagram.com/alhamratower"                         },
  { name: "Facebook",  url: "https://www.facebook.com/AlHamraTowerofficial"                  },
  { name: "X",         url: "https://x.com/AlHamraTower"                                     },
  { name: "LinkedIn",  url: "https://www.linkedin.com/company/al-hamra-real-estate-company"  },
  { name: "YouTube",   url: "https://www.youtube.com/@alhamratower"                          },
];

const link: React.CSSProperties = {
  display: "block",
  fontFamily: "Jost, sans-serif",
  fontSize: "11.5px",
  fontWeight: 300,
  color: "#B2B2B2",
  textDecoration: "none",
  marginBottom: 10,
  transition: "color 0.2s",
};

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(29,29,27,0.09)", background: "#fff" }}>
      <div className="footer-sitemap">
        {/* Logo + tagline */}
        <div>
          <img
            src="/assets/logo.jpg"
            alt="Al Hamra"
            style={{ height: 44, width: "auto", objectFit: "contain", marginBottom: 20 }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <p style={{ fontFamily: "Jost,sans-serif", fontSize: "11.5px", fontWeight: 300, color: "#B2B2B2", lineHeight: 1.8, maxWidth: 200 }}>
            Kuwait's most iconic commercial landmark. 412 metres. Sharq, Kuwait City.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            {SOCIAL.map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"
                style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B2B2B2", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                onMouseLeave={e => (e.currentTarget.style.color = "#B2B2B2")}
              >{name}</a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV.map(({ title, links }) => (
          <div key={title}>
            <div style={{ fontFamily: "Jost,sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#1D1D1B", fontWeight: 500, marginBottom: 20 }}>{title}</div>
            {links.map(({ label, href }) => (
              <Link key={label} to={href}
                style={link}
                onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                onMouseLeave={e => (e.currentTarget.style.color = "#B2B2B2")}
              >{label}</Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(29,29,27,0.07)" }}>
        <span style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", color: "#B2B2B2", letterSpacing: "0.1em" }}>
          © 2026 Al Hamra Tower. All rights reserved. — Kuwait City, Kuwait
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Use"].map(l => (
            <Link key={l} to="#"
              style={{ fontFamily: "Jost,sans-serif", fontSize: "10px", color: "#B2B2B2", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
              onMouseLeave={e => (e.currentTarget.style.color = "#B2B2B2")}
            >{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
