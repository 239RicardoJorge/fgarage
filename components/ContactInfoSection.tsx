
import React from 'react';
import { motion } from 'framer-motion';
import { CONTACTS, MAP_URL } from '../constants';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

const formatPhone = (phone: string) => phone.replace('+351 ', '');

const infoItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.4 }
  })
};

const ContactInfoSection: React.FC = () => {
  const contactItems = [
    { icon: MapPin, label: 'Localização', value: CONTACTS.address, href: MAP_URL },
    { icon: Clock, label: 'Horário', value: CONTACTS.hours, href: null },
    { icon: Phone, label: 'Telefone', value: formatPhone(CONTACTS.phone), href: `tel:${CONTACTS.phone.replace(/\s/g, '')}` },
  ];

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" aria-label="Informações de contacto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Info Panel */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 p-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-heading text-5xl text-white mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              OFICINA
            </motion.h2>

            <div className="space-y-8">
              {contactItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="flex gap-5 group"
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={infoItemVariants}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-amber-600/15 to-amber-700/5 border border-amber-600/30 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    whileHover={{ scale: 1.1, borderColor: "rgb(245, 158, 11)" }}
                  >
                    <item.icon size={20} className="text-amber-500" />
                  </motion.div>
                  <div className="flex-1">
                    <span className="text-amber-500 font-stencil text-[10px] uppercase tracking-[0.25em] block mb-2">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('tel:') ? undefined : '_blank'}
                        rel={item.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                        className="text-white text-base leading-relaxed hover:text-amber-500 transition-colors duration-300 block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Panel */}
          <motion.div
            className="relative min-h-[400px] flex items-end overflow-hidden border border-zinc-800 group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format"
              alt="Interior da oficina F Garage em Lisboa - ferramentas e espaço de trabalho para restauro de carros clássicos"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10 p-10 w-full">
              <motion.div
                className="w-12 h-[2px] bg-amber-600 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />

              <motion.h3
                className="font-heading text-4xl text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                PRONTO PARA <span className="text-amber-500">RODAR?</span>
              </motion.h3>

              <motion.p
                className="text-zinc-400 text-sm mb-8 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Localizados estrategicamente para servir os entusiastas de clássicos na região de Lisboa.
              </motion.p>

              <motion.a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Obter direcções no Google Maps"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-8 py-4 font-stencil text-sm uppercase tracking-wider hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-amber-900/20"
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Obter Direcções
                <ExternalLink size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
