// lib/content/home.ts
// Homepage content constants

export const heroContent = {
  headline: "Tech Advisory + On-Site NYC Support for Small Businesses",
  subheadline: "I diagnose, fix, and build. Month-to-month. No fluff.",
  primaryCTA: {
    text: "Book a Tech Clarity Call",
    href: "/contact",
  },
  secondaryCTA: {
    text: "See Pricing",
    href: "/pricing",
  },
};

export const serviceBuckets = [
  {
    title: "On-Site NYC Tech Support",
    description:
      "Hands-on help at your location. Hardware, networks, software—fixed in person. Manhattan, Brooklyn, Queens, Bronx.",
    icon: "MapPin",
    href: "/pricing#onsite",
  },
  {
    title: "Tech Advisory (Fractional CTO)",
    description:
      "Strategic guidance without the full-time hire. Architecture decisions, vendor selection, team scaling—on your terms.",
    icon: "Brain",
    href: "/pricing#advisory",
  },
  {
    title: "Build & Deploy",
    description:
      "Web apps, AI workflows, automations. I build it, you own it. From MVP to production-ready systems.",
    icon: "Rocket",
    href: "/pricing#build",
  },
];

export const howItWorks = {
  title: "How It Works",
  subtitle: "No long sales cycles. No fluff. Just results.",
  steps: [
    {
      number: "1",
      title: "Clarity Call",
      description:
        "30 minutes. We discuss what's broken, what you're building, or what's slowing you down. No pitch deck.",
    },
    {
      number: "2",
      title: "Plan & Scope",
      description:
        "I send you a clear scope with pricing. You know exactly what you're getting before we start.",
    },
    {
      number: "3",
      title: "Retainer or Project",
      description:
        "Choose ongoing advisory or a fixed project. Either way, work starts fast and stays transparent.",
    },
  ],
};

export const trustSignals = {
  headline: "What to expect",
  points: [
    {
      title: "Direct help",
      description: "You work with the person reviewing and fixing the issue.",
    },
    {
      title: "NYC-Based",
      description: "Local support for homes and small businesses in NYC.",
    },
    {
      title: "Plain explanations",
      description: "I explain what I found, what I fixed, and what still needs attention.",
    },
    {
      title: "Clear scope",
      description: "If the issue needs a specialist, replacement parts, or more time, I say so.",
    },
  ],
};
