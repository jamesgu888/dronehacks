"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionImage = motion.create(Image);

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
        <Image
          key={layerNum}
          src={`/layers/Julia_Dreams_Sketchbook_2_[Large]-${layerNum}.png`}
          alt={`Layer ${layerNum}`}
          fill
          priority={layerNum <= 2}
          className="object-cover"
          style={{ zIndex: layerNum, mixBlendMode: "multiply" }}
          sizes="100vw"
          quality={75}
        />
      ))}

      {/* Animated drone layers */}
      {animatedLayers.map(({ num, x, y }, index) => (
        <div
          key={num}
          className={`absolute inset-0 overflow-hidden float-${index + 1}`}
          style={{ zIndex: num, mixBlendMode: "multiply" }}
        >
          <MotionImage
            src={`/layers/Julia_Dreams_Sketchbook_2_[Large]-${num}.png`}
            alt={`Layer ${num}`}
            fill
            className="object-contain"
            sizes="100vw"
            quality={75}
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
        className="fixed top-6 left-6 right-6 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group cursor-pointer">
              <Image src="/logo.png" alt="Horizons" width={40} height={40} />
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)] tracking-tight">
                HORIZONS
              </span>
            </button>

            {/* Mobile Register Now Button */}
            <Link
              href="/register"
              className="md:hidden px-3 py-1.5 bg-white text-black rounded-lg uppercase tracking-wider text-sm font-semibold hover:bg-white/90 transition-all font-[family-name:var(--font-space-grotesk)]"
            >
              Register Now
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-space-grotesk)]">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] cursor-pointer">
                About
              </button>
              <button onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })} className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] cursor-pointer">
                Eligibility
              </button>
              <button onClick={() => document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' })} className="px-2 py-2 text-white/70 hover:text-white transition-all uppercase tracking-widest text-lg font-semibold hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] cursor-pointer">
                Sponsors
              </button>
              <Link
                href="/register"
                className="px-4 py-2 bg-white text-black rounded-lg uppercase tracking-widest text-lg font-semibold hover:bg-white/90 transition-all"
              >
                Register Now
              </Link>
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
        <p className="text-sm md:text-2xl tracking-[0.2em] md:tracking-[0.3em] uppercase text-white font-medium">
          Stanford Robotics
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-4">
          <Image src="/logo.png" alt="Horizons" width={96} height={96} className="w-16 h-16 md:w-24 md:h-24" />
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
            HORIZONS
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mt-4">
          <p className="text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] uppercase text-white font-medium">
            Rothberg Catalyzer
          </p>
          <span className="hidden md:block text-white text-xl">×</span>
          <p className="text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] uppercase text-white font-medium">
            DroneHacks
          </p>
        </div>
        <Link
          href="/register"
          className="mt-8 px-8 py-3 bg-white text-black rounded-full uppercase tracking-widest text-lg font-bold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          Register Now
        </Link>
      </motion.div>

      {/* Bottom gradient fade overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #240b4d 100%)"
        }}
      />
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 pb-24 bg-gradient-to-b from-[#240b4d] via-[#6b2d5c] via-60% to-[#e2732e] overflow-hidden scroll-mt-12">
        {/* Giant background year */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden">
          <span className="text-[20rem] md:text-[35rem] font-black text-white/[0.03] leading-none select-none font-[family-name:var(--font-space-grotesk)]">
            2026
          </span>
        </div>

        <div className="relative z-10 font-[family-name:var(--font-space-grotesk)]">
          {/* Tagline - offset left */}
          <motion.div
            className="pl-6 md:pl-20 mb-12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-2">Stanford × Rothberg Catalyzer</p>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9]">
              AUTONOMOUS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">FLIGHT.</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 mt-4 font-light">
              Build it. Test it. <span className="text-white font-medium">Fly it.</span>
            </p>
          </motion.div>

          {/* Scrolling stats ticker */}
          <div className="relative py-6 mb-12 overflow-hidden border-y border-white/10">
            <div className="flex gap-6 md:gap-16 whitespace-nowrap animate-ticker">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-16">
                  <span className="text-4xl md:text-6xl font-black text-white/90">200+ STUDENTS</span>
                  <span className="text-4xl md:text-6xl font-black text-white/20">✦</span>
                  <span className="text-4xl md:text-6xl font-black text-white/90">48 HOURS</span>
                  <span className="text-4xl md:text-6xl font-black text-white/20">✦</span>
                  <span className="text-4xl md:text-6xl font-black text-white/90">$20K+ PRIZES</span>
                  <span className="text-4xl md:text-6xl font-black text-white/20">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main content - asymmetric layout */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-8 md:gap-4">
              {/* Left column - main text */}
              <motion.div
                className="md:col-span-7 md:pr-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed mb-8">
                  Over three days, participants prototype, test, and demo novel UAV capabilities, supported by mentors from industry, research labs, and the broader robotics community.
                </p>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                  Whether you&apos;re into computer vision, embedded systems, autonomy stacks, hardware design, or simulation—<span className="text-white">Horizons is your launchpad</span> to build something bold.
                </p>
              </motion.div>

              {/* Right column - stacked info blocks */}
              <div className="md:col-span-5 space-y-6">
                <motion.div
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute top-2 right-4 text-8xl font-black text-white/5">01</div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Mentorship</p>
                  <p className="text-white/90 text-lg leading-snug">
                    Top <span className="font-semibold">VCs, aerospace engineers</span>, and UAV industry leaders working alongside every team.
                  </p>
                </motion.div>

                <motion.div
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute top-2 right-4 text-8xl font-black text-white/5">02</div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Hardware</p>
                  <p className="text-white/90 text-lg leading-snug">
                    <span className="font-semibold">Fully autonomous drone kits</span>—NVIDIA Jetson Orin + high-res depth cameras—for every team.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Eligibility Section */}
          <div id="eligibility" className="pt-16 scroll-mt-12">
          {/* Header */}
          <motion.div
            className="px-6 md:px-20 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-400/80 text-sm tracking-[0.3em] uppercase mb-2">Who can apply</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none">
              ELIGIBILITY
            </h2>
          </motion.div>

          {/* Main content grid */}
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-8">
              {/* Left - Eligibility info */}
              <div className="space-y-6">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-pink-500" />
                  <p className="text-2xl md:text-3xl text-white font-bold leading-snug pl-4">
                    Priority admission is given to Stanford students.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                    A limited number of spots are available for <span className="text-white font-medium">North American university students</span>, with travel funding provided.
                  </p>
                  <p className="text-lg md:text-xl text-white/50 mt-4 italic">
                    If you&apos;re building something ambitious, we&apos;ll help you get here.
                  </p>
                </motion.div>
              </div>

              {/* Right - Timeline */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="space-y-0">
                  {[
                    { date: "JAN 10", label: "Applications Open", active: true },
                    { date: "FEB 5", label: "Early Accept Round", active: false },
                    { date: "MAR 14", label: "Regular Acceptance", active: false },
                    { date: "MAR 25", label: "Last Day to Reserve Spot", active: false },
                    { date: "MAY 15-17", label: "Event @ Stanford University", active: false, highlight: true },
                  ].map((item, index) => (
                    <motion.div
                      key={item.date}
                      className={`relative flex items-center gap-6 py-4 border-b border-white/10 ${item.highlight ? 'border-b-0' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <span className={`text-3xl md:text-4xl font-black ${item.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400' : 'text-white'}`}>
                        {item.date}
                      </span>
                      <span className={`text-sm md:text-base tracking-wide ${item.highlight ? 'text-white font-medium' : 'text-white/50'} uppercase`}>
                        {item.label}
                      </span>
                      {item.active && (
                        <span className="ml-auto text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
                          UPCOMING
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="relative py-20 bg-[#0a0a0a] overflow-hidden scroll-mt-12">
        <div className="font-[family-name:var(--font-space-grotesk)]">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-3">Backed by</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              OUR SPONSORS
            </h2>
          </motion.div>

          {/* Logo grid */}
          <div className="max-w-5xl mx-auto px-6">
            {/* Rothberg - on its own line above other sponsors */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-white text-4xl md:text-5xl lg:text-7xl font-bold tracking-wide whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-300">Rothberg Catalyzer</span>
            </motion.div>

            {/* More coming soon */}
            <motion.p
              className="text-center text-white/30 text-lg md:text-xl italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              more coming soon...
            </motion.p>

            {/* Other sponsors - hidden for now
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-10 md:gap-12 lg:gap-16">
              {[
                { src: "/sponsors/skydio.png", alt: "Skydio", width: 120, height: 40 },
                { src: "/sponsors/anduril.png", alt: "Anduril", width: 140, height: 35 },
                { src: "/sponsors/zipline.png", alt: "Zipline", width: 110, height: 35 },
                { src: "/sponsors/wing.png", alt: "Wing", width: 100, height: 40 },
                { src: "/sponsors/boostVC.png", alt: "Boost VC", width: 120, height: 35 },
                { src: "/sponsors/src.png", alt: "Stanford Robotics Center", width: 100, height: 50 },
              ].map((sponsor) => (
                <div key={sponsor.alt} className="opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={sponsor.width}
                    height={sponsor.height}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </div>
            */}
          </div>

          {/* Interested in sponsoring */}
          <motion.p
            className="text-center text-white/40 mt-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Interested in sponsoring? <a href="mailto:inquiries@stanfordhorizons.com" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">inquiries@stanfordhorizons.com</a>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
