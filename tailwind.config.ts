import type { Config } from "tailwindcss";
import daisyui from "daisyui"
export default {
  content: [ "./app/**/*.{js,jsx,ts,tsx}", // Match all JS/TSX files in the app directory
    "./app/**/*.client.{js,jsx,ts,tsx}", // Explicitly match client components
    "./app/**/*.server.{js,jsx,ts,tsx}", // Explicitly match server components
    ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",  // Slower spin
        "spin-fast": "spin 2s linear infinite", // Faster spin
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
