
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SLOGAN } from '../constants';

const heroBackgrounds = [
  '/images/abstract-chrome-1.png',
  '/images/abstract-chrome-2.png',
  '/images/hero-abstract-bg.png',
  '/images/hero-tire-chrome.png',
  '/images/hero-chevrolet-v8.png',
  '/images/abstract-engine-forms.png',
];

// Spark particles - intensity based on rev level
const Sparks: React.FC<{ intensity: number }> = ({ intensity }) => {
  // More particles earlier: minimum 6, scales up faster
  const sparkCount = Math.min(6 + intensity * 4, 30);
  const sparks = Array.from({ length: sparkCount });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map((_, i) => (
        <motion.div
          key={`${i}-${intensity}`}
          className="absolute w-1 h-1 bg-amber-500 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -150 - Math.random() * 150],
            x: [0, (Math.random() - 0.5) * 150],
            opacity: [0, 1, 0],
            scale: [0, 1 + intensity * 0.2, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [revLevel, setRevLevel] = useState(0); // 0 to 10 scale
  const [sparkKey, setSparkKey] = useState(0);
  const revDecayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rev decay - slowly decrease when not pressing
  useEffect(() => {
    if (revLevel > 0) {
      revDecayRef.current = setTimeout(() => {
        setRevLevel((prev) => Math.max(0, prev - 0.5));
      }, 200);
    }
    return () => {
      if (revDecayRef.current) clearTimeout(revDecayRef.current);
    };
  }, [revLevel]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rev up on mouse down (like throttle)
  const handleRevDown = () => {
    setRevLevel((prev) => Math.min(10, prev + 1.5));
    setSparkKey((prev) => prev + 1);
  };

  // Calculate F color based on rev level (amber to white)
  const getFColor = () => {
    const t = revLevel / 10;
    // Interpolate from amber (#f59e0b) to white (#ffffff)
    const r = Math.round(245 + (255 - 245) * t);
    const g = Math.round(158 + (255 - 158) * t);
    const b = Math.round(11 + (255 - 11) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Shake intensity based on rev
  const shakeIntensity = revLevel * 1.5;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Backgrounds with parallax */}
      <motion.div
        className="absolute -inset-10 z-0"
        style={{ x: springX, y: springY }}
      >
        {heroBackgrounds.map((bg, idx) => {
          const isActive = idx === currentBg;
          return (
            <motion.img
              key={bg}
              src={bg}
              alt={`F Garage - Oficina de carros clássicos - Imagem ${idx + 1}`}
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
      </motion.div>
      {/* Dark overlay - outside parallax container to stay fixed */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Dynamic sparks based on rev */}
      <Sparks key={sparkKey} intensity={revLevel} />

      {/* Branding with shake based on rev */}
      <motion.div
        className="relative z-20 text-center pointer-events-none select-none"
        animate={{
          x: revLevel > 0 ? [0, -shakeIntensity, shakeIntensity, -shakeIntensity, shakeIntensity, 0] : 0
        }}
        transition={{ duration: 0.3, repeat: revLevel > 0 ? Infinity : 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-[6rem] md:text-[10rem] lg:text-[14rem] leading-[0.85] text-white tracking-tighter flex flex-col items-center">
            <motion.span
              className="italic"
              style={{
                color: getFColor(),
                textShadow: revLevel > 0
                  ? `0 4px 0px #78350f, 0 0 ${Math.max(5, revLevel * 8)}px ${getFColor()}, 0 0 ${revLevel * 15}px ${getFColor()}`
                  : "0 4px 0px #78350f",
                transition: 'color 0.15s ease-out, text-shadow 0.2s ease-out'
              }}
            >
              F
            </motion.span>
            <span className="drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] -mt-2 md:-mt-6">GARAGE</span>
          </h1>
        </motion.div>

        {/* Slogan - triggers on mousedown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4"
        >
          <motion.div
            className="inline-block px-8 py-2 border-l-4 border-black bg-amber-600 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] pointer-events-auto cursor-pointer select-none"
            onMouseDown={handleRevDown}
            onTouchStart={handleRevDown}
            whileHover={{ scale: 1.02, skewX: -2, skewY: 1 }}
            animate={{
              backgroundColor: revLevel > 0 ? `rgb(${245 + revLevel}, ${158 + revLevel * 5}, ${11 + revLevel * 10})` : 'rgb(217, 119, 6)',
              boxShadow: revLevel > 3
                ? `0 0 ${revLevel * 5}px rgba(245, 158, 11, 0.6), 4px 4px 0px rgba(0,0,0,0.5)`
                : '4px 4px 0px rgba(0,0,0,0.5)'
            }}
            whileTap={{ scale: 0.98, y: 2, skewX: 2 }}
          >
            <p className="font-stencil text-lg md:text-xl lg:text-2xl tracking-[0.15em] uppercase italic text-black">
              {SLOGAN}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* CTAs with shine */}
      <motion.div
        className="relative z-30 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          onClick={() => scrollTo('trabalhos')}
          className="group px-8 py-3 bg-transparent border border-white/60 text-white font-stencil text-sm uppercase tracking-[0.15em] hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          Ver Trabalhos
        </motion.button>
        <motion.button
          onClick={() => scrollTo('contacto')}
          className="group px-8 py-3 bg-amber-600 text-black font-stencil text-sm uppercase tracking-[0.15em] hover:bg-amber-500 transition-colors shadow-lg cursor-pointer relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: 1 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          Agendar Serviço
        </motion.button>
      </motion.div>



      {/* Dots - flatter pills like Gallery */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroBackgrounds.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className={`h-1 rounded-sm transition-all duration-300 ${idx === currentBg ? 'bg-amber-500 w-8' : 'bg-white/30 w-3 hover:bg-white/50'}`}
            whileHover={{ scale: 1.3, y: -2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-600/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-24 right-8 w-16 h-16 border-r-2 border-t-2 border-amber-600/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
    </section>
  );
};

export default Hero;
