"use client"

import React, { cloneElement, ReactElement } from 'react'
import {
    CodeIcon,
    SmartphoneIcon,
    GlobeIcon,
    BrainIcon,
    ServerIcon,
    DatabaseIcon,
    ArrowRightIcon,
    CheckIcon,
    LightbulbIcon,
    TrendingUpIcon,
    ShieldIcon,
    ServerCogIcon,
    LifeBuoyIcon,
    ClipboardListIcon,
    CalendarCheckIcon,
    PenToolIcon,
    ShieldCheckIcon,
    RocketIcon,
    SearchIcon,
    TargetIcon,
    Settings2Icon,
    CompassIcon,
    GaugeIcon,
    HandshakeIcon
} from 'lucide-react'
import Link from 'next/link'

const OurServices = [
    {
        id: 'project-development',
        icon: <CodeIcon size={32} className="text-accent" />,
        type: 'Build',
        title: 'Project Development',
        description:
            'Desktop, mobile, and web solutions built with modern frameworks to deliver performance, scalability, and seamless user experiences.',
        Heading: {
            before: "Building Tomorrow's",
            highlight: "Technology Today",
        },
        headingBg: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop",
        subHeading: "Crafting scalable, secure, and innovative software solutions designed to match your unique business vision and future growth.",
        image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
        link: '/project-development',
        details: [
            'Enterprise Software & Business Process Tools',
            'Native & Cross-Platform Mobile Applications',
            'Corporate Websites & E-commerce Platforms',
            'Cloud-Based Web Apps & Data Management'
        ],
        features: [
            'Scalable, high-performance architecture',
            'Seamless integration across platforms',
            'Intuitive, responsive, and accessible UI/UX',
            'Ongoing support with analytics and security'
        ],
        items: [
            {
                icon: <CodeIcon size={32} className="text-accent" />,
                navIcon: <CodeIcon size={20} className="text-accent" />,
                title: 'Custom Software Development',
                id: "custom-software",
                link: '/project-development',
                description:
                    'Tailored desktop applications and enterprise solutions built with cutting-edge technology.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zm-24.596 0l-7.486 7.485 1.415 1.414 7.9-7.9h-1.83zm16.97 0l-9.9 9.9 1.415 1.414L34.3 3.414l-1.414-1.414L27.284 0h2.83zM0 0l.828.828-1.414 1.414L0 2.243V0h.828zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343 8.787 54.93 13.857 60H11.03zm32.284 0L49.8 53.515l-1.414-1.414-7.9 7.9h2.828zm-24.596 0l-7.486-7.485 1.415-1.414 7.9 7.9h-1.83zm16.97 0l-9.9-9.9 1.415-1.414L34.3 56.586l-1.414 1.414L27.284 60h2.83zM0 60l.828-.828-1.414-1.414L0 57.757V60h.828zM60 0l-.83.828L60.584 2.243 60 2.828V0h-.374zM60 60l-.83-.828L60.584 57.757 60 57.172V60h-.374zM39.8 16.8l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zm-19.6 0l1.414-1.414 1.415 1.414-1.414 1.414-1.414-1.414zM40.214 35.286l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm-20.015 0l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zM20.2 16.8l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zm19.6 0l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zM19.786 35.286l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm20.015 0l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zM30 30l1.414-1.414 1.414 1.414-1.414 1.414L30 30zm-9.9-9.9l1.415-1.414 1.414 1.414-1.414 1.414-1.414-1.414zm19.799 0l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zM20.1 39.9l1.415-1.414 1.414 1.414-1.414 1.414-1.414-1.414zm19.799 0l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414z' fill='%234d9fff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'Enterprise Resource Planning (ERP) Systems',
                    'Customer Relationship Management (CRM) Software',
                    'Business Process Automation Solutions',
                    'Data Management Platforms',
                    'Cloud-Based Applications'
                ],
                features: [
                    'Scalable architecture designed for business growth',
                    'Seamless integration with existing systems',
                    'Intuitive user interfaces for maximum efficiency',
                    'Comprehensive documentation and training',
                    'Ongoing maintenance and support'
                ],
                process: [
                    {
                        title: 'Discovery',
                        description: 'We analyze your business requirements and objectives to define the scope of your software solution.'
                    },
                    {
                        title: 'Design',
                        description: 'Our team creates detailed specifications and prototypes to visualize the final product.'
                    },
                    {
                        title: 'Development',
                        description: 'We build your software using agile methodologies to ensure quality and flexibility.'
                    },
                    {
                        title: 'Testing',
                        description: 'Rigorous quality assurance processes ensure your software performs flawlessly.'
                    },
                    {
                        title: 'Deployment',
                        description: 'We implement your solution and provide comprehensive training for your team.'
                    },
                    {
                        title: 'Maintenance',
                        description: 'Ongoing support and updates keep your software running optimally.'
                    }
                ]
            },
            {
                icon: <SmartphoneIcon size={32} className="text-accent" />,
                navIcon: <SmartphoneIcon size={20} className="text-accent" />,
                title: 'Mobile App Development',
                id: 'development-mobile',
                link: '/project-development',
                description:
                    'Native and cross-platform mobile applications for iOS and Android devices.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d9fff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                details: [
                    'Native iOS Applications',
                    'Native Android Applications',
                    'Cross-Platform Solutions',
                    'Progressive Web Apps (PWAs)',
                    'Mobile App UI/UX Design'
                ],
                features: [
                    'Intuitive and engaging user experiences',
                    'Offline functionality and data synchronization',
                    'Push notification systems',
                    'Integration with device features (camera, GPS, etc.)',
                    'Secure authentication and data protection'
                ],
                process: [
                    {
                        title: 'Concept',
                        description: 'We help refine your app idea and identify the core features that deliver value to users.'
                    },
                    {
                        title: 'Wireframing',
                        description: 'Creating detailed wireframes and user flows to visualize the app structure.'
                    },
                    {
                        title: 'UI/UX Design',
                        description: 'Developing intuitive interfaces and engaging user experiences.'
                    },
                    {
                        title: 'Development',
                        description: 'Building the application with clean, efficient code and regular client reviews.'
                    },
                    {
                        title: 'Testing',
                        description: 'Comprehensive testing across multiple devices to ensure performance and stability.'
                    },
                    {
                        title: 'Launch & Marketing',
                        description: 'App store optimization and launch strategy to maximize visibility.'
                    }
                ]
            },
            {
                icon: <GlobeIcon size={32} className="text-accent" />,
                navIcon: <GlobeIcon size={20} className="text-accent" />,
                title: 'Web Development',
                id: "development-web",
                link: '/project-development',
                description:
                    'Responsive, high-performance websites and web applications with modern frameworks.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                details: [
                    'Corporate Websites',
                    'E-commerce Platforms',
                    'Web Applications',
                    'Progressive Web Apps',
                    'Content Management Systems'
                ],
                features: [
                    'Responsive designs for all device types',
                    'SEO-optimized architecture and content',
                    'Performance-focused development',
                    'Accessibility compliance',
                    'Analytics and conversion tracking'
                ],
                process: [
                    {
                        title: 'Strategy',
                        description: 'Defining goals, target audience, and technical requirements for your web project.'
                    },
                    {
                        title: 'Information Architecture',
                        description: 'Organizing content and functionality for optimal user experience.'
                    },
                    {
                        title: 'Design',
                        description: 'Creating visually appealing interfaces that align with your brand identity.'
                    },
                    {
                        title: 'Development',
                        description: 'Building the website or application with clean, efficient, and maintainable code.'
                    },
                    {
                        title: 'Content Integration',
                        description: 'Implementing your content with SEO best practices.'
                    },
                    {
                        title: 'Launch & Optimization',
                        description: 'Deploying your site and conducting performance optimization.'
                    }
                ]
            },
        ],
        approch: [
            {
                number: '01',
                title: 'Requirement Analysis',
                description: 'We collaborate with stakeholders to understand objectives, user needs, and technical requirements.',
                icon: <ClipboardListIcon size={24} className="text-accent" />
            },
            {
                number: '02',
                title: 'Planning & Strategy',
                description: 'We define the project scope, milestones, and development roadmap to ensure timely and efficient delivery.',
                icon: <CalendarCheckIcon size={24} className="text-accent" />
            },
            {
                number: '03',
                title: 'Design & Prototyping',
                description: 'Our designers create wireframes and interactive prototypes for clear visualization of user flows and interfaces.',
                icon: <PenToolIcon size={24} className="text-accent" />
            },
            {
                number: '04',
                title: 'Development & Integration',
                description: 'We build robust, scalable solutions using modern frameworks, integrating APIs and third-party services as needed.',
                icon: <CodeIcon size={24} className="text-accent" />
            },
            {
                number: '05',
                title: 'Testing & Quality Assurance',
                description: 'Comprehensive testing ensures your product meets quality, performance, and security standards before release.',
                icon: <ShieldCheckIcon size={24} className="text-accent" />
            },
            {
                number: '06',
                title: 'Deployment & Maintenance',
                description: 'We deploy the solution to production and provide continuous updates, support, and optimization.',
                icon: <RocketIcon size={24} className="text-accent" />
            }
        ]
    },
    {
        id: 'ai-solutions',
        icon: <BrainIcon size={32} className="text-accent" />,
        type: 'Think',
        title: 'AI Solutions',
        description:
            'Delivering cutting-edge AI technology solutions tailored to your business needs with custom models, seamless integration, and specialized training.',
        Heading: {
            before: "Harness the Power of",
            highlight: "Artificial Intelligence",
        },
        headingBg: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop",
        subHeading: "Delivering cutting-edge AI technology solutions tailored to your business needs with custom models, seamless integration, and specialized training.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        link: '/ai-solutions',
        details: [
            'Machine Learning & Deep Learning Models',
            'Natural Language Processing & Computer Vision',
            'AI Integration & Workflow Automation',
            'Model Optimization & Domain-Specific Training'
        ],
        features: [
            'Custom algorithms with scalable integration',
            'Continuous learning and performance optimization',
            'Secure, explainable, and bias-aware AI',
            'Comprehensive documentation and ongoing support'
        ],
        items: [
            {
                icon: <BrainIcon size={32} className="text-accent" />,
                navIcon: <BrainIcon size={20} className="text-accent" />,
                title: 'AI Model Development',
                id: 'ai-model',
                link: '/ai-solutions',
                description:
                    'Custom AI models designed and trained for your specific business requirements.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Cpolygon points='0,0 0,24 24,24 24,30'/%3E%3Cpolygon points='88,0 88,24 64,24 64,30'/%3E%3C/g%3E%3C/svg%3E\")",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
                details: [
                    'Machine Learning Models',
                    'Deep Learning Networks',
                    'Natural Language Processing',
                    'Computer Vision Systems',
                    'Predictive Analytics Models'
                ],
                features: [
                    'Custom algorithms tailored to your specific use case',
                    'Continuous learning and model improvement',
                    'Explainable AI methodologies',
                    'Performance monitoring and optimization',
                    'Integration with existing business systems'
                ],
                process: [
                    {
                        title: 'Problem Definition',
                        description: 'Clearly defining the business problem and how AI can provide a solution.'
                    },
                    {
                        title: 'Data Collection & Preparation',
                        description: 'Gathering and processing relevant data for model training.'
                    },
                    {
                        title: 'Model Selection & Training',
                        description: 'Choosing appropriate algorithms and training custom models.'
                    },
                    {
                        title: 'Evaluation & Refinement',
                        description: 'Testing model performance and iteratively improving accuracy.'
                    },
                    {
                        title: 'Deployment',
                        description: 'Implementing the model in your production environment.'
                    },
                    {
                        title: 'Monitoring & Updating',
                        description: 'Continuous monitoring and retraining to maintain model accuracy.'
                    }
                ]
            },
            {
                icon: <ServerIcon size={32} className="text-accent" />,
                navIcon: <ServerIcon size={20} className="text-accent" />,
                title: 'AI Integration',
                id: 'ai-integration',
                link: '/ai-solutions',
                description:
                    'Seamlessly integrate AI capabilities into your existing software infrastructure.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234d9fff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'API-based AI Service Integration',
                    'Legacy System AI Enhancement',
                    'Cloud AI Service Implementation',
                    'Real-time Decision Systems',
                    'AI Workflow Automation'
                ],
                features: [
                    'Minimal disruption to existing operations',
                    'Scalable integration architecture',
                    'Secure data handling and processing',
                    'Performance optimization',
                    'Comprehensive documentation and training'
                ],
                process: [
                    {
                        title: 'Assessment',
                        description: 'Evaluating your current systems and identifying integration points for AI.'
                    },
                    {
                        title: 'Architecture Planning',
                        description: 'Designing the technical approach for seamless integration.'
                    },
                    {
                        title: 'Development',
                        description: 'Building the necessary connectors and middleware for AI integration.'
                    },
                    {
                        title: 'Testing',
                        description: 'Ensuring the integrated AI functions correctly with your existing systems.'
                    },
                    {
                        title: 'Deployment',
                        description: 'Implementing the solution in your production environment.'
                    },
                    {
                        title: 'Optimization',
                        description: 'Fine-tuning the integration for maximum performance and business impact.'
                    }
                ]
            },
            {
                icon: <DatabaseIcon size={32} className="text-accent" />,
                navIcon: <DatabaseIcon size={20} className="text-accent" />,
                title: 'AI Training & Fine-tuning',
                id: 'ai-training',
                link: '/ai-solutions',
                description:
                    'Optimize AI models with specialized training and fine-tuning for maximum performance.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'Model Optimization',
                    'Transfer Learning',
                    'Hyperparameter Tuning',
                    'Domain-Specific Training',
                    'Data Augmentation'
                ],
                features: [
                    'Improved model accuracy and performance',
                    'Reduced computational requirements',
                    'Domain-specific knowledge incorporation',
                    'Bias detection and mitigation',
                    'Comprehensive documentation of optimization process'
                ],
                process: [
                    {
                        title: 'Performance Analysis',
                        description: 'Evaluating current model performance and identifying areas for improvement.'
                    },
                    {
                        title: 'Data Enhancement',
                        description: 'Augmenting training data to improve model generalization.'
                    },
                    {
                        title: 'Parameter Optimization',
                        description: 'Fine-tuning model parameters for optimal performance.'
                    },
                    {
                        title: 'Architecture Refinement',
                        description: 'Adjusting model architecture to better suit your specific use case.'
                    },
                    {
                        title: 'Validation',
                        description: 'Rigorous testing to ensure improvements meet business requirements.'
                    },
                    {
                        title: 'Documentation',
                        description: 'Comprehensive documentation of the optimization process for future reference.'
                    }
                ]
            },
        ],
        approach: [
            {
                number: '01',
                title: 'Business Understanding',
                description: 'We analyze your business needs and identify how AI can create value.',
                icon: <LightbulbIcon size={24} className="text-accent" />
            },
            {
                number: '02',
                title: 'Data Assessment',
                description: 'We evaluate available data and determine what is needed for your AI solution.',
                icon: <DatabaseIcon size={24} className="text-accent" />
            },
            {
                number: '03',
                title: 'Solution Design',
                description: 'Our team designs the AI solution architecture and implementation approach.',
                icon: <ServerIcon size={24} className="text-accent" />
            },
            {
                number: '04',
                title: 'Development & Training',
                description: 'We build and train AI models using your data and industry best practices.',
                icon: <BrainIcon size={24} className="text-accent" />
            },
            {
                number: '05',
                title: 'Testing & Validation',
                description: 'Rigorous testing ensures accuracy, performance, and ethical compliance.',
                icon: <ShieldIcon size={24} className="text-accent" />
            },
            {
                number: '06',
                title: 'Deployment & Monitoring',
                description: 'We implement your solution and provide ongoing performance monitoring.',
                icon: <TrendingUpIcon size={24} className="text-accent" />
            }
        ]
    },
    {
        id: 'it-consulting',
        icon: <LightbulbIcon size={32} className="text-accent" />,
        type: 'Guide',
        title: 'IT Consulting',
        description:
            'Expert guidance to align technology with your business strategy, optimize infrastructure, and ensure reliable IT operations.',
        Heading: {
            before: "Strategic Technology",
            highlight: "Guidance",
        },
        headingBg: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop",
        subHeading: "Delivering cutting-edge AI technology solutions tailored to your business needs with custom models, seamless integration, and specialized training.",
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop',
        link: '/it-consulting',
        details: [
            'IT Strategy & Roadmapping',
            'Infrastructure Optimization',
            'IT Support & Issue Resolution',
            'Cloud & Digital Transformation'
        ],
        features: [
            'Align IT with business objectives',
            'Improve reliability and scalability',
            'Enhance security and compliance',
            'Ongoing expert support'
        ],
        items: [
            {
                icon: <LightbulbIcon size={32} className="text-accent" />,
                navIcon: <BrainIcon size={20} className="text-accent" />,
                title: 'IT Strategy & Roadmapping',
                id: 'it-strategy',
                description:
                    'Guiding your business with future-ready technology strategies and actionable roadmaps.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Cpath d='M0 0h30v30H0zM30 30h30v30H30z'/%3E%3C/g%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'Technology Assessments',
                    'Digital Transformation Planning',
                    'Cloud Adoption Strategies',
                    'Scalability Roadmaps',
                    'Cost Optimization Plans'
                ],
                features: [
                    'Align IT initiatives with business goals',
                    'Identify opportunities for innovation',
                    'Future-proof technology investments',
                    'Comprehensive risk management',
                    'Clear, actionable implementation plans'
                ],
                process: [
                    {
                        title: 'Assessment',
                        description: 'We evaluate your current technology landscape and business objectives.'
                    },
                    {
                        title: 'Gap Analysis',
                        description: 'Identifying the gaps between your current state and desired future state.'
                    },
                    {
                        title: 'Strategy Development',
                        description: 'Creating a comprehensive technology strategy aligned with your business goals.'
                    },
                    {
                        title: 'Roadmap Creation',
                        description: 'Developing a phased implementation plan with clear milestones.'
                    },
                    {
                        title: 'Presentation & Refinement',
                        description: 'Presenting the strategy to stakeholders and refining based on feedback.'
                    },
                    {
                        title: 'Implementation Support',
                        description: 'Providing guidance and support during the execution of the roadmap.'
                    }
                ]
            },
            {
                icon: <ServerCogIcon size={32} className="text-accent" />,
                navIcon: <ServerCogIcon size={20} className="text-accent" />,
                title: 'Infrastructure Optimization',
                id: 'it-infrastructure',
                description:
                    'Optimizing and modernizing your IT infrastructure to ensure reliability and performance.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'Cloud Migration',
                    'Network Optimization',
                    'Data Center Modernization',
                    'System Integration',
                    'Disaster Recovery Planning'
                ],
                features: [
                    'Reduce downtime and inefficiencies',
                    'Improve security and compliance',
                    'Enhance scalability and flexibility',
                    'Streamlined operations management',
                    'Long-term cost savings'
                ],
                process: [
                    {
                        title: 'Infrastructure Assessment',
                        description: 'Evaluating your current infrastructure for performance, reliability, and security.'
                    },
                    {
                        title: 'Requirements Analysis',
                        description: 'Identifying your business needs and technical requirements.'
                    },
                    {
                        title: 'Solution Design',
                        description: 'Designing an optimized infrastructure architecture.'
                    },
                    {
                        title: 'Implementation Planning',
                        description: 'Creating a detailed migration and implementation plan.'
                    },
                    {
                        title: 'Execution',
                        description: 'Implementing the infrastructure changes with minimal disruption.'
                    },
                    {
                        title: 'Monitoring & Optimization',
                        description: 'Ongoing monitoring and continuous improvement of your infrastructure.'
                    }
                ]
            },
            {
                icon: <LifeBuoyIcon size={32} className="text-accent" />,
                navIcon: <LifeBuoyIcon size={20} className="text-accent" />,
                title: 'IT Support & Issue Resolution',
                id: 'it-support',
                description:
                    'Providing expert support to resolve technical challenges and maintain business continuity.',
                bgPattern:
                    "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234d9fff' fill-opacity='0.05'%3E%3Cpath d='M26 13a13 13 0 1 1-26 0 13 13 0 0 1 26 0zM52 13a13 13 0 1 1-26 0 13 13 0 0 1 26 0z'/%3E%3C/g%3E%3C/svg%3E\")",
                image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2000&auto=format&fit=crop',
                details: [
                    'Helpdesk Support',
                    'System Troubleshooting',
                    'Performance Monitoring',
                    'Proactive Maintenance',
                    'Vendor & Licensing Management'
                ],
                features: [
                    'Rapid response to critical issues',
                    'Minimized downtime and disruptions',
                    'End-to-end user support',
                    'Continuous monitoring and improvements',
                    'Clear communication and reporting'
                ],
                process: [
                    {
                        title: 'Issue Identification',
                        description: 'Quickly identifying and categorizing technical issues.'
                    },
                    {
                        title: 'Triage & Prioritization',
                        description: 'Assessing impact and prioritizing issues based on business needs.'
                    },
                    {
                        title: 'Resolution',
                        description: 'Implementing effective solutions to resolve issues.'
                    },
                    {
                        title: 'Documentation',
                        description: 'Documenting the issue and resolution for future reference.'
                    },
                    {
                        title: 'Root Cause Analysis',
                        description: 'Identifying underlying causes to prevent recurrence.'
                    },
                    {
                        title: 'Preventive Measures',
                        description: 'Implementing measures to prevent similar issues in the future.'
                    }
                ]
            },
        ],
        approach: [
            {
                number: '01',
                title: 'Assessment & Discovery',
                description:
                    'We begin by analyzing your current IT environment, understanding business goals, and identifying challenges or inefficiencies.',
                icon: <SearchIcon size={24} className="text-accent" />
            },
            {
                number: '02',
                title: 'Strategic Planning',
                description:
                    'Our experts develop a tailored IT strategy that aligns technology investments with long-term business objectives.',
                icon: <TargetIcon size={24} className="text-accent" />
            },
            {
                number: '03',
                title: 'Solution Design',
                description:
                    'We architect scalable, secure, and efficient solutions designed to optimize your IT operations and infrastructure.',
                icon: <Settings2Icon size={24} className="text-accent" />
            },
            {
                number: '04',
                title: 'Implementation Guidance',
                description:
                    'We support your team through the deployment process, ensuring seamless integration and minimal business disruption.',
                icon: <CompassIcon size={24} className="text-accent" />
            },
            {
                number: '05',
                title: 'Performance Optimization',
                description:
                    'Through continuous monitoring and refinement, we enhance your systems for reliability, scalability, and cost efficiency.',
                icon: <GaugeIcon size={24} className="text-accent" />
            },
            {
                number: '06',
                title: 'Ongoing Support & Advisory',
                description:
                    'We provide continuous IT consulting, updates, and innovation guidance to keep your business ahead of technological change.',
                icon: <HandshakeIcon size={24} className="text-accent" />
            }
        ]
    },
]


