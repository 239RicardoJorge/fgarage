
import React from 'react';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ContactInfoSection from './components/ContactInfoSection';
import FloatingContact from './components/FloatingContact';
import { BRAND_NAME } from './constants';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header - Logo left, Social right */}
      <header className="absolute top-0 left-0 w-full z-[60] py-6 px-8 flex justify-between items-center">
        <a href="#" className="font-heading text-4xl md:text-5xl text-white tracking-tighter flex items-center gap-2">
          <span className="text-amber-600 italic">F</span>
          <span className="hidden sm:inline">GARAGE</span>
        </a>

        {/* Social Icons - Top Right */}
        <div className="flex gap-2">
          {[Instagram, Youtube, Facebook].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-amber-600 hover:text-amber-500 transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </header>

      <Hero />

      <main>
        <Gallery />
        <ContactInfoSection />
      </main>

      {/* Footer - Compact but proper layout */}
      <footer className="py-10 bg-[#050505] border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand - Left side */}
            <div>
              <div className="font-heading text-4xl text-zinc-800 italic mb-2">
                {BRAND_NAME}
              </div>
              <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">
                Preservando a história automotiva com engenharia de precisão e paixão pelo metal.
              </p>
            </div>

            {/* Copyright - Left aligned, darker/subtle */}
            <div
              className="text-left uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '-0.02em',
                lineHeight: '1',
              }}
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
            </div>
          </div>
        </div>
      </footer>

      <FloatingContact />
    </div>
  );
};

export default App;
