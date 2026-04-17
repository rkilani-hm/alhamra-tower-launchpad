import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Toaster }         from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { pageVariants }    from "@/lib/motion";

/* Pages */
import Index               from "./pages/Index";
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

/* i18n */
import { I18nProvider } from "@/lib/i18n";

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
          {/* Homepage */}
          <Route path="/"                               element={<Index />} />

          {/* Tower */}
          <Route path="/tower"                          element={<TowerOverview />} />
          <Route path="/tower/rising"                   element={<TowerRising />} />
          <Route path="/tower/design"                   element={<TowerDesign />} />
          <Route path="/tower/recognition"              element={<TowerAwards />} />
          <Route path="/tower/sustainability"           element={<TowerSustainability />} />

          {/* Business */}
          <Route path="/business"                       element={<WorkplaceExperience />} />
          <Route path="/business/office-spaces"         element={<OfficeSpaces />} />
          <Route path="/business/vertical-transportation" element={<VerticalTransportation />} />
          <Route path="/business/connectivity"          element={<Connectivity />} />

          {/* Experience */}
          <Route path="/services"                       element={<Services />} />
          <Route path="/location"                       element={<Location />} />
          <Route path="/business-centre"                element={<BusinessCentre />} />
          <Route path="/hotel"                          element={<AlHamraHotel />} />

          {/* Leasing */}
          <Route path="/leasing"                        element={<LeasingOpportunities />} />
          <Route path="/leasing/inquiry"                element={<LeasingInquiry />} />
          <Route path="/leasing/downloads"              element={<Downloads />} />
          <Route path="/leasing/contact"                element={<Contact />} />

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
            <AnimatedRoutes />
          </MotionConfig>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
