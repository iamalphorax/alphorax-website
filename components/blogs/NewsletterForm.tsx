"use client";

import React, { useState } from "react";

const NewsletterForm = () => {
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

  if (isSubmitted) {
    return (
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center animate-in fade-in duration-500">
        <h3 className="text-xl font-bold text-accent mb-2">Thank you for subscribing!</h3>
        <p className="text-secondary-silver">You've been added to our newsletter list.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-grow px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white"
        required
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 whitespace-nowrap disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Subscribing...
          </div>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
