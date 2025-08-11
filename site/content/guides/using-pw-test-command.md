---
title: Using the pw-test Command - Checkly Guides
displayTitle: Using the pw-test Command
navTitle: Using pw-test
author: María de Antón
avatar: 'images/avatars/maria-de-anton.jpg'
weight: 15
beta: false
description: >-
  Learn how to use the pw-test command to run Playwright tests with Checkly monitoring. Convert your existing Playwright tests into scheduled monitors with a single command.
tags:
  - CLI
  - Playwright
---

Run Playwright tests with Checkly monitoring features. Convert to a check suite once you're ready to start monitoring.

## Basic syntax

```bash
npx checkly pw-test [checkly flags] -- [playwright flags]
```

Use `--` to separate Checkly flags from Playwright flags.

## What is pw-test?

The `pw-test` command:
- Runs your existing Playwright tests
- Records results to Checkly automatically
- Creates scheduled monitors with `--create-check`
- Uses your Playwright configuration file options

## Quick examples

### Run tests remotely in Checkly


```bash
# Single browser
npx checkly pw-test -- --project=chromium

# Multiple browsers
npx checkly pw-test -- --project=chromium --project=firefox

# Filter by tag
npx checkly pw-test --location="eu-west-1" --location="us-west-1" -- --grep="@smoke"
```

By default, `pw-test` uses N.Virginia (`us-east-1`) to run. Use any [global location](/docs/monitoring/global-locations/) or [private location](/docs/private-locations/).

### Create monitors

Using `pw-test` with the `--create-check` flag will create a `checkly.config.ts` file if it doesn't exist, and add the new check, so that you can tweak the monitoring configuration for your check.

Each `--create-check` call will append the check configuration to your configuration file. If you run it twice with the same configuration, it'll create the same check twice.


```bash
# Run all tests in the "chromium" project every 10 minutes
npx checkly pw-test --create-check --frequency=10m -- --project=chromium

# Run all tests tagged critical every 5 minutes
npx checkly pw-test --create-check --frequency=5m --location=us-east-1 --location=eu-west-1 -- --grep="@critical"

# Run all tests from the "Mobile Chrome" project every 15 mins in default location
npx checkly pw-test --create-check --frequency=15m -- --project="Mobile Chrome" --grep="@mobile"
```

## Advanced examples

### Projects running browsers and emulating devices

```bash
# Desktop browsers
npx checkly pw-test -- --project="Desktop Chrome" --project="Desktop Firefox"

# Mobile devices
npx checkly pw-test -- --project="Mobile Safari" --project="Iphone 14"
```

### Test filtering

```bash
# All tests tagged smoke
npx checkly pw-test -- --grep="@smoke"

# Exclude flaky tagged tests
npx checkly pw-test -- --grep-invert="@flaky"

# Create a check with tests tagged critical that runs every 10 minutes
npx checkly pw-test --create-check --frequency=10m -- --grep="@critical"
```

## Configuration

### Artifacts

Configure which artifacts are stored in your `playwright.config.ts`:

```javascript
use: {
  trace: 'on',      // Always capture traces
  video: 'retain-on-failure',   // Record videos on failure
  screenshot: 'only-on-failure' // Take screenshots on failure
}
```

If you'd like different configuration for your checks, make sure to use the `--trace <mode>` flag in the `testCommand` section of your Playwright Check Suite.

```typescript {title="checkly.config.ts"}
import { defineConfig } from 'checkly'

const config = defineConfig({
  logicalId: 'my-repo-name',
  projectName: 'my-repo-name',
  checks: {
    playwrightConfigPath: './playwright.config.ts',
    playwrightChecks: [
      {
        logicalId: 'myrepo', // tweak ID
        name: 'myrepo: Chromium Playwright Tests', // tweak name
        testCommand: 'npx playwright test --project=chromium --trace=on',//
        locations: [
          'eu-central-1', 'us-east-1' // add or change locations
        ],
        frequency: 10, // a custom per-check frequency
      },
    ],
  },
  cli: {
    runLocation: 'us-east-1', // where test and pw-test will run
  },
})

export default config

```

View all artifacts in Checkly's UI after test runs in [Test Sessions](https://app.checklyhq.com/test-sessions).

### Environment variables

```bash
# Pass individual variables and run all tests tagged with "regression" into a check suite
npx checkly pw-test --env ENVIRONMENT_URL="https://staging.acme.com" -- --grep="@regression"

# Load env from file
npx checkly pw-test --env-file=".env.staging" -- --project=chromium
```

## Common patterns creating checks

```bash
# Checkout flow
npx checkly pw-test --create-check --frequency=15m --location=us-east-1 -- --project="Desktop Chrome" --grep="checkout"

# Mobile experience
npx checkly pw-test --create-check --frequency=30m -- --project="iPhone-13" --grep="@mobile-critical"
```

## Test sessions

All runs record automatically. You can add custom names:

```bash
npx checkly pw-test --test-session-name="Pre-deployment check" -- --project=chromium
```

## Best practices

1. Tag tests clearly: `@smoke`, `@regression`, `@critical`
2. Enable artifacts in `playwright.config.ts`
3. Start with critical user paths
4. Test from multiple regions
5. Balance monitoring frequency with importance

## Troubleshooting

**Tests fail in Checkly but pass locally**
- Check local environment variables match the ones in Checkly
- Verify URLs are accessible from test locations
- Review failures and traces in Checkly UI

**Missing artifacts**
- Confirm they're set as `on` in `playwright.config.ts`
- Alternatively, edit your `testCommand` to set the flag `trace=on`

**"Project not found" errors**
- Match exact names from `playwright.config.ts`
- Quote names with spaces: `--project="Mobile Chrome"

## Related documentation

- [Playwright Check Suites overview](/docs/playwright-checks/)
- [Playwright Test CLI options](https://playwright.dev/docs/test-cli)
- [Command line reference](/docs/cli/command-line-reference/)
- [Alerting guide](/docs/alerting/)
