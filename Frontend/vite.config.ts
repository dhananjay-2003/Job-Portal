import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const backendUrl = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: backendUrl.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
