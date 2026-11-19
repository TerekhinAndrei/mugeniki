import type { MetadataRoute } from "next";

const base = "https://mugeneki.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/wholesale", priority: 0.9 },
    { path: "/hospitality", priority: 0.9 },
    { path: "/crafts", priority: 0.8 },
    { path: "/crafts/arita-porcelain", priority: 0.8 },
    { path: "/crafts/yamanaka-lacquer", priority: 0.8 },
    { path: "/crafts/seki-blades", priority: 0.8 },
    { path: "/engraving", priority: 0.8 },
    { path: "/restoration", priority: 0.7 },
    { path: "/makers", priority: 0.7 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}