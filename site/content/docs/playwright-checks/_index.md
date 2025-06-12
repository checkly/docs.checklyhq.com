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

Use your existing Playwright tests as live, scheduled monitoring checks. No rewrites required. Define what to monitor using code, selecting the right tags and projects, and run your checks globally, using the [Checkly CLI](/docs/cli).

## What's a Playwright Check Suite?

A Playwright Check Suite lets you define a monitoring strategy using your existing Playwright tests and configured projects.

You can mix and match existing 
[Projects](https://playwright.dev/docs/test-projects) (`pwProjects`) and [test tags](https://playwright.dev/docs/test-annotations#tag-tests) (`pwTags`) to group test subsets into a Playwright Check Suite, like smoke tests or critical path flows into lightweight reliable flows.

## QuickStart Guide

Here's how to get from zero to deployed checks in 5 minutes.

###  Before you begin
What you need:

* A checkly account
* A repository using Playwright for E2E tests
  * one with a playwright configuration file.
  
## Steps

### 1. Install the Checkly CLI


  ```bash {title="Terminal"}
  npm install --save-dev checkly
  ```

### 2. [Optional] If you're using TypeScript

  If you're using TypeScript, install the dev dependencies [`jiti`](https://www.npmjs.com/package/jiti) and [`typescript`](https://www.npmjs.com/package/typescript). These help the CLI bundle your typescript config and test files correctly.

  ```bash {title="Terminal"}
  npm install --save-dev jiti typescript
  ```

### 3. Define which tests to monitor in `checkly.config.ts`

Create a `checkly.config.ts/js` and pick the tests you want to monitor, use [test tags](https://playwright.dev/docs/test-annotations#tag-tests) and [Projects](https://playwright.dev/docs/test-projects) to create a Playwright Check Suite.

Make sure:

* `pwProjects` match projects names in your playwright.config.ts.
* `pwTags` match tags in your test definitions.

Below are two example checks: one runs a full multi-browser suite with smoke tests, and one monitors only `@critical` tagged tests in `Chromium`.


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
          logicalId: 'multi-browser',
          name: 'Multi Browser Suite',
          pwProjects: ['chromium', 'firefox', 'webkit'], // Use project (or projects) in your playwright config
          pwTags: '@smoke-tests', // Use a tag (or tags) in your tests
          frequency: Frequency.EVERY_10M, // set your ideal frequency
          locations: ['us-east-1', 'eu-west-1'], // worldwide locations to run your check from
        },
        {
          /* Create a check that runs the critical tagged tests every 10 mins */          
          logicalId: 'critical-tagged',
          name: 'Critical Tagged tests',
          pwTags: '@critical', // Reference an existing tag in your tests
          pwProjects: ['chromium'],
          frequency: Frequency.EVERY_5M,  // set your ideal frequency
          locations: ['us-east-1', 'eu-central-1', 'ap-southeast-2'],
        },
      ],
    },
    /* The default location to use when running npx checkly test */
    cli: {
      runLocation: 'us-east-1',
      retries: 0, // full test retries, when running npx checkly test
    },
  })
  ```

### 4. Validate your monitors

Now, you can validate the playwright check suites above, that reference existing playwright tags or projects in your repository.

`npx checkly test --record` runs a test session to validate the defined checks on your `cli: runlocation:` using the settings in your checkly config file.

  ```bash {title="Terminal"}
  npx checkly test --record
  > Running 2 checks in eu-west-1.
    
    critical-tagged
      ✔ critical-tagged (4s)
    multi-browser
      ✔ multi-browser (18s)
    
    2 passed, 2 total
    Detailed session summary at: https://chkly.link/... 
  ```

## 5. Deploy your Playwright Check Suites


```bash {title="Terminal"}
npx checkly deploy

  > You are about to deploy your project "playwright-check-suites" to account "Checkly E2E Prod". Do you want to continue? … yes
```

Once deployed, your checks will run on a schedule and results will appear in your [home dashboard](https://app.checklyhq.com/).

## 6. Set up Alerts

Checkly lets you configure alert channels and alert groups to get notified when checks fail. You can receive alerts via email, Slack, webhooks, and more.

To set up alerts:
1. Go to the Checkly dashboard.
2. Navigate to **Alert Settings** > **Alert Channels** to create a new channel.
3. Assign channels to your project or individual checks.

Learn more in the [alerting guide](https://www.checklyhq.com/docs/alerts/).

and all done!


## Next steps

- Explore advanced configuration like [private locations](/docs/private-locations/) and [environment variables](/docs/cli/env-vars/).
- Add or tweak your checks to monitor flows in different browsers or locations.
- Set up alerting and integrations with your incident response tools
- Add [TCP](/docs/tcp-checks) and [API monitors](/docs/api-checks) alongside your Playwright Check Suites.

> → Continue to the [Playwright Check Suite CLI reference](/docs/playwright-checks/reference) for all available options.
