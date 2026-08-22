/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1550px",
        "9xl": "1700px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#faf6ec",
          100: "#f2e6c9",
          200: "#e2c98a", // gold-light
          300: "#d5b87f",
          400: "#cbb178",
          500: "#c8a96e", // gold
          600: "#8a6d3b", // gold-dark
          700: "#6e5730",
          800: "#584526",
          900: "#3a2e19",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fbf8f2",
          100: "#f5efe4", // cream
          200: "#e0d6c4", // cream-dim
          300: "#cbbfa4",
          400: "#a89b7e",
          500: "#3d3a34",
          600: "#1c1b18", // ink-mid
          700: "#111110", // ink-soft
          800: "#0c0c0b",
          900: "#080807", // ink
        },
        /* Huuboi brand scale — mirrors app/tailwind.config.js and
           app/globals.css on huuboi.com exactly, so these values carry over
           unchanged when this app is ported into the Next.js codebase. */
        ink: {
          DEFAULT: "#080807",
          soft: "#111110",
          mid: "#1c1b18",
        },
        cream: {
          DEFAULT: "#f5efe4",
          dim: "#e0d6c4",
        },
        gold: {
          DEFAULT: "#c8a96e",
          light: "#e2c98a",
          dark: "#8a6d3b",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        ui: ['"Bebas Neue"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        /* Landing/auth stair-step reveal (see StaggerItem) */
        "stagger-in": "staggerIn 0.45s ease-in-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        staggerIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    container: {
      padding: {
        sm: "1rem",
      },
    },
  },
  plugins: [],
};
