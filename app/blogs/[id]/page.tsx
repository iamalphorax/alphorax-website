'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    CalendarIcon,
    UserIcon,
    ClockIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    Share2Icon,
    MessageSquareIcon,
    ThumbsUpIcon,
} from 'lucide-react';
import { blogsData, Blog } from '@/lib/blogs-data';

const BlogDetailPage = () => {
    const { id } = useParams();
    const blog = blogsData.find((b) => b.id === id);

    const handleShare = async () => {
        if (!blog) return;
        const shareData = {
            title: blog.title,
            text: blog.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

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

    const relatedPosts = blogsData
        .filter((b) => b.category === blog.category && b.id !== blog.id)
        .slice(0, 3);

    return (
        <main className="pt-24 pb-20">
            {/* Blog Hero */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 absolute bottom-12 left-0 right-0 z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-2 text-accent mb-4">
                            <span className="px-3 py-1 bg-accent/20 rounded-full text-xs font-medium uppercase tracking-wider">
                                {blog.category}
                            </span>
                            <ChevronRightIcon size={14} className="text-secondary-silver" />
                            <span className="text-xs font-medium text-secondary-silver">
                                {blog.subcategory}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-secondary-silver text-sm">
                            <div className="flex items-center">
                                <UserIcon size={16} className="mr-2 text-accent" />
                                {blog.author}
                            </div>
                            <div className="flex items-center">
                                <CalendarIcon size={16} className="mr-2 text-accent" />
                                {new Date(blog.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                            <div className="flex items-center">
                                <ClockIcon size={16} className="mr-2 text-accent" />
                                {blog.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="container mx-auto px-4 mt-12">
                <div className="max-w-4xl mx-auto">
                    {/* Main Content */}
                    <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-secondary-silver/10">
                        <div
                            className="prose prose-invert prose-accent max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content coming soon...</p>' }}
                        />

                        {/* Interaction Bar */}
                        <div className="mt-12 pt-8 border-t border-secondary-silver/10 flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center space-x-6">
                                <button className="flex items-center text-secondary-silver hover:text-accent transition-colors group">
                                    <ThumbsUpIcon size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                    <span>Helpful</span>
                                </button>
                                <button className="flex items-center text-secondary-silver hover:text-accent transition-colors group">
                                    <MessageSquareIcon size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                    <span>Comment</span>
                                </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-secondary-silver text-sm">Share:</span>
                                <button
                                    onClick={handleShare}
                                    className="p-2 bg-secondary-charcoal/50 rounded-full text-secondary-silver hover:text-accent hover:bg-accent/10 transition-all border border-secondary-silver/10"
                                    aria-label="Share article"
                                >
                                    <Share2Icon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blogs/${post.id}`}
                                        className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-accent/10 transition-all border border-secondary-silver/10 hover:border-accent/30"
                                    >
                                        <div className="h-40 overflow-hidden relative">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"
                                                aria-hidden="true"
                                            ></div>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold text-base group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-2">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center text-xs text-secondary-silver/70">
                                                <CalendarIcon size={12} className="mr-1" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-16 bg-gradient-to-br from-primary to-accent rounded-2xl p-8 md:p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h3 className="text-3xl font-bold mb-4 leading-tight">Need expert help with your project?</h3>
                            <p className="text-white/80 text-lg mb-8">
                                Our team of experts is ready to transform your ideas into reality with state-of-the-art technology.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogDetailPage;
