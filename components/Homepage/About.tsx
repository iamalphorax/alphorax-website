"use client";

import Image from "next/image";
import { CheckCircleIcon, ZapIcon } from "lucide-react";
import { AboutData } from "@/types/services";
import { useRef, useEffect } from "react";

const About = ({ data }: { data: AboutData }) => {
  const aboutContent = data?.about;
  const networkRef = useRef<HTMLDivElement | null>(null);
  const techStackRef = useRef<HTMLDivElement | null>(null);
  const techStackContainerRef = useRef<HTMLDivElement | null>(null);

  // 🧠 Floating network animation
  useEffect(() => {
    const network = networkRef.current;
    if (!network) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const nodes = network.querySelectorAll<HTMLDivElement>(".network-node");
    const connections = network.querySelectorAll<HTMLDivElement>(
      ".network-connection",
    );

    const animateNetwork = () => {
      nodes.forEach((node, i) => {
        const speed = 0.0005 * ((i % 3) + 1);
        const x = Math.sin(Date.now() * speed) * 5;
        const y = Math.cos(Date.now() * speed) * 5;
        node.style.transform = `translate(${x}px, ${y}px)`;
      });

      connections.forEach((connection, i) => {
        const opacity =
          0.2 + Math.sin(Date.now() * 0.001 * ((i % 3) + 1)) * 0.1;
        connection.style.opacity = opacity.toString();
      });

      requestAnimationFrame(animateNetwork);
    };

    animateNetwork();
  }, []);

  // ⚙️ Auto-scrolling tech stack marquee
  useEffect(() => {
    const scrollContainer = techStackRef.current;
    const container = techStackContainerRef.current;
    if (!scrollContainer || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const items =
      scrollContainer.querySelectorAll<HTMLDivElement>(".tech-stack-item");
    if (items.length === 0) return;

    // Clone items for seamless looping
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      scrollContainer.appendChild(clone);
    });

    const totalWidth = Array.from(scrollContainer.children).reduce(
      (width, child) => width + (child as HTMLElement).offsetWidth + 16,
      0,
    );

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.9;

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
    container.addEventListener("focusin", pauseScroll);
    container.addEventListener("focusout", resumeScroll);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pauseScroll);
      container.removeEventListener("mouseleave", resumeScroll);
      container.removeEventListener("focusin", pauseScroll);
      container.removeEventListener("focusout", resumeScroll);
    };
  }, []);
  return (
    <section
      id="about"
      className="relative py-10 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        aria-hidden="true"
      ></div>
      {/* Neural network visualization (abstract) */}
      <div
        ref={networkRef}
        className="absolute inset-0 flex items-center justify-center opacity-10"
        aria-hidden="true"
      >
        <div className="relative w-[800px] h-[800px]">
          {/* Network nodes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-accent rounded-full network-node"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 15px 5px rgba(77, 159, 255, 0.3)",
                transition: "transform 2s ease-in-out",
              }}
            ></div>
          ))}
          {/* Network connections */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-accent/30 network-connection"
              style={{
                height: "2px",
                width: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                transition: "opacity 2s ease-in-out",
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image/visual */}
          <div className="relative">
            <div className="inline-block md:hidden px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
              {aboutContent?.badge || "About Alphorax"}
            </div>
            <div
              className="absolute -top-6 -left-6 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"
              aria-hidden="true"
            ></div>
            {/* Our Mission Statement */}
            <div className="relative bg-gradient-to-br from-primary to-secondary-charcoal p-1 rounded-2xl shadow-xl">
              <div className="bg-secondary-charcoal rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <div
                    className="absolute inset-0 bg-neural-pattern opacity-20"
                    aria-hidden="true"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 relative" aria-hidden="true">
                      {/* Animated concentric circles */}
                      <div className="w-full h-full rounded-full border-2 border-accent/20 absolute animate-[spin_10s_linear_infinite]"></div>
                      <div className="w-3/4 h-3/4 rounded-full border-2 border-accent/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_7s_linear_infinite_reverse]"></div>
                      <div className="w-1/2 h-1/2 rounded-full border-2 border-accent/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite]"></div>
                      <div className="w-1/4 h-1/4 rounded-full bg-accent/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      {/* Orbiting dots */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-accent rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                            marginTop: "-1px",
                            marginLeft: "-1px",
                            transformOrigin: "50px 50px",
                            animation: `spin ${6 + i}s linear infinite`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    Our Mission Statement
                    <ZapIcon
                      size={16}
                      className="ml-2 text-accent"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-secondary-silver">
                    {aboutContent?.mission}
                  </p>
                </div>
              </div>
            </div>
            {/* Our Vision Statement */}
            <div className="relative bg-gradient-to-br from-primary to-secondary-charcoal p-1 rounded-2xl shadow-xl my-5">
              <div className="bg-secondary-charcoal rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <div
                    className="absolute inset-0 bg-neural-pattern opacity-20"
                    aria-hidden="true"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 relative" aria-hidden="true">
                      {/* Animated concentric circles */}
                      <div className="w-full h-full rounded-full border-2 border-accent/20 absolute animate-[spin_10s_linear_infinite]"></div>
                      <div className="w-3/4 h-3/4 rounded-full border-2 border-accent/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_7s_linear_infinite_reverse]"></div>
                      <div className="w-1/2 h-1/2 rounded-full border-2 border-accent/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite]"></div>
                      <div className="w-1/4 h-1/4 rounded-full bg-accent/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      {/* Orbiting dots */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-accent rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                            marginTop: "-1px",
                            marginLeft: "-1px",
                            transformOrigin: "50px 50px",
                            animation: `spin ${6 + i}s linear infinite`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    Our Vision Statement
                    <ZapIcon
                      size={16}
                      className="ml-2 text-accent"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-secondary-silver">
                    {aboutContent?.vision}
                  </p>
                </div>
              </div>
            </div>
            {/* Our Core Values */}
            <div className="relative bg-gradient-to-br from-primary to-secondary-charcoal p-1 rounded-2xl shadow-xl my-5">
              <div className="bg-secondary-charcoal rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <div
                    className="absolute inset-0 bg-neural-pattern opacity-20"
                    aria-hidden="true"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 relative" aria-hidden="true">
                      {/* Animated concentric circles */}
                      <div className="w-full h-full rounded-full border-2 border-accent/20 absolute animate-[spin_10s_linear_infinite]"></div>
                      <div className="w-3/4 h-3/4 rounded-full border-2 border-accent/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_7s_linear_infinite_reverse]"></div>
                      <div className="w-1/2 h-1/2 rounded-full border-2 border-accent/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_5s_linear_infinite]"></div>
                      <div className="w-1/4 h-1/4 rounded-full bg-accent/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      {/* Orbiting dots */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-accent rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                            marginTop: "-1px",
                            marginLeft: "-1px",
                            transformOrigin: "50px 50px",
                            animation: `spin ${6 + i}s linear infinite`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    Our Core Values
                    <ZapIcon
                      size={16}
                      className="ml-2 text-accent"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-secondary-silver">
                    {aboutContent?.values}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right column - Content */}
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
              {aboutContent?.badge || "About Alphorax"}
            </div>
            <h2 id="about-heading" className="text-4xl font-bold mb-6">
              {aboutContent?.title?.before}{" "}
              <span className="text-accent relative inline-block">
                {aboutContent?.title?.highlight}
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
              </span>{" "}
              {aboutContent?.title?.after || "of Technology"}
            </h2>
            <p className="text-lg text-secondary-silver mb-6">
              {aboutContent?.description}
            </p>
            <div className="space-y-4 mb-8">
              {aboutContent?.points?.map((item, index) => (
                <div key={index} className="flex items-center group">
                  <div className="p-1 bg-accent/10 rounded-full mr-2 group-hover:bg-accent/20 transition-colors">
                    <CheckCircleIcon
                      size={20}
                      className="text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
              aria-label="Learn more about Alphorax"
            >
              <span
                className="absolute inset-0 w-full h-0 bg-accent/10 transition-all duration-300 group-hover:h-full"
                aria-hidden="true"
              ></span>
              <span className="relative z-10">Learn More About Us</span>
            </button>
            {/* Tech stack icons */}
            <div className="mt-5 pt-5 border-t border-secondary-silver/10">
              <p className="text-secondary-silver mb-4">
                Our Technology Stack:
              </p>
              <div
                ref={techStackContainerRef}
                className="overflow-hidden relative"
                aria-label="Technology stack carousel"
                data-auto-scroll="true"
              >
                <div
                  ref={techStackRef}
                  className="flex space-x-4 py-2"
                  style={{
                    willChange: "transform",
                  }}
                >
                  {aboutContent?.techStack?.map((tech, i) => (
                    <div
                      key={i}
                      className="tech-stack-item p-3 bg-secondary-charcoal/30 rounded-lg flex items-center justify-center hover:bg-secondary-charcoal/50 transition-colors flex-shrink-0 w-16 h-16 relative"
                      tabIndex={0}
                    >
                      <Image
                        src={tech.src}
                        alt={`${tech.name} logo`}
                        fill
                        className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity object-contain"
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
  );
};
export default About;
