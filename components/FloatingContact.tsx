
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageCircle } from 'lucide-react';
import { CONTACTS } from '../constants';

// Helper to format phone without country code
const formatPhone = (phone: string) => phone.replace('+351 ', '');

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-64 bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              <a
                href={`https://wa.me/${CONTACTS.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-[#25D366] text-white hover:bg-[#20b858] transition-colors"
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
              <a
                href={`tel:${CONTACTS.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                <Phone size={18} />
                <span className="text-sm font-medium">{formatPhone(CONTACTS.phone)}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center shadow-xl transition-all ${isOpen
            ? 'bg-zinc-700 text-white'
            : 'bg-amber-600 text-black hover:bg-amber-500'
          }`}
      >
        {isOpen ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
};

export default FloatingContact;
