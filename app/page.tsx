import { MarketingHome } from "@/components/marketing/MarketingHome";
import { pageMetadata } from "@/lib/content/site";

export const metadata = pageMetadata(
  "Website fixes & NYC tech help",
  "One pre-qualified website blocker fixed for $300. NYC computer and printer help, web development, and real projects by Gio Ruiz.",
  "/",
);
export default function Home() {
  return <MarketingHome />;
}
