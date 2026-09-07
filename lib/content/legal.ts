// lib/content/legal.ts
// Legal page content constants for Privacy Policy and Terms of Service

export const privacyPolicy = {
  title: "Privacy Policy",
  description: "How ruizTechServices handles your data.",
  lastUpdated: "September 7, 2026",
  contactEmail: "service_team@ruiztechservices.com",
  sections: [
    {
      heading: "What We Collect",
      content: `When you use our contact form, we collect:
- Your name
- Your email address
- Your message and any service, website, location, platform, or timing details you choose to provide
- Basic request metadata (IP address, browser info) for security purposes

If you choose Google sign-in, Supabase processes your account identity and session information. Sign-in is optional for sending a service inquiry. Authentication uses session cookies. If you use an existing billing feature, Stripe processes payment information; do not enter card details in the contact form.`,
    },
    {
      heading: "Website Analytics & Providers",
      content: `The website includes Vercel Web Analytics to understand aggregate page use. This can include visited pages, referrers, device and browser information, and approximate location. Vercel describes this analytics service as using aggregate statistics without third-party tracking cookies. We exclude private account routes and strip query strings from analytics page URLs.

Vercel hosts the website. Supabase provides database and authentication services. Email requests use the email providers involved in sending and receiving your message. Opening an email link only prepares a message; you must send it from your email app.`,
    },
    {
      heading: "How We Use Your Information",
      content: `We use your information solely to:
- Respond to your inquiry
- Provide the services you request
- Send project-related communications

We do not use your data for marketing unless you explicitly opt in.`,
    },
    {
      heading: "What We Don't Do",
      content: `Let's be clear:
- We do NOT sell your data. Ever.
- We do NOT share your information with third parties for advertising.
- We do NOT spam you.`,
    },
    {
      heading: "Data Storage",
      content: `Your contact submissions are stored securely using Supabase (our database provider). We retain inquiry data for up to 2 years for business record purposes, after which it may be deleted.`,
    },
    {
      heading: "Your Rights",
      content: `You can request:
- Access to your data
- Deletion of your data
- Correction of any inaccurate information

Just email us and we'll handle it within 30 days.`,
    },
    {
      heading: "Contact",
      content: `Questions about this policy? Reach out:`,
    },
  ],
};

export const termsOfService = {
  title: "Terms of Service",
  description: "Terms and conditions for working with ruizTechServices.",
  lastUpdated: "September 7, 2026",
  contactEmail: "service_team@ruiztechservices.com",
  sections: [
    {
      heading: "Scope & Quotes",
      content: `All project work begins with a scoping conversation. Quoted prices reflect the scope discussed. If requirements change or expand during the project, pricing will be adjusted accordingly. No surprises—we communicate changes before they happen.`,
    },
    {
      heading: "Payment Terms",
      content: `- Website Tech Rescue covers one accepted website blocker for $300.
- Before payment, we reproduce the issue, verify safe access and rollback, and agree on written scope, a success criterion, and a delivery window.
- Full payment is due after acceptance and approval of the scope, before work begins.
- Local support and other development work are quoted separately. The written agreement sets their payment and cancellation terms.
- Sending an inquiry does not confirm a booking, commit you to a payment, or start a subscription.`,
    },
    {
      heading: "Scheduling & Rescheduling",
      content: `- On-site visits in NYC require 48-hour notice for rescheduling.
- Same-day cancellations may incur a fee.
- Emergency support requests are accommodated when possible but may carry rush pricing.`,
    },
    {
      heading: "Third-Party Services",
      content: `Many solutions involve third-party vendors (hosting, APIs, SaaS tools). We help you set these up, but:
- You are responsible for third-party service agreements and costs.
- We cannot guarantee uptime or policies of external providers.
- We'll advise on reliable options, but final vendor choices are yours.`,
    },
    {
      heading: "Intellectual Property",
      content: `- Code and assets we create for your project become yours upon final payment.
- We may retain the right to showcase work in our portfolio (anonymized if requested).
- Open-source components remain under their respective licenses.`,
    },
    {
      heading: "Limitation of Liability",
      content: `We stand behind our work, but:
- Our liability is limited to the amount paid for services.
- We are not liable for indirect, incidental, or consequential damages.
- We recommend maintaining your own backups and insurance.`,
    },
    {
      heading: "Termination",
      content: `Either party can terminate an engagement with 14 days written notice. You'll be billed for work completed up to termination. Retainers are non-refundable for the current billing period.`,
    },
    {
      heading: "Contact",
      content: `Questions about these terms? Reach out:`,
    },
  ],
};
