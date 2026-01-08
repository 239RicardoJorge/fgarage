
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        quote: "Profissionalismo e paixão pelo detalhe. A equipa da F Garage percebe mesmo de clássicos americanos. Recomendo a todos os entusiastas.",
        stars: 5,
        name: "Carlos Mendes",
        car: "Chevrolet Camaro 1969",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        quote: "Depois de procurar em várias oficinas, finalmente encontrei quem tratasse do meu Chevrolet com o respeito que merece. Trabalho impecável do início ao fim.",
        stars: 5,
        name: "Ricardo Ferreira",
        car: "Chevrolet Bel Air 1957",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        quote: "A restauração do meu Corvette ficou perfeita. Atenção aos detalhes e comunicação constante durante todo o processo. Superou as expectativas!",
        stars: 5,
        name: "Miguel Santos",
        car: "Chevrolet Corvette 1963",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face"
    }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, idx) => (
            <Star
                key={idx}
                size={14}
                className={idx < rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-700'}
            />
        ))}
    </div>
);

const Testimonials: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

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
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <section id="testemunhos" className="py-24 bg-gradient-to-b from-[#070707] to-[#0a0a0a] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large quote mark */}
                <motion.div
                    className="absolute top-20 left-10 text-amber-600/[0.03] pointer-events-none select-none"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Quote size={300} strokeWidth={1} />
                </motion.div>

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/[0.02] rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <MessageCircle size={14} className="text-amber-500" />
                        <span className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase">
                            O que dizem os nossos clientes
                        </span>
                    </motion.div>

                    <motion.h2
                        className="font-heading text-5xl md:text-7xl text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        TESTEMUNHOS
                    </motion.h2>
                </motion.div>

                {/* Main testimonial card */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-zinc-900/60 border border-zinc-800 p-8 md:p-12 relative overflow-hidden min-h-[400px]">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-amber-600/30" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-amber-600/30" />

                        {/* Content */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
                            >
                                {/* Avatar side */}
                                <div className="flex-shrink-0 text-center">
                                    <motion.div
                                        className="relative inline-block"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {/* Glow ring */}
                                        <div className="absolute -inset-2 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full opacity-20 blur-md" />

                                        {/* Avatar */}
                                        <img
                                            src={testimonials[current].image}
                                            alt={testimonials[current].name}
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-amber-600/50 relative"
                                        />

                                        {/* Quote badge */}
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                                            <Quote size={16} className="text-black" />
                                        </div>
                                    </motion.div>

                                    {/* Name and car - mobile */}
                                    <div className="mt-4 md:hidden">
                                        <p className="text-white font-heading text-xl">{testimonials[current].name}</p>
                                        <p className="text-amber-500 text-sm font-stencil">{testimonials[current].car}</p>
                                    </div>
                                </div>

                                {/* Quote side */}
                                <div className="flex-1">
                                    <StarRating rating={testimonials[current].stars} />

                                    <blockquote className="mt-6 text-white text-lg md:text-2xl leading-relaxed font-light">
                                        "{testimonials[current].quote}"
                                    </blockquote>

                                    {/* Name and car - desktop */}
                                    <div className="mt-8 hidden md:flex items-center gap-4">
                                        <div className="w-12 h-[2px] bg-amber-600" />
                                        <div>
                                            <p className="text-white font-heading text-xl">{testimonials[current].name}</p>
                                            <p className="text-amber-500 text-sm font-stencil tracking-wider">{testimonials[current].car}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="absolute bottom-8 right-8 flex gap-2">
                            <motion.button
                                onClick={prev}
                                className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-white hover:bg-amber-600 hover:border-amber-600 hover:text-black transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <motion.button
                                onClick={next}
                                className="w-12 h-12 bg-amber-600 flex items-center justify-center text-black hover:bg-white transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1);
                                    setCurrent(idx);
                                }}
                                className={`h-1 rounded-sm transition-all duration-300 ${idx === current
                                        ? 'w-10 bg-amber-600'
                                        : 'w-4 bg-zinc-700 hover:bg-zinc-600'
                                    }`}
                                whileHover={{ scale: 1.3, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    className="mt-16 flex flex-wrap justify-center gap-8 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    {[
                        { label: "5.0", sublabel: "Google Reviews" },
                        { label: "100%", sublabel: "Satisfação" },
                        { label: "#1", sublabel: "Em Lisboa" }
                    ].map((badge, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center px-6 py-4 border border-zinc-800/50 bg-zinc-900/30"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.3)' }}
                        >
                            <p className="font-heading text-3xl text-amber-500">{badge.label}</p>
                            <p className="text-zinc-500 text-xs font-stencil uppercase tracking-wider">{badge.sublabel}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
