"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
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
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  GithubIcon,
  YoutubeIcon,
} from "lucide-react";
import {
  generateOrganizationSchema,
  generateContactPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

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
                        username: "@alphorax",
                        color: "bg-[#0077B5]",
                        url: "https://linkedin.com/company/alphorax",
                      },
                      {
                        name: "Twitter",
                        icon: <TwitterIcon size={24} className="text-white" />,
                        username: "@alphorax_ai",
                        color: "bg-[#1DA1F2]",
                        url: "https://twitter.com/alphorax_ai",
                      },
                      {
                        name: "Instagram",
                        icon: (
                          <InstagramIcon size={24} className="text-white" />
                        ),
                        username: "@alphorax.ai",
                        color:
                          "bg-gradient-to-tr from-[#fa7e1e] via-[#d62976] to-[#4f5bd5]",
                        url: "https://instagram.com/alphorax.ai",
                      },
                      {
                        name: "GitHub",
                        icon: <GithubIcon size={24} className="text-white" />,
                        username: "@alphorax-tech",
                        color: "bg-[#333]",
                        url: "https://github.com/alphorax-tech",
                      },
                      {
                        name: "YouTube",
                        icon: <YoutubeIcon size={24} className="text-white" />,
                        username: "AlphoraxAI",
                        color: "bg-[#FF0000]",
                        url: "https://youtube.com/c/AlphoraxAI",
                      },
                      {
                        name: "Facebook",
                        icon: <FacebookIcon size={24} className="text-white" />,
                        username: "@alphorax.official",
                        color: "bg-[#1877F2]",
                        url: "https://facebook.com/alphorax.official",
                      },
                    ].map((platform, index) => (
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
                    ))}
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
    </>
  );
};

export default ContactPage;
