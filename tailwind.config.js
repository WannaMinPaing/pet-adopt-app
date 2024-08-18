/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        primary : "#E8B20E",
        secondary : "#4faaff",
        light_seondary : "#fff1c9",
        gray : "#8F8e8d",
        white:"#fff"
      },
      fontFamily: {
        outfit : ["outfit-regular","sans-serif"],
        outfitmedium : ["outfit-medium","sans-serif"],
        outfitbold : ["outfit-bold","sans-serif"],
      }
    },
  },
  plugins: [],
}

