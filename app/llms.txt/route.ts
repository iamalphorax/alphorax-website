import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blogs";
import { getContent } from "@/lib/cms";
import { ServicesConfig } from "@/types/services";

export async function GET() {
    try {
        const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";
        const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

        // Fetch services and blogs to make it dynamic
        const [blogs, servicesRawData] = await Promise.all([
            getAllBlogs(),
            getContent("services.md")
        ]);

        const services = (servicesRawData as ServicesConfig)?.services || [];

        const content = `# Alphorax

Delivering professional web and scalable mobile development, expert IT consulting, and advanced AI solutions that enable secure infrastructure, automation, modernize systems, and scale digital operations worldwide.

## Core Services

${services.map(s => `- **${s.title}**: ${s.description}`).join('\n')}

## Expertise Areas

- Artificial Intelligence & Machine Learning
- Custom Software & Web Development
- Enterprise IT Consulting & Strategy
- Digital Transformation & Cloud Infrastructure

## Latest Insights & Articles

${blogs.slice(0, 5).map(b => `- [${b.title}](${baseUrl}/blogs/${b.id}): ${b.description}`).join('\n')}

## Contact Details

- Website: ${baseUrl}
- Email: info@alphorax.com
- Main Services: ${baseUrl}/services
- Detailed Case Studies & News: ${baseUrl}/blogs
`;

        return new NextResponse(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    } catch (err) {
        console.error("Error generating llms.txt:", err);
        return new NextResponse(`Error generating llms.txt: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
    }
}
