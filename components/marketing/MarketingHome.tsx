// components/marketing/MarketingHome.tsx
// Deterministic, config-driven homepage. Renders one of three layouts based on
// how many service jobs are active (see lib/jobs/jobs.ts):
//   - 1 active job   → focused single-job marketing (SingleJobHero)
//   - 2+ active jobs → featured banner + job catalog
//   - 0 active jobs  → generic ruizTechServices fallback
import Link from "next/link";
import type { Job } from "@/lib/jobs/jobs";
import { SingleJobHero } from "@/components/marketing/SingleJobHero";
import { JobCatalog } from "@/components/marketing/JobCatalog";
import { FeaturedJobSection } from "@/components/marketing/FeaturedJobSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustSignals } from "@/components/sections/TrustSignals";

function GenericFallback() {
  return (
    <section className="text-center py-16 md:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 max-w-3xl mx-auto px-4">
        Tech advisory and on-site support for local businesses
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">
        I diagnose, fix, and build the systems your business runs on. New
        service offers are coming soon—reach out and tell me what&apos;s slowing
        you down.
      </p>
      <div className="flex justify-center px-4">
        <Link
          href="/contact"
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg text-center"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}

export function MarketingHome({
  activeJobs,
  featuredJob,
}: {
  activeJobs: Job[];
  featuredJob?: Job;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {activeJobs.length === 0 && <GenericFallback />}

        {activeJobs.length === 1 && <SingleJobHero job={activeJobs[0]} />}

        {activeJobs.length > 1 && (
          <>
            {featuredJob && <FeaturedJobSection job={featuredJob} />}
            <JobCatalog jobs={activeJobs} />
          </>
        )}

        {/* Shared trust-building sections render whenever a job is active. */}
        {activeJobs.length > 0 && (
          <>
            <HowItWorks />
            <TrustSignals />
          </>
        )}
      </div>
    </main>
  );
}
