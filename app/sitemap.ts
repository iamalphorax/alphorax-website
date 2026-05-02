import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";
    const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

    // Helper to ensure we always have a valid Date object for Next.js to serialize
    const safeDate = (dateVal: any): Date => {
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? new Date() : d;
    };

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: safeDate(new Date()),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: safeDate(new Date()),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: safeDate(new Date()),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: safeDate(new Date()),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: safeDate(new Date()),
            changeFrequency: "weekly",
            priority: 0.6,
        },
    ];

    // Fetch dynamic blogs from Cloudinary
    const blogs = await getAllBlogs();

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
        url: `${baseUrl}/blogs/${post.id}`,
        lastModified: safeDate(post.date),
        changeFrequency: "monthly",
        priority: post.featured ? 0.8 : 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
}
