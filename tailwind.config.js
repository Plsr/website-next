const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: '#171c29',
      white: '#e1e7f5',
      slate: colors.slate,
      teal: colors.teal,
      violet: colors.violet
    },
    extend: {},
  },
  plugins: [],
};
