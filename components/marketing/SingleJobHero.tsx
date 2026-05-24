// components/marketing/SingleJobHero.tsx
// Homepage hero when exactly one service job is active: market it directly.
import Link from "next/link";
import { Check } from "lucide-react";
import type { Job } from "@/lib/jobs/jobs";

export function SingleJobHero({ job }: { job: Job }) {
  return (
    <section className="py-12 md:py-20">
      <div className="text-center">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-sm font-medium">
          Now booking · {job.shortTitle}
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link
            href={job.href}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg text-center"
          >
            See how it works
          </Link>
          <Link
            href={job.primaryCta.href}
            className="w-full sm:w-auto px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors text-lg text-center"
          >
            {job.primaryCta.label}
          </Link>
        </div>
      </div>

      {job.problemsSolved.length > 0 && (
        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto px-4">
          {job.problemsSolved.slice(0, 4).map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
