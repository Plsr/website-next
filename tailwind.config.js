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
      white: '#e1ebf2',
      slate: colors.slate,
      teal: colors.teal,
      violet: colors.violet,
      blue: colors.blue,
      yellow: colors.yellow,
      fuchsia: colors.fuchsia,
      orange: colors.orange,
    },
    fontFamily: {
      headline: ['Nunito', 'sans-serif'],
      body: ['Fira Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
