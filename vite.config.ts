import reactPlugin from '@vitejs/plugin-react-swc'
import analyzerPlugin from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [reactPlugin(), tsconfigPathsPlugin()],
})
