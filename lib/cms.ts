import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";

// Configure Cloudinary securely
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function getContent(filename: string) {
  try {
    // Use Cloudinary API to locate your file dynamically
    const file = await cloudinary.api.resource(filename, {
      resource_type: "raw",
    });

    // The secure_url is a signed Cloudinary CDN link
    const response = await fetch(file.secure_url, {
      next: { revalidate: 3600 }, // Cache the response from Cloudinary
    });

    if (!response.ok) throw new Error(`Failed to fetch ${filename} content`);

    const text = await response.text();

    // Parse your markdown frontmatter
    const { data } = matter(text);

    return data;
  } catch (err) {
    console.error(`Cloudinary fetch error for ${filename}:`, err);
    return null; // Return null on error to handle gracefully in components
  }
}
