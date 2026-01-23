// components/sections/TrustSignals.tsx
import { trustSignals } from "@/lib/content/home";

export function TrustSignals() {
  return (
    <section className="py-12 md:py-16 bg-gray-200 dark:bg-gray-800/50 rounded-lg my-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {trustSignals.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-12 md:py-16">
        {trustSignals.points.map((point, index) => (
          <div key={index} className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {point.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
