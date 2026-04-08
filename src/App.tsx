import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes }     from "react-router-dom";
import { Toaster }         from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const qc = new QueryClient();

const App = () => (
  <QueryClientProvider client={qc}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/"                              element={<Index />} />

          {/* Tower */}
          <Route path="/tower"                         element={<TowerOverview />} />
          <Route path="/tower/rising"                  element={<TowerRising />} />
          <Route path="/tower/design"                  element={<TowerDesign />} />
          <Route path="/tower/recognition"             element={<TowerAwards />} />
          <Route path="/tower/sustainability"          element={<TowerSustainability />} />

          {/* Business */}
          <Route path="/business"                      element={<WorkplaceExperience />} />
          <Route path="/business/office-spaces"        element={<OfficeSpaces />} />
          <Route path="/business/vertical-transportation" element={<VerticalTransportation />} />
          <Route path="/business/connectivity"         element={<Connectivity />} />

          {/* Experience */}
          <Route path="/services"                      element={<Services />} />
          <Route path="/location"                      element={<Location />} />

          {/* Leasing */}
          <Route path="/leasing"                       element={<LeasingOpportunities />} />
          <Route path="/leasing/inquiry"               element={<LeasingInquiry />} />
          <Route path="/leasing/downloads"             element={<Downloads />} />
          <Route path="/leasing/contact"               element={<Contact />} />

          <Route path="*"                              element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
