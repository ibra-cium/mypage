"use client";

import React from 'react';

const CharacterCard = () => {
    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-xl relative group transition-all duration-500 hover:border-[var(--color-neon-green)]/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.05)]">
            {/* Corner Accents */}
            <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-[var(--color-neon-green)] opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-[var(--color-neon-green)] opacity-40 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col gap-8">
                {/* Avatar & Basic Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    <div className="relative w-24 h-24 shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[var(--color-neon-green)]/10 animate-pulse rounded-sm" />
                        <img
                            src="/github_profile.png"
                            alt="Ibrahim"
                            className="w-full h-full object-cover rounded-sm border-2 border-[var(--color-neon-green)] relative z-10 pixelated shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                            onError={(e) => {
                                e.currentTarget.src = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ibrahim";
                            }}
                        />
                        {/* Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--color-neon-green)] border-2 border-[var(--color-surface)] rounded-full z-20 animate-pulse shadow-[0_0_10px_rgba(57,255,20,1)]" />
                    </div>

                    <div className="flex flex-col pt-1 text-center sm:text-left flex-1 min-w-0">
                        <h2 className="text-2xl font-bold font-inter text-[var(--color-text-primary)] tracking-tight">
                            Siyam Ibrahim
                        </h2>
                        <span className="text-[10px] font-['Press_Start_2P'] text-[var(--color-neon-green)] mt-3 tracking-widest uppercase opacity-80">
                            Level 21
                        </span>

                        <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
                            <span className="px-3 py-1 text-[9px] font-bold bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] border border-[var(--color-neon-green)]/20 rounded-md uppercase tracking-wider">
                                Available
                            </span>
                            <span className="px-3 py-1 text-[9px] font-bold bg-[var(--color-cyber-cyan)]/10 text-[var(--color-cyber-cyan)] border border-[var(--color-cyber-cyan)]/20 rounded-md uppercase tracking-wider">
                                Bekar
                            </span>
                            <span className="px-3 py-1 text-[9px] font-bold bg-[var(--color-text-muted)]/10 text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-md uppercase tracking-wider">
                                Full-Time
                            </span>
                        </div>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] font-['Press_Start_2P'] uppercase text-[var(--color-text-muted)] tracking-wider">
                        <span>Experience Points</span>
                        <span className="text-[var(--color-cyber-cyan)]">8,450 / 10,000 XP</span>
                    </div>
                    <div className="h-4 w-full bg-[var(--color-void)] border border-[var(--color-border)] p-[2px] relative overflow-hidden rounded-sm">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--color-cyber-cyan)] to-[var(--color-neon-green)] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,245,255,0.3)]"
                            style={{ width: '84.5%' }}
                        />
                    </div>
                </div>

                {/* Bio Card */}
                <div className="bg-[var(--color-void)]/40 border border-[var(--color-border)] p-6 rounded-xl relative overflow-hidden group-hover:bg-[var(--color-void)]/60 transition-colors duration-500">
                    {/* Subtle static effect in background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <p className="text-sm font-inter leading-relaxed text-[var(--color-text-muted)] relative z-10">
                        CSE undergrad from <strong className="text-[var(--color-text-primary)]">Bangladesh</strong> on a quest to master the arcane arts of
                        <strong className="text-[var(--color-neon-green)]"> Life</strong>.
                        Currently grinding <strong className="text-[var(--color-cyber-cyan)]">Full-stack</strong> skills so I can fear AI more.
                        Ambition: <strong className="text-[var(--color-text-primary)]">Hate everyone equally</strong>.
                        Side quests include <strong className="text-[var(--color-text-primary)]">Ragebaiting people</strong> for mental HP.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
