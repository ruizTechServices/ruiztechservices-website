import Link from "next/link";
import { site } from "@/lib/content/site";
export function ContactInfo() {
  return (
    <aside className="contact-info">
      <p className="eyebrow">You’ll work directly with Gio</p>
      <h2>
        A clear next step.
        <br />
        No sales maze.
      </h2>
      <p>
        Website Tech Rescue is $300 for one accepted blocker. Local tech help
        and new builds are quoted separately after review.
      </p>
      <ol>
        <li>I review your request and ask for any missing context.</li>
        <li>We agree on what can be done, the price, and the timing.</li>
        <li>Work starts after acceptance and the agreed payment.</li>
      </ol>
      <div className="contact-details">
        <h3>Email</h3>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <h3>Based in New York City</h3>
        <p>
          Local visits by arrangement. Website work can be remote. English &
          Español.
        </p>
      </div>
      <Link href="/tech-rescue-sprint" className="text-link">
        Read the $300 Tech Rescue scope
      </Link>
    </aside>
  );
}
