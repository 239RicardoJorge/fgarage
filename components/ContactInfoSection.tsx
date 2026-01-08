
import React from 'react';
import { motion } from 'framer-motion';
import { CONTACTS, MAP_URL } from '../constants';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

// Helper to format phone without country code
const formatPhone = (phone: string) => phone.replace('+351 ', '');

const ContactInfoSection: React.FC = () => {
  return (
    <section id="contacto" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Info Panel */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 p-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl text-white mb-10">OFICINA</h2>

            <div className="space-y-8">
              {/* Location */}
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-amber-500 font-stencil text-[10px] uppercase tracking-[0.2em] block mb-2">
                    Localização
                  </span>
                  <p className="text-white text-base leading-relaxed">
                    {CONTACTS.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-amber-500 font-stencil text-[10px] uppercase tracking-[0.2em] block mb-2">
                    Horário
                  </span>
                  <p className="text-white text-base leading-relaxed">
                    {CONTACTS.hours}
                  </p>
                </div>
              </div>

              {/* Phone - without +351 */}
              <div className="flex gap-5">
                <div className="w-10 h-10 bg-amber-600/10 border border-amber-600/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-amber-500 font-stencil text-[10px] uppercase tracking-[0.2em] block mb-2">
                    Telefone
                  </span>
                  <p className="text-white text-base leading-relaxed">
                    {formatPhone(CONTACTS.phone)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Panel */}
          <motion.div
            className="relative min-h-[400px] flex items-end overflow-hidden border border-zinc-800"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format"
              alt="Workshop"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10 p-10 w-full">
              <div className="w-12 h-[2px] bg-amber-600 mb-6" />

              <h3 className="font-heading text-4xl text-white mb-3">
                PRONTO PARA <span className="text-amber-500">RODAR?</span>
              </h3>

              <p className="text-zinc-400 text-sm mb-8 max-w-md leading-relaxed">
                Localizados estrategicamente para servir os entusiastas de clássicos na região de Lisboa.
              </p>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-amber-600 text-black px-6 py-3 font-stencil text-sm uppercase tracking-wider hover:bg-white transition-colors"
              >
                Obter Direcções
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
