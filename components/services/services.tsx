'use client'

import React from 'react';
import { CheckIcon, LightbulbIcon, TrendingUpIcon } from 'lucide-react';
import Link from "next/link";
import { ServicesConfig } from '@/types/services'
import { RenderIcon } from '@/components/shared/RenderIcon'
import Image from 'next/image';

const Services: React.FC<ServicesConfig> = ({ services }) => {
    return (
        <>
            {services.map((service, index) => (
                <section key={service?.id} id={service?.id} className="relative py-12 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className={`order-2 ${index % 2 == 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg"></div>
                                    <div className="relative overflow-hidden rounded-xl border border-accent/30">
                                        <div className="relative w-full h-[480px]">

                                            <Image src={service?.image} alt={service?.title} fill unoptimized quality={100} aria-label={service?.title} style={{ objectFit: 'cover' }} />
                                        </div>
                                        {/* <img src={service?.image} alt={service?.title} className="w-full h-[400px]" /> */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal/80 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <div className="flex items-center">
                                                <div className="p-3 bg-primary/30 rounded-lg mr-4">
                                                    <RenderIcon icon={service?.icon} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    {service?.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="overflow-hidden relative"
                                    aria-label="Service"
                                >
                                    <div className="inline-block p-3 py-1 mb-4 my-8 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                        Our Approach
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {service?.approach?.map((detail, index) => (
                                            <li key={index} className="flex items-center">
                                                <div className="p-1 bg-accent/10 rounded-full mr-2">
                                                    <CheckIcon size={14} className="text-accent" />
                                                </div>
                                                <span className="text-secondary-silver">{detail?.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={`order-1 ${index % 2 == 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                    {service?.type}
                                </div>
                                <h2 className="text-4xl font-bold mb-6">
                                    {service?.title.split(' ')[0]}{' '}
                                    <span className="text-accent relative inline-block">
                                        {service?.title?.split(' ')?.slice(1)?.join(' ')}
                                        <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0,3 C50,1 150,6 200,3" stroke="rgba(77, 159, 255, 0.5)" strokeWidth="2" fill="none" />
                                        </svg>
                                    </span>
                                </h2>
                                <p className="text-lg text-secondary-silver mb-8">
                                    {service?.description}
                                </p>
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <LightbulbIcon size={20} className="text-accent mr-2" />
                                        What We Offer
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {service?.details?.map((detail, index) => (
                                            <li key={index} className="flex items-center">
                                                <div className="p-1 bg-accent/10 rounded-full mr-2">
                                                    <CheckIcon size={14} className="text-accent" />
                                                </div>
                                                <span className="text-secondary-silver">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                                        <TrendingUpIcon size={20} className="text-accent mr-2" />
                                        Key Benefits
                                    </h3>
                                    <ul className="space-y-3">
                                        {service?.features?.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="p-1 bg-accent/10 rounded-full mr-2 mt-1">
                                                    <CheckIcon size={14} className="text-accent" />
                                                </div>
                                                <span className="text-secondary-silver">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link href={service?.link} className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group">
                                    <span>Learn more</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
};
export default Services;