import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { caseStudies } from "@/lib/content/caseStudies";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { pageMetadata } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Projects & code",
  "Explore Gio Ruiz’s developer tools, interactive soundboard, and AI application source. Real interfaces and specific engineering choices.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <main className="marketing-page wrap">
      <header className="page-intro">
        <p className="eyebrow">Selected work / open for inspection</p>
        <h1>
          See the work.
          <br />
          <em>Explore the thinking.</em>
        </h1>
        <p>
          Projects I own and develop. Each example connects a real problem to
          the implementation, with a demo or source walkthrough you can explore.
        </p>
      </header>
      <div className="project-grid project-detail-grid">
        {caseStudies.map((project) => (
          <CaseStudyCard key={project.id} caseStudy={project} />
        ))}
      </div>
      <div className="section">
        <ClosingCta />
      </div>
    </main>
  );
}
