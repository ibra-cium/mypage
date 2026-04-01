"use client";

import React from "react";

const icons = [
    { label: "PROJECTS", icon: "📁", color: "text-neon-green", id: "projects" },
    { label: "ABOUT", icon: "👤", color: "text-cyber-cyan", id: "about" },
    { label: "SKILLS", icon: "⚡", color: "text-magenta", id: "about" },
    { label: "CONTACT", icon: "✉️", color: "text-text-primary", id: "contact" },
    { label: "GAME", icon: "🕹️", color: "text-neon-green", id: "hero" },
];

const PixelDock: React.FC = () => {
    const scrollToSection = (id: string) => {
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-3 bg-surface-2/80 border-2 border-border rounded-lg backdrop-blur-md shadow-2xl border-b-4 select-none animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {icons.map((item, idx) => (
                <div key={idx} className="group relative flex flex-col items-center">
                    {/* Tooltip */}
                    <div className="absolute -top-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-void border border-border px-3 py-1 rounded text-[10px] font-pixel text-text-primary pointer-events-none whitespace-nowrap shadow-xl z-20 opacity-0 group-hover:opacity-100">
                        {item.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-void border-b border-r border-border rotate-45" />
                    </div>

                    {/* Icon */}
                    <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-2xl transform transition-all duration-200 hover:scale-150 hover:-translate-y-4 active:scale-90 ${item.color} focus:outline-none drop-shadow-md`}
                    >
                        {item.icon}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PixelDock;
