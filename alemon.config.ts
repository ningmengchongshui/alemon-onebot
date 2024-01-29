import { defineConfig } from 'alemonjs'
import one from './src/index.js'
export default defineConfig({
  app: {
    scripts: 'main.ts'
  },
  platforms: [one]
})
