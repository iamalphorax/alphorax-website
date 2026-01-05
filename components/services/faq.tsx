'use client'

import Link from "next/link";
import { FAQSection } from '@/types/services'
const ServicesFaq: React.FC<{ faq: FAQSection }> = ({ faq }) => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-50" style={{ backgroundImage: `url(${faq?.bgImage})` }} ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="w-full mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                            {faq?.topic}
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            {faq?.title?.main}{' '}
                            <span className="text-accent">{faq?.title?.submain}</span>
                        </h2>
                        <p className="text-lg text-secondary-silver">
                            {faq?.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faq?.questions?.map((faq, index) => (
                            <div key={index} className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all w-full">
                                <h3 className="text-xl font-semibold mb-3 flex items-start">
                                    <span className="text-accent mr-3">Q.</span>
                                    <span>{faq?.question}</span>
                                </h3>
                                <p className="text-secondary-silver pl-6 ml-3 border-l border-accent/30">
                                    {faq?.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-secondary-silver mb-6">
                            {faq?.cta?.text}
                        </p>
                        <Link href={faq?.cta?.link} className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group">
                            <span> {faq?.cta?.buttonText}</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesFaq 