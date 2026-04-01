"use client";

import React, { useEffect, useState } from "react";

// ─── Floating Pixel Icons ─────────────────────────────────────
interface Particle {
    id: number;
    icon: string;
    x: number;      // left %
    size: number;   // rem
    duration: number; // s
    delay: number;  // s
    drift: number;  // horizontal sway px
}

const ICONS = ["🕹️", "💾", "📟", "🤖", "⚡", "💻", "📡", "🧠", "⚙️", "🔋", "🎮", "🔧", "📀", "🖥️"];
const COUNT = 14;

function makeParticle(id: number): Particle {
    return {
        id,
        icon: ICONS[id % ICONS.length],
        x: 3 + (id * 7.1) % 94,     // spread across width, avoid edges
        size: 0.9 + (id % 4) * 0.25, // 0.9–1.65rem
        duration: 7 + (id % 6) * 2,  // 7–19s per float cycle
        delay: -(id * 1.3),          // stagger start
        drift: (id % 2 === 0 ? 1 : -1) * (10 + (id % 5) * 8), // -50 to +50px x sway
    };
}

const PARTICLES: Particle[] = Array.from({ length: COUNT }, (_, i) => makeParticle(i));

// ─── Binary Rain Column ───────────────────────────────────────
const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
const RAIN_COLS = 6;

function BinaryRain({ side }: { side: "left" | "right" }) {
    const cols = Array.from({ length: RAIN_COLS }, (_, i) => i);
    return (
        <div
            className={`absolute top-0 bottom-0 w-20 overflow-hidden pointer-events-none opacity-20 ${side === "left" ? "left-0" : "right-0"}`}
            style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)" }}
        >
            {cols.map((col) => (
                <div
                    key={col}
                    className="absolute top-0 font-pixel text-[7px] leading-4 select-none"
                    style={{
                        left: `${col * 14 + 2}px`,
                        color: col % 2 === 0 ? "#F5A623" : "#7C3AED",
                        animation: `rain-fall ${5 + col * 1.3}s linear infinite`,
                        animationDelay: `${-(col * 0.8)}s`,
                    }}
                >
                    {Array.from({ length: 24 }, (_, r) =>
                        CHARS[Math.floor((col * 13 + r * 7) % CHARS.length)]
                    ).join("\n")}
                </div>
            ))}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────
const RetroHeroAnimations: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <>
            {/* Floating pixel icons — absolute inside hero section */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
                {PARTICLES.map((p) => (
                    <span
                        key={p.id}
                        className="absolute bottom-0 select-none"
                        style={{
                            left: `${p.x}%`,
                            fontSize: `${p.size}rem`,
                            animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
                            "--drift": `${p.drift}px`,
                            filter: "drop-shadow(0 0 4px rgba(245,166,35,0.4))",
                        } as React.CSSProperties}
                    >
                        {p.icon}
                    </span>
                ))}
            </div>

            {/* Binary rain columns — left & right sides */}
            <BinaryRain side="left" />
            <BinaryRain side="right" />
        </>
    );
};

export default RetroHeroAnimations;
