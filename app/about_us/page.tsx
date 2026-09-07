import Link from "next/link";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { pageMetadata } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Meet Gio Ruiz",
  "Meet Luis Giovanni Ruiz, the Bronx-born founder of ruizTechServices LLC. Direct, practical tech help and web development in New York City.",
  "/about_us",
);
export default function AboutPage() {
  return (
    <main className="marketing-page wrap">
      <header className="page-intro">
        <p className="eyebrow">Luis Giovanni Ruiz / Founder & developer</p>
        <h1>
          Call me Gio.
          <br />
          <em>Let’s make it work.</em>
        </h1>
        <p>
          I’m a Bronx-born developer and the founder of ruizTechServices LLC. I
          combine hands-on troubleshooting, web development, and
          customer-service experience to help people get useful work done.
        </p>
      </header>
      <div className="about-content">
        <section>
          <h2>A direct working relationship.</h2>
          <p>
            When you contact the business, you work with me. I review the
            problem, explain the options, agree on the scope, and do the work. I
            can help in English or Spanish.
          </p>
          <p>
            My recent local work has included an operating-system upgrade,
            reconnecting a printer, and organizing a customer’s files. My web
            projects include developer utilities, an interactive soundboard, and
            an AI chat application.
          </p>
          <Link href="/projects" className="text-link">
            Explore the projects and their code
          </Link>
        </section>
        <section>
          <h2>Clear about what I can do.</h2>
          <p>
            I focus on work that can be defined, tested, and handed off clearly.
            If a request needs a specialist or goes beyond my scope, I’ll say
            so. I use AI tools in development and take responsibility for
            reviewing and testing the work I deliver.
          </p>
          <p>
            ruizTechServices LLC was formed in New York on September 7, 2024.
            The business serves NYC residents and small businesses, with website
            work handled remotely where appropriate.
          </p>
        </section>
      </div>
      <div className="section">
        <ClosingCta />
      </div>
    </main>
  );
}
