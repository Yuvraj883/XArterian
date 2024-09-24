import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './', // specify the root directory
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // adjust if you have a src folder
    },
  },
  server: {
    open: true, // automatically open the app in the browser
  },
});
