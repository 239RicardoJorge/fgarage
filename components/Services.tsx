
import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Gauge, PaintBucket, Cog, Sparkles, Shield } from 'lucide-react';

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
}

const services: Service[] = [
    {
        icon: Wrench,
        title: "Restauro de Motores",
        description: "Reconstrução completa de motores V8, desde a desmontagem até ao último parafuso apertado com precisão.",
        gradient: "from-amber-600 to-orange-700"
    },
    {
        icon: PaintBucket,
        title: "Pintura & Acabamentos",
        description: "Preparação de carroçaria, pintura de cofre de motor e proteção de chassis com produtos premium.",
        gradient: "from-orange-600 to-red-700"
    },
    {
        icon: Gauge,
        title: "Afinação de Performance",
        description: "Carburadores, ignição e sistemas de combustível. Fazemos o seu clássico roncar como deve ser.",
        gradient: "from-amber-500 to-yellow-600"
    },
    {
        icon: Cog,
        title: "Suspensão & Chassis",
        description: "Substituição de casquilhos, amortecedores e reforço estrutural para condução desportiva segura.",
        gradient: "from-zinc-600 to-zinc-800"
    },
    {
        icon: Sparkles,
        title: "Detailing Premium",
        description: "Polimento profissional, tratamento de cromados e proteção cerâmica para brilho duradouro.",
        gradient: "from-amber-400 to-amber-600"
    },
    {
        icon: Shield,
        title: "Inspeção & Diagnóstico",
        description: "Avaliação técnica completa antes da compra ou para identificar trabalhos necessários.",
        gradient: "from-emerald-600 to-teal-700"
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    })
};

const Services: React.FC = () => {
    return (
        <section id="servicos" className="py-24 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#060606] relative overflow-hidden">
            {/* Ambient glow effects */}
            <div className="absolute top-1/4 -left-32 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-amber-600/10 border border-amber-600/20 px-4 py-2 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.4)' }}
                    >
                        <Cog size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                        <span className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase">
                            Especialidades da Oficina
                        </span>
                    </motion.div>

                    <motion.h2
                        className="font-heading text-5xl md:text-7xl text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        O QUE <span className="text-amber-500">FAZEMOS</span>
                    </motion.h2>

                    <motion.p
                        className="text-zinc-500 max-w-xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Cada clássico merece mãos experientes. Conheça os nossos serviços especializados.
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative bg-zinc-900/60 border border-zinc-800/50 p-8 cursor-pointer overflow-hidden"
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                zIndex: 10,
                                borderColor: 'rgba(245, 158, 11, 0.3)'
                            }}
                        >
                            {/* Hover gradient background */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />

                            {/* Shine effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                            />

                            {/* Icon with animated background */}
                            <motion.div
                                className="relative mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative`}>
                                    <service.icon size={24} className="text-white relative z-10" />
                                    {/* Glow behind icon */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-lg opacity-50 group-hover:opacity-100 transition-opacity`} />
                                </div>
                            </motion.div>

                            {/* Content */}
                            <motion.h3
                                className="font-heading text-2xl text-white mb-3 group-hover:text-amber-500 transition-colors"
                            >
                                {service.title}
                            </motion.h3>

                            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                {service.description}
                            </p>

                            {/* Corner accent */}
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-600/0 group-hover:border-amber-600/30 transition-colors duration-300" />

                            {/* Number overlay */}
                            <div className="absolute top-4 right-4 font-heading text-6xl text-white/[0.02] group-hover:text-amber-500/10 transition-colors">
                                0{idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.a
                        href="#contacto"
                        className="inline-flex items-center gap-3 bg-transparent border-2 border-amber-600 text-amber-500 px-8 py-4 font-stencil text-sm uppercase tracking-[0.15em] hover:bg-amber-600 hover:text-black transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-amber-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                        />
                        <span className="relative z-10">Fale Connosco</span>
                        <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
