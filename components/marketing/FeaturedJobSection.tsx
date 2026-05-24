// components/marketing/FeaturedJobSection.tsx
// A highlighted banner for the featured job. Used on the catalog homepage to
// draw attention to the flagship offer above the full list.
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/lib/jobs/jobs";

export function FeaturedJobSection({ job }: { job: Job }) {
  return (
    <section className="my-12 rounded-lg border-2 border-blue-500 bg-white dark:bg-gray-900/40 p-8 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide">
            Featured
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {job.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{job.subheadline}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            <span>{job.priceLabel}</span>
            <span>{job.timelineLabel}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button asChild size="lg">
            <Link href={job.href} className="inline-flex items-center gap-1">
              {job.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
