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
  darkMode: 'class',
  important: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      accent: colors.indigo,
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

      //accent: {
      //  50: '#fbf6fe',
      //  100: '#f5ebfc',
      //  200: '#ecdbf9',
      //  300: '#ddbff3',
      //  400: '#c792ea',
      //  500: '#b36ce0',
      //  600: '#9f4dd0',
      //  700: '#883bb5',
      //  800: '#733594',
      //  900: '#5e2b78',
      //  950: '#401457',
      //},

      // accent: {
      //   50: '#f0f1fd',
      //   100: '#e3e4fc',
      //   200: '#cccdf9',
      //   300: '#aeadf4',
      //   400: '#958ced',
      //   500: '#8370e4',
      //   600: '#6e4dd4',
      //   700: '#6546bc',
      //   800: '#523b98',
      //   900: '#453679',
      //   950: '#292046',
      // },
    },
    fontFamily: {
      title: ['var(--font-main)'],
      body: ['var(--font-main)'],
      copy: ['var(--font-main)'],
      handwriting: ['var(--font-handwriting)'],
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
