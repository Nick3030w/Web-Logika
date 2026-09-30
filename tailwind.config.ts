import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#242628",
        accent: "#16D8D4",
        "accent-deep": "#08AEB2",
        "brand-gray": "#A9ABAD",
        "bg-base": "#FCFBF8",
        "bg-subtle": "#F4F0E8",
        "bg-dark": "#1B1D1F",
        "text-muted": "#686B6D",
        border: "#DED8CE",
        sand: "#D9CDBD",
        walnut: "#6A4D3B",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "Century Gothic", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      spacing: {
        "nav-height": "76px",
        "section-y": "96px",
        "section-y-mobile": "64px",
        "card-gap": "24px",
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(36, 38, 40, 0.08)",
        lift: "0 24px 60px rgba(36, 38, 40, 0.14)",
      },
      backgroundImage: {
        "brand-glow":
          "radial-gradient(circle at top right, rgba(22,216,212,0.16), transparent 36%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.09)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.92)", opacity: "0.55" },
          "70%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(.22,1,.36,1) both",
        "fade-in": "fade-in 1.1s ease both",
        float: "float 7s ease-in-out infinite",
        "slow-zoom": "slow-zoom 20s ease-out forwards",
        "pulse-ring": "pulse-ring 3.2s ease-out infinite",
        "draw-line": "draw-line 1s cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
