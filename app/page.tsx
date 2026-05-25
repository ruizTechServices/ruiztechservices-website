import { getActiveJobs } from "@/lib/jobs/jobs";
import { MarketingHome } from "@/components/marketing/MarketingHome";

export default function Home() {
  const activeJobs = getActiveJobs();

  return <MarketingHome activeJobs={activeJobs} />;
}
