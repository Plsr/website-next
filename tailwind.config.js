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
      accent: colors.blue,
      base: colors.zinc,
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
      title: ['-apple-system, BlinkMacSystemFont, sans-serif'],
      body: ['-apple-system, BlinkMacSystemFont, sans-serif'],
      copy: ['-apple-system, BlinkMacSystemFont, sans-serif'],
      handwriting: ['-apple-system, BlinkMacSystemFont, sans-serif'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: null,
            h1: {
              fontSize: em(26, 14),
            },
            a: {
              color: theme('colors.accent.500'),
            },
            code: {
              fontSize: '0.7rem',
            },
            pre: {
              fontSize: '0.7rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
