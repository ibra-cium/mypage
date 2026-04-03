import { Project, PreviewType } from '@/components/projects/ProjectCard';

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    topics: string[];
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
}

const CATEGORY_KEYWORDS = {
    'AI / ML': ['ai', 'ml', 'machine-learning', 'neural', 'nlp', 'llm', 'gpt', 'deep-learning', 'rag'],
    'Games': ['game', 'gaming', 'rpg', 'unity', 'unreal', 'godot', 'play', 'arcade'],
    'Web': ['website', 'portfolio', 'web-app', 'react', 'nextjs', 'vue', 'frontend', 'backend', 'fullstack'],
    'Tools': ['tool', 'utility', 'cli', 'script', 'automation', 'library', 'package'],
};

function determineCategory(repo: GitHubRepo): string {
    const text = (repo.name + ' ' + (repo.description || '') + ' ' + (repo.topics?.join(' ') || '')).toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return category;
        }
    }

    return 'Web'; // Default
}

function determinePreviewType(repo: GitHubRepo): PreviewType {
    const text = (repo.name + ' ' + (repo.description || '')).toLowerCase();

    if (text.includes('game') || text.includes('play')) return 'game';
    if (text.includes('todo') || text.includes('check') || text.includes('list')) return 'checklist';
    if (text.includes('dashboard') || text.includes('track') || text.includes('stats')) return 'dashboard';
    if (text.includes('portfolio') || text.includes('page') || text.includes('site')) return 'portfolio';

    return 'terminal';
}

function determineIcon(category: string): string {
    switch (category) {
        case 'AI / ML': return '🤖';
        case 'Games': return '🎮';
        case 'Web': return '🌐';
        case 'Tools': return '🛠️';
        default: return '📁';
    }
}

export async function fetchGitHubProjects(username: string): Promise<Project[]> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            next: { revalidate: 3600 } // Cache for 1 hour in Next.js
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const repos: GitHubRepo[] = await response.json();

        return repos
            .filter(repo => !repo.name.startsWith('.') && repo.name !== username) // Filter out hidden repos and profile readme
            .map(repo => {
                const category = determineCategory(repo);
                return {
                    id: `gh-${repo.id}`,
                    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                    description: repo.description || 'No description provided.',
                    tags: repo.language ? [repo.language, ...repo.topics.slice(0, 2)] : repo.topics.slice(0, 3),
                    category,
                    icon: determineIcon(category),
                    cartId: `GH-${repo.id.toString().slice(-3)}`,
                    url: repo.html_url,
                    previewType: determinePreviewType(repo),
                    featured: repo.stargazers_count > 5,
                };
            });
    } catch (error) {
        console.error('Failed to fetch GitHub projects:', error);
        return [];
    }
}
