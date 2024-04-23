/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
  plugins: [require("daisyui")],
};
