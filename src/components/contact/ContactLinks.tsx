"use client";

import React from "react";
import { Mail } from "lucide-react";

// Inline SVG components for brand icons to avoid lucide-react version issues
const GithubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const CONTACT_LINKS = [
    {
        name: "Email",
        icon: <Mail className="w-5 h-5" />,
        url: "mailto:toibrahim1315@gmail.com",
        label: "Reach Out",
    },
    {
        name: "GitHub",
        icon: <GithubIcon className="w-5 h-5" />,
        url: "https://github.com/ibra-cium",
        label: "View Code",
    },
    {
        name: "LinkedIn",
        icon: <LinkedinIcon className="w-5 h-5" />,
        url: "https://www.linkedin.com/in/siam-ibrahim-073791396/",
        label: "Professional",
    },
    {
        name: "Facebook",
        icon: <FacebookIcon className="w-5 h-5" />,
        url: "https://www.facebook.com/ibrahim.siyam.927026/",
        label: "Social Hub",
    },
];

export const ContactLinks: React.FC = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
            {CONTACT_LINKS.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-surface-2 border border-border p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-neon-green hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] overflow-hidden"
                >
                    <div className="text-text-muted transition-colors group-hover:text-neon-green">
                        {link.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        {link.name}
                    </span>
                    <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        {link.label}
                    </span>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-green opacity-0 group-hover:opacity-100 animate-pulse" />
                </a>
            ))}
        </div>
    );
};
