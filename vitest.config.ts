import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', '.content-collections'],
  },
  resolve: {
    alias: {
      components: resolve(__dirname, './components'),
      '@components': resolve(__dirname, './components'),
      lib: resolve(__dirname, './lib'),
      'content-collections': resolve(
        __dirname,
        './.content-collections/generated',
      ),
    },
  },
})
