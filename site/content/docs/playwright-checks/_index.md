---
title: Playwright Check Suites reference - Checkly Docs
displayTitle: Onboard your Playwright test suite
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright Check Suites (Alpha)"

---

{{< markdownpartial "/_shared/playwright-native-alpha.md" >}}


With Checkly, convert your Playwright tests directly into scheduled monitors.

You can schedule checks from different locations and trigger alerts for your team to act on when a critical flow or API fails in your product.

## What's a Playwright Check Suite?

A Playwright Check Suite runs your Playwright test suite in a single monitoring check.
You can slice and dice your Playwright test suite into different Playwright Check Suites, using known references such as Playwright Projects, `pwProjects` or Playwright test tags, `pwTags`.

Playwright Check Suites support all Playwright features out of the box:

* Dependencies between tests or projects → `projects`, `dependencies`, `globalSetup`, `globalTeardown`, reused `StorageState`, `test.beforeEach`...
* Multiple browsers and viewports: Chrome, Firefox, WebKit, Mobile Chrome.
* Test level retries.
* Automatic flagging of flaky tests when passed on retry.
* Fake media access: whether it's a QR in a video you are parsing or access to a microphone, you got it.
* Control over traces, video and screenshots generation.


On top of these, a Playwright Check Suite provides:

* Custom code dependencies, read directly from your `package.json` file.
* [World-wide locations](https://www.checklyhq.com/docs/monitoring/global-locations/) to run your check from.
* [Alerts](https://www.checklyhq.com/docs/alerting-and-retries/alert-channels/) to your preferred channel: Slack, Incident.io...
  
## Before you begin

What you need:

* A checkly account
* A repository using Playwright for E2E tests
  * It should include a playwright configuration file.
  
## Steps

### 1. Install the Checkly CLI using the alpha version:

The alpha version gets updated daily with new improvements. You can follow updates in the [Slack community](https://checklycommunity.slack.com/join/shared_invite/zt-2qc51mpyr-5idwVD4R4izkf5FC4CFk1A#/shared-invite/email).

  ```bash {title="Terminal"}
  npm install --save-dev checkly@pwt-alpha
  ```

### 2. [Optional] If you're using TypeScript

  If you're using TypeScript, install the dev dependencies [`ts-node`](https://www.npmjs.com/package/ts-node) and [`typescript`](https://www.npmjs.com/package/typescript).

  ```bash {title="Terminal"}
  npm install --save-dev jiti typescript
  ```

### 3. [If you are new to Checkly] Test and create a monitor with all your tests

  From inside your repository's source code directory, run:

  ```bash {title="Terminal"}
  npx checkly test --record
  ```
  
  This will create a test session with all your tests. You'll get a Checkly URL where you can see the test results.
  In your repository, a `checkly.config.ts/js` is automatically created, configured to run a single Playwright Check Suite containing all your tests.

### 4. Cherry-pick which tests should become checks

Of course, you can now run `npx checkly deploy` and have a big monitor that checks your whole suite.

It's likely that only some tagged tests or Playwright projects need to become monitors. You can now update your `checkly.config.ts/js` file to select the tests to become individual monitors, with their own schedule, location, and configuration.

Here's a fully working example. Adjust the `pwProjects` and `pwTags` to ones that exist in your code.

  ```typescript {title="checkly.config.ts/js"}
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
          /* Create a multi-browser check that runs 
          every 5 mins.*/
          name: 'multi-browser',
          pwProjects: ['chromium', 'firefox', 'webkit'], // Reference the project or projects in your playwright config
          frequency: Frequency.EVERY_5M, // set your ideal frequency
          locations: ['us-east-1', 'eu-west-1'], // add your locations
        },
        {
          /* Create a check that runs the critical tagged tests every 10 mins */
          name: 'checkly-tagged',
          pwTags: 'checkly', // Reference an existing tag in your tests
          frequency: Frequency.EVERY_10M,  // set your ideal frequency
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

### 5. Test and deploy your updated monitors

Now, you can test and deploy the individual monitors above, that reference existing playwright tags or projects in your repository.

  ```bash {title="Terminal"}
  npx checkly test --record
  > Running 2 checks in eu-west-1.
    
    checkly-tagged
      ✔ checkly-tagged (4s)
    multi-browser
      ✔ multi-browser (18s)
    
    2 passed, 2 total
    Detailed session summary at: https://chkly.link/... 
  
  npx checkly deploy

  > You are about to deploy your project "playwright-check-suites" to account "Checkly E2E Prod". Do you want to continue? … yes
  ```

Now, you can head over to [Checkly's home dashboard](https://app.checklyhq.com/) and see your new checks running and associate an alert channel for them.
