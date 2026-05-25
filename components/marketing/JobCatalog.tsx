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

function shorten(text: string, maxLength = 160) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function JobCatalog({ jobs }: { jobs: Job[] }) {
  return (
    <section id="services" className="scroll-mt-20 py-10 md:py-14">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Available service visits
        </h2>
      </div>

      {jobs.length === 0 && (
        <p className="rounded-lg border border-gray-200 bg-white p-5 text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          Service pages are being updated. Contact ruizTechServices for help
          with computers, printers, Wi-Fi, software, or device setup.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link key={job.id} href={job.href} className="group">
            <Card className="h-full transition-colors hover:border-blue-500">
              <CardHeader>
                <CardTitle className="text-xl transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {job.shortTitle || job.title}
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  {shorten(job.subheadline)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <span>{job.priceLabel}</span>
                </div>
              </CardContent>
              <CardFooter>
                <span className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
                  Learn More
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
