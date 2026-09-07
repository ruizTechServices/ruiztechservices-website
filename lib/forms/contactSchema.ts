import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).default("");
const contactFields = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  service: z.enum([
    "tech-rescue",
    "local-tech-help",
    "web-development",
    "general",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Please describe the problem in at least 20 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  websiteUrl: optionalText(500).refine((value) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return (
        ["http:", "https:"].includes(url.protocol) &&
        !!url.hostname &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "Please enter a complete http:// or https:// website link without login credentials."),
  location: optionalText(150),
  platform: optionalText(250),
  timing: optionalText(150),
  source: optionalText(150),
  companyWebsite: z
    .string()
    .max(0, "Please leave the extra field blank.")
    .default(""),
  privacy: z.literal("accepted", {
    errorMap: () => ({ message: "Please acknowledge the privacy notice." }),
  }),
});
export const contactSchema = contactFields.superRefine((input, context) => {
  if (input.service === "tech-rescue" && !input.websiteUrl)
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["websiteUrl"],
      message: "Please include the website link for your Tech Rescue request.",
    });
});
export type ContactInput = z.infer<typeof contactSchema>;

export function parseContactForm(formData: FormData) {
  return contactSchema.safeParse(
    Object.fromEntries(
      Object.keys(contactFields.shape).map((key) => [
        key,
        formData.get(key) ?? undefined,
      ]),
    ),
  );
}

export function formatContactMessage(input: ContactInput) {
  return [
    `Service: ${input.service}`,
    `Website: ${input.websiteUrl || "Not provided"}`,
    `Location: ${input.location || "Not provided"}`,
    `Platform / host / repository: ${input.platform || "Not sure / not provided"}`,
    `Preferred timing: ${input.timing || "Not provided"}`,
    `Inquiry context: ${input.source || "Direct"}`,
    "",
    "--- REQUEST ---",
    input.message,
  ].join("\n");
}
