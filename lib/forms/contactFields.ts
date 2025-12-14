// lib/forms/contactFields.ts
// Contact form field definitions and options

export interface SelectOption {
  value: string;
  label: string;
}

export const helpTypeOptions: SelectOption[] = [
  { value: "tech-advisory", label: "Tech Advisory / Fractional CTO" },
  { value: "onsite-support", label: "On-Site NYC Support" },
  { value: "web-app", label: "Web Application Build" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
];

export const supportTypeOptions: SelectOption[] = [
  { value: "async", label: "Async (Email/Slack)" },
  { value: "onsite-nyc", label: "On-Site NYC" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const urgencyOptions: SelectOption[] = [
  { value: "normal", label: "Normal (1-2 weeks)" },
  { value: "this-week", label: "This Week" },
  { value: "emergency", label: "Emergency (24-48 hrs)" },
];

export const budgetOptions: SelectOption[] = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 - $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-plus", label: "$15,000+" },
  { value: "retainer", label: "Monthly Retainer" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const successMessage = {
  title: "Message Sent!",
  description: "Thank you for reaching out.",
  nextSteps: [
    "I'll review your inquiry within 24 hours",
    "If it's a fit, I'll send a brief questionnaire or schedule a clarity call",
    "No response doesn't mean no—I'll follow up either way",
  ],
};

export const formLabels = {
  name: "Name",
  email: "Email",
  helpType: "What do you need help with?",
  supportType: "Preferred support type",
  urgency: "Urgency",
  budget: "Budget range (optional)",
  message: "Tell me more",
};
