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
      ...colors,
    },
    fontFamily: {
      body: ['Nunito', 'sans-serif'],
      headline: ['Nunito', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
