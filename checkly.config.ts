import { defineConfig } from 'checkly'
import { RetryStrategyBuilder } from 'checkly/constructs'

const config = defineConfig({
  projectName: 'www.checklyhq.com',
  logicalId: 'checkly-production-e2e-mac-docs-checklyhq-com-1',
  repoUrl: 'https://github.com/checkly/checklyhq.com',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2024.09',
    frequency: 10,
    locations: [
      'us-east-1',
      'us-west-1',
      'eu-central-1',
      'ap-south-1'
    ],
    checkMatch: '**/__checks__/**/*.check?(-group).{js,ts}',
    include: ['__checks__/docs-visual.spec.ts-snapshots/homepage-visual-comparison-1-docs-checkly-com-linux.png'],
    tags: ['mac'],
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [{
      name: 'docs.checklyhq.com',
      frequency: 10,
      locations: [
        'us-east-1',
        'us-west-1',
        'eu-central-1',
        'ap-south-1'
      ],
    }],
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 10,
      maxRetries: 3,
      sameRegion: true
    })
  }
})

export default config
