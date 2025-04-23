---
title: Adding Playwright Check Suites to groups
displayTitle: Adding a Playwright check Suite to a group
navTitle: Add to a group
weight: 20
slug: /groups-usage
menu:
  resources:
    parent: "Playwright Check Suites (Alpha)"
    weight: 20
---

{{< markdownpartial "/_shared/playwright-native-alpha.md" >}}

You can define a new group, or associate a Playwright Check Suite to an existing group.

## Steps

### 1. Create a group for your checks

To define a new group, create a group file, for example `website-group.check.ts`.

```typescript {title="website-group.check.ts"}

import { CheckGroup } from 'checkly/constructs'

export const myGroup = new CheckGroup('production-group', {
  name: 'production-group',
  activated: true,
  muted: false,
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  runParallel: true,
  retryStrategy: RetryStrategyBuilder.linearStrategy({ baseBackoffSeconds: 30, maxRetries: 2, sameRegion: false }),
})
```

## 2. Associate the group to the check

When specifying your Playwright Check Suite, you can reference the new or existing group, using its name:

  ```typescript {title="checkly.config.ts"}
  import { defineConfig } from 'checkly'

  const config = defineConfig({
    logicalId: 'checkly-website',
    projectName: 'checkly-website',
    checks: {
      playwrightConfigPath: './playwright.config.ts',
      playwrightChecks: [
        {
          name: 'checkly-website',
          frequency: 10,
          locations: ['us-east-1',],
          groupName: 'production-group', // use the name of the group you created
        },
      ],
    },
    cli: {
      runLocation: 'us-east-1',
    },
  })

  export default config
  ```

## 3. Deploy to apply the changes

```bash {title="Terminal"}
  npx checkly deploy --preview #confirm what will be deployed
  npx checkly deploy  # deploy
```

You can now see your Playwright check suite in your group.
