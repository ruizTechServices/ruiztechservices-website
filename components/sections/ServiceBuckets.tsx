// components/sections/ServiceBuckets.tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Brain, Rocket } from "lucide-react";
import { serviceBuckets } from "@/lib/content/home";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Brain,
  Rocket,
};

export function ServiceBuckets() {
  return (
    <section className="py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {serviceBuckets.map((bucket, index) => {
          const IconComponent = iconMap[bucket.icon];
          return (
            <Link key={index} href={bucket.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-blue-500 group-hover:scale-[1.02]">
                <CardHeader>
                  <div className="mb-3">
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {bucket.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {bucket.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
