'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
// import { GlassContainer } from './GlassContainer';
import { FilterTabs } from './FilterTabs';
import { ProjectCard, Project } from './ProjectCard';

const PROJECTS_DATA: Project[] = [
    {
        id: '1',
        title: 'NeuralChat AI',
        description: 'Conversational AI assistant with RAG pipeline and real-time streaming capabilities. Built for modular AGI experimentation.',
        tags: ['Python', 'LangChain', 'React'],
        category: 'AI / ML',
        icon: '🤖',
        cartId: 'CART-001',
    },
    {
        id: '2',
        title: 'DIU-NextGen-CP-Tracker',
        description: 'Automated Competitive Programming tracking system with Spring Boot & AI. Real-time stats integration for DIU students.',
        tags: ['Spring Boot', 'Java', 'PostgreSQL', 'AI'],
        category: 'Web',
        icon: '🏆',
        cartId: 'CART-002',
        url: 'https://github.com/ibra-cium/DIU-NextGen-CP-Tracker',
    },
    {
        id: '3',
        title: 'Rock Paper Scissors',
        description: 'Interactive retro-styled game with custom animations and score tracking. Battle against the computer in this classic showdown.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: 'Games',
        icon: '✂️',
        cartId: 'CART-003',
        url: 'https://github.com/ibra-cium/Rock-Paper-Scissors-Game',
    },
    {
        id: '4',
        title: 'TaskQuest TODO',
        description: 'Minimalist habit tracker and task manager with persistent local storage and retro aesthetic. Stay productive, stay legendary.',
        tags: ['FRAM Stack'],
        category: 'Web',
        icon: '📝',
        cartId: 'CART-004',
        url: 'https://github.com/ibra-cium/TODO-',
    },
    {
        id: '5',
        title: 'Ibrahim Portfolio (MyPage)',
        description: 'The very site you are seeing right now. A retro-modern, cyberpunk-themed portfolio with a terminal-styled AI chat assistant.',
        tags: ['Next.js', 'React', 'Tailwind', 'AI'],
        category: 'Web',
        icon: '🌐',
        cartId: 'CART-005',
        url: 'https://github.com/ibra-cium/mypage',
    },
];

const CATEGORIES = ['All', 'AI / ML', 'Web', 'Games', 'Tools'];

export const ProjectsSection = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => p.category === activeCategory);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 scroll-mt-24 overflow-visible"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 space-y-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <SectionLabel label="SELECTED_WORKS" />
                    <h2 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
                        Projects
                    </h2>
                    <p className="text-text-muted font-sans text-lg max-w-lg">
                        Things I&apos;ve built, shipped, and obsessed over while chasing the dream of AGI.
                    </p>
                </div>

                <FilterTabs
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />

                <div className="w-full px-4 md:px-0">
                    <div className="flex overflow-x-auto pb-10 gap-8 snap-x snap-mandatory scrollbar-hide">
                        {PROJECTS_DATA.map((project, index) => {
                            const isProjectVisible = filteredProjects.some(p => p.id === project.id);

                            if (!isProjectVisible) return null;

                            return (
                                <div key={project.id} className="snap-center shrink-0 w-[320px] md:w-[400px]">
                                    <ProjectCard
                                        project={project}
                                        isVisible={isVisible}
                                        glowColor={index % 3 === 0 ? 'magenta' : index % 3 === 1 ? 'cyber-cyan' : 'purple'}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
