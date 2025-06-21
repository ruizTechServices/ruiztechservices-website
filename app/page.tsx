'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-400">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4 mx-2">
          ruizTech<span className="animate-gradient">Services</span><span className="animate-blink">|</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          🏙️ New York City's Best Tech Servicer
        </p>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Get Started
          </Link>
          {/* <Link 
            href="/testing-grounds" 
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors"
          >
            Testing Grounds
          </Link> */}
          <Link 
            href="/about_us" 
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors"
          >
            About Us
          </Link>
        </div>
        
        {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">IT Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive technical support for businesses of all sizes</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Network Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300">Custom network design and implementation services</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Cybersecurity</h3>
            <p className="text-gray-600 dark:text-gray-300">Protect your business with our advanced security protocols</p>
          </div>
        </div>
      </div>
    </div>
  );
}
