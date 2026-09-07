// lib/jobs/jobs.ts
// Centralized, static configuration for ruizTechServices' active paid service jobs.
//
// This file is the single source of truth for public service/job data:
//   - The homepage (app/page.tsx) uses active jobs for secondary service cards.
//   - The public navbar (components/main/navbar.tsx) builds its links from here.
//   - Each job landing page (e.g. app/tech-rescue-sprint/page.tsx) renders from here.
//
// To launch a new service, add a new entry to the `jobs` array with status
// "active". The navbar gains a link automatically and the homepage can show it
// as a secondary service card.

export type JobStatus = "active" | "draft" | "hidden" | "archived";

export interface JobCta {
  label: string;
  href: string;
}

export interface Job {
  /** Stable internal identifier. Never change once published. */
  id: string;
  /** URL-safe slug; matches the route folder under app/. */
  slug: string;
  /** Absolute path to the job's landing page. */
  href: string;
  status: JobStatus;
  /** When true, the job is eligible for featured placement outside the homepage. */
  featured: boolean;
  /** Short label used in the navigation bar. */
  navLabel: string;
  /** Full marketing title. */
  title: string;
  /** Compact title for cards and tight spaces. */
  shortTitle: string;
  /** Hero headline. */
  headline: string;
  /** Hero supporting line. */
  subheadline: string;
  /** Human-readable price, e.g. "$300 flat". */
  priceLabel: string;
  /** Human-readable deposit, e.g. "$150 deposit to start". */
  depositLabel: string;
  /** Human-readable timeline, e.g. "1-2 business days". */
  timelineLabel: string;
  /** Who the offer is a good fit for. */
  idealFor: string[];
  /** Concrete problems this job solves. */
  problemsSolved: string[];
  /** What the client receives. */
  deliverables: string[];
  /** Explicitly out of scope (sets expectations, protects margin). */
  exclusions: string[];
  primaryCta: JobCta;
}

export const jobs: Job[] = [
  {
    id: "tech-rescue-sprint",
    slug: "tech-rescue-sprint",
    href: "/tech-rescue-sprint",
    status: "active",
    featured: true,
    navLabel: "Tech Rescue",
    title: "Website Tech Rescue",
    shortTitle: "Tech Rescue",
    headline: "One website blocker. Fixed for $300.",
    subheadline:
      "A broken form, button, or mobile layout can keep a customer from reaching you. I review the issue and agree on a specific, testable fix before you pay.",
    priceLabel: "$300 flat",
    depositLabel: "Full payment after your request is accepted",
    timelineLabel: "Delivery window agreed before payment",
    idealFor: [
      "Business owners with one specific problem on an existing website",
      "A form, link, or mobile layout that gets in the way of a customer inquiry",
      "Owners who can provide authorized access to the website and its source",
    ],
    problemsSolved: [
      "One contact form that is not working as expected",
      "One broken call, email, or booking link",
      "One mobile layout issue that blocks a key action",
      "One reproducible website bug with an agreed success criterion",
    ],
    deliverables: [
      "Review of the reported issue and verification of safe access, testing, and rollback",
      "A written scope, success criterion, and delivery window before payment",
      "The agreed fix for one accepted website blocker",
      "Verification of the agreed result and a plain-English handoff explaining what changed",
    ],
    exclusions: [
      "Full rebuilds, redesigns, or a list of unrelated fixes",
      "Paid advertising, Google Business Profile work, or SEO campaigns",
      "Database schema, permissions, authentication, or payment-system changes",
      "Ongoing maintenance, emergency response, or guaranteed traffic and sales",
    ],
    primaryCta: {
      label: "Request a website fix",
      href: "/contact?service=tech-rescue",
    },
  },
];

/** All jobs currently advertised to the public. */
export function getActiveJobs(): Job[] {
  return jobs.filter((job) => job.status === "active");
}

/**
 * The preferred featured job for non-homepage placements.
 * Prefers an active + featured job; falls back to the first active job.
 */
export function getFeaturedJob(): Job | undefined {
  const active = getActiveJobs();
  return active.find((job) => job.featured) ?? active[0];
}

/** Look up a job by slug (used by landing pages). */
export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
