"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InterestModal({ isOpen, onClose }: InterestModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // Use email as document ID to prevent duplicates (no read permission needed)
      const emailDocRef = doc(db, "interest_emails", email);
      await setDoc(emailDocRef, {
        email,
        createdAt: serverTimestamp(),
      }, { merge: true });

      setEmail("");
      setStatus("idle");
      onClose();
    } catch (error) {
      console.error("Error adding email:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            <div
              className="relative bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">
                Stay Updated
              </h2>
              <p className="text-white/60 mb-6">
                Enter your email to receive updates about Horizons and be the first to know when applications open.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-space-grotesk)] uppercase tracking-wider cursor-pointer"
                >
                  {status === "loading" ? "Submitting..." : status === "error" ? "Try Again" : "Submit"}
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
