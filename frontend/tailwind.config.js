/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#f5f6f2",
        primary: "#f8f6fb",
        primaryDark: "#e0dce9",
        primaryDarker: "#c6bed8",
        primaryDarkest: "#a89cc1",

        secondary: "#073050",
        secondaryDark: "#052840",
        secondaryDarker: "#042030",
        secondaryDarkest: "#031828",

        secondaryOne: "#ffbcb1",
        secondaryOneDark: "#e6a9a0",
        secondaryOneDarker: "#cc968e",
        secondaryOneDarkest: "#b3837b",

        tertiary: "#272626",
        // tertiary: "#404040",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        "3xs": "300px",
        "2xs": "350px",
        xs: "400px",
        s: "500px",
        smmd: "550px",
        mdlg: "840px",
        txl: "1680px",
        "3halfxl": "1780px",
        fxl: "2200px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeInBg: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeInBg: "fadeInBg 0.3s ease-out forwards"
      },
    },
  },
  plugins: [],
};
