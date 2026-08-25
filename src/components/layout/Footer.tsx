import { Link } from "react-router-dom";
import { SocialIcons } from "@/components/shared/SocialIcons";
import { useT } from "@/lib/i18n";
import { Editable, SlotImage } from "@/lib/EditMode";

/* Nav labels reuse the shared section_fields:nav rows (same t() keys as the
   Navbar); footer-only strings live under section_fields:footer. */
const navId = (k: string) => `section_fields:nav:${k.replace(/^nav\./, "")}`;

const NAV = [
  {
    titleKey: "nav.tower",
    links: [
      { labelKey: "nav.sub.overview",       href: "/tower"                  },
      { labelKey: "nav.sub.rising",         href: "/tower/rising"           },
      { labelKey: "nav.sub.design",         href: "/tower/design"           },
      { labelKey: "nav.sub.awards",         href: "/tower/recognition"      },
      { labelKey: "nav.sub.sustainability", href: "/tower/sustainability"   },
    ],
  },
  {
    titleKey: "nav.business",
    links: [
      { labelKey: "nav.sub.workplace",    href: "/business"                         },
      { labelKey: "nav.sub.offices",      href: "/business/office-spaces"           },
      { labelKey: "nav.sub.vertical",     href: "/business/vertical-transportation" },
      { labelKey: "nav.sub.connectivity", href: "/business/connectivity"            },
    ],
  },
  {
    titleKey: "nav.experience",
    links: [
      { labelKey: "nav.sub.servicesFull", href: "/services" },
      { labelKey: "nav.sub.locationFull", href: "/location" },
    ],
  },
  {
    titleKey: "nav.leasing",
    links: [
      { labelKey: "nav.sub.opportunities", href: "/leasing"                      },
      { labelKey: "nav.sub.inquiry",       href: "/leasing/inquiry#inquiry-form" },
      { labelKey: "nav.sub.contact",       href: "/leasing/contact"              },
    ],
  },
];

const navLink: React.CSSProperties = {
  display: "block",
  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
  fontSize: "11.5px",
  fontWeight: 300,
  color: "#6B6B6B",
  textDecoration: "none",
  marginBottom: 10,
  transition: "color 0.2s",
};

export function Footer() {
  const t = useT();
  return (
    <footer style={{ background: "#fff" }}>


      {/* Sitemap grid */}
      <div className="footer-sitemap">
        {/* Logo + tagline + social icons */}
        <div style={{ position: "relative" }}>
          <SlotImage
            motion
            slot="site.logo"
            fallback="/assets/al-hamra-logo.png"
            alt={t("meta.siteName")}
            style={{ height: 183, width: "auto", objectFit: "contain", marginBottom: 20 }}
            onError={(e: any) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          {/* Social icons row */}
          <SocialIcons variant="footer" color="#6B6B6B" hoverColor="#1D1D1B" />
        </div>

        {/* Nav columns */}
        {NAV.map(({ titleKey, links }) => (
          <div key={titleKey}>
            <div style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#1D1D1B", fontWeight: 500, marginBottom: 20 }}>
              <Editable id={navId(titleKey)}>{t(titleKey)}</Editable>
            </div>
            {links.map(({ labelKey, href }) => (
              <Link key={labelKey} to={href}
                style={navLink}
                onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B6B6B")}
              >
                <Editable id={navId(labelKey)}>{t(labelKey)}</Editable>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(29,29,27,0.07)" }}>
        <span style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color: "#6B6B6B", letterSpacing: "0.1em" }}>
          <Editable id="section_fields:footer:copyright">{t("footer.copyright")}</Editable>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          {[
            { labelKey: "footer.privacyPolicy", href: "/privacy" },
            { labelKey: "footer.termsOfUse",    href: "/terms"   },
          ].map(({ labelKey, href }) => (
            <Link key={labelKey} to={href}
              style={{ fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "10px", color: "#6B6B6B", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1B")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B6B6B")}
            ><Editable id={`section_fields:footer:${labelKey.replace(/^footer\./, "")}`}>{t(labelKey)}</Editable></Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
