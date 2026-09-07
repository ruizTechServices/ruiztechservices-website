import Link from "next/link";
export default function NotFound() {
  return (
    <main className="marketing-page wrap">
      <div className="page-intro">
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          Let’s get you
          <br />
          to the right place.
        </h1>
        <p>
          That page isn’t here. Explore the services or tell me what you need
          help with.
        </p>
        <div className="hero-actions mt-6">
          <Link href="/services" className="cta">
            Explore services
          </Link>
          <Link href="/contact" className="cta cta-outline">
            Request help
          </Link>
        </div>
      </div>
    </main>
  );
}
