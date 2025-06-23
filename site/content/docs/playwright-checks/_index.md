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

A Playwright Check Suite lets you use your existing Playwright tests and projects for end-to-end monitoring with tailored monitoring strategies.

You can mix and match existing
[projects](https://playwright.dev/docs/test-projects) (`pwProjects`) and [test tags](https://playwright.dev/docs/test-annotations#tag-tests) (`pwTags`) to select tests and group subsets into Playwright Check Suites. This approach allows you to specify different monitoring settings for each Playwright Check Suite to differenciate between smoke tests or critical path flows.

## QuickStart Guide

Here's how to get from zero to deployed checks in 5 minutes.

###  Before you begin
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

### 3. Define which tests to monitor in `checkly.config.ts/js`

Create a `checkly.config.ts/js` and pick the tests you want to monitor, use [test tags](https://playwright.dev/docs/test-annotations#tag-tests) and [projects](https://playwright.dev/docs/test-projects) to create a Playwright Check Suite.

Make sure:

* `pwProjects` match projects names in your `playwright.config.ts`.
* `pwTags` match tags in your test definitions.

Below are two example check suites:

* a full multi-browser suite with smoke tests.
* a `chromium`-only check suite running tests tagged with `@critical`.


```typescript {title="checkly.config.ts/js"}
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'Cool Website Checks',
  logicalId: 'cool-website-monitoring',
  repoUrl: 'https://github.com/acme/website',
  checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        /**
         * Create a multi-browser check that runs
         * every 10 mins in two locations.
         */
        logicalId: 'multi-browser',
        name: 'Multi Browser Suite',
        // Use one project (or multiple projects) defined in your Playwright config
        pwProjects: ['chromium', 'firefox', 'webkit'],
        // Use one tag (or multiple tags) defined in your spec files
        pwTags: '@smoke-tests',
        frequency: Frequency.EVERY_10M,
        locations: ['us-east-1', 'eu-west-1'],
      },
      {
        /**
         * Create a check that runs the `@critical` tagged tests
         * every 5 mins in three locations.
         */
        logicalId: 'critical-tagged',
        name: 'Critical Tagged tests',
        // Use one project (or multiple projects) defined in your Playwright config
        pwProjects: ['chromium'],
        // Use one tag (or multiple tags) defined in your spec files
        pwTags: '@critical',
        frequency: Frequency.EVERY_5M,
        locations: ['us-east-1', 'eu-central-1', 'ap-southeast-2'],
      },
    ],
  },
  cli: {
    runLocation: 'us-east-1',
    retries: 0,
  },
})
```

Access [the Playwright Check Suites reference documentation](/docs/playwright-checks/reference/) for more configuration options.

### 4. Validate your monitors

Validate the Playwright check suites that reference existing Playwright tags or projects in your repository by running `npx checkly test` from your terminal. Your Playwright check suites will then be executed in the Checkly infrastructure running in the location specified in your Checkly config (`cli.runLocation`).

```bash {title="Terminal"}
npx checkly test --record
> Running 2 checks in eu-west-1.

  critical-tagged
    ✔ critical-tagged (4s)
  multi-browser
    ✔ multi-browser (18s)

2 passed, 2 total
```

If you you want to persist the test results and access them in the Checkly web app, use the `--record` CLI option and run `npx checkly test --record` to transform your test runs into [a Checkly test session](/docs/testing/#test-sessions).

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

The CLI command will then return a link leading to results, traces and more details.

### 5. Deploy your Playwright Check Suites

If your Playwright monitoring passes and you are ready to start monitoring your applications with your Playwright tests, transform your Playwright Check Suite into global monitoring with `npx checkly deploy`.

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
2. Navigate to **Alert Settings** > **Alert Channels** to create a new channel.
3. Assign channels to your project or individual checks.

Learn more in the [alerting guide](https://www.checklyhq.com/docs/alerts/).

And all done!


## Next steps

- Explore advanced configuration like [private locations](/docs/private-locations/) and [environment variables](/docs/cli/env-vars/).
- Add or tweak your checks to monitor flows in different browsers or locations.
- Set up alerting and integrations with your incident response tools
- Add [TCP](/docs/tcp-checks) and [API monitors](/docs/api-checks) alongside your Playwright Check Suites.

> → Continue to the [Playwright Check Suite CLI reference](/docs/playwright-checks/reference) for all available options.
