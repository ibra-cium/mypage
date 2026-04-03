"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface RetroContextType {
    isRetroActive: boolean;
    toggleRetro: () => void;
}

const RetroContext = createContext<RetroContextType | undefined>(undefined);

export const RetroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRetroActive, setIsRetroActive] = useState(false);

    // Persist preference
    useEffect(() => {
        const saved = localStorage.getItem('retro-mode');
        if (saved === 'true') setIsRetroActive(true);
    }, []);

    const toggleRetro = () => {
        setIsRetroActive(prev => {
            const next = !prev;
            localStorage.setItem('retro-mode', next.toString());
            return next;
        });
    };

    return (
        <RetroContext.Provider value={{ isRetroActive, toggleRetro }}>
            <div className={isRetroActive ? "retro-active" : ""}>
                {isRetroActive && (
                    <>
                        <div className="crt-overlay" />
                        <div className="scanline" />
                    </>
                )}
                {children}
            </div>
        </RetroContext.Provider>
    );
};

export const useRetro = () => {
    const context = useContext(RetroContext);
    if (!context) throw new Error('useRetro must be used within a RetroProvider');
    return context;
};
