import { generateMetadata } from '../app/services/[slug]/page';
import { Service, ServicesConfig } from '../types/services';
import { getContent } from '../lib/cms';

async function verifySEO() {
    console.log("--- Starting SEO Metadata Verification ---");

    const testCases = [
        { slug: "website-development", expectedTitle: "Website Development | Alphorax" },
        { slug: "mobile-app-development", expectedTitle: "Mobile App Development | Alphorax" },
        { slug: "software-development", expectedTitle: "Software Development | Alphorax" },
        { slug: "it-consulting", expectedTitle: "IT Consulting | Alphorax" },
        { slug: "ai-solutions", expectedTitle: "Ai Solutions | Alphorax" },
        { slug: "project-development", expectedTitle: "Project Development | Alphorax" }
    ];

    for (const testCase of testCases) {
        try {
            const params = Promise.resolve({ slug: testCase.slug });
            const metadata = await generateMetadata({ params });

            console.log(`Checking Slug: ${testCase.slug}`);
            console.log(`- Title: ${metadata.title}`);
            console.log(`- Description: ${metadata.description?.toString().substring(0, 100)}...`);

            if (metadata.title === testCase.expectedTitle) {
                console.log(`✅ Title matches expected value.`);
            } else {
                console.error(`❌ Title mismatch! Expected: ${testCase.expectedTitle}, Got: ${metadata.title}`);
            }
        } catch (err) {
            console.error(`❌ Error verifying ${testCase.slug}:`, err);
        }
    }

    console.log("--- Verification Complete ---");
}

verifySEO();
