"use client";

import React, { useEffect, useState, useRef } from "react";
import CRTMonitor from "./CRTMonitor";
import Win95Window from "./Win95Window";
import PixelDock from "./PixelDock";
import CursorTrail from "./CursorTrail";

const HeroSection: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [winPos, setWinPos] = useState({
        left: { x: 40, y: 40 },
        right: { x: 800, y: 80 }
    });

    const updatePositions = () => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const isSmall = screenWidth < 1200;
        const windowWidth = 320;
        const scaledWidth = isSmall ? windowWidth * 0.8 : windowWidth;

        if (isSmall) {
            // Staggered vertical positioning to avoid horizontal overlap
            setWinPos({
                left: {
                    x: 20,
                    y: Math.max(20, rect.top - 160)
                },
                right: {
                    x: screenWidth - scaledWidth - 20,
                    y: Math.min(screenHeight - 200, rect.bottom + 20)
                }
            });
        } else {
            // tight horizontal positioning
            setWinPos({
                left: {
                    x: Math.max(20, rect.left - windowWidth - 40),
                    y: rect.top - 20
                },
                right: {
                    x: Math.min(screenWidth - windowWidth - 20, rect.right + 40),
                    y: rect.top + 80
                }
            });
        }
    };



    useEffect(() => {
        setIsMounted(true);

        const observer = new ResizeObserver(updatePositions);
        if (headerRef.current) observer.observe(headerRef.current);

        // Initial call
        setTimeout(updatePositions, 100);

        window.addEventListener("resize", updatePositions);
        return () => {
            window.removeEventListener("resize", updatePositions);
            observer.disconnect();
        };
    }, []);


    if (!isMounted) return <section className="h-screen" />;

    return (
        <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <CursorTrail />

            {/* Window Overlay Layer - Absolute to section, doesn't affect flex flow */}
            <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
                {/* Top Left Window - projects.exe */}
                <div
                    className="absolute pointer-events-auto transition-all duration-500 ease-out"
                    style={{
                        left: winPos.left.x,
                        top: winPos.left.y,
                        transform: (typeof window !== 'undefined' && window.innerWidth < 1100) ? 'scale(0.8)' : 'scale(1)',
                        transformOrigin: 'top left'
                    }}
                >
                    <Win95Window title="projects.exe" initialX={-150} initialY={100}>
                        <div className="space-y-1 font-mono text-[10px]">
                            <p className="text-primary font-bold uppercase tracking-tighter">
                                C:\portfolio\projects</p>
                            <p className="text-text-muted font-sans font-normal text-xs">{">"} 12 items found</p>
                            <p className="text-text-muted font-sans font-normal text-xs">{">"} last modified: today</p>
                            <p className="text-text-muted font-sans font-normal text-xs">{">"} status: <span className="text-neon-green font-bold">ACTIVE</span></p>
                        </div>
                    </Win95Window>
                </div>

                {/* Top Right Window - status.sys */}
                <div
                    className="absolute pointer-events-auto transition-all duration-500 ease-out"
                    style={{
                        left: winPos.right.x,
                        top: winPos.right.y,
                        transform: (typeof window !== 'undefined' && window.innerWidth < 1100) ? 'scale(0.8)' : 'scale(1)',
                        transformOrigin: 'top left'
                    }}
                >
                    <Win95Window title="status.sys" initialX={0} initialY={0}>
                        <div className="space-y-1 font-mono text-[10px]">
                            <p className="text-cyber-cyan uppercase font-bold">ONLINE · available</p>
                            <p className="text-text-muted font-sans font-normal text-xs">{">"} open to work</p>
                            <p className="text-text-muted font-sans font-normal text-xs">{">"} location: remote</p>
                        </div>
                    </Win95Window>
                </div>
            </div>

            {/* Main Centered Content */}
            <div className="flex flex-col items-center text-center z-20 space-y-12">
                <div ref={headerRef} className="space-y-4 px-6 relative">
                    <p className="font-pixel text-[12px] text-primary/80 animate-pulse tracking-widest text-glow-primary">
                        {">"} ibrahim.dev
                    </p>
                    <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-8xl text-text-primary tracking-tighter leading-[0.9] drop-shadow-2xl">
                        Siyam <br />
                        Ibrahim
                    </h1>
                    <p className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-secondary tracking-tight text-glow-cyan">
                        Student & Hobbyist
                    </p>
                </div>

                {/* Centered Monitor */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neon-green/5 via-void to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
                <div className="relative group">
                    <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
                    <CRTMonitor />
                </div>
            </div>

            <PixelDock />
        </section>
    );
};


export default HeroSection;

