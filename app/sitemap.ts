import type { MetadataRoute } from "next";
import { blogsData } from "@/lib/blogs-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://alphorax.com";

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
    ];

    // Blog posts from blogsData
    const blogRoutes: MetadataRoute.Sitemap = blogsData.map((post) => ({
        url: `${baseUrl}/blogs/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: post.featured ? 0.8 : 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
