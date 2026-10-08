import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf6",
          100: "#d7f5ea",
          200: "#b2ebd7",
          300: "#7eddbd",
          400: "#4bbf9d",
          500: "#2fa787",
          600: "#1e7d66",
          700: "#1b6453",
          800: "#174f43",
          900: "#143f39",
        },
      },
      boxShadow: {
        soft: "0 30px 80px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
