import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/engse203-student-labs-68543210001/labs/week-05/',
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
