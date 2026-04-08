import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      colors: {
        "ah-red":   "#CD1719",
        "ah-black": "#1D1D1B",
        "ah-grey":  "#B2B2B2",
        "ah-light": "#EDEDED",
        "ah-muted": "#6B6B6B",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      letterSpacing: {
        "widest-2": "0.4em",
        "widest-3": "0.35em",
        "wide-2":   "0.3em",
        "wide-1":   "0.22em",
        "tag":      "0.18em",
      },
      fontSize: {
        "2xs": ["9px",  { lineHeight: "1.4" }],
        "3xs": ["7.5px",{ lineHeight: "1.4" }],
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        DEFAULT: "0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
