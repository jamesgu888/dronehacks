"use client";

import { motion } from "framer-motion";

export default function Home() {
  const staticLayers = [1, 2, 3, 4];
  const animatedLayers = [
    { num: 6, x: -200, y: -200 }, // top-left
    { num: 7, x: 200, y: -200 },  // top-right
    { num: 8, x: -200, y: 200 },  // bottom-left
    { num: 9, x: -200, y: -200 }, // comes from top-left, goes down-right
  ];

  return (
    <div className="overflow-x-hidden">
      <section className="relative w-full h-screen overflow-hidden bg-white">
      {/* Static background layers */}
      {staticLayers.map((layerNum) => (
        <img
          key={layerNum}
          src={`/layers/Julia_Dreams_Sketchbook_2_[Large]-${layerNum}.png`}
          alt={`Layer ${layerNum}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: layerNum, mixBlendMode: "multiply" }}
        />
      ))}

      {/* Animated drone layers */}
      {animatedLayers.map(({ num, x, y }, index) => (
        <div
          key={num}
          className={`absolute inset-0 overflow-hidden float-${index + 1}`}
          style={{ zIndex: num, mixBlendMode: "multiply" }}
        >
          <motion.img
            src={`/layers/Julia_Dreams_Sketchbook_2_[Large]-${num}.png`}
            alt={`Layer ${num}`}
            className="w-full h-full object-contain"
            style={{
              willChange: "transform",
            }}
            initial={{ x, y, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 2.5,
              delay: index * 0.4,
              ease: "easeOut",
            }}
          />
        </div>
      ))}

      {/* Navbar */}
      <motion.nav
        className="absolute top-6 left-6 right-6 z-30"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Horizons" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)] tracking-tight">
                HORIZONS
              </span>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-space-grotesk)]">
              <a href="#apply" className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                Apply
              </a>
              <a href="#about" className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                About
              </a>
              <a href="#challenge" className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                Challenge
              </a>
              <a href="#sponsors" className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                Sponsors
              </a>
              <a href="#schedule" className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                Schedule
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Content overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white font-[family-name:var(--font-space-grotesk)]"
        initial={{ opacity: 0, y: -100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      >
        <p className="text-2xl tracking-[0.3em] uppercase text-white font-medium">
          Stanford Robotics
        </p>
        <div className="flex items-center gap-6 mt-4">
          <img src="/logo.png" alt="Horizons" className="w-24 h-24" />
          <h1 className="text-8xl font-bold tracking-tight bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
            HORIZONS
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <p className="text-xl tracking-[0.2em] uppercase text-white font-medium">
            Rothberg Catalyzer
          </p>
          <span className="text-white text-xl">×</span>
          <p className="text-xl tracking-[0.2em] uppercase text-white font-medium">
            DroneHacks
          </p>
        </div>
      </motion.div>
      </section>

      {/* Scrollable content section */}
      <section className="min-h-screen py-20 px-8 bg-gradient-to-b from-[#240b4d] via-[#6b2d5c] via-[#c4527a] to-[#e2732e]">
        <div className="max-w-4xl mx-auto text-white font-[family-name:var(--font-space-grotesk)]">
          <h2 className="text-5xl font-bold mb-8">About</h2>
          <p className="text-xl leading-relaxed">
            Content coming soon...
          </p>
        </div>
      </section>
    </div>
  );
}
