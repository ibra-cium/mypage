"use client";

import React, { useState } from "react";

const icons = [
    { label: "PROJECTS", icon: "📁", colorClass: "text-primary", id: "projects" },
    { label: "ABOUT", icon: "👤", colorClass: "text-secondary", id: "about" },
    { label: "SKILLS", icon: "⚡", colorClass: "text-accent", id: "about" },
    { label: "CONTACT", icon: "✉️", colorClass: "text-text-primary", id: "contact" },
    { label: "GAME", icon: "🕹️", colorClass: "text-primary", id: "game" },
];

const PixelDock: React.FC = () => {
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    const scrollToSection = (id: string) => {
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const handleTap = (idx: number, id: string) => {
        // On touch: first tap shows tooltip, second tap navigates
        if (activeTooltip === idx) {
            setActiveTooltip(null);
            scrollToSection(id);
        } else {
            setActiveTooltip(idx);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 bg-surface-2/80 border-2 border-border rounded-lg backdrop-blur-md shadow-2xl border-b-4 select-none animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {icons.map((item, idx) => (
                <div key={idx} className="group relative flex flex-col items-center">
                    {/* Tooltip */}
                    <div
                        className={`absolute -top-12 transition-all duration-200 bg-void border border-border px-3 py-1 rounded text-[9px] font-pixel text-text-primary pointer-events-none whitespace-nowrap shadow-xl z-20
                        ${activeTooltip === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`}
                    >
                        {item.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-void border-b border-r border-border rotate-45" />
                    </div>

                    {/* Icon */}
                    <button
                        onClick={() => {
                            // Touch device — use tap logic
                            const isTouch = window.matchMedia('(hover: none)').matches;
                            if (isTouch) {
                                handleTap(idx, item.id);
                            } else {
                                scrollToSection(item.id);
                            }
                        }}
                        className={`text-xl sm:text-2xl transform transition-all duration-200 hover:scale-150 hover:-translate-y-4 active:scale-90 ${item.colorClass} focus:outline-none drop-shadow-md`}
                    >
                        {item.icon}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PixelDock;
