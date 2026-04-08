import { ReactNode } from "react";
import { Navbar }  from "./Navbar";
import { Footer }  from "./Footer";
import { Cursor }  from "./Cursor";

interface Props { children: ReactNode; }

export function PageLayout({ children }: Props) {
  return (
    <>
      <Cursor />
      <Navbar />
      <main style={{ paddingTop: 92 }}>{children}</main>
      <Footer />
    </>
  );
}
