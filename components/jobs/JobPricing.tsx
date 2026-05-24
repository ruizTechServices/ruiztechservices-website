// components/jobs/JobPricing.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JobPricing({
  priceLabel,
  depositLabel,
  timelineLabel,
  cta,
}: {
  priceLabel: string;
  depositLabel: string;
  timelineLabel: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto rounded-lg border-2 border-blue-500 bg-white dark:bg-gray-900/40 p-8 text-center shadow-lg">
        <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          {priceLabel}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-left">
          <div className="rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              To get started
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {depositLabel}
            </div>
          </div>
          <div className="rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Timeline
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {timelineLabel}
            </div>
          </div>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
