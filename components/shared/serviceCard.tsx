import { ServiceItem } from '@/types/services'
import { RenderIcon } from '@/components/shared/RenderIcon'


const ServiceCard: React.FC<ServiceItem> = ({ icon, title, description, bgPattern }) => {
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
                        <RenderIcon icon={icon} />
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
};

export default ServiceCard;