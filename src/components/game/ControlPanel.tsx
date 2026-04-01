"use client";

import React from 'react';
import { GameEngine } from '@/lib/game-engine';

interface ControlPanelProps {
    engine: GameEngine | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ engine }) => {
    return (
        <div className="mt-4 md:mt-8 flex justify-between items-center px-2 md:px-12 pb-4 md:pb-10">
            {/* D-Pad */}
            <div className="relative w-[64px] h-[64px] sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                {/* Horizontal Bar */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-6 md:h-8 bg-surface-2 rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex justify-between px-1">
                    <button
                        className="w-5 md:w-7 h-full active:bg-surface-2/80 transition-colors"
                        onMouseDown={() => engine?.moveLeft()}
                        onMouseUp={() => engine?.stopLeft()}
                        onMouseLeave={() => engine?.stopLeft()}
                        onTouchStart={() => engine?.moveLeft()}
                        onTouchEnd={() => engine?.stopLeft()}
                    />
                    <button
                        className="w-5 md:w-7 h-full active:bg-surface-2/80 transition-colors"
                        onMouseDown={() => engine?.moveRight()}
                        onMouseUp={() => engine?.stopRight()}
                        onMouseLeave={() => engine?.stopRight()}
                        onTouchStart={() => engine?.moveRight()}
                        onTouchEnd={() => engine?.stopRight()}
                    />
                </div>
                {/* Vertical Bar */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 md:w-8 h-full bg-surface-2 rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex flex-col justify-between py-1 pointer-events-none">
                    <div className="w-full h-5 md:h-7" />
                    <div className="w-full h-5 md:h-7" />
                </div>
                {/* Center dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-void rounded-full opacity-30" />
            </div>

            {/* Start / Select */}
            <div className="flex gap-2 md:gap-4 flex-shrink-0">
                <div className="flex flex-col items-center gap-1">
                    <button
                        className="w-12 h-3 bg-surface-2 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
                        onClick={() => engine?.reset()}
                    />
                    <span className="text-[6px] text-text-muted font-press-start-2p uppercase tracking-tighter">Select</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <button
                        className="w-12 h-3 bg-surface-2 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] active:scale-95 transition-transform"
                        onClick={() => engine?.toggleStart()}
                    />
                    <span className="text-[6px] text-text-muted font-press-start-2p uppercase tracking-tighter">Start</span>
                </div>
            </div>

            {/* A/B Buttons */}
            <div className="relative flex gap-1 md:gap-6 rotate-[-10deg] md:rotate-[-15deg] flex-shrink-0">
                <div className="flex flex-col items-center gap-1 md:gap-2">
                    <button
                        className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-secondary bg-surface-2/50 shadow-[0_0_15px_-5px_rgba(124,58,237,0.5)] active:scale-90 transition-transform flex items-center justify-center"
                        onClick={() => engine?.dash()}
                    >
                        <span className="text-secondary font-bold text-sm md:text-lg pointer-events-none">B</span>
                    </button>
                    <span className="text-[6px] md:text-[8px] text-text-muted font-press-start-2p">DASH</span>
                </div>
                <div className="flex flex-col items-center gap-1 md:gap-2 -mt-3 md:-mt-4">
                    <button
                        className="w-[52px] h-[52px] sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-primary bg-surface-2/50 shadow-[0_0_20px_-5px_rgba(245,166,35,0.5)] active:scale-90 transition-transform flex items-center justify-center"
                        onClick={() => engine?.jump()}
                    >
                        <span className="text-primary font-bold text-lg md:text-xl pointer-events-none">A</span>
                    </button>
                    <span className="text-[6px] md:text-[8px] text-text-muted font-press-start-2p">JUMP</span>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
