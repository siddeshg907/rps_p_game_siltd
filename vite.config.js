import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 to allow access from any IP
    port: 3000, // Or the port of your choice
  },
});
