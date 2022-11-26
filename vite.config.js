import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'pages/login/index.html'),
        signup: resolve(__dirname, 'pages/signup/index.html'),
        admin: resolve(__dirname, 'pages/dashboard/admin/index.html'),
        doctor: resolve(__dirname, 'pages/dashboard/doctor/index.html'),
        nurse: resolve(__dirname, 'pages/dashboard/nurse/index.html'),
        patient: resolve(__dirname, 'pages/dashboard/patient/index.html'),
      },
    },
  },
});
