import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        "drips-blue": "#1672FD",
        "drips-dark": "#353535",
        "drips-navy": "#1E59AF",
        "drips-ice": "#E8F1FF",
        "accent-mint": "#6EE0AA",
        "accent-teal": "#05C6C6",
        "accent-coral": "#FD7168",
        "accent-gold": "#FFCB3E",
      },
    },
  },
  plugins: [],
};

export default config;
