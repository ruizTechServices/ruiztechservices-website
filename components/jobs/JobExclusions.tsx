// components/jobs/JobExclusions.tsx
import { X } from "lucide-react";

export function JobExclusions({
  items,
  title = "What's not included",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        {title}
      </h2>
      <ul className="space-y-3 max-w-3xl mx-auto">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <X className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 dark:text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
