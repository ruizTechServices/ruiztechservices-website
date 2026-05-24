// components/jobs/JobHero.tsx
import Link from "next/link";
import type { Job } from "@/lib/jobs/jobs";

export function JobHero({ job }: { job: Job }) {
  return (
    <section className="text-center py-12 md:py-20">
      <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-sm font-medium">
        {job.shortTitle}
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 max-w-3xl mx-auto px-4">
        {job.headline}
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">
        {job.subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
        <span>{job.priceLabel}</span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span>{job.depositLabel}</span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span>{job.timelineLabel}</span>
      </div>

      <div className="flex justify-center px-4">
        <Link
          href={job.primaryCta.href}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg text-center"
        >
          {job.primaryCta.label}
        </Link>
      </div>
    </section>
  );
}
