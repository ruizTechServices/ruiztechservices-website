
import Link from "next/link";

export function Hero() {
  return (
    <div className="max-w-4xl w-full text-center">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4 mx-2">
        ruizTech<span className="animate-gradient">Services</span><span className="animate-blink">|</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        🏙️ New York City&apos;s Best Tech Servicer
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Link 
          href="/contact" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Get Started
        </Link>
        <Link 
          href="/about_us" 
          className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors"
        >
          About Us
        </Link>
      </div>
    </div>
  );
}
