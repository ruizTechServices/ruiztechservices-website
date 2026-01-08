// components/sections/HowItWorks.tsx
import { howItWorks } from "@/lib/content/home";

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {howItWorks.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{howItWorks.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {howItWorks.steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
