const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      black: '#171c29',
      white: colors.white,
      emerald: colors.emerald,
      slate: colors.slate,
      teal: colors.teal,
      violet: colors.violet,
      blue: colors.blue,
      yellow: colors.yellow,
      amber: colors.amber,
      fuchsia: colors.fuchsia,
      orange: colors.orange,
      red: colors.red,
      transparent: colors.transparent,
    },
    fontFamily: {
      headline: ['Josefin Sans', 'sans-serif'],
      body: ['Hind', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
