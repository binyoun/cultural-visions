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
        parchment: "#f2e4c0",
        "parchment-deep": "#e8d4a0",
        lacquer: "#7a1515",
        "lacquer-light": "#9b2020",
        ink: "#1a0a05",
        "ink-secondary": "#4a2c1a",
        "ink-muted": "#8a6040",
        "ink-ghost": "#b09070",
        gold: "#9a7010",
        gallery: {
          bg:        "#f2e4c0",
          surface:   "#e8d4a0",
          border:    "#7a1515",
          muted:     "#8a6040",
          secondary: "#4a2c1a",
          primary:   "#1a0a05",
          accent:    "#b82020",
        },
        campus: {
          hanoi:  "#2a5a6e",
          saigon: "#8b3520",
        },
      },
      fontFamily: {
        sans:  ["DM Sans", "sans-serif"],
        serif: ["DM Serif Display", "Georgia", "serif"],
      },
      gridTemplateColumns: {
        detail: "60fr 40fr",
      },
    },
  },
  plugins: [],
};

export default config;
