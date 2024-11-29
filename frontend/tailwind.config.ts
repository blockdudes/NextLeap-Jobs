import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f2937",
        foreground: "#f9fafb",
        primary: "#3b82f6",
        secondary: "#facc15",
        accent: "#86efac",
      },
    },
  },
  plugins: [],
};
export default config;
