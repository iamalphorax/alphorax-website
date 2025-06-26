"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "alphorax/components/ui/input";
import { Button } from "alphorax/components/ui/button";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { tsParticles } from "@tsparticles/engine";

export default function ComingSoon() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [particlesCount, setParticlesCount] = useState<number>(80);


  useEffect(() => {
    loadFull(tsParticles);

    const isMobile = window.innerWidth <= 768;
    setParticlesCount(isMobile ? 30 : 80);

    const launchDate = new Date("2025-08-01");
    const interval = setInterval(() => {
      const now = new Date();
      const diffTime = launchDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setError('');
      } else {
        setError(data?.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "#000000" } },
          fpsLimit: 60,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, resize: { enable: true } },
            modes: { push: { quantity: 4 }, repulse: { distance: 100 } },
          },
          particles: {
            color: { value: ["#00ffff", "#ff00ff", "#ffffff"] },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: { enable: true, speed: 1, outModes: { default: "bounce" } },
            number: { value: particlesCount },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: { min: 0.3, max: 0.8 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.img
            src="/logo.svg"
            alt="Alphorax Logo"
            width={80}
            height={80}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="drop-shadow-lg"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Future of Tech Solutions Starts Here
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Alphorax is almost ready. Get ready for a new standard in digital innovation.
        </p>

        <div className="mb-8">
          <span className="text-sm text-gray-400 uppercase tracking-wide">
            Launching in
          </span>
          <div className="text-5xl font-semibold mt-2">{daysLeft} days</div>
        </div>

        {!subscribed ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="p-2 py-2.5 rounded bg-white text-black w-full max-w-sm border-0 outline-0 focus-within:outline-0 focus:outline-0 focus-visible:outline-0 focus-within:border-0 focus:border-0 focus-visible:border-0" />
            <Button onClick={handleSubscribe}> 
              {loading ? 
              <svg
              className="w-7 h-7 animate-spin text-white cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg> 
              : 
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3c0 .386-.148.735-.405 1.002L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              }
            </Button>
          </div>
        ) : (
          <p className="text-green-400 font-medium">Thank you! We&lsquo;ll keep you updated.</p>
        )}
        {error && <p className="text-red-400 mt-2">{error}</p>}

        <div className="mt-10 flex justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
        </div>
      </motion.div>
    </div>
  );
}
