/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        globals: true, 
        include: ['**/*.test.ts'], 
        environment: 'node',
    },
    plugins: [tsConfigPaths()]
})