import type { Metadata } from "next";

export const site = {
  name: "ruizTechServices|",
  legalName: "ruizTechServices LLC",
  origin: "https://www.ruiztechservices.com",
  email: "service_team@ruiztechservices.com",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}

export const serviceOptions = [
  { value: "tech-rescue", label: "Website Tech Rescue — $300" },
  {
    value: "local-tech-help",
    label: "Computer, printer, or device help in NYC",
  },
  { value: "web-development", label: "Website or web application project" },
  { value: "general", label: "Something else / not sure yet" },
] as const;

export const rescueSteps = [
  {
    title: "Show me the problem",
    description:
      "Send the page link and describe what should happen and what happens instead.",
  },
  {
    title: "Agree on the fix",
    description:
      "I reproduce the issue, verify access and rollback, and confirm the scope, success criterion, and timing.",
  },
  {
    title: "Approve, then pay",
    description:
      "Pay the $300 only after your request is accepted and you approve the written scope.",
  },
  {
    title: "Get the fix and handoff",
    description:
      "I make the agreed change, check the result, and explain what changed and how to maintain it.",
  },
];
