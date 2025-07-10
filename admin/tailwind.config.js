/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#f5f6f2",
        primary: "#f8f6fb",
        secondary: "#073050",
        secondaryOne: "#ffbcb1",
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
        fxl: "2200px"
      },
    },
  },
  plugins: [],
}

