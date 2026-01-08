
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Section IDs in order
const SECTIONS = ['hero', 'trabalhos', 'testemunhos', 'contacto'];

const ScrollIndicator: React.FC = () => {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Check if we're near the bottom of the page
            const isNearBottom = window.scrollY + windowHeight > documentHeight - 200;
            setIsAtEnd(isNearBottom);

            // Find current section
            let foundIndex = 0;
            SECTIONS.forEach((sectionId, idx) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const sectionTop = window.scrollY + rect.top;
                    if (scrollPosition >= sectionTop) {
                        foundIndex = idx;
                    }
                }
            });
            setCurrentSectionIndex(foundIndex);

            // Hide in footer area
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                setIsVisible(footerRect.top > windowHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (isAtEnd) {
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to next section
            const nextIndex = Math.min(currentSectionIndex + 1, SECTIONS.length - 1);
            const nextSection = document.getElementById(SECTIONS[nextIndex]);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={handleClick}
        >
            <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ y: isAtEnd ? 0 : [0, 8, 0] }}
                transition={{
                    y: { duration: 1.2, repeat: isAtEnd ? 0 : Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.2 }}
            >
                {/* Icon with flip animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isAtEnd ? 'up' : 'down'}
                        initial={{ opacity: 0, rotate: isAtEnd ? 180 : -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: isAtEnd ? -180 : 180 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                    >
                        {isAtEnd ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </motion.div>
                </AnimatePresence>

                {/* Label */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isAtEnd ? 'top' : 'scroll'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px] uppercase tracking-widest text-white/30 font-stencil"
                    >
                        {isAtEnd ? 'Voltar ao topo' : 'Scroll'}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default ScrollIndicator;
