const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      body: ['var(--font-nunito)'],
      headline: ['var(--font-nunito)'],
    },
    extend: {},
  },
  plugins: [],
}
