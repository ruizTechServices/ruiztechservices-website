// components/jobs/JobFit.tsx
import { UserCheck } from "lucide-react";

export function JobFit({
  items,
  title = "Who this is for",
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
            <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
