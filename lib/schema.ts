/**
 * JSON-LD Schema Markup Utilities for SEO
 * Generates structured data for different page types
 */

export interface OrganizationSchema {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs: string[];
    contactPoint: {
        "@type": string;
        email: string;
        contactType: string;
    };
}

export interface WebSiteSchema {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    description: string;
    publisher: {
        "@type": string;
        name: string;
    };
}

export interface WebPageSchema {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
}

export interface ServiceSchema {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    provider: {
        "@type": string;
        name: string;
    };
    areaServed: string;
    serviceType: string;
}

export interface BlogPostingSchema {
    "@context": string;
    "@type": string;
    headline: string;
    description: string;
    image: string;
    author: {
        "@type": string;
        name: string;
    };
    publisher: {
        "@type": string;
        name: string;
        logo: {
            "@type": string;
            url: string;
        };
    };
    datePublished: string;
    dateModified: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com";

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Alphorax",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description:
            "Alphorax delivers forward-thinking digital infrastructure, AI integrations, and cloud systems built for scale.",
        sameAs: [
            "https://linkedin.com/company/alphoraxltd",
            "https://twitter.com/alphoraxltd",
            "https://github.com/alphoraxltd",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            email: "info@alphorax.com",
            contactType: "Customer Service",
        },
    };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(): WebSiteSchema {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Alphorax",
        url: baseUrl,
        description:
            "Smart AI, reliable software, trusted IT consulting. Alphorax delivers forward-thinking digital infrastructure.",
        publisher: {
            "@type": "Organization",
            name: "Alphorax",
        },
    };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
    name: string,
    description: string,
    url: string
): WebPageSchema {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url: `${baseUrl}${url}`,
    };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
    name: string,
    description: string,
    serviceType: string
): ServiceSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: "Alphorax",
        },
        areaServed: "Worldwide",
        serviceType,
    };
}

/**
 * Generate BlogPosting schema
 */
export function generateBlogPostingSchema(
    headline: string,
    description: string,
    image: string,
    author: string,
    datePublished: string,
    dateModified?: string
): BlogPostingSchema {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        image,
        author: {
            "@type": "Person",
            name: author,
        },
        publisher: {
            "@type": "Organization",
            name: "Alphorax",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
            },
        },
        datePublished,
        dateModified: dateModified || datePublished,
    };
}

/**
 * Generate JSON-LD script props for use in components
 * Usage: <script {...getJsonLdProps(schema)} />
 */
export function getJsonLdProps(schema: object) {
    return {
        type: "application/ld+json" as const,
        dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
    };
}
