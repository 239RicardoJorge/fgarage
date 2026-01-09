
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { WORK_ITEMS } from '../constants';
import { ChevronLeft, ChevronRight, Wrench, Plus } from 'lucide-react';

// Ambient particles
const AmbientParticles: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-amber-500/20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Auto-advance (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? WORK_ITEMS.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <section
      ref={sectionRef}
      id="trabalhos"
      className="relative py-20 lg:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AmbientParticles />

      {/* Background decorations */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
          y: parallaxY,
        }}
      />

      {/* Decorative wrench */}
      <motion.div
        className="absolute top-20 right-16 text-white/[0.02] hidden xl:block"
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Wrench size={200} strokeWidth={0.5} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 lg:mb-20 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-500 font-stencil text-xs tracking-[0.25em] uppercase">
                Logbook de Operações
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading text-5xl md:text-6xl lg:text-7xl text-white"
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                PROJETOS
              </motion.h2>
            </div>
          </div>

          {/* Description */}
          <motion.p
            className="text-zinc-500 text-base lg:text-lg max-w-md lg:text-right leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Restauro completo e afinação de performance com
            <span className="text-zinc-400"> engenharia de precisão.</span>
          </motion.p>
        </motion.div>

        {/* Main Gallery Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glass border frame */}
          <div className="absolute -inset-px bg-gradient-to-br from-white/10 via-transparent to-amber-500/10 rounded-sm" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 bg-black/40 backdrop-blur-sm border border-white/5 overflow-hidden">
            {/* Image Section */}
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={WORK_ITEMS[currentIndex].image}
                    alt={`${WORK_ITEMS[currentIndex].title} - ${WORK_ITEMS[currentIndex].description} | F Garage Lisboa`}
                    className="w-full h-full object-cover"
                  />

                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent lg:hidden" />
                </motion.div>
              </AnimatePresence>

              {/* Frame corners on hover */}
              <motion.div
                className="absolute inset-6 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-amber-500/60" />
                <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-amber-500/60" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-amber-500/60" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-amber-500/60" />
              </motion.div>

              {/* Image Counter */}
              <motion.div
                className="absolute bottom-6 left-6 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="px-4 py-2 bg-black/70 backdrop-blur-md border border-white/10">
                  <motion.span
                    className="font-heading text-2xl text-amber-500"
                    key={currentIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(currentIndex + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="text-zinc-500 font-heading text-lg"> / {String(WORK_ITEMS.length).padStart(2, '0')}</span>
                </div>
              </motion.div>

              {/* Zoom hint */}
              <motion.div
                className="absolute bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                whileHover={{ scale: 1.1, borderColor: 'rgba(245, 158, 11, 0.5)' }}
              >
                <Plus size={20} className="text-white/70" />
              </motion.div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5">
              <div>
                {/* Project badge */}
                <motion.div
                  className="inline-flex items-center gap-2 mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="px-4 py-2"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 1) 100%)',
                    }}
                  >
                    <span className="font-stencil text-xs tracking-[0.15em] text-black font-medium uppercase">
                      Logbook #{100 + WORK_ITEMS[currentIndex].id}
                    </span>
                  </div>
                </motion.div>

                {/* Content with slide animation */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-heading text-white uppercase mb-5 leading-tight">
                      {WORK_ITEMS[currentIndex].title}
                    </h3>
                    <p className="text-zinc-400 text-base lg:text-lg leading-relaxed">
                      {WORK_ITEMS[currentIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="mt-10 lg:mt-12">
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="h-px bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / WORK_ITEMS.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={prev}
                    className="group flex-1 py-4 relative overflow-hidden border border-white/10 hover:border-amber-500/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98, x: -3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500"
                      initial={{ x: '-101%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <ChevronLeft size={24} className="relative z-10 mx-auto text-white/70 group-hover:text-black transition-colors" />
                  </motion.button>

                  <motion.button
                    onClick={next}
                    className="group flex-1 py-4 relative overflow-hidden bg-white/5 hover:bg-transparent border border-transparent hover:border-amber-500/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98, x: 3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
                      initial={{ x: '101%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <ChevronRight size={24} className="relative z-10 mx-auto text-white/70 group-hover:text-black transition-colors" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail dots / Progress indicators */}
        <motion.div
          className="mt-10 flex justify-center items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {WORK_ITEMS.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="relative group"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`h-[4px] rounded-full transition-all duration-500 ${idx === currentIndex
                  ? 'w-10 bg-gradient-to-r from-amber-500 to-amber-600'
                  : 'w-4 bg-white/20 group-hover:bg-white/40'
                  }`}
              />
              {idx === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Side decorations */}
      <motion.div
        className="absolute left-0 top-1/3 w-20 h-px bg-gradient-to-r from-amber-500/30 to-transparent"
        style={{ y: parallaxY }}
      />
      <motion.div
        className="absolute right-0 bottom-1/3 w-32 h-px bg-gradient-to-l from-white/10 to-transparent"
        style={{ y: useTransform(parallaxY, (v) => -v) }}
      />
    </section>
  );
};

export default Gallery;
