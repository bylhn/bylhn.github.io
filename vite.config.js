import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 홈(/)은 public/index.html(해안 마을)을 그대로 쓴다.
// 예전 React 홈은 /classic.html 로만 빌드해 둔다.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: { input: 'classic.html' },
  },
})
