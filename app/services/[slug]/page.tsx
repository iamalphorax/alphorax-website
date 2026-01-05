import React from 'react'
import { getContent } from '@/lib/cms'
import ServicePageContent from '@/components/services/ServicePageContent'
import { redirect } from 'next/navigation'
import { Service, ServicesConfig } from '@/types/services'

interface ServicePageProps {
    params: {
        slug: string
    }
}

const ServicePage = async ({ params }: ServicePageProps) => {
    const { slug } = params;

    // Fetch the consolidated services data
    const servicesData = await getContent("services.md");

    // Find the specific service by slug
    const service = (servicesData as ServicesConfig)?.services?.find((s: Service) => {
        // Match by slug (extracted from the link or id)
        const serviceSlug = s.link.split('/').pop();
        return serviceSlug === slug || s.id === slug;
    });

    if (!service) {
        // If service not found, redirect to services overview
        redirect('/services');
    }

    return <ServicePageContent service={service} />;
}

export default ServicePage;
