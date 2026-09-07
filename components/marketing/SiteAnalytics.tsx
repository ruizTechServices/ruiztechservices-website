"use client";
import { Analytics } from "@vercel/analytics/next";
const publicPaths = new Set([
  "/",
  "/services",
  "/tech-rescue-sprint",
  "/local-tech-help",
  "/projects",
  "/about_us",
  "/contact",
  "/privacy",
  "/terms",
]);
export function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);
        if (!publicPaths.has(url.pathname)) return null;
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
