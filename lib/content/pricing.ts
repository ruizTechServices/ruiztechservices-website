// lib/content/pricing.ts
// Pricing data constants for the pricing page

export const pricingDisclaimer =
  "Pricing reflects baseline scope. Complex environments, emergency support, or expanded execution may increase rates.";

export const pricingPrequalifier =
  "If price is your #1 priority, we may not be the right fit. If outcomes and reliability are your priority, let's talk.";

export const onsiteRates = {
  title: "On-Site NYC Support",
  description: "Hands-on technical support at your NYC location.",
  note: "Available for Manhattan, Brooklyn, Queens, Bronx. Travel outside NYC quoted separately.",
  tiers: [
    {
      name: "Single Visit",
      price: "$250",
      unit: "per visit",
      description: "2-hour minimum",
      features: [
        "Hardware troubleshooting",
        "Network diagnostics",
        "Software installation & setup",
        "Same-week scheduling",
      ],
    },
    {
      name: "Half Day",
      price: "$450",
      unit: "up to 4 hours",
      description: "Best for larger setups",
      features: [
        "Everything in Single Visit",
        "System migrations",
        "Multi-device setups",
        "Basic training included",
      ],
    },
    {
      name: "Full Day",
      price: "$800",
      unit: "up to 8 hours",
      description: "Major projects & installations",
      features: [
        "Everything in Half Day",
        "Office-wide deployments",
        "Infrastructure overhauls",
        "Priority scheduling",
      ],
    },
  ],
};

export const advisoryTiers = {
  title: "Tech Advisory (Fractional CTO)",
  description: "Ongoing strategic guidance and technical leadership for your business.",
  note: "Month-to-month. Cancel anytime with 14 days notice.",
  tiers: [
    {
      name: "Essentials",
      price: "$1,500",
      unit: "/month",
      description: "For businesses needing periodic guidance",
      features: [
        "4 hours of advisory time",
        "Async support (email/Slack)",
        "Monthly strategy call",
        "Vendor & tool recommendations",
        "Priority response (24-48 hrs)",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$3,000",
      unit: "/month",
      description: "For businesses building or scaling tech",
      features: [
        "10 hours of advisory time",
        "Async support (email/Slack)",
        "Weekly strategy calls",
        "Architecture reviews",
        "Hiring & contractor guidance",
        "1 on-site NYC visit included",
        "Same-day response",
      ],
      highlighted: true,
    },
    {
      name: "Scale",
      price: "$5,500",
      unit: "/month",
      description: "For businesses with complex tech needs",
      features: [
        "20 hours of advisory time",
        "Unlimited async support",
        "Bi-weekly strategy calls",
        "Full technical oversight",
        "Team training sessions",
        "2 on-site NYC visits included",
        "Direct phone/text access",
      ],
      highlighted: false,
    },
  ],
};

export const buildTiers = {
  title: "CTO-for-Hire (Build & Deploy)",
  description: "End-to-end project execution. I build it, you own it.",
  note: "3-month minimum engagement. Deposit required before work begins.",
  tiers: [
    {
      name: "Web Application",
      price: "From $8,000",
      unit: "3-month min",
      description: "Custom web apps, dashboards, portals",
      features: [
        "Next.js / React development",
        "Database design & setup",
        "Authentication & user management",
        "Deployment & hosting setup",
        "30 days post-launch support",
      ],
    },
    {
      name: "AI & Automation",
      price: "From $6,000",
      unit: "3-month min",
      description: "Chatbots, workflows, integrations",
      features: [
        "Custom AI/LLM integrations",
        "Workflow automation (Zapier, n8n, custom)",
        "API integrations",
        "Data pipeline setup",
        "Documentation & handoff",
      ],
    },
    {
      name: "Full-Stack Build",
      price: "From $15,000",
      unit: "3-month min",
      description: "Complete product development",
      features: [
        "Everything in Web Application",
        "Everything in AI & Automation",
        "Mobile-responsive design",
        "Analytics & monitoring",
        "60 days post-launch support",
        "Optional ongoing advisory",
      ],
    },
  ],
};

export const pricingCTA = {
  headline: "Ready to talk scope?",
  subtext: "Book a 30-minute clarity call. No pressure, no pitch deck—just figuring out if we're a fit.",
  buttonText: "Book a Clarity Call",
  buttonHref: "/contact",
};
