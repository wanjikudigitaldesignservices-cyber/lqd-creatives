import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lqd-creatives.vercel.app";

  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const supabase = await createClient();

    // Fetch dynamic services, projects, and posts
    const [servicesRes, projectsRes, postsRes] = await Promise.all([
      supabase.from("lqd_services").select("slug, updated_at").eq("published", true),
      supabase.from("lqd_projects").select("slug, updated_at").eq("published", true),
      supabase.from("lqd_posts").select("slug, updated_at").eq("published", true),
    ]);

    const serviceRoutes = (servicesRes.data || []).map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const projectRoutes = (projectsRes.data || []).map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const postRoutes = (postsRes.data || []).map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
