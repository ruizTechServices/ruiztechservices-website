import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getJobBySlug } from "@/lib/jobs/jobs";
import { pageMetadata, rescueSteps } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Website Tech Rescue — $300",
  "One pre-qualified website blocker fixed for $300. Scope, safe access, testing, and rollback reviewed before acceptance and payment.",
  "/tech-rescue-sprint",
);
const job = getJobBySlug("tech-rescue-sprint")!;
const faqs = [
  [
    "What does $300 cover?",
    "One accepted website blocker with one written success criterion. The examples on this page are alternatives, not a bundle. If the request is larger, I’ll explain that before you pay.",
  ],
  [
    "When do I pay?",
    "After I reproduce the issue, verify safe access and rollback, and you approve the written scope and delivery window. The full $300 payment comes before work begins.",
  ],
  [
    "Is my website eligible?",
    "Send the website link and any platform or hosting details you know. Requests are reviewed for safe access, testing, and rollback before acceptance. Not every website or issue qualifies.",
  ],
  [
    "How quickly will it be done?",
    "We agree on the delivery window before payment. It depends on the issue, access, and availability. Sending a request does not book emergency or same-day service.",
  ],
  [
    "Will this guarantee more customers?",
    "No. The service fixes the agreed technical blocker. Traffic, leads, sales, and search rankings depend on factors beyond that single fix.",
  ],
  [
    "What if I need a new website?",
    "A new website or larger development project needs a separate scope and quote. Choose the website project option on the inquiry form.",
  ],
];
export default function TechRescuePage() {
  return (
    <main className="marketing-page wrap">
      <header className="page-intro rescue-intro">
        <p className="eyebrow">Website Tech Rescue / $300 flat</p>
        <h1>
          One website blocker.
          <br />
          <em>Fixed for $300.</em>
        </h1>
        <p>{job.subheadline}</p>
        <Link href={job.primaryCta.href} className="cta">
          {job.primaryCta.label}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <p className="field-hint">
          No payment or account required to request a review.
        </p>
      </header>
      <section className="section border-section">
        <div className="section-heading">
          <h2>
            Small fixes.
            <br />
            Meaningful problems.
          </h2>
          <p>
            These are examples of individual requests. Each is reviewed for
            scope and technical fit.
          </p>
        </div>
        <ul className="check-grid">
          {job.problemsSolved.map((item) => (
            <li key={item}>
              <Check size={20} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Here’s the agreement.</h2>
          <p>A specific change, a testable result, and a clear handoff.</p>
        </div>
        <div className="scope-grid">
          <div>
            <h3>Included with an accepted job</h3>
            <ul>
              {job.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Outside the $300 scope</h3>
            <ul>
              {job.exclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section border-section">
        <p className="eyebrow">From request to handoff</p>
        <ol className="process-grid">
          {rescueSteps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section faq-section">
        <h2>Before you request a fix.</h2>
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <section className="closing-cta">
        <div>
          <p className="eyebrow">Start with the problem</p>
          <h2>Show me what’s broken.</h2>
          <p>Send the link, the expected result, and what happens instead.</p>
        </div>
        <Link href={job.primaryCta.href} className="cta cta-light">
          Request a website fix
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <div className="section-spacer" />
    </main>
  );
}
