// lib/content/caseStudies.ts
// Case study data for the Projects page

export interface CaseStudy {
  id: string;
  clientType: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  services: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "retail-pos-migration",
    clientType: "Retail Store Owner",
    industry: "Retail",
    problem:
      "Legacy POS system crashing daily, losing sales data, and staff wasting 2+ hours on manual workarounds.",
    solution:
      "Migrated to cloud-based POS, set up automated backups, trained staff on-site, and configured inventory sync with their e-commerce platform.",
    outcome:
      "Zero downtime in 6 months. Staff time savings of 10+ hours/week. Sales data now syncs automatically.",
    services: ["On-Site Support", "System Migration", "Training"],
  },
  {
    id: "law-firm-ai-docs",
    clientType: "Small Law Firm",
    industry: "Legal",
    problem:
      "Paralegals spending 15+ hours weekly on document formatting and initial contract reviews.",
    solution:
      "Built custom AI workflow using GPT-4 for contract clause extraction and automated document templating with their existing tools.",
    outcome:
      "Document prep time reduced by 60%. Firm took on 3 additional clients without hiring.",
    services: ["AI Integration", "Workflow Automation", "Tech Advisory"],
  },
  {
    id: "agency-client-portal",
    clientType: "Creative Agency",
    industry: "Marketing",
    problem:
      "Client communication scattered across email, Slack, and Dropbox. Projects slipping through cracks.",
    solution:
      "Designed and built a custom Next.js client portal with project tracking, file sharing, and automated status updates.",
    outcome:
      "Client satisfaction scores up 40%. Project delivery time improved by 25%. One source of truth for all projects.",
    services: ["Web Application", "Build & Deploy", "Tech Advisory"],
  },
  {
    id: "restaurant-network",
    clientType: "Restaurant Group",
    industry: "Hospitality",
    problem:
      "WiFi dead zones, kitchen display systems dropping, and no visibility into network issues across 3 locations.",
    solution:
      "On-site network audit and redesign. Installed mesh WiFi, configured VLANs for POS isolation, set up remote monitoring.",
    outcome:
      "Network uptime 99.9%. Can now diagnose issues remotely before staff even notices. Scaled same setup to 2 new locations.",
    services: ["On-Site Support", "Network Setup", "Tech Advisory"],
  },
  {
    id: "startup-mvp",
    clientType: "Early-Stage Startup",
    industry: "SaaS",
    problem:
      "Founder had an idea and some wireframes but no technical co-founder. Needed MVP to validate with investors.",
    solution:
      "3-month engagement: architected the product, built MVP with Next.js + Supabase, deployed to production, set up analytics.",
    outcome:
      "MVP launched in 10 weeks. Secured $150K pre-seed. Founder now has codebase they own and can hand off to future team.",
    services: ["Build & Deploy", "Tech Advisory", "CTO-for-Hire"],
  },
];

export const projectsPageContent = {
  title: "Projects & Case Studies",
  subtitle:
    "Real problems solved for real businesses. Names anonymized, results verified.",
  cta: {
    text: "Have a similar challenge?",
    buttonText: "Let's Talk",
    href: "/contact",
  },
};
