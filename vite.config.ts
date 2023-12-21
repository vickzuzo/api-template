import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@emedic': path.resolve(__dirname, './src'),
    },
  },
});
