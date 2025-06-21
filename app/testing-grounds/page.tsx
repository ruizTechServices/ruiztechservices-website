
import { ChatbotPanel } from "@/components/main/ChatbotPanel";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Testing Grounds</h1>
        <Link
          href="/testing-grounds"
          className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-md transition-colors"
        >
          Testing Grounds
        </Link>
        <Link
          href="/"
          className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-md transition-colors"
        >
          Home
        </Link>
      </div>
      <div className="mx-auto container my-25">
        <ChatbotPanel />
      </div>
    </div>
  );
}
