
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '../constants';

interface PreloaderProps {
    onComplete: () => void;
}

// Premium animated lines
const AnimatedLines: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal scanning line */}
        <motion.div
            className="absolute left-0 w-full h-px"
            style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.3) 50%, transparent 100%)',
            }}
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Vertical lines */}
        <motion.div
            className="absolute top-0 h-full w-px left-[10%]"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
            className="absolute top-0 h-full w-px right-[10%]"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
    </div>
);

// Floating particles
const FloatingDust: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-px h-px bg-white/30 rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [0, -50, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                }}
                transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'easeInOut',
                }}
            />
        ))}
    </div>
);

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'revealing' | 'complete'>('loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Much faster progress - complete in ~2 seconds
                const remaining = 100 - prev;
                const increment = Math.min(remaining * 0.3, 25);
                return Math.min(prev + increment + Math.random() * 5, 100);
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100 && phase === 'loading') {
            setPhase('revealing');
            setTimeout(() => {
                setPhase('complete');
                setTimeout(onComplete, 400);
            }, 600);
        }
    }, [progress, phase, onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'complete' && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
                    style={{
                        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #030303 100%)',
                    }}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: 'blur(10px)',
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    }}
                >
                    {/* Background grid */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    <AnimatedLines />
                    <FloatingDust />

                    {/* Ambient glow */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.05) 0%, transparent 60%)',
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Corner frames */}
                    <div className="absolute inset-8 pointer-events-none">
                        {/* Top left */}
                        <motion.div
                            className="absolute top-0 left-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute top-0 left-0 h-px bg-gradient-to-r from-amber-500 to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: 80 }}
                                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute top-0 left-0 w-px bg-gradient-to-b from-amber-500 to-transparent"
                                initial={{ height: 0 }}
                                animate={{ height: 80 }}
                                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.div>

                        {/* Top right */}
                        <motion.div
                            className="absolute top-0 right-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute top-0 right-0 h-px bg-gradient-to-l from-white/30 to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: 60 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute top-0 right-0 w-px bg-gradient-to-b from-white/30 to-transparent"
                                initial={{ height: 0 }}
                                animate={{ height: 60 }}
                                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.div>

                        {/* Bottom left */}
                        <motion.div
                            className="absolute bottom-0 left-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/20 to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: 50 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-px bg-gradient-to-t from-white/20 to-transparent"
                                initial={{ height: 0 }}
                                animate={{ height: 50 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            />
                        </motion.div>

                        {/* Bottom right */}
                        <motion.div
                            className="absolute bottom-0 right-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <motion.div
                                className="absolute bottom-0 right-0 h-px bg-gradient-to-l from-amber-500 to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: 80 }}
                                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-px bg-gradient-to-t from-amber-500 to-transparent"
                                initial={{ height: 0 }}
                                animate={{ height: 80 }}
                                transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.div>
                    </div>

                    {/* Main Logo */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Logo glow */}
                        <motion.div
                            className="absolute inset-0 blur-3xl"
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="w-full h-full bg-amber-500/30 rounded-full" />
                        </motion.div>

                        {/* Logo */}
                        <div className="relative font-heading text-7xl md:text-9xl text-white flex flex-nowrap items-baseline gap-10 py-8 px-4 leading-normal">
                            <motion.span
                                className="relative inline-block"
                                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span
                                    className="italic text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
                                        textShadow: '0 0 60px rgba(245, 158, 11, 0.5)',
                                    }}
                                >
                                    F
                                </span>
                            </motion.span>
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                GARAGE
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Progress Section */}
                    <motion.div
                        className="mt-20 w-80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        {/* Progress bar container */}
                        <div className="relative h-[2px] bg-white/5 overflow-hidden">
                            {/* Progress fill */}
                            <motion.div
                                className="absolute inset-y-0 left-0"
                                style={{
                                    background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />

                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-y-0 w-32"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                                }}
                                animate={{ x: ['-100%', '500%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />

                            {/* Glow at progress end */}
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                                style={{
                                    left: `${progress}%`,
                                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 70%)',
                                    filter: 'blur(4px)',
                                }}
                            />
                        </div>

                        {/* Progress text */}
                        <div className="flex justify-between mt-5 text-xs font-stencil tracking-widest">
                            <motion.span
                                className="text-zinc-600 uppercase"
                                animate={{ opacity: phase === 'revealing' ? [1, 0] : 1 }}
                            >
                                {phase === 'revealing' ? 'Bem-vindo' : 'Carregando'}
                            </motion.span>
                            <motion.span
                                className="text-amber-500 tabular-nums font-medium"
                                key={Math.floor(progress)}
                                initial={{ scale: 1.2, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                {Math.floor(progress)}%
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Audio visualizer decoration */}
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-[3px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        {[...Array(16)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-[2px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-full"
                                animate={{
                                    height: [6, 15 + Math.random() * 25, 6],
                                }}
                                transition={{
                                    duration: 0.4 + Math.random() * 0.4,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Bottom tagline */}
                    <motion.p
                        className="absolute bottom-10 text-zinc-700 text-xs font-stencil tracking-[0.4em] uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === 'revealing' ? 1 : 0.4 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        {phase === 'revealing' ? '• Clássicos Americanos •' : 'Preparando Experiência'}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
