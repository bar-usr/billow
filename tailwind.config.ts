import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds & text
        background: "var(--background)", 
        foreground: "var(--foreground)",
        
        // Brand colors
        primary: "var(--primary)",
        accent: "var(--accent)",
        
        // UI neutrals
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      padding: {
        btnX: "30px",
        btnY: "15px",
      },
      scale: {
        '80': '0.8',
        '95': '0.95',
        '97': '0.97',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'grow': 'grow 0.5s ease-in-out forwards',
      },
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        'DEFAULT': '0 2px 4px var(--tw-shadow-color)',
        'md': '0 4px 8px var(--tw-shadow-color)',
        'lg': '0 8px 16px var(--tw-shadow-color)',
        'xl': '0 12px 24px var(--tw-shadow-color)',
        '2xl': '0 24px 48px var(--tw-shadow-color)',
        'none': 'none',
      },
      darkMode: 'class', // required for manual class toggling
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
} satisfies Config;
