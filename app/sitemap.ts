import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";
    const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

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

    // Fetch dynamic blogs from Cloudinary
    const blogs = await getAllBlogs();

    const blogRoutes: MetadataRoute.Sitemap = blogs.reduce((acc, post) => {
        const date = new Date(post.date);
        if (!isNaN(date.getTime())) {
            acc.push({
                url: `${baseUrl}/blogs/${post.id}`,
                lastModified: date,
                changeFrequency: "monthly",
                priority: post.featured ? 0.8 : 0.6,
            });
        }
        return acc;
    }, [] as MetadataRoute.Sitemap);

    return [...staticRoutes, ...blogRoutes];
}
