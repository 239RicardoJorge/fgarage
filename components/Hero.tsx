
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SLOGAN } from '../constants';

const heroBackgrounds = [
  '/images/abstract-chrome-1.png',
  '/images/abstract-chrome-2.png',
  '/images/hero-abstract-bg.png',
  '/images/hero-tire-chrome.png',
  '/images/hero-chevrolet-v8.png',
  '/images/abstract-engine-forms.png',
  '/images/abstract-chrome-blue.png',
];

const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0">
        {heroBackgrounds.map((bg, idx) => {
          const isActive = idx === currentBg;
          return (
            <motion.img
              key={bg}
              src={bg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? [1, 1.15] : 1.15
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 7, ease: "easeOut" }
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Branding */}
      <div className="relative z-20 text-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-[6rem] md:text-[10rem] lg:text-[14rem] leading-[0.85] text-white tracking-tighter flex flex-col items-center">
            <span className="text-amber-500 drop-shadow-[0_4px_0px_#78350f] italic">F</span>
            <span className="drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] -mt-2 md:-mt-6">GARAGE</span>
          </h1>
        </motion.div>

        {/* Slogan - Orange background, black text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4"
        >
          <div className="inline-block px-8 py-2 border-l-4 border-black bg-amber-600 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <p className="font-stencil text-lg md:text-xl lg:text-2xl tracking-[0.15em] uppercase italic text-black">
              {SLOGAN}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        className="relative z-30 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          onClick={() => scrollTo('trabalhos')}
          className="px-8 py-3 bg-transparent border border-white/60 text-white font-stencil text-sm uppercase tracking-[0.15em] hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
        >
          Ver Trabalhos
        </button>
        <button
          onClick={() => scrollTo('contacto')}
          className="px-8 py-3 bg-amber-600 text-black font-stencil text-sm uppercase tracking-[0.15em] hover:bg-amber-500 transition-colors shadow-lg cursor-pointer"
        >
          Agendar Serviço
        </button>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroBackgrounds.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentBg ? 'bg-amber-500 w-6' : 'bg-white/30 w-2 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
