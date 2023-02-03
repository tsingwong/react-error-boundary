/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      // insertTypesEntry: true,
      include: ['src/components'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/components/ErrorBoundary/index.tsx'),
      name: 'ReactErrorBoundary',
      formats: ['es', 'umd'],
      fileName: (format) => `react-error-boundary.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
