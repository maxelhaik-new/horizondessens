import type { MetadataRoute } from "next";

import { contentUpdatedAt, indexedPages } from "@/lib/seo";
import { site } from "@/lib/site";

/** sitemap.xml : pages indexées et leurs images principales. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexedPages.map((page) => ({
    url: page.path === "/" ? site.url : `${site.url}${page.path}`,
    lastModified: contentUpdatedAt,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images?.map((src) => `${site.url}${src}`),
  }));
}
