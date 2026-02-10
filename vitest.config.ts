import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['./test/unit/**/*.{test,spec}.{js,ts}'],
      root: fileURLToPath(new URL('.', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'test/', 'dist/', '**/*.d.ts', '**/*.config.*'],
      },
    },
  })
)
