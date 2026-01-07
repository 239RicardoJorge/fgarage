
import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactInfoSection from './components/ContactInfoSection';
import FloatingContact from './components/FloatingContact';
import { BRAND_NAME } from './constants';
import { Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Heavy Duty Header with Subtle Animation */}
      <motion.header
        className="absolute top-0 left-0 w-full z-[60] py-8 px-10 flex justify-between items-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="font-heading text-6xl text-white tracking-tighter flex items-center gap-3 pointer-events-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-amber-600 italic">F</span> GARAGE
        </motion.div>
        <nav className="hidden md:flex gap-16 font-stencil text-lg tracking-[0.3em] text-zinc-400 uppercase pointer-events-auto">
          <motion.a
            href="#trabalhos"
            className="hover:text-amber-500 transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Logbook
          </motion.a>
          <motion.a
            href="#contacto"
            className="hover:text-amber-500 transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Serviços
          </motion.a>
          <motion.a
            href="#contacto"
            className="border-b border-amber-600/50 pb-1"
            whileHover={{ y: -2, color: "rgb(245, 158, 11)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Agendamento
          </motion.a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <Hero />

      {/* Content Area */}
      <main className="relative">
        {/* Subtle separator shadow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

        <Gallery />
        <ContactInfoSection />
      </main>

      {/* Industrial Footer with Animations */}
      <footer className="py-24 bg-[#050505] border-t border-zinc-900 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div
              className="font-heading text-8xl text-zinc-700 mb-6 italic"
              whileHover={{ color: "rgb(63, 63, 70)" }}
              transition={{ duration: 0.3 }}
            >
              {BRAND_NAME}
            </motion.div>
            <p className="text-zinc-500 font-typewriter max-w-sm">
              Preservando a história automotiva com engenharia de precisão e paixão pelo metal.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-10">
            {/* Social Media Icons with Staggered Animation */}
            <div className="flex gap-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: MessageCircle, label: "WhatsApp" }
              ].map(({ Icon, label }, idx) => (
                <motion.a
                  key={label}
                  href="#"
                  className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-zinc-500"
                  aria-label={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{
                    borderColor: "rgb(245, 158, 11)",
                    color: "rgb(245, 158, 11)",
                    scale: 1.1
                  }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
            {/* Copyright */}
            <motion.p
              className="text-zinc-700 font-typewriter text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              © RICARDO JORGE BATISTA 2026
            </motion.p>
          </div>
        </motion.div>
      </footer>

      {/* Global Overlays */}
      <FloatingContact />
    </div>
  );
};

export default App;
