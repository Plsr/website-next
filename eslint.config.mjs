import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'warn',
      'simple-import-sort/imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]

export default eslintConfig
