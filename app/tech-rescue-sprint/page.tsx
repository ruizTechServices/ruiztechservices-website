// app/tech-rescue-sprint/page.tsx
// Landing page for the "Local Business Tech Rescue Sprint" job.
// All copy comes from the centralized jobs config (lib/jobs/jobs.ts).
import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/jobs/jobs";
import { JobHero } from "@/components/jobs/JobHero";
import { JobProblems } from "@/components/jobs/JobProblems";
import { JobFit } from "@/components/jobs/JobFit";
import { JobDeliverables } from "@/components/jobs/JobDeliverables";
import { JobPricing } from "@/components/jobs/JobPricing";
import { JobExclusions } from "@/components/jobs/JobExclusions";

const job = getJobBySlug("tech-rescue-sprint");

export const metadata = {
  title: `${job?.title ?? "Tech Rescue Sprint"} | ruizTechServices`,
  description: job?.subheadline,
};

export default function TechRescueSprintPage() {
  if (!job) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero */}
        <JobHero job={job} />

        {/* Problem statement + what this fixes */}
        <JobProblems
          items={job.problemsSolved}
          title="What this fixes"
          intro="Most local businesses lose leads when their site, profile, forms, links, or payment flow quietly breaks. This sprint closes those gaps."
        />

        {/* Who this is for */}
        <JobFit items={job.idealFor} />

        {/* What is included */}
        <JobDeliverables items={job.deliverables} />

        {/* Price, deposit, and timeline */}
        <JobPricing
          priceLabel={job.priceLabel}
          depositLabel={job.depositLabel}
          timelineLabel={job.timelineLabel}
          cta={job.primaryCta}
        />

        {/* What is excluded */}
        <JobExclusions items={job.exclusions} />
      </div>
    </main>
  );
}
