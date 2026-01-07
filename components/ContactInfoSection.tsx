
import React from 'react';
import { motion } from 'framer-motion';
import { CONTACTS, MAP_URL } from '../constants';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

const ContactInfoSection: React.FC = () => {
  return (
    <section id="contacto" className="py-32 relative bg-[#0a0a0a] overflow-hidden">
      {/* Subtle Animated Background Glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 blur-[200px] rounded-full"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Left: Info Grid */}
          <motion.div
            className="p-10 lg:p-20 bg-zinc-900 border border-zinc-800"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-heading text-7xl md:text-9xl text-white mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              OFICINA
            </motion.h2>

            <div className="space-y-12">
              {/* Address - with hover animation */}
              <motion.div
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 flex items-center justify-center border-2 border-amber-600 text-amber-500"
                  whileHover={{
                    backgroundColor: "rgb(217, 119, 6)",
                    color: "#000",
                    scale: 1.05
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin size={28} />
                </motion.div>
                <div>
                  <h4 className="font-stencil text-xl text-zinc-500 uppercase mb-2">Instalações</h4>
                  <p className="text-white text-2xl font-heading tracking-wide leading-tight">{CONTACTS.address}</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Hours */}
                <motion.div
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="text-amber-500"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Clock size={28} />
                  </motion.div>
                  <div>
                    <h4 className="font-stencil text-sm text-zinc-500 uppercase mb-2">Escalas</h4>
                    <p className="text-zinc-200 text-lg font-typewriter">{CONTACTS.hours}</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="text-amber-500"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone size={28} />
                  </motion.div>
                  <div>
                    <h4 className="font-stencil text-sm text-zinc-500 uppercase mb-2">Linha Direta</h4>
                    <p className="text-zinc-200 text-lg font-typewriter">{CONTACTS.phone}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Certification Badge */}
            <motion.div
              className="mt-20 pt-10 border-t border-zinc-800 flex items-center gap-4 text-zinc-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="text-amber-600" />
              </motion.div>
              <span className="font-stencil uppercase tracking-[0.2em] text-sm">Qualidade Certificada F Garage</span>
            </motion.div>
          </motion.div>

          {/* Right: The MAP Action Area */}
          <motion.div
            className="relative overflow-hidden group border border-zinc-800 min-h-[600px] flex items-end"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format"
              alt="Industrial Workshop Entrance"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2]"
              whileHover={{ scale: 1.05, filter: "brightness(0.4)" }}
              transition={{ duration: 1 }}
            />

            <div className="relative z-20 p-12 lg:p-20 w-full">
              <motion.div
                className="w-24 h-1 bg-amber-600 mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />

              <motion.h3
                className="text-white font-heading text-6xl md:text-8xl mb-6 tracking-tighter"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                PRONTO PARA <span className="text-amber-500">RODAR?</span>
              </motion.h3>

              <motion.p
                className="text-zinc-400 text-xl font-typewriter mb-12 max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Localizados estrategicamente para servir os entusiastas de clássicos na região de Lisboa.
              </motion.p>

              <motion.a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-6 bg-amber-600 text-black font-black py-6 px-12"
                whileHover={{ backgroundColor: "#fff", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-stencil text-2xl tracking-widest">OBTER ROTA NO MAPA</span>
                <motion.div
                  whileHover={{ x: 8, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink size={24} />
                </motion.div>
              </motion.a>
            </div>

            {/* Animated Grid overlay */}
            <motion.div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                                 linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
              animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
