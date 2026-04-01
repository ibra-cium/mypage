import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--color-void)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        // New palette tokens
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        // Legacy aliases — all now point to new values via CSS vars
        "neon-green": "var(--color-neon-green)",
        "cyber-cyan": "var(--color-cyber-cyan)",
        magenta: "var(--color-magenta)",
        purple: "var(--color-purple)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
      },
      spacing: {
        px: "1px",
        0: "0",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
        40: "160px",
        48: "192px",
        56: "224px",
        64: "256px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        pixel: ["var(--font-press-start-2p)", "cursive"],
      },
      animation: {
        scanline: "scanline 10s linear infinite",
        "pulse-blob": "pulse-blob 8s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(calc(100vh + 100%))" },
        },
        "pulse-blob": {
          "0%, 100%": { opacity: "0.15", transform: "scale(1)" },
          "50%": { opacity: "0.25", transform: "scale(1.08)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-8px) translateX(4px)" },
          "66%": { transform: "translateY(-4px) translateX(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
