
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Car, Clock, Award, Users } from 'lucide-react';

interface Stat {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    duration: number;
}

const stats: Stat[] = [
    {
        icon: Car,
        value: 150,
        suffix: "+",
        label: "Clássicos Restaurados",
        duration: 2000,
    },
    {
        icon: Clock,
        value: 25,
        suffix: "",
        label: "Anos de Experiência",
        duration: 1500,
    },
    {
        icon: Award,
        value: 100,
        suffix: "%",
        label: "Clientes Satisfeitos",
        duration: 1800,
    },
    {
        icon: Users,
        value: 500,
        suffix: "+",
        label: "Projetos Concluídos",
        duration: 2200,
    },
];

// Animated counter hook
const useCounter = (end: number, duration: number, start: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
};

const StatCard: React.FC<{ stat: Stat; index: number; isInView: boolean }> = ({
    stat,
    index,
    isInView,
}) => {
    const count = useCounter(stat.value, stat.duration, isInView);

    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* Card container */}
            <div className="relative py-12 px-8 text-center overflow-hidden">
                {/* Background gradient on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* Vertical divider */}
                {index < stats.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}

                {/* Icon with glow */}
                <motion.div
                    className="relative mb-6 inline-block"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    {/* Icon glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full blur-xl bg-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Icon container */}
                    <div className="relative w-14 h-14 flex items-center justify-center">
                        <stat.icon
                            size={28}
                            className="text-amber-500"
                            strokeWidth={1.5}
                        />
                    </div>

                    {/* Pulse rings */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-amber-500/30"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={isInView ? { scale: [1, 2, 2.5], opacity: [0.5, 0.2, 0] } : {}}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            delay: index * 0.4,
                            ease: 'easeOut',
                        }}
                    />
                </motion.div>

                {/* Number display */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                        delay: index * 0.15 + 0.2,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                    }}
                >
                    {/* Number glow effect */}
                    <div className="absolute inset-0 font-heading text-5xl md:text-6xl lg:text-7xl text-amber-500/20 blur-xl">
                        {count}
                        <span>{stat.suffix}</span>
                    </div>

                    {/* Actual number */}
                    <div className="relative font-heading text-5xl md:text-6xl lg:text-7xl text-white">
                        <span className="tabular-nums">{count}</span>
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                            }}
                        >
                            {stat.suffix}
                        </span>
                    </div>
                </motion.div>

                {/* Label */}
                <motion.p
                    className="mt-4 text-zinc-500 text-sm font-stencil uppercase tracking-[0.15em] group-hover:text-zinc-400 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.5 }}
                >
                    {stat.label}
                </motion.p>

                {/* Bottom accent line */}
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-16 transition-all duration-500 ease-out"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)',
                    }}
                />
            </div>
        </motion.div>
    );
};

const Stats: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef(null);
    const isInView = useInView(contentRef, { once: true, margin: '-100px' });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-24 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
            }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial glows */}
                <motion.div
                    className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        y,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        y: useTransform(y, (v) => -v),
                    }}
                />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px',
                    }}
                />
            </div>

            <div
                className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10"
                ref={contentRef}
            >
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-amber-500 font-stencil text-xs tracking-[0.25em] uppercase mb-4">
                        Estatísticas
                    </p>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
                        Números que{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                            falam
                        </span>{' '}
                        por si
                    </h2>
                </motion.div>

                {/* Main container */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Outer border glow */}
                    <div className="absolute -inset-px bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Container with glassmorphism */}
                    <div className="relative border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                        {/* Corner accents */}
                        <motion.div
                            className="absolute -top-px -left-px w-8 h-8 border-l-2 border-t-2 border-amber-500"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute -top-px -right-px w-8 h-8 border-r-2 border-t-2 border-amber-500"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute -bottom-px -left-px w-8 h-8 border-l-2 border-b-2 border-amber-500"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute -bottom-px -right-px w-8 h-8 border-r-2 border-b-2 border-amber-500"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        />

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
                            initial={{ x: '-100%' }}
                            whileInView={{ x: '100%' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
                        />

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, idx) => (
                                <StatCard key={idx} stat={stat} index={idx} isInView={isInView} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Side decorative lines */}
            <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-amber-500/30 to-transparent"
                style={{ y }}
            />
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-white/10 to-transparent"
                style={{ y: useTransform(y, (v) => -v) }}
            />
        </section>
    );
};

export default Stats;
