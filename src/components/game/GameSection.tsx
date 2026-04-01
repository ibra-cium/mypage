"use client";

import React, { useState } from 'react';
import { GameEngine } from '@/lib/game-engine';
import GBAShell from './GBAShell';
import GameCanvas from './GameCanvas';
import ControlPanel from './ControlPanel';

const GameSection: React.FC = () => {
    const [engine, setEngine] = useState<GameEngine | null>(null);

    return (
        <section className="py-24 px-4 bg-void relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-text-primary mb-2">
                        System <span className="text-neon-green text-glow-green">Terminal</span>
                    </h2>
                    <p className="text-text-muted font-press-start-2p text-[10px] uppercase tracking-widest opacity-60">
                        Interactive Portfolio Quest v1.0
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <GBAShell>
                        <GameCanvas onEngineReady={setEngine} />
                        <ControlPanel engine={engine} />
                    </GBAShell>

                    <div className="mt-12 max-w-md bg-surface-2/50 border border-border p-6 rounded-xl backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                                <span className="text-neon-green text-lg">ℹ️</span>
                            </div>
                            <div>
                                <h4 className="text-text-primary font-bold mb-1">PRO-TIP, IBRAHIM!</h4>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    "Jump through my technical stack! Use <span className="text-neon-green font-mono">ARROWS</span> to move and <span className="text-neon-green font-mono">Z/UP</span> to jump. High score saves to your local terminal!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameSection;
