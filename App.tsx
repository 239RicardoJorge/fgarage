
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import ContactInfoSection from './components/ContactInfoSection';
import FloatingContact from './components/FloatingContact';

import Preloader from './components/Preloader';
import { BRAND_NAME } from './constants';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Premium Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}



      <div className={`min-h-screen bg-[#050505] ${isLoading ? 'overflow-hidden' : ''}`}>
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber-500 focus:text-black focus:px-4 focus:py-2 focus:font-stencil focus:text-sm focus:uppercase focus:tracking-wider"
        >
          Ir para o conteúdo principal
        </a>

        {/* Header - Animated on load */}
        <motion.header
          className="fixed top-0 left-0 w-full z-[60] py-6 px-8 flex justify-between items-center mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="#"
            className="font-heading text-4xl md:text-5xl text-white tracking-tighter flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            data-magnetic
            data-hover
          >
            <span className="text-amber-500 italic">F</span>
            <span className="hidden sm:inline">GARAGE</span>
          </motion.a>

          {/* Social Icons */}
          <div className="flex gap-2">
            {[
              { Icon: Instagram, label: 'Instagram', url: '#' },
              { Icon: Youtube, label: 'YouTube', url: '#' },
              { Icon: Facebook, label: 'Facebook', url: '#' }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                aria-label={social.label}
                className="w-10 h-10 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:border-amber-600 hover:text-amber-500 transition-colors backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -10 : 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                data-magnetic
                data-cursor-text="VER"
              >
                <social.Icon size={16} />
              </motion.a>
            ))}
          </div>
        </motion.header>

        <Hero />

        <main id="main-content" role="main">
          <Services />

          <Gallery />
          <Stats />
          <Testimonials />
          <ContactInfoSection />
        </main>

        {/* Footer - Premium with magnetic effects */}
        <footer className="py-20 bg-[#030303] border-t border-zinc-900/50 relative overflow-hidden" role="contentinfo">
          {/* Background grain */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.03]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, transparent 70%)'
            }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start gap-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Brand */}
              <motion.div
                className="max-w-sm"
              >
                <div className="font-heading text-6xl text-white italic mb-5">
                  <span className="text-amber-500">F</span>GARAGE
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                  Preservando a história automotiva com engenharia de precisão e paixão pelo metal.
                </p>
                <p className="text-zinc-600 text-xs font-stencil tracking-wider mb-6">
                  Oficina especializada desde 1999
                </p>

                {/* Social links in footer */}
                <nav className="flex gap-3" aria-label="Redes sociais">
                  {[
                    { Icon: Instagram, label: 'Instagram', url: 'https://instagram.com/fgarage' },
                    { Icon: Youtube, label: 'YouTube', url: 'https://youtube.com/fgarage' },
                    { Icon: Facebook, label: 'Facebook', url: 'https://facebook.com/fgarage' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.url}
                      aria-label={social.label}
                      className="w-11 h-11 border border-zinc-800/50 flex items-center justify-center text-zinc-600 hover:border-amber-500/50 hover:text-amber-500 hover:bg-amber-500/5 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      data-magnetic
                    >
                      <social.Icon size={18} />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>

              {/* Quick Links */}
              <nav className="grid grid-cols-2 gap-16" aria-label="Links de navegação">
                <div>
                  <h4 className="text-amber-500 font-stencil text-xs tracking-[0.25em] uppercase mb-5">
                    Navegação
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { name: 'Serviços', href: '#servicos' },
                      { name: 'Projetos', href: '#trabalhos' },
                      { name: 'Testemunhos', href: '#testemunhos' },
                      { name: 'Contacto', href: '#contacto' }
                    ].map((link, idx) => (
                      <li key={idx}>
                        <motion.a
                          href={link.href}
                          className="text-zinc-500 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                          whileHover={{ x: 5 }}
                        >
                          <span className="w-0 group-hover:w-5 h-px bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300" />
                          {link.name}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-amber-500 font-stencil text-xs tracking-[0.25em] uppercase mb-5">
                    Contacto
                  </h4>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <a href="tel:+351912345678" className="text-zinc-500 hover:text-amber-500 transition-colors duration-300">
                        +351 912 345 678
                      </a>
                    </li>
                    <li>
                      <a href="mailto:contato@fgarage.pt" className="text-zinc-500 hover:text-amber-500 transition-colors duration-300">
                        contato@fgarage.pt
                      </a>
                    </li>
                    <li className="text-zinc-600 text-xs leading-relaxed pt-2">
                      <a
                        href="https://maps.app.goo.gl/6AmUNBUaj6x1HVwH6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-400 transition-colors duration-300"
                      >
                        Estrada de Paço de Arcos, 12<br />
                        2735-307 Agualva-Cacém
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Credit */}
              <motion.div
                className="text-right hidden md:flex flex-col items-end"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-zinc-600 text-[10px] tracking-widest uppercase mb-2">
                  Designed & Development
                </p>
                <a
                  href="https://rjbstudio.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-amber-500 transition-colors duration-300 leading-tight"
                >
                  <span className="block text-xs"><span className="font-bold">R</span>\CARDO</span>
                  <span className="block text-xs">JORGE</span>
                  <span className="block text-xs"><span className="font-bold">BAT</span>/STA</span>
                </a>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/30 my-4" />
                <p className="text-zinc-800 text-xs">
                  © {new Date().getFullYear()} F GARAGE
                </p>
              </motion.div>
            </motion.div>

            {/* Bottom bar */}
            <motion.div
              className="mt-20 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-zinc-700 text-xs text-center md:text-left">
                Todos os direitos reservados. Feito com <span className="text-red-500">♥</span> em Portugal.
              </p>
              <p className="text-zinc-800 text-[10px] font-stencil tracking-[0.2em]">
                CLÁSSICOS AMERICANOS • RESTAURO • PERFORMANCE
              </p>
            </motion.div>
          </div>
        </footer>

        <FloatingContact />

      </div>
    </>
  );
};

export default App;
