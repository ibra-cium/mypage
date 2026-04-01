import React from 'react';
import CharacterCard from './CharacterCard';
import EducationCard from './EducationCard';
import SkillBar from './SkillBar';
import StatCard from './StatCard';

const skills = [
    { name: 'C++', icon: '⚡', pct: 85, color: 'green' as const },
    { name: 'Python', icon: '🐍', pct: 82, color: 'cyan' as const },
    { name: 'React', icon: '⚛️', pct: 92, color: 'green' as const },
    { name: 'Node.js', icon: '🔧', pct: 80, color: 'cyan' as const },
    { name: 'WebGL / WASM', icon: '🎮', pct: 60, color: 'green' as const },
];

const stats = [
    { icon: '⚔️', value: 12, label: 'Projects' },
    { icon: '🛡️', value: 5, label: 'Certifications' },
    { icon: '🔮', value: 1, label: 'Years Exp' },
    { icon: '📜', value: 0, label: 'Articles' },
];

const AboutSection = () => {
    return (
        <section id="about" className="relative py-24 px-6 md:px-12 border-t border-[var(--color-border)] overflow-hidden bg-[var(--color-void)]">
            {/* Background Grid Texture: 1px lines at 4% opacity, 32px spacing */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), 
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Soft Glow: radial-gradient from center, neon green at 4% opacity */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(57, 255, 20, 0.04) 0%, transparent 70%)'
                }}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                {/* Left Panel: 5fr */}
                <div className="lg:col-span-5 space-y-8">
                    <CharacterCard />
                    <EducationCard />
                </div>

                {/* Right Panel: 7fr */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
                    {/* Skill Bars Section */}
                    <div className="space-y-8">
                        <h3 className="text-sm font-bold font-['Press_Start_2P'] uppercase tracking-[0.2em] text-[var(--color-text-muted)] flex items-center gap-3">
                            <span className="w-2 h-2 bg-[var(--color-neon-green)] inline-block animate-pulse" />
                            Primary Attributes
                        </h3>

                        <div className="space-y-6">
                            {skills.map((skill) => (
                                <SkillBar key={skill.name} {...skill} />
                            ))}
                        </div>
                    </div>

                    {/* Stat Cards Section: 2x2 grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
