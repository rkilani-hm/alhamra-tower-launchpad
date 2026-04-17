import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { Hero }                from "@/components/home/Hero";
import { Stats }               from "@/components/home/Stats";
import { Marquee }             from "@/components/home/Marquee";
import { Architecture }        from "@/components/home/Architecture";
import { GulfSection }         from "@/components/home/GulfSection";
import { InvitationSection }   from "@/components/home/InvitationSection";
import { FounderQuote }        from "@/components/home/FounderQuote";
import { AwardsStrip }         from "@/components/home/AwardsStrip";
import { ExperienceCards }     from "@/components/home/ExperienceCards";
import { Perspectives, FloorConfigs, ContactStrip } from "@/components/home/Sections";

/*
  Homepage — 5 emotional beats with deliberate dark/light rhythm:
  ──────────────────────────────────────────────────────────────────────
  Beat 1  ARRIVAL      → Hero            [DARK video]
  Beat 2  THE CITY     → GulfSection     [DARK aerial]
  Beat 3  THE GESTURE  → FounderQuote    [LIGHT · SOM quote + tower render]
                         AwardsStrip     [DARK · 412m / 258,000m² / 80 monumental]
                         ExperienceCards [DARK · 4 discovery paths — burjkhalifa.ae-style]
  Beat 4  THE TOWER    → Stats           [LIGHT · animated counts]
                         Marquee         [LIGHT · scrolling text]
                         Architecture    [LIGHT · dual glass/stone]
  Beat 5  THE ADDRESS  → Perspectives    [LIGHT]
                         FloorConfigs    [LIGHT]
                         InvitationSection [DARK · tenant invitation]
  ────── ContactStrip → Footer ──────────────────────────────────────────
*/

export default function Index() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Beat 1: Arrival ──────────────────────────────────── */}
        <Hero />

        {/* ── Beat 2: The City ─────────────────────────────────── */}
        <GulfSection />

        {/* ── Beat 3: The Gesture (the new editorial moment) ──── */}
        <FounderQuote />
        <AwardsStrip />
        <ExperienceCards />

        {/* ── Beat 4: The Tower ────────────────────────────────── */}
        <Stats />
        <Marquee />
        <Architecture />

        {/* ── Beat 5: The Address ──────────────────────────────── */}
        <Perspectives />
        <FloorConfigs />
        <InvitationSection />

        {/* ── Footer approach ──────────────────────────────────── */}
        <ContactStrip />

      </main>
      <Footer />
    </>
  );
}
