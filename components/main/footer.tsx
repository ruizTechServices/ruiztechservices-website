import Link from "next/link";
import { Brand } from "@/components/main/Brand";
import { site } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/">
              <Brand />
            </Link>
            <p>
              Practical tech help. Thoughtful web development.
              <br />
              Based in New York City.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/tech-rescue-sprint">Website Tech Rescue</Link>
            <Link href="/local-tech-help">Local tech help</Link>
            <Link href="/projects">Projects & code</Link>
            <a href={`mailto:${site.email}`}>Email Gio</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
