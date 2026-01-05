export interface IndustryItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon?: string;
}

export interface IndustriesSection {
    badge: string;
    title: {
        before: string;
        highlighted: string;
    };
    description: string;
    items: IndustryItem[];
}
