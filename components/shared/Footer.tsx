"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SendIcon } from "lucide-react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative pt-20 pb-5 mb:pb-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-neural-pattern opacity-5"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      ></div>
      {/* Decorative elements */}
      <div
        className="absolute top-10 left-10 w-20 h-20 bg-accent/5 rounded-full blur-xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-10 right-10 w-16 h-16 bg-primary/10 rounded-full blur-xl"
        aria-hidden="true"
      ></div>
      {/* Circuit lines */}
      <svg
        className="absolute top-0 left-0 w-full opacity-10"
        viewBox="0 0 1440 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,25 L240,25 L280,10 L320,40 L360,25 L1440,25"
          stroke="rgba(77, 159, 255, 0.5)"
          strokeWidth="1"
        />
        <circle cx="240" cy="25" r="3" fill="rgba(77, 159, 255, 0.8)" />
        <circle cx="360" cy="25" r="3" fill="rgba(77, 159, 255, 0.8)" />
      </svg>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-6 group">
              <div className="relative">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-70 blur transition duration-300"
                  aria-hidden="true"
                ></div>
                <div className="relative">
                  <img
                    src="/logo_512_512.png"
                    alt="Alphorax Logo"
                    className="h-10 w-auto"
                  />
                </div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accent/80">
                  Alphorax
                </span>
              </div>
            </div>
            <p className="text-secondary-silver mb-6">
              Smart AI, reliable software, trusted IT consulting.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              {[
                {
                  link: "https://twitter.com/alphoraxltd",
                  name: "twitter",
                  icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                },
                {
                  link: "https://linkedin.com/company/alphoraxltd",
                  name: "linkedin",
                  icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
                },
                {
                  link: "https://instagram.com/alphoraxltd",
                  name: "instagram",
                  icon: "M17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 12.5a3 3 0 110-6 3 3 0 010 6z",
                },

                {
                  link: "https://facebook.com/alphoraxltd",
                  name: "facebook",
                  icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary-charcoal/50 rounded-full hover:bg-primary/30 transition-colors border border-secondary-silver/10 hover:border-accent/30 group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <svg
                    className="w-4 h-4 text-secondary-silver group-hover:text-accent transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-between lg:col-span-2">
            {/* Resources */}
            <div className="w-1/2">
              <h4 className="text-lg font-semibold mb-6 relative inline-block">
                Resources
                <span
                  className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent/50"
                  aria-hidden="true"
                ></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#services"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="/projects"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div className="w-1/2">
              <h4 className="text-lg font-semibold mb-6 relative inline-block">
                Company
                <span
                  className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent/50"
                  aria-hidden="true"
                ></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press-release"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Press Release
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-secondary-silver hover:text-accent transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    <span className="w-1 h-1 bg-accent/50 rounded-full mr-2"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Newsletter */}
          <div className="lg:col-span-1 md:col-span-2">
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Stay Updated
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent/50"
                aria-hidden="true"
              ></span>
            </h4>
            <p className="text-secondary-silver mb-4">
              Get latest updates in your inbox.
            </p>
            {isSubmitted ? (
              <div className="bg-accent/10 border border-accent/20 rounded-md p-3 text-sm text-accent animate-in fade-in duration-300">
                Successfully subscribed!
              </div>
            ) : (
              <form className="flex" aria-label="Newsletter subscription form" onSubmit={handleSubmit}>
                <label htmlFor="email-subscription" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-subscription"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-4 py-2 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white flex-grow"
                  aria-required="true"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-shrink-0 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-r-md border border-accent/20 hover:border-accent transition-all relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  <span
                    className="absolute inset-0 w-0 bg-accent/10 group-hover:w-full transition-all duration-300"
                    aria-hidden="true"
                  ></span>
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin z-10" />
                  ) : (
                    <SendIcon
                      size={18}
                      className="relative z-10"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </form>
            )}
            {/* Certifications */}
            <div className="mt-6 hidden items-center flex-column">
              <p className="text-sm text-secondary-silver">Our Product:</p>
              <div className="mt-2 flex items-center space-x-4">
                <div className="p-2 bg-secondary-charcoal/30 rounded-md">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                    alt="IBM Partner"
                    className="h-6 w-auto opacity-70"
                  />
                </div>
                <div className="p-2 bg-secondary-charcoal/30 rounded-md">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="AWS Partner"
                    className="h-6 w-auto opacity-70"
                  />
                </div>
                <div className="p-2 bg-secondary-charcoal/30 rounded-md">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
                    alt="Azure Partner"
                    className="h-6 w-auto opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-secondary-silver/10 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-secondary-silver text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Alphorax LTD. All rights reserved.
          </p>
          <div className="flex sm:flex-row flex-col items-center space-x-0 sm:space-x-8">
            <div className="flex space-x-3 sm:space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-secondary-silver hover:text-accent transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
