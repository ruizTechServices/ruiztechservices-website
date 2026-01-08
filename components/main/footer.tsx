import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto border-t">
      <div className="container flex flex-col items-center justify-center px-4 mx-auto md:flex-row md:justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {currentYear} ruizTechServices, LLC. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
          <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Privacy</a>
          <a href="/terms" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Terms</a>
          <a href="/contact" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}
