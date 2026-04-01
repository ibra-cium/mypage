"use client";

import React from "react";

/**
 * Full-screen animated background:
 * - Dark navy base (not pitch black)
 * - 3 large drifting blobs (violet, amber, blue) — clearly visible
 * - Subtle grid lines overlay
 * - Star-field dots
 * - Soft glass-wave shimmer strip
 */
const AnimatedBackground: React.FC = () => {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* ── Base gradient (dark navy, not black) ─────────── */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, #16103A 0%, #0B0C1D 45%, #07080D 100%)",
                }}
            />

            {/* ── Stars ─────────────────────────────────────────── */}
            <div className="absolute inset-0 star-field" />

            {/* ── Grid ──────────────────────────────────────────── */}
            <div className="absolute inset-0 tron-grid" />

            {/* ── Blobs ─────────────────────────────────────────── */}
            {/* Violet — top right */}
            <div className="blob blob-violet" />
            {/* Amber — bottom left */}
            <div className="blob blob-amber" />
            {/* Blue accent — center top */}
            <div className="blob blob-blue" />

            {/* ── Glass wave shimmer strip ──────────────────────── */}
            <div className="glass-wave" />
            <div className="glass-wave glass-wave-2" />
        </div>
    );
};

export default AnimatedBackground;
