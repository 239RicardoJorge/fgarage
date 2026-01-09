
import React from 'react';
import { motion } from 'framer-motion';
import { LineReveal, ScrollTextReveal } from './TextAnimations';

const CinematicStory: React.FC = () => {
    return (
        <section className="relative py-32 lg:py-48 bg-[#050505] overflow-hidden">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-15"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
            </div>

            {/* Floating chrome elements */}
            <motion.div
                className="absolute top-1/4 left-10 w-32 h-32 opacity-10"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full border border-amber-600/30" />
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 right-10 w-48 h-48 opacity-10"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-full h-full rounded-full border border-amber-600/20" />
            </motion.div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Eyebrow */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 border border-amber-600/30 text-amber-500 font-stencil text-xs tracking-[0.3em] uppercase">
                        A Nossa História
                    </span>
                </motion.div>

                {/* Main headline with line reveal */}
                <LineReveal
                    lines={[
                        "NÃO RESTAURAMOS",
                        "APENAS CARROS."
                    ]}
                    className="mb-8"
                    lineClassName="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight"
                />

                {/* Second line with accent */}
                <motion.div
                    className="overflow-hidden mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.h3
                        className="font-heading text-4xl md:text-6xl lg:text-7xl"
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        RESSUSCITAMOS{' '}
                        <span className="text-amber-500 italic">LENDAS.</span>
                    </motion.h3>
                </motion.div>

                {/* Paragraph with scroll reveal */}
                <ScrollTextReveal className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Cada clássico que entra na F Garage carrega décadas de história.
                    O nosso trabalho é honrar essa herança com engenharia de precisão
                    e paixão genuína pelo automobilismo vintage.
                </ScrollTextReveal>

                {/* Stats row */}
                <motion.div
                    className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {[
                        { number: "1999", label: "Desde" },
                        { number: "150+", label: "Restauros" },
                        { number: "100%", label: "Paixão" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="font-heading text-3xl md:text-4xl text-amber-500 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-zinc-600 text-xs font-stencil uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Corner frame */}
            <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-amber-600/20" />
            <div className="absolute top-10 right-10 w-16 h-16 border-r border-t border-amber-600/20" />
            <div className="absolute bottom-10 left-10 w-16 h-16 border-l border-b border-amber-600/20" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-amber-600/20" />
        </section>
    );
};

export default CinematicStory;
