// app/pricing/page.tsx
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  pricingDisclaimer,
  pricingPrequalifier,
  onsiteRates,
  advisoryTiers,
  buildTiers,
  pricingCTA,
} from "@/lib/content/pricing";

export const metadata = {
  title: "Pricing | ruizTechServices",
  description: "Transparent pricing for Tech Advisory, NYC on-site support, and custom builds.",
};

function PricingCard({
  name,
  price,
  unit,
  description,
  features,
  highlighted = false,
}: {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`flex flex-col h-full ${
        highlighted
          ? "border-blue-500 border-2 shadow-lg relative"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">{unit}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PricingSection({
  title,
  description,
  note,
  tiers,
}: {
  title: string;
  description: string;
  note: string;
  tiers: Array<{
    name: string;
    price: string;
    unit: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }>;
}) {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{note}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <PricingCard key={index} {...tier} />
        ))}
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            {pricingDisclaimer}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-200 font-medium max-w-xl mx-auto border-l-4 border-blue-500 pl-4 text-left">
            {pricingPrequalifier}
          </p>
        </header>

        {/* On-Site NYC Support */}
        <PricingSection
          title={onsiteRates.title}
          description={onsiteRates.description}
          note={onsiteRates.note}
          tiers={onsiteRates.tiers}
        />

        {/* Tech Advisory */}
        <PricingSection
          title={advisoryTiers.title}
          description={advisoryTiers.description}
          note={advisoryTiers.note}
          tiers={advisoryTiers.tiers}
        />

        {/* Build & Deploy */}
        <PricingSection
          title={buildTiers.title}
          description={buildTiers.description}
          note={buildTiers.note}
          tiers={buildTiers.tiers}
        />

        {/* CTA */}
        <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {pricingCTA.headline}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            {pricingCTA.subtext}
          </p>
          <Button asChild size="lg">
            <Link href={pricingCTA.buttonHref}>{pricingCTA.buttonText}</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
