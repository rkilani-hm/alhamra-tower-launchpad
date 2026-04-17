import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero }   from "@/components/shared/PageHero";

const PEARL      = "#C8B99A";
const PEARL_TEXT = "#8B6E3E";
const DARK       = "#1D1D1B";
const CG         = "'Century Gothic','AppleGothic','Gill Sans MT','Gill Sans',Futura,'Trebuchet MS',sans-serif";

/* ── Terms of Use ─────────────────────────────────────────────────────
   Generic terms template for a marketing / property leasing website.
   Not legal advice — content should be reviewed by counsel before
   production use.
──────────────────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    n: "01",
    title: "Acceptance of terms",
    body: [
      "By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
    ],
  },
  {
    n: "02",
    title: "Use of the website",
    body: [
      "You are granted a limited, non-exclusive, non-transferable licence to access and use this website for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.",
      "You agree not to use the website in any way that could damage, disable, overburden, or impair it, or interfere with any other party's use of the website.",
    ],
  },
  {
    n: "03",
    title: "Intellectual property",
    body: [
      "All content on this website — including text, graphics, logos, images, photographs, architectural drawings and renderings, audio clips, video clips, data compilations, and software — is the property of Al Hamra Tower or its content suppliers, and is protected by copyright, trademark, and other intellectual property laws.",
      "The Al Hamra Tower name and logo, and all related names, logos, product and service names, designs, and slogans are trademarks of their respective owners. You must not use such marks without prior written permission.",
    ],
  },
  {
    n: "04",
    title: "Accuracy of information",
    body: [
      "While we strive to ensure that the information on this website is accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.",
      "Floor plans, specifications, dimensions, and availability are indicative only and subject to change without notice. Prospective tenants should verify all details directly with our leasing team before making any commercial decisions.",
    ],
  },
  {
    n: "05",
    title: "User submissions",
    body: [
      "Any information, feedback, inquiries, or materials you submit through our contact forms or other means will be treated as non-confidential and non-proprietary, subject to our Privacy Policy. You grant us a worldwide, royalty-free, irrevocable licence to use, reproduce, modify, and distribute any such submissions for the purpose of responding to your inquiry and operating our business.",
      "You represent and warrant that any content you submit is your own, does not infringe any third-party rights, and does not violate any applicable law.",
    ],
  },
  {
    n: "06",
    title: "Third-party links",
    body: [
      "This website may contain links to third-party websites that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such third-party services.",
    ],
  },
  {
    n: "07",
    title: "Disclaimer of warranties",
    body: [
      "This website is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
    ],
  },
  {
    n: "08",
    title: "Limitation of liability",
    body: [
      "In no event shall Al Hamra Tower, its affiliates, officers, directors, employees, or agents be liable to you for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of or inability to use this website, even if we have been advised of the possibility of such damages.",
    ],
  },
  {
    n: "09",
    title: "Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless Al Hamra Tower, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the website or your violation of these Terms of Use.",
    ],
  },
  {
    n: "10",
    title: "Governing law",
    body: [
      "These Terms of Use and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the State of Kuwait, without regard to its conflict of law principles. Any legal action or proceeding arising out of or relating to these terms shall be brought exclusively in the competent courts of Kuwait.",
    ],
  },
  {
    n: "11",
    title: "Changes to these terms",
    body: [
      "We reserve the right to modify or revise these Terms of Use at any time without prior notice. Your continued use of the website following the posting of any changes constitutes acceptance of those changes. We encourage you to review these terms periodically for any updates.",
    ],
  },
  {
    n: "12",
    title: "Severability",
    body: [
      "If any provision of these Terms of Use is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    n: "13",
    title: "Contact",
    body: [
      "If you have any questions about these Terms of Use, please contact us through the enquiry form on our website or at the address listed in our footer.",
    ],
  },
];

export default function Terms() {
  return (
    <PageLayout>
      <PageHero
        tag="Legal"
        title="Terms of Use"
        subtitle="The terms and conditions governing your use of this website and the information it contains."
        image="/assets/tower-foggy.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use", href: "/terms" }]}
      />

      {/* ── Effective date bar ──────────────────────────────────── */}
      <div style={{
        background: "#FAFAFA",
        borderBottom: "1px solid rgba(29,29,27,0.07)",
        padding: "24px clamp(28px,6vw,96px)",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{
            fontFamily: CG, fontSize: "10px",
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: PEARL_TEXT,
          }}>
            Effective Date &middot; January 2026
          </div>
          <div style={{
            fontFamily: CG, fontSize: "11px", color: "#6B6B6B", letterSpacing: "0.04em",
          }}>
            Please read these terms carefully before using this website.
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(64px,10vh,120px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "clamp(48px,7vh,80px)" }}
          >
            <p style={{
              fontFamily: CG, fontWeight: 300,
              fontSize: "clamp(15px,1.25vw,18px)",
              color: DARK, lineHeight: 1.75, margin: 0, maxWidth: 720,
            }}>
              Welcome to the Al Hamra Tower website. These Terms of Use
              ("Terms") govern your access to and use of this website and
              any content, functionality, and services offered on or
              through it. Please read these Terms carefully before you
              start to use our website.
            </p>
          </motion.div>

          {/* Numbered sections */}
          {SECTIONS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: "clamp(16px,3vw,48px)",
                padding: "clamp(28px,4vh,44px) 0",
                borderTop: "1px solid rgba(29,29,27,0.08)",
              }}
              className="legal-row"
            >
              {/* Number */}
              <div style={{
                fontFamily: CG, fontSize: "clamp(14px,1.2vw,16px)",
                fontWeight: 300, color: PEARL_TEXT,
                letterSpacing: "0.2em",
                paddingTop: 8,
              }}>
                {s.n}
              </div>

              {/* Content */}
              <div>
                <h2 style={{
                  fontFamily: CG, fontWeight: 300,
                  fontSize: "clamp(18px,1.8vw,26px)",
                  color: DARK, lineHeight: 1.25,
                  margin: "0 0 16px", letterSpacing: "-0.005em",
                }}>
                  {s.title}
                </h2>
                {s.body.map((paragraph, j) => (
                  <p key={j} style={{
                    fontFamily: CG, fontWeight: 300,
                    fontSize: "clamp(13px,1.05vw,15px)",
                    color: "#4a4a48", lineHeight: 1.9,
                    margin: j < s.body.length - 1 ? "0 0 16px" : 0,
                    maxWidth: 680,
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Closing rule */}
          <div style={{ borderTop: "1px solid rgba(29,29,27,0.08)", marginTop: 8 }} />
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .legal-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </PageLayout>
  );
}
