// components/sections/HeroSection.tsx
import Link from "next/link";
import { heroContent } from "@/lib/content/home";

export function HeroSection() {
  return (
    <section className="text-center py-12 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 max-w-3xl mx-auto">
        {heroContent.headline}
      </h1>

      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {heroContent.subheadline}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={heroContent.primaryCTA.href}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-lg"
        >
          {heroContent.primaryCTA.text}
        </Link>
        <Link
          href={heroContent.secondaryCTA.href}
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors text-lg"
        >
          {heroContent.secondaryCTA.text}
        </Link>
      </div>
    </section>
  );
}
