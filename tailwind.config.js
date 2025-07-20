const colors = require('tailwindcss/colors')

// Copied over from tailwindcss-typography default styles
// see https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js#L3-L9
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  important: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      accent: {
        50: '#DDF1E4',
        100: '#BFE8D9',
        150: '#A2DECE',
        200: '#87D3C3',
        300: '#5ABDAC',
        400: '#3AA99F',
        500: '#2F968D',
        600: '#24837B',
        700: '#1C6C66',
        800: '#164F4A',
        850: '#143F3C',
        900: '#122F2C',
        950: '#101F1D',
      },
      paper: '#FFFCF0',
      base: {
        950: '#1C1B1A',
        900: '#282726',
        850: '#343331',
        800: '#403E3C',
        700: '#575653',
        600: '#6F6E69',
        500: '#878580',
        300: '#B7B5AC',
        200: '#CECDC3',
        150: '#DAD8CE',
        100: '#E6E4D9',
        50: '#F2F0E5',
      },
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
    },
    fontFamily: {
      title: ['var(--font-main)'],
      body: ['var(--font-main)'],
      copy: ['var(--font-main)'],
      handwriting: ['var(--font-main)'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: null,
            color: theme('colors.paper'),
            h1: {
              fontSize: em(20, 14),
            },
            h2: {
              fontSize: em(18, 14),
            },
            a: {
              color: theme('colors.accent.200'),
            },
            code: {
              fontSize: '0.7rem',
            },
            pre: {
              fontSize: '0.7rem',
            },
            strong: {
              color: theme('colors.paper'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
