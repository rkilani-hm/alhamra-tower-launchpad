import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Toaster }         from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { pageVariants }    from "@/lib/motion";

/* Pages */
import Index               from "./pages/Index";
import Home2               from "./pages/Home2";
import { AdminApp }        from "./admin/AdminApp";
import NotFound            from "./pages/NotFound";
import TowerOverview       from "./pages/tower/TowerOverview";
import TowerRising         from "./pages/tower/TowerRising";
import TowerDesign         from "./pages/tower/TowerDesign";
import { TowerAwards }     from "./pages/tower/TowerAwards";
import TowerSustainability from "./pages/tower/TowerSustainability";

import {
  WorkplaceExperience, OfficeSpaces,
  VerticalTransportation, Connectivity,
} from "./pages/business/BusinessPages";

import {
  Services, Location,
  LeasingOpportunities, LeasingInquiry,
  Downloads, Contact,
} from "./pages/ExperiencePages";

/* Legal pages */
import Privacy from "./pages/Privacy";
import Terms   from "./pages/Terms";

/* Experience pages (separate files) */
import BusinessCentre from "./pages/experience/BusinessCentre";
import AlHamraHotel   from "./pages/experience/AlHamraHotel";
import Experience2    from "./pages/experience/Experience2";

/* i18n */
import { I18nProvider } from "@/lib/i18n";
import { EditModeProvider } from "@/lib/EditMode";

const qc = new QueryClient();

/* ── AnimatedRoutes ─────────────────────────────────────────────────────
   Wraps all routes in AnimatePresence so page transitions play on
   route change. Each page slides up on enter, fades down on exit.
   useLocation() must be called inside BrowserRouter — hence this component.
──────────────────────────────────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: "opacity, transform" }}
      >
        <Routes location={location}>
          {/* Admin — Content Studio (own frame, no marketing chrome) */}
          <Route path="/admin/*"                        element={<AdminApp />} />

          {/* Homepage */}
          {/* Home2 is now the live home page. The original home is kept but
              hidden at /home-original (renamed, not deleted). /home2 redirects
              to / so any existing links keep working. */}
          <Route path="/"                               element={<Home2 />} />
          <Route path="/home-original"                  element={<Index />} />
          <Route path="/home2"                          element={<Navigate to="/" replace />} />

          {/* ── The Tower ─────────────────────────────────────────── */}
          <Route path="/tower"                element={<TowerOverview />} />
          <Route path="/tower/rising"         element={<TowerRising />} />
          <Route path="/tower/engineering"    element={<TowerDesign />} />
          <Route path="/tower/awards"         element={<TowerAwards />} />
          <Route path="/tower/sustainability" element={<TowerSustainability />} />
          {/* renamed — keep old URLs working */}
          <Route path="/tower/design"         element={<Navigate to="/tower/engineering" replace />} />
          <Route path="/tower/recognition"    element={<Navigate to="/tower/awards" replace />} />

          {/* ── Experience (Business dissolved into here + Leasing) ── */}
          <Route path="/experience/overview"         element={<WorkplaceExperience />} />
          <Route path="/experience/services"         element={<Services />} />
          <Route path="/experience/business-support" element={<BusinessCentre />} />
          <Route path="/experience/experience-2"     element={<Experience2 />} />
          <Route path="/experience/location"         element={<Location />} />
          {/* moved/renamed — redirect old URLs */}
          <Route path="/services"        element={<Navigate to="/experience/services" replace />} />
          <Route path="/business-centre" element={<Navigate to="/experience/business-support" replace />} />
          <Route path="/location"        element={<Navigate to="/experience/location" replace />} />
          <Route path="/hotel"           element={<Navigate to="/experience/services" replace />} />

          {/* ── Business — dissolved; every old URL redirects ──────── */}
          <Route path="/business"                         element={<Navigate to="/experience/overview" replace />} />
          <Route path="/business/office-spaces"           element={<Navigate to="/leasing" replace />} />
          <Route path="/business/vertical-transportation" element={<Navigate to="/tower/engineering" replace />} />
          <Route path="/business/connectivity"            element={<Navigate to="/experience/overview" replace />} />

          {/* ── Leasing ───────────────────────────────────────────── */}
          <Route path="/leasing"          element={<LeasingOpportunities />} />
          <Route path="/leasing/inquiry"  element={<LeasingInquiry />} />
          {/* Contact merged into Inquiry; Downloads now a section on Opportunities */}
          <Route path="/leasing/contact"   element={<Navigate to="/leasing/inquiry" replace />} />
          <Route path="/leasing/downloads" element={<Navigate to="/leasing" replace />} />

          {/* Legal */}
          <Route path="/privacy"                        element={<Privacy />} />
          <Route path="/terms"                          element={<Terms />} />

          <Route path="*"                               element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={qc}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* W1: Skip to main content — keyboard accessibility */}
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          {/* C4: Respect OS reduced-motion preference for all Framer Motion */}
          <MotionConfig reducedMotion="user">
            <ScrollToTop />
            <EditModeProvider>
              <AnimatedRoutes />
            </EditModeProvider>
          </MotionConfig>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
