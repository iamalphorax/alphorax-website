import React from "react";
import { getContent } from "@/lib/cms";
import ServicePageContent from "@/components/services/ServicePageContent";
import { redirect } from "next/navigation";
import { Service, ServicesConfig } from "@/types/services";

import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const serviceMetadata: Record<string, { title: string; description: string }> = {
  "website-development": {
    title: "Website Development",
    description: "Responsive, high-performance websites and web applications with modern frameworks.",
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
  },
  "software-development": {
    title: "Software Development",
    description: "Tailored desktop applications and enterprise solutions built with cutting-edge technology.",
  },
  "it-consulting": {
    title: "IT Consulting",
    description: "Expert guidance to align technology with your business strategy, optimize infrastructure, and ensure reliable IT operations.",
  },
  "ai-solutions": {
    title: "Ai Solutions",
    description: "Delivering cutting-edge AI technology solutions tailored to your business needs with custom models, seamless integration, and specialized training.",
  },
  "project-development": {
    title: "Project Development",
    description: "Delivering professional web and scalable mobile development tailored to your business needs."
  }
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = serviceMetadata[slug];

  if (!metadata) {
    // Fallback if slug not in mapping
    const servicesData = await getContent("services.md");
    const service = (servicesData as ServicesConfig)?.services?.find(
      (s: Service) => s.link.split("/").pop() === slug || s.id === slug
    );

    return {
      title: service ? `${service.title} | Alphorax` : "Service | Alphorax",
      description: service?.description || "Professional services by Alphorax.",
    };
  }

  return {
    title: `${metadata.title} | Alphorax`,
    description: metadata.description,
  };
}

export async function generateStaticParams() {
  try {
    const servicesData = await getContent("services.md");

    if (!servicesData || !(servicesData as ServicesConfig)?.services) {
      console.warn("No services data available for generateStaticParams");
      return [];
    }

    console.log(servicesData);

    const services = (servicesData as ServicesConfig).services;

    return services.map((service: Service) => {
      const slug = service.link.split("/").pop() || service.id;
      return {
        slug: slug,
      };
    });
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const ServicePage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;
  console.log(`[ServicePage] Rendering service page for slug: ${slug}`);

  // Fetch the consolidated services data
  const servicesData = await getContent("services.md");

  // Check if data was successfully fetched
  if (!servicesData) {
    console.error(
      "[ServicePage] Failed to fetch services data from Cloudinary",
    );
    redirect("/services");
  }

  console.log(`[ServicePage] Services data received:`, {
    dataType: typeof servicesData,
    hasServices: Array.isArray((servicesData as ServicesConfig)?.services),
    serviceCount: (servicesData as ServicesConfig)?.services?.length || 0,
    services: (servicesData as ServicesConfig)?.services?.map((s: Service) => ({
      id: s.id,
      name: s.name,
      link: s.link,
    })),
  });

  // Find the specific service by slug
  const service = (servicesData as ServicesConfig)?.services?.find(
    (s: Service) => {
      // Match by slug (extracted from the link or id)
      const serviceSlug = s.link.split("/").pop();
      const matches = serviceSlug === slug || s.id === slug;
      console.log(
        `[ServicePage] Checking service: ${s.id}, serviceSlug: ${serviceSlug}, matches: ${matches}`,
      );
      return matches;
    },
  );

  if (!service) {
    // If service not found, redirect to services overview
    console.warn(`[ServicePage] Service not found for slug: ${slug}`);
    redirect("/services");
  }

  console.log(`[ServicePage] Found service:`, {
    id: service.id,
    name: service.name,
    link: service.link,
  });

  return <ServicePageContent service={service} />;
};

export default ServicePage;
