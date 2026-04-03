"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Internal Matrix Rain Component
const MatrixRain: React.FC<{ opacity?: number }> = ({ opacity = 0.15 }) => {
    const [streams, setStreams] = useState<{ x: number, y: number, speed: number, chars: string[] }[]>([]);

    useEffect(() => {
        const charSet = "0101010101ABCDEFHIJKLMNOPQRSTUVWXYZ";
        const columnCount = 5;
        const newStreams = Array.from({ length: columnCount }, (_, i) => ({
            x: (i * 20),
            y: Math.random() * -100,
            speed: 1 + Math.random() * 2,
            chars: Array.from({ length: 10 }, () => charSet[Math.floor(Math.random() * charSet.length)])
        }));
        setStreams(newStreams);

        let animationFrame: number;
        const update = () => {
            setStreams(prev => prev.map(s => ({
                ...s,
                y: s.y > 150 ? -50 : s.y + s.speed,
                chars: Math.random() > 0.9 ? [charSet[Math.floor(Math.random() * charSet.length)], ...s.chars.slice(0, 9)] : s.chars
            })));
            animationFrame = requestAnimationFrame(update);
        };
        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
            {streams.map((s, i) => (
                <div
                    key={i}
                    className="absolute font-mono text-[8px] leading-none flex flex-col text-primary"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                    {s.chars.map((c, ci) => (
                        <span key={ci} style={{ opacity: 1 - (ci / 10) }}>{c}</span>
                    ))}
                </div>
            ))}
        </div>
    );
};

const CRTMonitor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const timeInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(timeInterval);
        };
    }, []);

    const tiltStyle = isMobile
        ? { transform: "rotateX(2deg) rotateY(-3deg)", transformStyle: "preserve-3d" as const }
        : { transform: "rotateX(6deg) rotateY(-10deg)", transformStyle: "preserve-3d" as const };

    return (
        <div className="relative group" style={{ perspective: "1000px" }}>
            <div
                className="w-[280px] h-[220px] sm:w-[340px] sm:h-[270px] md:w-[450px] md:h-[350px] bg-surface border-4 border-border rounded-xl shadow-[0_0_20px_rgba(245,166,35,0.12)] group-hover:shadow-[0_0_40px_rgba(245,166,35,0.25)] transition-all duration-700 overflow-hidden"
                style={tiltStyle}
            >
                {/* Inner Screen */}
                <div className="absolute inset-4 bg-void border-2 border-border shadow-[inset_0_0_20px_rgba(245,166,35,0.08)] overflow-hidden flex flex-col p-0 select-none bg-[radial-gradient(#1E1B3A_1px,transparent_1px)] bg-[size:10px_10px]">
                    {/* Scanlines layer */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(245,166,35,0.04),rgba(15,16,32,0.02),rgba(124,58,237,0.04))] bg-[length:100%_2px,3px_100%]" />

                    {/* Screen Flicker layer */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-primary/5 animate-flicker opacity-10" />

                    {/* Desktop Content */}
                    <div className="flex-1 w-full relative flex overflow-hidden">

                        {/* LEFT SIDEBAR */}
                        <div className="w-8 sm:w-16 h-full flex flex-col gap-2 sm:gap-4 p-1 sm:p-2 items-center bg-void/60 border-r border-border/10 backdrop-blur-[1px] relative overflow-hidden">
                            <MatrixRain opacity={0.3} />
                            <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-4 w-full h-full">
                                {[
                                    { name: "Ibra-PC", icon: "💻" },
                                    { name: "Trash", icon: "🗑️" },
                                    { name: "Photos", icon: "🖼️" },
                                    { name: "Chat", icon: "🤖" }
                                ].map((app, i) => (
                                    <div key={i} className="flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity cursor-default scale-[0.6] sm:scale-100 origin-center">
                                        <div className="text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(245,166,35,0.3)]">{app.icon}</div>
                                        <span className="text-[5px] sm:text-[7px] font-mono uppercase tracking-tighter text-glow-primary text-center leading-tight whitespace-nowrap">{app.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CENTER: Main content area */}
                        <div className="flex-1 flex flex-col p-1 sm:p-4 gap-1 relative justify-center">

                            {/* Window Container */}
                            <div className="w-full flex flex-col border border-border shadow-[5px_5px_15px_rgba(0,0,0,0.5)] bg-surface transform-gpu -rotate-1 group-hover:rotate-0 transition-transform duration-500 relative z-10">
                                {/* Title Bar */}
                                <div className="h-4 sm:h-6 bg-primary flex items-center justify-between px-1 sm:px-2">
                                    <span className="text-void font-mono font-bold text-[6px] sm:text-[8px] uppercase tracking-widest overflow-hidden">ibrahim_gallery.exe</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-void/20 border border-void/30 flex items-center justify-center text-[5px] sm:text-[7px] text-void">_</div>
                                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-600/50 border border-void/30 flex items-center justify-center text-[5px] sm:text-[7px] text-void">×</div>
                                    </div>
                                </div>

                                {/* Photo Content */}
                                <div className="relative aspect-square w-full bg-void/20">
                                    <Image
                                        src="/avatar-grid.png"
                                        alt="Ibrahim Pixel Avatars"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-contain pixelated grayscale-[5%] contrast-[1.1] brightness-[1.1]"
                                        style={{ filter: "drop-shadow(0 0 5px rgba(245,166,35,0.1))" }}
                                        priority
                                    />
                                    {/* Glass reflection on window */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="hidden md:flex w-14 h-full flex-col gap-4 p-2 pr-3 items-end bg-void/60 border-l border-border/10 backdrop-blur-[1px] relative overflow-hidden">
                            <MatrixRain opacity={0.2} />
                            <div className="relative z-10 flex flex-col gap-4 items-end font-mono text-[6px]">
                                <div className="text-glow-primary animate-pulse whitespace-nowrap">INF: RUNNING</div>
                                <div className="text-glow-primary">CPU: 32%</div>
                                <div className="text-glow-primary text-green-500">SYSTEM: OK</div>
                                <div className="mt-auto opacity-30 tracking-[0.2em] transform rotate-90 origin-right translate-y-10 whitespace-nowrap">MATRIX_CORE_v2.0</div>
                            </div>
                        </div>
                    </div>

                    {/* Taskbar - Persistent */}
                    <div className="h-5 sm:h-7 w-full bg-surface-2 border-t border-border flex items-center justify-between px-1.5 sm:px-2 text-[7px] sm:text-[9px] font-mono z-30">
                        <div className="flex items-center gap-1 sm:gap-2 h-full">
                            <div className="h-[75%] px-1.5 sm:px-2 flex items-center justify-center bg-primary text-void font-bold rounded-sm border-b-2 border-primary/50 shadow-[0_0_8px_rgba(245,166,35,0.4)] active:scale-95 transition-transform cursor-pointer">
                                START
                            </div>
                            <div className="w-[1px] h-3 bg-border" />
                            <div className="flex items-center px-2 py-0.5 bg-void border border-border/40 text-glow-primary text-[6px] sm:text-[8px] animate-pulse">
                                gallery_running...
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-glow-primary font-bold opacity-80">{time || "00:00"}</span>
                            <div className="w-3 h-2 bg-neon-green/10 border border-neon-green/30 rounded-sm overflow-hidden">
                                <div className="h-full bg-neon-green w-[80%]" />
                            </div>
                        </div>
                    </div>

                    {/* Final Vignette Effect */}
                    <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
                </div>

                {/* Slight outer phosphor glow */}
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.06)_0%,transparent_70%)] animate-pulse" />
            </div>

            {/* Monitor Stand */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 bg-surface-2 border-x-4 border-b-4 border-border rounded-b-lg shadow-2xl" />
        </div>
    );
};

export default CRTMonitor;
