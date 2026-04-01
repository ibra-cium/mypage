"use client";

import React, { useEffect, useState, useCallback } from "react";

interface Dot {
    id: number;
    x: number;
    y: number;
}

const CursorTrail: React.FC = () => {
    const [dots, setDots] = useState<Dot[]>([]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const newDot: Dot = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };

        setDots((prev) => [...prev.slice(-10), newDot]);

        setTimeout(() => {
            setDots((prev) => prev.filter((d) => d.id !== newDot.id));
        }, 400);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[999]">
            {dots.map((dot) => (
                <div
                    key={dot.id}
                    className="absolute w-2 h-2 rounded-full bg-accent opacity-50 blur-[2px]"
                    style={{
                        left: dot.x,
                        top: dot.y,
                        transform: "translate(-50%, -50%)",
                        transition: "opacity 0.4s linear, transform 0.4s ease-out",
                    }}
                />
            ))}
        </div>
    );
};

export default CursorTrail;
