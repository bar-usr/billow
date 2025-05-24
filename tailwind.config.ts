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
 
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        'DEFAULT': '0 2px 4px var(--tw-shadow-color)',
        'md': '0 4px 8px var(--tw-shadow-color)',
        'lg': '0 8px 16px var(--tw-shadow-color)',
        'xl': '0 12px 24px var(--tw-shadow-color)',
        '2xl': '0 24px 48px var(--tw-shadow-color)',
        'none': 'none',
      },
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
