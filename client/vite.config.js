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
        target : 'http://localhost:9000' , 
        secure : false
      }
    }
  }
});