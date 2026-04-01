'use client';

import React from 'react';

interface GlassContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`relative overflow-hidden border border-border bg-surface/40 backdrop-blur-[20px] shadow-2xl ${className}`}
        >
            {/* Subtle purple radial gradient in top-left */}
            <div
                className="absolute -top-24 -left-24 w-64 h-64 bg-neon-green/5 rounded-full blur-[80px] pointer-events-none"
            />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
