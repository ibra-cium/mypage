'use client';

import React, { useState, useRef } from 'react';
import NoiseBg from '@/components/ui/NoiseBg';

export type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    icon: string;
    cartId: string;
    url?: string;
};

interface ProjectCardProps {
    project: Project;
    isVisible: boolean;
    glowColor?: 'magenta' | 'cyber-cyan' | 'purple';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isVisible,
    glowColor = 'magenta'
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8; // Max 8deg
        const rotateY = ((x - centerX) / centerX) * 8; // Max 8deg

        setRotate({ x: rotateX, y: rotateY });

        // Calculate glare position (inverse for better effect)
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlare({ x: glareX, y: glareY, opacity: 0.4 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    const glowStyles = {
        magenta: 'shadow-[0_0_30px_rgba(255,49,49,0.15)] group-hover:shadow-[0_0_50px_rgba(255,49,49,0.3)]',
        'cyber-cyan': 'shadow-[0_0_30px_rgba(30,144,255,0.15)] group-hover:shadow-[0_0_50px_rgba(30,144,255,0.3)]',
        purple: 'shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]',
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: rotate.x === 0 ? 'transform 0.5s ease-out, opacity 0.5s ease-out, scale 0.5s ease-out' : 'none',
            }}
            className={`
        relative group w-full max-w-[380px] h-[500px] rounded-xl overflow-hidden bg-surface border border-border
        ${glowStyles[glowColor]}
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6 pointer-events-none'}
        transition-all duration-500 cursor-pointer
      `}
        >
            <NoiseBg />

            {/* Holographic Glare Effect */}
            <div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%), 
                       linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)`,
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Top 60% Thumbnail */}
            <div className="relative h-[60%] w-full bg-gradient-to-br from-surface-2 to-surface overflow-hidden flex items-center justify-center border-b border-border/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,144,255,0.1),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />

                {/* Cartridge ID Label */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-surface border border-neon-green/30 text-neon-green font-pixel text-[10px] tracking-tighter shadow-sm text-glow-green">
                        {project.cartId}
                    </span>
                </div>

                {/* Emoji Icon */}
                <div className="text-6xl z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {project.icon}
                </div>
            </div>

            {/* Bottom 40% Info */}
            <div className="h-[40%] p-6 flex flex-col justify-between bg-surface-2/50 relative z-10">
                <div className="space-y-2">
                    <h3 className="text-text-primary font-bold text-xl group-hover:text-neon-green transition-colors truncate">
                        {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-void border border-border text-[10px] text-text-muted font-pixel uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {project.url ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-neon-green hover:bg-neon-green/90 text-void px-4 py-1 rounded font-pixel text-[10px] uppercase group/btn transition-colors shadow-[0_0_10px_rgba(57,255,20,0.3)] w-fit"
                        >
                            Launch Proj
                            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                    ) : (
                        <button className="flex items-center gap-2 bg-neon-green/50 text-void px-4 py-1 rounded font-pixel text-[10px] uppercase cursor-not-allowed w-fit">
                            TBA
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
