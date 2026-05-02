"use client";

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import {
  MailIcon,
  PhoneIcon,
  SendIcon,
  CheckIcon,
  MessageSquareIcon,
  GlobeIcon,
  VideoIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  CalendarIcon,
  XIcon,
  LightbulbIcon,
  FileTextIcon,
  TargetIcon,
} from "lucide-react";
import {
  generateOrganizationSchema,
  generateContactPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
);
const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  services: string[];
}

const ContactPage = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    services: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  // Ref for the Calendly widget container inside the modal
  const calendlyRef = useRef<HTMLDivElement>(null);

  // Preload the Calendly script as soon as the contact page mounts
  useEffect(() => {
    const scriptId = "calendly-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Initialise the inline widget each time the modal opens
  useEffect(() => {
    if (!isMeetingModalOpen || !calendlyRef.current) return;
    // Small delay to ensure the modal div is painted before Calendly scans it
    const timer = setTimeout(() => {
      const win = window as unknown as {
        Calendly?: {
          initInlineWidget: (opts: {
            url: string;
            parentElement: HTMLElement;
          }) => void;
        };
      };
      if (win.Calendly && calendlyRef.current) {
        // Clear any previous render before re-initialising
        calendlyRef.current.innerHTML = "";
        win.Calendly.initInlineWidget({
          url: "https://calendly.com/alphorax-ltd/30min?hide_event_type_details=1&hide_gdpr_banner=1",
          parentElement: calendlyRef.current,
        });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isMeetingModalOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const checked = checkbox.checked;
      const val = checkbox.value;

      const updatedServices = checked
        ? [...formState.services, val]
        : formState.services.filter((service) => service !== val);

      setFormState((prev) => ({
        ...prev,
        services: updatedServices,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          services: [],
        });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        console.error("Form error:", errorData);
        alert(errorData.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Generate schema markup
  const organizationSchema = generateOrganizationSchema();
  const pageSchema = generateContactPageSchema();

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script {...getJsonLdProps(organizationSchema)} />
      <script {...getJsonLdProps(pageSchema)} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                Get In Touch
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Let&apos;s Start a{" "}
                <span className="text-accent relative inline-block">
                  Conversation
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 180 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,3 C45,1 135,6 180,3"
                      stroke="rgba(77, 159, 255, 0.5)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-silver mb-8 max-w-2xl">
                Ready to explore how AI can transform your business? Our team is
                here to help you get started.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: <MailIcon size={24} className="text-accent" />,
                  title: "Email Us",
                  content: "info@alphorax.com",
                  description: "For general inquiries and information",
                  link: "mailto:info@alphorax.com",
                },
                {
                  icon: <PhoneIcon size={24} className="text-accent" />,
                  title: "Call Us",
                  content: "+2348139015905",
                  description: "Monday to Friday, 9am - 6pm EST",
                  link: "tel:+2348139015905",
                },
                {
                  icon: <MessageCircleIcon size={24} className="text-accent" />,
                  title: "WhatsApp Us",
                  content: "+1 (639) 852-5168",
                  description: "Flexible hours across all time zones",
                  link: "https://wa.me/16398525168",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 text-center border border-secondary-silver/10 hover:border-accent/30 hover:bg-secondary-charcoal/50 transition-all group"
                >
                  <div className="p-3 bg-primary/20 rounded-lg inline-block mb-4 group-hover:bg-primary/40 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-white font-medium mb-2">
                    {item.content}
                  </div>
                  <p className="text-secondary-silver text-sm">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-20 overflow-hidden" id="contact-form">
          <div className="absolute inset-0 bg-neural-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-8 border border-secondary-silver/10 hover:border-accent/20 transition-all group">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <MessageSquareIcon size={24} className="text-accent mr-3" />
                  Send Us a Message
                </h2>
                {isSubmitted ? (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
                      <CheckIcon className="text-accent" size={32} />
                    </div>
                    <h4 className="text-2xl font-medium mb-3">Message Sent!</h4>
                    <p className="text-secondary-silver mb-6">
                      Thank you for reaching out to us. One of our team members
                      will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-secondary-silver"
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-secondary-silver"
                        >
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-secondary-silver"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block mb-2 text-sm font-medium text-secondary-silver"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block mb-2 text-sm font-medium text-secondary-silver"
                      >
                        Subject*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-secondary-silver"
                      >
                        Message*
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white resize-none"
                        placeholder="Tell us about your project or inquiry..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 w-full flex items-center justify-center ${isSubmitting ? "opacity-80" : ""}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <SendIcon size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Digital Presence Information - Replacing physical offices */}
              <div>
                {/* Setup a Meeting - separate card */}
                <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all mb-10">
                  {/* <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CalendarIcon size={20} className="text-accent mr-2" />
                    Setup a Meeting
                  </h3> */}
                  <h2 className="text-3xl font-bold mb-8 flex items-center">
                    <CalendarIcon size={24} className="text-accent mr-2" />
                    Setup a Meeting
                  </h2>
                  <p className="text-secondary-silver mb-6">
                    Prefer a live conversation? Book a <span className="font-bold text-white">FREE </span>30 minutes discovery
                    call with our team at a time that suits you.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      {
                        icon: <CalendarIcon size={18} className="text-accent" />,
                        label: "30 Minutes Discovery Call",
                      },
                      {
                        icon: <VideoIcon size={18} className="text-accent" />,
                        label: "Video or Audio",
                      },
                      {
                        icon: <HeadphonesIcon size={18} className="text-accent" />,
                        label: "Expert Consultation",
                      },
                      {
                        icon: <TargetIcon size={18} className="text-accent" />,
                        label: "Tailored Solutions",
                      },
                      {
                        icon: <LightbulbIcon size={18} className="text-accent" />,
                        label: "Strategic Insights",
                      },
                      {
                        icon: <FileTextIcon size={18} className="text-accent" />,
                        label: "Clear Action Plan",
                      },
                      {
                        icon: <CheckIcon size={18} className="text-accent" />,
                        label: "No commitment required",
                      },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-secondary-silver">
                        <span className="flex-shrink-0">{feat.icon}</span>
                        {feat.label}
                      </div>
                    ))}
                  </div>
                  <button
                    id="open-meeting-modal"
                    onClick={() => setIsMeetingModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 font-medium"
                  >
                    <CalendarIcon size={18} />
                    Book a Free 30 Minutes Call
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <GlobeIcon size={24} className="text-accent mr-3" />
                  Our Digital Presence
                </h2>
                {/* Social Media Section */}
                <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Connect With Us
                  </h3>
                  <p className="text-secondary-silver mb-6">
                    Follow us on social media to stay updated with our latest
                    projects, insights, and company news.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "LinkedIn",
                        icon: <LinkedinIcon size={24} className="text-white" />,
                        username: "@alphoraxltd",
                        color: "bg-[#0077B5]",
                        url: "https://www.linkedin.com/company/alphoraxltd",
                      },
                      {
                        name: "Facebook",
                        icon: <FacebookIcon size={24} className="text-white" />,
                        username: "@alphoraxltd",
                        color: "bg-[#1877F2]",
                        url: "https://facebook.com/alphoraxltd",
                      },
                      {
                        name: "Twitter",
                        icon: <TwitterIcon size={24} className="text-white" />,
                        username: "@alphorax_ai",
                        color: "bg-[#1DA1F2]",
                        url: "#",
                      },
                      {
                        name: "Instagram",
                        icon: (
                          <InstagramIcon size={24} className="text-white" />
                        ),
                        username: "@alphorax.ai",
                        color:
                          "bg-gradient-to-tr from-[#fa7e1e] via-[#d62976] to-[#4f5bd5]",
                        url: "#",
                      },
                      {
                        name: "GitHub",
                        icon: <GithubIcon size={24} className="text-white" />,
                        username: "@alphorax-tech",
                        color: "bg-[#333]",
                        url: "#",
                      },
                      {
                        name: "YouTube",
                        icon: <YoutubeIcon size={24} className="text-white" />,
                        username: "AlphoraxAI",
                        color: "bg-[#FF0000]",
                        url: "#",
                      },
                    ].map((platform, index) => {
                      const isClickable = platform.url !== "#";

                      if (!isClickable) {
                        return (
                          <div
                            key={index}
                            className="flex items-center p-3 rounded-lg border border-secondary-silver/10 opacity-60 cursor-not-allowed"
                          >
                            <div
                              className={`${platform.color} p-2 rounded-md mr-3 flex-shrink-0 grayscale`}
                            >
                              {platform.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-secondary-silver">
                                {platform.name}
                              </h4>
                              <p className="text-secondary-silver/50 text-sm">
                                Coming soon
                              </p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <a
                          key={index}
                          href={platform.url}
                          className="flex items-center p-3 rounded-lg border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            className={`${platform.color} p-2 rounded-md mr-3 flex-shrink-0`}
                          >
                            {platform.icon}
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-accent transition-colors">
                              {platform.name}
                            </h4>
                            <p className="text-secondary-silver text-sm">
                              {platform.username}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                </div>


              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked{" "}
                  <span className="text-accent">Questions</span>
                </h2>
                <p className="text-lg text-secondary-silver">
                  Find answers to common questions about working with us
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    question: "What happens after I submit my inquiry?",
                    answer:
                      "After submitting your inquiry, you'll receive an automated confirmation email. Our team will review your message and contact you within 1-2 business days to discuss your needs in more detail and answer any initial questions.",
                  },
                  {
                    question:
                      "Do you offer consultations before starting a project?",
                    answer:
                      "Yes, we offer complimentary initial consultations to understand your needs and determine how our services can best address your challenges. For more in-depth technical assessments, we provide detailed discovery workshops as part of our project planning process.",
                  },
                  {
                    question:
                      "What information should I prepare before our first meeting?",
                    answer:
                      "To make our first meeting as productive as possible, it's helpful to have a general understanding of your project goals, timeline, budget parameters, and any specific technical requirements or challenges. Don't worry if you don't have all the details—we're here to help you clarify your needs.",
                  },
                  {
                    question: "How do you handle confidential information?",
                    answer:
                      "We take data security and confidentiality very seriously. All client communications and information are protected under strict NDAs. We implement industry-standard security protocols and are happy to sign custom confidentiality agreements before discussing sensitive project details.",
                  },
                  {
                    question: "Can you work with clients remotely?",
                    answer:
                      "Absolutely. We have extensive experience working with clients globally through virtual meetings, collaborative tools, and regular progress updates. Our remote collaboration process is seamless and effective, allowing us to deliver exceptional service regardless of geographic location.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all"
                  >
                    <h3 className="text-xl font-semibold mb-3 flex items-start">
                      <span className="text-accent mr-3">Q.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-secondary-silver pl-6 ml-3 border-l border-accent/30">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Calendly Meeting Modal */}
      {isMeetingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a Meeting"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMeetingModalOpen(false)}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-secondary-charcoal rounded-2xl border border-accent/20 shadow-2xl shadow-accent/10 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-secondary-silver/10 bg-secondary-charcoal/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <CalendarIcon size={20} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Schedule a Meeting</h2>
                  <p className="text-secondary-silver text-xs">Pick a time that works for you — 15 min discovery call</p>
                </div>
              </div>
              <button
                id="close-meeting-modal"
                onClick={() => setIsMeetingModalOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary-silver/10 transition-colors text-secondary-silver hover:text-white"
                aria-label="Close meeting scheduler"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Calendly inline widget */}
            <div className="flex-1 overflow-auto">
              <div
                ref={calendlyRef}
                className="calendly-inline-widget"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPage;
