import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { Hero }                from "@/components/home/Hero";
import { Stats }               from "@/components/home/Stats";
import { Marquee }             from "@/components/home/Marquee";
import { Architecture }        from "@/components/home/Architecture";
import { GulfSection }         from "@/components/home/GulfSection";
import { ViewSection }         from "@/components/home/ViewSection";
import { InvitationSection }   from "@/components/home/InvitationSection";
import { PatternBand }         from "@/components/shared/PatternBand";
import { Perspectives, FloorConfigs, ContactStrip } from "@/components/home/Sections";

/*
  Homepage — 5 emotional beats:
  ─────────────────────────────
  Beat 1  ARRIVAL      → Hero (full-viewport cinematic, tower)
  Beat 2  THE CITY     → GulfSection (aerial photo, coordinates, Gulf)
          ── Pattern Band divider ──
  Beat 3  THE TOWER    → Stats → Marquee → Architecture
          ── Pattern Band divider (light/gold variant) ──
  Beat 4  THE VIEW     → ViewSection (floor 55 view, warmth)
          ── Pattern Band divider ──
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

        {/* ── Al Hamra geometric band divider ──────────────────── */}
        <PatternBand />

        {/* ── Beat 3: The Tower ────────────────────────────────── */}
        <Stats />
        <Marquee />
        <Architecture />

        {/* ── Al Hamra geometric band divider ──────────────────── */}
        <PatternBand />

        {/* ── Beat 4: The View ─────────────────────────────────── */}
        <ViewSection />

        {/* ── Al Hamra geometric band divider ──────────────────── */}
        <PatternBand />

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
