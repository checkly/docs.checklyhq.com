import { defineConfig } from 'checkly'

const config = defineConfig({
  projectName: 'www.checklyhq.com',
  logicalId: 'checkly-production-e2e-mac-docs-checklyhq-com-1',
  repoUrl: 'https://github.com/checkly/checklyhq.com',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2023.02',
    frequency: 10,
    locations: [
      'us-east-1',
      'us-west-1',
      'eu-central-1',
      'ap-south-1'
    ],
    checkMatch: '**/__checks__/**/*.check?(-group).{js,ts}',
    tags: ['mac'],
    browserChecks: {
      frequency: 10,
      testMatch: '**/__checks__/**/*.spec.{js,ts}'
    }
  }
})

export default config
