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
    navLabel: "Tech Rescue Sprint",
    title: "Local Business Tech Rescue Sprint",
    shortTitle: "Tech Rescue Sprint",
    headline: "Get your online customer flow working in 1-2 business days.",
    subheadline:
      "A fixed-scope sprint for the parts of your online presence that turn visitors into customers: website and mobile basics, Google Business Profile, forms, booking links, payment links, broken buttons, and the contact flow from click to reply.",
    priceLabel: "$300 flat",
    depositLabel: "$150 deposit to start",
    timelineLabel: "1-2 business days after agreement/payment/access",
    idealFor: [
      "Local service businesses that need more first-cash-flow opportunities from their existing online presence",
      "Owners with a website or profile that is live but not reliably turning visitors into inquiries",
      "Businesses whose forms, booking links, payment links, or buttons may be losing leads",
      "Teams that need a quick cleanup before ads, referrals, or outreach",
    ],
    problemsSolved: [
      "Google Business Profile details, service links, photos, or contact options are incomplete or inconsistent",
      "Website pages are hard to use on mobile or unclear about what customers should do next",
      "Forms, booking links, payment links, and call/email buttons are missing, broken, or buried",
      "Customer contact flow leaks inquiries because confirmations, follow-up steps, or routing are unclear",
      "Online presence is scattered across pages, profiles, and links that do not match",
    ],
    deliverables: [
      "Audit of your website/mobile experience, Google Business Profile, key links, and contact paths",
      "Fixes to broken buttons, forms, booking links, payment links, and obvious mobile friction where access allows",
      "Basic Google Business Profile cleanup recommendations or updates when you provide access",
      "A clearer customer contact flow from discovery to inquiry, booking, or payment",
      "Plain-English summary of what was fixed, what changed, and the next steps that should wait",
    ],
    exclusions: [
      "Full website rebuilds, custom web app development, or new brand design",
      "Paid ad setup or SEO campaigns",
      "Complex payment processor, booking system, or CRM migrations",
      "Ongoing support or managed IT (available separately if needed)",
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
