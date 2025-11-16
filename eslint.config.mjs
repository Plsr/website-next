import eslintPluginNext from '@next/eslint-plugin-next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': eslintPluginNext,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
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
      'simple-import-sort/imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]

export default eslintConfig
