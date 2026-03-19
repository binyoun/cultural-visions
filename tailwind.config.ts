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
        gallery: {
          bg: "#121212",
          surface: "#1a1612",
          border: "#2e2820",
          muted: "#6b5c4a",
          secondary: "#b0967a",
          primary: "#f0e6d3",
          accent: "#c9a84c",
        },
        campus: {
          hanoi: "#4a8f9e",
          saigon: "#b85c38",
        },
      },
      fontFamily: {
        sans: ["Inter", "DM Sans", "sans-serif"],
        serif: ["DM Serif Display", "Playfair Display", "serif"],
      },
      gridTemplateColumns: {
        "detail": "60fr 40fr",
      },
    },
  },
  plugins: [],
};

export default config;
