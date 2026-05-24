// components/jobs/JobDeliverables.tsx
import { Check } from "lucide-react";

export function JobDeliverables({
  items,
  title = "What's included",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        {title}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-4"
          >
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
