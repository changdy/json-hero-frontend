import forms from "@tailwindcss/forms";
import radix from "tailwindcss-radix";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      tiny: ".5rem",
      xs: ".625rem",
      sm: ".75rem",
      base: ".875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.375rem",
      "3xl": "1.5rem",
      "4xl": "1.875rem",
      "5xl": "2rem",
      "6xl": ["2.625rem", "3rem"],
      "7xl": "4rem",
      "8xl": "8rem",
    },
    extend: {
      height: {
        viewerHeight: "calc(100vh - 146px)",
        inspectorHeight: "calc(100vh - 70px)",
        jsonViewerHeight: "calc(100vh - 106px)",
        viewerHeightMinimal: "calc(100vh - 106px)",
        inspectorHeightMinimal: "calc(100vh - 30px)",
        jsonViewerHeightMinimal: "calc(100vh - 66px)",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
  variants: {
    outline: ["focus"],
  },
  plugins: [forms, radix()],
};
