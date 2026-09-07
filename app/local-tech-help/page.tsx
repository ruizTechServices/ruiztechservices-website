import Link from "next/link";
import { ArrowRight, Monitor, Printer, Wifi, FolderOpen } from "lucide-react";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { pageMetadata } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Computer & printer help in NYC",
  "Local help with computer setup, printer connections, Wi-Fi, software updates, and file organization for NYC homes and small businesses. Request a quote from Gio.",
  "/local-tech-help",
);
const problems = [
  {
    icon: Monitor,
    title: "Computer & device setup",
    text: "Set up a device, review a software issue, or work through an operating-system update when the hardware supports it.",
  },
  {
    icon: Printer,
    title: "Printer connections",
    text: "Troubleshoot a printer that isn’t showing up, connection settings, or the path from your device to a test print.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi & everyday troubleshooting",
    text: "Work through connection problems and device settings. Provider outages and specialist network work may need a different path.",
  },
  {
    icon: FolderOpen,
    title: "Files & everyday maintenance",
    text: "Organize files around how you use them, explain backup options, and help make day-to-day computer use less frustrating.",
  },
];
export default function LocalTechHelpPage() {
  return (
    <main className="marketing-page wrap">
      <header className="page-intro">
        <p className="eyebrow">For NYC homes & small businesses</p>
        <h1>
          Technology should
          <br />
          <em>make your day easier.</em>
        </h1>
        <p>
          Computer trouble, a printer that won’t connect, or a device you need
          set up? Get practical help and a plain-English explanation.
        </p>
        <Link href="/contact?service=local-tech-help" className="cta">
          Request local tech help
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </header>
      <div className="local-grid">
        {problems.map(({ icon: Icon, ...problem }) => (
          <article className="service-card" key={problem.title}>
            <Icon className="service-icon" aria-hidden="true" />
            <h2>{problem.title}</h2>
            <p>{problem.text}</p>
          </article>
        ))}
      </div>
      <section className="section prose-section">
        <p className="eyebrow">Before a visit</p>
        <h2>
          Tell me the device, the issue,
          <br />
          and your neighborhood.
        </h2>
        <p>
          I review the issue and confirm whether I can help, where the work will
          happen, the price, and availability. A request does not reserve a
          visit.
        </p>
        <p>
          Keep a backup of important files. Don’t send passwords or private
          documents in the inquiry. Physical hardware repair, specialist data
          recovery, and work beyond basic troubleshooting need separate review.
        </p>
      </section>
      <ClosingCta />
      <div className="section-spacer" />
    </main>
  );
}
