"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  UserIcon,
  CodeIcon,
  BrainIcon,
  ServerCogIcon,
} from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { blogsData } from "@/lib/blogs-data";
import { generateOrganizationSchema, generateWebPageSchema, getJsonLdProps } from "@/lib/schema";

// Define all available categories and subcategories
const categories = [
  {
    name: "Project Development",
    subcategories: [
      "Web Development",
      "Mobile App Development",
      "Custom Software Development",
    ],
  },
  {
    name: "AI Solutions",
    subcategories: [
      "AI Model Development",
      "AI Integration",
      "AI Training & Fine-tuning",
    ],
  },
  {
    name: "IT Consulting",
    subcategories: [
      "IT Strategy & Roadmapping",
      "Infrastructure Optimization",
      "IT Support & Issue Resolution",
    ],
  },
];

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Get subcategories based on selected category
  const availableSubcategories =
    selectedCategory === "All"
      ? ["All"]
      : [
        "All",
        ...(categories.find((cat) => cat.name === selectedCategory)
          ?.subcategories || []),
      ];

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory("All");
  }, [selectedCategory]);

  // Filter blogs based on search term, category, and subcategory
  const filteredBlogs = blogsData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSubcategory =
      selectedSubcategory === "All" || blog.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSubcategory]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of blogs section
    document.getElementById("blogs-grid")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Project Development":
        return <CodeIcon size={16} className="text-accent" />;
      case "AI Solutions":
        return <BrainIcon size={16} className="text-accent" />;
      case "IT Consulting":
        return <ServerCogIcon size={16} className="text-accent" />;
      default:
        return null;
    }
  };

  // Generate schema markup
  const organizationSchema = generateOrganizationSchema();
  const pageSchema = generateWebPageSchema(
    "Blog - Insights & Expertise | Alphorax",
    "Explore the latest trends, technologies, and best practices in software development, AI, and IT consulting from Alphorax experts.",
    "/blogs"
  );

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script {...getJsonLdProps(organizationSchema)} />
      <script {...getJsonLdProps(pageSchema)} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-10 overflow-hidden">
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

        {/* Featured Posts */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogsData
                .filter((blog) => blog.featured)
                .slice(0, 3)
                .map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-accent/10 transition-all border border-secondary-silver/10 hover:border-accent/30"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-accent/90 text-white text-xs px-2 py-1 rounded-md">
                          Featured
                        </div>
                      </div>
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"
                        aria-hidden="true"
                      ></div>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-accent/80 mb-2">
                        {getCategoryIcon(blog.category)}
                        <span className="ml-2">{blog.subcategory}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-secondary-silver mb-4 line-clamp-2">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserIcon
                            size={14}
                            className="text-secondary-silver mr-1"
                          />
                          <span className="text-xs text-secondary-silver/70">
                            {blog.author}
                          </span>
                        </div>
                        <span className="text-xs text-secondary-silver/70">
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* All Blogs Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold mb-8">All Articles</h2>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-secondary-silver" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category & Subcategory Filters */}
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 w-full lg:w-auto">
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <FilterIcon size={18} className="text-accent" />
                  <span className="text-secondary-silver whitespace-nowrap">
                    Category:
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md py-1 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory !== "All" && (
                  <div className="flex items-center space-x-2 w-full md:w-auto">
                    <FilterIcon size={18} className="text-accent" />
                    <span className="text-secondary-silver whitespace-nowrap">
                      Subcategory:
                    </span>
                    <select
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md py-1 px-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                    >
                      {availableSubcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory === "All"
                            ? "All Subcategories"
                            : subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Blogs Grid */}
            <div
              id="blogs-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.id}`}
                    className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-accent/10 transition-all border border-secondary-silver/10 hover:border-accent/30"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"
                        aria-hidden="true"
                      ></div>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center text-accent/80">
                          {getCategoryIcon(blog.category)}
                          <span className="ml-2">{blog.subcategory}</span>
                        </div>
                        <span className="text-secondary-silver/70">
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-secondary-silver mb-4 line-clamp-2">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserIcon
                            size={14}
                            className="text-secondary-silver mr-1"
                          />
                          <span className="text-xs text-secondary-silver/70">
                            {blog.author}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon
                            size={14}
                            className="text-secondary-silver mr-1"
                          />
                          <span className="text-xs text-secondary-silver/70">
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 py-16 text-center">
                  <p className="text-xl text-secondary-silver">
                    No articles found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setSelectedSubcategory("All");
                    }}
                    className="mt-4 px-4 py-2 bg-accent/20 text-accent hover:bg-accent/30 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredBlogs.length > blogsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>

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
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
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
