"use client";

import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  CodeIcon,
  BrainIcon,
  ServerCogIcon,
} from "lucide-react";
import Link from "next/link";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleServicesToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsServicesMenuOpen(!isServicesMenuOpen);
  };
  // Close services menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isServicesMenuOpen && !target.closest(".services-menu-container")) {
        setIsServicesMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesMenuOpen]);
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrollPosition > 50 ? "bg-secondary-charcoal/80 backdrop-blur-md py-2 shadow-lg shadow-accent/10" : "bg-gradient-to-r from-secondary-charcoal/90 to-primary/80 backdrop-blur-sm py-4"}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary-charcoal/80 to-primary/80"
          aria-hidden="true"
        ></div>
      </div>
      <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center group"
            aria-label="Alphorax - Home"
          >
            <div className="relative">
              <div
                className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-full opacity-70 group-hover:opacity-100 blur transition duration-300 hidden"
                aria-hidden="true"
              ></div>
              <div className="relative">
                <img
                  src="/logo_512_512.png"
                  alt="Alphorax Logo"
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <div className="ml-3">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accent/80 flex items-center">
                Alphorax
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-5 ml-8"
            aria-label="Main Navigation"
          >
            <Link
              href="/"
              className="font-medium hover:text-accent transition-colors relative group overflow-hidden px-2 py-1"
              aria-label="Navigate to Home"
            >
              <span className="relative z-10">Home</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                aria-hidden="true"
              ></span>
              <span
                className="absolute inset-0 w-full h-full bg-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"
                aria-hidden="true"
              ></span>
            </Link>
            {/* Services Dropdown */}
            <div className="relative services-menu-container">
              <button
                onClick={handleServicesToggle}
                className="font-medium hover:text-accent transition-colors relative group overflow-hidden px-2 py-1 flex items-center"
                aria-expanded={isServicesMenuOpen}
                aria-haspopup="true"
                aria-label="Services Menu"
              >
                <span className="relative z-10">Services</span>
                <ChevronDownIcon
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${isServicesMenuOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  aria-hidden="true"
                ></span>
                <span
                  className="absolute inset-0 w-full h-full bg-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"
                  aria-hidden="true"
                ></span>
              </button>
              {/* Services Dropdown Menu */}
              {isServicesMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-96 rounded-xl overflow-hidden shadow-2xl shadow-black/40 bg-gradient-to-br from-secondary-charcoal via-secondary-charcoal/95 to-primary/5 backdrop-blur-md border border-accent/30 transition-all duration-300 z-50"
                  aria-label="Services submenu"
                >
                  <div className="p-6">
                    <h3 className="text-xs font-semibold text-accent mb-4 uppercase tracking-widest">
                      Explore Our Services
                    </h3>
                    <div className="space-y-3">
                      {/* Project Development */}
                      <Link
                        href="/services/project-development"
                        className="block p-4 rounded-lg bg-secondary-charcoal/50 hover:bg-accent/15 hover:border-accent/50 border border-accent/10 transition-all duration-300 group"
                        onClick={() => setIsServicesMenuOpen(false)}
                      >
                        <div className="flex items-start">
                          <div className="p-2.5 bg-gradient-to-br from-primary/40 to-accent/20 rounded-lg mr-3 group-hover:from-primary/60 group-hover:to-accent/30 transition-colors flex-shrink-0">
                            <CodeIcon size={18} className="text-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-white group-hover:text-accent transition-colors">
                              Project Development
                            </h4>
                            <p className="text-xs text-secondary-silver mt-1 group-hover:text-secondary-silver/90 transition-colors">
                              Custom software & web solutions
                            </p>
                          </div>
                          <ChevronDownIcon
                            size={14}
                            className="text-accent/50 group-hover:text-accent rotate-[-90deg] group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                          />
                        </div>
                      </Link>
                      {/* AI Solutions */}
                      <Link
                        href="/services/ai-solutions"
                        className="block p-4 rounded-lg bg-secondary-charcoal/50 hover:bg-accent/15 hover:border-accent/50 border border-accent/10 transition-all duration-300 group"
                        onClick={() => setIsServicesMenuOpen(false)}
                      >
                        <div className="flex items-start">
                          <div className="p-2.5 bg-gradient-to-br from-primary/40 to-accent/20 rounded-lg mr-3 group-hover:from-primary/60 group-hover:to-accent/30 transition-colors flex-shrink-0">
                            <BrainIcon size={18} className="text-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-white group-hover:text-accent transition-colors">
                              AI Solutions
                            </h4>
                            <p className="text-xs text-secondary-silver mt-1 group-hover:text-secondary-silver/90 transition-colors">
                              ML models & AI integration
                            </p>
                          </div>
                          <ChevronDownIcon
                            size={14}
                            className="text-accent/50 group-hover:text-accent rotate-[-90deg] group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                          />
                        </div>
                      </Link>
                      {/* IT Consulting */}
                      <Link
                        href="/services/it-consulting"
                        className="block p-4 rounded-lg bg-secondary-charcoal/50 hover:bg-accent/15 hover:border-accent/50 border border-accent/10 transition-all duration-300 group"
                        onClick={() => setIsServicesMenuOpen(false)}
                      >
                        <div className="flex items-start">
                          <div className="p-2.5 bg-gradient-to-br from-primary/40 to-accent/20 rounded-lg mr-3 group-hover:from-primary/60 group-hover:to-accent/30 transition-colors flex-shrink-0">
                            <ServerCogIcon size={18} className="text-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-white group-hover:text-accent transition-colors">
                              IT Consulting
                            </h4>
                            <p className="text-xs text-secondary-silver mt-1 group-hover:text-secondary-silver/90 transition-colors">
                              Infrastructure & strategy
                            </p>
                          </div>
                          <ChevronDownIcon
                            size={14}
                            className="text-accent/50 group-hover:text-accent rotate-[-90deg] group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="mt-4 pt-4 border-t border-accent/10">
                      <Link
                        href="/services"
                        className="text-xs text-accent hover:text-accent/80 font-semibold flex items-center transition-colors"
                        onClick={() => setIsServicesMenuOpen(false)}
                      >
                        View all services
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className="font-medium hover:text-accent transition-colors relative group overflow-hidden px-2 py-1"
              aria-label="Navigate to About"
            >
              <span className="relative z-10">About</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                aria-hidden="true"
              ></span>
              <span
                className="absolute inset-0 w-full h-full bg-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"
                aria-hidden="true"
              ></span>
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-accent transition-colors relative group overflow-hidden px-2 py-1"
              aria-label="Navigate to Contact"
            >
              <span className="relative z-10">Contact</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                aria-hidden="true"
              ></span>
              <span
                className="absolute inset-0 w-full h-full bg-accent/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"
                aria-hidden="true"
              ></span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link
            href="/contact"
            className="hidden md:flex px-5 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
            aria-label="Get Started - Contact Us"
          >
            <span className="relative z-10">Get Started</span>
            <span
              className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              aria-hidden="true"
            ></span>
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <XIcon size={24} aria-hidden="true" />
            ) : (
              <MenuIcon size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-gradient-to-b from-secondary-charcoal/95 to-primary/95 backdrop-blur-md"
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="font-medium hover:text-accent transition-colors py-2 border-b border-accent/10 flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Navigate to Home"
            >
              <span
                className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              ></span>
              Home
            </Link>
            {/* Mobile Services Submenu */}
            <div className="border-b border-accent/10 py-2">
              <div className="font-medium text-white mb-3">Services</div>
              <div className="pl-4 space-y-3">
                <Link
                  href="/project-development"
                  className="flex items-center py-2 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CodeIcon size={16} className="text-accent mr-2" />
                  Project Development
                </Link>
                <Link
                  href="/ai-solutions"
                  className="flex items-center py-2 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BrainIcon size={16} className="text-accent mr-2" />
                  AI Solutions
                </Link>
                <Link
                  href="/it-consulting"
                  className="flex items-center py-2 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ServerCogIcon size={16} className="text-accent mr-2" />
                  IT Consulting
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              className="font-medium hover:text-accent transition-colors py-2 border-b border-accent/10 flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Navigate to About"
            >
              <span
                className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              ></span>
              About
            </Link>
            <Link
              href="/contact"
              className="font-medium hover:text-accent transition-colors py-2 border-b border-accent/10 flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Navigate to Contact"
            >
              <span
                className="w-1.5 h-1.5 bg-accent rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              ></span>
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 text-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary-charcoal"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Get Started - Contact Us"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
