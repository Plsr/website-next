const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      neutral: {
        50: '#f7f7f8',
        100: '#efeef0',
        200: '#dad9de',
        300: '#b9b7c2',
        400: '#9290a0',
        500: '#716f81',
        600: '#5f5c6d',
        700: '#4d4b59',
        800: '#42414b',
        900: '#3a3941',
        950: '#27262b',
      },
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
      title: ['var(--font-main)'],
      body: ['var(--font-main)'],
    },
    extend: {},
  },
  plugins: [],
}
