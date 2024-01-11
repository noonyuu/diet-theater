/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#A2B0C7",
        "custom-black": "#323232",
        "chat": "#FDFDFD",
        "bac-main": "#FBFBFB",
      },
    },
  },
  plugins: [require("daisyui")],
};
