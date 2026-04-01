"use client";

import React, { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
    name: string;
    icon: string;
    pct: number;
    color: 'green' | 'cyan';
}

const SkillBar: React.FC<SkillBarProps> = ({ name, icon, pct, color }) => {
    const [width, setWidth] = useState(0);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Small delay for staggered effect if needed, but here we just trigger
                    setWidth(pct);
                }
            },
            { threshold: 0.1 }
        );

        if (barRef.current) {
            observer.observe(barRef.current);
        }

        return () => observer.disconnect();
    }, [pct]);

    const barColor = color === 'green' ? 'var(--color-neon-green)' : 'var(--color-cyber-cyan)';

    return (
        <div className="space-y-4 group" ref={barRef}>
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        {icon}
                    </span>
                    <span className="font-inter font-bold text-sm tracking-wider text-[var(--color-text-primary)]">
                        {name}
                    </span>
                </div>
                <span className="font-['Press_Start_2P'] text-[9px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors tracking-tighter">
                    {pct}%
                </span>
            </div>

            <div className="h-6 w-full bg-[var(--color-void)] border border-[var(--color-border)] p-[3px] relative overflow-hidden flex items-center rounded-sm">
                {/* Animated Fill */}
                <div
                    className="h-full transition-all duration-[700ms] ease-out relative z-10"
                    style={{
                        width: `${width}%`,
                        background: `repeating-linear-gradient(
              to right,
              ${barColor},
              ${barColor} 10px,
              transparent 10px,
              transparent 12px
            )`,
                        boxShadow: `0 0 15px ${color === 'green' ? 'rgba(57,255,20,0.2)' : 'rgba(0,245,255,0.2)'}`
                    }}
                />

                {/* Subtle ghosting background (empty slots) */}
                <div
                    className="absolute inset-0 opacity-[0.03] p-[3px]"
                    style={{
                        background: `repeating-linear-gradient(
              to right,
              #ffffff,
              #ffffff 10px,
              transparent 10px,
              transparent 12px
            )`,
                        backgroundClip: 'content-box'
                    }}
                />
            </div>
        </div>
    );
};

export default SkillBar;
