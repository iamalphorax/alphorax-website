"use client"

import React from 'react'
import {
    ArrowRightIcon,
    CheckIcon,
    LightbulbIcon,
    TrendingUpIcon,
} from 'lucide-react'
import { ServicesConfig } from '@/types/services'
import Link from 'next/link'
import ServiceCard from '@/components/shared/serviceCard'

/** Services Section Component */
const Services: React.FC<ServicesConfig> = ({ services }) => {
    return (
        <>
            <section
                id="services"
                className="relative pt-20 pb-10 md:pb-20 overflow-hidden bg-gradient-to-b from-black to-primary/10"
                aria-labelledby="services-heading"
            >
                {/* Top decorative elements */}
                <svg
                    className="absolute top-0 left-0 w-full opacity-40"
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M0,50 L200,50 L240,20 L280,80 L320,50 L1440,50"
                        stroke="rgba(77, 159, 255, 0.5)"
                        strokeWidth="1"
                    />
                    <circle cx="200" cy="50" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="320" cy="50" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="280" cy="80" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="240" cy="20" r="3" fill="rgba(77, 159, 255, 0.8)" />
                </svg>
                <div
                    className="absolute inset-0 bg-neural-pattern opacity-10"
                    aria-hidden="true"
                ></div>
                {/* Geometric accents */}
                <div
                    className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-[pulse_15s_infinite]"
                    aria-hidden="true"
                ></div>
                <div
                    className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-[pulse_10s_infinite_2s]"
                    aria-hidden="true"
                ></div>
                {/* Floating elements */}
                <div
                    className="absolute top-40 left-1/4 w-6 h-6 bg-accent/10 rounded-full animate-float"
                    aria-hidden="true"
                ></div>
                <div
                    className="absolute bottom-40 right-1/4 w-8 h-8 border border-accent/20 rounded-full animate-float-delay"
                    aria-hidden="true"
                ></div>
                {/* Services */}
                <div className="container mx-auto px-4 relative z-10">
                    {/* Our Services */}
                    <div className="flex flex-col relative">
                        <div className="text-center mb-4">
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                Our Services
                            </div>
                            <h2 id="services-heading" className="text-4xl font-bold mb-4">
                                Expert Solutions for{' '}
                                <span className="text-accent relative inline-block">
                                    Modern Businesses
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        height="6"
                                        viewBox="0 0 100 6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M0,3 C20,1 40,6 60,3 C80,0 100,5 100,3"
                                            stroke="rgba(77, 159, 255, 0.5)"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                    </svg>
                                </span>
                            </h2>
                            <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                                Transforming ideas into reality with cutting-edge technology and
                                strategic expertise
                            </p>
                        </div>
                        {/* Service Details Sections */}
                        {services?.map((service, index) => (
                            <section
                                key={service?.id}
                                id={service?.id}
                                className="relative py-8 overflow-hidden"
                                aria-labelledby={`${service?.id}-heading`}
                            >
                                <div className="absolute inset-0" aria-hidden="true">
                                    <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
                                </div>
                                <div className="container mx-auto px-4 relative z-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                        <div className={`order-2 lg:order-2}`}>
                                            <div className="grid grid-cols-1 gap-4">
                                                {service?.items?.map((serviceItem) => (
                                                    <ServiceCard key={serviceItem?.id} {...serviceItem} />
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            className={`order-1 ${index % 2 == 1 ? 'lg:order-2' : 'lg:order-1'}`}
                                        >
                                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                                {service?.type}
                                            </div>
                                            <h2
                                                id={`${service?.id}-heading`}
                                                className="text-4xl font-bold mb-6"
                                            >
                                                {service?.title.split(' ')[0]}{' '}
                                                <span className="text-accent relative inline-block">
                                                    {service?.title.split(' ').slice(1).join(' ')}
                                                    <svg
                                                        className="absolute -bottom-2 left-0 w-full"
                                                        height="6"
                                                        viewBox="0 0 200 6"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M0,3 C50,1 150,6 200,3"
                                                            stroke="rgba(77, 159, 255, 0.5)"
                                                            strokeWidth="2"
                                                            fill="none"
                                                        />
                                                    </svg>
                                                </span>
                                            </h2>
                                            <p className="text-lg text-secondary-silver mb-8">
                                                {service?.description}
                                            </p>
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold mb-4 flex items-center">
                                                    <LightbulbIcon
                                                        size={20}
                                                        className="text-accent mr-2"
                                                        aria-hidden="true"
                                                    />
                                                    What We Offer
                                                </h3>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {service?.details?.map((detail, index) => (
                                                        <li key={index} className="flex items-center">
                                                            <div className="p-1 bg-accent/10 rounded-full mr-2">
                                                                <CheckIcon
                                                                    size={14}
                                                                    className="text-accent"
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                            <span className="text-secondary-silver">
                                                                {detail}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold mb-4 flex items-center">
                                                    <TrendingUpIcon
                                                        size={20}
                                                        className="text-accent mr-2"
                                                        aria-hidden="true"
                                                    />
                                                    Key Benefits
                                                </h3>
                                                <ul className="space-y-3">
                                                    {service?.features?.map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <div className="p-1 bg-accent/10 rounded-full mr-2 mt-1">
                                                                <CheckIcon
                                                                    size={14}
                                                                    className="text-accent"
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                            <span className="text-secondary-silver">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/* CTA button */}
                                            <Link
                                                href={service?.link}
                                                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                                aria-label={`Learn more about ${service?.title}`}
                                            >
                                                <span className="mr-2">Learn More</span>
                                                <ArrowRightIcon
                                                    size={16}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
                {/* Bottom decorative elements */}
                <svg
                    className="absolute bottom-0 left-0 w-full opacity-20"
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M0,50 L200,50 L240,20 L280,80 L320,50 L1440,50"
                        stroke="rgba(77, 159, 255, 0.5)"
                        strokeWidth="1"
                    />
                    <circle cx="200" cy="50" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="320" cy="50" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="280" cy="80" r="3" fill="rgba(77, 159, 255, 0.8)" />
                    <circle cx="240" cy="20" r="3" fill="rgba(77, 159, 255, 0.8)" />
                </svg>
            </section >
        </>
    )
}
export default Services
