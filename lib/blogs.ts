import { v2 as cloudinary } from 'cloudinary';
import matter from 'gray-matter';
import { Blog } from './blogs-data';
import dotenv from 'dotenv';

// Load environment variables for scripts
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getAllBlogs(): Promise<Blog[]> {
    try {
        // 1. List all raw resources
        // We fetch all to handle potential API version differences with folder filtering
        const { resources } = await cloudinary.api.resources({
            resource_type: "raw",
            type: "upload",
            max_results: 100,
        });

        const assetFolder = "alphorax/content/blogs";

        // 2. Filter resources that are in the blog asset folder
        const blogResources = resources.filter((r: any) =>
            r.asset_folder === assetFolder || r.public_id.startsWith(assetFolder + "/")
        );

        const blogs: Blog[] = [];

        // 3. Fetch content for each blog file
        await Promise.all(
            blogResources.map(async (resource: any) => {
                try {
                    const response = await fetch(resource.secure_url, {
                        next: { revalidate: 3600 },
                    });

                    if (!response.ok) return;

                    const text = await response.text();
                    const { data, content } = matter(text);

                    const id = resource.public_id.split('/').pop()?.replace('.md', '') || resource.public_id;

                    blogs.push({
                        id,
                        ...data,
                        content: content,
                    } as Blog);
                } catch (err) {
                    console.error(`Error fetching blog content for ${resource.public_id}:`, err);
                }
            })
        );

        return blogs.sort((a, b) => {
            const timeA = new Date(a.date).getTime();
            const timeB = new Date(b.date).getTime();
            return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
        });
    } catch (err) {
        console.error("Error fetching blogs from Cloudinary:", err);
        return [];
    }
}

export async function getBlogById(id: string): Promise<Blog | null> {
    try {
        // Try fetching all and finding by ID to be safe with different public ID structures
        const blogs = await getAllBlogs();
        return blogs.find(blog => blog.id === id) || null;
    } catch (err) {
        console.error(`Error getting blog by id ${id}:`, err);
        return null;
    }
}

export async function getBlogCategories() {
    const blogs = await getAllBlogs();
    const categoriesMap = new Map<string, Set<string>>();

    blogs.forEach(blog => {
        if (blog.category) {
            if (!categoriesMap.has(blog.category)) {
                categoriesMap.set(blog.category, new Set());
            }
            if (blog.subcategory) {
                categoriesMap.get(blog.category)?.add(blog.subcategory);
            }
        }
    });

    return Array.from(categoriesMap.entries()).map(([name, subcategories]) => ({
        name,
        subcategories: Array.from(subcategories)
    }));
}
