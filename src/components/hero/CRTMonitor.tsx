"use client";

import React, { useState, useEffect, useMemo } from "react";

const CRTMonitor: React.FC = () => {
    const [text, setText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        const handler = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const lines = useMemo(() => [
        "> whoami",
        "ibrahim_an_hobbiest",
        "> ls ./passion_building",
        "> ready_to_build.exe",
        "SYSTEM READY. INITIALIZING..."
    ], []);

    useEffect(() => {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                const timeout = setTimeout(() => {
                    setText((prev) => prev + lines[lineIndex][charIndex]);
                    setCharIndex((prev) => prev + 1);
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setText((prev) => prev + "\n");
                    setLineIndex((prev) => prev + 1);
                    setCharIndex(0);
                }, 500);
                return () => clearTimeout(timeout);
            }
        }
    }, [charIndex, lineIndex, lines]);

    const tiltStyle = isMobile
        ? { transform: "rotateX(3deg) rotateY(-5deg)", transformStyle: "preserve-3d" as const }
        : { transform: "rotateX(6deg) rotateY(-10deg)", transformStyle: "preserve-3d" as const };

    return (
        <div className="relative group" style={{ perspective: "1000px" }}>
            <div
                className="w-[280px] h-[220px] sm:w-[340px] sm:h-[270px] md:w-[450px] md:h-[350px] bg-surface border-4 border-border rounded-xl shadow-[0_0_20px_rgba(245,166,35,0.12)] group-hover:shadow-[0_0_40px_rgba(245,166,35,0.25)] transition-all duration-700 overflow-hidden"
                style={tiltStyle}
            >
                {/* Inner Screen */}
                <div className="absolute inset-4 bg-void border-2 border-border shadow-[inset_0_0_20px_rgba(245,166,35,0.08)] overflow-hidden flex flex-col p-3 font-pixel text-[10px] md:text-sm text-primary leading-relaxed whitespace-pre-wrap text-glow-primary">
                    {/* Scanlines */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(245,166,35,0.04),rgba(15,16,32,0.02),rgba(124,58,237,0.04))] bg-[length:100%_2px,3px_100%]" />

                    <div className="relative z-0">
                        {text}
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

                {/* Subtle pulse glow */}
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.06)_0%,transparent_70%)] animate-pulse" />
            </div>

            {/* Monitor Base */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 bg-surface-2 border-x-4 border-b-4 border-border rounded-b-lg shadow-2xl" />
        </div>
    );
};

export default CRTMonitor;
