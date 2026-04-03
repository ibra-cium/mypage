"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const CRTMonitor: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        setIsMobile(window.innerWidth < 640);
        const handler = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handler);

        // Update time for taskbar
        const timeInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => {
            window.removeEventListener('resize', handler);
            clearInterval(timeInterval);
        };
    }, []);

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
                <div className="absolute inset-4 bg-void border-2 border-border shadow-[inset_0_0_20px_rgba(245,166,35,0.08)] overflow-hidden flex flex-col p-0 select-none">
                    {/* Scanlines */}
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(245,166,35,0.04),rgba(15,16,32,0.02),rgba(124,58,237,0.04))] bg-[length:100%_2px,3px_100%]" />

                    {/* Screen Flicker Effect */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-primary/5 animate-flicker opacity-10" />

                    {/* Mock Desktop Content */}
                    <div className="flex-1 w-full relative flex">
                        {/* Desktop Icons (Left) - Hidden on mobile */}
                        <div className="hidden sm:flex w-16 h-full flex-col gap-4 p-2 items-center border-r border-border/20 bg-void/30">
                            {[
                                { name: "Ibra-OS", icon: "💻" },
                                { name: "Trash", icon: "🗑️" },
                                { name: "Photos", icon: "🖼️" },
                                { name: "Net", icon: "🌐" }
                            ].map((app, i) => (
                                <div key={i} className="flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity cursor-default scale-100 origin-center">
                                    <div className="text-2xl drop-shadow-[0_0_8px_rgba(245,166,35,0.3)]">{app.icon}</div>
                                    <span className="text-[7px] font-mono uppercase tracking-tighter text-glow-primary text-center leading-tight">{app.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Centered Avatar Grid */}
                        <div className="flex-1 flex items-center justify-center py-2 sm:py-4 px-1 sm:px-2">
                            <div className="relative group/avatar w-full h-full max-w-[90%] max-h-[90%] border border-border/40 bg-surface-2/30 rounded p-0.5 sm:p-1 shadow-[0_0_15px_rgba(245,166,35,0.1)]">
                                <Image
                                    src="/avatar-grid.png"
                                    alt="Ibrahim Pixel Avatars"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain pixelated grayscale-[5%] contrast-[1.1] brightness-[1.1]"
                                    style={{ filter: "drop-shadow(0 0 5px rgba(245,166,35,0.2))" }}
                                    priority
                                />
                                <div className="absolute top-0 right-0 p-1 opacity-40">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>

                        {/* Widgets (Right) - Hidden on mobile */}
                        <div className="hidden sm:flex w-14 h-full flex-col gap-4 p-2 pr-3 items-end opacity-40 font-mono text-[6px]">
                            <div className="text-glow-primary animate-pulse">INF: RUNNING</div>
                            <div className="text-glow-primary">CPU: 32%</div>
                            <div className="text-glow-primary">RAM: OK</div>
                        </div>
                    </div>

                    {/* Taskbar */}
                    <div className="h-6 sm:h-7 w-full bg-surface-2 border-t border-border flex items-center justify-between px-1.5 sm:px-2 text-[8px] sm:text-[9px] font-mono z-30">
                        <div className="flex items-center gap-1 sm:gap-2 h-full">
                            <div className="h-[75%] px-1.5 sm:px-2 flex items-center justify-center bg-primary text-void font-bold rounded-sm border-b-2 border-primary/50 shadow-[0_0_8px_rgba(245,166,35,0.4)] active:scale-95 transition-transform cursor-pointer">
                                START
                            </div>
                            <div className="w-[1px] h-3 bg-border" />
                            <span className="text-text-muted italic opacity-40 overflow-hidden text-nowrap max-w-[40px] sm:max-w-none">v0.92-beta</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-glow-primary font-bold opacity-80">{time || "00:00"}</span>
                            <div className="w-3 h-2 bg-neon-green/10 border border-neon-green/30 rounded-sm overflow-hidden">
                                <div className="h-full bg-neon-green w-[80%]" />
                            </div>
                        </div>
                    </div>

                    {/* Vignette */}
                    <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
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
