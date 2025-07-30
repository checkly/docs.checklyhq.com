---
title: Using the pw-test Command - Checkly Guides
displayTitle: Using the pw-test Command
navTitle: Using pw-test
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

Add `--create-check` to convert suites of tests into scheduled playwright check suites:

```bash
# Basic check suite pulling all tests in Chromium every 10 minutes
npx checkly pw-test --create-check --frequency=10m -- --project=chromium

# Multiple locations pulling all tests tagged critical, and run every 5 minutes
npx checkly pw-test --create-check --frequency=5m --location=us-east-1 --location=eu-west-1 -- --grep="@critical"

# Mobile tagged tests every 15 mins, in Mobile Chrome and the default location.
npx checkly pw-test --create-check --frequency=15m -- --project="Mobile Chrome" --grep="@mobile"
```

## Advanced examples

### Browser and device selection

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

Configure in your `playwright.config.ts`:

```javascript
use: {
  trace: 'on',      // Always capture traces
  video: 'retain-on-failure',   // Record videos on failure
  screenshot: 'only-on-failure' // Take screenshots on failure
}
```

View all artifacts in Checkly's UI after test runs.

### Environment variables

```bash
# Pass individual variables and pull all tests tagged with regression into a check suite
npx checkly pw-test --env ENVIRONMENT_URL="https://staging.acme.com" -- --grep="@regression"

# Load env from file
npx checkly pw-test --env-file=".env.staging" -- --project=chromium
```

## Common patterns

### E-commerce monitoring
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

**"Project not found" errors**
- Match exact names from `playwright.config.ts`
- Quote names with spaces: `--project="Mobile Chrome"

## Related documentation

- [Playwright Check Suites overview](/docs/playwright-checks/)
- [Playwright Test CLI options](https://playwright.dev/docs/test-cli)
- [Command line reference](/docs/cli/command-line-reference/)
- [Alerting guide](/docs/alerting/)