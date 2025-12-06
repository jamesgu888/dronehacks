"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

declare global {
  interface Window {
    capycap?: {
      render: (container?: HTMLElement) => void;
      reset: (container?: HTMLElement) => void;
      getToken: (container?: HTMLElement) => string | null;
    };
  }
}

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

function CustomSelect({ id, name, value, onChange, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-left text-white focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all cursor-pointer flex items-center justify-between"
      >
        <span className={selectedOption ? "text-white" : "text-white/50"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <input type="hidden" name={name} value={value} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 py-2 bg-[#1a0a2e]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-all cursor-pointer ${
                  value === option.value
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    graduationYear: "",
    travelingFrom: "",
    experience: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);

  // Set body background to match page (prevents white flash when captcha expands)
  useEffect(() => {
    document.body.style.backgroundColor = '#e2732e';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Load CapyCap script
  useEffect(() => {
    if (document.querySelector('script[src="https://capycap.ai/widget.js"]')) return;

    const script = document.createElement("script");
    script.src = "https://capycap.ai/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Render captcha when component mounts
  useEffect(() => {
    if (captchaRef.current) {
      const timer = setTimeout(() => {
        window.capycap?.render(captchaRef.current!);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.fullName) return;

    // Get captcha token
    const tokenInput = captchaRef.current?.querySelector(
      'input[name="capycap-token"]'
    ) as HTMLInputElement | null;
    const token = tokenInput?.value;

    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the captcha");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Verify captcha
      const captchaRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const captchaData = await captchaRes.json();

      if (!captchaData.success) {
        setStatus("error");
        setErrorMessage("Captcha verification failed. Please try again.");
        window.capycap?.reset(captchaRef.current!);
        return;
      }

      const emailDocRef = doc(db, "registrations", formData.email);
      await setDoc(
        emailDocRef,
        {
          ...formData,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      setStatus("success");
    } catch (error) {
      console.error("Error submitting registration:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const graduationYearOptions = [
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "graduated", label: "Already graduated" },
  ];

  const experienceOptions = [
    { value: "none", label: "No experience - excited to learn!" },
    { value: "beginner", label: "Beginner - some exposure" },
    { value: "intermediate", label: "Intermediate - built projects before" },
    { value: "advanced", label: "Advanced - extensive experience" },
  ];

  return (
    <div className="text-white font-[family-name:var(--font-space-grotesk)] min-h-screen bg-gradient-to-b from-[#240b4d] via-[#6b2d5c] via-60% to-[#e2732e]">
      <div className="pb-20">

      {/* Back to home link - frosted glass */}
      <motion.div
        className="fixed top-6 left-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-white/70 hover:text-white transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </motion.div>

      <div className="flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {status === "success" ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                You&apos;re Registered!
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Thanks for registering for Horizons. We&apos;ll be in touch with updates soon.
              </p>
              <Link
                href="/"
                className="inline-block py-3 px-8 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors uppercase tracking-wider"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Register for Horizons
              </h1>
              <p className="text-white/80 mb-12 text-lg md:text-xl">
                Sign up to receive updates and be the first to know when applications open.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </div>

                {/* School */}
                <div>
                  <label htmlFor="school" className="block text-sm font-semibold text-white mb-2">
                    School / University *
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    placeholder="Stanford University"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-semibold text-white mb-2">
                    Expected Graduation Year
                  </label>
                  <CustomSelect
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={(value) => setFormData((prev) => ({ ...prev, graduationYear: value }))}
                    options={graduationYearOptions}
                    placeholder="Select year"
                  />
                </div>

                {/* Traveling From */}
                <div>
                  <label htmlFor="travelingFrom" className="block text-sm font-semibold text-white mb-2">
                    Traveling From (City, State/Country)
                  </label>
                  <input
                    type="text"
                    id="travelingFrom"
                    name="travelingFrom"
                    placeholder="San Francisco, CA"
                    value={formData.travelingFrom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                  />
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-white mb-2">
                    Experience with Drones/Robotics
                  </label>
                  <CustomSelect
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                    options={experienceOptions}
                    placeholder="Select experience level"
                  />
                </div>

                {/* Captcha */}
                <div
                  ref={captchaRef}
                  className="capycap-captcha"
                  data-sitekey={process.env.NEXT_PUBLIC_CAPYCAP_SITEKEY}
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer mt-8"
                >
                  {status === "loading" ? "Submitting..." : status === "error" ? "Try Again" : "Register"}
                </button>

                {status === "error" && (
                  <p className="text-white bg-red-500/30 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-center">{errorMessage}</p>
                )}

                <p className="text-white/60 text-sm text-center mt-6">
                  By registering, you agree to receive email updates about Horizons.
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
      </div>
    </div>
  );
}
