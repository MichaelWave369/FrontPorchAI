import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves project sites from /<repo-name>/.
// Without this base path, Vite builds assets as /assets/... and the page can render white.
export default defineConfig({
  base: '/FrontPorchAI/',
  plugins: [react()],
});
