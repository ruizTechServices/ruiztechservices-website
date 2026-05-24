// components/marketing/JobCatalog.tsx
// Homepage layout when multiple service jobs are active: a catalog of offers.
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/lib/jobs/jobs";

export function JobCatalog({ jobs }: { jobs: Job[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Fixed-scope tech services for local businesses
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Clear deliverables, clear prices, clear timelines. Pick the job that
          fits what you need solved.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Link key={job.id} href={job.href} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-blue-500 group-hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.shortTitle}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {job.subheadline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <span>{job.priceLabel}</span>
                  <span>{job.timelineLabel}</span>
                </div>
              </CardContent>
              <CardFooter>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                  View details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
