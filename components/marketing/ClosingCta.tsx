import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="closing-cta">
      <div>
        <p className="eyebrow">Let’s get it working</p>
        <h2>What’s getting in your way?</h2>
        <p>
          Tell me what you need. I’ll review the fit and explain the next step.
        </p>
      </div>
      <Link href="/contact" className="cta cta-light">
        Tell me about it
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
