'use client'

import { BarChartIcon, ShieldIcon, CloudIcon } from 'lucide-react';
import Link from "next/link";
import { IndustriesSection } from "@/types/industries";
const ServicesIndustries: React.FC<{ industries: IndustriesSection }> = ({ industries }) => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                        {industries?.badge}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        {industries?.title?.before}{' '}
                        <span className="text-accent relative inline-block">
                            {industries?.title?.highlighted}
                            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 160 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0,3 C40,0 120,7 160,3" stroke="rgba(77, 159, 255, 0.5)" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-lg text-secondary-silver max-w-2xl mx-auto">
                        {industries?.description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[{
                        icon: <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>,
                        title: 'Healthcare',
                        description: 'AI-powered diagnostic tools, patient data analytics, and healthcare operations optimization.',
                        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop'
                    }, {
                        icon: <BarChartIcon size={32} className="text-accent" />,
                        title: 'Finance',
                        description: 'Fraud detection systems, algorithmic trading platforms, and customer service automation.',
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
                    }, {
                        icon: <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>,
                        title: 'Manufacturing',
                        description: 'Predictive maintenance, quality control automation, and supply chain optimization.',
                        image: 'https://images.unsplash.com/photo-1581092921461-eab10d86d6e1?q=80&w=800&auto=format&fit=crop'
                    }, {
                        icon: <ShieldIcon size={32} className="text-accent" />,
                        title: 'Cybersecurity',
                        description: 'Threat detection systems, security analytics, and automated incident response.',
                        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop'
                    }, {
                        icon: <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>,
                        title: 'Retail',
                        description: 'Personalized recommendation engines, inventory management, and customer analytics.',
                        image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=800&auto=format&fit=crop'
                    }, {
                        icon: <CloudIcon size={32} className="text-accent" />,
                        title: 'Energy',
                        description: 'Grid optimization, consumption forecasting, and renewable energy management.',
                        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop'
                    }].map((industry, index) => <div key={index} className="group relative overflow-hidden rounded-xl">
                        <div className="absolute inset-0">
                            <img src={industry.image} alt={industry.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal via-secondary-charcoal/70 to-transparent"></div>
                        </div>
                        <div className="relative p-6 h-full flex flex-col justify-end min-h-[250px]">
                            <div className="p-3 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors backdrop-blur-sm">
                                {industry.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                                {industry.title}
                            </h3>
                            <p className="text-secondary-silver">
                                {industry.description}
                            </p>
                            <div className="mt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <Link href="/contact" className="inline-flex items-center text-accent text-sm font-medium">
                                    Learn more
                                    <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </section>
    )
}

export default ServicesIndustries 