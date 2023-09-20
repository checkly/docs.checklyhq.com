import { CheckGroup, RetryStrategyBuilder } from 'checkly/constructs'
import { alertChannels } from './alertChannels'

export const checklyhqComGroup = new CheckGroup('checklyhq-docs-1', {
  name: 'checklyhq.com/docs',
  activated: true,
  muted: false,
  runtimeId: '2023.02',
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
  retryStrategy: RetryStrategyBuilder.fixedStrategy({ baseBackoffSeconds: 60, maxRetries: 3, sameRegion: true })
})
