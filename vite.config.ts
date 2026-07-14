import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Multi-page (MPA) build: one real HTML document per page.
// Clean URLs are handled by Vercel (vercel.json → cleanUrls).
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'comment-ca-marche': resolve(__dirname, 'comment-ca-marche.html'),
        tarifs: resolve(__dirname, 'tarifs.html'),
        'devenir-operateur': resolve(__dirname, 'devenir-operateur.html'),
        'a-propos': resolve(__dirname, 'a-propos.html'),
      },
    },
  },
})
