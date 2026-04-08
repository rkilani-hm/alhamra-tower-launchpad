import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  {
    label: "The Tower",
    href:  "/tower",
    children: [
      { label: "Overview",             href: "/tower"                  },
      { label: "Rising with Purpose",  href: "/tower/rising"           },
      { label: "Design & Engineering", href: "/tower/design"           },
      { label: "Awards & Recognition", href: "/tower/recognition"      },
      { label: "Sustainability",       href: "/tower/sustainability"   },
    ],
  },
  {
    label: "Business",
    href:  "/business",
    children: [
      { label: "Workplace Experience",    href: "/business"                          },
      { label: "Office Spaces",           href: "/business/office-spaces"            },
      { label: "Vertical Transportation", href: "/business/vertical-transportation"  },
      { label: "Connectivity",            href: "/business/connectivity"             },
    ],
  },
  {
    label: "Experience",
    href:  "/services",
    children: [
      { label: "Services & Facilities", href: "/services"  },
      { label: "Location & Access",     href: "/location"  },
    ],
  },
  {
    label: "Leasing",
    href:  "/leasing",
    children: [
      { label: "Opportunities", href: "/leasing"           },
      { label: "Inquiry",       href: "/leasing/inquiry"   },
      { label: "Downloads",     href: "/leasing/downloads" },
      { label: "Contact",       href: "/leasing/contact"   },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [openMenu, setOpenMenu]     = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const open  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };
  const stayOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "clamp(12px,1.5vh,14px) clamp(20px,5vw,64px)" : "clamp(16px,2vh,22px) clamp(20px,5vw,64px)",
          background: scrolled || openMenu || mobileOpen
            ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled || openMenu || mobileOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || openMenu || mobileOpen
            ? "1px solid rgba(29,29,27,0.09)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/assets/logo.jpg"
            alt="Al Hamra"
            style={{ height: 48, width: "auto", objectFit: "contain" }}
            onError={e => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const parent = t.parentElement!;
              parent.innerHTML = `<span style="font-family:Jost,sans-serif;font-size:13px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#1D1D1B">AL HAMRA</span>`;
            }}
          />
        </Link>

        {/* Desktop nav */}
        <ul style={{ display: "flex", alignItems: "center", gap: 4, listStyle: "none" }}>
          {NAV.map(({ label, href, children }) => {
            const isActive = location.pathname.startsWith(href);
            const isOpen   = openMenu === label;
            return (
              <li
                key={label}
                style={{ position: "relative" }}
                onMouseEnter={() => open(label)}
                onMouseLeave={close}
              >
                {/* Top-level link */}
                <Link
                  to={href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontFamily: "Jost, sans-serif",
                    fontSize: "10.5px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "#1D1D1B" : isOpen ? "#1D1D1B" : "#B2B2B2",
                    textDecoration: "none",
                    padding: "8px 16px",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                  {/* Chevron */}
                  <svg
                    width="9" height="6" viewBox="0 0 9 6" fill="none"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      opacity: 0.5,
                    }}
                  >
                    <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={stayOpen}
                      onMouseLeave={close}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        border: "1px solid rgba(29,29,27,0.09)",
                        boxShadow: "0 8px 32px rgba(29,29,27,0.08)",
                        minWidth: 220,
                        padding: "8px 0",
                        zIndex: 300,
                      }}
                    >
                      {/* Top accent line */}
                      <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: "2px", background: "#1D1D1B" }} />

                      {children.map(({ label: childLabel, href: childHref }, i) => {
                        const isChildActive = location.pathname === childHref;
                        return (
                          <Link
                            key={childHref}
                            to={childHref}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "11px 20px",
                              fontFamily: "Jost, sans-serif",
                              fontSize: "10.5px",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: isChildActive ? "#1D1D1B" : "#6B6B6B",
                              textDecoration: "none",
                              borderLeft: isChildActive
                                ? "2px solid #1D1D1B"
                                : "2px solid transparent",
                              transition: "color 0.2s, background 0.2s, border-color 0.2s",
                              background: isChildActive ? "#FAFAFA" : "transparent",
                            }}
                            onMouseEnter={e => {
                              if (!isChildActive) {
                                e.currentTarget.style.color = "#1D1D1B";
                                e.currentTarget.style.background = "#FAFAFA";
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isChildActive) {
                                e.currentTarget.style.color = "#6B6B6B";
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                          >
                            {/* Small index number */}
                            <span style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "13px",
                              fontWeight: 300,
                              color: isChildActive ? "#1D1D1B" : "#EDEDED",
                              minWidth: 18,
                              lineHeight: 1,
                            }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {childLabel}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Right: CTA + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            to="/leasing/inquiry"
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
            onMouseEnter={e => {
              e.currentTarget.style.background = "#1D1D1B";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1D1D1B";
            }}
          >
            Leasing Inquiry
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              padding: 8, color: "#1D1D1B",
            }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              {mobileOpen ? (
                <path d="M1 1L19 13M19 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="0" y1="1"  x2="20" y2="1"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, zIndex: 190,
              background: "#fff",
              overflowY: "auto",
              paddingTop: 92,
            }}
          >
            <div style={{ padding: "32px 40px" }}>
              {NAV.map(({ label, href, children }) => (
                <div key={label} style={{ marginBottom: 32 }}>
                  <Link
                    to={href}
                    style={{
                      display: "block",
                      fontFamily: "Jost, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#B2B2B2",
                      textDecoration: "none",
                      marginBottom: 14,
                    }}
                  >{label}</Link>
                  {children.map(({ label: cl, href: ch }) => (
                    <Link
                      key={ch}
                      to={ch}
                      style={{
                        display: "block",
                        fontFamily: "Jost, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "#1D1D1B",
                        textDecoration: "none",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(29,29,27,0.06)",
                        letterSpacing: "0.04em",
                      }}
                    >{cl}</Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: flex !important; }
          nav ul { display: none !important; }
        }
      `}</style>
    </>
  );
}
