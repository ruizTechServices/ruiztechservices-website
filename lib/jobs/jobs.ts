// lib/jobs/jobs.ts
// Centralized, static configuration for ruizTechServices' active paid service jobs.
//
// This file is the single source of truth for the marketing layer:
//   - The homepage (app/page.tsx) derives its layout from the active jobs here.
//   - The public navbar (components/main/navbar.tsx) builds its links from here.
//   - Each job landing page (e.g. app/tech-rescue-sprint/page.tsx) renders from here.
//
// To launch a new service, add a new entry to the `jobs` array with status
// "active". The navbar gains a link automatically and, once more than one job is
// active, the homepage switches from a single-job pitch to a job catalog.

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
  /** When true, the job is eligible to headline the homepage / be featured. */
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
  /** Human-readable price, e.g. "$1,800 flat". */
  priceLabel: string;
  /** Human-readable deposit, e.g. "$600 deposit to start". */
  depositLabel: string;
  /** Human-readable timeline, e.g. "5 business days". */
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
    navLabel: "Tech Rescue Sprint",
    title: "Local Business Tech Rescue Sprint",
    shortTitle: "Tech Rescue Sprint",
    headline: "Your business tech is a mess. I fix it in one focused week.",
    subheadline:
      "A fixed-scope, fixed-price sprint that stabilizes the systems your local business runs on—email, devices, backups, accounts, and the glitches that keep costing you hours.",
    priceLabel: "$1,800 flat",
    depositLabel: "$600 deposit to start",
    timelineLabel: "5 business days",
    idealFor: [
      "NYC-area small businesses with 1–20 employees",
      "Owners who've been limping along on duct-tape tech setups",
      "Teams with no in-house IT and no time to manage vendors",
      "Anyone who just inherited or lost the 'person who handled the computers'",
    ],
    problemsSolved: [
      "Email, logins, and accounts scattered with no clear owner or recovery path",
      "No real backups—one dead laptop away from losing everything",
      "Recurring glitches, slow machines, and 'just restart it' workarounds",
      "Security gaps: shared passwords, no 2FA, ex-employees still with access",
      "Software and subscriptions nobody fully understands or controls",
    ],
    deliverables: [
      "Full audit of devices, accounts, email, and critical software",
      "Consolidated, documented account ownership with secure password management",
      "Automated backups configured and verified for your critical data",
      "2FA and baseline security hardening across key accounts",
      "Top recurring issues diagnosed and fixed during the sprint",
      "A plain-English 'state of your tech' report with prioritized next steps",
    ],
    exclusions: [
      "Custom software or web app development",
      "Ongoing managed IT or 24/7 support (available as a separate retainer)",
      "New hardware purchases (recommendations included; cost of equipment is separate)",
      "Large-scale data migrations beyond the sprint scope",
    ],
    primaryCta: {
      label: "Book the Rescue Sprint",
      href: "/contact?job=tech-rescue-sprint",
    },
  },
];

/** All jobs currently advertised to the public. */
export function getActiveJobs(): Job[] {
  return jobs.filter((job) => job.status === "active");
}

/**
 * The single job that should headline the homepage.
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
