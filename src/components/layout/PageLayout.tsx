import { ReactNode } from "react";
import { Navbar }  from "./Navbar";
import { Footer }  from "./Footer";
import { PatternBand } from "@/components/shared/PatternBand";

interface Props { children: ReactNode; }

export function PageLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ paddingTop: 92 }}>{children}</main>
      <PatternBand />
      <Footer />
    </>
  );
}
