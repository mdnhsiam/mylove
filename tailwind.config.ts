import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        gold: {
          50: "#fdf9e7",
          100: "#f8edbe",
          200: "#f4e190",
          300: "#f0d45c",
          400: "#ecc825",
          500: "#d4af37",
          600: "#b08d2b",
          700: "#8c6e20",
          800: "#685015",
          900: "#44320a",
        },
        "deep-purple": {
          50: "#f3e6f5",
          100: "#e0c3e8",
          200: "#cc99d9",
          300: "#b76ec9",
          400: "#a247b9",
          500: "#8a2be2",
          600: "#6a1b9a",
          700: "#4a148c",
          800: "#2a1045",
          900: "#1a0b2e",
        },
        "rose": {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "heart-float": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(1.5)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "lantern-rise": {
          "0%": { transform: "translateY(100%) scale(0.5)", opacity: "0" },
          "100%": { transform: "translateY(-100vh) scale(1)", opacity: "1" },
        },
        firefly: {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.2" },
          "25%": { transform: "translate(10px, -15px)", opacity: "0.8" },
          "50%": { transform: "translate(-5px, -25px)", opacity: "0.4" },
          "75%": { transform: "translate(15px, -10px)", opacity: "0.6" },
        },
        "rose-petal": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "heart-float": "heart-float 2s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "lantern-rise": "lantern-rise 15s ease-in-out infinite",
        "firefly": "firefly 8s ease-in-out infinite",
        "rose-petal": "rose-petal 8s linear infinite",
        "shake": "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
