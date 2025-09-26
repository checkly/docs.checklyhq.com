---
title: Playwright Check Suites reference - Checkly Docs
displayTitle: Onboard your Playwright test suite
navTitle: Overview
weight: 14
slug: /
menu:
  resources:
    parent: "Playwright Check Suites (Beta)"

---

{{< markdownpartial "/_shared/playwright-native-notice.md" >}}

Use your existing Playwright tests as live, scheduled monitoring checks. No rewrites required. Define what to monitor using code, selecting the right tags and projects, and run your checks globally, using the [Checkly CLI](/docs/cli).

## What's a Playwright Check Suite?

A Playwright Check Suite lets you use your existing Playwright tests and projects for end-to-end monitoring with tailored monitoring strategies.

## QuickStart Guide

Here's how to get from zero to deployed checks in 5 minutes.

### Before you begin

What you need:

* A checkly account
* A repository using Playwright for E2E tests and a Playwright configuration file.

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



### 3. Use `pw-test` to test in Checkly

Run your Playwright test suite using `pw-test`.

`pw-test` accepts both Checkly and Playwright command line arguments using the following syntax:

`npx checkly pw-test --checkly-flag -- --playwright-flag`. Use `--` to seperate Checkly and Playwright flags.

The CLI command will then return a link to results, traces and more details:

```bash
> npx checkly pw-test -- --project=chromium

Parsing your Playwright project... ✅

Validating project resources... ✅

Bundling project resources... ✅

Running 1 checks in eu-west-1.

playwright.config.ts
  ✔ Playwright Test: --project=chromium (16s)

Detailed session summary at: https://chkly.link/l/linkhere
```


### 4. Convert tests to checks with `pw-test`:

Using `pw-test` with the `--create-check` flag will create a `checkly.config.ts` file if it doesn't exist, and will add the new check. Afterwards, you can tweak the monitoring configuration for your check.

For example:

```bash
> npx checkly pw-test --create-check -- --project=chromium
⚠ No Checkly config file found

ℹ Creating a default checkly config file.

Creating Checkly check from Playwright test... ✅
```

Review the resulting check configuration in your `checkly.config.ts` file and make sure to tweak locations and schedule as needed.

```typescript {title="checkly.config.ts"}
import { defineConfig } from 'checkly'

const config = defineConfig({
  logicalId: 'my-repo-name',
  projectName: 'my-repo-name',
  checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        logicalId: 'playwright-check-project-chromium', // tweak ID 
        name: 'Playwright Test: --project=chromium', // tweak name
        testCommand: 'npx playwright test --project=chromium', // what we'll run as part of your check suite
        locations: [
          'eu-central-1', // add or change locations
        ],
        frequency: 10, // a custom per-check frequency
      },
    ],
    frequency: 10, // a global default frequency
    locations: [
      'us-east-1', // a global default location
    ],
  },
  cli: {
    runLocation: 'us-east-1', // where test and pw-test will run
  },
})

export default config

```

### 5. Deploy your Playwright Check Suites

Once you are ready to start monitoring your applications with these checks, deploy your Playwright Check Suite into global monitoring with `npx checkly deploy`.

```bash {title="Terminal"}
npx checkly deploy

> You are about to deploy your project "playwright-check-suites" to account "Checkly E2E Prod". Do you want to continue? … yes

Successfully deployed project "playwright-check-suite" to account "Checkly E2E Prod".
```

Once deployed, your checks will run on a schedule and results will appear in your [home dashboard](https://app.checklyhq.com/).

### 6. Set up Alerts

Configure alert channels and alert groups to get notified when checks fail. You can receive alerts via email, Slack, webhooks, and more.

To set up alerts:

1. Go to the Checkly dashboard.
2. Navigate to [**Alert Channels** ](https://app.checklyhq.com/accounts/alerts/settings) to create a new channel.
3. Assign channels to your project or individual checks.

Learn more in the [alerting guide](https://www.checklyhq.com/docs/alerts/).

And all done!

## Next steps

* Learn more about [how to use `pw-test`](/docs/cli/command-line-reference/#npx-checkly-pw-test). 
* Explore advanced configuration like [private locations](/docs/private-locations/) and [environment variables](/docs/cli/env-vars/).
* Add or tweak your checks to monitor flows in different browsers or locations.
* Set up alerting and integrations with your incident response tools.

* Add [TCP](/docs/tcp-monitors) and [URL monitors](/docs/url-monitors) as well as [API checks](/docs/api-checks) alongside your Playwright Check Suites.

> → Continue to the [Playwright Check Suite CLI reference](/docs/playwright-checks/reference) for all available options.
