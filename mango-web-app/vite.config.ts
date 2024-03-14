import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@shared': path.resolve(__dirname, './../shared/src'),
            },
        },
    })
}
