import { Navbar }                 from "@/components/layout/Navbar";
import { Footer }                 from "@/components/layout/Footer";
import { Hero2 }                  from "@/components/home/Hero2";
import { HeroStatsBar }           from "@/components/home/HeroStatsBar";
import { AvailableConfigurations } from "@/components/home/AvailableConfigurations";
import { FeatureRows }            from "@/components/home/FeatureRows";
import { LocationAccess }         from "@/components/home/LocationAccess";
import { ExperienceCards }        from "@/components/home/ExperienceCards";
import { BeyondTheOffice }        from "@/components/home/BeyondTheOffice";
import { HomeAwards }             from "@/components/home/HomeAwards";
import { LeasingDownloads }       from "@/components/home/LeasingDownloads";
import { ContactStrip }           from "@/components/home/Sections";

/*
  Home2 — proposed leasing-first homepage (2026 direction), shipped alongside the
  current homepage at /home2 for client review. Kept fully separate so the live
  homepage ("/") is unchanged: this page uses its own Hero2 (lockup hero) and
  LeasingDownloads (leasing + downloads) variants.

  All content is CMS-editable (text via <Editable>, images/videos via SlotImage /
  SlotVideo), same as the rest of the site.
*/

export default function Home2() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero2 />
        <HeroStatsBar />
        <AvailableConfigurations />
        <FeatureRows />
        <LocationAccess />
        <ExperienceCards />
        <BeyondTheOffice />
        <HomeAwards />
        <LeasingDownloads />
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}
