
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORK_ITEMS } from '../constants';
import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? WORK_ITEMS.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <section id="trabalhos" className="py-20 bg-[#080808] relative overflow-hidden">
      {/* Decorative animated wrench */}
      <motion.div
        className="absolute top-20 right-10 text-zinc-800/30 hidden lg:block"
        animate={{ rotate: [0, 15, 0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Wrench size={80} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.span
              className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase block mb-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Logbook de Operações
            </motion.span>
            <motion.h2
              className="font-heading text-5xl md:text-6xl text-white"
              whileHover={{ x: 5 }}
            >
              PROJETOS
            </motion.h2>
          </div>
          <motion.p
            className="hidden md:block text-zinc-500 text-sm max-w-xs text-right leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Restauro completo e afinação de performance com engenharia de precisão.
          </motion.p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-zinc-800 bg-zinc-900/50 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Image with slide animation */}
          <div className="lg:col-span-3 relative aspect-[4/3] overflow-hidden group">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={WORK_ITEMS[currentIndex].image}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Hover zoom overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            />

            {/* Fun corner brackets on hover */}
            <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500" />
            </div>

            {/* Image Counter with pulse */}
            <motion.div
              className="absolute bottom-4 left-4 bg-black/70 px-3 py-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="font-stencil text-amber-500 text-xs"
                key={currentIndex}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
              >
                {String(currentIndex + 1).padStart(2, '0')} / {String(WORK_ITEMS.length).padStart(2, '0')}
              </motion.span>
            </motion.div>
          </div>

          {/* Details with slide */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <motion.div
                className="inline-block bg-amber-600 text-black px-3 py-1 mb-6"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-stencil text-xs tracking-wider">
                  LOGBOOK #{100 + WORK_ITEMS[currentIndex].id}
                </span>
              </motion.div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-3xl font-heading text-white uppercase mb-4">
                    {WORK_ITEMS[currentIndex].title}
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    {WORK_ITEMS[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation with cool effects */}
            <div className="flex gap-3 mt-8">
              <motion.button
                onClick={prev}
                className="flex-1 py-4 border border-zinc-700 text-white flex items-center justify-center hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95, x: -5 }}
              >
                <motion.span
                  className="absolute inset-0 bg-amber-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <ChevronLeft size={22} className="relative z-10" />
              </motion.button>
              <motion.button
                onClick={next}
                className="flex-1 py-4 bg-zinc-800 text-white flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95, x: 5 }}
              >
                <motion.span
                  className="absolute inset-0 bg-amber-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <ChevronRight size={22} className="relative z-10" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress with fun animation */}
        <motion.div
          className="mt-6 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {WORK_ITEMS.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
              className={`h-1 rounded-sm transition-all ${idx === currentIndex ? 'w-10 bg-amber-600' : 'w-4 bg-zinc-700 hover:bg-zinc-600'}`}
              whileHover={{ scale: 1.3, y: -2 }}
              whileTap={{ scale: 0.9 }}
              animate={idx === currentIndex ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
