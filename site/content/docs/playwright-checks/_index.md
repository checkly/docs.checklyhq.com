---
title: Playwright Checks reference - Checkly Docs
displayTitle: Getting started with Playwright Monitoring
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright checks (Alpha)"

---
> Playwright Checks are currently in private Alpha. Reach out to [support](https://app.checklyhq.com/?support=true) to get an invite and join the [Slack community](https://checklycommunity.slack.com/join/shared_invite/zt-2qc51mpyr-5idwVD4R4izkf5FC4CFk1A#/shared-invite/email) to get live updates on feature development and get help getting started.

With Checkly, you can convert your Playwright tests directly into scheduled monitors.

You can schedule checks from different locations and trigger alerts for your team to act on when a critical flow or API fails in your product.

## What's a Playwright Check?

A Playwright check offers all of Playwright's features, natively:

* Dependencies between tests or projects → `projects`, `dependencies`, `globalSetup`, `globalTeardown`, reused `StorageState`, `test.beforeEach`...
* Test level retries.
* Automatic flagging of flaky tests when passed on retry.
* Fake media access: whether it's a QR in a video you are parsing or access to a microphone, you got it.
* Control over traces, video and screenshots generation.
* Multiple browsers and viewports: Chrome, Firefox, Webkit, Mobile Chrome.

On top of these, a Playwright Check provides:

* Custom code dependencies, read directly from your `package.json` file.
* Several [world-wide locations](https://www.checklyhq.com/docs/monitoring/global-locations/) to run your check from.
* Alerts to your preferred channel: Slack, Incident.io...
  
## Before you begin

What you need:

* A checkly account with the alpha enabled (Reach out to [support](https://app.checklyhq.com/?support=true) to get an invite)
* A repository using Playwright for E2E tests
  * It should include a playwright configuration file.
  
## Steps

1. Install the Checkly CLI using the alpha version:

  ```bash {title="Terminal"}
  npm install -D checkly@pwt-alpha
  ```

2. Test and create a monitor with all your tests. From inside your repository's source code directory, run:

  ```bash {title="Terminal"}
  npx checkly test --record

  npx checkly deploy
  ```

3. Cherry-pick which tests should become checks

Of course, you can have a big monitor that checks your whole suite, but it's likely only some tagged tests or Playwright projects need to become monitors. You can update your `checkly.config.ts` to select the tests to become monitors, with their own schedule, location and configuration.

Here's a fully working example, adjust the `pwProjects` and `pwTags` to ones that exist in your code.

  ```typescript {title="checkly.config.ts"}
  // checkly.config.ts
  import { defineConfig } from 'checkly'
  import { Frequency } from 'checkly/constructs'

  export default defineConfig({
    projectName: 'Cool Website Checks',
    logicalId: 'cool-website-monitoring',
    repoUrl: 'https://github.com/acme/website',
    checks: {
      playwrightConfigPath: './playwright.config.ts', //specify a custom playwright config file here
      playwrightChecks: [
        {
          /* Create a check that runs the essential pw project 
          every 5 mins in EU west region */
          name: 'Essential-projects',
          pwProjects: 'essential', // Reference the project in your playwright.config.ts
          frequency: Frequency.EVERY_5M,
          locations: ['eu-west-1'],
        },
        {
          /* Create a check that runs the critical tagged tests 
          every 10 mins in EU west region */
          name: 'Critical-tagged',
          pwTags: 'critical', // Reference an existing tag in your tests
          frequency: Frequency.EVERY_10M,
          locations: ['eu-west-1'],
        },
      ],
    },
    /* The default location to use when running npx checkly test */
    cli: {
      runLocation: 'eu-west-1',
      retries: 0, // full test retries, when running npx checkly test
    },
  })
  ```

4. Confirm it works by testing and deploying your updated monitors:

  ```bash {title="Terminal"}
  npx checkly test --record

  npx checkly deploy
  ```