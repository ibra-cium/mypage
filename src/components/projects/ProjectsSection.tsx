'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { FilterTabs } from './FilterTabs';
import { ProjectCard, Project } from './ProjectCard';
import { fetchGitHubProjects } from '@/lib/github';

const FEATURED_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'NeuralChat AI',
        description: 'Conversational AI assistant with RAG pipeline and real-time streaming capabilities. Built for modular AGI experimentation.',
        tags: ['Python', 'LangChain', 'React'],
        category: 'AI / ML',
        icon: '🤖',
        cartId: 'CART-001',
        previewType: 'terminal',
        featured: true,
    },
    {
        id: '2',
        title: 'DIU NextGen CP Tracker',
        description: 'Automated Competitive Programming tracking system with Spring Boot & AI. Real-time stats integration for DIU students.',
        tags: ['Spring Boot', 'Java', 'PostgreSQL'],
        category: 'Web',
        icon: '🏆',
        cartId: 'CART-002',
        url: 'https://github.com/ibra-cium/DIU-NextGen-CP-Tracker',
        previewType: 'dashboard',
        featured: true,
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
        previewType: 'game',
        featured: true,
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
        previewType: 'checklist',
    },
    {
        id: '5',
        title: 'Ibrahim Portfolio',
        description: 'The very site you are seeing right now. A retro-modern, cyberpunk-themed portfolio with a terminal-styled AI chat assistant.',
        tags: ['Next.js', 'React', 'Tailwind'],
        category: 'Web',
        icon: '🌐',
        cartId: 'CART-005',
        url: 'https://github.com/ibra-cium/mypage',
        previewType: 'portfolio',
    },
];

const CATEGORIES = ['All', 'AI / ML', 'Web', 'Games', 'Tools'];

const GLOW_COLORS: ('primary' | 'secondary' | 'accent')[] = ['primary', 'secondary', 'accent'];

export const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>(FEATURED_PROJECTS);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isVisible, setIsVisible] = useState(false);
    const [viewMode, setViewMode] = useState<'scroll' | 'grid'>('grid');
    const [showAllMobile, setShowAllMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const loadGitHubRepos = async () => {
            try {
                const githubRepos = await fetchGitHubProjects('ibra-cium');

                // Merge with featured projects, avoiding duplicates by URL
                const combined = [...FEATURED_PROJECTS];
                githubRepos.forEach(repo => {
                    const isDuplicate = combined.some(p =>
                        p.url?.toLowerCase().replace(/\/$/, '') === repo.url?.toLowerCase().replace(/\/$/, '')
                    );
                    if (!isDuplicate) {
                        combined.push(repo);
                    }
                });

                setProjects(combined);
            } catch (err) {
                console.error("Error loading GitHub projects:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadGitHubRepos();
    }, []);

    useEffect(() => {
        const currentSection = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (currentSection) observer.observe(currentSection);
        return () => { if (currentSection) observer.unobserve(currentSection); };
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    // On mobile grid view, cap at 3 unless expanded
    const MOBILE_LIMIT = 3;
    const isMobileLimited = viewMode === 'grid' && !showAllMobile;
    const mobileProjects = isMobileLimited ? filteredProjects.slice(0, MOBILE_LIMIT) : filteredProjects;
    const hasMore = filteredProjects.length > MOBILE_LIMIT;

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 scroll-mt-24 overflow-visible"
        >
            {/* Section glow */}
            <div className="absolute inset-0 section-glow-projects pointer-events-none" />

            <div className="relative z-10 space-y-10">
                {/* Header row */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <SectionLabel label="SELECTED_WORKS" />
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
                        Projects
                    </h2>
                    <p className="text-text-muted font-sans text-lg max-w-lg">
                        Things I&apos;ve built, shipped, and obsessed over while chasing the dream of AGI.
                    </p>
                </div>

                {/* Filter tabs + view toggle row */}
                <div className="flex items-center justify-between px-4 md:px-8">
                    <FilterTabs
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onSelectCategory={(cat) => {
                            setActiveCategory(cat);
                            setShowAllMobile(false); // reset on filter change
                        }}
                    />

                    {/* View toggle — desktop only */}
                    <div className="hidden md:flex gap-2 flex-shrink-0 ml-4">
                        <button
                            title="Scroll view"
                            onClick={() => setViewMode('scroll')}
                            className={`w-8 h-8 border rounded flex items-center justify-center text-sm transition-colors ${viewMode === 'scroll' ? 'border-primary text-primary bg-primary/10' : 'border-border text-text-muted hover:border-primary/50'}`}
                        >
                            ☰
                        </button>
                        <button
                            title="Grid view"
                            onClick={() => setViewMode('grid')}
                            className={`w-8 h-8 border rounded flex items-center justify-center text-sm transition-colors ${viewMode === 'grid' ? 'border-primary text-primary bg-primary/10' : 'border-border text-text-muted hover:border-primary/50'}`}
                        >
                            ⊞
                        </button>
                    </div>
                </div>

                {/* Loading state handle */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-primary font-pixel text-[10px] animate-pulse">RECONSTRUCTING_REPOS...</span>
                    </div>
                )}

                {/* Cards: grid or horizontal scroll */}
                <div className={`w-full px-4 md:px-8 transition-opacity duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    {viewMode === 'grid' ? (
                        <>
                            {/* Grid — all sizes; mobile shows up to MOBILE_LIMIT */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {/* Desktop: all projects */}
                                {filteredProjects.map((project, index) => (
                                    <div key={project.id} className="hidden sm:block">
                                        <ProjectCard
                                            project={project}
                                            isVisible={isVisible}
                                            glowColor={GLOW_COLORS[index % 3]}
                                        />
                                    </div>
                                ))}
                                {/* Mobile: limited projects */}
                                {mobileProjects.map((project, index) => (
                                    <div key={`m-${project.id}`} className="sm:hidden">
                                        <ProjectCard
                                            project={project}
                                            isVisible={isVisible}
                                            glowColor={GLOW_COLORS[index % 3]}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Mobile expand button */}
                            {hasMore && !showAllMobile && (
                                <div className="sm:hidden mt-4 flex justify-center">
                                    <button
                                        onClick={() => setShowAllMobile(true)}
                                        className="px-6 py-2 border border-primary text-primary font-pixel text-[10px] uppercase tracking-widest hover:bg-primary hover:text-void transition-colors rounded"
                                    >
                                        Show All {filteredProjects.length} Projects ↓
                                    </button>
                                </div>
                            )}
                            {showAllMobile && hasMore && (
                                <div className="sm:hidden mt-4 flex justify-center">
                                    <button
                                        onClick={() => setShowAllMobile(false)}
                                        className="px-6 py-2 border border-border text-text-muted font-pixel text-[10px] uppercase tracking-widest hover:border-primary/50 transition-colors rounded"
                                    >
                                        Show Less ↑
                                    </button>
                                </div>
                            )}
                        </>
                    ) : null}

                    {/* ── Scroll View — only when scroll mode is active ── */}
                    <div className={`flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory scrollbar-hide ${viewMode === 'grid' ? 'hidden' : ''}`}>
                        {projects.map((project, index) => {
                            const isProjectVisible = filteredProjects.some(p => p.id === project.id);
                            if (!isProjectVisible) return null;
                            return (
                                <div key={project.id} className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-[400px]">
                                    <ProjectCard
                                        project={project}
                                        isVisible={isVisible}
                                        glowColor={GLOW_COLORS[index % 3]}
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
