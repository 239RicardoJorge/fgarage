
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
    isHovering: boolean;
    isClicking: boolean;
    text: string;
    scale: number;
}

const CustomCursor: React.FC = () => {
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isClicking: false,
        text: '',
        scale: 1
    });
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position with spring physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for cursor following
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Outer ring with slower spring
    const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Detect interactive elements
        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for magnetic elements
            const magneticEl = target.closest('[data-magnetic]');
            const cursorText = target.closest('[data-cursor-text]');
            const cursorScale = target.closest('[data-cursor-scale]');

            if (target.closest('a, button, [role="button"], input, textarea, [data-hover]')) {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: true,
                    text: cursorText?.getAttribute('data-cursor-text') || '',
                    scale: parseFloat(cursorScale?.getAttribute('data-cursor-scale') || '1.5')
                }));
            } else {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: false,
                    text: '',
                    scale: 1
                }));
            }

            // Magnetic effect
            if (magneticEl) {
                const rect = magneticEl.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = e.clientX - centerX;
                const distY = e.clientY - centerY;

                (magneticEl as HTMLElement).style.transform = `translate(${distX * 0.3}px, ${distY * 0.3}px)`;
            }
        };

        const handleElementLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const magneticEl = target.closest('[data-magnetic]');

            if (magneticEl) {
                (magneticEl as HTMLElement).style.transform = 'translate(0, 0)';
            }
        };

        const handleMouseDown = () => setCursorState(prev => ({ ...prev, isClicking: true }));
        const handleMouseUp = () => setCursorState(prev => ({ ...prev, isClicking: false }));

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseover', handleElementHover);
        window.addEventListener('mouseout', handleElementLeave);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', handleElementHover);
            window.removeEventListener('mouseout', handleElementLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    // Hide on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: cursorState.isClicking ? 0.8 : cursorState.isHovering ? 0.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                />
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                }}
                animate={{
                    scale: cursorState.isClicking ? 0.9 : cursorState.isHovering ? cursorState.scale : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className={`w-10 h-10 border rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-300 ${cursorState.isHovering
                            ? 'border-amber-500 bg-amber-500/10'
                            : 'border-white/30'
                        }`}
                >
                    {cursorState.text && (
                        <motion.span
                            className="text-[8px] text-amber-500 font-stencil uppercase tracking-wider whitespace-nowrap"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            {cursorState.text}
                        </motion.span>
                    )}
                </div>
            </motion.div>

            {/* Hide default cursor via CSS */}
            <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
