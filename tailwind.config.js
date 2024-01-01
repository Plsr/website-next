const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      highlight: colors.purple,
      base: colors.slate,
      'rose-bud': {
        50: '#fdf5f3',
        100: '#fde9e3',
        200: '#fbd7cd',
        300: '#f6ae99',
        400: '#f19378',
        500: '#e6704d',
        600: '#d3542f',
        700: '#b14424',
        800: '#923b22',
        900: '#7a3622',
        950: '#42190d',
      },
    },
    fontFamily: {
      title: ['var(--font-title)'],
      body: ['var(--font-title)'],
    },
    extend: {},
  },
  plugins: [],
}
