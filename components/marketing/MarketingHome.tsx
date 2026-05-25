import Link from "next/link";
import type { Job } from "@/lib/jobs/jobs";
import { JobCatalog } from "@/components/marketing/JobCatalog";
import { TrustSignals } from "@/components/sections/TrustSignals";

const problemItems = [
  "Computer problems",
  "Printer setup & troubleshooting",
  "Wi-Fi connection issues",
  "Software updates",
  "Email/account access",
  "Device setup",
  "Small business tech issues",
  "Basic troubleshooting",
];

const processSteps = [
  "Tell me what is not working.",
  "I review the issue and confirm whether it fits.",
  "We schedule the visit.",
  "I fix what I can and explain the next steps clearly.",
];

function CompanyHero() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
          Local tech help for homes and small businesses.
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
          ruizTechServices helps NYC residents and local businesses fix everyday
          tech problems: computers, printers, Wi-Fi, software updates, email
          issues, device setup, and basic troubleshooting.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Request Help
          </Link>
          <Link
            href="#services"
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 sm:w-auto"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProblemGrid() {
  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        Tech problems I can help with
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problemItems.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-gray-200 bg-white p-5 text-base font-medium text-gray-900 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function AudienceSplit() {
  return (
    <section className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2 md:py-14">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          For Homes
        </h2>
        <p className="mb-5 text-gray-600 dark:text-gray-300">
          Help with laptops, desktops, printers, Wi-Fi, email, updates, and
          device setup.
        </p>
        <Link
          href="/contact?audience=home"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Home Tech Help
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          For Small Businesses
        </h2>
        <p className="mb-5 text-gray-600 dark:text-gray-300">
          Help with office computers, printers, scanners, Wi-Fi, software setup,
          and tech interruptions that slow down staff or customers.
        </p>
        <Link
          href="/contact?audience=business"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Business Tech Help
        </Link>
      </div>
    </section>
  );
}

function HomepageProcess() {
  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <div
            key={step}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
              {index + 1}
            </div>
            <p className="text-gray-700 dark:text-gray-300">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-14 text-center md:py-20">
      <h2 className="mx-auto mb-6 max-w-3xl text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Need help with a computer, printer, Wi-Fi, or business tech issue?
      </h2>
      <div className="flex justify-center">
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          Request Help
        </Link>
      </div>
    </section>
  );
}

export function MarketingHome({ activeJobs }: { activeJobs: Job[] }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-4">
        <CompanyHero />
        <ProblemGrid />
        <AudienceSplit />
        <JobCatalog jobs={activeJobs} />
        <HomepageProcess />
        <TrustSignals />
        <FinalCta />
      </div>
    </main>
  );
}
