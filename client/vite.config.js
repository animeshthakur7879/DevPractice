import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
   server : {
    proxy : {
      '/api' : {
        changeOrigin : true , 
        target : 'https://devpractice.onrender.com/' , 
        secure : false
      }
    }
  }
});