import reactRefresh from '@vitejs/plugin-react-refresh'
import analyze from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

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
    jsxInject: 'import * as React from "react"',
  },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
  ],
})
