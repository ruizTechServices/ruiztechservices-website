import { ServiceCards } from "@/components/marketing/ServiceCards";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { pageMetadata } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Services & pricing",
  "Website Tech Rescue for $300, local computer and printer help in NYC, and scoped web development. Choose the service that fits your problem.",
  "/services",
);
export default function ServicesPage() {
  return (
    <main className="marketing-page wrap">
      <header className="page-intro">
        <p className="eyebrow">Services & pricing</p>
        <h1>
          Start with what
          <br />
          <em>needs to work.</em>
        </h1>
        <p>
          A clear problem, a realistic scope, and work you can understand.
          Choose the path that fits your situation.
        </p>
      </header>
      <ServiceCards />
      <section className="section prose-section">
        <h2>Clear expectations before work begins.</h2>
        <p>
          Tech Rescue is a fixed-price service for one pre-qualified website
          blocker. It is not a full site rebuild or an unlimited list of
          repairs. Local support and new development have their own written
          scope and quote.
        </p>
        <p>
          If the problem needs a specialist, replacement hardware, or work
          outside the agreed scope, I’ll explain that before you commit to
          additional work.
        </p>
      </section>
      <ClosingCta />
      <div className="section-spacer" />
    </main>
  );
}
