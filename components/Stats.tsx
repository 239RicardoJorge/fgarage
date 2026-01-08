
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
        duration: 2000
    },
    {
        icon: Clock,
        value: 25,
        suffix: "",
        label: "Anos de Experiência",
        duration: 1500
    },
    {
        icon: Award,
        value: 100,
        suffix: "%",
        label: "Clientes Satisfeitos",
        duration: 1800
    },
    {
        icon: Users,
        value: 500,
        suffix: "+",
        label: "Projetos Concluídos",
        duration: 2200
    }
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

const StatCard: React.FC<{ stat: Stat; index: number; isInView: boolean }> = ({ stat, index, isInView }) => {
    const count = useCounter(stat.value, stat.duration, isInView);

    return (
        <motion.div
            className="relative text-center py-10 px-6 group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
        >
            {/* Vertical divider (except last) */}
            {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
            )}

            {/* Icon with pulse effect */}
            <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <div className="relative">
                    <stat.icon size={32} className="text-amber-500" />
                    {/* Pulse ring */}
                    <motion.div
                        className="absolute inset-0 border-2 border-amber-500 rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: index * 0.3,
                            ease: "easeOut"
                        }}
                    />
                </div>
            </motion.div>

            {/* Animated number */}
            <motion.div
                className="font-heading text-5xl md:text-6xl text-white mb-2"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
            >
                {count}
                <span className="text-amber-500">{stat.suffix}</span>
            </motion.div>

            {/* Label */}
            <motion.p
                className="text-zinc-500 text-sm font-stencil uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.4 }}
            >
                {stat.label}
            </motion.p>

            {/* Hover glow */}
            <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/5 transition-colors duration-300 pointer-events-none" />
        </motion.div>
    );
};

const Stats: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-16 bg-[#0a0a0a] relative overflow-hidden" ref={ref}>
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                {/* Engine-like pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 25%),
                              radial-gradient(circle at 75% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 25%)`,
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Main container with industrial border */}
                <motion.div
                    className="border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-amber-600" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-amber-600" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-amber-600" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-amber-600" />

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} stat={stat} index={idx} isInView={isInView} />
                        ))}
                    </div>
                </motion.div>

                {/* Bottom tagline */}
                <motion.p
                    className="text-center text-zinc-600 text-sm mt-8 font-stencil tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    NÚMEROS QUE <span className="text-amber-600">FALAM</span> POR SI
                </motion.p>
            </div>
        </section>
    );
};

export default Stats;
