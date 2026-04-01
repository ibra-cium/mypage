"use client";

import React from 'react';

interface GBAShellProps {
    children: React.ReactNode;
}

const GBAShell: React.FC<GBAShellProps> = ({ children }) => {
    return (
        <div className="mx-auto w-full max-w-[640px] bg-surface-2 rounded-[20px] rounded-br-[40px] rounded-bl-[40px] p-2 md:p-6 shadow-2xl relative overflow-hidden border border-border/50">
            {/* Subtle Surface Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Screen Bezel */}
            <div className="relative bg-[#1A1F26] p-2 md:p-4 rounded-lg shadow-inner border-[6px] md:border-[12px] border-surface">
                <div className="relative bg-void overflow-hidden rounded-sm border border-border/30">
                    {children}
                </div>

                {/* Screen Label */}
                <div className="mt-2 flex justify-between items-center px-1">
                    <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_rgba(57,255,20,0.5)]" />
                        <span className="text-[6px] text-text-muted font-press-start-2p uppercase tracking-widest opacity-50">Power</span>
                    </div>
                    <span className="text-[8px] text-text-muted font-press-start-2p font-bold italic tracking-tighter opacity-30">ADVANCE PORTFOLIO</span>
                </div>
            </div>

            {/* Speaker Grid (Bottom Right) */}
            <div className="absolute bottom-10 right-6 grid grid-cols-4 gap-1.5 opacity-20 rotate-[-15deg]">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-void shadow-inner" />
                ))}
            </div>

            {/* Glossy Reflection overlay for the shell */}
            <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
    );
};

export default GBAShell;
