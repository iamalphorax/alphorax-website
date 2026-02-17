export interface Blog {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    image: string;
    description: string;
    author: string;
    date: string;
    readTime: string;
    featured: boolean;
    content?: string;
    keywords?: string[];
}

export const blogsData: Blog[] = [
    {
        id: 'ai-future-business',
        title: 'The Future of AI in Business: Trends to Watch',
        category: 'AI Solutions',
        subcategory: 'AI Model Development',
        image:
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
        description:
            'Exploring emerging AI trends that are reshaping business operations and decision-making processes.',
        author: 'Dr. Sarah Chen',
        date: '2023-11-15',
        readTime: '8 min read',
        featured: true,
        content: `
      <h2>The Rise of Generative AI</h2>
      <p>Artificial Intelligence is no longer a futuristic concept; it is actively reshaping the business landscape. From generative models that create content to advanced analytics that predict market shifts, AI is becoming an indispensable tool for enterprises worldwide.</p>
      
      <h2>Predictive Analytics and Decision Support</h2>
      <p>Companies are increasingly relying on AI to handle vast amounts of data, providing insights that were previously impossible to uncover. This shift allows for more informed decision-making and strategic planning.</p>
      
      <h2>Automation of Routine Tasks</h2>
      <p>AI is taking over repetitive, manual tasks, freeing up human workers to focus on more creative and strategic initiatives. This not only increases efficiency but also boosts employee morale by reducing burnout.</p>
      
      <blockquote>
        "AI will not replace humans, but humans who use AI will replace those who don't."
      </blockquote>
      
      <h2>Conclusion</h2>
      <p>As AI continues to evolve, businesses that embrace these technologies will find themselves at a significant advantage. The future of business is undoubtedly AI-driven.</p>
    `
    },
    {
        id: 'cloud-migration-strategies',
        title: 'Effective Cloud Migration Strategies for Enterprises',
        category: 'IT Consulting',
        subcategory: 'IT Strategy & Roadmapping',
        image:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
        description:
            'A comprehensive guide to planning and executing successful cloud migrations for large organizations.',
        author: 'Michael Rodriguez',
        date: '2023-10-22',
        readTime: '12 min read',
        featured: false,
        content: `
      <h2>Why Migrate to the Cloud?</h2>
      <p>Cloud migration offers unprecedented scalability, cost-efficiency, and flexibility. However, the process can be complex and requires a well-thought-out strategy to be successful.</p>
      
      <h2>Common Strategies: The 5 Rs</h2>
      <ul>
        <li><strong>Rehost:</strong> Also known as "lift and shift," this involves moving applications to the cloud without making any changes.</li>
        <li><strong>Replatform:</strong> Making minor adjustments to the application to take advantage of cloud capabilities.</li>
        <li><strong>Refactor:</strong> Re-architecting the application to be cloud-native.</li>
        <li><strong>Retain:</strong> Keeping certain applications on-premises for security or compliance reasons.</li>
        <li><strong>Retire:</strong> Phasing out applications that are no longer needed.</li>
      </ul>
      
      <h2>Challenges to Watch Out For</h2>
      <p>Data security, potential downtime, and cultural shifts within the organization are some of the biggest hurdles during a cloud migration.</p>
    `
    },
    {
        id: 'react-best-practices',
        title: 'React Best Practices for Enterprise Applications',
        category: 'Project Development',
        subcategory: 'Web Development',
        image:
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
        description:
            'Learn how to structure and optimize React applications for enterprise-scale projects.',
        author: 'Emily Johnson',
        date: '2023-09-18',
        readTime: '10 min read',
        featured: true,
        content: `
      <h2>Component Composition</h2>
      <p>Building small, reusable components is the cornerstone of a scalable React application. Use composition patterns to create complex UIs from simple blocks.</p>
      
      <h2>State Management at Scale</h2>
      <p>Choosing the right state management tool (Redux, Recoil, or React's built-in Context API) is crucial for maintaining application performance and code clarity.</p>
      
      <h2>Performance Optimization</h2>
      <p>Utilize memoization (useMemo, useCallback) and code-splitting to ensure your enterprise application remains fast and responsive.</p>
    `
    },
    {
        id: 'nlp-customer-service',
        title: 'Revolutionizing Customer Service with NLP',
        category: 'AI Solutions',
        subcategory: 'AI Training & Fine-tuning',
        image:
            'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=2000&auto=format&fit=crop',
        description:
            'How natural language processing is transforming customer service experiences across industries.',
        author: 'Dr. James Wilson',
        date: '2023-09-05',
        readTime: '7 min read',
        featured: false
    },
    {
        id: 'mobile-app-security',
        title: 'Security Best Practices for Mobile App Development',
        category: 'Project Development',
        subcategory: 'Mobile App Development',
        image:
            'https://images.unsplash.com/photo-1616004667892-d348f7349d39?q=80&w=2000&auto=format&fit=crop',
        description:
            'Essential security considerations and implementation strategies for mobile application development.',
        author: 'Robert Chen',
        date: '2023-08-28',
        readTime: '9 min read',
        featured: false
    },
    {
        id: 'ai-integration-legacy',
        title: 'Integrating AI with Legacy Systems: Challenges and Solutions',
        category: 'AI Solutions',
        subcategory: 'AI Integration',
        image:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
        description:
            'Strategies for successfully implementing AI technologies within existing legacy infrastructure.',
        author: 'Dr. Sarah Chen',
        date: '2023-08-15',
        readTime: '11 min read',
        featured: false
    },
    {
        id: 'infrastructure-optimization',
        title: 'Infrastructure Optimization Techniques for Modern Businesses',
        category: 'IT Consulting',
        subcategory: 'Infrastructure Optimization',
        image:
            'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2000&auto=format&fit=crop',
        description:
            'Proven methods to optimize IT infrastructure for better performance, scalability, and cost-efficiency.',
        author: 'Thomas Wright',
        date: '2023-07-30',
        readTime: '8 min read',
        featured: false
    },
    {
        id: 'custom-software-roi',
        title: 'Maximizing ROI on Custom Software Development',
        category: 'Project Development',
        subcategory: 'Custom Software Development',
        image:
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
        description:
            'How to ensure your custom software development projects deliver maximum return on investment.',
        author: 'Jennifer Lee',
        date: '2023-07-15',
        readTime: '10 min read',
        featured: true
    },
    {
        id: 'it-support-remote',
        title: 'Effective IT Support Strategies for Remote Workforces',
        category: 'IT Consulting',
        subcategory: 'IT Support & Issue Resolution',
        image:
            'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2000&auto=format&fit=crop',
        description:
            'Best practices for providing seamless IT support to distributed and remote teams.',
        author: 'Michael Rodriguez',
        date: '2023-06-28',
        readTime: '7 min read',
        featured: false
    },
    {
        id: 'ai-ethics-business',
        title: 'Ethical Considerations in AI Implementation',
        category: 'AI Solutions',
        subcategory: 'AI Model Development',
        image:
            'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
        description:
            'Navigating the ethical challenges and responsibilities when implementing AI in business contexts.',
        author: 'Dr. James Wilson',
        date: '2023-06-10',
        readTime: '12 min read',
        featured: false
    },
    {
        id: 'web-accessibility',
        title: 'Web Accessibility: Building Inclusive Digital Experiences',
        category: 'Project Development',
        subcategory: 'Web Development',
        image:
            'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop',
        description:
            'Comprehensive guide to implementing web accessibility standards in modern web applications.',
        author: 'Emily Johnson',
        date: '2023-05-20',
        readTime: '9 min read',
        featured: false
    },
    {
        id: 'digital-transformation',
        title: 'Digital Transformation Roadmap for Traditional Businesses',
        category: 'IT Consulting',
        subcategory: 'IT Strategy & Roadmapping',
        image:
            'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop',
        description:
            'A step-by-step guide for traditional businesses looking to embrace digital transformation.',
        author: 'Thomas Wright',
        date: '2023-05-05',
        readTime: '11 min read',
        featured: true
    },
];
