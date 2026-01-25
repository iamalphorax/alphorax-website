"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    UsersIcon,
    BriefcaseIcon,
    AwardIcon,
    TrendingUpIcon,
    GlobeIcon,
    WifiIcon,
    CloudIcon,
    ServerIcon,
    LaptopIcon,
} from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
    const techStackRef = useRef<HTMLDivElement | null>(null);
    const techStackContainerRef = useRef<HTMLDivElement | null>(null);

    // ⚙️ Auto-scrolling tech stack marquee
    useEffect(() => {
        const scrollContainer = techStackRef.current;
        const container = techStackContainerRef.current;
        if (!scrollContainer || !container) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        const items = scrollContainer.querySelectorAll<HTMLDivElement>(
            ".tech-stack-item"
        );
        if (items.length === 0) return;

        // Clone items for seamless looping
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            scrollContainer.appendChild(clone);
        });

        const totalWidth = Array.from(scrollContainer.children).reduce(
            (width, child) => width + (child as HTMLElement).offsetWidth + 16,
            0
        );

        let animationId: number;
        let scrollPosition = 0;
        const scrollSpeed = 0.6; // Slightly slower for readability

        const scroll = () => {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= totalWidth / 2) {
                scrollPosition = 0;
            }
            scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        const pauseScroll = () => cancelAnimationFrame(animationId);
        const resumeScroll = () => {
            animationId = requestAnimationFrame(scroll);
        };

        container.addEventListener("mouseenter", pauseScroll);
        container.addEventListener("mouseleave", resumeScroll);

        return () => {
            cancelAnimationFrame(animationId);
            container.removeEventListener("mouseenter", pauseScroll);
            container.removeEventListener("mouseleave", resumeScroll);
        };
    }, []);

    const aiTechStack = [
        { name: 'OpenAI', src: 'https://cdn.simpleicons.org/openai/white' },
        { name: 'PyTorch', src: 'https://cdn.simpleicons.org/pytorch/ee4c2c' },
        { name: 'TensorFlow', src: 'https://cdn.simpleicons.org/tensorflow/ff6f00' },
        { name: 'Hugging Face', src: 'https://cdn.simpleicons.org/huggingface/ffcc66' },
        { name: 'NVIDIA', src: 'https://cdn.simpleicons.org/nvidia/76b900' },
        { name: 'LangChain', src: 'https://static.cdnlogo.com/logos/l/8/langchain_800.png' },
        { name: 'Anthropic', src: 'https://cdn.simpleicons.org/anthropic/white' },
    ];
    return (
        <main className="bg-primary text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-30"
                        role="img"
                        aria-label="AI technology background"
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                            About Alphorax
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Pioneering the{' '}
                            <span className="text-accent relative inline-block">
                                Future
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    height="6"
                                    viewBox="0 0 120 6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0,3 C30,0 90,7 120,3"
                                        stroke="rgba(77, 159, 255, 0.5)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                </svg>
                            </span>{' '}
                            of AI Technology
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-silver mb-8 max-w-2xl">
                            We&apos;re on a mission to make advanced AI solutions accessible to
                            businesses of all sizes, driving innovation and growth
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {[
                            {
                                number: '100%',
                                label: 'Commitment',
                                description:
                                    'Dedicated to delivering high-impact, tailored AI solutions.',
                            },
                            {
                                number: 'Agile',
                                label: 'Methodology',
                                description: 'Rapid prototyping and iterative development cycles.',
                            },
                            {
                                number: 'Next-Gen',
                                label: 'Technology',
                                description: 'Built on the most advanced AI frameworks available.',
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                                    {stat.label}
                                </div>
                                <p className="text-secondary-silver">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="relative py-20 overflow-hidden bg-secondary-charcoal">
                <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                Our Story
                            </div>
                            <h2 className="text-4xl font-bold mb-6">
                                From Startup to{' '}
                                <span className="text-accent relative inline-block">
                                    Industry Leader
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
                            <div className="space-y-6 text-lg text-secondary-silver">
                                <p>
                                    Founded in 2025, Alphorax began with a simple mission: to make
                                    advanced AI technology accessible to businesses of all sizes.
                                    What started as a small team of passionate AI researchers and
                                    software engineers is growing into a global leader in AI
                                    solutions.
                                </p>
                                <p>
                                    Our founders recognized early on that while artificial
                                    intelligence held tremendous potential to transform
                                    businesses, many organizations lacked the expertise and
                                    resources to implement these technologies effectively.
                                    Alphorax was established to bridge this gap.
                                </p>
                                <p>
                                    Over time, we&apos;ve expanded our services from basic machine
                                    learning implementations to comprehensive AI solutions that
                                    address complex business challenges across industries. Moving forward,
                                    we aim to lead the next wave of AI innovation, empowering
                                    organizations around the world to unlock the transformative power
                                    of artificial intelligence.
                                </p>
                            </div>
                            <div className="mt-8 flex space-x-6">
                                <div className="text-center">
                                    <div className="text-xl md:text-2xl font-bold text-accent">2025</div>
                                    <div className="text-sm text-secondary-silver">Founded</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl md:text-2xl font-bold text-accent">AI-First</div>
                                    <div className="text-sm text-secondary-silver">
                                        Infrastructure
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl md:text-2xl font-bold text-accent">Expert</div>
                                    <div className="text-sm text-secondary-silver">
                                        Led Strategy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 "></div>
                            <div className="relative rounded-xl overflow-hidden border border-accent/30">
                                <div className="aspect-video relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                                        alt="AI technology visualization"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6">
                                    <h3 className="text-2xl font-bold text-white">
                                        Our AI innovation lab
                                    </h3>
                                </div>
                            </div>
                            {/* Timeline dots */}
                            <div className="absolute top-1/4 right-8 w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50"></div>
                            <div className="absolute top-1/2 left-8 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50"></div>

                            {/* AI tech stack marquee */}
                            <div className="mt-8 pt-6 border-t border-accent/10">
                                <p className="text-secondary-silver text-sm mb-4 uppercase tracking-wider font-semibold">
                                    Our AI Technology Stack:
                                </p>
                                <div
                                    ref={techStackContainerRef}
                                    className="overflow-hidden relative"
                                >
                                    <div
                                        ref={techStackRef}
                                        className="flex space-x-6 py-2"
                                        style={{ willChange: 'transform' }}
                                    >
                                        {aiTechStack.map((tech, i) => (
                                            <div
                                                key={i}
                                                className="tech-stack-item flex items-center justify-center flex-shrink-0 w-24 h-12 group relative"
                                            >
                                                <Image
                                                    src={tech.src}
                                                    alt={`${tech.name} logo`}
                                                    fill
                                                    className="h-8 md:h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"
                        role="img"
                        aria-label="Mission and values background"
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                            Our Principles
                        </div>
                        <h2 className="text-4xl font-bold mb-4">
                            Mission &{' '}
                            <span className="text-accent relative inline-block">
                                Values
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    height="6"
                                    viewBox="0 0 100 6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0,3 C25,1 75,6 100,3"
                                        stroke="rgba(77, 159, 255, 0.5)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                            The core principles that guide our work and shape our company
                            culture
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-8 border border-secondary-silver/10 hover:border-accent/30 transition-all">
                            <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                <div className="p-2 bg-primary/30 rounded-lg mr-3">
                                    <TrendingUpIcon size={24} className="text-accent" />
                                </div>
                                Our Mission
                            </h3>
                            <p className="text-lg text-secondary-silver">
                                Our mission is to pioneer innovative solutions that shape the future of business and technology. Through relentless pursuit of excellence and cutting-edge thinking, we strive to empower businesses to leverage technology for growth, AI for efficiency, and long-term success. We believe in creating meaningful, sustainable impact through collaboration and forward-thinking solutions.
                            </p>
                        </div>
                        <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-8 border border-secondary-silver/10 hover:border-accent/30 transition-all">
                            <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                <div className="p-2 bg-primary/30 rounded-lg mr-3">
                                    <GlobeIcon size={24} className="text-accent" />
                                </div>
                                Our Vision
                            </h3>
                            <p className="text-lg text-secondary-silver">
                                Our vision is to be the global leader in technology innovation, revolutionizing industries by transforming ideas into action. We aim to create a future-ready world where technology works seamlessly to solve the world&apos;s most pressing challenges while delivering unparalleled value to businesses and communities worldwide.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <AwardIcon size={24} className="text-accent" />,
                                title: 'Excellence',
                                description:
                                    'We strive for excellence in everything we do, setting new standards and delivering unparalleled value.',
                            },
                            {
                                icon: <UsersIcon size={24} className="text-accent" />,
                                title: 'Collaboration',
                                description:
                                    'We transform bold ideas into actionable solutions through deep collaboration with clients and partners.',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                ),
                                title: 'Innovation',
                                description:
                                    'We are driven by cutting-edge thinking to shape the future of technology and business.',
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-6 h-6 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                                        />
                                    </svg>
                                ),
                                title: 'Integrity',
                                description:
                                    'We lead with transparency and honesty, building trust and creating lasting impact.',
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                            >
                                <div className="p-2 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-secondary-silver">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Digital Presence Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"
                        role="img"
                        aria-label="Global presence background"
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                Global Digital Presence
                            </div>
                            <h2 className="text-4xl font-bold mb-6">
                                Serving Clients{' '}
                                <span className="text-accent relative inline-block">
                                    Worldwide
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full"
                                        height="6"
                                        viewBox="0 0 160 6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M0,3 C40,0 120,7 160,3"
                                            stroke="rgba(77, 159, 255, 0.5)"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                    </svg>
                                </span>
                            </h2>
                            <p className="text-lg text-secondary-silver mb-8">
                                With a fully distributed team and cloud infrastructure, we
                                provide global expertise without geographical limitations. Our
                                international team brings diverse perspectives to solve complex
                                challenges for clients across continents.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {[
                                    {
                                        service: 'Cloud Operations',
                                        description: 'Secure, scalable infrastructure',
                                        icon: <CloudIcon size={20} className="text-accent" />,
                                    },
                                    {
                                        service: 'Global Connectivity',
                                        description: 'Always-on digital presence',
                                        icon: <WifiIcon size={20} className="text-accent" />,
                                    },
                                    {
                                        service: 'Virtual Collaboration',
                                        description: 'Seamless remote teamwork',
                                        icon: <LaptopIcon size={20} className="text-accent" />,
                                    },
                                    {
                                        service: 'Distributed Systems',
                                        description: 'Resilient global architecture',
                                        icon: <ServerIcon size={20} className="text-accent" />,
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="p-2 bg-primary/30 rounded-lg mr-3 mt-1">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {item.service}
                                            </h3>
                                            <p className="text-secondary-silver text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2 text-secondary-silver text-sm">
                                <BriefcaseIcon size={16} className="text-accent" />
                                <span>Now serving clients in over 30 countries worldwide</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg"></div>
                            <div className="relative rounded-xl overflow-hidden border border-accent/30 bg-secondary-charcoal/50">
                                {/* World map with highlighted locations */}
                                <div className="relative h-0"
                                    style={{
                                        paddingBottom: '56.25%',
                                    }}
                                >
                                    <Image
                                        src="/images/global-map.png"
                                        alt="World Map"
                                        fill
                                        className="absolute inset-0 object-cover opacity-50"
                                    />
                                    <div className="absolute inset-0">
                                        {/* Digital connection points */}
                                        <div className="absolute top-[30%] left-[20%]">
                                            <div className="relative">
                                                <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping"></div>
                                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[25%] left-[45%]">
                                            <div className="relative">
                                                <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping"></div>
                                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[40%] left-[75%]">
                                            <div className="relative">
                                                <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping"></div>
                                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[35%] left-[85%]">
                                            <div className="relative">
                                                <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping"></div>
                                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                                            </div>
                                        </div>
                                        {/* Digital connection lines */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <svg
                                                className="w-full h-full"
                                                viewBox="0 0 800 450"
                                                preserveAspectRatio="xMidYMid slice"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M160,135 C250,180 350,150 600,180"
                                                    stroke="rgba(77, 159, 255, 0.3)"
                                                    strokeWidth="2"
                                                    fill="none"
                                                >
                                                    <animate
                                                        attributeName="stroke-opacity"
                                                        values="0.3;0.8;0.3"
                                                        dur="4s"
                                                        repeatCount="indefinite"
                                                    />
                                                </path>
                                                <path
                                                    d="M360,112 C400,150 450,120 680,157"
                                                    stroke="rgba(77, 159, 255, 0.3)"
                                                    strokeWidth="2"
                                                    fill="none"
                                                >
                                                    <animate
                                                        attributeName="stroke-opacity"
                                                        values="0.3;0.7;0.3"
                                                        dur="5s"
                                                        repeatCount="indefinite"
                                                    />
                                                </path>
                                                <path
                                                    d="M160,135 C200,200 300,220 350,180"
                                                    stroke="rgba(77, 159, 255, 0.3)"
                                                    strokeWidth="2"
                                                    fill="none"
                                                >
                                                    <animate
                                                        attributeName="stroke-opacity"
                                                        values="0.3;0.6;0.3"
                                                        dur="6s"
                                                        repeatCount="indefinite"
                                                    />
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-accent/80 text-white px-3 py-1 text-sm rounded-md">
                                    Global digital network
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Work With{' '}
                                <span className="text-accent">Alphorax?</span>
                            </h2>
                            <p className="text-xl text-secondary-silver mb-8 max-w-2xl mx-auto">
                                Join the leading organizations that trust us with their AI
                                transformation
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 flex items-center group"
                                >
                                    <span>Contact Our Team</span>
                                    <svg
                                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    href="/services"
                                    className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all"
                                >
                                    Explore Our Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
};

export default AboutPage;
