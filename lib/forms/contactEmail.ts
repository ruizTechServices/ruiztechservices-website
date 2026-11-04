import { site } from "@/lib/content/site";
import { parseContactForm, type ContactInput } from "./contactSchema";

type ContactEmailInput = Pick<
  ContactInput,
  | "name"
  | "email"
  | "message"
  | "websiteUrl"
  | "location"
  | "platform"
  | "timing"
  | "source"
> & { service: string };

// Partial drafts remain available through the explicit email/copy alternatives.
// Submitting the form uses prepareContactEmail and the same validation as storage.
export function contactEmailDraft(input: ContactEmailInput) {
  const context = [
    `Name: ${input.name}`,
    `Reply to: ${input.email}`,
    `Service: ${input.service}`,
    input.websiteUrl && `Website: ${input.websiteUrl}`,
    input.location && `Location: ${input.location}`,
    input.platform && `Platform: ${input.platform}`,
    input.timing && `Timing: ${input.timing}`,
    input.source && `Inquiry context: ${input.source}`,
  ].filter(Boolean);
  const body = [...context, "", input.message].join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent("Website inquiry: " + input.service)}&body=${encodeURIComponent(body)}`;
  return { body, href };
}

export function prepareContactEmail(formData: FormData) {
  const parsed = parseContactForm(formData);
  if (!parsed.success) {
    return {
      success: false as const,
      error: parsed.error.issues[0]?.message || "Please check your request.",
    };
  }
  return { success: true as const, ...contactEmailDraft(parsed.data) };
}
