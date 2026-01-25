"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, SparklesIcon } from 'lucide-react'
import { HeroData } from '@/types/services'

const Hero = ({ data }: { data: HeroData }) => {
    const heroContent = data?.hero;

    const particlesRef = useRef<HTMLDivElement>(null);
    const graphicRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        // Safe-guard null refs
        const container = particlesRef.current;
        if (!container) return;

        const particles = Array.from(container.children) as HTMLElement[];

        const animateParticles = () => {
            const now = Date.now() * 0.001;
            for (const particle of particles) {
                const speed = parseFloat(particle.dataset.speed || "1");
                const x = parseFloat(particle.dataset.x || "0");
                const y = parseFloat(particle.dataset.y || "0");
                particle.style.transform = `translate(${Math.sin(now * speed) * 20 + x
                    }px, ${Math.cos(now * speed) * 20 + y}px)`;
            }
            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        // Animate tech graphic nodes
        const graphic = graphicRef.current;
        if (graphic) {
            const nodes = graphic.querySelectorAll<HTMLElement>(".node");
            const connections = graphic.querySelectorAll<HTMLElement>(".connection");

            nodes.forEach((node, index) => {
                const delay = index * 0.2;
                const duration = 2 + Math.random() * 2;
                node.style.animation = `pulse ${duration}s infinite ${delay}s`;
            });

            connections.forEach((connection, index) => {
                const delay = index * 0.1;
                connection.style.animation = `glow 3s infinite ${delay}s`;
            });
        }
    }, []);
    return (
        <section
            id="home"
            className="relative min-h-[90vh] flex items-center overflow-hidden"
            aria-labelledby="hero-heading"
        >
            {/* Background elements */}
            <div
                className="absolute inset-0 bg-neural-pattern opacity-30"
                aria-hidden="true"
            ></div>
            <div
                className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent"
                aria-hidden="true"
            ></div>
            {/* Animated particles */}
            <div
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            background: `rgba(77, 159, 255, ${Math.random() * 0.5 + 0.2})`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(77, 159, 255, 0.6)`,
                        }}
                        data-speed={Math.random() * 0.5 + 0.5}
                        data-x={Math.random() * 100 - 50}
                        data-y={Math.random() * 100 - 50}
                    ></div>
                ))}
            </div>
            {/* Geometric shapes with animations */}
            <div
                className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"
                aria-hidden="true"
            ></div>
            <div
                className="absolute bottom-10 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-[pulse_8s_infinite]"
                aria-hidden="true"
            ></div>
            {/* Glowing dots */}
            <div
                className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50 animate-[ping_4s_infinite]"
                aria-hidden="true"
            ></div>
            <div
                className="absolute top-2/3 left-1/2 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50 animate-[ping_5s_infinite_1s]"
                aria-hidden="true"
            ></div>
            <div
                className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50 animate-[ping_6s_infinite_2s]"
                aria-hidden="true"
            ></div>
            <div
                className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50 animate-[ping_4.5s_infinite_0.5s]"
                aria-hidden="true"
            ></div>
            {/* Grid lines with animation */}
            <div
                className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-70"
                aria-hidden="true"
            >
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="h-full w-px bg-accent/5"
                        style={{
                            animation: `pulse 10s infinite ${i * 0.5}s`,
                        }}
                    ></div>
                ))}
            </div>
            <div
                className="absolute inset-0 grid grid-rows-6 pointer-events-none opacity-70"
                aria-hidden="true"
            >
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full h-px bg-accent/5"
                        style={{
                            animation: `pulse 10s infinite ${i * 0.5}s`,
                        }}
                    ></div>
                ))}
            </div>
            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="max-w-3xl md:w-1/2 md:pr-8 mb-12 md:mb-4">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                            <div className="flex items-center">
                                <SparklesIcon size={16} className="mr-2" aria-hidden="true" />
                                <span>{heroContent?.badge || "AI-Powered Solutions"}</span>
                            </div>
                        </div>
                        <h1
                            id="hero-heading"
                            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        >
                            {heroContent?.title?.before}{' '}
                            <span className="text-accent relative">
                                {heroContent?.title?.highlight}
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0,5 Q75,9 150,5 T300,5"
                                        fill="none"
                                        stroke="rgba(77, 159, 255, 0.5)"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </span>{' '}
                            {heroContent?.title?.after || "Solutions"}
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-silver mb-8 max-w-2xl">
                            {heroContent?.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 flex items-center group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                aria-label={heroContent?.cta?.primary?.text}
                            >
                                <span>{heroContent?.cta?.primary?.text || "Get Started"}</span>
                                <ChevronRightIcon
                                    size={18}
                                    className="ml-2 group-hover:translate-x-1 transition-transform"
                                    aria-hidden="true"
                                />
                            </button>
                            <button
                                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                aria-label={heroContent?.cta?.secondary?.text}
                            >
                                {heroContent?.cta?.secondary?.text || "Learn More"}
                            </button>
                        </div>
                        {/* Tech icons */}
                        <div className="mt-16 flex hidden items-center space-x-8 opacity-70">
                            <p className="text-sm text-secondary-silver">Our Product:</p>
                            <div className="flex items-center space-x-6">
                                {[
                                    'https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg',
                                    'https://cdn.worldvectorlogo.com/logos/python-5.svg',
                                    'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
                                ].map((src, i) => (
                                    <Image
                                        key={i}
                                        src={src}
                                        alt={`${i === 0 ? 'TensorFlow' : i === 1 ? 'Python' : 'AWS'} logo`}
                                        width={32}
                                        height={32}
                                        className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Animated Tech Graphic */}
                    <div className="md:w-1/2 hidden md:block">
                        <div className="relative w-full h-[500px]">
                            <div
                                ref={graphicRef}
                                className="absolute inset-0 w-full h-full"
                                aria-hidden="true"
                            >
                                {/* Three-Service Neural Network Visualization */}
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 500 500"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="opacity-90"
                                >
                                    {/* Service Areas Background */}
                                    <g className="service-areas hidden">
                                        {/* Project Development Area */}
                                        <path
                                            className="service-area"
                                            d="M50,50 L200,50 L200,200 L50,200 Z"
                                            fill="url(#projectGradient)"
                                            fillOpacity="0.1"
                                        />
                                        {/* AI Solutions Area */}
                                        <path
                                            className="service-area"
                                            d="M250,150 L450,150 L450,350 L250,350 Z"
                                            fill="url(#aiGradient)"
                                            fillOpacity="0.1"
                                        />
                                        {/* IT Consulting Area */}
                                        <path
                                            className="service-area"
                                            d="M50,250 L200,250 L200,450 L50,450 Z"
                                            fill="url(#consultingGradient)"
                                            fillOpacity="0.1"
                                        />
                                    </g>
                                    {/* Connections between service areas */}
                                    <g className="connections">
                                        {/* Project Development to AI Solutions connections */}
                                        <path
                                            className="connection"
                                            d="M150,125 L300,200"
                                            stroke="rgba(77, 159, 255, 0.4)"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            className="connection"
                                            d="M150,150 L300,250"
                                            stroke="rgba(77, 159, 255, 0.3)"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            className="connection"
                                            d="M175,175 L275,225"
                                            stroke="rgba(77, 159, 255, 0.5)"
                                            strokeWidth="1.5"
                                        />
                                        {/* AI Solutions to IT Consulting connections */}
                                        <path
                                            className="connection"
                                            d="M300,300 L175,325"
                                            stroke="rgba(77, 159, 255, 0.4)"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            className="connection"
                                            d="M275,275 L150,350"
                                            stroke="rgba(77, 159, 255, 0.3)"
                                            strokeWidth="1.5"
                                        />
                                        {/* IT Consulting to Project Development connections */}
                                        <path
                                            className="connection"
                                            d="M125,250 L125,200"
                                            stroke="rgba(77, 159, 255, 0.5)"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            className="connection"
                                            d="M100,275 L100,175"
                                            stroke="rgba(77, 159, 255, 0.4)"
                                            strokeWidth="1.5"
                                        />
                                        {/* Cross-service connections */}
                                        <path
                                            className="connection"
                                            d="M175,100 L350,300"
                                            stroke="rgba(77, 159, 255, 0.2)"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            className="connection"
                                            d="M100,400 L400,200"
                                            stroke="rgba(77, 159, 255, 0.2)"
                                            strokeWidth="1.5"
                                        />
                                    </g>
                                    {/* Data flow animations */}
                                    <g className="data-flows">
                                        <circle className="data-particle" r="3" fill="#4D9FFF">
                                            <animateMotion
                                                path="M150,125 L300,200"
                                                dur="3s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                        <circle className="data-particle" r="3" fill="#4D9FFF">
                                            <animateMotion
                                                path="M300,300 L175,325"
                                                dur="2.5s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                        <circle className="data-particle" r="3" fill="#4D9FFF">
                                            <animateMotion
                                                path="M125,250 L125,200"
                                                dur="2s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                        <circle className="data-particle" r="3" fill="#4D9FFF">
                                            <animateMotion
                                                path="M175,100 L350,300"
                                                dur="4s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                        <circle className="data-particle" r="3" fill="#4D9FFF">
                                            <animateMotion
                                                path="M100,400 L400,200"
                                                dur="5s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                    </g>
                                    {/* Project Development Nodes */}
                                    <g className="project-dev-nodes">
                                        <circle
                                            className="node"
                                            cx="75"
                                            cy="75"
                                            r="12"
                                            fill="url(#projectNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="125"
                                            cy="100"
                                            r="12"
                                            fill="url(#projectNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="175"
                                            cy="75"
                                            r="12"
                                            fill="url(#projectNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="150"
                                            cy="150"
                                            r="12"
                                            fill="url(#projectNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="100"
                                            cy="175"
                                            r="12"
                                            fill="url(#projectNodeGradient)"
                                        />
                                        <text
                                            x="125"
                                            y="40"
                                            fill="#ffffff"
                                            fontSize="14"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            Project Development
                                        </text>
                                    </g>
                                    {/* AI Solutions Nodes */}
                                    <g className="ai-nodes">
                                        <circle
                                            className="node"
                                            cx="300"
                                            cy="200"
                                            r="14"
                                            fill="url(#aiNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="350"
                                            cy="175"
                                            r="14"
                                            fill="url(#aiNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="400"
                                            cy="225"
                                            r="14"
                                            fill="url(#aiNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="325"
                                            cy="275"
                                            r="14"
                                            fill="url(#aiNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="375"
                                            cy="300"
                                            r="14"
                                            fill="url(#aiNodeGradient)"
                                        />
                                        <text
                                            x="350"
                                            y="140"
                                            fill="#ffffff"
                                            fontSize="14"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            AI Solutions
                                        </text>
                                    </g>
                                    {/* IT Consulting Nodes */}
                                    <g className="consulting-nodes">
                                        <circle
                                            className="node"
                                            cx="75"
                                            cy="300"
                                            r="12"
                                            fill="url(#consultingNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="125"
                                            cy="325"
                                            r="12"
                                            fill="url(#consultingNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="175"
                                            cy="350"
                                            r="12"
                                            fill="url(#consultingNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="100"
                                            cy="400"
                                            r="12"
                                            fill="url(#consultingNodeGradient)"
                                        />
                                        <circle
                                            className="node"
                                            cx="150"
                                            cy="375"
                                            r="12"
                                            fill="url(#consultingNodeGradient)"
                                        />
                                        <text
                                            x="125"
                                            y="275"
                                            fill="#ffffff"
                                            fontSize="14"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            IT Consulting
                                        </text>
                                    </g>
                                    {/* Gradient definitions */}
                                    <defs>
                                        <radialGradient
                                            id="projectNodeGradient"
                                            cx="0.5"
                                            cy="0.5"
                                            r="0.5"
                                            fx="0.5"
                                            fy="0.5"
                                        >
                                            <stop offset="0%" stopColor="#4D9FFF" />
                                            <stop offset="100%" stopColor="#0A4A9B" />
                                        </radialGradient>
                                        <radialGradient
                                            id="aiNodeGradient"
                                            cx="0.5"
                                            cy="0.5"
                                            r="0.5"
                                            fx="0.5"
                                            fy="0.5"
                                        >
                                            <stop offset="0%" stopColor="#7C4DFF" />
                                            <stop offset="100%" stopColor="#3F0CAA" />
                                        </radialGradient>
                                        <radialGradient
                                            id="consultingNodeGradient"
                                            cx="0.5"
                                            cy="0.5"
                                            r="0.5"
                                            fx="0.5"
                                            fy="0.5"
                                        >
                                            <stop offset="0%" stopColor="#4DFFB8" />
                                            <stop offset="100%" stopColor="#0A9B6B" />
                                        </radialGradient>
                                        <linearGradient
                                            id="projectGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#4D9FFF" stopOpacity="0.3" />
                                            <stop
                                                offset="100%"
                                                stopColor="#0A4A9B"
                                                stopOpacity="0.1"
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="aiGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#7C4DFF" stopOpacity="0.3" />
                                            <stop
                                                offset="100%"
                                                stopColor="#3F0CAA"
                                                stopOpacity="0.1"
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="consultingGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#4DFFB8" stopOpacity="0.3" />
                                            <stop
                                                offset="100%"
                                                stopColor="#0A9B6B"
                                                stopOpacity="0.1"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                {/* Floating 3D elements */}
                                <div className="hidden absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-tr from-primary/40 to-accent/40 rounded-lg rotate-12 animate-[float_6s_ease-in-out_infinite]"></div>
                                <div className="absolute bottom-1/3 right-0 w-16 h-16 bg-gradient-to-bl from-[#7C4DFF]/30 to-primary/30 rounded-full animate-[float_7s_ease-in-out_infinite_1s]"></div>
                                <div className="absolute top-1/2 right-1/6 w-12 h-12 bg-gradient-to-r from-[#4DFFB8]/20 to-accent/20 rounded-md rotate-45 animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
                            </div>
                            {/* Overlay text */}
                            <div className="absolute top-0 right-0 p-4 text-xs text-accent/70 font-mono">
                                <div className="typing-effect overflow-hidden whitespace-nowrap border-r-2 border-accent/50 animate-[typing_3.5s_steps(30,end),blink-caret_0.75s_step-end_infinite]">
                                    Integrated Technology Solutions
                                </div>
                            </div>
                            {/* Service Icons */}
                            <div className="absolute bottom-4 right-4 bg-secondary-charcoal/30 backdrop-blur-sm rounded-lg p-3 border border-accent/20">
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center mb-1">
                                            <svg
                                                className="w-4 h-4 text-[#4D9FFF]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-secondary-silver">
                                            Development
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-[#7C4DFF]/30 rounded-full flex items-center justify-center mb-1">
                                            <svg
                                                className="w-4 h-4 text-[#7C4DFF]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-secondary-silver">AI</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-[#4DFFB8]/30 rounded-full flex items-center justify-center mb-1">
                                            <svg
                                                className="w-4 h-4 text-[#4DFFB8]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-secondary-silver">
                                            Consulting
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CSS Animations */}
            <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes glow {
          0%,
          100% {
            stroke-opacity: 0.3;
          }
          50% {
            stroke-opacity: 0.8;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes progress {
          0% {
            width: 75%;
          }
          50% {
            width: 92%;
          }
          100% {
            width: 75%;
          }
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: rgba(77, 159, 255, 0.5);
          }
        }
      `}</style>
        </section>
    )
}
export default Hero
