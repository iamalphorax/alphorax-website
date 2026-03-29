import React from "react";
import { getAllBlogs, getBlogCategories } from "@/lib/blogs";
import { generateOrganizationSchema, generateWebPageSchema, getJsonLdProps, generateBreadcrumbSchema } from "@/lib/schema";
import BlogList from "@/components/blogs/BlogList";
import NewsletterForm from "@/components/blogs/NewsletterForm";

const BlogsPage = async () => {
  const [blogsData, categories] = await Promise.all([
    getAllBlogs(),
    getBlogCategories()
  ]);

  // Generate schema markup
  const organizationSchema = generateOrganizationSchema();
  const pageSchema = generateWebPageSchema(
    "Blog - Insights & Expertise | Alphorax",
    "Explore the latest trends, technologies, and best practices in software development, AI, and IT consulting from Alphorax experts.",
    "/blogs"
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
  ]);

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script {...getJsonLdProps(organizationSchema)} />
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-12 pb-10 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                Our Blog
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Insights &{" "}
                <span className="text-accent relative inline-block">
                  Expertise
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 220 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,3 C55,1 165,6 220,3"
                      stroke="rgba(77, 159, 255, 0.5)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-silver mb-8">
                Explore the latest trends, technologies, and best practices in
                software development, AI, and IT consulting
              </p>
            </div>
          </div>
        </section>

        <BlogList initialBlogs={blogsData} initialCategories={categories} />

        {/* Newsletter Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Stay Updated with Our{" "}
                  <span className="text-accent">Newsletter</span>
                </h2>
                <p className="text-secondary-silver mb-8">
                  Subscribe to receive the latest insights, trends, and news in
                  technology, AI, and software development.
                </p>
                <NewsletterForm />
                <p className="text-xs text-secondary-silver/70 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogsPage;
