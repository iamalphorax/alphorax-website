import React from 'react';
import Link from "next/link";
import ServicesHero from '@/components/services/hero';
import Services from '@/components/services/services';
import ServicesFaq from '@/components/services/faq';
import ServicesIndustries from '@/components/services/industries';
import { Metadata } from 'next';

import { getContent } from '@/lib/cms';
import { ServicesConfig } from '@/types/services';
import { generateWebPageSchema, generateOrganizationSchema, getJsonLdProps } from '@/lib/schema';

export const metadata: Metadata = {
    title: "Our Services - AI Solutions, Project Development & IT Consulting | Alphorax",
    description: "Explore Alphorax's comprehensive services including AI Solutions, Project Development, and IT Consulting. Transform your business with cutting-edge technology.",
    openGraph: {
        title: "Our Services - AI Solutions, Project Development & IT Consulting | Alphorax",
        description: "Explore Alphorax's comprehensive services including AI Solutions, Project Development, and IT Consulting.",
        url: "/services",
        siteName: "Alphorax",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Services | Alphorax",
        description: "AI Solutions, Project Development, and IT Consulting services.",
        images: ["/twitter-card.png"],
    },
};

const ServicesPage = async () => {
    const [servicesRawData, servicesHeroData, servicesFaqData, industriesData] = await Promise.all([
        getContent("services.md"),
        getContent("servicesHero.md"),
        getContent("servicesFaq.md"),
        getContent("industries.md")
    ]);

    const servicesData = (servicesRawData as ServicesConfig)?.services;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heroData = (servicesHeroData as any)?.hero;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const faqData = (servicesFaqData as any)?.faq;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const industriesListData = (industriesData as any)?.industries;

    // Generate schema markup
    const organizationSchema = generateOrganizationSchema();
    const pageSchema = generateWebPageSchema(
        "Our Services - AI Solutions, Project Development & IT Consulting",
        "Explore Alphorax's comprehensive services including AI Solutions, Project Development, and IT Consulting. Transform your business with cutting-edge technology.",
        "/services"
    );

    return (
        <>
            {/* JSON-LD Schema Markup */}
            <script {...getJsonLdProps(organizationSchema)} />
            <script {...getJsonLdProps(pageSchema)} />

            <main>
                {/* Hero Section */}
                <ServicesHero services={servicesData} hero={heroData} />
                {/* Service Details Sections */}
                <Services services={servicesData} />
                {/* FAQ Section */}
                <ServicesFaq faq={faqData} />
                {/* Industries Section */}
                <ServicesIndustries industries={industriesListData} />
                {/* Call to Action */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl font-bold mb-6">
                                Ready to Transform Your Business with{' '}
                                <span className="text-accent">AI Solutions?</span>
                            </h2>
                            <p className="text-xl text-secondary-silver mb-8 max-w-2xl mx-auto">
                                Contact our team today to discuss how our services can help you
                                achieve your business goals
                            </p>
                            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group">
                                <span>Schedule a Consultation</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
};
export default ServicesPage;