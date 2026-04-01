"use client";

import React, { useEffect, useRef, useState } from 'react';
import { GameEngine, GameState } from '@/lib/game-engine';
import GameHUD from './GameHUD';

interface GameCanvasProps {
    onEngineReady?: (engine: GameEngine) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onEngineReady }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);

    const [gameState, setGameState] = useState<GameState>('IDLE');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new GameEngine(canvasRef.current);
        engineRef.current = engine;

        engine.setCallbacks({
            onStateChange: setGameState,
            onScoreChange: setScore,
            onLivesChange: setLives,
            onTimerChange: setTimer,
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
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(57,255,20,0.03),rgba(13,17,23,0.01),rgba(0,245,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-20" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.4)_100%)]" />

                {/* Phosphor Tint */}
                <div className="absolute inset-0 bg-[#39FF14]/[0.02]" />
            </div>

            <GameHUD
                score={score}
                lives={lives}
                timer={timer}
                level={1}
            />

            {gameState === 'IDLE' && (
                <div className="absolute inset-0 flex items-center justify-center bg-void/40 z-30">
                    <div className="text-center animate-pulse">
                        <div className="text-neon-green font-press-start-2p text-sm mb-4">PORTFOLIO QUEST</div>
                        <div className="text-text-primary font-press-start-2p text-[10px]">PRESS START</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameCanvas;
