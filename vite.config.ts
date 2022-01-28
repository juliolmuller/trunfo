import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          limit: 80,
        }),
      ],
    },
  },
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
  ],
})
