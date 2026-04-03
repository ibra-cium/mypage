"use client";

import React, { useEffect, useRef, useState } from 'react';
import { GameEngine, GameState } from '@/lib/game-engine';
import GameHUD from './GameHUD';
import { useAchievements } from '@/components/providers/AchievementProvider';

interface GameCanvasProps {
    onEngineReady?: (engine: GameEngine) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onEngineReady }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const { unlock } = useAchievements();

    const [gameState, setGameState] = useState<GameState>('IDLE');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(0);
    const [level, setLevel] = useState(1);
    const [coinsCollected, setCoinsCollected] = useState(0);
    const [totalCoins, setTotalCoins] = useState(3);

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new GameEngine(canvasRef.current);
        engineRef.current = engine;

        engine.setCallbacks({
            onStateChange: setGameState,
            onScoreChange: setScore,
            onLivesChange: setLives,
            onTimerChange: setTimer,
            onLevelChange: setLevel,
            onCoinsChange: (collected, total) => {
                setTotalCoins(total);
            },
            onWin: () => {
                unlock('GAME_MASTER');
            },
        });

        if (onEngineReady) {
            onEngineReady(engine);
        }

        return () => {
            // Cleanup engine if needed
        };
    }, [onEngineReady]);

    return (
        <div className="relative w-full aspect-[3/2] bg-void overflow-hidden">
            <canvas
                ref={canvasRef}
                width={480}
                height={320}
                className="block w-full h-full"
            />

            {/* Screen Effects */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* CRT Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(245,166,35,0.02),rgba(15,16,32,0.01),rgba(124,58,237,0.02))] bg-[length:100%_2px,3px_100%] opacity-25" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.5)_100%)]" />

                {/* Phosphor Tint — amber to match new palette */}
                <div className="absolute inset-0 bg-[#F5A623]/[0.015]" />
            </div>

            <GameHUD
                score={score}
                lives={lives}
                timer={timer}
                level={level}
                coinsCollected={coinsCollected}
                totalCoins={totalCoins}
            />

            {gameState === 'IDLE' && (
                <div className="absolute inset-0 flex items-center justify-center bg-void/50 z-30">
                    <div className="text-center animate-pulse">
                        <div className="text-primary font-press-start-2p text-sm mb-4 drop-shadow-[0_0_8px_rgba(245,166,35,0.6)]">
                            PORTFOLIO QUEST
                        </div>
                        <div className="text-text-primary font-press-start-2p text-[10px]">PRESS START</div>
                        <div className="text-text-muted font-press-start-2p text-[7px] mt-2">3 LEVELS · COLLECT ALL COINS</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameCanvas;
