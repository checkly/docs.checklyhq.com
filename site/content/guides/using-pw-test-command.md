---
title: Using the pw-test Command - Checkly Guides
displayTitle: Using the pw-test Command
navTitle: Using pw-test
weight: 15
beta: false
---

Use `pw-test` to run Playwright tests with Checkly monitoring.

## What pw-test does

- Runs Playwright tests and records results to Checkly
- Converts tests into scheduled monitors
- Passes flags to both Checkly and Playwright
- Uses your Playwright configuration (traces, videos, screenshots)

## Basic Usage

Use `--` to separate Checkly flags from Playwright flags:

```bash
npx checkly pw-test [checkly flags] -- [playwright flags]
```

## Convert Tests to Monitors

Create monitors from your Playwright tests using `--create-check`.

### Monitor regression tests in multiple browsers:
```bash
npx checkly pw-test --create-check --frequency=30m --location=us-east-1 --location=eu-central-1 -- --project=chromium --project=firefox --project=webkit --grep="@regression"
```

### Monitor mobile tests:
```bash
npx checkly pw-test --create-check --frequency=15m -- --project="iPhone 14" --project="Pixel 7" --grep="@mobile"
```

### Monitor critical paths globally:
```bash
npx checkly pw-test --create-check --frequency=5m --location=us-west-1 --location=eu-west-1 --location=ap-south-1 -- --grep="@critical" --project=chromium-desktop
```

## Use Playwright Projects

Select specific browsers and devices:

```bash
# Desktop browsers
npx checkly pw-test --create-check -- --project="Desktop Chrome" --project="Desktop Firefox"

# Mobile devices
npx checkly pw-test --create-check -- --project="Mobile Safari" --project="Mobile Chrome"

# Custom viewports
npx checkly pw-test --create-check -- --project="chromium-desktop" --project="webkit-mobile"
```

## Filter Tests with Tags

Use grep to select specific tests:

```bash
# Smoke tests only
npx checkly pw-test --create-check --frequency=10m -- --grep="@smoke"

# Regression tests without flaky ones
npx checkly pw-test --create-check --frequency=1h -- --grep="@regression" --grep-invert="@flaky"

# Specific features
npx checkly pw-test --create-check -- --grep="checkout flow" --project=chromium
```

## Artifacts and Debugging

Checkly captures all Playwright artifacts:

**Enable traces** in playwright.config.ts:
```javascript
use: {
  trace: 'on-first-retry',
}
```

**Enable videos**:
```javascript
use: {
  video: 'retain-on-failure',
}
```

**Enable screenshots**:
```javascript
use: {
  screenshot: 'only-on-failure',
}
```

> [!NOTE]
> Your Playwright configuration applies automatically. View artifacts in Checkly's UI.

## Examples

### E-commerce
```bash
# Checkout flow on multiple devices
npx checkly pw-test --create-check --frequency=15m --location=us-east-1 -- --project="Desktop Chrome" --project="Mobile Safari" --grep="checkout"

# Product search
npx checkly pw-test --create-check --frequency=30m -- --grep="search" --project=chromium
```

### API Integration
```bash
# API-dependent flows
npx checkly pw-test --create-check --env API_URL="https://api.production.com" -- --grep="@api-integration"

# User-specific flows
npx checkly pw-test --create-check --env USER_TYPE="premium" -- --grep="login" --project="Desktop Chrome"
```

### Performance Monitoring
```bash
# Dashboard performance
npx checkly pw-test --create-check --frequency=5m --location=us-east-1 --location=eu-west-1 -- --grep="load dashboard" --project=chromium-desktop
```

## Environment Variables

Use environment variables to customize tests:

```bash
# Set staging URL
npx checkly pw-test --env ENVIRONMENT_URL="https://staging.acme.com" -- --grep="@smoke"

# Load from file
npx checkly pw-test --env-file=".env.staging" -- --project=chromium
```

## Test Sessions

`pw-test` records all test sessions automatically. Add a custom name:

```bash
# Custom session name
npx checkly pw-test --test-session-name="Pre-deployment check" -- --project=chromium

# Default session
npx checkly pw-test -- --grep="@critical"
```

> [!NOTE]
> Unlike `checkly test`, you don't need `--record`. Sessions record automatically.

## Best Practices

1. **Tag tests clearly**: Use `@smoke`, `@regression`, `@critical`
2. **Enable artifacts**: Configure traces and videos for debugging
3. **Monitor critical paths first**
4. **Test from multiple regions**
5. **Balance frequency with coverage**

## Common Use Cases

### Development
```bash
# Pre-deployment smoke test
npx checkly pw-test -- --grep="@smoke" --project=chromium

# Monitor new features
npx checkly pw-test --create-check --group-id=new-features -- --grep="@feature-xyz"
```

### CI/CD
```bash
# Regression tests
npx checkly pw-test -- --grep="@regression" --project=chromium --project=firefox

# Deployment gate
npx checkly pw-test -- --grep="@critical" --retries=2
```

### Production
```bash
# User journeys
npx checkly pw-test --create-check --frequency=5m --location=us-east-1 --location=eu-west-1 -- --grep="@user-journey"

# Mobile experience
npx checkly pw-test --create-check --frequency=15m -- --project="Mobile Chrome" --project="Mobile Safari" --grep="@mobile-critical"
```

## Troubleshooting

**If tests pass locally but fail in Checkly:**
- Check environment variables
- Verify URL accessibility from monitor locations
- Review traces and videos in Checkly

**If artifacts don't appear:**
- Enable artifacts in playwright.config
- Note: artifacts often capture only on failure

**If "project not found" error:**
- Match project names exactly from playwright.config
- Quote project names with spaces: `--project="Mobile Chrome"`

## Next Steps

- [Playwright Check Suites](/docs/playwright-checks/)
- [CLI configuration](/docs/cli/)
- [Set up alerting](/docs/alerting/)