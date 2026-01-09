
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';

interface Testimonial {
    quote: string;
    stars: number;
    name: string;
    car: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Restauraram o motor do meu Mustang 67 com uma perfeição que não pensei ser possível. Voltou a roncar como novo. A equipa tratou do carro como se fosse deles.",
        stars: 5,
        name: "António Silva",
        car: "Ford Mustang 1967",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
        quote: "Profissionalismo e paixão pelo detalhe. A equipa da F Garage percebe mesmo de clássicos americanos. Recomendo a todos os entusiastas.",
        stars: 5,
        name: "Carlos Mendes",
        car: "Chevrolet Camaro 1969",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
        quote: "Depois de procurar em várias oficinas, finalmente encontrei quem tratasse do meu Chevrolet com o respeito que merece. Trabalho impecável do início ao fim.",
        stars: 5,
        name: "Ricardo Ferreira",
        car: "Chevrolet Bel Air 1957",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
        quote: "A restauração do meu Corvette ficou perfeita. Atenção aos detalhes e comunicação constante durante todo o processo. Superou as expectativas!",
        stars: 5,
        name: "Miguel Santos",
        car: "Chevrolet Corvette 1963",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
    },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
                <Star
                    size={16}
                    className={idx < rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}
                />
            </motion.div>
        ))}
    </div>
);

const Testimonials: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);

    // Auto-advance (pause on hover)
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <section
            ref={sectionRef}
            id="testemunhos"
            className="relative py-20 lg:py-24 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #050505 0%, #080808 50%, #050505 100%)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large quote mark */}
                <motion.div
                    className="absolute top-10 left-0 lg:left-10"
                    style={{ y: parallaxY }}
                >
                    <Quote
                        size={400}
                        strokeWidth={0.5}
                        className="text-white/[0.01]"
                    />
                </motion.div>

                {/* Ambient glow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.02) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Eyebrow */}
                    <motion.div
                        className="inline-flex items-center gap-3 mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                        <div className="flex items-center gap-2 px-5 py-2 border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                            <MessageCircle size={12} className="text-amber-500" />
                            <span className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase">
                                Clientes Satisfeitos
                            </span>
                        </div>
                        <motion.div
                            className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                    </motion.div>

                    {/* Title */}
                    <div className="overflow-hidden">
                        <motion.h2
                            className="font-heading text-5xl md:text-7xl lg:text-8xl text-white"
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            TESTEMUNHOS
                        </motion.h2>
                    </div>
                </motion.div>

                {/* Main testimonial card */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Outer glow */}
                    <div className="absolute -inset-px bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 rounded-sm" />

                    {/* Card */}
                    <div className="relative border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm p-8 md:p-14 overflow-hidden min-h-[450px]">
                        {/* Corner accents */}
                        <motion.div
                            className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-500/40"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-500/40"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />

                        {/* Decorative quote */}
                        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 opacity-[0.03]">
                            <Quote size={120} />
                        </div>

                        {/* Content */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-start"
                            >


                                {/* Quote side */}
                                <div className="flex-1">
                                    <StarRating rating={testimonials[current].stars} />

                                    <blockquote className="mt-8 text-white text-xl lg:text-3xl leading-relaxed font-light">
                                        <span className="text-amber-500">"</span>
                                        {testimonials[current].quote}
                                        <span className="text-amber-500">"</span>
                                    </blockquote>

                                    {/* Name and car - desktop */}
                                    <motion.div
                                        className="mt-10 flex items-center gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-amber-600" />
                                        <div>
                                            <p className="text-white font-heading text-2xl">{testimonials[current].name}</p>
                                            <p className="text-amber-500 text-sm font-stencil tracking-[0.15em]">{testimonials[current].car}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="absolute bottom-8 right-8 flex gap-3">
                            <motion.button
                                onClick={prev}
                                className="group w-14 h-14 border border-white/10 flex items-center justify-center hover:border-amber-500/50 transition-colors relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-amber-500"
                                    initial={{ x: '-101%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <ChevronLeft size={22} className="relative z-10 text-white/70 group-hover:text-black transition-colors" />
                            </motion.button>
                            <motion.button
                                onClick={next}
                                className="group w-14 h-14 border border-white/10 flex items-center justify-center hover:border-amber-500/50 transition-colors relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-l from-amber-600 to-amber-500"
                                    initial={{ x: '101%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <ChevronRight size={22} className="relative z-10 text-white/70 group-hover:text-black transition-colors" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Progress indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1);
                                    setCurrent(idx);
                                }}
                                className="relative"
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div
                                    className={`h-[4px] rounded-full transition-all duration-500 ${idx === current
                                        ? 'w-12 bg-gradient-to-r from-amber-500 to-amber-600'
                                        : 'w-4 bg-white/15 hover:bg-white/30'
                                        }`}
                                />
                                {idx === current && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)' }}
                                        layoutId="testimonialIndicator"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Side decorations */}
            <motion.div
                className="absolute left-0 top-1/3 w-20 h-px bg-gradient-to-r from-amber-500/20 to-transparent"
                style={{ y: parallaxY }}
            />
            <motion.div
                className="absolute right-0 bottom-1/4 w-32 h-px bg-gradient-to-l from-white/5 to-transparent"
                style={{ y: useTransform(parallaxY, v => -v) }}
            />
        </section>
    );
};

export default Testimonials;
