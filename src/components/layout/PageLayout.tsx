import { ReactNode } from "react";
import { Navbar }  from "./Navbar";
import { Footer }  from "./Footer";
import { PatternBand } from "@/components/shared/PatternBand";
import { ClosingBand } from "@/components/shared/ClosingBand";

interface Props {
  children: ReactNode;
  /** Sitewide "Secure Your Position in Sharq" band above the footer.
   *  On by default; Inquiry & Contact opt out (it would point at itself). */
  closingBand?: boolean;
}

export function PageLayout({ children, closingBand = true }: Props) {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ paddingTop: 92 }}>{children}</main>
      {closingBand && <ClosingBand />}
      <PatternBand />
      <Footer />
    </>
  );
}
