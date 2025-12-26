import { defineConfig } from 'vite';


export default defineConfig({
  // 개발 서버 설정
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // 빌드 설정
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // 필요시 청크 분할 설정
        }
      }
    }
  },

  // 기본 경로 설정 (GitHub Pages 등에서 사용)
  base: './',

  // CSS 설정
  css: {
    devSourcemap: true
  }


});
