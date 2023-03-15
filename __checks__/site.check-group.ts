import { CheckGroup } from '@checkly/cli/constructs'

export const checklyhqComGroup = new CheckGroup('checklyhq-com-1', {
  name: 'Checklyhq.com',
  activated: true,
  muted: false,
  runtimeId: '2022.10',
  locations: [
    'us-east-1',
    'us-west-1',
    'eu-central-1',
    'ap-south-1'
  ],
  tags: ['checklyhq.com'],
  browserChecks: {
    testMatch: '*.spec.ts'
  }
})
