import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${ROUTES.termos}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}${ROUTES.privacidade}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
