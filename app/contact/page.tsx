import { isContactBackendAvailable } from "@/lib/forms/contactAvailability";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { pageMetadata, serviceOptions } from "@/lib/content/site";
export const metadata = pageMetadata(
  "Request tech help",
  "Tell Gio about a website blocker, computer or printer problem, or web project. No account or payment needed to send an inquiry.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, backendAvailable] = await Promise.all([
    searchParams,
    isContactBackendAvailable(),
  ]);
  const requested =
    typeof params.service === "string"
      ? params.service
      : params.job === "tech-rescue-sprint"
        ? "tech-rescue"
        : params.audience
          ? "local-tech-help"
          : "general";
  const initialService = serviceOptions.some(
    (option) => option.value === requested,
  )
    ? requested
    : "general";
  const source =
    typeof params.project === "string" ? params.project.slice(0, 150) : "";
  return (
    <main className="marketing-page wrap">
      <header className="page-intro">
        <p className="eyebrow">Start a conversation</p>
        <h1>
          Let’s solve
          <br />
          <em>the right problem.</em>
        </h1>
        <p>
          Describe what’s getting in your way. I’ll review whether I can help
          and confirm scope, pricing, and availability with you.
        </p>
      </header>
      <div className="contact-grid">
        <ContactInfo />
        <ContactForm
          initialService={initialService}
          source={source}
          backendAvailable={backendAvailable}
        />
      </div>
    </main>
  );
}
