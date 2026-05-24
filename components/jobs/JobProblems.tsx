// components/jobs/JobProblems.tsx
import { AlertTriangle } from "lucide-react";

export function JobProblems({
  items,
  title = "What this fixes",
  intro,
}: {
  items: string[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="py-12 md:py-16 bg-gray-200 dark:bg-gray-800/50 rounded-lg my-12">
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {intro && (
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
            {intro}
          </p>
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
