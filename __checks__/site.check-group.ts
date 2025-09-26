import { CheckGroup, RetryStrategyBuilder, Frequency } from 'checkly/constructs'
import { alertChannels } from './alertChannels'

export const checklyhqComGroup = new CheckGroup('checklyhq-docs-1', {
  name: 'checklyhq.com/docs',
  activated: true,
  muted: true,
  runtimeId: '2023.02',
  frequency: Frequency.EVERY_1H,
  locations: [
    'us-east-1',
    'us-west-1',
    'eu-central-1',
    'ap-south-1'
  ],
  tags: ['mac', 'checklyhq.com'],
  alertChannels,
  browserChecks: {
    testMatch: '*.spec.ts'
  },
  retryStrategy: RetryStrategyBuilder.fixedStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 3,
    sameRegion: true
  })
})
