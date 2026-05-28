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
        bg: {
          primary: "#060608",
          secondary: "#0c0c10",
          elevated: "#111116",
          hover: "#16161c",
        },
        border: {
          subtle: "#1a1a24",
          default: "#22222e",
          glow: "#3d3d5c",
        },
        accent: {
          violet: "#7c6df0",
          blue: "#4f8ef7",
          cyan: "#22d3ee",
          emerald: "#34d399",
          rose: "#fb7185",
          amber: "#fbbf24",
        },
        text: {
          primary: "#f0f0f8",
          secondary: "#8888a8",
          muted: "#4a4a6a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-violet": "radial-gradient(ellipse at center, rgba(124,109,240,0.15) 0%, transparent 70%)",
        "glow-blue": "radial-gradient(ellipse at center, rgba(79,142,247,0.15) 0%, transparent 70%)",
        "mesh-dark": "radial-gradient(at 40% 20%, rgba(124,109,240,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(79,142,247,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(34,211,238,0.04) 0px, transparent 50%)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 2%)" },
          "40%": { transform: "translate(2%, -1%)" },
          "50%": { transform: "translate(-3%, 3%)" },
          "60%": { transform: "translate(1%, -2%)" },
          "70%": { transform: "translate(-2%, 1%)" },
          "80%": { transform: "translate(3%, -3%)" },
          "90%": { transform: "translate(-1%, 2%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 109, 240, 0.3)",
        "glow-blue": "0 0 20px rgba(79, 142, 247, 0.3)",
        "glow-sm": "0 0 10px rgba(124, 109, 240, 0.2)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 109, 240, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
