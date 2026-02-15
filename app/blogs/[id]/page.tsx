import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import MarkdownIt from "markdown-it";
import { getAllBlogs, getBlogById } from "@/lib/blogs";
import { generateOrganizationSchema, generateBlogPostingSchema, getJsonLdProps, generateBreadcrumbSchema } from "@/lib/schema";
import BlogDetailContent from "@/components/blogs/BlogDetailContent";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: "Post Not Found | Alphorax",
    };
  }

  const url = `${baseUrl}/blogs/${id}`;

  return {
    title: `${blog.title} | Alphorax Blog`,
    description: blog.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: url,
      type: "article",
      images: [{ url: blog.image }],
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
    keywords: [
      blog.category,
      blog.subcategory,
      ...(blog.keywords || []),
      "AI",
      "Technology",
      "Software Development",
      "Alphorax"
    ],
  };
}

const BlogDetailPage = async ({ params }: BlogPageProps) => {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-secondary-silver mb-8">
          The article you are looking for does not exist.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center text-accent hover:underline"
        >
          <ArrowLeftIcon size={18} className="mr-2" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  const allBlogs = await getAllBlogs();
  const relatedPosts = allBlogs
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  // Parse markdown content to HTML
  const contentHtml = md.render(blog.content || "");
  const blogWithHtml = { ...blog, content: contentHtml };

  // Generate schema markup
  const organizationSchema = generateOrganizationSchema();
  const blogSchema = generateBlogPostingSchema(
    blog.title,
    blog.description,
    blog.image,
    blog.author,
    blog.date
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: blog.title, url: `/blogs/${id}` },
  ]);

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script {...getJsonLdProps(organizationSchema)} />
      <script {...getJsonLdProps(blogSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <BlogDetailContent blog={blogWithHtml} relatedPosts={relatedPosts} />
    </>
  );
};

export default BlogDetailPage;