interface ServiceCardProps {
    icon: ReactElement;
    title: string;
    description: string;
    bgPattern: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, bgPattern }) => {
    return (
        <div className="bg-secondary-charcoal/50 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group hover:shadow-lg hover:shadow-accent/5 relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-30 transition-opacity group-hover:opacity-100"
                style={{
                    backgroundImage: bgPattern,
                }}
                aria-hidden="true"
            ></div>
            {/* Content */}
            <div className="relative z-10">
                <div className="flex justify-start space-x-4 items-center">
                    <div className="p-3 bg-primary/30 rounded-lg inline-block mb-2 group-hover:bg-primary/50 transition-colors">
                        {cloneElement(icon, {
                            "aria-hidden": true,
                        })}
                    </div>
                    <h3 className="text-xl font-semibold mb-0 group-hover:text-accent transition-colors">
                        {title}
                    </h3>
                </div>
                <p className="text-secondary-silver mb-4">{description}</p>
            </div>
            {/* Corner accent */}
            <div
                className="absolute -top-10 -right-10 w-20 h-20 bg-accent/5 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"
                aria-hidden="true"
            ></div>
        </div>
    )
}
const Services = () => {
    return (
        <>
            <section
                id="services"
                className="relative pt-20 pb-10 md:pb-20 overflow-hidden bg-gradient-to-b from-black to-primary/10"
                aria-labelledby="services-heading"
            >
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
                        {OurServices.map((service, index) => (
                            <section
                                key={service.id}
                                id={service.id}
                                className="relative py-8 overflow-hidden"
                                aria-labelledby={`${service.id}-heading`}
                            >
                                <div className="absolute inset-0" aria-hidden="true">
                                    <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
                                </div>
                                <div className="container mx-auto px-4 relative z-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                        <div className={`order-2 lg:order-2}`}>
                                            <div className="grid grid-cols-1 gap-4">
                                                {service?.items.map((serviceItem, index) => (
                                                    <ServiceCard key={index} {...serviceItem} />
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            className={`order-1 ${service.id === 'mobile-app' || service.id === 'ai-model' || service.id === 'ai-training' ? 'lg:order-2' : 'lg:order-1'}`}
                                        >
                                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                                                {service.type}
                                            </div>
                                            <h2
                                                id={`${service.id}-heading`}
                                                className="text-4xl font-bold mb-6"
                                            >
                                                {service.title.split(' ')[0]}{' '}
                                                <span className="text-accent relative inline-block">
                                                    {service.title.split(' ').slice(1).join(' ')}
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
                                                {service.description}
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
                                                    {service.details.map((detail, index) => (
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
                                                    {service.features.map((feature, index) => (
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
                                                href={service.link}
                                                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                                                aria-label={`Learn more about ${service.title}`}
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
            </section>
        </>
    )
}
export default Services
