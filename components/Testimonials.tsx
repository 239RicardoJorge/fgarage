
import React from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

interface Testimonial {
    quote: string;
    stars: number; // Supports decimals like 4.5
    name: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Restauraram o motor do meu Mustang 67 com uma perfeição que não pensei ser possível. Voltou a roncar como novo.",
        stars: 5,
        name: "António Silva"
    },
    {
        quote: "Profissionalismo e paixão pelo detalhe. A equipa da F Garage percebe mesmo de clássicos americanos.",
        stars: 4,
        name: "Carlos Mendes"
    },
    {
        quote: "Depois de procurar em várias oficinas, finalmente encontrei quem tratasse do meu Chevrolet com o respeito que merece.",
        stars: 4.5,
        name: "Ricardo Ferreira"
    }
];

// Component to render stars with half-star support
const StarRating: React.FC<{ rating: number; idx: number }> = ({ rating, idx }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, starIdx) => {
                const isFull = starIdx < fullStars;
                const isHalf = starIdx === fullStars && hasHalfStar;
                const isEmpty = starIdx >= fullStars && !isHalf;

                return (
                    <motion.div
                        key={starIdx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.15 + starIdx * 0.05 }}
                        className="relative"
                    >
                        {isHalf ? (
                            // Half star with overlay technique
                            <div className="relative">
                                <Star size={16} className="text-zinc-700" />
                                <div className="absolute inset-0 overflow-hidden w-[50%]">
                                    <Star size={16} className="text-amber-500 fill-amber-500" />
                                </div>
                            </div>
                        ) : (
                            <Star
                                size={16}
                                className={isFull ? 'text-amber-500 fill-amber-500' : 'text-zinc-700'}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

const Testimonials: React.FC = () => {
    return (
        <section id="testemunhos" className="py-20 bg-[#070707] border-t border-zinc-900">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.span
                        className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase block mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        O que dizem os nossos clientes
                    </motion.span>
                    <h2 className="font-heading text-5xl md:text-6xl text-white">
                        TESTEMUNHOS
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-zinc-900/50 border border-zinc-800 p-8 relative group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            whileHover={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}
                        >
                            {/* Quote marks decoration */}
                            <div className="absolute top-4 right-4 text-amber-600/20 font-heading text-6xl leading-none">
                                "
                            </div>

                            {/* Stars with half-star support */}
                            <StarRating rating={testimonial.stars} idx={idx} />

                            {/* Quote */}
                            <p className="text-zinc-300 text-base leading-relaxed mb-6 relative z-10">
                                "{testimonial.quote}"
                            </p>

                            {/* Name */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-amber-600" />
                                <span className="text-white font-stencil text-sm tracking-wider uppercase">
                                    {testimonial.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
