import { Navbar }              from "@/components/layout/Navbar";
import { Footer }              from "@/components/layout/Footer";
import { Hero }                from "@/components/home/Hero";
import { Stats }               from "@/components/home/Stats";
import { Marquee }             from "@/components/home/Marquee";
import { Architecture }        from "@/components/home/Architecture";
import { GulfSection }         from "@/components/home/GulfSection";
import { InvitationSection }   from "@/components/home/InvitationSection";
import { FounderQuote }        from "@/components/home/FounderQuote";
import { ExperienceCards }     from "@/components/home/ExperienceCards";
import { Perspectives, FloorConfigs, ContactStrip } from "@/components/home/Sections";

/*
  Homepage — 5 emotional beats with deliberate dark/light rhythm:
  ──────────────────────────────────────────────────────────────────────
  Beat 1  ARRIVAL      → Hero            [DARK video]
  Beat 2  THE CITY     → GulfSection     [DARK aerial]
  Beat 3  THE GESTURE  → FounderQuote    [LIGHT · SOM quote + tower render]
                         Stats           [DARK · 5 monumental count-up numbers]
                         ExperienceCards [DARK · 4 discovery paths — burjkhalifa.ae-style]
  Beat 4  THE TOWER    → Marquee         [DARK · 12 verified awards scrolling]
                         Architecture    [LIGHT · dual glass/stone + construction timeline]
  Beat 5  THE ADDRESS  → Perspectives    [LIGHT · the Light, Silence, Vantage]
                         FloorConfigs    [LIGHT]
                         InvitationSection [DARK · tenant invitation]
  ────── ContactStrip → Footer ──────────────────────────────────────────

  Note: Stats absorbed AwardsStrip in commit consolidating duplicated
  count-up sections. Stats now owns the entire "by the numbers" beat with
  5 monumental stats on a dark cinematic plate.
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

        {/* ── Beat 3: The Gesture ──────────────────────────────── */}
        <FounderQuote />
        <Stats />
        <ExperienceCards />

        {/* ── Beat 4: The Tower ────────────────────────────────── */}
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
