
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Wrench, Gauge, PaintBucket, Cog, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
    accentColor: string;
}

const services: Service[] = [
    {
        icon: Wrench,
        title: "Restauro de Motores",
        description: "Reconstrução completa de motores V8, desde a desmontagem até ao último parafuso apertado com precisão.",
        gradient: "from-amber-500/20 via-amber-600/10 to-transparent",
        accentColor: "rgb(245, 158, 11)",
    },
    {
        icon: PaintBucket,
        title: "Pintura & Acabamentos",
        description: "Preparação de carroçaria, pintura de cofre de motor e proteção de chassis com produtos premium.",
        gradient: "from-orange-500/20 via-orange-600/10 to-transparent",
        accentColor: "rgb(249, 115, 22)",
    },
    {
        icon: Gauge,
        title: "Afinação de Performance",
        description: "Carburadores, ignição e sistemas de combustível. Fazemos o seu clássico roncar como deve ser.",
        gradient: "from-yellow-500/20 via-yellow-600/10 to-transparent",
        accentColor: "rgb(234, 179, 8)",
    },
    {
        icon: Cog,
        title: "Suspensão & Chassis",
        description: "Substituição de casquilhos, amortecedores e reforço estrutural para condução desportiva segura.",
        gradient: "from-zinc-400/20 via-zinc-500/10 to-transparent",
        accentColor: "rgb(161, 161, 170)",
    },
    {
        icon: Sparkles,
        title: "Detailing Premium",
        description: "Polimento profissional, tratamento de cromados e proteção cerâmica para brilho duradouro.",
        gradient: "from-amber-400/20 via-amber-500/10 to-transparent",
        accentColor: "rgb(251, 191, 36)",
    },
    {
        icon: Shield,
        title: "Inspeção & Diagnóstico",
        description: "Avaliação técnica completa antes da compra ou para identificar trabalhos necessários.",
        gradient: "from-emerald-500/20 via-emerald-600/10 to-transparent",
        accentColor: "rgb(16, 185, 129)",
    },
];

// Animated grid background
const GridBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }}
            animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
            }}
            animate={{
                x: [0, -80, 0],
                y: [0, -40, 0],
                scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
                backgroundSize: '80px 80px',
            }}
        />

        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="none">
            <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="50" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
    </div>
);

// Service card component
const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            className="group relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {/* Card background with glassmorphism */}
            <div className="relative h-full p-8 lg:p-10 border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group-hover:border-white/[0.1] group-hover:bg-white/[0.04]">
                {/* Gradient overlay on hover */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                {/* Shine sweep effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Number watermark */}
                    <div className="absolute -top-2 -right-2 font-heading text-[120px] leading-none text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none">
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Icon container */}
                    <motion.div
                        className="relative mb-8 inline-block"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        {/* Icon glow */}
                        <motion.div
                            className="absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                            style={{ backgroundColor: service.accentColor }}
                        />

                        {/* Icon box */}
                        <div
                            className="relative w-16 h-16 flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${service.accentColor}20 0%, ${service.accentColor}05 100%)`,
                                boxShadow: `inset 0 0 0 1px ${service.accentColor}30`,
                            }}
                        >
                            <service.icon
                                size={28}
                                style={{ color: service.accentColor }}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl lg:text-3xl text-white mb-4 transition-colors duration-300 group-hover:text-amber-400">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm lg:text-base leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
                        {service.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-transparent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '30%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-white/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/0 group-hover:border-amber-500/30 transition-colors duration-500" />
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            id="servicos"
            className="relative py-20 lg:py-24 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #050505 0%, #080808 50%, #050505 100%)' }}
        >
            <GridBackground />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20 lg:mb-28"
                    style={{ opacity }}
                >
                    {/* Eyebrow */}
                    <motion.div
                        className="inline-flex items-center gap-3 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                        <div className="flex items-center gap-2 px-5 py-2 border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <Cog size={12} className="text-amber-500" />
                            </motion.div>
                            <span className="text-amber-500 font-stencil text-xs tracking-[0.25em] uppercase">
                                Especialidades
                            </span>
                        </div>
                        <motion.div
                            className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>

                    {/* Main title */}
                    <div className="overflow-hidden">
                        <motion.h2
                            className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-none"
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            O QUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">FAZEMOS</span>
                        </motion.h2>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-6 text-zinc-500 max-w-xl mx-auto text-lg lg:text-xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Cada clássico merece mãos experientes.
                        <span className="text-zinc-400"> Conheça os nossos serviços especializados.</span>
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.02]">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-20 lg:mt-28 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <motion.a
                        href="#contacto"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Border frame */}
                        <div className="absolute inset-0 border-2 border-amber-500/50 transition-colors duration-300 group-hover:border-amber-400" />

                        {/* Fill on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600"
                            initial={{ x: '-101%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {/* Text */}
                        <span className="relative z-10 font-stencil text-sm uppercase tracking-[0.2em] text-amber-500 group-hover:text-black transition-colors duration-300">
                            Fale Connosco
                        </span>

                        {/* Arrow */}
                        <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            <ArrowRight size={18} className="text-amber-500 group-hover:text-black transition-colors duration-300" />
                        </motion.span>

                        {/* Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                        />
                    </motion.a>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
                className="absolute top-1/4 left-0 w-px h-40 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
                style={{ y }}
            />
            <motion.div
                className="absolute bottom-1/3 right-0 w-px h-60 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                style={{ y: useTransform(y, (v) => -v * 0.5) }}
            />
        </section>
    );
};

export default Services;
