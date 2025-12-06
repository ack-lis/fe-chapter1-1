import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setupTests.js'],
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules/', 'dist/', 'e2e/', '.husky/'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/setupTests.js',
        '*.config.js',
        'dist/',
        'e2e/',
        '.husky/'
      ]
    },
    testTimeout: 10000,
    hookTimeout: 10000
  }
});
