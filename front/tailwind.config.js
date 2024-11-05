/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        subwhite: "#F7F7F7",
        "main-color": "#8FCDDB",
        sub_blue: "#DEF0F5",
        "custom-black": "#323232",
        chat: "#FDFDFD",
        "bac-main": "#FBFBFB",
      },
    },
    fontFamily: {
      meiryo: ["メイリオ"],
      nikomoji: ["nikomoji-plus-v2"],
    },
  },
  plugins: [],
});
