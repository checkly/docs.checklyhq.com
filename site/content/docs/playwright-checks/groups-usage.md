---
title: Playwright Check suites reference - Checkly Docs
displayTitle: Getting started with Playwright Monitoring
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright check suites (Alpha)"

---
{{< markdownpartial "/_shared/playwright-check-suites-alpha.md" >}}

You can define a new group, or associate a Playwright check suite to an existing group.

## Steps

### 1. Create a group for your checks

To define a new group, create a group file, for example `website-group.check.ts`.

```typescript {title="website-group.check.ts"}

import { CheckGroup } from 'checkly/constructs'

export const playwrightGroup = new CheckGroup('production-group', {
  name: 'production-group',
  activated: true,
  muted: false,
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'group'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  runParallel: true,
})
```

## 2. Associate the group to the check

When specifiying your Playwright check suite, you can reference the new or existing group, using its name:

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
      frequency: 10,
      locations: ['us-east-1',],
    },
    cli: {
      runLocation: 'us-east-1',
    },
  })

  export default config
  ```

3. Deploy to apply the changes

```bash {title="Terminal"}
  npx checkly deploy
```

Now you can see your Playwright check suite in your group.