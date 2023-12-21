/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "480px",
      "sm-md": "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      screens: {
        xl: "1140px",
      },
      fontFamily: {
        proximaNova: [
          "var(--proxima-nova)",
          "var(--proxima-nova-bold)",
          "var(--proxima-nova-semibold)",
          ...fontFamily.sans,
        ],
      },
      borderRadius: {
        5: "5px",
      },
      fontSize: {
        sm: ["12px", "16px"],
        base: ["14px", "20px"],
        xl: ["16px", "24px"],
        "2xl": ["18px", "24px"],
        "3xl": ["20px", "24px"],
        "4xl": ["24px", "32px"],
        "5xl": ["32px", "40px"],
      },
      colors: {
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
