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
    console.log(`[CMS] Fetching content for file: ${filename}`);

    // Verify Cloudinary is configured
    if (!cloudinary.config().cloud_name) {
      throw new Error("Cloudinary cloud_name is not configured");
    }

    // Use Cloudinary API to locate your file dynamically
    const file = await cloudinary.api.resource(filename, {
      resource_type: "raw",
    });

    console.log(`[CMS] Cloudinary resource found:`, {
      filename,
      secure_url: file?.secure_url?.slice(0, 80) + "...", // Log first 80 chars of URL
    });

    if (!file || !file.secure_url) {
      throw new Error(`File ${filename} not found in Cloudinary`);
    }

    // The secure_url is a signed Cloudinary CDN link
    const response = await fetch(file.secure_url, {
      next: { revalidate: 3600 }, // Cache the response from Cloudinary
    });

    console.log(
      `[CMS] Fetch response status: ${response.status} ${response.statusText}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${filename} content: ${response.status} ${response.statusText}`,
      );
    }

    const text = await response.text();
    console.log(`[CMS] Fetched content size: ${text.length} bytes`);

    // Parse your markdown frontmatter
    const { data } = matter(text);

    console.log(`[CMS] Parsed data for ${filename}:`, {
      keys: Object.keys(data),
      itemCount: Array.isArray(data.services) ? data.services.length : "N/A",
    });

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(
      `[CMS] Cloudinary fetch error for ${filename}:`,
      errorMessage,
    );
    return null; // Return null on error to handle gracefully in components
  }
}
