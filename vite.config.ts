import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - run 'npm run build' to generate stats.html
    visualizer({
      open: true, // Auto-open report in browser after build
      filename: 'dist/stats.html', // Output location
      gzipSize: true, // Show gzipped sizes
      brotliSize: true, // Show brotli sizes
      template: 'treemap', // Visualization type (treemap, sunburst, network)
    }),
  ],
  base: '/', // The repository name
  build: {
    // Additional optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000,
  },
});
