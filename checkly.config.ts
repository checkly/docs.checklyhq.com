import { defineConfig } from 'checkly'
import { RetryStrategyBuilder } from 'checkly/constructs'

const config = defineConfig({
  projectName: 'www.checklyhq.com',
  logicalId: 'checkly-production-e2e-mac-docs-checklyhq-com-1',
  repoUrl: 'https://github.com/checkly/checklyhq.com',
  checks: {
    activated: true,
    muted: false,
    playwrightConfigPath: './playwright.config.ts',
    runtimeId: '2024.09',
    frequency: 10,
    locations: [
      'us-east-1',
      'us-west-1',
      'eu-central-1',
      'ap-south-1'
    ],
    tags: ['mac'],
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 10,
      maxRetries: 3,
      sameRegion: true
    })
  },
  cli: {
    runLocation: 'eu-west-1',
    retries: 0
  }
})

export default config
