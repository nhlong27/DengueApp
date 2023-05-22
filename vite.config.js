import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@pages': resolve(__dirname, 'pages'),
      '@assets': resolve(__dirname, 'assets'),
    },
  },
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       doctor: resolve(__dirname, 'dashboard/index.html'),
  //     },
  //   },
  // },
  test: {
    exclude: ['src/dashboard/doctor', 'node_modules/*'],
    globals: true,
    environment: 'jsdom',
  },
});
