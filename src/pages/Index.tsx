import { Navbar }       from "@/components/layout/Navbar";
import { Footer }       from "@/components/layout/Footer";
import { Cursor }       from "@/components/layout/Cursor";
import { Hero }         from "@/components/home/Hero";
import { Stats }        from "@/components/home/Stats";
import { Marquee }      from "@/components/home/Marquee";
import { Architecture } from "@/components/home/Architecture";
import {
  Perspectives,
  FloorConfigs,
  LeasingBand,
  ContactStrip,
} from "@/components/home/Sections";

export default function Index() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Marquee />
        <Architecture />
        <Perspectives />
        <FloorConfigs />
        <LeasingBand />
        <ContactStrip />
      </main>
      <Footer />
    </>
  );
}
