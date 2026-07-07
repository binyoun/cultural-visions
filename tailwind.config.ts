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
        bg:              "#050607",
        surface:         "#0a0c0e",
        "border-line":   "#191d22",
        "border-hover":  "#2c313a",
        "text-base":     "#99a2ad",
        "text-dim":      "#545b66",
        "text-bright":   "#eef1f5",
        accent:          "#c8956c",
        "accent-blue":   "#7c9cba",
        "accent-green":  "#8fb47a",
        "accent-violet": "#b48fc7",
        campus: {
          hanoi:  "#7c9cba",
          saigon: "#c8956c",
        },
      },
      fontFamily: {
        sans:  ["Space Grotesk", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        mono:  ["JetBrains Mono", "monospace"],
      },
      gridTemplateColumns: {
        detail: "60fr 40fr",
      },
    },
  },
  plugins: [],
};

export default config;
