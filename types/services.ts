export interface ServicesConfig {
  services: Service[];
}

/** Represents a high-level service like "Project Development" */
export interface Service {
  id: string;
  icon: string;
  type: string;
  title: string;
  name: string;
  description: string;
  heading: Heading;
  headingBg: string;
  subHeading?: string;
  link: string;
  image: string;
  details: string[];
  features: string[];
  items: ServiceItem[];
  approach: ServiceApproach[];
}

/** Represents the highlighted heading structure */
export interface Heading {
  before: string;
  highlight: string;
}

/** Represents each sub-item under a main service, like "Full-Stack Development" */
export interface ServiceItem {
  id: string;
  icon: string;
  navIcon?: string;
  title: string;
  link: string;
  description: string;
  bgPattern?: string;
  image?: string;
  details?: string[];
  features?: string[];
  process?: ServiceProcess[];
}

/** Represents the process steps for service items */
export interface ServiceProcess {
  title: string;
  description: string;
}

/** Represents structured "approach" elements under each service */
export interface ServiceApproach {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroData {
  hero: {
    badge: string;
    title: {
      before: string;
      highlight: string;
      after: string;
    };
    description: string;
    cta: {
      primary: {
        text: string;
        link: string;
      };
      secondary: {
        text: string;
        link: string;
      };
    };
  };
}

export interface AboutData {
  about: {
    badge: string;
    title: {
      before: string;
      highlight: string;
      after: string;
    };
    description: string;
    mission: string;
    vision: string;
    values: string;
    points: string[];
    techStack: {
      name: string;
      src: string;
    }[];
  };
}

export interface ProjectsData {
  projects: {
    badge: string;
    title: {
      before: string;
      highlight: string;
    };
    description: string;
    items: {
      title: string;
      category: string;
      image: string;
      description: string;
    }[];
  };
}

export interface CTAData {
  cta: {
    title: {
      before: string;
      highlight: string;
    };
    description: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta: {
      text: string;
      link: string;
    };
  };
}

export interface FAQSection {
  topic: string;
  bgImage: string;
  title: {
    main: string;
    submain: string;
  };
  description: string;
  questions: {
    question: string;
    answer: string;
  }[];
  cta: {
    text: string;
    buttonText: string;
    link: string;
  };
}
