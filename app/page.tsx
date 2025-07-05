import { Hero } from "@/components/main/hero";
import { Services } from "@/components/main/services";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-400">
      <div className="max-w-4xl w-full text-center">
        <Hero />
        <Services />
      </div>
    </div>
  );
}