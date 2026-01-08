// app/about_us/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'About RuizTechServices|',
  description:
    'Solo-run web & AI solutions—Next.js, ShadCN UI, Supabase, Pinecone, on-site support in NYC.',
};

export default function AboutUsPage() {
  return (
    <>
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {/* Hero */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Your One-Stop Tech Partner</CardTitle>
          <CardDescription>
            Web apps, AI pipelines, and hands-on support—direct from the founder.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* What We Do */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold">What Is ruizTechServices<span className='animate-blink'>|</span>?</h2>
        <p className="mt-4 text-gray-700">
          ruizTechServices| is a web and AI development company based in New York City. We specialize in custom web development, AI integrations, and on-site tech support.
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>Custom Next.js & React applications</li>
          <li>AI & chatbot integrations (OpenAI, Pinecone, Supabase)</li>
          <li>On-site tech support & IoT setups</li>
        </ul>
      </section>

      {/* Why Us */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold">Why ruizTechServices<span className='animate-blink'>|</span>?</h2>
        <ul className="mt-4 space-y-2">
          <li>Solo expert: direct access to the founder—no middleman.</li>
          <li>Rapid delivery: lean, efficient turn-around.</li>
          <li>Hands-on: from cloud infra to in-person installs.</li>
        </ul>
      </section>

      {/* Our Story */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold">Our Story</h2>
        <p className="mt-4 text-gray-700">
          Founded September 7, 2024 in NYC’s Bronx—built to deliver top-tier web and AI solutions with a personal touch.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get a Free Consultation
        </Link>
      </section>
    </main>
    </>
  );
}
