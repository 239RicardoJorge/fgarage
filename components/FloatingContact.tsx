
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Settings } from 'lucide-react';
import { CONTACTS } from '../constants';

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            className="mb-6 flex flex-col gap-4 items-end"
          >
            <a
              href={`https://wa.me/${CONTACTS.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white px-8 py-5 shadow-2xl hover:scale-105 transition-all font-stencil text-lg uppercase tracking-wider"
            >
              <span>WhatsApp Técnico</span>
              <MessageCircle size={24} />
            </a>
            <a
              href={`tel:${CONTACTS.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-4 bg-amber-600 text-black px-8 py-5 shadow-2xl hover:scale-105 transition-all font-stencil text-lg uppercase tracking-wider"
            >
              <span>Ligar p/ Oficina</span>
              <Phone size={24} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-20 h-20 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${
          isOpen ? 'bg-zinc-800 text-white border-2 border-white/10' : 'bg-amber-600 text-black ring-4 ring-amber-600/20'
        }`}
      >
        {isOpen ? <X size={36} /> : <Settings size={36} className="animate-[spin_4s_linear_infinite]" />}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
