import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ZapIcon, BrainIcon, UsersIcon } from 'lucide-react';
import { CTAData } from '@/types/services';

const CTA = ({ data }: { data: CTAData }) => {
    const ctaContent = data?.cta;

    return (
        <section
            className="relative py-20 overflow-hidden"
            aria-labelledby="cta-heading"
        >
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="mb-8 md:mb-0 md:mr-12 flex-1">
                            <h2
                                id="cta-heading"
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                {ctaContent?.title?.before}{' '}
                                <span className="text-accent">{ctaContent?.title?.highlight}</span>
                            </h2>
                            <p className="text-secondary-silver mb-6">
                                {ctaContent?.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={ctaContent?.primaryCta?.link || "/contact"}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 flex items-center group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                    aria-label={ctaContent?.primaryCta?.text}
                                >
                                    <span>{ctaContent?.primaryCta?.text}</span>
                                    <ArrowRightIcon
                                        size={18}
                                        className="ml-2 group-hover:translate-x-1 transition-transform"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link
                                    href={ctaContent?.secondaryCta?.link || "/services"}
                                    className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                    aria-label={ctaContent?.secondaryCta?.text}
                                >
                                    {ctaContent?.secondaryCta?.text}
                                </Link>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="flex space-x-4" aria-hidden="true">
                                <div className="flex flex-col space-y-4">
                                    <div className="w-16 h-16 bg-primary/40 rounded-lg flex items-center justify-center">
                                        <ZapIcon size={32} className="text-accent" />
                                    </div>
                                    <div className="w-16 h-16 bg-primary/40 rounded-lg flex items-center justify-center">
                                        <BrainIcon size={32} className="text-accent" />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-8">
                                    <div className="w-16 h-16 bg-primary/40 rounded-lg flex items-center justify-center">
                                        <UsersIcon size={32} className="text-accent" />
                                    </div>
                                    <div className="w-16 h-16 bg-primary/40 rounded-lg flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-accent"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
