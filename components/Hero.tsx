
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLOGAN } from '../constants';

const heroBackgrounds = [
  '/images/hero-bg-1.png',
  '/images/hero-bg-2.png',
  '/images/hero-bg-3.png',
];

const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);

  // Auto-rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Transitioning Abstract Chrome Backgrounds */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={heroBackgrounds[currentBg]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Subtle Ambient Glow - Pulsing Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/12 blur-[180px] rounded-full" />
      </motion.div>

      {/* Main Branding - Centered with Subtle Float */}
      <div className="relative z-20 text-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Floating Animation on Logo */}
          <motion.h1
            className="font-heading text-[7rem] md:text-[12rem] lg:text-[16rem] leading-[0.85] text-white tracking-tighter flex flex-col items-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-amber-500 drop-shadow-[0_4px_0px_#78350f] italic">F</span>
            <span className="drop-shadow-[0_15px_50px_rgba(0,0,0,0.9)] -mt-4 md:-mt-8">GARAGE</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          className="mt-6"
        >
          <motion.div
            className="bg-amber-600 text-black inline-block px-10 py-3 border-l-8 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.6)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <p className="font-stencil text-xl md:text-2xl lg:text-3xl tracking-widest uppercase italic">
              {SLOGAN}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Buttons with Enhanced Hover */}
      <motion.div
        className="relative z-30 mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <motion.a
          href="#trabalhos"
          className="group relative px-10 py-4 bg-transparent border-2 border-white/50 text-white font-stencil text-base uppercase tracking-widest overflow-hidden backdrop-blur-sm"
          whileHover={{ borderColor: "rgb(245, 158, 11)", scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            className="absolute inset-0 bg-amber-600/30"
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10">Explorar Oficina</span>
        </motion.a>

        <motion.a
          href="#contacto"
          className="px-10 py-4 bg-amber-600 text-black font-stencil text-base uppercase tracking-widest border-b-4 border-amber-800 shadow-lg shadow-amber-600/40"
          whileHover={{ backgroundColor: "rgb(245, 158, 11)", scale: 1.02 }}
          whileTap={{ scale: 0.98, y: 2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Agendar Serviço
        </motion.a>
      </motion.div>

      {/* Background Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroBackgrounds.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentBg ? 'bg-amber-500 w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Background ${idx + 1}`}
          />
        ))}
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.6)]" />
    </section>
  );
};

export default Hero;
