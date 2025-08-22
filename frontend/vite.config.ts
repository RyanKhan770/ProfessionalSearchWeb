import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

<<<<<<< HEAD
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
