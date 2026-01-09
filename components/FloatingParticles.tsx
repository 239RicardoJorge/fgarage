
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    type: 'dust' | 'spark' | 'orb';
    color: string;
}

// Generate particles with variety
const generateParticles = (count: number): Particle[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 20 + 15,
        type: Math.random() > 0.85 ? 'spark' : Math.random() > 0.7 ? 'orb' : 'dust',
        color: Math.random() > 0.7 ? 'amber' : 'white',
    }));
};

// Individual particle component
const Particle: React.FC<{ particle: Particle }> = ({ particle }) => {
    const getParticleStyle = () => {
        switch (particle.type) {
            case 'spark':
                return {
                    width: particle.size * 1.5,
                    height: particle.size * 1.5,
                    background: particle.color === 'amber'
                        ? 'radial-gradient(circle, rgba(245, 158, 11, 0.9) 0%, rgba(245, 158, 11, 0) 70%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
                    boxShadow: particle.color === 'amber'
                        ? '0 0 10px rgba(245, 158, 11, 0.5)'
                        : '0 0 8px rgba(255, 255, 255, 0.3)',
                };
            case 'orb':
                return {
                    width: particle.size * 2,
                    height: particle.size * 2,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                };
            default:
                return {
                    width: particle.size,
                    height: particle.size,
                    background: particle.color === 'amber'
                        ? 'rgba(245, 158, 11, 0.4)'
                        : 'rgba(255, 255, 255, 0.3)',
                };
        }
    };

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                ...getParticleStyle(),
            }}
            animate={{
                y: [0, -30, 0, 20, 0],
                x: [0, 10, -10, 5, 0],
                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.5, particle.opacity],
                scale: particle.type === 'spark' ? [1, 1.3, 0.8, 1] : [1, 1.1, 0.9, 1],
            }}
            transition={{
                duration: particle.speed,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
            }}
        />
    );
};

// Ambient light orbs that follow scroll
const AmbientOrbs: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {/* Top left warm glow */}
            <motion.div
                className="absolute -top-1/4 -left-1/4 w-[50vw] h-[50vh]"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Bottom right subtle warm glow */}
            <motion.div
                className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vh]"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(180, 83, 9, 0.015) 0%, transparent 70%)',
                    filter: 'blur(120px)',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -20, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Center accent */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh]"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.015) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

// Moving grid lines
const GridOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden opacity-[0.015]">
            {/* Vertical lines - reduced count */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 h-full w-px bg-white/50"
                    style={{ left: `${(i + 1) * 25}%` }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Horizontal lines - reduced count */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute left-0 w-full h-px bg-white/30"
                    style={{ top: `${(i + 1) * 25}%` }}
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

// Grain overlay
const GrainOverlay: React.FC = () => (
    <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.02] mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
    />
);

// Cursor follow light (subtle)
const CursorLight: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 50 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <motion.div
            className="fixed pointer-events-none z-[1] hidden md:block"
            style={{
                x,
                y,
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 60%)',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(40px)',
            }}
        />
    );
};

const FloatingParticles: React.FC = () => {
    const [particles] = useState<Particle[]>(() => generateParticles(18));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay particle appearance for smooth load
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AmbientOrbs />
            <GridOverlay />
            <GrainOverlay />
            <CursorLight />

            {/* Floating particles */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[3] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 2 }}
            >
                {particles.map((particle) => (
                    <Particle key={particle.id} particle={particle} />
                ))}

                {/* Random floating amber sparks */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`spark-${i}`}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + Math.random() * 40}%`,
                            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 70%)',
                            boxShadow: '0 0 8px rgba(245, 158, 11, 0.5), 0 0 4px rgba(255, 200, 50, 0.8)',
                        }}
                        animate={{
                            y: [0, -100 - Math.random() * 100, 0],
                            x: [0, (Math.random() - 0.5) * 80, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.2, 0],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: i * 3 + Math.random() * 2,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </motion.div>
        </>
    );
};

export default FloatingParticles;
