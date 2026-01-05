'use client'

import { Service } from '@/types/services'
import { RenderIcon } from '@/components/shared/RenderIcon';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServicesHero: React.FC<{ services: Service[], hero: any }> = ({ services, hero }) => {

    return (
        <section className="relative pt-20 pb-10 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-30" style={{ backgroundImage: `url(${hero?.headingBg})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex gap-2 px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                        <RenderIcon icon={hero?.badge?.icon} />
                        {hero?.badge?.text}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        {hero?.heading?.before}{' '}
                        <span className="text-accent relative inline-block">
                            {hero?.heading?.highlight}
                            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 220 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0,3 C55,1 165,6 220,3" stroke="rgba(77, 159, 255, 0.5)" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary-silver mb-8">
                        {hero?.subHeading}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-16">
                    {services?.map((service) => (
                        <a key={service?.id} href={`#${service?.id}`} className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-2 px-0 text-center border border-secondary-silver/10 hover:border-accent/30 hover:bg-secondary-charcoal/50 transition-all group flex justify-center items-center gap-4">
                            <div className="p-1.5 bg-primary/20 rounded-lg inline-block group-hover:bg-primary/40 transition-colors">
                                <RenderIcon icon={service?.icon} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesHero 