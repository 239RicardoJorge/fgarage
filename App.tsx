import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ContactInfoSection from './components/ContactInfoSection';
import FloatingContact from './components/FloatingContact';
import ScrollIndicator from './components/ScrollIndicator';
import { BRAND_NAME } from './constants';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header - Animated on load */}
      <motion.header
        className="absolute top-0 left-0 w-full z-[60] py-6 px-8 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.a
          href="#"
          className="font-heading text-4xl md:text-5xl text-white tracking-tighter flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-amber-600 italic">F</span>
          <span className="hidden sm:inline">GARAGE</span>
        </motion.a>

        {/* Social Icons */}
        <div className="flex gap-2">
          {[Instagram, Youtube, Facebook].map((Icon, idx) => (
            <motion.a
              key={idx}
              href="#"
              className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-amber-600 hover:text-amber-500 transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </motion.header>

      <Hero />

      <main>
        <Gallery />
        <Testimonials />
        <ContactInfoSection />
      </main>

      {/* Footer - with animations */}
      <footer className="py-10 bg-[#050505] border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Brand */}
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="font-heading text-4xl text-zinc-800 italic mb-2">
                {BRAND_NAME}
              </div>
              <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
                Preservando a história automotiva com engenharia de precisão e paixão pelo metal.
              </p>
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="text-left uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '-0.02em',
                lineHeight: '1',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="block text-zinc-700">
                <span className="font-extrabold text-zinc-600">R</span>
                <span className="font-normal"> \ CARDO</span>
              </span>
              <span className="block text-zinc-600 font-extrabold">
                JORGE
              </span>
              <span className="block text-zinc-700">
                <span className="font-extrabold text-zinc-600">BAT</span>
                <span className="font-normal"> / STA</span>
              </span>
              <span className="block text-zinc-700 text-xs mt-1 tracking-wider font-normal">
                © 2026
              </span>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      <FloatingContact />
      <ScrollIndicator />
    </div>
  );
};

export default App;
