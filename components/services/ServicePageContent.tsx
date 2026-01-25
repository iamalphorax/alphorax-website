"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CheckIcon,
  ArrowRightIcon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";
import { RenderIcon } from "@/components/shared/RenderIcon";
import ContactFormModal from "@/components/shared/ContactFormModal";
import { Service, ServiceProcess, ServiceItem } from "@/types/services";

interface ServicePageContentProps {
  service: Service;
}

const ProcessMarquee: React.FC<{ process: ServiceProcess[] }> = ({
  process,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const container = containerRef.current;
    if (!scrollContainer || !container || process.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Clone items for seamless looping
    const items = scrollContainer.children;
    const itemCount = items.length;
    for (let i = 0; i < itemCount; i++) {
      const clone = items[i].cloneNode(true);
      scrollContainer.appendChild(clone);
    }

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
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
  }, [process]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden group/marquee py-4"
    >
      <div ref={scrollRef} className="flex gap-4 w-max will-change-transform">
        {process.map((step, sIdx) => (
          <div
            key={sIdx}
            className="w-[280px] flex-shrink-0 p-5 bg-secondary-charcoal/30 border border-secondary-silver/10 rounded-2xl hover:border-accent/30 transition-all duration-300 group/step"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent group-hover/step:bg-accent group-hover/step:text-white transition-all duration-300">
                {sIdx + 1}
              </div>
              <div className="h-px flex-1 bg-secondary-silver/10"></div>
            </div>
            <h4 className="text-sm font-bold text-white group-hover/step:text-accent transition-colors duration-300 mb-2 leading-tight uppercase tracking-wider">
              {step.title}
            </h4>
            <p className="text-sm text-secondary-silver leading-relaxed line-clamp-3">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Absolute Fades */}
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

const ServicePageContent: React.FC<ServicePageContentProps> = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleOpenModal = (serviceId?: string) => {
    if (serviceId) {
      setSelectedService(serviceId);
    } else {
      setSelectedService("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(""), 300);
  };

  const StickyNav: React.FC<{
    sections: ServiceItem[];
    offset?: number;
  }> = ({ sections, offset = 64 }) => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActiveId(visible.target.id);
        },
        { threshold: 0.6 },
      );
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });
      return () => observer.disconnect();
    }, [sections]);

    const handleScroll = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 80;
        const elementPosition =
          el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    return (
      <nav
        className="sticky z-40 backdrop-blur-xl transition-all duration-300"
        style={{ top: offset }}
      >
        <div className="container flex items-center justify-center mx-auto py-4">
          <ul className="flex flex-wrap justify-center px-3 py-1 m-0 gap-3 w-fit border-2 border-accent bg-accent/10 transition-all duration-300 rounded-full">
            {sections.map(({ id, navIcon }) => (
              <li key={id} className="relative">
                <button
                  onClick={() => handleScroll(id)}
                  className={`flex items-center justify-center space-x-2 py-1 px-3 transition-all duration-300 relative group rounded-full ${activeId === id ? "text-accent bg-accent/10" : "text-white hover:text-accent/80 hover:bg-accent/5"}`}
                >
                  <div
                    className={`relative z-10 transition-transform duration-300 ${activeId === id ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    <RenderIcon icon={navIcon || "Circle"} size={20} />
                  </div>
                  <span className="block uppercase tracking-wide text-xs sm:text-sm relative z-10">
                    {id.split("-")[1] || id}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-50"
            style={{ backgroundImage: `url(${service.headingBg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/80 to-primary/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
              {service.type}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {service.heading.before}{" "}
              <span className="text-accent relative inline-block">
                {service.heading.highlight}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 260 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,3 C65,1 195,6 260,3"
                    stroke="rgba(77, 159, 255, 0.5)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-silver mb-8">
              {service.subHeading}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#details"
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group"
              >
                <span>Explore {service.title}</span>
                <ArrowRightIcon
                  size={20}
                  className="ml-2 group-hover:rotate-90 transition-transform"
                />
              </a>
              <button
                onClick={() => handleOpenModal()}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Nav & Sections */}
      <section id="details" className="relative py-5">
        <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
        <StickyNav sections={service.items} offset={64} />

        <div className="container mx-auto px-4 mt-8 relative z-10 overflow-hidden">
          {service.items.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index !== 0 ? "mt-24" : ""}`}
            >
              <div
                className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}
              >
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                  {item.title}
                </div>
                <h2 className="text-4xl font-bold mb-6">{item.title}</h2>
                <p className="text-lg text-secondary-silver mb-8">
                  {item.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <LightbulbIcon size={20} className="text-accent mr-2" />
                    What We Offer
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
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
                    {item.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="p-1 bg-accent/10 rounded-full mr-2 mt-1">
                          <CheckIcon size={14} className="text-accent" />
                        </div>
                        <span className="text-secondary-silver">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenModal(item.id)}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group"
                >
                  <span>Get Started</span>
                  <ArrowRightIcon
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              <div
                className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg"></div>
                  <div className="relative overflow-hidden rounded-xl border border-accent/30 max-h-[400px]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <div className="flex items-center">
                        <div className="p-3 bg-primary/30 rounded-lg mr-4">
                          <RenderIcon icon={item.icon} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item Process - Auto Scrolling Marquee */}
                {item.process && item.process.length > 0 && (
                  <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8 bg-accent/30"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60">
                        Execution Roadmap
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent"></div>
                    </div>

                    <ProcessMarquee process={item.process} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
              Our Methodology
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Strategic{" "}
              <span className="text-accent relative inline-block">
                Process
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 180 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,3 C45,1 135,6 180,3"
                    stroke="rgba(77, 159, 255, 0.5)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.approach.map((step, index) => (
              <div
                key={index}
                className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group relative"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary border-4 border-secondary-charcoal flex items-center justify-center z-10 group-hover:border-accent/30 transition-colors">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <div className="pt-4">
                  <div className="p-2 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors">
                    <RenderIcon icon={step.icon} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-secondary-silver">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Elevate Your{" "}
              <span className="text-accent">Business?</span>
            </h2>
            <p className="text-xl text-secondary-silver mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our {service.title} expertise can help you
              achieve your goals.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group"
            >
              <span>Get Started Now</span>
              <ArrowRightIcon
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
        services={service.items.map((item) => ({
          id: item.id,
          title: item.title,
        }))}
      />
    </main>
  );
};

export default ServicePageContent;
