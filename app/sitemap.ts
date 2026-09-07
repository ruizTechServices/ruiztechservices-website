import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services",
    "/tech-rescue-sprint",
    "/local-tech-help",
    "/projects",
    "/about_us",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: site.origin + (path === "/" ? "" : path),
    priority: path === "/" ? 1 : 0.7,
  }));
}
