
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, MessageCircle } from 'lucide-react';
import { CONTACTS } from '../constants';

const formatPhone = (phone: string) => phone.replace('+351 ', '');

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!hasClicked) setHasClicked(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Attention pulse when not clicked */}
      {!hasClicked && (
        <motion.div
          className="absolute inset-0 bg-amber-600 rounded-sm"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-64 bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden"
          >
            <div className="p-2 space-y-1">
              <motion.a
                href={`https://wa.me/${CONTACTS.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-[#25D366] text-white hover:bg-[#20b858] transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.a>
              <motion.a
                href={`tel:${CONTACTS.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} />
                <span className="text-sm font-medium">{formatPhone(CONTACTS.phone)}</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleOpen}
        className={`w-14 h-14 flex items-center justify-center shadow-xl relative overflow-hidden group ${isOpen
          ? 'bg-zinc-700 text-white'
          : 'bg-zinc-900 border border-zinc-700 text-white'
          }`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          boxShadow: isOpen
            ? '0 10px 25px rgba(0,0,0,0.3)'
            : '0 10px 40px rgba(0, 0, 0, 0.4)'
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        )}
        <div className={`relative z-10 transition-colors duration-300 ${!isOpen ? 'group-hover:text-black' : ''}`}>
          {isOpen ? <X size={22} /> : <Phone size={22} />}
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingContact;
