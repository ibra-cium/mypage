"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: number;
}

const ACHIEVEMENTS: Record<string, Omit<Achievement, 'id'>> = {
    'RETRO_ENTHUSIAST': {
        title: 'Retro Enthusiast',
        description: 'Toggled the CRT shaders for the first time.',
        icon: '📺',
    },
    'GAME_MASTER': {
        title: 'Game Master',
        description: 'Completed all levels of the portfolio game!',
        icon: '🕹️',
    },
    'VOICE_OF_REASON': {
        title: 'Talkative AI',
        description: 'Had a long conversation with the Ibra-Bot.',
        icon: '💬',
    },
    'SECRET_FINDER': {
        title: 'Secret Finder',
        description: 'Found a hidden secret on the page.',
        icon: '🔍',
    }
};

interface AchievementContextType {
    unlockedIds: string[];
    unlock: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
    const [currentToast, setCurrentToast] = useState<Achievement | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio-achievements');
        if (saved) setUnlockedIds(JSON.parse(saved));
    }, []);

    const unlock = (id: string) => {
        if (unlockedIds.includes(id)) return;
        if (!ACHIEVEMENTS[id]) return;

        const newIds = [...unlockedIds, id];
        setUnlockedIds(newIds);
        localStorage.setItem('portfolio-achievements', JSON.stringify(newIds));

        // Show toast
        setCurrentToast({ id, ...ACHIEVEMENTS[id], unlockedAt: Date.now() });

        // Play retro sound (if context allowed)
        // audio.play(); 

        setTimeout(() => setCurrentToast(null), 5000);
    };

    return (
        <AchievementContext.Provider value={{ unlockedIds, unlock }}>
            {children}

            {/* Achievement Toast */}
            {currentToast && (
                <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-20 duration-500">
                    <div className="bg-surface border-2 border-primary p-4 rounded shadow-[0_0_20px_rgba(245,166,35,0.3)] flex items-center gap-4 max-w-sm">
                        <div className="text-3xl">{currentToast.icon}</div>
                        <div>
                            <div className="text-primary font-press-start-2p text-[10px] mb-1">ACHIEVEMENT UNLOCKED!</div>
                            <div className="text-text-primary font-bold text-sm">{currentToast.title}</div>
                            <div className="text-text-muted text-[10px] mt-1">{currentToast.description}</div>
                        </div>
                        <button
                            onClick={() => setCurrentToast(null)}
                            className="absolute top-2 right-2 text-text-muted hover:text-text-primary"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </AchievementContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) throw new Error('useAchievements must be used within an AchievementProvider');
    return context;
};
