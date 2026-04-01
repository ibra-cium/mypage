"use client";

import React, { useEffect, useRef, useState } from 'react';

interface StatCardProps {
    icon: string;
    value: number;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
    const [count, setCount] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = value;
                    const duration = 1200; // 1.2s animation as per criteria
                    const increment = end / (duration / 16);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [value, hasAnimated]);

    return (
        <div
            ref={cardRef}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all duration-500 hover:border-[rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.05)] relative overflow-hidden"
        >
            {/* Background Micro-animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)]/0 to-[var(--color-neon-green)]/0 group-hover:from-[var(--color-neon-green)]/[0.02] group-hover:to-transparent transition-all duration-700" />

            {/* Icon with hover effect */}
            <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500 relative z-10">
                {icon}
            </div>

            {/* Value Counter */}
            <div className="text-3xl font-bold font-inter text-[var(--color-text-primary)] tracking-tight relative z-10">
                {count}
            </div>

            {/* Label */}
            <div className="text-[8px] font-['Press_Start_2P'] uppercase text-[var(--color-text-muted)] tracking-[0.2em] text-center relative z-10 group-hover:text-[var(--color-text-primary)] transition-colors duration-500">
                {label}
            </div>

            {/* Decorative corner dots */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--color-border)] rounded-full group-hover:bg-[var(--color-neon-green)]/40 transition-colors" />
            <div className="absolute top-2 right-2 w-1 h-1 bg-[var(--color-border)] rounded-full group-hover:bg-[var(--color-neon-green)]/40 transition-colors" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-[var(--color-border)] rounded-full group-hover:bg-[var(--color-neon-green)]/40 transition-colors" />
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--color-border)] rounded-full group-hover:bg-[var(--color-neon-green)]/40 transition-colors" />
        </div>
    );
};

export default StatCard;
