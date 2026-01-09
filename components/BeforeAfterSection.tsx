
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    title: string;
    description: string;
}

const BeforeAfterCard: React.FC<BeforeAfterProps> = ({
    beforeImage,
    afterImage,
    beforeLabel = "ANTES",
    afterLabel = "DEPOIS",
    title,
    description
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Main comparison container */}
            <div
                ref={containerRef}
                className="relative aspect-[16/10] overflow-hidden border border-zinc-800 cursor-ew-resize select-none"
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
            >
                {/* After image (base layer) */}
                <img
                    src={afterImage}
                    alt={`${title} - Depois do restauro`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />

                {/* Before image (clipped layer) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={beforeImage}
                        alt={`${title} - Antes do restauro`}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />

                    {/* Before overlay tint for contrast */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Slider line */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-opacity"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                    {/* Gradient glow */}
                    <div className="absolute inset-y-0 -inset-x-4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                {/* Slider handle */}
                <motion.div
                    className="absolute top-1/2 z-20 -translate-y-1/2"
                    style={{ left: `${sliderPosition}%`, x: '-50%' }}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                        boxShadow: isDragging
                            ? '0 0 30px rgba(245, 158, 11, 0.5)'
                            : '0 0 15px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-amber-500' : 'bg-white'
                        }`}>
                        <ArrowLeftRight size={20} className={isDragging ? 'text-black' : 'text-zinc-800'} />
                    </div>
                </motion.div>

                {/* Labels */}
                <motion.div
                    className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 z-10"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-amber-500 font-stencil text-xs tracking-wider">{beforeLabel}</span>
                </motion.div>

                <motion.div
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 z-10"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-emerald-500 font-stencil text-xs tracking-wider">{afterLabel}</span>
                </motion.div>

                {/* Corner brackets on hover */}
                <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500" />
                </div>

                {/* Hint animation on load */}
                <motion.div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                >
                    <motion.div
                        className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2"
                        animate={{ x: [-20, 20, -20] }}
                        transition={{ duration: 1.5, repeat: 2 }}
                    >
                        <ArrowLeftRight size={16} className="text-amber-500" />
                        <span className="text-white text-xs font-stencil">ARRASTE PARA COMPARAR</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Info card below */}
            <motion.div
                className="bg-zinc-900/80 border border-zinc-800 border-t-0 p-6"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="font-heading text-2xl text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
        </motion.div>
    );
};

// Full Before/After Section
const BeforeAfterSection: React.FC = () => {
    const projects = [
        {
            beforeImage: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=800&auto=format&fit=crop&sat=-100&brightness=0.7",
            afterImage: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=800&auto=format&fit=crop",
            title: "Chevrolet Corvette Stingray 1964",
            description: "Restauro integral de carroçaria, repintura Rally Red original e reconstrução do motor 327 V8 com 365cv."
        },
        {
            beforeImage: "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&auto=format&fit=crop&sat=-100&brightness=0.7",
            afterImage: "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&auto=format&fit=crop",
            title: "Ford Mustang Fastback 1969",
            description: "Rebuild completo do motor 351 Windsor V8, suspensão de competição e acabamentos race-spec autênticos."
        }
    ];

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 mb-6"
                        whileHover={{ scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.3)' }}
                    >
                        <ArrowLeftRight size={14} className="text-amber-500" />
                        <span className="text-amber-500 font-stencil text-xs tracking-[0.2em] uppercase">
                            Transformações Reais
                        </span>
                    </motion.div>

                    <h2 className="font-heading text-5xl md:text-7xl text-white mb-4">
                        ANTES <span className="text-zinc-600">&</span> <span className="text-amber-500">DEPOIS</span>
                    </h2>

                    <p className="text-zinc-500 max-w-xl mx-auto text-lg">
                        Veja a diferença que faz trabalhar com profissionais apaixonados por clássicos.
                    </p>
                </motion.div>

                {/* Before/After cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <BeforeAfterCard key={idx} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfterSection;
