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
          surface: "#1e1e1e",
          border: "#2a2a2a",
          muted: "#6b6b6b",
          secondary: "#9ca3af",
          primary: "#e5e5e5",
          accent: "#c9a84c",
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
