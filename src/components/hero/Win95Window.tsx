"use client";

import React, { useState, useRef, useEffect } from "react";

interface Win95WindowProps {
    title: string;
    initialX: number;
    initialY: number;
    children: React.ReactNode;
}

const Win95Window: React.FC<Win95WindowProps> = ({ title, initialX, initialY, children }) => {
    const [pos, setPos] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        };
    };

    useEffect(() => {
        setPos({ x: initialX, y: initialY });
    }, [initialX, initialY]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const newX = Math.max(10, Math.min(window.innerWidth - (window.innerWidth < 768 ? 260 : 330), e.clientX - offset.current.x));
            const newY = Math.max(10, Math.min(window.innerHeight - 150, e.clientY - offset.current.y));

            setPos({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className="absolute border-2 border-border bg-surface-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] z-40 w-64 md:w-80 overflow-hidden"
            style={{ left: pos.x, top: pos.y }}
        >
            {/* Title Bar */}
            <div
                className="flex items-center justify-between px-2 py-1 bg-void border-b border-border cursor-move select-none"
                onMouseDown={handleMouseDown}
            >
                <span className="font-pixel text-[10px] text-text-primary flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse shadow-[0_0_5px_#00F5FF]" />
                    {title}
                </span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-surface border border-border" />
                    <div className="w-3 h-3 bg-surface border border-border" />
                </div>
            </div>
            {/* Window Content */}
            <div className="p-4 font-pixel text-[12px] text-cyber-cyan leading-relaxed text-glow-cyan bg-surface/30">
                {children}
            </div>
        </div>
    );
};

export default Win95Window;
