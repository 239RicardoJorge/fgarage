
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface TextRevealProps {
    children: string;
    className?: string;
}

// Character by character reveal on scroll
export const ScrollTextReveal: React.FC<TextRevealProps> = ({ children, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.3"]
    });

    const words = children.split(' ');

    return (
        <div ref={containerRef} className={className}>
            <p className="flex flex-wrap gap-x-2 gap-y-1">
                {words.map((word, wordIdx) => {
                    const start = wordIdx / words.length;
                    const end = start + (1 / words.length);

                    return (
                        <Word
                            key={wordIdx}
                            word={word}
                            range={[start, end]}
                            progress={scrollYProgress}
                        />
                    );
                })}
            </p>
        </div>
    );
};

interface WordProps {
    word: string;
    range: [number, number];
    progress: any;
}

const Word: React.FC<WordProps> = ({ word, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [20, 0]);
    const blur = useTransform(progress, range, [10, 0]);

    return (
        <span className="relative inline-flex">
            {/* Shadow for depth */}
            <span className="absolute inset-0 text-transparent select-none" aria-hidden>
                {word}
            </span>

            <motion.span
                style={{
                    opacity,
                    y,
                    filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
                }}
                className="relative"
            >
                {word}
            </motion.span>
        </span>
    );
};

// Letter by letter typing effect
export const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({
    text,
    delay = 0,
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {text.split('').map((char, idx) => (
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.05,
                        delay: delay + idx * 0.03,
                        ease: "easeOut"
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

// Staggered line reveal
export const LineReveal: React.FC<{
    lines: string[];
    className?: string;
    lineClassName?: string;
}> = ({ lines, className = '', lineClassName = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={className}>
            {lines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.8,
                            delay: idx * 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className={lineClassName}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

// Split text reveal with mask
export const MaskReveal: React.FC<TextRevealProps> = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: '100%', rotateX: -80 }}
                animate={isInView ? { y: 0, rotateX: 0 } : {}}
                transition={{
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ transformOrigin: 'top', perspective: 1000 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// Glitch text effect
export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <motion.span
                className="absolute inset-0 text-amber-500 z-0"
                animate={{
                    x: [0, -2, 2, -1, 0],
                    opacity: [1, 0.8, 0.9, 0.7, 1],
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                aria-hidden
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute inset-0 text-cyan-500 z-0"
                animate={{
                    x: [0, 2, -2, 1, 0],
                    opacity: [1, 0.7, 0.8, 0.9, 1],
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: 0.05,
                }}
                aria-hidden
            >
                {text}
            </motion.span>
        </span>
    );
};

// Counter with scroll trigger
export const ScrollCounter: React.FC<{
    value: number;
    suffix?: string;
    duration?: number;
    className?: string;
}> = ({ value, suffix = '', duration = 2, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useSpring(0, { duration: duration * 1000 });

    React.useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    const rounded = useTransform(count, (latest) => Math.floor(latest));

    return (
        <span ref={ref} className={className}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
};

export default ScrollTextReveal;
