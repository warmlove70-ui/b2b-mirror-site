import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10212D",
        sand: "#F6EFE7",
        copper: "#A56A43",
        teal: "#255D67",
        mist: "#D7E4E3",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 33, 45, 0.10)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(16, 33, 45, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 33, 45, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
