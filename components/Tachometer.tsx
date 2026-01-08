
import React from 'react';
import { motion } from 'framer-motion';

interface TachometerProps {
    rpm: number;
}

const Tachometer: React.FC<TachometerProps> = ({ rpm }) => {
    // Calculate needle rotation: 0 RPM = -225deg, 8000 RPM = 45deg
    const needleRotation = -225 + (rpm / 8000) * 270;

    const rpmMarks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
                <linearGradient id="chromeBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4d4d4" />
                    <stop offset="25%" stopColor="#8a8a8a" />
                    <stop offset="50%" stopColor="#e8e8e8" />
                    <stop offset="75%" stopColor="#6a6a6a" />
                    <stop offset="100%" stopColor="#a0a0a0" />
                </linearGradient>
                <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0d0d0d" />
                </linearGradient>
                <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.5" />
                </filter>
            </defs>

            {/* Outer Chrome Bezel */}
            <circle cx="200" cy="200" r="198" fill="#333" />
            <circle cx="200" cy="200" r="194" fill="url(#chromeBezel)" />
            <circle cx="200" cy="200" r="182" fill="#1a1a1a" />

            {/* Inner Face */}
            <circle cx="200" cy="200" r="175" fill="url(#faceGradient)" />

            {/* Red Zone Background */}
            <path
                d={`M 200 200 L ${200 + Math.cos((-225 + (6 / 8) * 270) * Math.PI / 180) * 170} ${200 + Math.sin((-225 + (6 / 8) * 270) * Math.PI / 180) * 170} A 170 170 0 0 1 ${200 + Math.cos(45 * Math.PI / 180) * 170} ${200 + Math.sin(45 * Math.PI / 180) * 170} Z`}
                fill="rgba(220, 38, 38, 0.15)"
            />

            {/* RPM Tick Marks and Numbers */}
            {rpmMarks.map((num) => {
                const angle = -225 + (num / 8) * 270;
                const radians = (angle * Math.PI) / 180;
                const innerRadius = 138;
                const outerRadius = 162;
                const textRadius = 115;

                const x1 = 200 + Math.cos(radians) * innerRadius;
                const y1 = 200 + Math.sin(radians) * innerRadius;
                const x2 = 200 + Math.cos(radians) * outerRadius;
                const y2 = 200 + Math.sin(radians) * outerRadius;
                const textX = 200 + Math.cos(radians) * textRadius;
                const textY = 200 + Math.sin(radians) * textRadius;

                return (
                    <g key={num}>
                        <line
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={num >= 6 ? '#dc2626' : '#ffffff'}
                            strokeWidth={num >= 6 ? 4 : 3}
                            strokeLinecap="round"
                        />
                        <text
                            x={textX} y={textY}
                            fill={num >= 6 ? '#ef4444' : '#ffffff'}
                            fontSize="28"
                            fontFamily="Arial, sans-serif"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                        >
                            {num}
                        </text>
                    </g>
                );
            })}

            {/* Minor tick marks */}
            {Array.from({ length: 40 }).map((_, i) => {
                if (i % 5 === 0) return null;
                const angle = -225 + (i / 40) * 270;
                const radians = (angle * Math.PI) / 180;
                const isRedZone = i >= 30;
                const x1 = 200 + Math.cos(radians) * 152;
                const y1 = 200 + Math.sin(radians) * 152;
                const x2 = 200 + Math.cos(radians) * 162;
                const y2 = 200 + Math.sin(radians) * 162;
                return (
                    <line
                        key={`minor-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={isRedZone ? '#991b1b' : '#555'}
                        strokeWidth={1.5}
                    />
                );
            })}

            {/* RPM Label */}
            <text x="200" y="140" fill="#666" fontSize="12" fontFamily="Arial" textAnchor="middle" letterSpacing="3">
                RPM × 1000
            </text>

            {/* Center Hub Base */}
            <circle cx="200" cy="200" r="28" fill="#2a2a2a" />
            <circle cx="200" cy="200" r="22" fill="#1a1a1a" />

            {/* Animated Needle - BASE pivots at center (200,200) */}
            <motion.g
                animate={{ rotate: needleRotation }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                style={{ transformOrigin: '200px 200px' }}
            >
                {/* Needle Body - pointing UP at 0 rotation, base at center */}
                <polygon
                    points="200,60 194,200 206,200"
                    fill="#dc2626"
                    filter="url(#needleShadow)"
                />
                {/* Needle Highlight */}
                <polygon
                    points="200,70 198,195 202,195"
                    fill="#ef4444"
                />
                {/* Counterweight */}
                <ellipse cx="200" cy="220" rx="10" ry="6" fill="#1a1a1a" />
            </motion.g>

            {/* Center Cap - on top of needle */}
            <circle cx="200" cy="200" r="16" fill="#222" />
            <circle cx="200" cy="200" r="10" fill="#dc2626" />
            <circle cx="200" cy="200" r="4" fill="#fff" opacity="0.3" />
        </svg>
    );
};

export default Tachometer;
