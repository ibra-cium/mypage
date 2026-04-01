"use client";

import React from 'react';

const EducationCard = () => {
    const education = [
        {
            degree: "B.Sc. in Computer Science & Engineering",
            institution: "Daffodil International University",
            period: "2024/6 — PRESENT",
            status: "GRINDING",
            icon: "🎓"
        },
        {
            degree: "Higher Secondary Certificate (Science)",
            institution: "Dhaka Uddayn Government College, Dhaka",
            period: "2022 — 2023",
            status: "COMPLETED",
            icon: "📜"
        },
        {
            degree: "Secondary School Certificate (Science)",
            institution: "Prestigious School, Dhaka",
            period: "2019 — 2021",
            status: "COMPLETED",
            icon: "🎖️"
        }
    ];

    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-xl relative group transition-all duration-500 hover:border-[var(--color-cyber-cyan)]/30 overflow-hidden">
            {/* Label */}
            <h3 className="text-[10px] font-['Press_Start_2P'] text-[var(--color-cyber-cyan)] mb-8 flex items-center gap-3 uppercase tracking-[0.15em] relative z-10 font-bold">
                <span className="w-2 h-2 bg-[var(--color-cyber-cyan)] inline-block animate-pulse shadow-[0_0_8px_var(--color-cyber-cyan)]" />
                Academy Records
            </h3>

            <div className="space-y-8 relative z-10">
                {education.map((item, index) => (
                    <div key={index} className="relative pl-8 border-l border-[var(--color-border)] group/item py-1">
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full group-hover/item:border-[var(--color-cyber-cyan)] group-hover/item:bg-[var(--color-cyber-cyan)] transition-all duration-300 shadow-[0_0_5px_rgba(0,245,255,0.0)] group-hover/item:shadow-[0_0_10px_var(--color-cyber-cyan)]" />

                        <div className="space-y-2">
                            <div className="flex items-start gap-3">
                                <span className="text-lg filter drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] group-hover/item:scale-110 transition-transform">{item.icon}</span>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] font-inter leading-tight group-hover/item:text-[var(--color-cyber-cyan)] transition-colors duration-300">
                                        {item.degree}
                                    </h4>
                                    <p className="text-[11px] text-[var(--color-text-muted)] font-inter mt-1">
                                        {item.institution}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-1">
                                <span className="text-[9px] font-['Press_Start_2P'] text-[var(--color-text-muted)] opacity-60 tracking-wider">
                                    [{item.period}]
                                </span>
                                <span className={`px-2 py-0.5 text-[8px] font-bold rounded border ${item.status === 'COMPLETED'
                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                    : 'bg-[var(--color-cyber-cyan)]/10 text-[var(--color-cyber-cyan)] border-[var(--color-cyber-cyan)]/20 animate-pulse'
                                    } uppercase tracking-tighter`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative background grid element */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.02] pointer-events-none translate-x-12 -translate-y-12">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                        backgroundSize: '10px 10px'
                    }}
                />
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-12 h-12 opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--color-cyber-cyan)]">
                    <path d="M100 0 L100 100 L0 100 Z" />
                </svg>
            </div>
        </div>
    );
};

export default EducationCard;
