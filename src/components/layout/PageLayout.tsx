import { ReactNode } from "react";
import { Navbar }  from "./Navbar";
import { Footer }  from "./Footer";

interface Props { children: ReactNode; }

export function PageLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 92 }}>{children}</main>
      <Footer />
    </>
  );
}
