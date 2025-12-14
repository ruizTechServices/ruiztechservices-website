import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceBuckets } from "@/components/sections/ServiceBuckets";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustSignals } from "@/components/sections/TrustSignals";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <HeroSection />
        <ServiceBuckets />
        <HowItWorks />
        <TrustSignals />
      </div>
    </main>
  );
}