import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { ProjectsData } from '@/types/services';

const FeaturedProjects = ({ data }: { data: ProjectsData }) => {
    const projectsContent = data?.projects;

    return (
        <section
            className="relative py-24 overflow-hidden"
            aria-labelledby="projects-heading"
        >
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                        {projectsContent?.badge || "Success Stories"}
                    </div>
                    <h2 id="projects-heading" className="text-4xl font-bold mb-4">
                        {projectsContent?.title?.before}{' '}
                        <span className="text-accent relative inline-block">
                            {projectsContent?.title?.highlight}
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
                    <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                        {projectsContent?.description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsContent?.items?.map((project, index) => (
                        <div
                            key={index}
                            className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-accent/10 transition-all border border-secondary-silver/10 hover:border-accent/30"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"
                                    aria-hidden="true"
                                ></div>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-accent/80 mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-secondary-silver mb-4">
                                    {project.description}
                                </p>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center text-accent text-sm font-medium focus:outline-none focus:underline focus:text-accent/80"
                                    aria-label={`View case study for ${project.title}`}
                                >
                                    View case study
                                    <ArrowRightIcon
                                        size={14}
                                        className="ml-1 group-hover:ml-2 transition-all"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
