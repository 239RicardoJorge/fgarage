
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { SLOGAN } from '../constants';

const heroBackgrounds = [
  '/images/abstract-chrome-1.png',
  '/images/abstract-chrome-2.png',
  '/images/hero-abstract-bg.png',
  '/images/hero-tire-chrome.png',
  '/images/hero-chevrolet-v8.png',
  '/images/abstract-engine-forms.png',
];

// Cinematic grain overlay
const NoiseOverlay = React.memo(() => (
  <div
    className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
));

// Premium light leak effect
const LightLeaks = React.memo(() => (
  <>
    <motion.div
      className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vh] pointer-events-none z-[3]"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
        x: [0, 50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vh] pointer-events-none z-[3]"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.04) 0%, transparent 50%)',
      }}
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
));

// Animated scan lines for cinematic feel
const ScanLines = React.memo(() => (
  <div
    className="absolute inset-0 pointer-events-none z-[4] opacity-[0.015]"
    style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.03) 2px,
        rgba(255, 255, 255, 0.03) 4px
      )`,
    }}
  />
));

// Floating geometric shapes
const FloatingShapes = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
    {/* Top left architectural line */}
    <motion.div
      className="absolute top-[15%] left-[8%] w-px h-32"
      style={{ background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.5) 0%, transparent 100%)' }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div
      className="absolute top-[15%] left-[8%] w-16 h-px"
      style={{ background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.5) 0%, transparent 100%)' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 1.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* Top right corner */}
    <motion.div
      className="absolute top-[18%] right-[10%] w-px h-24"
      style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)' }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div
      className="absolute top-[18%] right-[10%] w-12 h-px"
      style={{ background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />

    {/* Floating diamond */}
    <motion.div
      className="absolute top-[25%] right-[15%] w-2 h-2 border border-amber-500/30 rotate-45"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
    />
    <motion.div
      className="absolute bottom-[30%] left-[12%] w-3 h-3 border border-white/10 rotate-45"
      animate={{
        y: [0, -10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Horizontal accent line */}
    <motion.div
      className="absolute bottom-[20%] left-1/2 -translate-x-1/2 h-px"
      style={{
        width: '40%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.2) 50%, transparent 100%)',
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 2.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
));

// Premium spark particles
const Sparks = React.memo(({ intensity }: { intensity: number }) => {
  const sparkCount = Math.min(5 + intensity * 3, 25);
  const sparks = Array.from({ length: sparkCount });

  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden z-[8]" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {sparks.map((_, i) => (
        <motion.div
          key={`${i}-${intensity}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${30 + Math.random() * 40}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: `radial-gradient(circle, rgba(255, 200, 50, 1) 0%, rgba(245, 158, 11, 0.8) 50%, transparent 100%)`,
            boxShadow: '0 0 6px rgba(245, 158, 11, 0.8), 0 0 12px rgba(245, 158, 11, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -200 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 1, 1, 0],
            scale: [0, 1 + intensity * 0.15, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
});

