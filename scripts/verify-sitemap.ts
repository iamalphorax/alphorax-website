import { getAllBlogs } from '../lib/blogs';
import dotenv from 'dotenv';

dotenv.config();

async function verifySitemap() {
    console.log("Verifying Sitemap Logic...");
    try {
        const blogs = await getAllBlogs();
        console.log(`Successfully fetched ${blogs.length} blogs for the sitemap.`);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";
        const blogRoutes = blogs.map((post) => ({
            url: `${baseUrl}/blogs/${post.id}`,
            lastModified: post.date,
            priority: post.featured ? 0.8 : 0.6,
        }));

        console.log("Generated Blog Routes (Preview):", blogRoutes.slice(0, 3));

        if (blogs.length > 0) {
            console.log("✅ Sitemap logic is working with dynamic Cloudinary content.");
        } else {
            console.warn("⚠️ No blogs found. Ensure blogs are uploaded to Cloudinary.");
        }
    } catch (err) {
        console.error("❌ Sitemap verification failed:", err);
    }
}

verifySitemap();
