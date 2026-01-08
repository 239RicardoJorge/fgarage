
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORK_ITEMS } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev === WORK_ITEMS.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? WORK_ITEMS.length - 1 : prev - 1));

  return (
    <section id="trabalhos" className="py-20 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase block mb-2">
              Logbook de Operações
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-white">PROJETOS</h2>
          </div>
          <p className="hidden md:block text-zinc-500 text-sm max-w-xs text-right leading-relaxed">
            Restauro completo e afinação de performance com engenharia de precisão.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-zinc-800 bg-zinc-900/50">
          {/* Image */}
          <div className="lg:col-span-3 relative aspect-[4/3] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={WORK_ITEMS[currentIndex].image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1">
              <span className="font-stencil text-amber-500 text-xs">
                {String(currentIndex + 1).padStart(2, '0')} / {String(WORK_ITEMS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <div className="inline-block bg-amber-600 text-black px-3 py-1 mb-6">
                <span className="font-stencil text-xs tracking-wider">
                  LOGBOOK #{100 + WORK_ITEMS[currentIndex].id}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
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

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prev}
                className="flex-1 py-4 border border-zinc-700 text-white flex items-center justify-center hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="flex-1 py-4 bg-zinc-800 text-white flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 flex justify-center gap-2">
          {WORK_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-sm transition-all ${idx === currentIndex ? 'w-10 bg-amber-600' : 'w-4 bg-zinc-700 hover:bg-zinc-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
