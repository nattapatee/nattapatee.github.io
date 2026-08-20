import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --port 5871 --strictPort',
    port: 5871,
    reuseExistingServer: false,
  },
  use: {
    baseURL: 'http://localhost:5871',
  },
})