// Text reveal animation component
const TextReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div className="">
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const Hero: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [revLevel, setRevLevel] = useState(0);
  const [sparkKey, setSparkKey] = useState(0);
  const revDecayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  // Secondary slower parallax for depth layers
  const slowSpringX = useSpring(mouseX, { stiffness: 15, damping: 40 });
  const slowSpringY = useSpring(mouseY, { stiffness: 15, damping: 40 });

  // Transform for text parallax
  const textX = useTransform(springX, (v) => v * 0.5);
  const textY = useTransform(springY, (v) => v * 0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (revLevel > 0) {
      revDecayRef.current = setTimeout(() => {
        setRevLevel((prev) => Math.max(0, prev - 0.4));
      }, 180);
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

  const handleRevDown = () => {
    setRevLevel((prev) => Math.min(10, prev + 1.8));
    setSparkKey((prev) => prev + 1);
  };

  // Dynamic color based on rev
  const getFColor = () => {
    const t = revLevel / 10;
    const r = Math.round(245 + (255 - 245) * t);
    const g = Math.round(158 + (255 - 158) * t);
    const b = Math.round(11 + (255 - 11) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const shakeIntensity = revLevel * 1.2;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Deep background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] z-0" />

      {/* Backgrounds with enhanced parallax */}
      <motion.div
        className="absolute -inset-4 z-[1]"
        style={{ x: springX, y: springY, willChange: 'transform' }}
      >
        <AnimatePresence>
          {heroBackgrounds.map((bg, idx) => {
            const isActive = idx === currentBg;
            return isActive ? (
              <motion.img
                key={bg}
                src={bg}
                alt={`F Garage - Oficina de carros clássicos - Imagem ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.02 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 2, ease: 'easeInOut' },
                  scale: { duration: 8, ease: 'easeOut' },
                }}
              />
            ) : null;
          })}
        </AnimatePresence>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[2]" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <LightLeaks />
      <ScanLines />
      <NoiseOverlay />
      <FloatingShapes />

      {/* Dynamic sparks */}


      {/* Main Content with parallax */}
      <motion.div
        className="relative z-20 text-center pointer-events-none select-none"
        style={{ x: textX, y: textY }}
      >
        {/* Shake Wrapper */}
        <motion.div
          animate={{
            x: revLevel > 0 ? [0, -shakeIntensity, shakeIntensity, -shakeIntensity, shakeIntensity, 0] : 0,
          }}
          transition={{ duration: 0.05, repeat: revLevel > 0 ? Infinity : 0 }}
        >
          {/* Subtitle */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <span className="text-amber-500/80 font-stencil text-xs md:text-sm tracking-[0.4em] uppercase">
              oficina especializada · Póvoa de Santa Iria
            </span>
          </motion.div>

          {/* Main Title - Premium animated */}
          <TextReveal delay={0.3}>
            <h1 className="font-heading text-[5rem] md:text-[9rem] lg:text-[13rem] leading-[0.8] text-white tracking-tighter">
              <motion.span
                className="inline-block italic relative"
                style={{
                  color: getFColor(),
                  textShadow: revLevel > 0
                    ? `0 4px 0px #78350f, 0 0 ${Math.max(10, revLevel * 15)}px ${getFColor()}, 0 0 ${revLevel * 25}px ${getFColor()}, 0 0 ${revLevel * 40}px rgba(245, 158, 11, 0.3)`
                    : '0 4px 0px #78350f, 0 0 30px rgba(245, 158, 11, 0.2)',
                  transition: 'color 0.1s, text-shadow 0.15s',
                }}
              >
                F
                {/* Glow behind F */}
                <motion.div
                  className="absolute inset-0 blur-2xl -z-10"
                  style={{
                    background: `radial-gradient(circle, ${getFColor()}40 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: revLevel > 0 ? [1, 1.3, 1] : 1,
                    opacity: revLevel > 0 ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.5}>
            <h1 className="font-heading text-[5rem] md:text-[9rem] lg:text-[13rem] leading-[0.8] text-white tracking-tighter -mt-2 md:-mt-6">
              <span
                className="inline-block"
                style={{
                  textShadow: '0 20px 60px rgba(0,0,0,0.8)',
                }}
              >
                GARAGE
              </span>
            </h1>
          </TextReveal>

          {/* Interactive Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <motion.div
              className="inline-block relative group pointer-events-auto cursor-pointer"
              onMouseDown={handleRevDown}
              onTouchStart={handleRevDown}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 2 }}
            >
              {/* Glassmorphism background */}
              <motion.div
                className="absolute -inset-2 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                }}
                animate={{
                  opacity: revLevel > 3 ? [0.5, 1, 0.5] : 1,
                  x: revLevel > 0 ? [0, -shakeIntensity, shakeIntensity, -shakeIntensity, shakeIntensity, 0] : 0,
                }}
                transition={{ duration: 0.05, repeat: revLevel > 0 ? Infinity : 0 }}
              />

              {/* Main slogan box */}
              <div
                className="relative pl-11 pr-10 py-3 overflow-hidden transition-all duration-150"
                style={{

                  background: revLevel > 0
                    ? `linear-gradient(90deg, rgba(${Math.round(245 + (255 - 245) * revLevel / 10)}, ${Math.round(158 + (255 - 158) * revLevel / 10)}, ${Math.round(11 + (255 - 11) * revLevel / 10)}, ${0.7 + revLevel * 0.03}) 0%, rgba(${Math.round(217 + (255 - 217) * revLevel / 10)}, ${Math.round(119 + (255 - 119) * revLevel / 10)}, ${Math.round(6 + (255 - 6) * revLevel / 10)}, ${0.9 + revLevel * 0.01}) 100%)`
                    : 'linear-gradient(90deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 1) 100%)',
                  boxShadow: revLevel > 3
                    ? `0 0 ${revLevel * 8}px ${getFColor()}, 0 10px 40px rgba(0,0,0,0.3)`
                    : '0 10px 40px rgba(0,0,0,0.3)',
                }}
              >
                {/* Left Border Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-150"
                  style={{ backgroundColor: revLevel > 5 ? getFColor() : 'rgb(245, 158, 11)' }}
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />

                <p className="relative font-stencil text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase text-black font-medium">
                  {SLOGAN}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Premium CTAs */}
        <motion.div
          className="relative z-30 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => scrollTo('trabalhos')}
            className="group relative px-10 py-4 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glassmorphism border */}
            <div className="absolute inset-0 border border-white/20 backdrop-blur-sm" />

            {/* Hover fill */}
            <motion.div
              className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"
            />

            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 font-stencil text-sm uppercase tracking-[0.2em] text-white">
              Ver Trabalhos
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => scrollTo('contacto')}
            className="group relative px-10 py-4 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97, rotate: 0.5 }}
          >
            {/* Background gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
              }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.5), inset 0 0 30px rgba(255,255,255,0.1)',
              }}
            />

            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative z-10 font-stencil text-sm uppercase tracking-[0.2em] text-black font-medium">
              Agendar Serviço
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Premium Pagination - Centered */}
      <div className="absolute bottom-8 w-full flex justify-center z-20">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Current / Total */}
          <span className="font-stencil text-xs text-white/40 tracking-wider">
            {String(currentBg + 1).padStart(2, '0')}
          </span>

          {/* Progress bar style dots */}
          <div className="flex gap-1.5">
            {heroBackgrounds.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentBg(idx)}
                className="relative h-[3px] overflow-hidden bg-white/20"
                style={{ width: idx === currentBg ? 32 : 12 }}
                whileHover={{ scale: 1.2, y: -1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full" />
                {idx === currentBg && (
                  <motion.div
                    className="absolute inset-0 bg-amber-500 rounded-full"
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <span className="font-stencil text-xs text-white/20 tracking-wider">
            {String(heroBackgrounds.length).padStart(2, '0')}
          </span>
        </motion.div>
      </div>



      {/* Left accent */}
      <motion.div
        className="absolute bottom-8 left-8 z-30 hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="font-stencil text-[10px] text-white/20 tracking-widest uppercase">
          Est. 1999
        </div>
      </motion.div>
    </section >
  );
};

export default Hero;
