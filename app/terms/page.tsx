// app/terms/page.tsx
import { termsOfService } from "@/lib/content/legal";

export const metadata = {
  title: `${termsOfService.title} | ruizTechServices`,
  description: termsOfService.description,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {termsOfService.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {termsOfService.lastUpdated}
          </p>
        </header>

        <div className="space-y-8">
          {termsOfService.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {section.heading}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
              {section.heading === "Contact" && (
                <a
                  href={`mailto:${termsOfService.contactEmail}`}
                  className="inline-block mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {termsOfService.contactEmail}
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
