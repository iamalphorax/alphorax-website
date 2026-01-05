import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import matter from "gray-matter";

// Configure Cloudinary securely
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    try {
        // Use Cloudinary API to locate your file dynamically
        const file = await cloudinary.api.resource("servicesHero.md", {
            resource_type: "raw",
        });
        // The secure_url is a signed Cloudinary CDN link (private or public)
        const response = await fetch(file.secure_url);
        const text = await response.text();
        // Parse your markdown frontmatter
        const { data } = matter(text);
        // Return the response
        return NextResponse.json(data);
    } catch (err) {
        console.error("Cloudinary fetch error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
