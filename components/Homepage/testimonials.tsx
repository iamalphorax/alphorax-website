export default function Testimonials({ data }: {
    data: {
        sectionTitle: string;
        sectionSubtitle: string;
        heading: { before: string; highlight: string; after: string };
        testimonials: { quote: string; author: string; position: string }[];
    };
}) {
    return (
        <section
            className="relative py-20 overflow-hidden"
            aria-labelledby="testimonials-heading"
        >
            <div
                className="absolute inset-0 bg-neural-pattern opacity-10"
                aria-hidden="true"
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
                aria-hidden="true"
            ></div>
            {/* Geometric accents */}
            <div
                className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-[pulse_15s_infinite]"
                aria-hidden="true"
            ></div>
            <div
                className="absolute bottom-20 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-[pulse_10s_infinite_2s]"
                aria-hidden="true"
            ></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                        {data?.sectionTitle}
                    </div>
                    <h2 id="testimonials-heading" className="text-4xl font-bold mb-4">
                        {data?.heading?.before}{" "}
                        <span className="text-accent relative inline-block">
                            {data?.heading?.highlight}
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
                        </span>{' '}
                        {data?.heading?.after}
                    </h2>
                    <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                        {data?.sectionSubtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.testimonials?.map((t, index) => (
                        <div
                            key={index}
                            className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group relative overflow-hidden"
                        >
                            <div
                                className="absolute top-0 right-0 w-20 h-20 bg-accent/5 transform -translate-x-1/2 translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-hidden="true"
                            ></div>
                            <div className="relative z-10">
                                <svg
                                    className="w-10 h-10 text-accent/30 mb-4"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                    role="img"
                                    aria-label="Quotation mark"
                                >
                                    <path d="M10 8v6a6 6 0 01-6 6H2v4c4.86 0 8.2-1.5 10-4.5V28H2V8h8zm18 0v6a6 6 0 01-6 6h-2v4c4.86 0 8.2-1.5 10-4.5V28H20V8h8z" />
                                </svg>
                                <blockquote>
                                    <p className="text-secondary-silver mb-6 italic">
                                        &ldquo;{t?.quote}&rdquo;
                                    </p>
                                    <footer>
                                        <cite>
                                            <div className="flex items-center">
                                                <div>
                                                    <h4 className="font-semibold group-hover:text-accent transition-colors">
                                                        {t?.author}
                                                    </h4>
                                                    <p className="text-sm text-secondary-silver">
                                                        {t?.position}
                                                    </p>
                                                </div>
                                            </div>
                                        </cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
