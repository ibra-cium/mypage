'use client';

import React, { useState, useRef } from 'react';
import NoiseBg from '@/components/ui/NoiseBg';

export type PreviewType = 'terminal' | 'dashboard' | 'game' | 'checklist' | 'portfolio';

export type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    icon: string;
    cartId: string;
    url?: string;
    previewType: PreviewType;
    featured?: boolean;
};

interface ProjectCardProps {
    project: Project;
    isVisible: boolean;
    glowColor?: 'primary' | 'secondary' | 'accent';
}

/* ─── Mock Previews ──────────────────────────────────────────── */

const TerminalPreview = () => (
    <div className="w-[82%] bg-[#0A0A14] border border-border rounded-md p-2 font-mono text-[8px] leading-relaxed">
        <div className="flex gap-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="text-primary">{'>'} NeuralChat v2.1 ready</div>
        <div className="text-text-muted">{'>'} RAG pipeline: active</div>
        <div className="text-secondary">{'<'} Hello! How can I help?</div>
        <div className="text-text-muted opacity-70">{'>'} user: explain AGI<span className="animate-pulse">_</span></div>
    </div>
);

const DashboardPreview = () => {
    const bars = [42, 68, 52, 85, 36, 60, 74];
    const colors = ['#7C3AED', '#3B82F6', '#7C3AED', '#F5A623', '#3B82F6', '#7C3AED', '#F5A623'];
    return (
        <div className="w-[82%]">
            <div className="text-[7px] text-text-muted text-center uppercase tracking-widest mb-2 font-mono">CP Tracker Dashboard</div>
            <div className="flex items-end gap-1.5 h-16 justify-center">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className="w-5 rounded-sm rounded-b-none transition-all"
                        style={{ height: `${h}%`, background: colors[i] }}
                    />
                ))}
            </div>
            <div className="text-center mt-2 font-mono">
                <span className="text-primary font-black text-lg">1,247</span>
                <span className="text-text-muted text-[7px] ml-1">submissions</span>
            </div>
        </div>
    );
};

const GamePreview = () => (
    <div className="flex flex-col items-center gap-2">
        <div className="text-[7px] text-text-muted font-mono uppercase tracking-widest">Round 1</div>
        <div className="flex gap-6 text-4xl">
            <span className="drop-shadow-[0_0_8px_rgba(245,166,35,0.5)]">✊</span>
            <span className="text-text-muted text-2xl self-center font-bold">VS</span>
            <span className="drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]">✌️</span>
        </div>
        <div className="text-[7px] font-mono uppercase tracking-wider">
            <span className="text-primary">YOU</span>
            <span className="text-text-muted mx-2">—</span>
            <span className="text-secondary">CPU</span>
        </div>
    </div>
);

const ChecklistPreview = () => {
    const items = [
        { done: true, text: 'Setup project structure' },
        { done: true, text: 'Build habit tracker UI' },
        { done: false, text: 'Add local storage sync' },
        { done: false, text: 'Deploy to production' },
    ];
    return (
        <div className="w-[82%] space-y-1.5">
            <div className="text-[7px] text-primary font-mono uppercase tracking-widest mb-2">TaskQuest.exe</div>
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[8px] font-mono">
                    <div className={`w-3 h-3 border flex items-center justify-center flex-shrink-0 ${item.done ? 'border-primary text-primary' : 'border-border text-transparent'}`}>
                        {item.done && '✓'}
                    </div>
                    <span className={item.done ? 'text-text-muted line-through' : 'text-text-primary'}>{item.text}</span>
                </div>
            ))}
        </div>
    );
};

const PortfolioPreview = () => (
    <div className="w-[82%] border border-border rounded-sm overflow-hidden bg-void">
        <div className="bg-surface-2 px-2 py-1 flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <div className="ml-1 text-[6px] text-text-muted font-mono">ibrahim.dev</div>
        </div>
        <div className="p-2 text-center">
            <div className="text-[6px] text-primary font-mono tracking-widest mb-1">{'>'} ibrahim.dev</div>
            <div className="text-base font-black text-text-primary leading-none">Siyam</div>
            <div className="text-base font-black text-text-primary leading-none">Ibrahim</div>
            <div className="text-[7px] text-secondary mt-1">Student & Hobbyist</div>
        </div>
    </div>
);

const PREVIEW_MAP: Record<PreviewType, React.ReactNode> = {
    terminal: <TerminalPreview />,
    dashboard: <DashboardPreview />,
    game: <GamePreview />,
    checklist: <ChecklistPreview />,
    portfolio: <PortfolioPreview />,
};

const PREVIEW_BG: Record<PreviewType, string> = {
    terminal: 'bg-[#080810]',
    dashboard: 'bg-[#0C0E1E]',
    game: 'bg-[#0A0818]',
    checklist: 'bg-[#080D10]',
    portfolio: 'bg-void',
};

/* ─── Card ──────────────────────────────────────────────────── */

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isVisible,
    glowColor = 'primary'
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        setRotate({
            x: ((y - centerY) / centerY) * -7,
            y: ((x - centerX) / centerX) * 7,
        });

        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.35 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    const glowStyles = {
        primary: 'shadow-[0_0_30px_rgba(245,166,35,0.12)] hover:shadow-[0_0_50px_rgba(245,166,35,0.28)]',
        secondary: 'shadow-[0_0_30px_rgba(124,58,237,0.12)] hover:shadow-[0_0_50px_rgba(124,58,237,0.28)]',
        accent: 'shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:shadow-[0_0_50px_rgba(59,130,246,0.28)]',
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: rotate.x === 0 ? 'transform 0.5s ease-out, opacity 0.5s ease-out' : 'none',
            }}
            className={`
        relative group w-full h-[420px] md:h-[460px] rounded-xl overflow-hidden bg-surface border border-border
        ${glowStyles[glowColor]}
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6 pointer-events-none'}
        transition-all duration-500 cursor-pointer
      `}
        >
            <NoiseBg />

            {/* Holographic Glare */}
            <div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 50%)`,
                }}
            />

            {/* Preview area — 55% */}
            <div className={`relative h-[55%] w-full ${PREVIEW_BG[project.previewType]} overflow-hidden flex items-center justify-center border-b border-border/40`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.07),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />

                {/* Cart ID badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 bg-surface border border-primary/30 text-primary font-pixel text-[8px] tracking-tighter text-glow-primary">
                        {project.cartId}
                    </span>
                </div>

                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 bg-primary text-void font-bold text-[7px] uppercase tracking-widest rounded-sm">
                            ★ Featured
                        </span>
                    </div>
                )}

                {/* Preview Content */}
                <div className="relative z-10 flex items-center justify-center w-full h-full p-3 group-hover:scale-105 transition-transform duration-500">
                    {PREVIEW_MAP[project.previewType]}
                </div>
            </div>

            {/* Info area — 45% */}
            <div className="h-[45%] p-5 flex flex-col justify-between bg-surface-2/40 relative z-10">
                <div className="space-y-1.5">
                    <h3 className="text-text-primary font-bold text-base group-hover:text-primary transition-colors truncate">
                        {project.title}
                    </h3>
                    <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-void border border-border text-[8px] text-text-muted font-pixel uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {project.url ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-void px-4 py-1.5 rounded font-pixel text-[9px] uppercase group/btn transition-colors shadow-[0_0_10px_rgba(245,166,35,0.3)] w-fit font-bold"
                        >
                            Launch
                            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                    ) : (
                        <button className="flex items-center gap-2 bg-primary/30 text-void px-4 py-1.5 rounded font-pixel text-[9px] uppercase cursor-not-allowed w-fit font-bold">
                            TBA
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
