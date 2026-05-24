import { getActiveJobs, getFeaturedJob } from "@/lib/jobs/jobs";
import { MarketingHome } from "@/components/marketing/MarketingHome";

export default function Home() {
  const activeJobs = getActiveJobs();
  const featuredJob = getFeaturedJob();

  return <MarketingHome activeJobs={activeJobs} featuredJob={featuredJob} />;
}
