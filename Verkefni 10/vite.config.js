/* eslint-disable no-undef */
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                "audioPlayer.js": resolve(__dirname, 'uploader.html'),
                main: resolve(__dirname, 'index.html'),
                "face-api.min.js": resolve(__dirname, 'index.html'),
                sound: 'public/heyheyhey.mp3',
            }
        }
    }
})