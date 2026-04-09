import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { Hero }                from "@/components/home/Hero";
import { Stats }               from "@/components/home/Stats";
import { Marquee }             from "@/components/home/Marquee";
import { Architecture }        from "@/components/home/Architecture";
import { GulfSection }         from "@/components/home/GulfSection";
import { ViewSection }         from "@/components/home/ViewSection";
import { InvitationSection }   from "@/components/home/InvitationSection";
import { MashrabiyaDivider }   from "@/components/shared/MashrabiyaDivider";
import { Perspectives, FloorConfigs, ContactStrip } from "@/components/home/Sections";

/*
  Homepage — 5 emotional beats:
  ─────────────────────────────
  Beat 1  ARRIVAL      → Hero (full-viewport cinematic, tower)
  Beat 2  THE CITY     → GulfSection (aerial photo, coordinates, Gulf)
          ── Mashrabiya divider ──
  Beat 3  THE TOWER    → Stats → Marquee → Architecture
          ── Mashrabiya divider ──
  Beat 4  THE VIEW     → ViewSection (floor 55 view, warmth)
          ── Mashrabiya divider ──
  Beat 5  THE ADDRESS  → Perspectives → FloorConfigs → InvitationSection
  ────── ContactStrip → Footer ──────────────────────────────────────────
*/

export default function Index() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Beat 1: Arrival ──────────────────────────────────── */}
        <Hero />

        {/* ── Beat 2: The City (Gulf, coordinates) ─────────────── */}
        <GulfSection />

        {/* ── Mashrabiya geometric divider ─────────────────────── */}
        <MashrabiyaDivider count={9} />

        {/* ── Beat 3: The Tower ────────────────────────────────── */}
        <Stats />
        <Marquee />
        <Architecture />

        {/* ── Mashrabiya divider ───────────────────────────────── */}
        <MashrabiyaDivider count={7} light />

        {/* ── Beat 4: The View ─────────────────────────────────── */}
        <ViewSection />

        {/* ── Mashrabiya divider ───────────────────────────────── */}
        <MashrabiyaDivider count={9} />

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
