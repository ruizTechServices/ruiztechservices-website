import Link from "next/link";
import { ArrowUpRight, Monitor, Wrench, Code2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Fix a website blocker",
    text: "A broken form, button, or mobile layout. One pre-qualified issue with a clear definition of done.",
    price: "$300 · one accepted fix",
    href: "/tech-rescue-sprint",
    cta: "Explore Tech Rescue",
  },
  {
    icon: Monitor,
    title: "Get local tech help",
    text: "Computer setup, printer connections, software updates, and everyday troubleshooting for NYC homes and small businesses.",
    price: "Quoted after review",
    href: "/local-tech-help",
    cta: "Find the help you need",
  },
  {
    icon: Code2,
    title: "Build something useful",
    text: "Need a website or web application? Show me the problem it should solve. We’ll define a focused first version and a separate quote.",
    price: "Scoped and quoted individually",
    href: "/contact?service=web-development",
    cta: "Discuss your project",
  },
];

export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map(({ icon: Icon, ...service }) => (
        <article className="service-card" key={service.title}>
          <Icon className="service-icon" size={26} aria-hidden="true" />
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <p className="service-price">{service.price}</p>
          <Link href={service.href} className="text-link">
            {service.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
