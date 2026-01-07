
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORK_ITEMS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? WORK_ITEMS.length - 1 : prev - 1));

  return (
    <section id="trabalhos" className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with Reveal Animation */}
        <motion.div
          className="flex items-end justify-between mb-16 border-b-2 border-zinc-800 pb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.span
              className="text-amber-600 font-stencil text-xl tracking-tighter uppercase mb-2 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Operações de Manutenção
            </motion.span>
            <motion.h2
              className="font-heading text-6xl md:text-9xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              PROJETOS
            </motion.h2>
          </div>
          <motion.div
            className="hidden md:block font-typewriter text-zinc-500 max-w-xs text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Restauro completo, afinação de performance e consultoria mecânica de precisão.
          </motion.div>
        </motion.div>

        {/* Gallery Card with Enhanced Animations */}
        <motion.div
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Image Pane */}
          <div className="lg:col-span-8 aspect-square lg:aspect-video relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={WORK_ITEMS[currentIndex].image}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
              />
            </AnimatePresence>

            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600/50" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600/50" />
          </div>

          {/* Details Pane */}
          <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${currentIndex}`}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <motion.div
                    className="inline-block px-3 py-1 bg-amber-600 text-black font-stencil text-sm mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    LOGBOOK #{100 + WORK_ITEMS[currentIndex].id}
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-heading text-white mb-6 uppercase tracking-tight">
                    {WORK_ITEMS[currentIndex].title}
                  </h3>
                  <p className="text-zinc-400 text-xl font-typewriter leading-relaxed">
                    {WORK_ITEMS[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons with Enhanced Animations */}
            <div className="flex gap-4">
              <motion.button
                onClick={prev}
                className="flex-1 py-6 border border-zinc-700 text-white flex justify-center"
                whileHover={{
                  backgroundColor: "rgb(245, 158, 11)",
                  color: "#000",
                  borderColor: "rgb(245, 158, 11)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={32} />
              </motion.button>
              <motion.button
                onClick={next}
                className="flex-1 py-6 bg-zinc-800 text-white flex justify-center"
                whileHover={{
                  backgroundColor: "rgb(245, 158, 11)",
                  color: "#000"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={32} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {WORK_ITEMS.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-amber-600' : 'w-4 bg-zinc-700'
                }`}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
