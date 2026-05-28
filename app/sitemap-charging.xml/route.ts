import { buildUrlSet, xmlResponse } from "@/lib/seo/sitemap";
import { chargingPages } from "@/content/charging";

const PRIORITY_BY_LEVEL = {
  critical: 0.9,
  high: 0.8,
  medium: 0.7,
} as const;

export function GET(): Response {
  const lastmod = new Date().toISOString();
  return xmlResponse(
    buildUrlSet(
      chargingPages.map((p) => ({
        path: `/${p.slug}`,
        priority: PRIORITY_BY_LEVEL[p.priority],
        changefreq: "weekly" as const,
        lastmod,
      })),
    ),
  );
}
