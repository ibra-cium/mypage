import React from 'react';

interface SectionLabelProps {
    label: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ label }) => {
    return (
        <div className="flex items-center gap-2 mb-4 select-none">
            <span className="font-pixel text-[10px] text-surface-2 uppercase tracking-widest">
                {label}
            </span>
            <div className="h-px flex-1 bg-border/50" />
        </div>
    );
};

export default SectionLabel;
