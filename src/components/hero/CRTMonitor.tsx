"use client";

import React, { useState, useEffect, useMemo } from "react";

const CRTMonitor: React.FC = () => {
    const [text, setText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

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

    return (
        <div className="relative group" style={{ perspective: "1000px" }}>
            <div
                className="w-[300px] h-[250px] md:w-[450px] md:h-[350px] bg-surface border-4 border-border rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.15)] group-hover:shadow-[0_0_40px_rgba(57,255,20,0.3)] transition-all duration-700 overflow-hidden"
                style={{
                    transform: "rotateX(6deg) rotateY(-10deg)",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Inner Screen */}
                <div className="absolute inset-4 bg-void border-2 border-border shadow-[inset_0_0_20px_rgba(57,255,20,0.1)] overflow-hidden flex flex-col p-4 font-pixel text-[12px] md:text-sm text-neon-green leading-relaxed whitespace-pre-wrap text-glow-green">
                    {/* Subtle horizontal scanlines inside monitor */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                    <div className="relative z-0">
                        {text}
                        <span className="animate-pulse">_</span>
                    </div>
                </div>

                {/* Constant subtle pulse glow */}
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)] animate-pulse" />
            </div>

            {/* Monitor Base */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-surface-2 border-x-4 border-b-4 border-border rounded-b-lg shadow-2xl" />
        </div>
    );
};

export default CRTMonitor;
