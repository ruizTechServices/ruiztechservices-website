import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { ServiceCards } from "@/components/marketing/ServiceCards";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { caseStudies } from "@/lib/content/caseStudies";
import { rescueSteps, site } from "@/lib/content/site";

export function MarketingHome() {
  return (
    <main className="marketing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            legalName: site.legalName,
            url: site.origin,
            email: site.email,
            founder: { "@type": "Person", name: "Luis Giovanni Ruiz" },
            areaServed: "New York City",
            sameAs: [
              "https://github.com/ruizTechServices",
              "https://www.luis-ruiz.com/",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="home-hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <MapPin size={15} aria-hidden="true" /> NYC roots. Practical
            solutions.
          </p>
          <h1>
            Your website should
            <br className="desktop-break" /> bring you <em>work.</em>
          </h1>
          <p className="hero-lede">
            One broken form, button, or mobile layout can stand between you and
            your next customer. Let’s get it working.
          </p>
          <div className="hero-actions">
            <Link href="/contact?service=tech-rescue" className="cta">
              Request a website fix
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="cta cta-outline">
              Explore my work
            </Link>
          </div>
          <p className="hero-note">
            Work directly with Gio. Scope agreed before you pay.
          </p>
        </div>
        <aside className="rescue-offer" aria-labelledby="rescue-title">
          <div className="offer-top">
            <span className="eyebrow">Website Tech Rescue</span>
            <span className="offer-index" aria-hidden="true">
              01 / FIX
            </span>
          </div>
          <h2 id="rescue-title">
            One blocker.
            <br />
            One clear fix.
          </h2>
          <p className="offer-price">
            $300<span>flat, for one accepted issue</span>
          </p>
          <ul>
            {[
              "Issue reviewed before acceptance",
              "Written scope and success criterion",
              "Tested fix and a clear handoff",
            ].map((item) => (
              <li key={item}>
                <Check size={17} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/tech-rescue-sprint" className="offer-link">
            See what’s included
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </aside>
      </section>
      <div className="intro-strip">
        <div className="wrap">
          <p>Founder-led, from first conversation to handoff.</p>
          <p>
            English & Español <span aria-hidden="true">/</span> New York City
          </p>
        </div>
      </div>
      <section className="section wrap" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How I can help</p>
            <h2>
              Useful work.
              <br />
              Clearly scoped.
            </h2>
          </div>
          <p>
            Website fixes, hands-on tech help, and focused builds. Start with
            the problem you need solved.
          </p>
        </div>
        <ServiceCards />
      </section>
      <section className="work-section">
        <div className="section wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                Don’t just read about it.
                <br />
                Try it.
              </h2>
            </div>
            <div>
              <p>
                Explore projects I own and develop, with real interfaces and
                code you can inspect.
              </p>
              <Link href="/projects" className="text-link">
                All projects & technical details
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="project-grid">
            {caseStudies.slice(0, 2).map((project) => (
              <CaseStudyCard key={project.id} caseStudy={project} compact />
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The Tech Rescue process</p>
            <h2>
              No guesswork
              <br />
              about what comes next.
            </h2>
          </div>
          <p>
            A small, specific engagement with an agreed result. The $300 offer
            starts with a review of your request.
          </p>
        </div>
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
      <section className="about-strip wrap">
        <div>
          <p className="eyebrow">The person behind the work</p>
          <h2>Hi, I’m Gio.</h2>
        </div>
        <div>
          <p>
            I’m a Bronx-born developer and the founder of ruizTechServices LLC.
            I build web projects and help people work through everyday tech
            problems. You speak directly with me, and I explain what I can do,
            what it will cost, and what needs a different specialist.
          </p>
          <Link href="/about_us" className="text-link">
            More about me
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="wrap section">
        <ClosingCta />
      </div>
    </main>
  );
}
