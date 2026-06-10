import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#212121",
        accent: "#00BCD4",
        "bg-base": "#FFFFFF",
        "bg-subtle": "#FAFAFA",
        "text-muted": "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "nav-height": "64px",
        "section-y": "64px",
        "section-y-mobile": "40px",
        "card-gap": "24px",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
