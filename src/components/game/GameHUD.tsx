"use client";

import React from 'react';

interface GameHUDProps {
    score: number;
    lives: number;
    timer: number;
    level: number;
}

const GameHUD: React.FC<GameHUDProps> = ({ score, lives, timer, level }) => {
    return (
        <div className="absolute top-0 left-0 w-full px-4 py-2 flex justify-between items-center z-20 pointer-events-none font-press-start-2p">
            {/* Lives */}
            <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <span
                        key={i}
                        className={`text-[10px] transition-opacity duration-300 ${i < lives ? 'text-magenta opacity-100' : 'text-surface-2 opacity-30'}`}
                    >
                        ❤️
                    </span>
                ))}
            </div>

            {/* Score */}
            <div className="text-[10px] text-neon-green text-glow-green">
                {score.toString().padStart(6, '0')}
            </div>

            {/* Timer & Level */}
            <div className="flex gap-4 text-[8px] text-cyber-cyan text-glow-cyan uppercase">
                <span>LVL {level}</span>
                <span>{timer.toString().padStart(3, '0')}s</span>
            </div>
        </div>
    );
};

export default GameHUD;
