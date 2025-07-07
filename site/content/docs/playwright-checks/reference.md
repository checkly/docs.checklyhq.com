---
title: Playwright Check Suites reference -- Checkly Docs
displayTitle: All options available in Playwright Check Suites
navTitle: Reference
weight: 16
slug: /reference
menu:
  resources:
    parent: "Playwright Check Suites (Beta)"
---

{{< markdownpartial "/_shared/playwright-native-notice.md" >}}

Use the `checkly.config.ts/js` file to define your Playwright Check Suite.

Each Playwright Check Suite can be connected to references in your `playwright.config.ts/js` file.

During the Alpha, **a Playwright Check Suite can run up to 20 minutes**. This limit can be increased/decreased after the alpha.

## Playwright Check Suite definition

To add Playwright Check Suites to your Checkly monitoring setup, specify the path to your `playwright.config.ts/js` and add a new `playwrightChecks` property to the existing `checks` configuration in your `checkly.config.ts/js`.

```typescript {title="checkly.config.ts"}
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  // ...

  checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        name: 'critical-tagged',
        pwTags: 'critical',
        pwProjects: 'chromium',
        frequency: Frequency.EVERY_1M,
        locations: ['us-east-1', 'eu-west-1','eu-central-1', 'ap-south-1'],
      }
    ],
  },
})
```

A Playwright Check Suite requires the following properties:

* `name` - a human friendly name for your check suite.
* `logicalId` - a reference for your check suite.

Other available properties like `frequency`, `alertChannels` or `locations` are inherited from the general Checkly configuration if not specified otherwise.

## Playwright references

The Checkly infrastructure will run and deploy all your existing Playwright tests (similar to what `npx playwright test` runs) as monitors if you don't reference Playwright projects or tags.

Specify which tests should become part of global end-to-end monitoring by defining these properties:

* `pwProjects` --- select existing project names from your Playwright configuration to create a Playwright Check Suite.

* `pwTags` --- select test tags that will be grouped into a Playwright Check Suite.

You can combine `pwTags` and `pwProjects` to generate your check suite, too.

For example:

```typescript {title="checkly.config.ts"}
export default defineConfig({
  // ...
  checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        /**
         * Run critical tagged tests in Chromium
         * every minute from 4 locations.
         */
        name: 'critical-tagged',
        pwTags: '@critical',
        pwProjects: 'chromium',
        frequency: Frequency.EVERY_1M,
        locations: ['us-east-1', 'eu-west-1','eu-central-1', 'ap-south-1'],
      },
    ],
  },
});
```

> We recommend using `pwTags` and `pwProjects` to group your Playwright tests into different monitoring levels with different monitoring settings. For example, critical application functionality may be monitored best with short monitoring frequencies to lower the mean time to detect (MTTD).

## Monitoring customizations

A Playwright Check Suite inherits multiple properties from [the abstract `Check` class](/docs/cli/constructs-reference/#check):

- `name`
- `activated`
- `muted`
- `locations`
- `tags`
- `frequency`
- `alertChannels`
- `privateLocations`
- `retryStrategy`
- `alertEscalationPolicy`

Check [the reference documentation](/docs/cli/constructs-reference/#check) for more information on these settings.

Additionally, Playwright Check Suites provide specific configuration for your Playwright monitoring.

* `installCommand:` Override the command to install dependencies, by default it'll use `npm install --dev`.

* `testCommand:` Override the command to test, by default it uses npx playwright test with the tags, projects, and config file options your check specifies.

* `groupName:` The group this check belongs to.

```typescript {title="checkly.config.ts"}
checks: {
  playwrightConfigPath: './playwright.config.ts', // specify your config file
  playwrightChecks: [
    {
      /**
       * Run `@e2e` tagged tests across browsers
       * every 5 minute from 4 locations.
       */
      // Human readable name
      name: 'E2E test suite',
      // Reference id
      logicalId: 'e2e-test-suite',
      // Playwright project references defined in `playwright.config`
      pwProjects: ['chromium', 'firefox', 'webkit'],
      // Playwright tags defined in `spec` files
      pwTags: '@e2e',
      // Override default dependencies install command
      installCommand: 'npm install --dev',
      // Override the default test command
      testCommand: 'npx playwright test --grep@checkly --config=playwright.foo.config.ts',
      // Activate the check so that it runs on a schedule, true by default
      activated: true,
      // Mute the check so that it doesn't send alerts
      muted: false,
      // Add a check to a group
      groupName: 'production-group',
      frequency: Frequency.EVERY_5M,
      locations: ['us-east-1', 'eu-west-1','eu-central-1', 'ap-south-1'],
    }
  ]
 },
```
