"use client";

import React from 'react';

interface GameHUDProps {
    score: number;
    lives: number;
    timer: number;
    level: number;
    coinsCollected: number;
    totalCoins: number;
}

const GameHUD: React.FC<GameHUDProps> = ({ score, lives, timer, level, coinsCollected, totalCoins }) => {
    return (
        <div className="absolute top-0 left-0 w-full px-3 py-2 flex justify-between items-center z-20 pointer-events-none font-press-start-2p">
            {/* Lives */}
            <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <span
                        key={i}
                        className={`text-[10px] transition-opacity duration-300 ${i < lives ? 'opacity-100' : 'opacity-20'}`}
                    >
                        ❤️
                    </span>
                ))}
            </div>

            {/* Score */}
            <div className="text-[9px] text-primary text-glow-primary">
                {score.toString().padStart(6, '0')}
            </div>

            {/* Coin counter + Level + Timer */}
            <div className="flex flex-col items-end gap-0.5">
                <div className="flex gap-2 text-[7px] text-secondary text-glow-cyan uppercase">
                    <span>LVL {level}</span>
                    <span>{timer.toString().padStart(3, '0')}s</span>
                </div>
                <div className="text-[7px] text-text-muted">
                    🪙 {coinsCollected}/{totalCoins}
                </div>
            </div>
        </div>
    );
};

export default GameHUD;
