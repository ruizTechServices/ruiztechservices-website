import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content/caseStudies";

export function CaseStudyCard({
  caseStudy,
  compact = false,
}: {
  caseStudy: CaseStudy;
  compact?: boolean;
}) {
  return (
    <article
      className={`project-card ${compact ? "project-compact" : ""}`}
      id={caseStudy.id}
    >
      {caseStudy.image && (
        <Link
          href={`/projects#${caseStudy.id}`}
          className="project-image"
          aria-label={`Explore ${caseStudy.title}`}
        >
          <Image
            src={caseStudy.image.src}
            alt={caseStudy.image.alt}
            width={caseStudy.image.width}
            height={caseStudy.image.height}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </Link>
      )}
      <div className="project-content">
        <p className="eyebrow">{caseStudy.category}</p>
        <h3>{caseStudy.title}</h3>
        <p className="project-summary">{caseStudy.summary}</p>
        {!compact && (
          <div className="project-story">
            <div>
              <h4>The problem</h4>
              <p>{caseStudy.problem}</p>
            </div>
            <div>
              <h4>My implementation</h4>
              <p>{caseStudy.implementation}</p>
            </div>
            <div>
              <h4>Try it / inspect it</h4>
              <p>{caseStudy.demonstration}</p>
            </div>
          </div>
        )}
        <ul className="tech-tags" aria-label="Technologies">
          {caseStudy.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-links">
          {compact ? (
            <Link href={`/projects#${caseStudy.id}`} className="text-link">
              Explore the project
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <>
              {caseStudy.demo && (
                <a
                  href={caseStudy.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Try the live project
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
              <a
                href={caseStudy.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View source
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </>
          )}
        </div>
        {!compact && (
          <a
            className="evidence-link"
            href={caseStudy.evidence.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {caseStudy.evidence.label}
          </a>
        )}
      </div>
    </article>
  );
}
