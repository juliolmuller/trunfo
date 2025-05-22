import reactPlugin from '@vitejs/plugin-react-swc'
import path from 'node:path'
import analyzerPlugin from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      plugins: [
        analyzerPlugin({
          summaryOnly: true,
          limit: 10,
        }),
      ],
    },
  },
})
