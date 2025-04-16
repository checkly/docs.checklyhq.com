import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testMatch: '**/__checks__/**/*.spec.{js,ts}',
  reporter: 'html',
  use: {
    trace: 'on',
    video: 'on'
  },

  projects: [
    {
      name: 'docs.checkly.com',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
