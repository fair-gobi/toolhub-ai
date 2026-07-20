import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Add this for dark mode toggle to work
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Clean professional font
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // For tool cards
      },
      backdropBlur: {
        xs: '2px', // For sticky header glass effect
      }
    },
  },
  plugins: [],
};
export default config;
