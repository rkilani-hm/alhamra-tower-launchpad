import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { LanguageToggle } from "@/components/shared/LanguageToggle";

const NAV = [
  {
    labelKey: "nav.tower",
    href:  "/tower",
    children: [
      { labelKey: "nav.sub.overview",       href: "/tower"                  },
      { labelKey: "nav.sub.rising",         href: "/tower/rising"           },
      { labelKey: "nav.sub.design",         href: "/tower/design"           },
      { labelKey: "nav.sub.awards",         href: "/tower/recognition"      },
      { labelKey: "nav.sub.sustainability", href: "/tower/sustainability"   },
    ],
  },
  {
    labelKey: "nav.business",
    href:  "/business",
    children: [
      { labelKey: "nav.sub.workplace",    href: "/business"                         },
      { labelKey: "nav.sub.offices",      href: "/business/office-spaces"           },
      { labelKey: "nav.sub.vertical",     href: "/business/vertical-transportation" },
      { labelKey: "nav.sub.connectivity", href: "/business/connectivity"            },
    ],
  },
  {
    labelKey: "nav.experience",
    href:  "/services",
    children: [
      { labelKey: "nav.sub.servicesFull",   href: "/services"        },
      { labelKey: "nav.sub.locationFull",   href: "/location"        },
      { labelKey: "nav.sub.businessCenter", href: "/business-centre" },
      { labelKey: "nav.sub.hotel",          href: "/hotel"           },
    ],
  },
  {
    labelKey: "nav.leasing",
    href:  "/leasing",
    children: [
      { labelKey: "nav.sub.opportunities", href: "/leasing"                      },
      { labelKey: "nav.sub.inquiry",       href: "/leasing/inquiry#inquiry-form" },
      { labelKey: "nav.sub.downloads",     href: "/leasing/downloads"            },
      { labelKey: "nav.sub.contact",       href: "/leasing/contact"              },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [openMenu, setOpenMenu]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null); // mobile accordion
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setOpenSection(null);
  }, [location.pathname]);

  // Auto-open current section in mobile menu
  useEffect(() => {
    if (mobileOpen) {
      const current = NAV.find(n => location.pathname.startsWith(n.href));
      if (current) setOpenSection(current.labelKey);
    }
  }, [mobileOpen, location.pathname]);

  const openDropdown  = (key: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(key); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 180); };
  const stayOpen      = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const toggleSection = (key: string) =>
    setOpenSection(prev => prev === key ? null : key);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 20,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled
            ? "clamp(12px,1.5vh,14px) clamp(20px,5vw,64px)"
            : "clamp(16px,2vh,22px) clamp(20px,5vw,64px)",
          background: scrolled || openMenu || mobileOpen ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled || openMenu || mobileOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || openMenu || mobileOpen ? "1px solid rgba(29,29,27,0.09)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/assets/al-hamra-logo.png"
            alt="Al Hamra"
            style={{
              height: 64, width: "auto", objectFit: "contain",
              transition: "opacity 0.4s ease",
            }}
            onError={e => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              t.parentElement!.innerHTML = `<span style="font-family:'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#1D1D1B">AL HAMRA</span>`;
            }}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="nav-desktop-links" style={{ alignItems: "center", gap: 4, listStyle: "none" }}>
          {NAV.map(({ labelKey, href, children }) => {
            const isActive = location.pathname.startsWith(href);
            const isOpen   = openMenu === labelKey;
            return (
              <li key={labelKey} style={{ position: "relative" }}
                onMouseEnter={() => openDropdown(labelKey)}
                onMouseLeave={closeDropdown}
              >
                <Link to={href}
                  className={`text-base ah-nav-link${location.pathname === href || location.pathname.startsWith(href + "/") ? " active" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                    textDecoration: "none", padding: "8px 16px",
                    transition: "color 0.2s",
                  }}>
                  {t(labelKey)}
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", opacity: 0.5 }}>
                    <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* Desktop dropdown */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.18, ease: "easeOut" }}
                      onMouseEnter={stayOpen} onMouseLeave={closeDropdown}
                      style={{
                        position: "absolute", top: "calc(100% + 8px)", left: "50%",
                        transform: "translateX(-50%)", background: "#fff",
                        border: "1px solid rgba(29,29,27,0.09)",
                        boxShadow: "0 8px 32px rgba(29,29,27,0.08)",
                        minWidth: 220, padding: "8px 0", zIndex: 30,
                      }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: "2px", background: "#1D1D1B" }} />
                      {children.map(({ labelKey: cl, href: ch }, i) => {
                        const isChildActive = location.pathname === ch;
                        return (
                          <Link key={ch} to={ch}
                            className="text-sm"
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "11px 20px",
                              fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                              color: isChildActive ? "#1D1D1B" : "#6B6B6B",
                              textDecoration: "none",
                              borderLeft: isChildActive ? "2px solid #1D1D1B" : "2px solid transparent",
                              background: isChildActive ? "#FAFAFA" : "transparent",
                              transition: "color 0.2s, background 0.2s, border-color 0.2s",
                            }}
                            onMouseEnter={e => { if (!isChildActive) { e.currentTarget.style.color="#1D1D1B"; e.currentTarget.style.background="#FAFAFA"; } }}
                            onMouseLeave={e => { if (!isChildActive) { e.currentTarget.style.color="#6B6B6B"; e.currentTarget.style.background="transparent"; } }}
                          >
                            <span style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"13px", fontWeight:300, color: isChildActive ? "#1D1D1B" : "#EDEDED", minWidth:18, lineHeight:1 }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {t(cl)}
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

        {/* Right — CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/leasing/inquiry#inquiry-form" className="nav-cta-desktop" style={{
            fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "16px", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#1D1D1B", textDecoration: "none",
            border: "1px solid #1D1D1B", padding: "10px 24px", transition: "background 0.3s, color 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#1D1D1B"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#1D1D1B"; }}
          >
            {t("nav.cta")}
          </Link>

          {/* Language toggle */}
          <LanguageToggle variant="light" />

          <button type="button" onClick={() => setMobileOpen(p => !p)} className="mobile-menu-btn"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, color: "#1D1D1B" }}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              {mobileOpen ? (
                <path d="M1 1L21 15M21 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ───────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, zIndex: 20,
              background: "#fff", overflowY: "auto",
              paddingTop: 80,
            }}
          >
            <div style={{ padding: "24px 0 60px" }}>
              {NAV.map(({ labelKey, href, children }) => {
                const isExpanded   = openSection === labelKey;
                const isActive     = location.pathname.startsWith(href);
                const sectionId    = labelKey.replace(/\./g, "-");

                return (
                  <div key={labelKey} style={{ borderBottom: "1px solid rgba(29,29,27,0.07)" }}>

                    {/* Section header — tap to expand */}
                    <button type="button"
                      onClick={() => toggleSection(labelKey)}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-nav-${sectionId}`}
                      style={{
                        width: "100%", display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 28px",
                        background: "none", border: "none", cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span style={{
                        fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                        fontSize: "15px", letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: isActive ? "#1D1D1B" : "#6B6B6B",
                        fontWeight: isActive ? 500 : 300,
                      }}>
                        {t(labelKey)}
                      </span>

                      {/* Animated chevron */}
                      <motion.svg
                        width="14" height="8" viewBox="0 0 14 8" fill="none"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        <path d="M1 1L7 7L13 1" stroke={isActive ? "#1D1D1B" : "#6B6B6B"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </button>

                    {/* Sub-pages — animated collapse */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          id={`mobile-section-${sectionId}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ background: "#FAFAFA", padding: "4px 0 8px" }}>
                            {children.map(({ labelKey: cl, href: ch }, i) => {
                              const isChildActive = location.pathname === ch;
                              return (
                                <Link key={ch} to={ch} style={{
                                  display: "flex", alignItems: "center", gap: 16,
                                  padding: "13px 28px 13px 36px",
                                  fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif",
                                  fontSize: "18px", fontWeight: 300,
                                  letterSpacing: "0.08em",
                                  color: isChildActive ? "#1D1D1B" : "#6B6B6B",
                                  textDecoration: "none",
                                  borderLeft: isChildActive ? "3px solid #1D1D1B" : "3px solid transparent",
                                  background: isChildActive ? "#fff" : "transparent",
                                  transition: "background 0.15s",
                                }}>
                                  <span style={{ fontFamily:"'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize:"15px", fontWeight:300, color:"#EDEDED", lineHeight:1, flexShrink:0 }}>
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  {t(cl)}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile leasing CTA */}
              <div style={{ padding: "32px 28px 0" }}>
                <Link to="/leasing/inquiry#inquiry-form"
                  style={{
                    display: "block", textAlign: "center",
                    background: "#1D1D1B", color: "#fff",
                    fontFamily: "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif", fontSize: "16.5px",
                  }}
                >
                  Leasing Inquiry
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
