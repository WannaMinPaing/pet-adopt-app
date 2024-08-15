/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit : ["outfit-regular","sans-serif"],
        outfitmedium : ["outfit-medium","sans-serif"],
        outfitbold : ["outfit-bold","sans-serif"],
      }
    },
  },
  plugins: [],
}

