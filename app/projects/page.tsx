// app/projects/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { caseStudies, projectsPageContent } from "@/lib/content/caseStudies";

export const metadata = {
  title: "Projects & Case Studies | ruizTechServices",
  description: "Real problems solved for real businesses. See how ruizTechServices helps companies with tech advisory, on-site support, and custom builds.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {projectsPageContent.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {projectsPageContent.subtitle}
          </p>
        </header>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* CTA Section */}
        <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {projectsPageContent.cta.text}
          </h2>
          <Button asChild size="lg">
            <Link href={projectsPageContent.cta.href}>
              {projectsPageContent.cta.buttonText}
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
