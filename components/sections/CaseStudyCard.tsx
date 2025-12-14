// components/sections/CaseStudyCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/lib/content/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {caseStudy.industry}
          </Badge>
        </div>
        <CardTitle className="text-lg">{caseStudy.clientType}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Problem
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {caseStudy.problem}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Solution
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {caseStudy.solution}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
            Outcome
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            {caseStudy.outcome}
          </p>
        </div>

        <div className="pt-2 border-t">
          <div className="flex flex-wrap gap-1">
            {caseStudy.services.map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
