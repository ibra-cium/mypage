'use client';

import React from 'react';

interface FilterTabsProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
    categories,
    activeCategory,
    onSelectCategory
}) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`
            px-6 py-2 rounded-full font-pixel text-[12px] uppercase transition-all duration-300
            ${activeCategory === category
                            ? 'bg-neon-green text-void border-2 border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                            : 'bg-surface-2 text-text-muted border-2 border-border hover:border-cyber-cyan/50 hover:text-text-primary'
                        }
          `}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
